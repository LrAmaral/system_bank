import { useState } from "react";
import { Router } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Register() {
  const [isEmailValid, setIsEmailValid] = useState(true);

  const { router } = Router();

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const regex = /[^a-zA-Z0-9]/g;
    let value = input.value.replace(regex, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    input.value = value;
  };

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const re = /\S+@\S+\.\S+/;
    setIsEmailValid(re.test(input.value));
  };

  const accessRoute = () => router.push("/initial");

  return (
    <form className="w-full space-y-8 flex flex-col items-center justify-center">
      <div className="space-y-2 w-full">
        <h2 className="font-bold text-start w-full text-xl">Registre-se</h2>
        <div className="space-y-2 w-full">
          <Label htmlFor="nome" className="font-semibold">
            Nome
          </Label>
          <Input
            id="nome"
            className="text-black"
            placeholder="Digite seu nome"
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="email" className="font-semibold">
            Email
          </Label>
          <Input
            id="email"
            className="text-black"
            placeholder="Digite seu email"
            onSubmit={validateEmail}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="cpf" className="font-semibold">
            CPF
          </Label>
          <Input
            id="cpf"
            type="text"
            className="text-black"
            placeholder="Digite seu CPF"
            onChange={handleCPFChange}
          />
        </div>
      </div>
      <Button
        className="bg-red-500 text-white w-full hover:bg-black font-medium hover:text-white"
        type="submit"
        onClick={accessRoute}
      >
        Criar Conta
      </Button>
    </form>
  );
}
