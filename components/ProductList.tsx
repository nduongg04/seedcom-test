import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Product {
  id: string
  name: string
  imageUrl: string
}

interface ProductListProps {
  id: string
  title: string
  products: Product[]
}

export default function ProductList({ title, products }: ProductListProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-3 gap-2">
        {products.map((product) => (
          <Button
            key={product.id}
            variant="ghost"
            className="flex flex-col items-center justify-start p-2 h-fit w-full hover:bg-blue-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1">
              <Image 
                src={product.imageUrl}
                alt={product.name}
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <p className="text-xs text-center line-clamp-2 w-full text-wrap text-gray-700">
              {product.name}
            </p>
          </Button>
        ))}
      </div>
      <div className="mt-4 mb-6">
        <div className="bg-blue-50 rounded-full py-2 px-4">
          <p className="text-sm text-center text-blue-600 ">
            Xem tất cả (Tên menuitem)
          </p>
        </div>
      </div>
    </div>
  )
}

