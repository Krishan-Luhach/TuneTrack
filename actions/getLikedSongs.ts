import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { createClient } from "@/utils/supabase/server";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return [];
  const { data: likedSongData, error } = await supabase
    .from("liked_songs")
    .select("*,songs(*)")
    .eq("user_id", data.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }
  if (!likedSongData) return [];
  return likedSongData.map((item) => ({ ...item.songs }));
};
export default getLikedSongs;
