import Checkout from "../src/application/usecase/Checkout";
import GetOrder from "../src/application/usecase/GetOrder";
import CourseRepositoryDatabase from "../src/infra/repository/CourseRepositoryDatabase";
import OrderRepositoryDatabase from "../src/infra/repository/OrderRepositoryDatabase";
import PaymentGateway from "../src/application/gateway/PaymentGateway";
import PaymentGatewayHttp from "../src/infra/gateway/PaymentGatewayHttp";
import RabbitMQAdapter from "../src/infra/queue/RabbitMQAdapter";

test("Deve realizar o checkout", async function() {
    const orderRepository = new OrderRepositoryDatabase();
    const courseRepository = new CourseRepositoryDatabase();
    const paymentGateway = new PaymentGatewayHttp()
    const queue = new RabbitMQAdapter();
    queue.connect();
    const checkout = new Checkout(
        orderRepository, 
        courseRepository, 
        paymentGateway,
        queue
    );
    const input = {
        courseId: "83e88f3a-49a5-43e0-a07a-8dd9e64c0915",
        name: "John Doe",
        email: "johndoe@email.com",
        creditCardToken: "123456789",

    }
    const outputCheckout = await checkout.execute(input);
    expect(outputCheckout.orderId).toBeDefined();

    const getOrder = new GetOrder(orderRepository);
    const outputGetOrder = await getOrder.execute(outputCheckout.orderId);
    expect(outputGetOrder.orderId).toBeDefined();
    expect(outputGetOrder.name).toBe("John Doe");
    expect(outputGetOrder.email).toBe("johndoe@email.com");
    expect(outputGetOrder.amount).toBe(1199);
    expect(outputGetOrder.status).toBe("confirmed");
});