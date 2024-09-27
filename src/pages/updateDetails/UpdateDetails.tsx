import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonButton, IonAlert } from '@ionic/react';
import './Update.css';
import { userLogin,updateDetails } from '../../function/user_login';
import { useStorage } from '../../storage/useStorage';


const UpdateDetails: React.FC = () => {
  const { store, saveUserData, loadUserData } = useStorage(); // Destructure store
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

    if (mobile.length === 9 || mobile.length ===10){
        setAlertMessage("Enter correct mobile number");
        setShowAlert(true);
        return;
    }

    if (!validateEmail(email)){
        setAlertMessage("Enter valied email");
        setShowAlert(true);
    }

    try {
      const res: any = await updateDetails(token,firstName,lastName,email,mobile);
      //console.log(res);
      if (res.status === true) {
        if (store) { 
          // Save user data
          await saveUserData("token", res.token);
          await saveUserData("f_name", firstName);
          await saveUserData("l_name", lastName);
          await saveUserData("email", email);
          await saveUserData("mobile", mobile);

          setAlertMessage("Update Success !") ;
          setShowAlert(true); 
        } else {
          throw new Error("data save error");
        }
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
        if(store){
            setFirstName(await loadUserData("f_name"));
            setLastName(await loadUserData("l_name"));
            setEmail(await loadUserData("email"));
            setMobile(await loadUserData("mobile"));
            setToken(await loadUserData("token"));
        }
    }
    getUserDetails();
  },[store]);

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

