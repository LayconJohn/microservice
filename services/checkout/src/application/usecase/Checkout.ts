import CourseRepository from "../repository/CourseRepository";
import OrderRepository from "../repository/OrderRepository";

export default class Checkout {
    constructor(
        readonly orderRepository: OrderRepository,
        readonly courseRepository: CourseRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        const course = await this.courseRepository.get(input.courseId);
        const order = Order.create();

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