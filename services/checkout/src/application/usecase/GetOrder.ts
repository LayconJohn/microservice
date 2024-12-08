import OrderRepository from "../repository/OrderRepository";

export default class GetOrder {
    constructor(
        readonly orderRepository: OrderRepository
    ) {}

    async execute(orderId: string): Promise<Output> {
        const order = await this.orderRepository.get(orderId);
        return {
            orderId: order.orderId,
            name: order.name,
            email: order.email,
            amount: order.amount,
            status: order.status
        }
    }
}

type Output = {
    orderId: string;
    name: string;
    email: string;
    amount: number;
    status: string;
}