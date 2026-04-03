const express = require('express');
const userControllers = require('./../controllers/userControllers');
const authController = require('./../controllers/authController');

const router = express.Router();

// Auth routes — signup is intentionally API-only (no frontend form)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// ── Protected routes (must be logged in) ─────────────────────────────────────
router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);
router.patch('/updateMe', userControllers.uploadUserPhoto, userControllers.resizeUserPhoto, userControllers.updateMe);
router.delete('/deleteMe', userControllers.deleteMe);

router
    .route('/me')
    .get(userControllers.getMe, userControllers.getUser);

// ── Admin-only routes ─────────────────────────────────────────────────────────
router.use(authController.restrictTo('admin'));

router
    .route('/')
    .get(userControllers.getAllUsers);

router
    .route('/:id')
    .get(userControllers.getUser)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

module.exports = router;