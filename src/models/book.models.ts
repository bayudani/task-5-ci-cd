import mongoose, {Document, Schema} from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    publishYear:number;
}

const bookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publishYear: {type: Number, required: true}
})

export default mongoose.model<IBook>('Book', bookSchema);