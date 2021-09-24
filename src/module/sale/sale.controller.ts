/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterSaleDTO } from './dtos/registerSale.dto';
import { SaleInterface } from './interfaces';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) { }

  @Post()
  async registerSale(
    @Body(ValidationPipe) registerSaleDTO: RegisterSaleDTO,
  ): Promise<SaleInterface | any> {
    try {
      const result = await this.saleService.registerSale(registerSaleDTO);
      return result
    } catch (error) {
      return {
        error: true,
        message: error.message
      }
    }
  }
}
