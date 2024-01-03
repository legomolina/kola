import type { CardModel, CardResponseModel } from '@domain/mhhc-archive/models/card.model';

export type CollectionModel = {
    cards: CardModel[];
    coverCards: CardModel[];
    name: string;
    releaseDate?: Date;
    url: string;
}

export type CollectionResponseModel = {
    name: string;
    url: string;
    releaseDate?: string;
    cards: CardResponseModel[];
}