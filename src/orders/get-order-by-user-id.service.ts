import { Injectable, NotFoundException } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { OrderItem } from "@prisma/client";

export interface Order {
  id: string;
  userId: string;
  total: number;
  orderItems: OrderItem[];
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface GetOrderByUserIdServiceRequest {
  userId: string;
}

type GetOrderByUserIdServiceResponse = {
  orders: Order[];
};

@Injectable()
export class GetOrderByUserIdService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    userId,
  }: GetOrderByUserIdServiceRequest): Promise<GetOrderByUserIdServiceResponse> {
    const orders = await this.ordersRepository.findByUserId(userId);

    if (!orders || orders.length === 0) {
      throw new NotFoundException("User not found or no orders for this user.");
    }

    const newOrders: Order[] = orders.map((order) => ({
      id: order.id?.toString() || "",
      userId: order.userId,
      total: order.total,
      orderItems: order.orderItems,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return {
      orders: newOrders,
    };
  }
}
