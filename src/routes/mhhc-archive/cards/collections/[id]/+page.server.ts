import type { PageServerLoad } from './$types';
import type { CollectionResponseModel } from '@domain/mhhc-archive/models/collection.model';
import { error } from '@sveltejs/kit';
import { buildCollection } from '@application/factories/mhhc-archive/collection.factory';
import { fetchCard } from '@application/images/mhhc-archive/fetch-cards.service';

export const load: PageServerLoad = async ({ fetch, params }) => {
    const json: { cards: { collections: CollectionResponseModel[] } } = await fetch('/archive-map.json').then(res => res.json());
    const selectedCollection = json.cards.collections.find((collection) => {
        return collection.name === params.id;
    });

    if (!selectedCollection) {
        error(404, `Collection ${params.id} does not exists`);
    }

    const collection = buildCollection(selectedCollection);
    const promises = [];

    for (const card of collection.cards) {
        promises.push(fetchCard(card, fetch));
    }

    await Promise.all(promises);

    return {
        collection: collection.name,
        cards: collection.cards
    }
}

