import { useState, useEffect } from 'react';

// Manage state globally with JS and React
let globalState = {};
let listeners = [];
let actions = {};

const useStore = () => {
  const setState = useState(globalState)[1];

  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.filter((listnr) => listnr !== setState);
    };
  }, [setState]);
};
