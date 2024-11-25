import Order from "../../domain/Order";
import CourseRepository from "../repository/CourseRepository";
import OrderRepository from "../repository/OrderRepository";

export default class Checkout {
    constructor(
        readonly orderRepository: OrderRepository,
        readonly courseRepository: CourseRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const course = await this.courseRepository.get(input.courseId);
        const order = Order.create(input.courseId, input.name, input.email, course.amount);
        await this.orderRepository.save(order)
        return {
            orderId: order.orderId
        };
    }
}

type Input = {
    courseId: string;
    name: string;
    email: string;
    creditCardToken: string
}

type Output = {
    orderId: string;
}