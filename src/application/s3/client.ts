import { S3 } from '@aws-sdk/client-s3';
import { TEBI_ACCESS_KEY_ID, TEBI_SECRET_ACCESS_KEY, TEBI_URL } from '$env/static/private';

export const s3Client = new S3({
    endpoint: TEBI_URL,
    region: 'global',
    credentials: {
        accessKeyId: TEBI_ACCESS_KEY_ID,
        secretAccessKey: TEBI_SECRET_ACCESS_KEY,
    },
});