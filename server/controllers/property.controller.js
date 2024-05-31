import Property from "../models/property.model.js";
import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import moment from "moment";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/cloudinary.js"
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
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProperties = async (req, res) => {
  try {
    const {
      city,
      checkInDate,
      checkOutDate,
      guests,
      hasWifi,
      hasPool,
      hasTv,
      hasWasher,
      hasPark,
      hasKitchen,
      hasDesk,
      allowsPets
    } = req.query;

    const query = {};

    if (city) query.city = new RegExp(city, 'i');
    if (guests) query.guests = { $gte: Number(guests) };

    const amenities = { hasWifi, hasPool, hasTv, hasWasher, hasPark, hasKitchen, hasDesk, allowsPets };
    Object.keys(amenities).forEach(key => {
      if (amenities[key] !== undefined) {
        query[key] = amenities[key] === 'true';
      }
    });

    let properties = await Property.find(query);

    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      checkIn.setHours(1, 0, 0, 0);
      checkOut.setHours(0, 59, 59, 999);

      const bookedProperties = await Booking.find({
        $or: [
          { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
        ]
      }).distinct('property');

      const bookedPropertyIds = bookedProperties.map(id => id.toString());
      properties = properties.filter(property => !bookedPropertyIds.includes(property._id.toString()));
    }

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPropertyHost = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const properties = await Property.find({ owner: userId });
    if (!properties.length) {
      return res.status(404).json({ message: "No properties found" });
    }
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to retrieve properties",
      error: error.message
    });
  }
};

// get all properties of a location
export const getPropertyLocation = async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();
    const properties = await Property.find({ city });
    res.status(200).json(properties);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve properties", error: error.message });
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
      photos: [],
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
    const properties = await Property.find({}).populate('owner', '-password').populate({ path: 'rentalCount' }).lean();

    const propertiesWithRatings = await Promise.all(properties.map(async (property) => {
      const reviews = await Review.find({ property: property._id });
      const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
      const reviewCount = reviews.length;
      const rating = reviewCount > 0 ? (totalStars / reviewCount) : null;

      return {
        ...property,
        rating,
        createdAt: property.createdAt.toISOString().split('T')[0].replace(/-/g, '/'), // Format join date
      };
    }));

    res.status(200).json(propertiesWithRatings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete property", error: error.message });
  }
};

// delete properties for admin
export const deleteAdminProperties = async (req, res) => {
  const { Ids } = req.body;
  try {
    for (const property of Ids) {
      await Property.findByIdAndDelete(property);
    }

    res.status(200).json({ message: 'properties deleted successfully' });
  } catch (error) {
    console.error('Error deleting properties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const uploadImages = async (req, res) => {
  try {
    const files = req.files;
    const propertyId = req.params.id;


    let uploadedImages = [];
    for (const file of files) {
      const result = await uploadToCloudinary(file.path, "property-photos");
      uploadedImages.push(result.url);
      console.log(result)
      console.log(result.url)
    }
    console.log(uploadedImages)
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { photos: uploadedImages },
      { new: true }
    );

    res.status(200).json({ message: "Images uploaded successfully", property });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
