export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
export const editFileName = (req, file, cb) => {
  const name = file.originalname.split('.')[0];
  const fileExtension = file.originalname.split('.')[1];
  const newFileName =
    name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

  cb(null, newFileName);
};
