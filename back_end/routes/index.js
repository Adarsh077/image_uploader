const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { isJWT } = require('validator').default;

const {
  validateRegister,
  validateLogin,
  validateAddImage,
  validateDeleteImage,
} = require('../validation');

const { authController, imageController } = require('../controllers');
const AppError = require('../utils/appError');

router.post('/register', validateRegister, authController.register);
router.get('/login', validateLogin, authController.login);

// API Authentication Middleware
router.use((req, _, next) => {
  const token = req.headers['x-access-token'];

  if (!token || !isJWT(token)) {
    throw new AppError({ err: 'Your are not authenticated!' }, 403);
  }

  jwt.verify(token, process.env.JWT_SALT, (err, user) => {
    if (err) {
      throw new AppError({ err: 'Failed to authenticate token.' }, 500);
    }

    req.user = user;
    next();
  });
});

router.get('/images', imageController.getImages);

router
  .route('/image')
  .post(validateAddImage, imageController.addImage)
  .delete(validateDeleteImage, imageController.deleteImage);

module.exports = router;
