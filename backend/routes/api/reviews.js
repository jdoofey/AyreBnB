const express = require('express')
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


module.exports = router;
