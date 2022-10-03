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

//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  if (!booking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }
  if (currentDate >= booking.startDate && currentDate <= booking.endDate) {
    return res.status(403).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }
  await booking.destroy();
  return res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

router.put("/:bookingId", requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!startDate || !endDate || endDate <= startDate) {
    return res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    });
  }
  if (!booking)
    return res
      .status(404)
      .json({ message: "Booking couldn't be found", statusCode: 404 });

  if (endDate < booking.endDate)
    return res
      .status(403)
      .json({ message: "Past bookings can't be modified", statusCode: 403 });

  if (
    (booking.startDate >= startDate && booking.endDate <= endDate) ||
    (booking.startDate <= startDate && booking.endDate >= endDate)
  ) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  booking.startDate = startDate;
  booking.endDate = endDate;
  booking.save();

  return res.json(booking);
});
router.get("/current", requireAuth, async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: {
      model: Spot,
      attributes: { exclude: ["createdAt", "updatedAt", "description"] },
      include: {
        model: SpotImage,
        where: { preview: true },
        attributes: ["url"],
      },
    },
  });
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i].toJSON();
    const previewImage = booking.Spot.SpotImages;

    if (previewImage) booking.Spot.previewImage = previewImage.url;
    else booking.Spot.previewImage = null;
  }
  return res.json({ Bookings: bookings });
});

module.exports = router;
