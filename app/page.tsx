import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <div>
      <Container className="mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 2,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 3,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 4,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 5,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductsGroupList
                title="Комбо"
                items={[
                  {
                    id: 11,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 12,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 13,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 14,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 15,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                ]}
                categoryId={2}
              />
              <ProductsGroupList
                title="Закуски"
                items={[
                  {
                    id: 31,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 32,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 33,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 34,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                  {
                    id: 35,
                    name: "Чизбургер-пицца",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                    price: 390,
                    items: [{ price: 390 }],
                  },
                ]}
                categoryId={3}
              />
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
