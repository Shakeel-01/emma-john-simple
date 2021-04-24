import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework =()=>{
    !firebase.apps.length && firebase.initializeApp(firebaseConfig)
}


export const handleGoogleSignIn = ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName, photoURL, email}=res.user;
      const signedInUser={
        isSignedIn:true,
        name :displayName,
        email:email,
        photo:photoURL,
        success:true
      }
      setIdToken();
       return signedInUser;
     
    })
    .catch(err=>{
      console.log(err)
      console.log(err.massage)
    })
  }

  const setIdToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token', idToken)
    }).catch(function(error) {
      // Handle error
    });
  }

  export const handleSignOut =()=>{
    return firebase.auth().signOut()
    .then(res=>{
      const userOut = {
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
      }
      return userOut;
    })
    .catch(err=>{
      console.log(err)
    })

  }

  export const createUserWithEmailAndPassword =(name, email, password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( res => {
      console.log(res)
      const newUserInfo =res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      
      updateUserName(name)
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo ={}
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo;
      
      
    });
  }

  export const signInWithEmailAndPassword =(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo ={}
      newUserInfo.error = ''
      newUserInfo.success = true;
      
      return newUserInfo;
    
    })
    .catch((error) => {
      const newUserInfo ={}
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo;
    });
  }
  
  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {  
    console.log('username updated successfully')   
    }).catch(function(error) {
    });
  }