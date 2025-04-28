import {
  IonSpinner,
  IonCard,
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

interface StopwatchLoaderState {
  isRunning: boolean;
  seconds: number;
  intervalId: NodeJS.Timeout | null;
}

interface StopwatchHaulerState {
  isRunning: boolean;
  seconds: number;
  intervalId: NodeJS.Timeout | null;
}

const Tab1: React.FC = () => {
  const initialStopwatchLoaderStates: { [key: string]: StopwatchLoaderState } =
    {
      "Digging Time": { isRunning: false, seconds: 0, intervalId: null },
      "Swing Load Time": { isRunning: false, seconds: 0, intervalId: null },
      "Dumping Time": { isRunning: false, seconds: 0, intervalId: null },
      "Swing Unloaded Time": { isRunning: false, seconds: 0, intervalId: null },
    };

  const initialStopwatchHaulerStates: { [key: string]: StopwatchHaulerState } =
    {
      "Primary Time": { isRunning: false, seconds: 0, intervalId: null },
      "Spotting Time": { isRunning: false, seconds: 0, intervalId: null },
    };

  const [stopwatchLoaderStates, setStopwatchLoaderStates] = useState(
    initialStopwatchLoaderStates
  );
  const [stopwatchHaulerStates, setStopwatchHaulerStates] = useState(
    initialStopwatchHaulerStates
  );

  const toggleStopwatchLoader = (label: string) => {
    // Hentikan semua interval yang aktif
    Object.keys(stopwatchLoaderStates).forEach((key) => {
      const interval = stopwatchLoaderStates[key].intervalId;
      if (interval) {
        clearInterval(interval);
      }
    });

    const newInterval = setInterval(() => {
      setStopwatchLoaderStates((prev) => ({
        ...prev,
        [label]: {
          ...prev[label],
          seconds: prev[label].seconds + 1,
        },
      }));
    }, 1000);

    // Update semua stopwatch
    setStopwatchLoaderStates((prevState) => {
      const newState: typeof prevState = {};

      for (const key in prevState) {
        if (key === label) {
          newState[key] = {
            isRunning: true,
            seconds: 0,
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

    // Jika Digging Time ditekan, otomatis Primary Time ikut mulai
    if (label === "Digging Time") {
      toggleStopwatchHauler("Primary Time");
    }
  };

  const toggleStopwatchHauler = (label: string) => {
    // Hentikan semua interval yang aktif
    Object.keys(stopwatchHaulerStates).forEach((key) => {
      const interval = stopwatchHaulerStates[key].intervalId;
      if (interval) {
        clearInterval(interval);
      }
    });

    const newInterval = setInterval(() => {
      setStopwatchHaulerStates((prev) => ({
        ...prev,
        [label]: {
          ...prev[label],
          seconds: prev[label].seconds + 1,
        },
      }));
    }, 1000);

    // Update semua stopwatch
    setStopwatchHaulerStates((prevState) => {
      const newState: typeof prevState = {};

      for (const key in prevState) {
        if (key === label) {
          newState[key] = {
            isRunning: true,
            seconds: 0,
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

  const stopAllStopwatchesLoader = () => {
    Object.keys(stopwatchLoaderStates).forEach((key) => {
      const interval = stopwatchLoaderStates[key].intervalId;
      if (interval) {
        clearInterval(interval);
      }
    });

    setStopwatchLoaderStates((prevState) => {
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

  const stopAllStopwatchesHauler = () => {
    Object.keys(stopwatchHaulerStates).forEach((key) => {
      const interval = stopwatchHaulerStates[key].intervalId;
      if (interval) {
        clearInterval(interval);
      }
    });

    setStopwatchHaulerStates((prevState) => {
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

        <IonItem>
          <IonInput label="Loader"></IonInput>
          <IonInput label="Hauler"></IonInput>
        </IonItem>

        {Object.keys(stopwatchLoaderStates).map((label) => (
          <IonCard key={label}>
            <IonItem lines="none">
              <IonGrid>
                <IonRow style={{ alignItems: "center" }}>
                  <IonCol size="8">
                    <IonLabel style={{ fontSize: "16px" }} position="stacked">
                      {label}
                    </IonLabel>
                    <IonInput
                      style={{ fontWeight: "bold" }}
                      value={stopwatchLoaderStates[label].seconds}
                      readonly
                      placeholder="0"
                    ></IonInput>
                  </IonCol>
                  <IonCol size="2">
                    {stopwatchLoaderStates[label].isRunning && (
                      <IonSpinner
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        name="crescent"
                      ></IonSpinner>
                    )}
                  </IonCol>
                  <IonCol size="2" className="ion-text-end">
                    <IonButton
                      onClick={() => toggleStopwatchLoader(label)}
                      disabled={stopwatchLoaderStates[label].isRunning}
                    >
                      <IonIcon
                        slot="icon-only"
                        icon={
                          stopwatchLoaderStates[label].isRunning
                            ? undefined
                            : time
                        }
                      ></IonIcon>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        ))}

        <IonRow style={{ alignItems: "center" }}>
          <IonCol size="12">
            <IonButton
              expand="block"
              color="danger"
              onClick={stopAllStopwatchesLoader}
              disabled={
                !Object.values(stopwatchLoaderStates).some((s) => s.isRunning)
              }
            >
              <IonIcon slot="start" icon={stop}></IonIcon>
              Stop
            </IonButton>
          </IonCol>
        </IonRow>

        {Object.keys(stopwatchHaulerStates).map((label) => (
          <IonCard key={label}>
            <IonItem lines="none">
              <IonGrid>
                <IonRow style={{ alignItems: "center" }}>
                  <IonCol size="8">
                    <IonLabel style={{ fontSize: "16px" }} position="stacked">
                      {label}
                    </IonLabel>
                    <IonInput
                      style={{ fontWeight: "bold" }}
                      value={stopwatchHaulerStates[label].seconds}
                      readonly
                      placeholder="0"
                    ></IonInput>
                  </IonCol>
                  <IonCol size="2">
                    {stopwatchHaulerStates[label].isRunning && (
                      <IonSpinner
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                        name="crescent"
                      ></IonSpinner>
                    )}
                  </IonCol>
                  <IonCol size="2" className="ion-text-end">
                    <IonButton
                      onClick={() => toggleStopwatchHauler(label)}
                      disabled={stopwatchHaulerStates[label].isRunning}
                    >
                      <IonIcon
                        slot="icon-only"
                        icon={
                          stopwatchHaulerStates[label].isRunning
                            ? undefined
                            : time
                        }
                      ></IonIcon>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          </IonCard>
        ))}

        <IonRow style={{ alignItems: "center" }}>
          <IonCol size="12">
            <IonButton
              expand="block"
              color="danger"
              onClick={stopAllStopwatchesHauler}
              disabled={
                !Object.values(stopwatchHaulerStates).some((s) => s.isRunning)
              }
            >
              <IonIcon slot="start" icon={stop}></IonIcon>
              Stop
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
