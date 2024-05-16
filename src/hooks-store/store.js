// Custom Store Management System kinda like Redux Store!
// Because Context API is only good for low frequency state updates and is not
// optimized.
import { useState, useEffect } from 'react';

// Manage state globally with JS and React
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    // inform all listeners about that state update
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((listnr) => listnr !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, initialState };
  }

  actions = { ...actions, ...userActions };
};
