import type { RequestHandler } from '@sveltejs/kit';
import type { CollectionModel, CollectionResponseModel } from '@domain/mhhc-archive/models/collection.model';
import { GITHUB_WEBHOOK_SECRET } from '$env/static/private';
import { PUBLIC_ARCHIVE_INFO_FILE } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { buildCollection } from '@application/factories/mhhc-archive/collection.factory';
import { fetchCard } from '@application/images/mhhc-archive/fetch-cards.service';

export const GET: RequestHandler = async ({ url }) => {
    const token = url.searchParams.get('t');
    const collectionName = url.searchParams.get('c');

    if (token !== GITHUB_WEBHOOK_SECRET || !collectionName) {
        error(500);
    }

    const json: { cards: { collections: CollectionResponseModel[] } } = await fetch(PUBLIC_ARCHIVE_INFO_FILE).then(res => res.json());
    const collection = json.cards.collections.map((collection) => buildCollection(collection)).find((collection) => collection.name === decodeURIComponent(collectionName));

    console.log(`Updating collection ${collectionName}`);

    const getCards = async (collection: CollectionModel) => {
        for (const coverCard of collection.cards) {
            try {
                await fetchCard(coverCard, fetch, true);
            } catch { /* empty */ }
        }
    }

    if (collection) {
        getCards(collection).then(() => console.log(`Refreshed cards from collection ${collection.name}`));
        return new Response('Refreshing cards');
    }

    error(500, 'Collection not found');
}