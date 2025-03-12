import SearchBar from "@/components/csr/header/headerContent/SearchBar";
import { Suspense } from "react";

export default async function SearchResultsPage(props: {
  params: Promise<{ term: string }>;
}) {
  const params = await props.params;
  // Get the search term from the URL path parameter
  const searchTerm = decodeURIComponent(params.term);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Product Search</h1>
      <Suspense>
        <SearchBar />
      </Suspense>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Results for: {searchTerm}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* This would be your actual product listing */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium">Product: {searchTerm}</h3>
            <p className="text-muted-foreground">Sample product description</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium">Premium {searchTerm}</h3>
            <p className="text-muted-foreground">Another product variant</p>
          </div>
        </div>
      </div>
    </div>
  );
}
