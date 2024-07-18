import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Register() {
  const [isEmailValid, setIsEmailValid] = useState(true);

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

  return (
    <form className="w-full space-y-6 flex flex-col items-center justify-center">
      <h2 className="font-bold text-start w-full">Registre-se</h2>
      <div>
        <Label htmlFor="nome" className="font-semibold">
          Nome
        </Label>
        <Input
          id="nome"
          className="text-black w-96"
          placeholder="Digite seu nome"
        />
      </div>
      <div>
        <Label htmlFor="email" className="font-semibold">
          Email
        </Label>
        <Input
          id="email"
          className="text-black w-96"
          placeholder="Digite seu email"
          onSubmit={validateEmail}
        />
        {/* {!isEmailValid && (
          <p className="text-red-500 text-sm mt-1">Email inválido</p>
        )} */}
      </div>
      <div>
        <Label htmlFor="cpf" className="font-semibold">
          CPF
        </Label>
        <Input
          id="cpf"
          type="text"
          className="text-black w-96"
          placeholder="Digite seu CPF"
          onChange={handleCPFChange}
        />
      </div>
      <Button
        className="bg-white hover:bg-black text-black hover:text-white"
        type="submit"
      >
        Criar Conta
      </Button>
    </form>
  );
}
