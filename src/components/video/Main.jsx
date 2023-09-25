import "./Main.css";
import JoinForm from "./JoinForm";
import Header from "./Header";
import Conference from "./Conference";
import Footer from './Footer';
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore
} from "@100mslive/react-sdk";
import { useContext } from "react";

import { UserContext } from "../../App";

export default function Main({firstname, lastname, roomCode, roomType}) {
  const {roomID} = useParams();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const {settings} = useContext(UserContext);



  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="App">
      <Header />
      {isConnected ? (
        <>
            <Conference />
            <Footer />
        </>
      ) : (
        <JoinForm firstname={settings.firstname} lastname={settings.lastname} roomCode={roomID || settings.roomCode} roomType={settings.roomType} />
        )}
    </div>
  );
}

