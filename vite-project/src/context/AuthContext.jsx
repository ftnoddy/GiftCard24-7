import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types"; 

export const AuthContext = createContext({user: null })


export const AuthContextProvider = ({children}) => {

  const userInfo = localStorage.getItem('userInfo') || null
  const userInfoJson = JSON.parse(userInfo)

  const [user, setUser] = useState(userInfoJson)

  return (
    <AuthContext.Provider value={{user, setUser}} >
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node 
};

