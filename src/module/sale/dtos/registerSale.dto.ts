import {
    IsDate,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterSaleDTO {
    @IsNotEmpty({
        message: 'saleDate is required',
    })
    @IsDateString({
    })
    saleDate: Date

    @IsNotEmpty({
        message: 'soldProductId is required',
    })
    soldProductId: number

    @IsNotEmpty({
        message: 'cpf is required',
    })
    cpf: string
}