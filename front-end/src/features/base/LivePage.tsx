import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleSongAsync, selectSingleSong } from '../song/songSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './base.css';
import { Button } from 'react-bootstrap';

const LivePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const singleSong = useAppSelector(selectSingleSong);

    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const scrollIntervalRef = useRef<number | null>(null);

    const toggleScrolling = () => {
        if (isScrolling && scrollIntervalRef.current !== null) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
        } else {
            scrollIntervalRef.current = window.setInterval(() => {
                window.scrollBy(0, 1);
            }, 100);
        }
        setIsScrolling(!isScrolling);
    };

    const { id } = useParams();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getSingleSongAsync(id));
        }
    }, [dispatch, id]);


    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [socketStatus, setSocketStatus] = useState<{ isOpen: boolean }>({isOpen: false});
  
  
    useEffect(() => {
        const socketUrl = process.env.REACT_BACKEND_URL || 'ws://localhost:8000/ws/chat/';
        const socketInstance = new WebSocket(socketUrl);

        setSocket(socketInstance);
        
        socketInstance.onopen = () => {
            console.log('WebSocket is open now.');
            setSocketStatus({ isOpen: true });
        };

        socketInstance.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.room == 0) {
                navigate(`/`);
            }
        };

        
        setTimeout(() => {
            socketInstance.onerror = (error) => {
                console.error('WebSocket error:', error);
                setSocketStatus({isOpen: false});
            };
        }, 500);


        
        socketInstance.onclose = () => {
            console.log('WebSocket is closed now.');
            setSocketStatus({isOpen: false});
        };

        setSocketStatus({isOpen: false});

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
      


    return (
        <div className="live-page-container">
            <h3 style={{ transform: "translateY(1dvh)", fontWeight: "bold" }}>
                {singleSong.song_name} - {singleSong.artist}
            </h3>
            <button onClick={handleQuitLiveShow}>quit</button>

            <div className="live-page-container-content">
                <div style={{ textAlign: "left", marginTop: "5vh" }}>
                    <div>
                        {singleSong.lines.map((line) => (
                            <table key={line.line_number} style={{ marginBottom: "15px", textAlign: "center", fontSize: 20 }}>
                                <tbody>
                                    <tr>
                                        {line.lyrics.split(' ').map((word, index) => (
                                            <td key={index} style={{ padding: "0 7px", verticalAlign: "bottom" }}>
                                                {line.chords && Object.entries(line.chords).map(([chord, position]) => (
                                                    position === index + 1 ? (
                                                        <div key={chord} style={{ color: "blue", fontWeight: "bold", marginBottom: "-5px" }}>
                                                            {chord}
                                                        </div>
                                                    ) : null
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
            </div>

                <Button onClick={toggleScrolling} className="scrolling-button" style={{ backgroundColor: isScrolling ? 'red' : "#8B6A3D" }}>
                    {isScrolling ? 'Stop Auto Scroll' : 'Auto Scroll'}
                </Button>
        </div>
    );
}

export default LivePage;
