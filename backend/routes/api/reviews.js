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

//get all review of current user
router.get("/current", requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {model: User,attributes: ["id", "firstName", "lastName"],},
      {model: Spot,attributes: {exclude: ["description", "createdAt", "updatedAt"],},
        include: {model: SpotImage,where: {preview: true, },attributes: ["url"],},},
      {model: ReviewImage,attributes: ["id", "url"],},
    ],
  });

  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i].toJSON();

    const previewImageUrl = review.Spot.SpotImages;

    if (previewImageUrl) {
      review.Spot.previewImage = previewImageUrl.url;
    } else {
      review.Spot.previewImage = null;
    }
  }
  return res.json({ Reviews: reviews });
});

module.exports = router;
