import "./Main.css";
import JoinForm from "./JoinForm";
import Header from "./Header";
import Conference from "./Conference";
import Footer from './Footer';
import { useEffect } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore
} from "@100mslive/react-sdk";

export default function Main({firstname, lastname, roomCode, roomType}) {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

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
        <JoinForm firstname={firstname} lastname={lastname} roomCode={roomCode} roomType={roomType} />
        )}
    </div>
  );
}

