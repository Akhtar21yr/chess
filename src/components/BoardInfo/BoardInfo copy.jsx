import React, { useState } from 'react';
import PeerConnection from '../PeerConnection/PeerConnection';
import style from './BoardInfo.module.css';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const BoardInfo = () => {
  const [currentPlayer, setCurrentPlayer] = useState('P1');
  const [p1Time, setP1Time] = useState(300); // 5 minutes in seconds
  const [p2Time, setP2Time] = useState(300); // 5 minutes in seconds
  const [history, setHistory] = useState([]);
  const [gameData, setGameData] = useState({});

  // Handle connection establishment
  const handleConnection = (conn) => {
    console.log('Connection established:', conn);
    conn.on('data', (data) => {
      console.log('Received data:', data);
      setGameData(data); 
    });
  };

  // Handle incoming data from peer
  const handleReceivedData = (data) => {
    console.log('Received data:', data);
    setGameData(data); 
  };

  return (
    <div className={style.boardInfo}>
      <PeerConnection onConnection={handleConnection} onReceiveData={handleReceivedData} />

      <div className={`${style.player} ${style.top} ${currentPlayer === 'P2' ? style.activePlayer : ''}`}>
        <div className={style.timer}>{formatTime(p2Time)}</div>
      </div>

      <div className={style.centerSection}>
        <div className={style.title}><p>Anonymous</p></div>
        <div className={style.moveList}>
          <div className={style.movesRow}>
            <div className={style.move}>{/* Move List Content */}</div>
          </div>
          {history.map((move, index) => (
            <div className={style.movesRow} key={index}>
              <div className={style.move}>{move.from + move.to}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${style.player} ${style.bottom} ${currentPlayer === 'P1' ? style.activePlayer : ''}`}>
        <div className={style.timer}>{formatTime(p1Time)}</div>
      </div>
    </div>
  );
};

export default BoardInfo;
