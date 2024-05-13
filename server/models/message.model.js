import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    problemReport: { type: mongoose.Schema.Types.ObjectId, ref: 'ProblemReport', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    senderRole: {type: String},
    content: {
        type: String, required: true,
    },
},
{
    timestamps: true,
});



const Message = mongoose.model('Message', messageSchema);

export default Message;