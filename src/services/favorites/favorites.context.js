import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favorites, setFavorites] = useState([]);

  const saveFavorite = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favorites-${uid}`, jsonValue);
    } catch (e) {
      // Error saving data
      console.log("error storing", e);
    }
  };

  const loadFavorite = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favorites-${uid}`);
      if (value !== null) {
        //value previously stored
        setFavorites(JSON.parse(value));
      }
    } catch (e) {
      // Error reading value
      console.log("error loading", e);
    }
  };

  const add = (restaurant) => {
    setFavorites([...favorites, restaurant]);
  };

  const remove = (restaurant) => {
    const newFavorites = favorites.filter(
      (x) => x.placeId !== restaurant.placeId
    );

    setFavorites(newFavorites);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadFavorite(user.uid); //anytime useeffect changes we save new favorites
    }
  }, [user]);
  useEffect(() => {
    if (user && user.uid && favorites.length) {
      saveFavorite(favorites, user.uid); //anytime useeffect changes we save new favorites
    }
  }, [favorites, user]);
  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
