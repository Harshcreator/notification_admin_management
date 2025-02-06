import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    type: { type: String, enum: ['email', 'push', 'in-app'], required: true },
    message: { type: String, required: true },
    recipients: [{ type: String }],
    scheduledTime: { type: Date },
    status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Notification', NotificationSchema);