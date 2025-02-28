//app/page.tsx
import ClientWrapper from "@/components/csr/products/ClientWrapper";
import supabase from "@/supabase/client";

export default async function Home() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    console.error("failed fetching", error);
  }

  if (!data) {
    return (
      <div className="flex items-center ">
        <h2>it looks like there is a problem with the server</h2>
      </div>
    );
  }

  
  return (
    <>
      <ClientWrapper products={data} />
    </>
  );
}
