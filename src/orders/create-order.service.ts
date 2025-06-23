import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { ProductsRepository } from "src/products/products.repository";
import { Prisma } from "@prisma/client";
import { UserRepository } from "src/users/users.repository";

interface OrderItemRequest {
  productId: string;
  quantity: number;
}

interface CreateOrderIncluse {
  userId: string;
  orderItems: OrderItemRequest[];
}

@Injectable()
export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UserRepository
  ) {}

  async execute({ userId, orderItems }: CreateOrderIncluse): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    let total = 0;

    const itemsToCreate: any[] = [];

    for (const item of orderItems) {
      const product = await this.productsRepository.findById(item.productId);

      if (!product) {
        throw new NotFoundException(
          `Product not found for item: ${item.productId}.`
        );
      }

      if (product.inStock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${item.productId}.`
        );
      }

      total += product.price * item.quantity;

      itemsToCreate.push({
        quantity: item.quantity,
        product: {
          connect: { id: item.productId },
        },
      });
    }

    const orderData: Prisma.OrderCreateInput = {
      total,
      user: {
        connect: { id: userId },
      },
      orderItems: {
        create: itemsToCreate,
      },
    };

    await this.ordersRepository.create(orderData);
  }
}
