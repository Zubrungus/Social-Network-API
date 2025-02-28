import { Schema, model, Document, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
};

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
};

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: String,
        reactionBody: String,
        username: String,
        createdAt: { type: Date, default: Date.now },
    }
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: String,
        createdAt: { type: Date, default: Date.now },
        username: String,
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return `${this.reactions.length}`
    });

const Thought = model('thought', thoughtSchema);

export default Thought;