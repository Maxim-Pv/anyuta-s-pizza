export default function ProductPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <h1>Product {id}</h1>
    </div>
  );
}
