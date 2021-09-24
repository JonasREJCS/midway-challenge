import * as mongoose from 'mongoose';
import { ProductDataSchema, FiscalNoteSchema } from '.';

const { Schema } = mongoose;

export const SaleSchema = new Schema({
    productData: {
        type: ProductDataSchema,
        _id: false
    },
    fiscalNote: {
        type: FiscalNoteSchema,
        _id: false
    }
}, { timestamps: false, strict: true, _id: true });