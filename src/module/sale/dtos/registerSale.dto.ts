import { ApiProperty } from '@nestjs/swagger';
import {
    IsDateString,
    IsNotEmpty,
} from 'class-validator';

export class RegisterSaleDTO {
    @IsNotEmpty({
        message: 'saleDate is required',
    })
    @IsDateString({
    })
    @ApiProperty({ type: Date, description: 'saleDate' })
    saleDate: Date

    @IsNotEmpty({
        message: 'soldProductId is required',
    })
    @ApiProperty({ type: Number, description: 'soldProductId' })
    soldProductId: number

    @IsNotEmpty({
        message: 'cpf is required',
    })
    @ApiProperty({ type: String, description: 'cpf' })
    cpf: string
}