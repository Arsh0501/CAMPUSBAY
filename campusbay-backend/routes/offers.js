const express = require("express");
const {
  makeOffer,
  getOffersForUser,
  acceptOffer,
  rejectOffer,
} = require("../controllers/offerController");

const router = express.Router();

router.post("/", makeOffer);                       // Make barter/offer
router.get("/:userId", getOffersForUser);          // See offers for user
router.patch("/accept/:offerId", acceptOffer);     // Accept
router.patch("/reject/:offerId", rejectOffer);     // Reject

module.exports = router;
