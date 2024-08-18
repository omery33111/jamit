import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { searchSong } from './administratorAPI';
import { AdministratorState } from '../../models/Administrator';



const initialState: AdministratorState = {
    songs: [],
    singleSong: { id: 0, song_name: "", artist: "", lines: [{ line_number: 0, lyrics: "", chords: {} }] },

    searchSong: ""
};



export const searchSongAsync = createAsyncThunk(
    'administrator/searchSong',
    async (data: {searchQuery: string}) => {
      const response = await searchSong(data.searchQuery);
      return response.data;
    }
);



export const administratorSlice = createSlice({
  name: 'administrator',
  initialState,
  reducers: {
    setSongSearch: (state, action) => {
        state.searchSong = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchSongAsync.fulfilled, (state, action) =>
        {
          state.songs = action.payload
        })
  },
});



export const { setSongSearch } = administratorSlice.actions;

export const selectSearchSong = (state: RootState) => state.administrator.searchSong;
export const selectAdminSongs = (state: RootState) => state.administrator.songs;



export default administratorSlice.reducer;
