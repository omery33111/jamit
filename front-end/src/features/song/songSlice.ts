import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SongState } from '../../models/Song';
import { getSingleSong } from './songAPI';



const initialState: SongState = {
  songs: [],
  singleSong: { id: 0, song_name: "", artist: "", lines: [{ line_number: 0, lyrics: "", chords: {} }] },

  isLoading: false,
  isError: false
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
      state.isLoading = false;
      state.isError = false;
    })
    .addCase(getSingleSongAsync.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(getSingleSongAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
  },
});



export const selectSongError = (state: RootState) => state.song.isError;
export const selectSongLoading = (state: RootState) => state.song.isLoading;

export const selectSingleSong = (state: RootState) => state.song.singleSong;



export default songSlice.reducer;