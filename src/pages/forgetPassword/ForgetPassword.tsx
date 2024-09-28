import React, {useState} from "react";
import { useHistory } from "react-router";
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonThumbnail, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './forgetPassword.css';
import EmailImg from '../../images/email_8717983.gif';
import {changePassword, sendOTP, forgetPassword} from '../../function/user_login';

const ForgetPassword : React.FC = () => {

    const history: any = useHistory();

    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [otp, setOtp] = useState<string | null>(null);

    const [token, setToken] = useState<string>('');

    // showing content
    const [showForm, setShowForm] = useState<boolean>(true);
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [showPasswordForm, setShowPasswordForm] = useState<boolean>(false);

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    // change password
    const [newPassword, setNewPassword] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    const sendServer: any = async() => {
        // Form validation
        if (!username && !email){
            setAlertMessage("please fill both fiels");
            setShowAlert(true);
            return
        }

        if (!validateEmail(email!)){
            setAlertMessage("Invalid Email");
            setShowAlert(true);
            return
        }

        // send the server 
        try{
            const response: any = await forgetPassword(username!,email!);
            if (response.status){
                setShowForm(false);
                setShowOTP(true);
            }else{
                setAlertMessage("username or email incorrect");
                setShowAlert(true);
                return
            }

        }catch(error){
            console.log(error);
            return
        }
    }

    const sendOtp = async() => {
        if (otp){
            try{
                const response: any = await sendOTP(email!, otp!);
                if (response.status){
                    setToken(response.temp_token);
                    setShowOTP(false);
                    setShowPasswordForm(true);
                }

            }catch(error){
                console.log(error);
                return;
            }

        }else{
            setAlertMessage("OTP is required");
            setShowAlert(true);
        }
    }

    const passwordchange = async () => {
        if (!confirmPassword || !newPassword) {
          setAlertMessage('Please fill in both fields');
          setShowAlert(true);
          return;
        }
    
        if(newPassword !== confirmPassword){
            setAlertMessage('Passwords do not match');
            setShowAlert(true);
            return;
        }
    
        try {
          const res: any = await changePassword(token,newPassword);
          
          if(res.status){
            setAlertMessage('Password updated successfully');
            setShowAlert(true);
            setConfirmPassword('');
            setNewPassword('');
            setShowPasswordForm(false);
            setShowForm(true);
            history.push('/login');
          }
          
        } catch (error) {
          console.log(error);
          setAlertMessage('Password Update Fail');
          setShowAlert(true);
        }
    
        
      };

    return(
        <>
                <IonPage>
                
                <IonHeader>
                <IonToolbar>
                    <IonTitle>Forgot Password</IonTitle>
                </IonToolbar>
                </IonHeader>
                
                {showForm && (
                <IonContent className="ion-padding">
                    <IonItem>
                        <IonInput 
                        placeholder='Username'
                        type="text" 
                        value={username} 
                        onIonInput={(e) => setUsername(e.detail.value!)} 
                        required 
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput 
                        placeholder='Email'
                        type="email" 
                        value={email} 
                        onIonInput={(e) => setEmail(e.detail.value!)} 
                        required 
                        />
                    </IonItem>
                    <IonButton expand="block" onClick={sendServer} className="ion-margin-top">
                        Submit
                    </IonButton>
                </IonContent>
                )}

                {showOTP && (
                    <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonImg src={EmailImg} alt="email image" className="email-image"></IonImg>
                                Check the email.
                            </IonCardTitle>
                            <IonCardSubtitle>One time password</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                        <IonItem>
                            <IonInput 
                            placeholder='OTP'
                            type="number" 
                            value={otp} 
                            onIonInput={(e) => setOtp(e.detail.value!)} 
                            required 
                            />
                        </IonItem>
                        <IonButton expand="block" onClick={sendOtp} className="ion-margin-top">
                                Send OTP
                        </IonButton>
                        <IonButton expand="block" onClick={sendServer} className="ion-margin-top">
                                Resend OTP
                        </IonButton>
                

                        </IonCardContent>
                    </IonCard>
                </IonContent>

                )}

                {showPasswordForm && (
                    <IonContent className="ion-padding">
                    <IonItem>
                        <IonInput 
                        placeholder='New Password'
                        type="password" 
                        value={newPassword} 
                        onIonInput={(e) => setNewPassword(e.detail.value!)} 
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
                    <IonButton expand="block" onClick={passwordchange} className="ion-margin-top">
                        Submit
                    </IonButton>
                </IonContent>
                )}

                
                
                
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    message={alertMessage}
                    buttons={['OK']}
                />
                
            </IonPage>
        </>
    )

}

export default ForgetPassword;