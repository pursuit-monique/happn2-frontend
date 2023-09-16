import { HMSPrebuilt } from '@100mslive/roomkit-react';

function Room({room}) {
  return (
    <div style={{ height: "100vh" }}>
      <HMSPrebuilt roomCode={room} />
    </div>
  );
}

export default Room;