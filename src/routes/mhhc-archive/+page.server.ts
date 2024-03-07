import type { PageServerLoad } from './$types';
import type { CollectionResponseModel } from '@domain/mhhc-archive/models/collection.model';
import type { CollectionModel } from '@domain/mhhc-archive/models/collection.model';
import { buildCollection } from '@application/factories/mhhc-archive/collection.factory';
import { fetchCard } from '@application/images/mhhc-archive/fetch-cards.service';
import { PUBLIC_ARCHIVE_INFO_FILE } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
    const json: { cards: { collections: CollectionResponseModel[] } } = await fetch(PUBLIC_ARCHIVE_INFO_FILE).then(res => res.json());
    const collections = json.cards.collections.map((collection) => buildCollection(collection));

    const getCards = async (collection: CollectionModel) => {
        for (const coverCard of collection.coverCards) {
            try {
                await fetchCard(coverCard, fetch);
            } catch { /* empty */ }
        }
    }

    const promises = [];

    for (const collection of collections) {
        promises.push(getCards(collection));
    }

    await Promise.all(promises);

    return { collections };
};