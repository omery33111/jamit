import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';




const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults } = location.state || { searchResults: [] };

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketStatus, setSocketStatus] = useState<{ isOpen: boolean }>({isOpen: false});


    useEffect(() => {
        const socketInstance = new WebSocket('ws://jamoveo-backend.onrender.com/ws/chat/');
        setSocket(socketInstance);
        
        socketInstance.onopen = () => {
            console.log('WebSocket is open now.');
            setSocketStatus({ isOpen: true });
        };

        socketInstance.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.room) {
                navigate(`livepage/${data.room}`);
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



  const handleStartLiveShow = (songId: number) => {
    if (socketStatus.isOpen && socket) {
        socket.send(JSON.stringify({ room: songId.toString() }));
    } else {
        console.error('WebSocket is not open. Current status:', socketStatus.isOpen);
    }
};


  return (
    <div className = "results-container">

    {searchResults.length === 0 && (<div style = {{height: "6dvh"}}/>)}

      <h1>Search Results</h1>

      {searchResults.length === 0 ? (
        <>
        <b style = {{fontSize: 20, color: "#FF9100"}}>There is no such song!</b>
        <br/>
        <Button onClick = {() => navigate('/')} style={{backgroundColor: "#A28B55", border: "1px solid black", width: "200px"}}>Main page</Button>
        </>
        ) : (

        <>
            <ul>
                {searchResults.map((song: any, index: number) => (
                <li key={index}>
                    {song.song_name} - {song.artist} | <b style = {{color: "#FF9100", cursor: "pointer"}} onClick={() => handleStartLiveShow(song.id)}>START A LIVE SHOW!</b>
                </li>
                ))}
            </ul>
        </>

      )}


    </div>
  );
}

export default ResultsPage;
