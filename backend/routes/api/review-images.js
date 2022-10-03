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

router.delete('/:imageId', requireAuth, async (req, res, next) => {
  const spotImage = await SpotImage.findByPk(req.params.imageId);
  if (spotImage) {
      const spot = await Spot.findByPk(spotImage.spotId);
      if (req.user.id === spot.ownerId) {
          await spotImage.destroy();
          res.json({"message":"Successfully deleted","statusCode":200});
      } else res.status(403).json({"message":"Forbidden","statusCode":403});
  } else res.status(404).json({"message":"Spot Image couldn't be found","statusCode":404});
});

module.exports = router;
