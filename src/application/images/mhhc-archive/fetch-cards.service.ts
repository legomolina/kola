import { checkObject } from '@application/s3/check-object';
import { NoSuchKey, NotFound } from '@aws-sdk/client-s3';
import { type CardModel } from '@domain/mhhc-archive/models/card.model';

export const getRawFile = async (card: CardModel): Promise<Blob | null> => {
    const response = await fetch(card.githubUrl);

    if (response.ok) {
        return response.blob();
    }

    return null;
};

export const transformImage = async (card: CardModel, fetchFn: (typeof fetch))=>  {
    const rawImage = await getRawFile(card);

    if (!rawImage) {
        console.error(`Image ${card.name} with github url ${card.githubUrl} not found!`);
        throw new Error('Error accessing github file');
    }

    const formData = new FormData();
    formData.set('image', rawImage);
    formData.set('name', card.bucketBasePath);

    await fetchFn('/mhhc-archive/api/images/transform', {
        method: 'POST',
        body: formData,
    });
}

export const fetchCard = async (card: CardModel, fetchFn: (typeof fetch), force = false) => {
    if (force) {
        await transformImage(card, fetchFn);
        return;
    }

    try {
        await checkObject(card.bucketBasePath + '_180.webp');
    } catch (e) {
        if (e instanceof NoSuchKey || e instanceof NotFound) {
            await transformImage(card, fetchFn);
        }

        console.error(`Error accessing ${card.name} s3 image!`);
    }
}
