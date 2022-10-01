const express = require("express");
const router = express.Router();
const { handleValidationErrors } = require("express-validator");
const { check, param } = require("express-validator");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const {
  sequelize,
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { Op } = require("sequelize");
//get all spots by current user
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const currUserSpots = await Spot.findAll({
    where: { ownerId: userId },
    raw: true,
  });

  for (let i = 0; i < currUserSpots.length; i++) {
    const spot = currUserSpots[i];

    const numReviews = await Review.count({ where: { spotId: spot.id } });
    const sumRatings = await Review.sum("stars", {
      where: { spotId: spot.id },
    });

    if (numReviews > 0 && sumRatings > 0)
      spot.avgRating = sumRatings / numReviews;
    else spot.avgRating = null;

    const spotPreviews = await SpotImage.findAll({
      where: { spotId: spot.id },
      raw: true,
    });
    if (spotPreviews) {
      spotPreviews.forEach((item) => {
        if (item.preview === true || item.preview === 1)
          spot.previewImage = item.url;
      });

      if (!spot.previewImage) spot.previewImage = null;
    } else spot.previewImage = null;
  }

  res.json({ Spots: currUserSpots });
});
//get all spots with queries
router.get("/", async (req, res, next) => {
  let err = { errors: {} };
  let { size, page, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  size = parseInt(size);
  page = parseInt(page);
  minLat = parseFloat(minLat);
  maxLat = parseFloat(maxLat);
  minLng = parseFloat(minLng);
  maxLng = parseFloat(maxLng);
  minPrice = parseInt(minPrice);
  maxPrice = parseInt(maxPrice);

  const pagination = {};
  if (size >= 1 && size <= 20) size = size;
  if (page >= 1 && page <= 10) page = page;
  if (size < 1) err.errors.size = "Size must be greater than 0";
  if (page < 1) err.errors.page = "Page must be greater than 0";

  if (!size) size = 20;
  if (!page) page = 1;

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const where = {};
  if (minLat) {
    if (minLat >= -90) where.lat = minLat;
    else
      err.errors.minLat = "Minimum latitude must be greater than -90 degrees";
  }
  if (maxLat) {
    if (maxLat <= 90) where.lat = maxLat;
    else err.errors.maxLat = "Maximum latitude must be less than 90 degrees";
  }
  if (minLng) {
    if (minLng >= -180) where.lng = minLng;
    else
      err.errors.minLng = "Minimum longitude must be greater than -180 degrees";
  }
  if (maxLng) {
    if (maxLng <= 180) where.lng = maxLng;
    else err.errors.maxLng = "Maximum longitude must be less than 180 degrees";
  }
  if (minPrice) {
    if (minPrice > 0) where.price = minPrice;
    else err.errors.minPrice = "Minimum price must be greater than 0 dollars";
  }
  if (maxPrice) {
    if (maxPrice > 0) where.price = maxPrice;
    else err.errors.maxPrice = "Maximum price must be greater than 0 dollars";
  }

  if (
    err.errors.size ||
    err.errors.page ||
    err.errors.minLat ||
    err.errors.maxLat ||
    err.errors.minLng ||
    err.errors.maxLng ||
    err.errors.minPrice ||
    err.errors.maxPrice
  ) {
    err.title = "Validation Error";
    err.message = "Validation Error";
    err.status = 400;
    return next(err);
  }

  const spots = await Spot.findAll({ where, raw: true, ...pagination });
  for (let i = 0; i < spots.length; i++) {
    const spot = spots[i];

    const numReviews = await Review.count({ where: { spotId: spot.id } });
    const sumRatings = await Review.sum("stars", {
      where: { spotId: spot.id },
    });
    if (numReviews > 0 && sumRatings > 0)
      spot.avgRating = sumRatings / numReviews;
    else spot.avgRating = null;

    const spotPreviews = await SpotImage.findAll({
      where: { spotId: spot.id },
      raw: true,
    });
    if (spotPreviews) {
      spotPreviews.forEach((preview) => {
        if (preview.preview === true || preview.preview === 1)
          spot.previewImage = preview.url;
      });
      if (!spot.previewImage) spot.previewImage = null;
    } else spot.previewImage = null;
  }
  res.json({ Spots: spots, page, size });
});

//get all spots by current user
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const currUserSpots = await Spot.findAll;
});

module.exports = router;
