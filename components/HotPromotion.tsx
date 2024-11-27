import Image from "next/image"

export default function HotPromotion() {
  return (
		<div className="mt-4 rounded-lg p-2 flex flex-col gap-1">
			<div>
				<p className="text-sm font-semibold">Khuyến mãi nổi bật</p>
			</div>
			<div className="flex-1 w-full">
				<Image
					src="/assets/images/flash-sale.webp"
					alt="Promotion"
					width={100}
					height={100}
					className="rounded-lg h-20 w-full object-cover"
				/>
			</div>
		</div>
  );
}

