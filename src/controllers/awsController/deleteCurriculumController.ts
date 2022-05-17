import { Request, Response } from 'express'
import { env } from 'process'
var AWS = require('aws-sdk')

export class DeleteCurriculumController {
    async handle(key: String) {
        try {
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
                Key: `${key}.pdf`,
            };
            await s3.deleteObject(options, function(err: any, data: any) {
                if (err) throw err;  // error
                else     return{     // deleted
                    error: false,
                    message: "Deleted with success."
                }
              });
        } catch (error) {
            throw error
        }
    }
}