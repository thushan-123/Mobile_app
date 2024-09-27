import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonButton, IonAlert } from '@ionic/react';
import './Tab4.css';
import { userLogin,updateDetails } from '../function/user_login';
import { useStorage } from '../storage/useStorage';


const Tab4: React.FC = () => {
  const { store, saveUserData, loadUserData } = useStorage(); // Destructure store
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const history = useHistory();

  const handleLogin = async () => {
    if (!username || !password) {
      setAlertMessage('Please fill in both username and password');
      setShowAlert(true);
      return;
    }

    try {
      const res: any = await userLogin(username, password);
      
      if (res.status === 'success') {
        if (store) { // Ensure store is initialized
          // Save user data
          await saveUserData("token", res.data.token);
          await saveUserData("id", res.data.id);
          await saveUserData("f_name", res.data.f_name);
          await saveUserData("l_name", res.data.l_name);
          await saveUserData("user_name", res.data.user_name);
          await saveUserData("email", res.data.email);
          await saveUserData("mobile", res.data.mobile);

          // Load data (optional)
          

          history.push('/tab1');
        } else {
          throw new Error("data save error");
        }
      } else {
        setAlertMessage('Invalid username or password');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Invalid username or password');
      setShowAlert(true);
    }

    
  };

  useEffect(()=>{
    const getUserDetails = async() =>{
        if (store){

        }
    }
  },[store]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput 
            placeholder='User Name'
            type="text" 
            value={username} 
            onIonInput={(e) => setUsername(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonInput 
            placeholder='Password'
            type="password" 
            value={password} 
            onIonInput={(e) => setPassword(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonButton expand="block" onClick={handleLogin} className="ion-margin-top">
          Login
        </IonButton>

        <IonButton fill="outline" onClick={() => {history.push('/createAccount')}}>Register</IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab4;

