import type { ClientSchema } from "@aws-amplify/backend";
import { a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Warehouse: a.customType({
      name: a.string().required(),
      quantity: a.integer().required(),
    }),

    Product: a.model({
      name: a.string().required(),
      price: a.float().required(),
      href: a.string(),
      warehouseData: a.ref("Warehouse").array().required(),
      imageUrl: a.string().required(),

      categoryId: a.id(),
      category: a.belongsTo("Category", "categoryId"),
    }),

    Category: a.model({
      name: a.string().required(),
      href: a.string(),

      products: a.hasMany("Product", "categoryId"),
    }),
  })
  .authorization((allow) => allow.guest().to(["read", "create"]));

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({ schema });
