import {
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { StoreCatalogProductModel } from "../../store-catalog/repository/product.model";
import { OrderModel } from "./order.model";

@Table({ tableName: "order_products", timestamps: false })
export class OrderProductModel extends Model {
  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  declare orderId: string;

  @ForeignKey(() => StoreCatalogProductModel)
  @Column({ allowNull: false })
  declare productId: string;
}