import ProcessPayment from "./application/usecase/ProcessPayment";
import RabbitMQAdapter from "./RabbitMQAdapter";

async function main() {
    const queue = new RabbitMQAdapter();
    const processPayment = new ProcessPayment(queue);
    await queue.connect();
    queue.consume("orderPlaced", async (input: any) => {
        await processPayment.execute(input);
    })
}

main();
