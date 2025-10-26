"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { Dialog } from "@/shared/components/ui";
import { DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import React from "react";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
        aria-describedby="choose-product-description"
      >
        <DialogTitle className="hidden">Выбор продукта</DialogTitle>
        <DialogDescription id="choose-product-description" className="hidden" />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
