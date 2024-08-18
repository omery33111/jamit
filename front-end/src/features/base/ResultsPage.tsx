import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';



const ResultsPage = () => {
    
  const location = useLocation();
  const navigate = useNavigate();
  const { searchResults } = location.state || { searchResults: [] };

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socketInstance = new WebSocket('ws://localhost:8000/ws/chat/');
    
    socketInstance.onopen = () => {
        console.log('WebSocket is open now.');
    };

    socketInstance.onmessage = (event) => {
        console.log('Message from server ', event.data);
    };


    socketInstance.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socketInstance.onclose = () => {
        console.log('WebSocket is closed now.');
    };

    return () => {
        if (socketInstance) {
            socketInstance.close();
        }
    };
}, []);



const handleStartLiveShow = (songId: number) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: "1" }));
  } else {
      console.error('DID NOT SEND.');
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
