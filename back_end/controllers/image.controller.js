const ImageDoc = require('../models/image.model');
const catchAsync = require('../utils/catchAsync');

exports.addImage = catchAsync(async (req, res) => {
  req.body.userId = req.user._id;

  const image = await ImageDoc.create(req.body);

  res.send({
    status: 'success',
    body: { _id: image._id },
  });
});

exports.deleteImage = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { imageId } = req.query;

  await ImageDoc.findOneAndDelete({ _id: imageId, userId });

  res.send({
    status: 'success',
    body: 'Image successfully deleted',
  });
});

exports.getImages = catchAsync(async (req, res) => {
  const userId = '6129bed2286e16a56c81a0ef';

  const images = await ImageDoc.find({ userId });

  res.send({
    status: 'success',
    body: { images },
  });
});
