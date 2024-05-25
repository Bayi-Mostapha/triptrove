import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
        user_id: { 
            type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
            required: true,
            ref: 'User'
        },
        message: {
            type: String,
            required: true
        },
        link: {
            type: String,
            default: null
        },
        read: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
