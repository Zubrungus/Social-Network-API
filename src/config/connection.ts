import mongoose from 'mongoose';

//connects to module17DB
mongoose.connect('mongodb://127.0.0.1:27017/module17DB');

export default mongoose.connection;
