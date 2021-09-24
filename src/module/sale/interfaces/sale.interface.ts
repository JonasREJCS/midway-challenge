import { FiscalNoteInterface } from ".";
import { ProductInterface } from "../../product/product.interface";

export interface SaleInterface {
    _id?: string,
    productData: Pick<ProductInterface, 'id' | 'nome' | 'tamanho' | 'tipo' | 'descricao'>,
    fiscalNote: FiscalNoteInterface
}