import type { RequestHandler } from '@sveltejs/kit';
import type { CollectionModel, CollectionResponseModel } from '@domain/mhhc-archive/models/collection.model';
import { createHmac, timingSafeEqual } from 'crypto';
import { GITHUB_WEBHOOK_SECRET, TEBI_MHHC_BUCKET_ID, TEBI_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { fetchCard } from '@application/images/mhhc-archive/fetch-cards.service';
import { PUBLIC_ARCHIVE_INFO_FILE } from '$env/static/public';
import { buildCollection } from '@application/factories/mhhc-archive/collection.factory';
import type { CardModel } from '@domain/mhhc-archive/models/card.model';

type Commit = {
    added: string[];
    modified: string[];
};

export const POST: RequestHandler = async ({ fetch, request }) => {
    const checkValidity = (textBody: string) => {
        if (!textBody) {
            throw new Error('Unable validate signature');
        }

        const signatureHeaderName = 'X-Hub-Signature-256';
        const signatureHashAlgorithm = 'sha256';
        const signature = Buffer.from(request.headers.get(signatureHeaderName) ?? '', 'utf8');
        const hmac = createHmac(signatureHashAlgorithm, GITHUB_WEBHOOK_SECRET);
        const digest = Buffer.from(signatureHashAlgorithm + '=' + hmac.update(textBody).digest('hex'), 'utf8');

        if (signature.length !== digest.length || !timingSafeEqual(digest, signature)) {
            throw new Error('Unable validate signature');
        }
    }

    const getFilesFromCommits = (commits: Commit[]): string[] => {
        return commits.reduce((previousValue, currentValue) => {
            return [
                ...previousValue,
                ...currentValue.modified,
                ...currentValue.added,
            ];
        }, [] as string[]);
    }

    const buildCardFromFile = (file: string): CardModel => {
        const splitted = file.split('/').filter(s => s !== '');
        const cardName = splitted.at(-1)!;
        const collectionName = splitted.at(-2)!;

        const urlWithoutExtension = cardName.replace(/\.[^/.]+$/, "");
        const bucketBasePath = `cards/${collectionName}/${urlWithoutExtension}`
        const bucketBaseUrl = `${TEBI_URL}/${TEBI_MHHC_BUCKET_ID}/${bucketBasePath}`;

        return {
            bucketBasePath,
            githubUrl: `https://github.com/GrenderG/MHHC_Archive/blob/master/Card%20Scans/${encodeURIComponent(collectionName)}/${encodeURIComponent(cardName)}?raw=true`,
            name: urlWithoutExtension,
            largeUrl: `${bucketBaseUrl}_480.webp`,
            mediumUrl: `${bucketBaseUrl}_320.webp`,
            smallUrl: `${bucketBaseUrl}_180.webp`,
        };
    }

    const text = await request.text();
    const { commits } = JSON.parse(text);

    try {
        checkValidity(text);
    } catch(e) {
        error(500, (e as Error).message);
    }

    console.log('Received github payload, starting card transforming');

    const files = getFilesFromCommits(commits);

    for (const file of files) {
        const card = buildCardFromFile(file);
        console.log(`Processing file ${card.name}...`)
        fetchCard(card, fetch, true).then(
            () => console.log(`File ${card.name} uploaded after push!`)
        );
    }

    return new Response();
}