import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { searchSongAsync, selectAdminSongs, selectSearchSong, setSongSearch } from '../administrator/administratorSlice';
import './base.css';



const MainPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [songName, setSongName] = useState('');

    const isAdmin = JSON.parse(sessionStorage.getItem('isAdmin') as string);

    const searchSong = useAppSelector(selectSearchSong);
    const songs = useAppSelector(selectAdminSongs);

    const refreshToken = JSON.parse(sessionStorage.getItem("refresh") as string);
    const accessToken = JSON.parse(sessionStorage.getItem("access") as string);
    const LoggedIn = refreshToken || accessToken;

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
      const socketInstance = new WebSocket(`${process.env.REACT_APP_BACKEND_URL}/ws/chat/`);

      socketInstance.onopen = () => {
        console.log('WebSocket is open now.');
      };

      socketInstance.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.room && LoggedIn) {
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
    }, [navigate, LoggedIn]);

  return (
    <div className="main-container">
      {LoggedIn ? (
        <>
          {isAdmin ? (
            <div className="admin-view-main">
              <div className="loader-search-song"></div>
                <div className="admin-view-search-container">

                  <Autocomplete className="admin-view-search-box"
                                freeSolo
                                options={songs.map((song) => ({id: song.id,
                                                              song_name: song.song_name,
                                                              artist: song.artist
                                        }))}
                                getOptionLabel={(song: any) => song.song_name}
                                renderOption={(props, song) => (<li {...props}>
                                                                  <div className="admin-view-search-song-info">

                                                                    <p className="admin-view-search-song-info-name">
                                                                      {song.song_name}
                                                                    </p>
                                                                    &nbsp;-&nbsp;
                                                                    <p className="admin-view-search-song-info-artist">
                                                                      {song.artist}
                                                                    </p>
                                                                    
                                                                  </div>
                                                                </li>
                                              )}
                                renderInput={(params) => (<TextField placeholder="Song Name"
                                                                      variant="standard"
                                                                      {...params}
                                                                      onChange={handleSearchInputChange}
                                                                      value={searchSong}
                                                                      InputLabelProps={{ style: { color: "black" } }}/>
                                              )}
                  />

                  <Button disabled={songName.length < 1} onClick={handleViewResults} className = {songName.length < 1 ? "admin-view-search-button-disabled" : "admin-view-search-button"} style = {{backgroundColor: "#A28B55"}}>
                    Results page
                  </Button>
                </div>
              </div>
            ) : (<div className="loader"></div>)} {/* Closing of isAdmin term */}
        </>
      ) : (<div className="not-band-member">

            <img alt="logo" height="50px" src={require(`../../images/logo.png`)} className="main-page-logo"/>

            <h1>You are not a band member</h1>

            <span onClick={() => navigate("/authentication/register")} className="hyperlink-dec">
              JOIN NOW!
            </span>
          </div>
        )} {/* Closing of LoggedIn term */}
    </div>
  )
}

export default MainPage;