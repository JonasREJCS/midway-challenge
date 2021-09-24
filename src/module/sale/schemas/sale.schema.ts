import * as mongoose from 'mongoose';
import { ProductDataSchema, FiscalNoteSchema } from '.';

const { Schema } = mongoose;

export const SaleSchema = new Schema({
    productData: ProductDataSchema,
    fiscalNote: FiscalNoteSchema
}, { timestamps: false, strict: false });