import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CategoryButtonProps {
  id: string
  name: string
  isSelected: boolean
  badge?: string
  onClick: () => void
}

export default function CategoryButton({ id, name, isSelected, badge, onClick }: CategoryButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`w-20 h-fit flex flex-col items-center justify-center gap-1 p-2 ${
        isSelected ? "bg-blue-50" : ""
      }`}
      onClick={onClick}
      data-category-id={id}
    >
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <Image 
          src="/assets/images/placeholder.svg"
          alt="Menu item"
          width={24}
          height={24}
          className="rounded-full"
        />
      </div>
      <span className={`text-xs text-center line-clamp-2 text-wrap w-full ${
        isSelected ? "text-blue-600" : "text-gray-700 "
      }`}>
        {name}
      </span>
      {badge && (
        <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Button>
  )
}

