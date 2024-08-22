import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Access } from "../../components/login/access";
import { Register } from "../../components/register/register";
import logo from "/favicon.ico";

export default function Main() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

  return (
    <main className="bg-bgColor text-white overflow-hidden select-none p-6 md:p-0 gap-10 flex flex-col h-screen items-center">
      <div className="flex flex-col justify-center mt-5 md:mt-40">
        <img
          src={logo}
          alt="imagem"
          loading="lazy"
          className="h-16 object-cover"
        />
      </div>
      <div className="flex flex-col items-center bg-zinc-800 w-full md:w-[28rem] py-2 rounded-lg justify-start gap-8">
        {isRegisterOpen && (
          <div className="flex w-full flex-col p-4 items-center justify-center">
            <Register />
            <Button
              onClick={() => {
                setIsAccessOpen(true);
                setIsRegisterOpen(false);
              }}
              className="bg-red-500 text-white w-full mt-4 hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
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
              className="bg-red-500 text-white w-full mt-4 hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
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
              className="bg-red-500 text-white w-full hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
            >
              Registrar-se agora
            </Button>
            <Button
              onClick={() => {
                setIsAccessOpen(true);
                setIsRegisterOpen(false);
              }}
              className="bg-red-500 text-white w-full hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
            >
              Já possuo conta
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
