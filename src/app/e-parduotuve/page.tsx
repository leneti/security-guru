import { getTranslations } from "next-intl/server";
import { getProducts, formatPrice } from "@/lib/inventory";
import type { Product } from "@/types";

export default async function EShopPage() {
  const t = await getTranslations("EShop");
  const products = await getProducts();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-midnight text-sage-light py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">{t("title")}</h1>
          <p className="text-xl text-sage text-center mt-4 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-offWhite">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-midnight mb-4">Mūsų produktai</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Profesionali apsaugos įranga jūsų namams ir verslui. Pasirinkite iš platų produktų
                asortimento.
              </p>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                {products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Produktai bus pasiekiami greitu metu.</p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-midnight text-sage-light rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Reikia individualaus sprendimo?</h3>
              <p className="text-sage mb-6 max-w-xl mx-auto">
                Jei nerandate tinkamo produkto arba reikia specialaus sprendimo, susisiekite su
                mumis. Mes parinksime geriausią variantą jūsų poreikiams.
              </p>
              <a
                href="/kontaktai"
                className="inline-flex bg-peach text-midnight px-8 py-3 rounded-lg font-semibold hover:bg-peach-dark transition-colors"
              >
                Susisiekti
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-sage-light flex items-center justify-center overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded">
            Nėra sandėlyje
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-xs text-peach font-medium mb-1 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="text-midnight font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-midnight font-bold text-xl">{formatPrice(product.price)}</div>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              product.inStock
                ? "bg-peach text-midnight hover:bg-peach-dark"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? "Užsakyti" : "Neturime"}
          </button>
        </div>

        {/* SKU */}
        {product.sku && <p className="text-xs text-gray-400 mt-2">SKU: {product.sku}</p>}
      </div>
    </div>
  );
}
