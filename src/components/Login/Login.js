
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';




function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''

  })
  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
       handleResponse(res,false)
      })
  }
  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from)
    }
  }
  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)

    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const NumberCheck = /\d{1}/.test(event.target.value)
      isFieldValid = isPasswordValid && NumberCheck
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res,true)
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res,true)
        })
    }


    e.preventDefault();
  }


  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>sign out</button> :
          <button onClick={googleSignIn}>sign in</button>
      }
      {
        user.isSignedIn && <div> <p> Welcome {user.name}</p>
          <img src={user.photo} alt="" />
        </div>

      }
      <h1>our own authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">sign up</label>
      <form onSubmit={handleSubmit} action="">
        {newUser && < input onBlur={handleBlur} type="text" placeholder='name' name="name" required />}      <br />
        <input onBlur={handleBlur} type="text" placeholder='email' name="email" required />
        <br />
        <input onBlur={handleBlur} type="password" placeholder='password' name="password" id="" required />
        <br />
        <input type="submit" value={newUser ? 'sign up' : 'sign in'} />
      </form>
      <p>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>user {newUser ? 'created' : 'logged in'} successfully</p>}
    </div>
  );
}

export default Login;