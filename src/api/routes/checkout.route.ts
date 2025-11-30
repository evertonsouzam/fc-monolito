import express, { Request, Response } from "express";
import PlaceOrderUseCaseFactory from "../../modules/checkout/factory/place-order.usecase.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const usecase = PlaceOrderUseCaseFactory.create();

  try {
    const output = await usecase.execute(req.body);
    res.status(201).send(output);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ error: error.message });
    }
  }
});