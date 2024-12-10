import Queue from "../../Queue";

export default class ProcessPayment {

    constructor(
        readonly queue: Queue
    ){}

    async execute(input: Input): Promise<void> {
        console.log("ProcessPayment: ", input);
        const paymentApprovedEvent = {
            orderId: input.orderId,
            status: "sucess"
        }
        await this.queue.publish("paymentApproved", paymentApprovedEvent);
    }
}

export type Input = {
    orderId: string,
    amount: number,
    creaditCardToken: string,
}

export type Output = {
    orderId: string,
    status: string
}