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
const validateReview = [
  check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
  check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars is required')
      .isLength({ min: 1, max: 5 })
      .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];
//edit a review
router.put("/:reviewId", requireAuth,validateReview, async (req, res, next) => {
  const {review, stars} = req.body;
  const currentReview = await Review.findByPk(req.params.reviewId);
  if (currentReview) {
    if (currentReview.userId===req.user.id){
      if (review) currentReview.review = review;
      if (stars) currentReview.stars = stars;
      await currentReview.save()
      res.json(currentReview)
    } else res.status(403).json({"message":"Forbidden","statusCode":403})
  } else res.status(404).json({"message":"Review couldn't be found", "statusCode":404})
})

//add image to review based on review id
router.post("/:reviewId/images", requireAuth, async (req, res, next)=> {
  const {url} = req.body
  const review = await Review.findByPk(req.params.reviewId);
  if (review) {
    if (review.userId===req.user.id){
      const reviewImageCount = await ReviewImage.count({where:{reviewId:review.id}})
      if (reviewImageCount>=10) return res.status(403).json({"message":"Maximum number of images for this resource was reached","statusCode":403})
      const currentReviewImage = await ReviewImage.create({url,reviewId:review.id})
      res.json(currentReviewImage)
    } else return res.status(403).json({"message":"Forbidden", "statusCode":403})
  }else return res.status(404).json({"message":"Review couldn't be found", "statusCode":404})
})
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
