import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const facade = ProductAdmFacadeFactory.create();
  try {
    const productDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };
    await facade.addProduct(productDto);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});