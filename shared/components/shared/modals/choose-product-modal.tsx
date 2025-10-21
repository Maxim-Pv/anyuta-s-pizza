"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0]?.pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)} aria-describedby={undefined}>
        <DialogTitle className="text-center hidden">Выбор продукта</DialogTitle>
        {isPizzaForm ? (
          <ChoosePizzaForm
            name={product.name}
            imageUrl={product.imageUrl}
            onSubmit={() => router.back()}
            items={product.items}
            ingredients={product.ingredients}
          />
        ) : (
          <ChooseProductForm name={product.name} imageUrl={product.imageUrl} onSubmit={() => router.back()} price={firstItem.price} />
        )}
      </DialogContent>
    </Dialog>
  );
};
