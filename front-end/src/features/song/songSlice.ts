import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Line, SongState } from '../../models/Song';
import { searchSong } from '../administrator/administratorAPI';
import { getSingleSong } from './songAPI';



const initialState: SongState = {
  songs: [],
  singleSong: { id: 0, song_name: "", artist: "", lines: [{ line_number: 0, lyrics: "", chords: {} }] },

  lines: [],
  singleLine: { line_number: 0, lyrics: "", chords: {} }
}



export const getSingleSongAsync = createAsyncThunk(
  'song/getSingleSong',
  async (id: string) => {
    const response = await getSingleSong(id);
    return response.data;
  }
);



export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    do: (state, action) => {
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getSingleSongAsync.fulfilled, (state, action) => {
      state.singleSong = action.payload;
    })
  },
});



export const selectSingleSong = (state: RootState) => state.song.singleSong;
export const selectSingleLine = (state: RootState) => state.song.singleLine;

export const selectSongLines = (state: RootState) => state.song.lines;



export default songSlice.reducer;