import { Song } from "./Song";



export interface AdministratorState {
    songs: Song[];

    singleSong: Song;

    searchSong: string;
}
