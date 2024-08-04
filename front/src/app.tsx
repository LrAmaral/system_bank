import { useEffect } from "react";
import Main from "./components/main-content";
import { Toaster } from "./components/ui/toaster";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      navigate("/initial");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Toaster />
      <Main />
    </>
  );
}
 
export default App;
