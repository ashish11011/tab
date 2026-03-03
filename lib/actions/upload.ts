"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3";
import { AWS_BUCKET, AWS_REGION } from "@/env";
import { v4 as uuidv4 } from "uuid";

export async function uploadToS3(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;

    await s3Client.send(
        new PutObjectCommand({
            Bucket: AWS_BUCKET,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        })
    );

    const url = `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${fileName}`;
    return url;
}
