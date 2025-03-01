import User from "../models/User.js";
import { Request, Response } from 'express';

//returns all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//returns single user matching userId param
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

//creates user with details from request body
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//finds user matching userId param then updates properties with properties from the request body
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true },
        );

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

//finds user matching userId param and deletes them
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with this ID found' });
        }

        res.json({ message: 'User deleted' });
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
};

//finds user matching userId param then adds id from friendId param to user's friend list
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        );

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

//finds user matching userId param then removes id matching id from friendId param
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true },
        );

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
