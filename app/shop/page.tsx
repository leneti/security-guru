import NumberParser from "intl-number-parser";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import type { Metadata } from "next/types";
import { Button, Title } from "@mantine/core";
import type { Schema } from "@site/amplify/data/resource";
import { VATSwitch } from "@site/components/VATSwitch";
import { cookiesClient } from "@site/utils/amplify-utils";
import pageClasses from "@site/components/PageBackground/PageBackground.module.css";

const priceParser = NumberParser("lt-LT", {
  style: "currency",
  currency: "EUR",
});

const priceFormatter = Intl.NumberFormat("lt-LT", {
  style: "currency",
  currency: "EUR",
});

export const metadata: Metadata = {
  title: "Parduotuvė",
};

export default async function Shop() {
  const { data, errors } = await cookiesClient.models.Category.list();
  const categoriesWithProducts: (Omit<
    Schema["Category"]["type"],
    "products"
  > & { products: Schema["Product"]["type"][] })[] = [];

  for (const category of data) {
    const products = await category.products();
    categoriesWithProducts.push({ ...category, products: products.data });
  }

  async function addCategory(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;

    const { data, errors } = await cookiesClient.models.Category.create({
      name,
    });

    if (data) {
      revalidatePath("/shop");
    } else {
      console.error(errors);
    }
  }

  async function addProduct(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const price = priceParser(formData.get("price") as string);
    const imageUrl = formData.get("imageUrl") as string;
    const categoryId = formData.get("categoryId") as string;

    const { data, errors } = await cookiesClient.models.Product.create({
      name,
      price,
      imageUrl,
      categoryId,
      warehouseData: [
        {
          name: "Centrinis sandėlys",
          quantity: 1,
        },
        {
          name: "Kaunas",
          quantity: 0,
        },
        {
          name: "Vilnius",
          quantity: 1,
        },
        {
          name: "Vilnius (Vilkpėdė)",
          quantity: 0,
        },
        {
          name: "Klaipėda",
          quantity: 0,
        },
        {
          name: "Šiauliai",
          quantity: 1,
        },
        {
          name: "Panevėžys (Baltic IQ)",
          quantity: 0,
        },
      ],
    });

    if (data) {
      revalidatePath("/shop");
    } else {
      console.error(errors);
    }
  }

  return (
    <main className="relative">
      <Title ta="center" className={pageClasses.title}>
        Parduotuvė
      </Title>
      <VATSwitch className="mt-xs absolute top-1 right-4 hidden sm:block" />
      <div className="max-w-breakpoint-xl px-md mx-auto">
        <form action={addCategory}>
          <input type="text" name="name" placeholder="Category name" />
          <Button type="submit">Add category</Button>
        </form>
        <h2>Categories</h2>
        <ul>
          {categoriesWithProducts?.map((category) => (
            <li key={category.id}>
              <h3>{category.name}</h3>
              <form action={addProduct}>
                <input type="text" name="name" placeholder="Product name" />
                <input
                  type="number"
                  name="price"
                  placeholder="Product price"
                  step="any"
                  min="0"
                />
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Product image URL"
                />
                <input type="hidden" name="categoryId" value={category.id} />
                <Button type="submit">Add product</Button>
              </form>
              <ul>
                {category.products.map((product) => (
                  <li key={product.id}>
                    <h4>{product.name}</h4>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={700}
                      height={700}
                    />
                    <p>{priceFormatter.format(product.price)}</p>
                    <ul>
                      {product.warehouseData.map((warehouse) =>
                        warehouse ? (
                          <li key={warehouse.name}>
                            <p>
                              {warehouse.name}: {warehouse.quantity}
                            </p>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {errors && <pre>{JSON.stringify(errors, null, 2)}</pre>}
      </div>
    </main>
  );
}
