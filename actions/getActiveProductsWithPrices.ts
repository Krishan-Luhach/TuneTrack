import { ProductWithPrices, Song } from "@/types";
import { createClient } from "@/utils/supabase/server";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrices[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*,prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("unit_amount", { referencedTable: "prices" });

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};
export default getActiveProductsWithPrices;
