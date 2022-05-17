import { env } from "process";
import { prismaClient } from "../../database/prismaCliente";

const fs = require('fs')
const S3 = require("aws-sdk/clients/s3")

const bucketName = `${env.BUCKET_NAME}`
const region = `${env.AWS_REGION}`
const accessKeyId = `${env.AWS_ACCESS_KEY}`
const secretKey = `${env.AWS_SECRET_KEY}`

const s3 = new S3({
    region,
    accessKeyId,
    secretKey
})

async function uploadFile(file: any, id: any) {
    try {
        const fileStream = fs.createReadStream(file.path)
        const splitedString = file.originalname.split('.')
        const extensionValidate = splitedString[1].toString() !== 'pdf'
        if (extensionValidate) {
            return {
                error: true,
                message: "Only pdf files."
            }
        }

        const uploadParams = {
            Bucket: bucketName.toString(),
            Body: fileStream,
            Key: `${id}.pdf`
        }

        const uploadResponse = await s3.upload(uploadParams).promise()

        const candidate = await prismaClient.candidate.findFirst({
            where: {
                id: id.toString()
            }
        })

        if (candidate === null || candidate === undefined) {
            const ITCandidateWithLink = await prismaClient.iTCandidate.update({
                where: {
                    id: id.toString()
                },
                data: {
                    curriculumLink: `https://${bucketName}.s3.${region}.amazonaws.com/${file.filename}.pdf`
                }
            })
        } else {
            const candidateWithLink = await prismaClient.candidate.update({
                where: {
                    id: id.toString()
                },
                data: {
                    curriculumLink: `https://${bucketName}.s3.${region}.amazonaws.com/${id}.pdf`
                }
            })
        }
        return {
            error: false,
            message: "Upload success.",
            data: uploadResponse
        }
    } catch (error) {
        return {
            error: true,
            message: error
        }
    }
}

export { uploadFile }