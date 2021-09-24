import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export const ProductSchema = new Schema({
    id: Number,
    nome: String,
    valor: Number,
    estoque: Number,
    tamanho: String,
    tipo: String,
    descricao: String,
    dataCadastro: Date,
    dataAtualizacao: {
        type: Date,
        default: void 0
    }

}, { timestamps: false, strict: true });