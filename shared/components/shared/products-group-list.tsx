"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { useCategoryStore } from "@/shared/store/category";
import { useIntersection } from "react-use";
import { ProductCard } from "./product-card";
import { Title } from "./title";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, className, listClassName }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef<HTMLElement>(null!);
  const intersection = useIntersection(intersectionRef, {
    // центральная полоса ~ середина экрана
    root: null,
    rootMargin: "-45% 0px -55% 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  React.useEffect(() => {
    if (!intersection) return;
    if (intersection.isIntersecting && intersection.intersectionRatio >= 0.5) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection, setActiveCategoryId]);

  return (
    <section className={`${className} scroll-mt-[100px]`} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-5", listClassName)}>
        {items.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </section>
  );
};
