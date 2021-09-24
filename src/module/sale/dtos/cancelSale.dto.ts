import {
    IsNotEmpty, IsNumber,
} from 'class-validator';

export class CancelSaleDTO {
    @IsNotEmpty({
        message: 'fiscalNoteId is required',
    })
    fiscalNoteId: string

    @IsNotEmpty({
        message: 'productId is required',
    })
    @IsNumber()
    productId: number

    @IsNotEmpty({
        message: 'cpf is required',
    })
    cpf: string
}