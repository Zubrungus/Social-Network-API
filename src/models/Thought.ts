import { Schema, model, Document, ObjectId } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: ObjectId[];
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: String,
        createdAt: Date,
        username: String,
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        }],
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