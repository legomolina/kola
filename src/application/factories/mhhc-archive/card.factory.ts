import type { CardModel, CardResponseModel } from '@domain/mhhc-archive/models/card.model';
import { TEBI_MHHC_BUCKET_ID, TEBI_URL } from '$env/static/private';

export const buildCard = (card: CardResponseModel, collectionUrl: string): CardModel => {
    const urlWithoutExtension = card.url.replace(/\.[^/.]+$/, "");
    const bucketBasePath = `cards/${collectionUrl}/${urlWithoutExtension}`
    const bucketBaseUrl = `${TEBI_URL}/${TEBI_MHHC_BUCKET_ID}/${bucketBasePath}`;

    return {
        bucketBasePath,
        githubUrl: `https://github.com/GrenderG/MHHC_Archive/blob/master/Card%20Scans/${encodeURIComponent(collectionUrl)}/${encodeURIComponent(card.url)}?raw=true`,
        name: card.name,
        mediumUrl: `${bucketBaseUrl}_320.webp`,
        smallUrl: `${bucketBaseUrl}_180.webp`,
    };
}