import { createContext, useState, useEffect } from 'react';

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {props.children}
    </UserContext.Provider>
  );
}
