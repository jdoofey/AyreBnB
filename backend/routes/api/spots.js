const express = require("express");
const { handleValidationErrors } = require("../../utils/validation");
const { check, param } = require("express-validator");
const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const {
  User,
  Spot,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { Op } = require("sequelize");
const router = express.Router();
const validateSpot = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is required")
    .isLength({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is required")
    .isLength({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  handleValidationErrors,
];
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .withMessage("Stars is required")
    .isLength({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];
//create a bookingfor spot based on id
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot)
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: res.statusCode });
  if (req.user.id === spot.ownerId)
    return res.status(403).json({ message: "Forbidden", statusCode: 403 });

  const bookings = await spot.getBookings();
  let errors = {};
  if (startDate > endDate) {
    let err = new Error("Validation error");
    err.status = 400;
    errors.endDate = "endDate cannot be on or before startDate";
    err.errors = errors;
    return next(err);
  }
  for (let i = 0; i < bookings.length; i++) {
    if (
      (startDate >= bookings[i].startDate &&
        startDate <= bookings[i].endDate) ||
      (endDate >= bookings[i].startDate && endDate <= bookings[i].endDate)
    ) {
      let err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      if (
        startDate >= bookings[i].startDate &&
        startDate <= bookings[i].endDate
      ) {
        errors.startDate = "Start date conflicts with an existing booking";
      }
      if (endDate >= bookings[i].startDate && endDate <= bookings[i].endDate) {
        errors.endDate = "End date conflicts with an existing booking";
      }
      err.errors = errors;
      return next(err);
    }
  }

  const newBooking = await Booking.create({
    startDate: startDate,
    endDate: endDate,
    userId: req.user.id,
    spotId: spot.id,
  });
  return res.json(newBooking);
});
//create a review for spot based on id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const singleSpot = await Spot.findByPk(req.params.spotId);
    if (singleSpot) {
      const spot = singleSpot.toJSON();
      const review = await Review.findOne({
        where: { userId: req.user.id, spotId: spot.id },
      });
      if (review)
        return res.status(403).json({
          message: "User already has a review for this spot",
          statusCode: 403,
        });
      else {
        const { review, stars } = req.body;
        const currentReview = await singleSpot.createReview({
          userId: req.user.id,
          review,
          stars,
        });
        return res.status(201).json(currentReview);
      }
    } else
      return res
        .status(404)
        .json({ message: "Spot couldn't be found", statusCode: 404 });
  }
);
//get all reviews by spot id
router.get("/:spotId/reviews", async (req, res, next) => {
  const singleSpot = await Spot.findByPk(req.params.spotId);
  if (singleSpot) {
    const spot = singleSpot.toJSON();
    const reviews = await Review.findAll({
      where: { spotId: spot.id },
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: ReviewImage, attributes: ["id", "url"] },
      ],
    });
    return res.json({ Reviews: reviews });
  } else {
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  }
});
//delete a spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(parseInt(req.params.spotId));
  if (spot) {
    if (spot.ownerId === req.user.id) {
      await spot.destroy();
      res.json({ message: "Successfully deleted", statusCode: 200 });
    } else {
      const err = new Error("Forbidden");
      err.title = "Authorization Error";
      err.message = "Forbidden";
      err.status = 403;
      return next(err);
    }
  } else
    res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
});
//edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  const spot = await Spot.findByPk(parseInt(req.params.spotId));
  const { name, description, price, address, city, state, country, lat, lng } =
    req.body;

  if (spot) {
    if (spot.ownerId === req.user.id) {
      if (name) spot.name = name;
      if (description) spot.description = description;
      if (price) spot.price = price;
      if (address) spot.address = address;
      if (city) spot.city = city;
      if (state) spot.state = state;
      if (country) spot.country = country;
      if (lat) spot.lat = lat;
      if (lng) spot.lng = lng;
      await spot.save();
      res.json(spot);
    } else {
      const err = new Error("Forbidden");
      err.title = "Authorization Error";
      err.message = "Forbidden";
      err.status = 403;
      return next(err);
    }
  } else {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});

//add an image to a spot based on spot id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot)
    return res
      .status(404)
      .json({ message: "Spot couldn't be found", statusCode: 404 });
  const spotImage = await SpotImage.create({ spotId: spot.id, url, preview });
  res.json({ id: spotImage.id, url, preview });
});
//create a spot
router.post("/", requireAuth, async (req, res, next) => {
  const { name, description, price, address, city, state, country, lat, lng } =
    req.body;

  if (
    name &&
    description &&
    price &&
    address &&
    city &&
    state &&
    country &&
    lat &&
    lng
  ) {
    const spot = await Spot.create({
      ownerId: req.user.id,
      name,
      description,
      price,
      address,
      city,
      state,
      country,
      lat,
      lng,
    });
    res.status(201).json(spot);
  } else {
    let err = {};
    err.errors = {};
    if (!name) err.errors.name = "Name must be less than 50 characters";
    if (!description) err.errors.description = "Description is required";
    if (price.length === 0) err.errors.price = "Price per day is required";
    if (!address) err.errors.address = "Street address is required";
    if (!city) err.errors.city = "City is required";
    if (!state) err.errors.state = "State is required";
    if (!country) err.errors.country = "Country is required";
    if (!lat) err.errors.lat = "Latitude is not valid";
    if (!lng) err.errors.lng = "Longitude is not valid";

    err.title = "Validation Error";
    err.message = "Validation Error";
    err.status = 400;
    return next(err);
  }
});
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
//get details of a spot by id
router.get("/:spotId", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const spotDeets = spot.toJSON();

    spotDeets.numReviews = await Review.count({ where: { spotId: spot.id } });
    const reviewSum = await Review.sum("stars", { where: { spotId: spot.id } });
    spotDeets.avgStarRating = reviewSum / spotDeets.numReviews;
    spotDeets.spotImages = await SpotImage.findAll({
      where: { spotId: spot.id },
      attributes: ["id", "url", "preview"],
    });
    spotDeets.Owner = await User.findByPk(spot.ownerId, {
      attributes: ["id", "firstName", "lastName"],
    });

    res.json(spotDeets);
  } else
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
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

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot) {
    if (spot.ownerId === req.user.id) {
      const spotBookings = await Booking.findAll({
        where: { spotId: spot.id },
        include: {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      });
      return res.json({ Bookings: spotBookings });
    } else {
      const userSpotBookings = await Booking.findAll({
        where: {
          spotId: spot.id,
          userId: req.user.id,
        },
        attributes: ["spotId", "startDate", "endDate"],
      });
      return res.json({ Bookings: userSpotBookings });
    }
  } else {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
});

module.exports = router;
