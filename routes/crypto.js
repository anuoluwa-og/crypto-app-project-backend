import { Router } from 'express';
import { getAllCryptos, getGainers, getNewListings, addCrypto } from '../controllers/cryptoController.js';

const router = Router();
router.get('/', getAllCryptos);
router.get('/gainers', getGainers);
router.get('/new', getNewListings);
router.post('/', addCrypto);

export default router;