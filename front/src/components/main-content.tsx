import { useState } from "react";
import { Button } from "../components/ui/button";
import { Access } from "../components/access";
import { Register } from "../components/register";
import logo from "/favicon.ico";

export default function Main() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

  return (
    <main className="bg-bgColor text-white overflow-hidden select-none p-8 md:p-0 gap-10 md:gap-0 flex md:flex-row justify-around flex-col h-screen items-center">
      <div className="flex flex-col justify-center h-0 md:h-[28rem] items-start gap-4 md:gap-8">
        <img src={logo} alt="imagem" loading="lazy" className="h-16" />
        <p className="font-semibold text-2xl">
          Comece sua jornada financeira agora
          <span className="text-red-500">!</span>
        </p>
      </div>
      <div className="flex flex-col items-center bg-zinc-800 w-full md:w-[28rem] h-fit py-2 rounded-lg justify-start gap-8">
        {isRegisterOpen && (
          <div className="flex w-full flex-col p-4 items-center justify-center">
            <Register />
            <Button
              onClick={() => {
                setIsAccessOpen(true);
                setIsRegisterOpen(false);
              }}
              className="bg-red-500 text-white mt-4 w-full hover:bg-black font-medium hover:text-white"
            >
              Já possuo conta
            </Button>
          </div>
        )}
        {isAccessOpen && (
          <div className="flex w-full flex-col p-4 items-center justify-center">
            <Access />
            <Button
              onClick={() => {
                setIsRegisterOpen(true);
                setIsAccessOpen(false);
              }}
              className="bg-red-500 text-white mt-4 w-full hover:bg-black font-medium hover:text-white"
            >
              Não possuo conta
            </Button>
          </div>
        )}
        {!isAccessOpen && !isRegisterOpen && (
          <div className="flex flex-col gap-4 px-4 py-6 w-full items-start justify-center">
            <Button
              onClick={() => {
                setIsRegisterOpen(true);
                setIsAccessOpen(false);
              }}
              className="bg-white w-full hover:bg-black text-black hover:text-white"
            >
              Registrar-se agora
            </Button>
            <Button
              onClick={() => {
                setIsAccessOpen(true);
                setIsRegisterOpen(false);
              }}
              className="bg-white w-full hover:bg-black text-black hover:text-white"
            >
              Já possuo conta
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
