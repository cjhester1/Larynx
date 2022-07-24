import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const saveFavorite = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {
      // Error saving data
      console.log("error storing", e);
    }
  };

  const loadFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem("@favorites");
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
    loadFavorite(); //anytime useeffect changes we save new favorites
  }, []);
  useEffect(() => {
    saveFavorite(favorites); //anytime useeffect changes we save new favorites
  }, [favorites]);
  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites: add, removeFromFavorites: remove }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
