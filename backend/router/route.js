import { Router } from "express";

import * as controller from '../controllers/controller.js';
import * as auth from '../controllers/authController.js';

const router = Router();

router.route('/signup').post(auth.signup);
router.route('/login').post(auth.login);


router.route('/questions')
   .get(controller.getQuestions)
   .post(controller.insertQuestions)
   .delete(controller.dropQuestions)




   router.route('/result')
        .get(controller.getResult)
        .post(controller.storeResult)
        .delete(controller.dropResult)

   router.route('/result/:id')
        .delete(controller.deleteResultById)


export default router;