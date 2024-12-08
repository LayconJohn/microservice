import OrderRepository from "../../application/repository/OrderRepository";
import Order from "../../domain/Order";
import pgp from "pg-promise";

export default class OrderRepositoryDatabase implements OrderRepository {
    async save(order: Order): Promise<void> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        await connection.query("INSERT INTO microservices.order (order_id, course_id, name, email,status, amount) VALUES ($1, $2, $3, $4, $5, $6)", [order.orderId, order.courseId, order.name, order.email, order.status, order.amount]);
        await connection.$pool.end();
    }

    async update(order: Order): Promise<void> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        await connection.query("UPDATE microservices.order set status = $1 WHERE order_id = $2", [order.status, order.orderId]);
        await connection.$pool.end();
    }

    async get(orderId: string): Promise<Order> {
        const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
        const [orderData] = await connection.query("SELECT * FROM microservices.order WHERE order_id = $1", [orderId]);
        await connection.$pool.end();

        return new Order(
            orderData.orderId, 
            orderData.courseId, 
            orderData.name, 
            orderData.email, 
            parseFloat(orderData.amount), 
            orderData.status
        );
    }

} 