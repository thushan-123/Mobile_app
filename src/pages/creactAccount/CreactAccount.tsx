import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonButton, IonAlert,IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle ,IonImg} from '@ionic/react';
import './CreateAccount.css';
import { registerStudent } from '../../function/user_login';
import LoadingImg from '../../images/hourglass_8121274.gif';


const CreateAccount: React.FC = () => {
  
  
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string> ('');
  const [mobile, setMobile] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [showContent, setShowContent] = useState<boolean>(false);

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

    if (!parseInt(mobile)){
        setAlertMessage("Enter correct mobile number");
        setShowAlert(true);
        return;
    }

    if (!validateEmail(email)){
        setAlertMessage("Enter valied email");
        setShowAlert(true);
    }

    try {
      const res: any = await registerStudent(firstName,lastName,email,mobile);
      console.log(res);

      if (res.status){
        setAlertMessage("Account created successfully");
        setShowContent(true);
      }
      
    } catch (error) {
      console.log(error);
      setAlertMessage('Register Fail');
      setShowAlert(true);
    }

    
  };

  

  return (
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Student</IonTitle>
        </IonToolbar>
      </IonHeader>
      
        {!showContent && (
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
          </IonContent>
          
        )}
        <IonContent>
        {!showContent && (  
            <IonButton expand="block" onClick={saveUpdateDetails} className="ion-margin-top">
              Save Details
            </IonButton>
        )}

        {showContent && (
            <IonCard>
            <IonCardHeader>
                <IonCardTitle className='title'>Account Verification in Progress</IonCardTitle>
                <IonCardSubtitle>Verification</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonImg src={LoadingImg} alt='' className='load-img' />
                Please wait while your account is being verified.
            </IonCardContent>
        </IonCard>
        )}
        <IonButton fill="outline" onClick={() => {history.push('/login')}}>Login</IonButton>

        
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

export default CreateAccount;

