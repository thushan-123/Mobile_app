import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonButton, IonAlert } from '@ionic/react';
import './Update.css';
import { userLogin,updateDetails } from '../../function/user_login';
//import { useStorage } from '../../storage/useStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UpdateDetails: React.FC = () => {
  //const { store, saveUserData, loadUserData } = useStorage(); // Destructure store
  const [token, setToken] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string> ('');
  const [mobile, setMobile] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const history = useHistory();

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  

  const saveUpdateDetails = async () => {
    if(firstName === '' || lastName === '' || email === '' || mobile === '' ){
        setAlertMessage("please fill both fiels");
        setShowAlert(true);
        return;
    }

    if (mobile.length < 8 || mobile.length > 11){
        setAlertMessage("Enter correct mobile number");
        setShowAlert(true);
        return;
    }

    if (!validateEmail(email)){
        setAlertMessage("Enter valied email");
        setShowAlert(true);
        return;
    }

    try {
      const res: any = await updateDetails(token,firstName,lastName,email,mobile);
      //console.log(res);
      if (res.status === true) {
       setAlertMessage("update successfully");
       setShowAlert(true);
      } else {
        setAlertMessage('Invalid username or password');
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('Invalid username or password');
      setShowAlert(true);
    }

    
  };

  useEffect(()=> {
    const getUserDetails = async()=>{
            const fname = await AsyncStorage.getItem("f_name")
            const lname = await AsyncStorage.getItem("l_name")
            const email = await AsyncStorage.getItem("email")
            const mobile = await AsyncStorage.getItem("mobile")
            const token = await AsyncStorage.getItem("token")
            setFirstName(fname!);
            setLastName(lname!);
            setEmail(email!);
            setMobile(mobile!);
            setToken(token!);
        
    }
    getUserDetails();
  },[]);

  return (
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput 
            placeholder='First Name'
            type="text" 
            value={firstName} 
            onIonInput={(e) => setFirstName(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonInput 
            placeholder='Last Name'
            type="text" 
            value={lastName} 
            onIonInput={(e) => setLastName(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonInput 
            placeholder='Email'
            type="text" 
            value={email} 
            onIonInput={(e) => setEmail(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonInput 
            placeholder='Mobile'
            type="number" 
            value={mobile} 
            onIonInput={(e) => setMobile(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonButton expand="block" onClick={saveUpdateDetails} className="ion-margin-top">
          Save Details
        </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default UpdateDetails;

