import {
    checkLoginFunction,
    userLoginWithThirdParty,
    logout
  } from '../firebase/_fetch.js';
  import { authByGoogle } from '../firebase/firebase.js';
  ///entry

  const LogIn = () => {
    checkLoginFunction((res) => {
        console.log(res);
    })

    ///update buttons with event
    const buttons = document.querySelectorAll("button");
    for (let btn of buttons) {
        btn.addEventListener("click", evt => {
        handleButtonClick(evt.target.name);
        })
    }
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
        default:
            const one = 1+ 1;
            console.log(one);
            break;
        }
    }
    return(
        <>
            <button onClick={handleButtonClick("login by google")}></button>
            <button onClick={handleButtonClick("logout")}></button>
        </>
    )
  }
export default LogIn;