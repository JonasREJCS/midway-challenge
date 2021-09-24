import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductService } from './module/product/product.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const productService = app.get(ProductService);
  productService.initProductsDatabase()

  await app.listen(3000);
}
bootstrap();
