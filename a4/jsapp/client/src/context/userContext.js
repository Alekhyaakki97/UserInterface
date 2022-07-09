import { createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  let userData =  JSON.parse(sessionStorage.getItem('currentuser'));
  const [user, setUser] = useState({
    username: userData && userData.username
  });
  const updateUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };
