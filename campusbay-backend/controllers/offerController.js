// controllers/offerController.js

const Offer = require("../models/offer"); // assuming this exists
const Listing = require("../models/listing"); // if you want to reference listings
const mongoose = require("mongoose");

// Create a new offer
exports.makeOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all offers for a particular user
exports.getOffersForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const offers = await Offer.find({ receiver: userId });
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept an offer
exports.acceptOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.offerId,
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reject an offer
exports.rejectOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.offerId,
      { status: "rejected" },
      { new: true }
    );
    res.status(200).json(offer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
