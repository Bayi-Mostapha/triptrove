import Property from "../models/property.model.js";
import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import moment from "moment";
 
// Retrieve a property by ID
export const getProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId).populate(
      "owner",
      "fullName image createdAt"
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const reviews = await Review.find({ property: propertyId }).populate(
      "author",
      "fullName image"
    );
    const bookings = await Booking.find({
      property: propertyId,
      status: "paid",
    });
    const reservations = bookings.flatMap((booking) => {
      const checkIn = moment(booking.checkIn);
      const checkOut = moment(booking.checkOut);
      const dates = [];
      while (checkIn.isBefore(checkOut)) {
        dates.push(checkIn.format("YYYY-MM-DD"));
        checkIn.add(1, "days");
      }
      return dates;
    });

    res.json({ property, reviews, reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "owner",
      "fullName image"
    );
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new property
export const createProperty = async (req, res) => {
  const {
    title,
    description,
    streetAddress,
    city,
    photos,
    price,
    cleaningFees,
    guests,
    bedrooms,
    bathrooms,
    beds,
    hasWifi,
    hasPool,
    hasTv,
    hasWasher,
    hasPark,
    hasKitchen,
    hasDesk,
    allowsPets,
  } = req.body;

  try {
    const newProperty = new Property({
      title,
      description,
      owner: req.userId,
      streetAddress,
      city,
      photos,
      price,
      cleaningFees,
      guests,
      bedrooms,
      bathrooms,
      beds,
      hasWifi,
      hasPool,
      hasTv,
      hasWasher,
      hasPark,
      hasKitchen,
      hasDesk,
      allowsPets,
    });

    const savedProperty = await newProperty.save();

    res.status(201).json(savedProperty);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create property", error: error.message });
  }
};

// Update an existing property
export const updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  const updates = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updates,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(updatedProperty);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update property", error: error.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;

  try {
    const deletedProperty = await Property.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete property", error: error.message });
  }
};

// get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate('owner', '-password').populate({ path: 'rentalCount' });
    res.status(200).json(properties.map(property => ({
      ...property.toObject(),
      createdAt: property.createdAt.toISOString().split('T')[0].replace(/-/g, '/'), // Format join date
    })));
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete property", error: error.message });
  }
};
