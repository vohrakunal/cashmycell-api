import { Schema, Document, model } from 'mongoose';


export const all_pages_admin = ['dashboard', 'blogs'];

export const public_var_admin = 'name email allowed pages createdAt updatedAt';

export interface IAdmin extends Document {
    name: string,
    password: string,
    email: string,
    allowed: boolean,
    pages: string[]
}


const adminSchema = new Schema<IAdmin>({
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    allowed: {
        type: Boolean,
        default: true
    },
    pages: {
        type: [String],
        enum: all_pages_admin,
    }
}, {
    collection: 'admin',
    versionKey: false,
    timestamps: true
});


export default model<IAdmin>('admin', adminSchema);