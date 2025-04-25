import {
  IonContent,
  IonHeader,
  IonButton,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./Tab1.css";
import { time, stop } from "ionicons/icons";
import React, { useState } from "react";

interface StopwatchState {
  isRunning: boolean;
  seconds: number;
  intervalId: NodeJS.Timeout | null;
}

const Tab1: React.FC = () => {
  const initialStopwatchStates: { [key: string]: StopwatchState } = {
    "Digging Time": { isRunning: false, seconds: 0, intervalId: null },
    "Swing-Time Loaded": { isRunning: false, seconds: 0, intervalId: null },
    "Bucket-Dump Time": { isRunning: false, seconds: 0, intervalId: null },
    "Swing-Time Empty": { isRunning: false, seconds: 0, intervalId: null },
  };

  const [stopwatchStates, setStopwatchStates] = useState(
    initialStopwatchStates
  );

  const toggleStopwatch = (label: string) => {
    // Hentikan semua interval yang aktif
    Object.keys(stopwatchStates).forEach((key) => {
      const interval = stopwatchStates[key].intervalId;
      if (interval) {
        clearInterval(interval);
      }
    });

    // Buat interval baru hanya untuk stopwatch yang diklik
    const newInterval = setInterval(() => {
      setStopwatchStates((prev) => ({
        ...prev,
        [label]: {
          ...prev[label],
          seconds: prev[label].seconds + 1,
        },
      }));
    }, 1000);

    // Update semua stopwatch
    setStopwatchStates((prevState) => {
      const newState: typeof prevState = {};

      for (const key in prevState) {
        if (key === label) {
          newState[key] = {
            isRunning: true,
            seconds: 0, // Reset hanya stopwatch yang dipilih
            intervalId: newInterval,
          };
        } else {
          newState[key] = {
            ...prevState[key],
            isRunning: false,
            intervalId: null,
          };
        }
      }

      return newState;
    });
  };

  const stopAllStopwatches = () => {
    // Hentikan semua stopwatch
    Object.keys(stopwatchStates).forEach((key) => {
      const interval = stopwatchStates[key].intervalId;
      if (interval) {
        clearInterval(interval);
      }
    });

    setStopwatchStates((prevState) => {
      const newState: typeof prevState = {};
      for (const key in prevState) {
        newState[key] = {
          ...prevState[key],
          isRunning: false,
          intervalId: null,
        };
      }
      return newState;
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cycle Counter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cycle Counter</IonTitle>
          </IonToolbar>
        </IonHeader>

        {Object.keys(stopwatchStates).map((label) => (
          <IonItem key={label} lines="none">
            <IonGrid>
              <IonRow style={{ alignItems: "center" }}>
                <IonCol size="8">
                  <IonLabel position="stacked">{label}</IonLabel>
                  <IonInput
                    value={stopwatchStates[label].seconds}
                    readonly
                    placeholder="0"
                  ></IonInput>
                </IonCol>
                <IonCol size="4" className="ion-text-end">
                  <IonButton
                    shape="round"
                    onClick={() => toggleStopwatch(label)}
                  >
                    <IonIcon
                      slot="icon-only"
                      icon={stopwatchStates[label].isRunning ? undefined : time}
                    ></IonIcon>
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        ))}
        <IonItem lines="none">
          <IonGrid>
            <IonRow style={{ alignItems: "center" }}>
              <IonCol size="12">
                <IonButton
                  expand="block"
                  color="danger"
                  onClick={stopAllStopwatches}
                >
                  <IonIcon slot="start" icon={stop}></IonIcon>
                  Stop
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
