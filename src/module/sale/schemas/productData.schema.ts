import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const ProductDataSchema = new Schema({
    id: Number,
    nome: String,
    tipo: String,
    tamanho: String,
    descricao: String
});