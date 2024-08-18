import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleSongAsync, selectSingleSong } from '../song/songSlice';
import { useParams } from 'react-router-dom';
import './base.css';
import { Button } from 'react-bootstrap';

const LivePage = () => {
    const dispatch = useAppDispatch();
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

    return (
        <div className="live-page-container">
            <h3 style={{ transform: "translateY(1dvh)", fontWeight: "bold" }}>
                {singleSong.song_name} - {singleSong.artist}
            </h3>

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
