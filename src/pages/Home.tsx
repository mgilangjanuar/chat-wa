import { IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react'
import { logoWhatsapp, moonSharp, sunnyOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import './Home.css'

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem('theme') === 'dark')
  const [phone, setPhone] = useState<string>()

  const changeTheme = (checked: boolean) => {
    setIsDarkMode(checked)
    checked ? localStorage.setItem('theme', 'dark') : localStorage.removeItem('theme')
    checked ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }

  const isDisable = () => !phone?.replace(/[^0-9]/gi, '')

  const go = () => {
    const number = phone?.replace(/[^0-9]/gi, '').replace(/^08/gi, '628')
    window.location.href = `https://wa.me/${number}`
  }

  return (
    <IonPage>
      <IonContent>
        <div style={{ position: 'absolute', right: '20px', top: '20px' }}>
          <IonButton fill="clear" onClick={() => changeTheme(!isDarkMode)}>
            <IonIcon slot="icon-only" icon={isDarkMode ? moonSharp : sunnyOutline} />
          </IonButton>
        </div>
        <div className="container">
          <h2>Chat to WhatsApp <IonIcon icon={logoWhatsapp} /></h2>
          <p>Tired of saving numbers before chatting?</p>
          <br />
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Phone Number</IonLabel>
                <IonInput value={phone} onIonChange={e => setPhone(e.detail.value!)} />
              </IonItem>
              <IonButton type="submit" expand="block" disabled={isDisable()} onClick={go}>Start!</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home
