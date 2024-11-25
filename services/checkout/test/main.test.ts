import Checkout from "../src/application/usecase/Checkout";

test("Deve realizar o checkout", async function() {
    const orderRepository = new OrderRepository();
    const courseRepository = new CourseRepository();
    const checkout = new Checkout(orderRepository, courseRepository);
    const input = {
        courseId: "83e88f3a-49a5-43e0-a07a-8dd9e64c0915",
        name: "John Doe",
        email: "johndoe@email.com",
        creditCardToken: "123456789",

    }
    const output= await checkout.execute(input);
    expect(output.orderId).toBeDefined();
});