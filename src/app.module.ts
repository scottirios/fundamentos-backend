import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { PrismaService } from 'prisma.service';
import { CreateProductService } from './create-product.service';
import { ProductsRepository } from './products.repository';
import { CreateModelService } from './create-model.service';
import { ModelsRepository } from './models.repository';
import { CreatedModelController } from './create-model.controller';
import { GetProductsController } from './fetch-recent-products.controller';

@Module({
  imports: [],
  controllers: [CreateProductController, CreatedModelController, GetProductsController],
  providers: [PrismaService, CreateProductService, ProductsRepository, CreateModelService, ModelsRepository],
})

export class AppModule { }
