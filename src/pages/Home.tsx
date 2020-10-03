import { IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonToast } from '@ionic/react'
import { logoWhatsapp, moonSharp, sunnyOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import './Home.css'

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem('theme') === 'dark')
  const [phone, setPhone] = useState<string>()
  const [error, setError] = useState<string>()

  const changeTheme = (checked: boolean) => {
    setIsDarkMode(checked)
    checked ? localStorage.setItem('theme', 'dark') : localStorage.removeItem('theme')
    checked ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }

  const go = (e?: any) => {
    if (e) e.preventDefault()

    const number = phone?.replace(/[^0-9]/gi, '').replace(/^08/gi, '628')
    if (!number) {
      return setError('Please use a valid phone number')
    }
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
              <form onSubmit={e => go(e)}>
                <IonItem>
                  <IonLabel position="floating">Phone Number</IonLabel>
                  <IonInput type="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} onSubmit={go} />
                </IonItem>
                <IonButton type="submit" expand="block" disabled={!phone?.replace(/[^0-9]/gi, '')}>Start!</IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      <IonToast position="bottom" color="danger" isOpen={!!error} message={error} duration={3000} onDidDismiss={() => setError('')} />
    </IonPage>
  )
}

export default Home
