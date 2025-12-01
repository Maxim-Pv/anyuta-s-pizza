import { Container, Filters, ProductsGroupList, Stories, Title, TopBar } from "@/shared/components/shared";
import { findPizzas, GetSearchParams } from "@/shared/lib/find-pizzas";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const params = await new Promise<GetSearchParams>((resolve) => {
    setTimeout(() => {
      resolve(searchParams);
    }, 0);
  });
  const categories = await findPizzas(params);
  // console.log(categories);

  return (
    <div>
      <Container className="mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Stories />

      <Container className="pb-55 mt-10 ">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) => (
                <ProductsGroupList key={category.id} title={category.name} items={category.products} categoryId={category.id} />
              ))}
            </div>

            {/* <div className="flex items-center gap-6 mt-12">
              <Pagination pageCount={3} />
              <span className="text-sm text-gray-400">5 из 65</span>
            </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
