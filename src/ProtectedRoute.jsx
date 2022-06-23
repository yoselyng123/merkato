import { Navigate } from "react-router-dom";


function App({ 
  isAllowed, 
  redirectPath="/", 
  children
}) {
  if (!isAllowed) {
    return <Navigate replace to={redirectPath}/>
  }
  return children;
}

export default App;