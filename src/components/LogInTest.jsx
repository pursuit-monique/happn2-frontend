import {
    checkLoginFunction,
    userLoginWithThirdParty,
    logout
  } from '../firebase/_fetch.js';
import { authByGoogle } from '../firebase/auth.js';
  ///entry
  checkLoginFunction((res) => {
    console.log(res);
  })


const LogInTest = () => {
    
  const handleButtonClick = (name) => {
    switch (name) {
      case "login by google":
        //function start
        authByGoogle(idToken => {
          console.log("token from google", idToken);
          userLoginWithThirdParty(idToken, (res) => {
            console.log("result from backend", res);
          })
        });
        //function end
        break;
      case "logout":
        logout(res => {
          console.log(res);
        })
        break;
    }
  }
return (

    <>
        <div>
            <h1>hello world, Happn</h1>
            <p>by default access: <a href="https://127.0.0.1:8001/test/index.html">https://127.0.0.1:8001/test/index.html</a>
            </p>
            
            <h3>test functions</h3>
            <button onClick={()=>handleButtonClick("login by google")}> Login with Google</button>
            <button onClick={()=>handleButtonClick("loogout")}> Logout</button>
        </div>
    </>
    // <div>
    // <h1>hello world, Happn</h1>
    // <p>by default access: <a href="https://127.0.0.1:8001/test/index.html">https://127.0.0.1:8001/test/index.html</a>
    // </p>
    // <div>
    //   <h3>test functions</h3>
    //   <ol>
    //     <li><button name="login by google">login by google</button></li>
    //     <li><button name="logout">logout</button></li>
    //   </ol>
    // </div>

)}

export default LogInTest;