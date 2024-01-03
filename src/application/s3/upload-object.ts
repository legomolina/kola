import { s3Client } from './client';
import { TEBI_MHHC_BUCKET_ID } from '$env/static/private';

export const uploadObject = (data: Buffer, key: string) => {
    return s3Client.putObject({
        Bucket: TEBI_MHHC_BUCKET_ID,
        Key: key,
        Body: data,
        ACL: 'public-read',
    });
};