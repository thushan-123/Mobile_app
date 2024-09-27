import React from "react";
import WelcomeImg from '../../images/data_16275725.gif';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/react';


const ServerImg: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle className='title'>connection in Progress</IonCardTitle>
                <IonCardSubtitle>Server Connection</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonImg src={WelcomeImg} alt='' className='load-img' />
                Please wait connecting to server
            </IonCardContent>
        </IonCard>
    
    )
}

export default ServerImg