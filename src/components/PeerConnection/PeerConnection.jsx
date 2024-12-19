import React, { memo, useEffect, useState } from 'react';
import Peer from 'peerjs';

const PeerConnection = ({ onConnection }) => {
    const [peer, setPeer] = useState(null);
    const [myPeerId, setMyPeerId] = useState(null);

    useEffect(() => {
        const generateSixDigitId = () => {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        const generatedId = generateSixDigitId();

        const peerInstance = new Peer(generatedId);

        peerInstance.on('open', (id) => {
            setMyPeerId(id);
            console.log('My peer ID:', id);
        });

        peerInstance.on('connection', (conn) => {
            console.log('Connection established:', conn);
            onConnection(conn);
        });

        setPeer(peerInstance);

        return () => {
            if (peerInstance) {
                peerInstance.destroy();
            }
        };
    }, [onConnection]);



    const connectToPeer = (remotePeerId) => {
        if (peer && remotePeerId) {
            const conn = peer.connect(remotePeerId);
            conn.on('open', () => {
                console.log('Connected to remote peer:', remotePeerId);
            });
        }
    };

    return (
        <div className='peerData'>
            <p>My Peer ID: {myPeerId}</p>
            <button onClick={() => connectToPeer(prompt('Enter peer ID to connect:'))}>
                Connect to Peer
            </button>
        </div>
    );
};

export default memo(PeerConnection);
