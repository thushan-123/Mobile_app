import { useState, useRef } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { barcodeOutline, ellipse, heart, listCircleOutline, listCircleSharp, peopleOutline, personOutline, settingsOutline, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import UpdateDetails from './pages/updateDetails/UpdateDetails';
import UpdatePWD from './pages/changePwd/ChangePwd';
import CreateAccount from './pages/creactAccount/CreactAccount';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';





/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
setupIonicReact();

const ProtectedRoute: React.FC<{ component: React.ComponentType }> = ({
  component: Component,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const isAuthenticated = !!AsyncStorage.getItem("token");
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);
  if (isAuthenticated === null) {
    return null; // or add a loading spinner here if needed
  }

  return isAuthenticated ? <Component /> : <Redirect to="/login" />;
};

const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    checkToken();
  }, []);

  useEffect(() => {
    // Force light mode by removing 'dark' class
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // If system dark mode is enabled, forcefully disable it
  if (prefersDark.matches) {
    document.body.classList.remove('dark');
  }
  }, []);
  if (isAuthenticated === null) {
    return null; // or show a loading spinner here
  }
  return(
    
      <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
            <Route
              exact
              path="/"
              // render={() =>
              //    AsyncStorage.getItem("token") ? (
              //     <Redirect to="/tab1" />
              //   ) : (
              //     <Tab4 />
              //   )
              // }
              render={() =>
                isAuthenticated ? <Redirect to="/tab1" /> : <Tab4 />
              }
            />
            {/* <Route exact path="/tab1">
            <Tab1 />
          </Route> */}
            <Route path="/tab1" render={() => <ProtectedRoute component={Tab1} />} />
            <Route path="/tab2" render={() => <ProtectedRoute component={Tab2} />} />
            <Route path="/tab3" render={() => <ProtectedRoute component={Tab3} />} />


            {/* <Route path="/tab3">
            <Tab3 />
          </Route> */}
            {/* <Route exact path="/">
            <Redirect to="/tab1" />
          </Route> */}
            {/* <Route path="/login">
            <Tab4 />
          </Route> */}
            <Route path="/login" component={Tab4} />
          <Route path='/updateDetails'>
            <UpdateDetails />
          </Route>
          <Route path='/updatePassword'>
            <UpdatePWD />
          </Route>
          <Route path='/createAccount'>
            <CreateAccount />
          </Route>
          <Route path='/forgotPassword'>
            <ForgetPassword />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={barcodeOutline} />
            <IonLabel>Conference</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={listCircleOutline} />
            <IonLabel>Topics</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>

    
    
  )
};
  


export default App;
