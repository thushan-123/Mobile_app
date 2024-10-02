import  {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonPage, IonTitle,
   IonToolbar, IonCard, IonCardContent, IonList, 
   IonThumbnail,IonLabel,IonItem, IonImg, IonButton, IonIcon,
   IonCardHeader,
   IonCardSubtitle,
   IonCardTitle} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import './Tab3.css';
import profilePic from '../images/teen_7088431.png'
import detailPic from '../images/file_3934819.png'
//import { useStorage } from '../storage/useStorage';
import { cartOutline, keyOutline, pencilOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  
  const [username, setUsername] = useState<string>('');
  const [firstname, setFirstName] = useState<string>('')
  const [lastname, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  //const {store, loadUserData, saveUserData, clearAllData} = useStorage();

  const history: any = useHistory();

  const logOut = async () => {
    /*
    if(store){
      clearAllData();
      history.push('/login');
    }*/
   await AsyncStorage.multiRemove(["user_name","token","l_name","email","token"]);
   history.push('/login');
   window.location.reload();
  }


  useEffect(()=>{
   const getusername = async() => {
    
      const username = await AsyncStorage.getItem("user_name"); //await loadUserData('user_name');
      const firstname =await AsyncStorage.getItem("f_name"); //await loadUserData('f_name');
      const lastname = await AsyncStorage.getItem("l_name");//loadUserData('l_name');
      const email = await AsyncStorage.getItem("email"); //await loadUserData('email');
      setFirstName(firstname!);
      setLastName(lastname!);
      setEmail(email!);
      setUsername(username!);
      console.log(username,firstname,lastname,email);
    
   }  
   getusername();
    },[])
  

  return (
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
        <IonCard className='ion-card-profile'>
        <IonCardHeader>
                <IonCardTitle className='title'>Account Information</IonCardTitle>
                <IonCardSubtitle>{firstname} {lastname}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent className='profile'>
            <IonThumbnail slot="start">
              <IonImg src={profilePic} alt=''></IonImg>
            </IonThumbnail>
            <IonLabel class='user-name'>
              {username}
            </IonLabel>
          </IonCardContent>
          <IonCardContent>
            <IonItem>Email : {email}</IonItem>
          </IonCardContent>
        </IonCard>
        

        </IonList>
        <IonButton fill="outline" className='button' onClick={()=>history.push('/updateDetails')}>
          <IonIcon slot="start" icon={pencilOutline}></IonIcon>
          Edit User Info 
        </IonButton>
        <IonButton fill="outline" className='button' onClick={()=>history.push('/updatepassword')}>
        <IonIcon slot="start" icon={keyOutline}></IonIcon>
          Change Password
        </IonButton>
        <IonButton className='button' expand="block" color='medium' onClick={logOut}>Log Out</IonButton>
        
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
