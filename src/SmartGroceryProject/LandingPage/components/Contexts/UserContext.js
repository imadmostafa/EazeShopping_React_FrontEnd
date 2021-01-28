import { createContext } from "react";
var temp = localStorage.getItem('isloggedin');
  const UserContext = createContext(null);
 //export UserContext;
 export { UserContext};