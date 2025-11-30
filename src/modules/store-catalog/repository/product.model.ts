import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "catalog_products",
  timestamps: false,
})
export class StoreCatalogProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare salesPrice: number;
}
