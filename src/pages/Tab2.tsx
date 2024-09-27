import { IonContent, IonHeader, IonPage, IonTitle,IonImg,IonLabel,IonButton,IonIcon,
   IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import {useEffect, useState} from 'react';
import './Tab2.css';
import { useStorage } from '../storage/useStorage';
import {todayTopics} from '../function/tpoics';



const Tab2: React.FC = () => {
  const {store, loadUserData} = useStorage();
  const [topics, setTopic] = useState<Array<JSON>|null>(null);

  const [token, setToken] = useState<string>('');

  
  useEffect(() => {
    const getTokenAndTopics = async () => {
      if (store) {
        const fetchedToken = await loadUserData('token');
        if (fetchedToken) {
          setToken(fetchedToken);
          fetchTodayTopics(fetchedToken); // Call the function to get topics after token is set
        } else {
          console.error('No token found in storage');
        }
      }
    };

    // Fetch today's topics with token
    const fetchTodayTopics = async (token: string) => {
      try {
        const response = await todayTopics(token);
        if (response && response.status === true) {
          setTopic(response.data);
        } else {
          console.log('Failed to fetch topics:', response);
        }
      } catch (error) {
        console.log('Error fetching topics:', error);
      }
    };

    getTokenAndTopics(); // Execute the function
  }, [store]);
    
  
     
  return (
    <>
    
      <IonPage>
        
        <IonHeader>
          <IonToolbar>
            <IonTitle>Topics</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>

          {topics?.map((value:any, index: number) => (
            <IonCard color='light' key={index}>
            <IonCardHeader>
              <IonCardTitle >
                {value.topic_name}
              </IonCardTitle>
              <IonCardSubtitle>Today Topics</IonCardSubtitle>
            </IonCardHeader>
    
            <IonCardContent>{value.criteria}</IonCardContent>
            
          </IonCard>
          ))}
          
        </IonContent>

        
      </IonPage>

    </>
    
    
  );
};

export default Tab2;
