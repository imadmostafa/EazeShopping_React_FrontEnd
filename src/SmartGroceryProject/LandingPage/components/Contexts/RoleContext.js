import { createContext } from "react";
var temp = localStorage.getItem('role');
  const RoleContext = createContext(null);
 //export UserContext;
 export { RoleContext};