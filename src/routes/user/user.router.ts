import express, { Router } from 'express';
import UserController from '../../controllers/user/user.controller';

const router: Router = express.Router();
const controller = UserController.getInstance() as UserController;
router.get('', controller.createUser);

export default router;
