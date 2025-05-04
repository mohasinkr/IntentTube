import { Router } from 'express';
import { ChannelsController } from './channels.controller';

const router = Router();

router.get('/subscribed', ChannelsController.getSubscribedChannels);
router.post('/add', ChannelsController.addChannels);
router.delete('/remove', ChannelsController.removeChannel);

export default router; 