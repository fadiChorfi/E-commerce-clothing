import { Product } from "@/types/types";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;

export async function searchProducts(searchTerm: string) {
  if (!searchTerm) {
    return []
  }
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

if (["woman", "women"].includes(normalizedSearchTerm)) {
    searchTerm = "female";
} else if (["man", "men"].includes(normalizedSearchTerm)) {
    searchTerm = "male";
}

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%, gender.ilike.%${searchTerm}%`)
    .order("name")

  if (error) {
    console.error("Error searching products:", error)
    throw error
  }
  console.log(searchTerm)
  console.log(data)
  return data as Product[]
}

