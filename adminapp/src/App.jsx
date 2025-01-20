import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Events from "./pages/Events"; // Import the Events component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <div>{isLoggedIn ? <Events /> : <Login onLogin={handleLogin} />}</div>
    </>
  );
}

export default App;
