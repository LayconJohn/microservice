import ConfirmOrder from "./application/usecase/ConfirmOrder";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import OrderRepositoryDatabase from "./infra/repository/OrderRepositoryDatabase";

async function main(){
    const queue = new RabbitMQAdapter();
    await queue.connect();
    const orderRepository = new OrderRepositoryDatabase();
    const confirmorder = new ConfirmOrder(orderRepository);
    queue.consume("paymentApproved", async function(input: any) {
        await confirmorder.execute(input);
    });

}


