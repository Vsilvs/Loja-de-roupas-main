
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: string | number;
  description?: string | null;
  imageUrl: string;
  category: string;
}

interface ProductsGridProps {
  products: Product[];
  darkMode: boolean;
  loading?: boolean;
}

// Skeleton de carregamento para os cards
function ProductSkeleton() {
  return (
    <div className="overflow-hidden h-full border rounded-lg animate-pulse">
      <div className="w-full h-52 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
      </div>
    </div>
  );
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  darkMode,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="overflow-hidden h-full transition-all hover:shadow-md border rounded-lg"
        >
          <div className="relative w-full h-52">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <h3
              className="font-medium text-base truncate"
              title={product.name}
            >
              {product.name}
            </h3>

            <p
              className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              {product.category}
            </p>

            <p className="font-semibold text-base">
              R$ {Number(product.price).toFixed(2)}
            </p>

            <div className="mt-4">
              <Link
                href={`/admin/products/view/${product.id}`}
                className={`block text-center px-4 py-2 rounded-md font-medium ${darkMode
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-black text-white hover:bg-gray-800"
                  }`}
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
