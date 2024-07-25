import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Register() {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

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

  const accessRoute = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid) {
      navigate("/initial");
    } else {
      alert("Por favor, insira um e-mail válido.");
    }
  };

  const colorScheme = {
    primary: "bg-red-500",
    hoverPrimary: "hover:bg-red-700",
    textPrimary: "text-white",
    error: "text-red-500",
    hoverError: "hover:text-red-700",
  };

  return (
    <form
      className="w-full space-y-8 flex flex-col items-center justify-center"
      onSubmit={accessRoute}
    >
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
            className={`text-black ${!isEmailValid ? colorScheme.error : ""}`}
            placeholder="Digite seu email"
            onBlur={validateEmail}
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
        className={`${colorScheme.primary} ${colorScheme.textPrimary} ${colorScheme.hoverPrimary} w-full font-medium`}
        type="submit"
      >
        Criar Conta
      </Button>
    </form>
  );
}
