import { s3Client } from '@application/s3/client';
import { TEBI_MHHC_BUCKET_ID } from '$env/static/private';

export const checkObject = async (key: string) => {
    return s3Client.headObject({
        Bucket: TEBI_MHHC_BUCKET_ID,
        Key: key,
    });
};
