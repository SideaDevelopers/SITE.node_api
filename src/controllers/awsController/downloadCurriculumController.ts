import { Request, Response, NextFunction } from 'express'
import { env } from 'process'
var AWS = require('aws-sdk')

export class DownloadCurriculumController {
    async handle(request: Request, response: Response, next: NextFunction) {
        try {
            const { fileKey } = request.params

            AWS.config.update(
                {
                    region: `${env.AWS_REGION}`,
                    accessKeyId: `${env.AWS_ACCESS_KEY}`,
                    secretAccessKey: `${env.AWS_SECRET_KEY}`
                }
            );
            var s3 = new AWS.S3();
            var options = {
                Bucket: `${env.BUCKET_NAME}`,
                Key: `${fileKey}.pdf`,
            };

            response.attachment(fileKey);
            var fileStream = s3.getObject(options).createReadStream();
            fileStream.pipe(response);
        } catch (error) {
            return response.status(500).json(error)
        }
    }
}