export enum SaleErrorsEnum {
    INVALID_PRODUCT_ID = 'Sale registration error: invalid soldProductId',
    INVALID_CPF = 'Sale registration error: invalid cpf',
    INVALID_DATE = 'Sale registration error: invalid date',
    INVALID_FISCAL_NOTE_ID = 'Sale registration error: invalid fiscalNoteId',
    REGISTRATION_PRODUCT_NOT_FOUND = 'Sale registration error: product not found',
    CANCELATION_PRODUCT_NOT_FOUND = 'Sale cancelation error: product not found',
    SALE_CANCELATION_NOT_FOUND = 'Sale cancelation error: sale not found',
    PRODUCT_OUT_OF_STOCK = 'Sale registration error: product out of stock',
}