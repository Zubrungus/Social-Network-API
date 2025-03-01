import Thought from "../models/Thought.js"
import { Request, Response } from 'express';
import User from "../models/User.js";

//gets all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//finds a single thought with ID matching the one in the URL
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID found' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//creates a thought with details matching those in the request body
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);

        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true },
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with this username found' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//finds a single thought matching the ID in the URL, and updates it with information from the request body
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID found' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//deletes thought matching ID from URL, and removes that thought from the user's thought list
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        await User.findOneAndUpdate(
            { username: thought?.username },
            { $pull: { thoughts: req.params.thoughtId } },
            { runValidators: true, new: true },
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID found' });
        }

        res.json({ message: 'Thought deleted' });
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//creates reaction to a thought matching the ID from the URL, reaction details will match those from the request body
export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID found' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json('Error: ' + err);
        return;
    }
};

//finds thought matching thoughtId param from URL, then removes reaction matching reactionId param from URL
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true },
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID found' });
        }

        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};
