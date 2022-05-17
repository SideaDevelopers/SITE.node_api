"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const process_1 = require("process");
const prismaCliente_1 = require("../../database/prismaCliente");
const fs = require('fs');
const S3 = require("aws-sdk/clients/s3");
const bucketName = `${process_1.env.BUCKET_NAME}`;
const region = `${process_1.env.AWS_REGION}`;
const accessKeyId = `${process_1.env.AWS_ACCESS_KEY}`;
const secretKey = `${process_1.env.AWS_SECRET_KEY}`;
const s3 = new S3({
    region,
    accessKeyId,
    secretKey
});
async function uploadFile(file, id) {
    try {
        const fileStream = fs.createReadStream(file.path);
        const splitedString = file.originalname.split('.');
        const extensionValidate = splitedString[1].toString() !== 'pdf';
        if (extensionValidate) {
            return {
                error: true,
                message: "Only pdf files."
            };
        }
        const uploadParams = {
            Bucket: bucketName.toString(),
            Body: fileStream,
            Key: `${id}.pdf`
        };
        const uploadResponse = await s3.upload(uploadParams).promise();
        const candidate = await prismaCliente_1.prismaClient.candidate.findFirst({
            where: {
                id: id.toString()
            }
        });
        if (candidate === null || candidate === undefined) {
            const ITCandidateWithLink = await prismaCliente_1.prismaClient.iTCandidate.update({
                where: {
                    id: id.toString()
                },
                data: {
                    curriculumLink: `https://${bucketName}.s3.${region}.amazonaws.com/${file.filename}.pdf`
                }
            });
        }
        else {
            const candidateWithLink = await prismaCliente_1.prismaClient.candidate.update({
                where: {
                    id: id.toString()
                },
                data: {
                    curriculumLink: `https://${bucketName}.s3.${region}.amazonaws.com/${id}.pdf`
                }
            });
        }
        return {
            error: false,
            message: "Upload success.",
            data: uploadResponse
        };
    }
    catch (error) {
        return {
            error: true,
            message: error
        };
    }
}
exports.uploadFile = uploadFile;
