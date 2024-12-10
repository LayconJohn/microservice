import express, { Request, Response } from "express";

const app = express();

app.use(express.json());


app.post("/process_payment", (req: Request, res: Response) => {
    console.log("processPayment: ", req.body);

    const input = req.body;

    res.json({
        orderId: input.orderId,
        status: "sucess"
    })
})

app.listen(3001);