




export interface Line {
  id?: number;
  line_number: number;
  lyrics: string;
  chords: { [chord: string]: number };
}



export interface Song {
  id?: number;
  song_name: string;
  artist: string;
  lines: Line[];
}



export interface SongState {
  songs: Song[];
  singleSong: Song;

  lines: Line[];
  singleLine: Line;
}
