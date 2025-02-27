import { Router } from 'express';
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtController.js';

const router = Router();


router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route(':thoughtId/reactions')
    .post(createReaction);

router.route(':thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

    export default router;