import { useState } from "react";
import { Button } from "./components/ui/button";
import { Access } from "./components/access";
import { Register } from "./components/register";

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

  return (
    <main className="bg-bgColor text-white select-none flex md:flex-row justify-around flex-col h-screen items-center">
      <div className="flex flex-col justify-center items-start gap-4 md:gap-8">
        <h1 className="font-bold text-5xl">CashEase</h1>
        <p className="w-full md:w-[32rem]">
          Embarque em uma nova era de praticidade e segurança financeira, onde
          cada conta é uma porta de entrada para possibilidades ilimitadas. Sua
          jornada para um futuro financeiro mais brilhante começa agora!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        {isRegisterOpen && (
          <div className="flex flex-col items-center justify-center">
            <Register />
            <Button
              onClick={() => {
                setIsAccessOpen(!isAccessOpen);
                setIsRegisterOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white mt-4"
            >
              Já possuo conta
            </Button>
          </div>
        )}
        {isAccessOpen && (
          <div className="flex flex-col items-center justify-center">
            <Access />
            <Button
              onClick={() => {
                setIsRegisterOpen(!isRegisterOpen);
                setIsAccessOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white mt-4"
            >
              Não possuo conta
            </Button>
          </div>
        )}
        {!isAccessOpen && !isRegisterOpen && (
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsRegisterOpen(true);
                setIsAccessOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white"
            >
              Registrar-se agora
            </Button>
            <Button
              onClick={() => {
                setIsAccessOpen(true);
                setIsRegisterOpen(false);
              }}
              className="bg-white hover:bg-black text-black hover:text-white"
            >
              Já possuo conta
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
