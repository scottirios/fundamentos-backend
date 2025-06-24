import { Module } from "@nestjs/common";
import { CreateProductController } from "./products/create-product.controller";
import { PrismaService } from "./prisma.service";
import { CreateProductService } from "./products/create-product.service";
import { ProductsRepository } from "./products/products.repository";
import { CreateModelController } from "./models/create-model.controller";
import { DeleteModelController } from "./models/delete-model.controller";
import { DeleteProductController } from "./products/delete-product.controller";
import { EditModelController } from "./models/edit-model.controller";
import { EditProductController } from "./products/edit-product.controller";
import { FetchRecentModelsController } from "./models/fetch-recent-models.controller";
import { FetchRecentProductsController } from "./products/fetch-recent-products.controller";
import { GetProductByIdController } from "./products/get-product-by-id.controller";
import { GetModelByIdController } from "./models/get-model-by-id.controller";
import { CreateModelService } from "./models/create-model.service";
import { DeleteModelService } from "./models/delete-model.service";
import { DeleteProductService } from "./products/delete-product.service";
import { EditModelService } from "./models/edit-model.service";

import { FetchRecentModelsService } from "./models/fetch-recent-models.service";

import { GetProductByIdService } from "./products/get-product-by-id.service";
import { GetModelByIdService } from "./models/get-model-by-id.service";

import { ModelsRepository } from "./models/models.repository";
import { UpdateAvailableProductController } from "./products/update-available-product.controller";
import { EditProductService } from "./products/edit-product.service";
import { FetchRecentProductsService } from "./products/fetch-recent-products.service";
import { UpdateAvailableProductService } from "./products/update-available-product.service";
import { CreateUserController } from "./users/create-user.controller";
import { UserRepository } from "./users/users.repository";
import { CreateUserService } from "./users/create-user.service";
import { FetchRecentUsersService } from "./users/fetch-recent-users.service";
import { FetchRecentUsersController } from "./users/fetch-recent-users.controller";
import { CreateProfileService } from "./profiles/create-profile.service";
import { ProfileRepository } from "./profiles/profiles.repository";
import { CreateProfileController } from "./profiles/create-profile.controller";
import { GetUserByIdController } from "./users/get-user-by-id.controller";
import { GetUserByIdService } from "./users/get-user-by-id.service";
import { EditUserController } from "./users/edit-user.controller";
import { EditUserService } from "./users/edit-user.service";
import { DeleteUserController } from "./users/delete-user.controller";
import { DeleteUserService } from "./users/delete-user.service";
import { GetProfileByIdController } from "./profiles/get-profile-by-id.controller";
import { GetProfileByIdService } from "./profiles/get-profile-by-id.service";
import { EditProfileController } from "./profiles/edit-profile.controller";
import { EditProfileService } from "./profiles/edit-profile.service";
import { CreateOrderService } from "./orders/create-order.service";
import { GetOrderByIdService } from "./orders/get-order-by-id.service";
import { GetOrderByUserIdService } from "./orders/get-order-by-user-id.service";
import { CreateOrderController } from "./orders/create-order.controller";
import { GetOrderByIdController } from "./orders/get-order-by-id.controller";
import { GetOrderByUserIdController } from "./orders/get-order-by-user-id.controller";
import { OrdersRepository } from "./orders/orders.repository";

@Module({
  imports: [],
  controllers: [
    CreateProductController,
    CreateModelController,
    DeleteModelController,
    DeleteProductController,
    EditModelController,
    EditProductController,
    FetchRecentModelsController,
    FetchRecentProductsController,
    GetProductByIdController,
    GetModelByIdController,
    UpdateAvailableProductController,
    CreateUserController,
    FetchRecentUsersController,
    CreateProfileController,
    GetUserByIdController,
    EditUserController,
    DeleteUserController,
    GetProfileByIdController,
    EditProfileController,
    CreateOrderController,
    GetOrderByIdController,
    GetOrderByUserIdController,
  ],
  providers: [
    PrismaService,
    CreateProductService,
    CreateModelService,
    DeleteModelService,
    DeleteProductService,
    EditModelService,
    EditProductService,
    FetchRecentModelsService,
    FetchRecentProductsService,
    GetProductByIdService,
    GetModelByIdService,
    UpdateAvailableProductService,
    ProductsRepository,
    ModelsRepository,
    UserRepository,
    CreateUserService,
    FetchRecentUsersService,
    CreateProfileService,
    ProfileRepository,
    GetUserByIdService,
    EditUserService,
    DeleteUserService,
    GetProfileByIdService,
    EditProfileService,
    CreateOrderService,
    GetOrderByIdService,
    GetOrderByUserIdService,
    OrdersRepository,
  ],
})
export class AppModule {}
