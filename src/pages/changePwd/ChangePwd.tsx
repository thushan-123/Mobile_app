import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonButton, IonAlert } from '@ionic/react';
import { changePassword } from '../../function/user_login';
import { useStorage } from '../../storage/useStorage';



const ChangePwd: React.FC = () => {
  const { store, loadUserData } = useStorage(); // Destructure store

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');


  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const history = useHistory();

  const savechange = async () => {
    if (!confirmPassword || !password) {
      setAlertMessage('Please fill in both fields');
      setShowAlert(true);
      return;
    }

    if(password !== confirmPassword){
        setAlertMessage('Passwords do not match');
        setShowAlert(true);
        return;
    }

    try {
      const res: any = await changePassword(token,password);
      
      if(res.status){
        setAlertMessage('Password updated successfully');
        setShowAlert(true);
        setConfirmPassword('');
        setPassword('');
        history.push('/tab3');
      }
      
    } catch (error) {
      console.log(error);
      setAlertMessage('Password Update Fail');
      setShowAlert(true);
    }

    
  };

  useEffect(()=>{
    const getUserDetails = async() =>{
        if (store){
            setToken(await loadUserData('token'));
        }
    }
    getUserDetails();
  },[store]);

  return (
    <IonPage>
        
      <IonHeader>
        <IonToolbar>
          <IonTitle>Change Password</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput 
            placeholder='Password'
            type="password" 
            value={password} 
            onIonInput={(e) => setPassword(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonItem>
          <IonInput 
            placeholder='Confirm Password'
            type="password" 
            value={confirmPassword} 
            onIonInput={(e) => setConfirmPassword(e.detail.value!)} 
            required 
          />
        </IonItem>
        <IonButton expand="block" onClick={savechange} className="ion-margin-top">
          Save Password
        </IonButton>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePwd;

