import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsNumber,
} from 'class-validator';

export class CancelSaleDTO {
    @IsNotEmpty({
        message: 'fiscalNoteId is required',
    })
    @ApiProperty({ type: String, description: 'fiscalNoteId' })
    fiscalNoteId: string

    @IsNotEmpty({
        message: 'productId is required',
    })
    @IsNumber()
    @ApiProperty({ type: Number, description: 'productId' })
    productId: number

    @IsNotEmpty({
        message: 'cpf is required',
    })
    @ApiProperty({ type: String, description: 'cpf' })
    cpf: string
}