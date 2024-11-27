"use client"

import { useState, useRef, useEffect } from "react"
import { X } from 'lucide-react'
import CategoryButton from "@/components/CategoryButton"
import ProductList from "@/components/ProductList"
import HotPromotion from "@/components/HotPromotion"

const categories = [
  { id: "hot", name: "Khuyến mãi hot" },
  ...Array(10).fill(null).map((_, i) => ({ 
    id: `category-${i}`, 
    name: `MenuItem ${i + 1}`
  }))
]

const productLists = categories.map(category => ({
  id: category.id,
  title: category.name,
  products: Array(12).fill(null).map((_, i) => ({
    id: `${category.id}-product-${i}`,
    name: "Menuitem Name m...",
    imageUrl: "/assets/images/placeholder.svg"
  }))
}))

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)
  const contentRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		console.log(selectedCategory)
	}, [selectedCategory])

  useEffect(() => {
    if (!contentRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5
        )
        if (visibleSection?.target.id) {
          setSelectedCategory(visibleSection.target.id)
          scrollCategoryIntoView(visibleSection.target.id)
        }
      },
      {
        root: contentRef.current,
        threshold: 0.5,
      }
    )

    const sections = contentRef.current.getElementsByClassName("product-section")
    Array.from(sections).forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollToCategory = (categoryId: string) => {
    const targetElement = document.getElementById(categoryId)
    if (targetElement && contentRef.current) {
      contentRef.current.scrollTo({
        top: targetElement.offsetTop - contentRef.current.offsetTop,
        behavior: "smooth"
      })
    }
  }

  const scrollCategoryIntoView = (categoryId: string) => {
    if (categoryRef.current) {
      const categoryButton = categoryRef.current.querySelector(`[data-category-id="${categoryId}"]`)
      if (categoryButton) {
        categoryButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        })
      }
    }
  }

  return (
		<div className="w-[400px] h-[calc(100vh-2rem)] flex flex-col bg-white rounded-t-2xl overflow-hidden border border-neutral-200 shadow-lg dark:border-neutral-800">
			<div className="flex items-center px-4 py-3 border-b border-gray-200">
				<button className="hover:bg-gray-100 p-1 rounded-full">
					<X className="h-5 w-5 text-gray-600" />
				</button>
				<p className="flex-1 text-center text-lg font-medium">
					Danh mục Kingfoodmart
				</p>
			</div>

			<div className="flex flex-1 overflow-hidden p-2">
				<div
					ref={categoryRef}
					className="overflow-y-auto border-r border-gray-200"
				>
					{categories.map((category) => (
						<CategoryButton
							key={category.id}
							{...category}
							isSelected={selectedCategory === category.id}
							onClick={() => scrollToCategory(category.id)}
						/>
					))}
				</div>

				<div ref={contentRef} className="flex-1 overflow-y-auto">
					{productLists.map((list) => (
						<div
							key={list.id}
							id={list.id}
							className={`product-section p-4 ${
								selectedCategory === list.id ? "bg-blue-50" : ""
							}`}
						>
							<ProductList {...list} />
							{list.id === "hot" && <HotPromotion />}
						</div>
					))}
				</div>
			</div>
		</div>
  );
}

