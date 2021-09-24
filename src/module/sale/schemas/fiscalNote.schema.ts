import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const FiscalNoteSchema = new Schema({
    id: String,
    productId: Number,
    cpf: String,
    saleDate: Date
});