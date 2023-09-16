import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

function JoinForm({firstname, lastname, roomCode, roomType}) {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: `${firstname} ${lastname}`,
    token: ""
  });


  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // use room code to fetch auth token
    const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })

    try {
      const userName = inputValues.name;
      await hmsActions.join({ userName, authToken });
    } catch (e) {
      console.error(e)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
        <p>You are currenly joining as: {firstname}  {lastname}</p>
        <p>You are a {roomType}</p>
      <button className="btn-primary">Join Room.</button>
    </form>
  );
}

export default JoinForm;
