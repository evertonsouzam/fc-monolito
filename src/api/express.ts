import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { OrderModel } from "../modules/checkout/repository/order.model";
import { OrderProductModel } from "../modules/checkout/repository/order-product.model";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import  TransactionModel  from "../modules/payment/repository/transaction.model";
import { StoreCatalogProductModel } from "../modules/store-catalog/repository/product.model";
import { ProductModel as AdmProductModel } from "../modules/product-adm/repository/product.model";

import { clientsRoute } from "./routes/client.route";
import { productsRoute } from "./routes/product.route";
import { checkoutRoute } from "./routes/checkout.route";
import { invoicesRoute } from "./routes/invoice.route";
import { InvoiceItemModel } from "../modules/invoice/repository/invoiceItem.model";

export const app: Express = express();
app.use(express.json());

app.use("/products", productsRoute);
app.use("/clients", clientsRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoicesRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([
    OrderModel,
    OrderProductModel,
    ClientModel,
    InvoiceModel,
    InvoiceItemModel,
    StoreCatalogProductModel,
    AdmProductModel,
    TransactionModel,
  ]);

  await sequelize.sync();
}

setupDb();