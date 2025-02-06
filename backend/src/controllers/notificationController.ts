import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { io } from '../server';

export const createNotification = async (req: Request, res: Response) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        io.emit('notification', notification);
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getNotifications = async (_req: Request, res: Response) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteNotification = async (req: Request, res: Response) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
