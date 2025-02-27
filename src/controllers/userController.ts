import User from "../models/User.js";
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID found' });
        }

        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true},
        );

        if (!user) {
            return res.status(404).json({message: 'No user with this ID found'});
        }

        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId});

        if (!user) {
            return res.status(404).json({message: 'No user with this ID found'});
        }

        res.json({message: 'User deleted'});
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new: true},
        );

        if (!user){
            return res.status(404).json({message: 'No user with this ID found'});
        }

        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: {friendId: req.params.friendId}}},
            {runValidators: true, new: true},
        );
        
        if (!user){
            return res.status(404).json({message: 'No user with this ID found'});
        }

        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};