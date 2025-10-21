import { Container, ProductImage, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { Button } from "@/shared/components/ui";
import { cn } from "@/shared/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      {/* <ProductForm product={product} /> */}
      <div className={cn("flex flex-1")}>
        {/* <div className="flex items-center justify-center flex-1 relative w-full">
          <img src={product.imageUrl} alt={product.name} className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]" />
        </div> */}
        <ProductImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400 mb-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis quis perspiciatis tenetur odit non laudantium, reprehenderit
          </p>
          <GroupVariants
            value="2"
            items={[
              { name: "Маленькая", value: "1" },
              { name: "Средняя", value: "2" },
              { name: "Большая", value: "3", disabled: true },
            ]}
          />

          <Button
            // loading={loading}
            // onClick={() => onSubmit?.()}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          >
            Добавить в корзину за {product.items[0].price} ₽
          </Button>
        </div>
      </div>
    </Container>
  );
}
