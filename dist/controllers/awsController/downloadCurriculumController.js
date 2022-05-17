"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadCurriculumController = void 0;
const process_1 = require("process");
var AWS = require('aws-sdk');
class DownloadCurriculumController {
    async handle(request, response, next) {
        try {
            const { fileKey } = request.params;
            AWS.config.update({
                region: `${process_1.env.AWS_REGION}`,
                accessKeyId: `${process_1.env.AWS_ACCESS_KEY}`,
                secretAccessKey: `${process_1.env.AWS_SECRET_KEY}`
            });
            var s3 = new AWS.S3();
            var options = {
                Bucket: `${process_1.env.BUCKET_NAME}`,
                Key: `${fileKey}.pdf`,
            };
            response.attachment(fileKey);
            var fileStream = s3.getObject(options).createReadStream();
            fileStream.pipe(response);
        }
        catch (error) {
            return response.status(500).json(error);
        }
    }
}
exports.DownloadCurriculumController = DownloadCurriculumController;
