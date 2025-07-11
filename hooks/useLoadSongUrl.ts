import { Song } from "@/types";
import { createClient } from "@/utils/supabase/client";

export const useLoadSongUrl = (song: Song | undefined) => {
  const supabase = createClient();
  if (!song) return;

  const { data: songData } = supabase.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};
