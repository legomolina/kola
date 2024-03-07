import type { RequestHandler } from '@sveltejs/kit';
import { resizeImage } from '@application/images/image-transformer';
import { uploadObject } from '@application/s3/upload-object';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const image = formData.get('image') as File;
	const imageName = formData.get('name') as string ?? '';

    if (!image) {
        error(400, 'Image must be provided');
    }

    const imageWithoutExtension = imageName.replace(/\.[^/.]+$/, "");
	const data = await image.arrayBuffer();

    const imageSmall = resizeImage(data, 180).then((buffer) =>
		uploadObject(buffer, `${imageWithoutExtension}_180.webp`),
	);
	const imageMedium = resizeImage(data, 320).then((buffer) =>
        uploadObject(buffer, `${imageWithoutExtension}_320.webp`),
    );
    const imageLarge = resizeImage(data, 480).then((buffer) => {
        uploadObject(buffer, `${imageWithoutExtension}_480.webp`);
    });

    try {
        await Promise.all([imageSmall, imageMedium, imageLarge]);
    } catch (e) {
        console.error(e);
        return error(500, 'Error while creating and uploading files');
    }

	return json({ success: true });
};
