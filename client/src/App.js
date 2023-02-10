import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import {Loader} from './components/Loader'
import "./App.css";
import "materialize-css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const {token, login, logout, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>

    <Router>
      <div className="container">
        { isAuthenticated && <Navbar /> }
        {routes}
      </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
