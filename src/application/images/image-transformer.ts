import sharp from 'sharp';

export const resizeImage = (image: Buffer | ArrayBuffer, destWidth: number): Promise<Buffer> => {
    return sharp(image)
        .resize({
            width: destWidth,
            fit: 'contain'
        })
        .webp()
        .toBuffer();
}