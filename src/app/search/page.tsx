import SearchBar from "@/components/csr/header/headerContent/SearchBar"
import { ProductResults } from "@/components/csr/products/ProductResults"


export default async function SearchPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Product Search</h1>
      <SearchBar />

      <ProductResults searchParams={searchParams} />
      
    </div>
  )
}

