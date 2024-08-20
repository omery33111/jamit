import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleSongAsync, selectSingleSong, selectSongError, selectSongLoading } from '../song/songSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './base.css';
import { Button } from 'react-bootstrap';



const LivePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const isError = useAppSelector(selectSongError);
    const isLoading = useAppSelector(selectSongLoading);

    const singleSong = useAppSelector(selectSingleSong);
  
    const { id } = useParams();
  
    useEffect(() => {
      if (id !== undefined) {
        dispatch(getSingleSongAsync(id));
      }
    }, [dispatch, id]);
  
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [socketStatus, setSocketStatus] = useState<{ isOpen: boolean }>({isOpen: false});
  
    useEffect(() => {
      const socketInstance = new WebSocket(`${process.env.REACT_APP_BACKEND_URL}/ws/chat/`);
  
      setSocket(socketInstance);
  
      socketInstance.onopen = () => {
        console.log('WebSocket is open now.');
        setSocketStatus({ isOpen: true });
      };
  
      socketInstance.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.room === 0) {
          navigate('/');
        }
      };
  
      setTimeout(() => {
        socketInstance.onerror = (error) => {
          console.error('WebSocket error:', error);
          setSocketStatus({ isOpen: false });
        };
      }, 500);
  
      socketInstance.onclose = () => {
        console.log('WebSocket is closed now.');
        setSocketStatus({ isOpen: false });
      };
  
      return () => {
        if (socketInstance) {
          socketInstance.close();
        }
      };
    }, [navigate]);
  
    const handleQuitLiveShow = () => {
      if (socketStatus.isOpen && socket) {
        socket.send(JSON.stringify({ room: 0 }));
      } else {
        console.error('WebSocket is not open. Current status:', socketStatus.isOpen);
      }
    };
  
    const isAdmin = JSON.parse(sessionStorage.getItem('isAdmin') as string);
  
    // Checks if the text contains Hebrew characters by searching the Unicode table
    const isHebrew = (text: string) => {
      // The range for hebrew characters in the Unicode table
      const hebrewRegex = /[\u0590-\u05FF]/;
      return hebrewRegex.test(text);
    };

    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const scrollIntervalRef = useRef<number | null>(null);
  
    const toggleScrolling = () => {
      // If scrolling is active (isScrolling is true) and there's an existing interval (scrollIntervalRef.current is not null)
      if (isScrolling && scrollIntervalRef.current !== null) {
        // Clear the existing interval
        clearInterval(scrollIntervalRef.current);
        // Set the interval reference to null
        scrollIntervalRef.current = null;
      // Otherwise, if scrolling is not active
      } else {
        // Create a new interval that runs every 100 milliseconds.
        scrollIntervalRef.current = window.setInterval(() => {
          // Scroll the window down by 1 pixel
          window.scrollBy(0, 1);
        }, 100);
      }
      // Toggle the isScrolling state.
      setIsScrolling(!isScrolling);
    };

    return (
      <div>
        {isLoading ? (<div className="loader-positioning">
                          <div className="general-loader" />
                      </div>) : (
          <div className="live-page-container">
            {isError ? (<h1 className="loader-positioning">There is no such song</h1>) : (
              <>
                <h3 className="live-page-title">
                  {singleSong.song_name} - {singleSong.artist}
                </h3>

                <div className="live-page-container-content">
                  <div className="live-container" style={{ direction: isHebrew(singleSong.lines[0].lyrics) ? "rtl" : "ltr" }}>
                    <div>

                      {singleSong.lines.map((line) => (
                        <table key={line.line_number} className="table-line-number">
                          <tbody>
                            <tr>
                              {line.lyrics.split(" ").map((word, index) => (

                                <td key={index} className="chord-index-map">
                                  {line.chords && Object.entries(line.chords).map(([chord, position]) => (position === index + 1 ? (
                                        <div key={chord} className="chord-map">
                                          {chord}
                                        </div>) : null
                                    ))}

                                  <div>{word}</div>
                                </td>

                              ))}
                            </tr>
                          </tbody>
                        </table>
                      ))}

                    </div>
                  </div>

                  <Button onClick={toggleScrolling} className="scrolling-button" style={{ backgroundColor: isScrolling ? "blue" : "#8B6A3D" }}>
                    {isScrolling ? "Stop Auto Scroll" : "Auto Scroll"}
                  </Button>

                  {isAdmin && (<Button onClick={handleQuitLiveShow} className="quit-button">
                                END SHOW
                              </Button>)}
                </div>

              </>
            )} {/* Closing of isError term */}
          </div>
        )} {/* Closing of isLoading term */}
      </div>
    );
}

export default LivePage;
