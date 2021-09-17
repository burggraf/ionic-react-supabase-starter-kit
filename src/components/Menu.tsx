import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from '@ionic/react';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, homeOutline, homeSharp, logIn, logInOutline, logInSharp, logOut, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

import './Menu.css';
import { SupabaseAuthService } from '../Login/supabase.auth.service';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
const supabaseAuthService = new SupabaseAuthService();

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Main Page',
    url: '/page',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  let _user: User | null = null;
  const [email, setEmail] = useState('');

  const signOut = async () => {
    const { error } = await supabaseAuthService.signOut();
    if (error) {
      console.error('Error signing out', error);
    }
  }
  
  useEffect(()=>{
    // Only run this one time!  No multiple subscriptions!
    supabaseAuthService.user.subscribe((user: User | null) => {
      _user = user;
      if (_user?.email) {
        setEmail(_user.email);
      } else {
        setEmail('');
      }
    });
  }, []) // <-- empty dependency array

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div className="ion-text-center"><h1><b>Main Menu</b></h1></div>
        <IonLabel><div className="ion-text-center"><b>{email}</b></div></IonLabel>
        <IonList id="page-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel><b>{appPage.title}</b></IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        { email && 
          <IonButton expand="block" 
          onClick={signOut}>
          <IonIcon icon={logOut} size="large" />&nbsp;&nbsp;
            <b>Logout</b>
          </IonButton>    
        }
        { !email &&
          <IonButton expand="block" 
          routerLink="/login">
          <IonIcon icon={logIn} size="large" />&nbsp;&nbsp;
            <b>Login</b>
          </IonButton>    
        } 



      </IonContent>
    </IonMenu>
  );
};

export default Menu;
