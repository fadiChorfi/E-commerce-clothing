
import SearchBar from "@/components/csr/header/headerContent/SearchBar";
import { ProductResults } from "@/components/csr/products/ProductResults";
import { Suspense } from "react";

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Product Search</h1>
      <Suspense>
        <SearchBar />
      </Suspense>

      <Suspense>
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
