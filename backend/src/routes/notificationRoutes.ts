import { Router } from 'express';
import { createNotification, getNotifications, updateNotification, deleteNotification } from '../controllers/notificationController';

const router = Router();

router.post('/', createNotification);
router.get('/', getNotifications);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

export default router;