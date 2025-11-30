import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import {ClientModel } from "../../client-adm/repository/client.model";
import { StoreCatalogProductModel } from "../../store-catalog/repository/product.model";
import { OrderProductModel } from "./order-product.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @ForeignKey(() => ClientModel)
  @Column({ allowNull: false })
  declare clientId: string;

  @BelongsTo(() => ClientModel)
  declare client: ClientModel;

  @BelongsToMany(() => StoreCatalogProductModel, () => OrderProductModel)
  declare products: StoreCatalogProductModel[];

  @Column({ allowNull: false })
  declare status: string;

  @Column({ allowNull: true })
  declare invoiceId: string;
}