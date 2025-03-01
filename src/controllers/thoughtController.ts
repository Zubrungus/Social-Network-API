import Thought from "../models/Thought.js"
import { Request, Response } from 'express';
import User from "../models/User.js";
import { ObjectId } from "mongoose";

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

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        
        const user = await User.findOneAndUpdate(
            {username: req.body.username},
            {$addToSet: thought._id as ObjectId},
            {runValidators: true, new: true},
        );
        
        if(!user){
            return res.status(404).json({ message: 'No user with this username found' });
        }
        
        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

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

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = Thought.findOneAndDelete({ _id: req.params.thoughtId })

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

export const createReaction = async (req: Request, res: Response) => {
    try {
        const thought = Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.params.body } },
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
