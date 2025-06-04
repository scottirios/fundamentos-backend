import { Module } from '@nestjs/common';
import { CreateProductController } from './create-product.controller';
import { PrismaService } from 'prisma.service';
import { CreateProductService } from './create-product.service';
import { ProductsRepository } from './products.repository';
import { CreateModelService } from './create-model.service';
import { ModelsRepository } from './models.repository';
import { CreatedModelController } from './create-model.controller';
import { FetchRecentProductsController } from './fetch-recent-products.controller';
import { FetchRecentProductsService } from './fetch-recent-products.service';
import { FetchRecentModelsController } from './fetch-recent-models.controller';
import { FetchRecentModelsService } from './fetch-recent-models.service';
import { DeleteProductController } from './delete-product.controller';
import { DeleteProductService } from './delete-product.service';
import { GetProductByIdController } from './get-product-by-id.controller';
import { GetProductByIdService } from './get-product-by-id.service';

@Module({
  imports: [],
  controllers: [CreateProductController, CreatedModelController, FetchRecentProductsController, FetchRecentModelsController, DeleteProductController, GetProductByIdController],
  providers: [PrismaService, CreateProductService, ProductsRepository, CreateModelService, ModelsRepository, FetchRecentProductsService, FetchRecentModelsService, DeleteProductService, GetProductByIdService],
})

export class AppModule { }
