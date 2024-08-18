import axios from "axios";
import { administratorURL, songURL } from "../../endpoints/endpoints";
import { Song } from "../../models/Song";



export function searchSong(searchQuery: string)
{

  const myToken = JSON.parse(sessionStorage.getItem("access") as string)

  const accessToken = myToken ? myToken : "";

  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
  }

  return new Promise<{ data: Song[] }>((resolve) =>
    axios.get(`${administratorURL}/admin_search_song/`, { params: { name: searchQuery }, ...config}).then((res) => resolve({ data: res.data })));
}
