const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require("../../utils/validation");
const { check, param } = require("express-validator");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");

router.get('/current', requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
      where: {userId: req.user.id},
      include: {
          model: Spot,
          attributes: {exclude: ['createdAt', 'updatedAt', 'description']},
          include: {model: SpotImage, where: {preview: true},attributes: ['url']}
      },
  });
  for(let i = 0; i < bookings.length; i++){
      const booking = bookings[i].toJSON();
      const previewImage = booking.Spot.SpotImages;

      if(previewImage) booking.Spot.previewImage = previewImage.url;
      else booking.Spot.previewImage = null;
  }
  return res.json({Bookings: bookings});
});

module.exports = router;
