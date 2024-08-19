import { Autocomplete, TextField } from '@mui/material';
import './base.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchSongAsync, selectAdminSongs, selectSearchSong, setSongSearch } from '../administrator/administratorSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';



const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [songName, setSongName] = useState("");

  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin") as string);

  const searchSong = useAppSelector(selectSearchSong);
  const songs = useAppSelector(selectAdminSongs);

  useEffect(() => {
    if (searchSong.trim() !== '') {
      dispatch(searchSongAsync({ searchQuery: searchSong }));
    } else {
      dispatch(setSongSearch(''));
    }
  }, [dispatch, searchSong]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSongSearch(event.target.value));
    setSongName(event.target.value);
  };

  const handleViewResults = () => {
    navigate('/results', { state: { searchResults: songs } });
  };


    useEffect(() => {
      const socketInstance = new WebSocket('wss://jamoveo-backend.onrender.com/ws/chat/');

        socketInstance.onopen = () => {
            console.log('WebSocket is open now.');
        };

        socketInstance.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.room) {
                navigate(`results/livepage/${data.room}`);
            }
        };

        setTimeout(() => {
            socketInstance.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }, 500);


        socketInstance.onclose = () => {
            console.log('WebSocket is closed now.');
        };


        return () => {
            if (socketInstance) {
                socketInstance.close();
            }
        };
    }, [navigate]);

  
  return (
    <div className="main-container">
      
      {isAdmin ? (

        <div className = "admin-view-main">

            <div className="loader-search-song"></div>

            <div style = {{display: "flex", gap: "5%"}}>
            <Autocomplete
              style={{ width: "250px", marginTop: "27px" }}
              freeSolo
              options={songs.map((song) => ({
                id: song.id,
                song_name: song.song_name,
                artist: song.artist,
              }))}
              getOptionLabel={(song: any) => song.song_name}
              renderOption={(props, song) => (
                <li {...props}>
                  <div style={{ display: 'flex', alignItems: "center" }}>
                    <p style={{ marginTop: "20px" }}>
                      {song.song_name}
                    </p>
                    &nbsp;-&nbsp;
                    <p style={{ marginTop: "20px" }}>
                      {song.artist}
                    </p>
                  </div>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  placeholder="Song Name"
                  variant="standard"
                  {...params}
                  onChange={handleSearchInputChange}
                  value={searchSong}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              )}
            />
            <Button disabled={songName.length < 1} onClick={handleViewResults} style={{backgroundColor: "#A28B55", border: "1px solid black"}}>Results page</Button>
            </div>

        </div>

        ) : (
        
          <>
        <div className="loader"></div>
          
        </>

      )}
      

    </div>
  )
}

export default MainPage;
