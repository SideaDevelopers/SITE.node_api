"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCurriculumController = void 0;
const process_1 = require("process");
var AWS = require('aws-sdk');
class DeleteCurriculumController {
    async handle(key) {
        try {
            AWS.config.update({
                region: `${process_1.env.AWS_REGION}`,
                accessKeyId: `${process_1.env.AWS_ACCESS_KEY}`,
                secretAccessKey: `${process_1.env.AWS_SECRET_KEY}`
            });
            var s3 = new AWS.S3();
            var options = {
                Bucket: `${process_1.env.BUCKET_NAME}`,
                Key: `${key}.pdf`,
            };
            await s3.deleteObject(options, function (err, data) {
                if (err)
                    throw err; // error
                else
                    return {
                        error: false,
                        message: "Deleted with success."
                    };
            });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.DeleteCurriculumController = DeleteCurriculumController;
