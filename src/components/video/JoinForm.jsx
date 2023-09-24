// import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

function JoinForm({firstname, lastname, roomCode, roomType}) {
  const hmsActions = useHMSActions();
//   const [inputValues, setInputValues] = useState({
//     name: `${firstname} ${lastname}`,
//     token: ""
//   });


//   const handleInputChange = (e) => {
//     setInputValues((prevValues) => ({
//       ...prevValues,
//       [e.target.name]: e.target.value
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })

    try {
      const userName = `${firstname} ${lastname}`;
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e)
    }
  };

  return (
<div className="bg-light">
    <form onSubmit={handleSubmit}>
      <h2><strong>Join Room</strong></h2>
        <p><strong>You are currenly joining as:</strong> {firstname}  {lastname}</p>
        <p><strong>You are a</strong> {roomType}</p>
      <button className="btn btn-primary text-white">Join Room</button>
    </form>
    </div>
  );
}

export default JoinForm;
