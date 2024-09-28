import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton, IonIcon,
   IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLabel
 } from '@ionic/react';
import './Tab1.css';
import BG from '../images/teen_7088431.png';
import CallerImg from '../images/teen_7088447.png'
import WaitImg from '../images/time-management_15332433.gif';
import LiveImg from '../images/play_12749751.gif';

import ServerImg from './components/ServerImg';

import { useStorage } from '../storage/useStorage';
import { useState, useEffect,useRef } from 'react';
import Peer from 'peerjs';
import { call, caretForwardCircle, peopleOutline, personAddOutline } from 'ionicons/icons';
import {requestPermissions} from '../services/permissions';
import 'webrtc-adapter';



const Tab1: React.FC = () => {
  const { store, loadUserData } = useStorage();
  const [peerID, setPeerId] = useState<any | null>(null);
  const [remotePeerId, setRemotePeerId] = useState<any | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketMsg, setSocketMsg] = useState<JSON | null>(null);

  // striming
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);


  // showing connect user or alert
  const [showConnectUser, setShowConnectUser] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showConference, setShowConference] = useState<boolean>(false);

  // peerjs object
  const [peer, setPeer] = useState<Peer | null>(null);

  // websocket recived msg ; requested show button;
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  //video on off
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);

  const refresh = () =>{
    window.location.reload();
  }

  

  const getLocalStream = async () => {
    try {
      return await navigator.mediaDevices.getUserMedia({ video: isVideoOn, audio: true });
    } catch (error) {
      console.error('Error accessing media devices.', error);
      alert('Could not access your camera and microphone. Please allow access.');
    }
  };

  const connectPeerNetwork = () => {
    const peer = new Peer( {
     // host: '192.168.8.168', // Replace with your server's IP or domain
     // port: 9000,                  // The port of your PeerJS server
     // path: '/'
    });
    // set the peerID
    setPeer(peer);
    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('error',(error)=> {
      console.log(error);
    });
  }



  // Function to connect to WebSocket and listen to incoming messages
  const connectToNetwork = () => {
    if (username && peerID) {
      const wsocket = new WebSocket(`ws://159.223.61.88/createConference/${username}/${peerID}`);

      wsocket.onopen = () => {
        console.log('WebSocket connection opened');
        setSocket(wsocket);
      };

      wsocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // Listening for incoming messages
      wsocket.onmessage = (event) => {
        console.log('Message from server:', event.data);
        try {
          const parsedData = JSON.parse(event.data); // Parse the message if it's JSON
          setSocketMsg(parsedData);
          console.log('Parsed message from server:', parsedData);
        } catch (e) {
          console.log('Non-JSON message from server:', event.data); // Handle non-JSON messages
        }
      };


      wsocket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      setSocket(wsocket);
    } else {
      console.error('Username or PeerID is missing');
    }
  };

  // Function to send a message to the WebSocket server
  const sendMsg = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        type: "join_conference"
      };

      socket.send(JSON.stringify(message)); // Send the message to the server
      console.log('Sent message:', message);
      
    } else {
      console.error('WebSocket connection is not open');
    }
  };

  const msgHandle = (socketMsg:  any) => {
    console.log('hnj',socketMsg);
    if (socketMsg) {
      try {
        if (socketMsg.status === true) {
          setShowAlert(false);
          setShowConnectUser(true);
          setRemotePeerId(socketMsg.peer_id);
          
          if(socketMsg.requested){
            setIsRequested(true);
            setIsRequesting(false);
          }else{
            setIsRequested(false);
            setIsRequesting(true);
          }
          console.log("Status is true!");
        }else{
          setShowConnectUser(false);
          setShowAlert(true);
          console.log(socketMsg.type);
        }
      } catch (error) {
        setShowConnectUser(false);
        setShowAlert(true);
        console.error("Failed to parse JSON:", error);
      }
    }
  };

  const disconnect = (): void => {
    setShowConference(false);
    if (socket) {
      socket.close();
      console.log('WebSocket connection closed');
      setSocket(null); // Reset the socket state after closing the connection
      if(peer){
        peer.destroy();
      }
      refresh();
    } else {
      console.log('No WebSocket connection to close');
    }
  };

  const connectingUser = async () => {
    if (peer) {
      setShowConference(true);
      peer.on('call', async (call) => {
        console.log('Incoming call...');
  
        // Get the local stream with the current video status
        const localStream = await getLocalStream()
  
        if (localStream) {
          call.answer(localStream);

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
          }
  
          // When receiving the remote stream, display it in the remote video element
          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
        }
      });
    }
  };
  

  const joinConference = async () => {
    if (!remotePeerId) {
      alert('No remote peer ID');
      return;
    }
    setShowConference(true);
    console.log('Calling ' + remotePeerId + '...');
  
    // Get the local stream
    const localStream = await getLocalStream()
    if (localStream && peer) {
      // Display the local stream in the local video element
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
  
      // Make the call to the remote peer
      const call = peer.call(remotePeerId, localStream);
  
      // When receiving the remote stream, display it in the remote video element
      call.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
  
      call.on('close', () => {
        console.log('Call ended.');
      });
    }
  };

  

  // Set up the WebSocket connection and send a message on component mount
  useEffect(() => {
    const getusername = async() => {
      if(store){
        const username = await loadUserData('user_name');
        setUsername(username);
      }
     }  
     getusername();

    connectPeerNetwork();

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [store]); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    if (peerID){
      connectToNetwork(); // Establish the connection
    }
  },[peerID]);

  useEffect(() => {
    if (socketMsg) {
      msgHandle(socketMsg); // Call msgHandle whenever socketMsg changes
    }
  }, [socketMsg]);

  // Optionally send the join conference message after connecting
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      sendMsg();
    }
  }, [socket]);
   // Trigger sendMsg when socket becomes ready
   
   

  return (
    <IonPage>
      
      <IonHeader>
        <IonToolbar className='tool-bar'>
          {showConference && (
            <IonTitle >
              Meeting
            </IonTitle>
          )}
          {!showConference && (
            <IonTitle>Conference</IonTitle>
          )}
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

   
      {!showConference && showConnectUser && (
        <IonCard>
        <IonCardHeader>
          <IonCardTitle className='card-title'>
            <IonImg src={CallerImg} alt="Conference Image" className="medium-image" />
            <IonLabel className='user-name'>
              Anonimus
            </IonLabel>
          </IonCardTitle>
          <IonCardSubtitle>Speech Conference</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>{'If you’re wondering what a great welcome speech looks like, here’s you can use to help create your very own welcome speech.'}</IonCardContent>
        {isRequested && (
          // show requested incomming buttin
          <IonButton fill="outline" className='button' color='success' onClick={joinConference}>
            <IonIcon slot='start' icon={peopleOutline} > </IonIcon>
            Join Conference
          </IonButton>
        )}
        
        {isRequesting && (
          // show send request button
          <IonButton fill="outline" className='button' color='success' onClick={connectingUser}>
            <IonIcon slot='start' icon={peopleOutline} > </IonIcon>
            Join Conference
          </IonButton>
        )}

      </IonCard>
      )}

      {showAlert && (
        <IonCard>
        <IonCardHeader>
          <IonCardTitle className='card-title'>
            <IonImg src={WaitImg} alt="Conference Image" className="medium-image" />
            <IonLabel className='user-name'>
               Wait..
            </IonLabel>
          </IonCardTitle>
          <IonCardSubtitle>Alert</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>All users are in the conference or another reason.</IonCardContent>

        <IonButton fill="outline" className='button' color='warning' onClick={disconnect}>
        <IonIcon slot='start' icon={personAddOutline} > </IonIcon>
        Disconnect
        </IonButton>
        
      </IonCard>
      
      )}

    {!showConference && socket && (
      <IonButton fill="outline" className='button' onClick={sendMsg}>
        <IonIcon slot='start' icon={personAddOutline} > </IonIcon>
        Find User
      </IonButton>
    )}

    {!socket && ( <ServerImg />)}

    {showConference && (
      <IonCard>
      <IonCardHeader>
        <IonCardTitle className='card-title'>
          <IonImg src={LiveImg} alt="Conference Image" className="medium-image" />
          <IonLabel className='user-name-live'>
          
             LIVE
          </IonLabel>
        </IonCardTitle>
        <IonCardSubtitle>Meeting</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent className="video-content">
        <video ref={localVideoRef} className="video-player" autoPlay  playsInline>
          
          Your browser does not support the video tag.
        </video>
        <video ref={localVideoRef} className="video-player" autoPlay muted playsInline >
          
          Your browser does not support the video tag.
        </video>
      </IonCardContent>

      <IonButton fill="outline" className='button' color='danger' onClick={disconnect}>
      <IonIcon slot='start' icon={call} > </IonIcon>
        Leave Conference
      </IonButton>
      
    </IonCard>
    )}

        

      </IonContent>
    </IonPage>
  );
};

export default Tab1;

