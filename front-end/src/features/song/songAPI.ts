import axios from "axios";
import { songURL } from "../../endpoints/endpoints";
import { Song } from "../../models/Song";



export function getSingleSong(id: string) {

  const myToken = JSON.parse(sessionStorage.getItem("access") as string)

  const accessToken = myToken ? myToken : "";

  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
  }

  return new Promise<{ data: Song }>((resolve) =>
    axios.get(`${songURL}/single_song/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}
