import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import * as firebase from "firebase";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1XtULcayFbQoeZnGeHXLj35cPa5KG05o",
  authDomain: "larynx-34970.firebaseapp.com",
  projectId: "larynx-34970",
  storageBucket: "larynx-34970.appspot.com",
  messagingSenderId: "79764449959",
  appId: "1:79764449959:web:45d4f44d760fc49daf0982",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          {/* <FavoritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider> 
              Favorites are being loaded at app level at this point this is why favorites
              arent being changed with different levels, favorites need to be loaded at app navigator level
              */}
          <Navigation />
          {/* </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavoritesContextProvider> */}
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
