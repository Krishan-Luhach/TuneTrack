import { Song } from "@/types";
import { createClient } from "@/utils/supabase/server";
import getSongs from "./getSongs";

const getSongsByTitle = async (title:string): Promise<Song[]> => {
  const supabase = await createClient();
  if(!title){
    return await getSongs();
  }
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike('title',`%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};
export default getSongsByTitle;
