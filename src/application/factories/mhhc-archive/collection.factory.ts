import type { CollectionModel, CollectionResponseModel } from '@domain/mhhc-archive/models/collection.model';
import { buildCard } from '@application/factories/mhhc-archive/card.factory';

export const buildCollection = (collection: CollectionResponseModel): CollectionModel => {
    const cards = collection.cards.map((card) => buildCard(card, collection.url));
    const releaseDate = collection.releaseDate ? new Date(collection.releaseDate) : undefined;

    return {
        cards,
        coverCards: cards.splice(0, 3),
        name: collection.name,
        releaseDate,
        url: collection.url,
    };
}

