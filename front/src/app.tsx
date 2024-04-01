import { useState } from "react";
import auth from "./assets/auth.svg";
import { Button } from "./components/ui/button";
import { Access } from "./components/access";
import { Register } from "./components/register";

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAcessOpen, setIsAccesOpen] = useState(false);

  return (
    <main className="bg-bgColor text-white select-none flex md:flex-row flex-col h-screen justify-evenly items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-5xl">CashEase</h1>
        <p className="font-semibold text-xl">O seu banco!</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        {isRegisterOpen && (
          <div className="h-64 border-2 flex flex-col items-center justify-center">
            <Register />
            <Button
              onClick={() => {
                setIsAccesOpen(!isAcessOpen), setIsRegisterOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white"
            >
              Já possuo conta
            </Button>
          </div>
        )}
        {isAcessOpen || isRegisterOpen || (
          <img
            src={auth}
            width={300}
            alt="authentication"
            className="pointer-events-none"
          />
        )}
        {isAcessOpen && (
          <div className="h-64 border-2 flex flex-col items-center justify-center">
            <Access />
            <Button
              onClick={() => {
                setIsRegisterOpen(!isRegisterOpen), setIsAccesOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white"
            >
              Não possuo conta
            </Button>
          </div>
        )}
        {isAcessOpen || isRegisterOpen || (
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsRegisterOpen(!isRegisterOpen), setIsAccesOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white"
            >
              Registrar-se agora
            </Button>
            <Button
              onClick={() => {
                setIsAccesOpen(!isAcessOpen), setIsRegisterOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white"
            >
              Já tenho conta
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
