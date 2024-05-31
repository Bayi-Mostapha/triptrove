import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    photos: {
      type: [ String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    cleaningFees: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    hasWifi: {
      type: Boolean,
      default: false,
    },
    hasPool: {
      type: Boolean,
      default: false,
    },
    hasTv: {
      type: Boolean,
      default: false,
    },
    hasWasher: {
      type: Boolean,
      default: false,
    },
    hasPark: {
      type: Boolean,
      default: false,
    },
    hasKitchen: {
      type: Boolean,
      default: false,
    },
    hasDesk: {
      type: Boolean,
      default: false,
    },
    allowsPets: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

propertySchema.virtual('rentalCount', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'property',
  count: true
});




const Property = mongoose.model("Property", propertySchema);

export default Property;
