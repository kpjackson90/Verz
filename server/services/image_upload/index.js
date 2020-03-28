const cloudinary = require('cloudinary').v2;
const isBase64 = require('is-base64');
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = require('../../config/keys');
const { errorName } = require('../../utils/errorConstants');
const moment = require('moment');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET
});

exports.uploadImage = ({ userId, imagePost, type }) => {
  return new Promise((resolve, reject) => {
    if (!isBase64(imagePost, { mimeRequired: true })) {
      return resolve(undefined);
    }

    cloudinary.uploader.upload(
      imagePost,
      {
        resource_type: 'image',
        public_id: `Verz/${type}/${userId}/${moment()}`,
        type: 'private'
      },
      function(error, result) {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }
    );
  });
};
