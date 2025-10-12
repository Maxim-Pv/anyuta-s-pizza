import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-5">
      <h1>After pizza</h1>
      <Button variant={"outline"}>order pizza</Button>
    </div>
  );
}
