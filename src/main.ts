import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validateEnvVars } from './core/config';
import { ProductService } from './module/product/product.service';

async function bootstrap() {
  validateEnvVars()

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Midway Riachuelo Challenge')
    .setDescription('This API implements product sale and cancellation.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const productService = app.get(ProductService);
  productService.initProductsDatabase()

  await app.listen(3000);
}
bootstrap();
