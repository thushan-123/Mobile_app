import { IonContent, IonHeader, IonPage, IonTitle,
   IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import './Tab2.css';
import {todayTopics} from '../function/tpoics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab2: React.FC = () => {
  
  const [topics, setTopic] = useState<Array<JSON>|null>(null);

  const [token, setToken] = useState<string>('');

  const history = useHistory();

  
  useEffect(() => {
    const getTokenAndTopics = async () => {
      const fetchToken = await AsyncStorage.getItem("token");

      if(fetchToken){
        setToken(fetchToken!);
      }else{
        history.push("/tab4");
      }
      
    };

    // Fetch today's topics with token
    const fetchTodayTopics = async (token: string) => {
      try {
        const response = await todayTopics(token);
        console.log(response);
        if (response && response.status === true) {
          console.log(response);
          setTopic(response.data);
        } else {
          console.log('Failed to fetch topics:', response);
        }
      } catch (error) {
        console.log('Error fetching topics:', error);
      }
    };

    getTokenAndTopics(); 
    fetchTodayTopics(token);
  }, []);


    
  
     
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
