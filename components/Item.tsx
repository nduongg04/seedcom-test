import Image from "next/image"

interface ItemProps {
  imageUrl: string
  name: string
  isSelected: boolean
}

export default function Item({ imageUrl, name, isSelected }: ItemProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 space-y-1 ${
      isSelected ? "bg-blue-50" : ""
    }`}>
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Image 
          src={imageUrl} 
          alt={name} 
          width={30} 
          height={30} 
          className="rounded-full"
        />
      </div>
      <p className={`text-xs text-center line-clamp-2 ${isSelected ? "text-blue-600" : "text-gray-700 text-wrap"}`}>
        {name}
      </p>
    </div>
  )
}

