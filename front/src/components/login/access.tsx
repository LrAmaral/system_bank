import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Button } from "../../components/ui/button";
import { Input } from "../ui/input";
import { loginUser } from "../../api/api";
import { toast } from "../ui/use-toast";

export function Access() {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "conta") {
      setAccountNumber(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accountNumber || !password) {
      toast({
        description: "Por favor, preencha todos os campos corretamente.",
        status: "error",
      });
      return;
    }

    try {
      const response = await loginUser(accountNumber, password);

      if (response.status === 200 || response) {
        sessionStorage.setItem("user", JSON.stringify(response));

        navigate("/initial");
      } else {
        toast({
          description: "Número da conta ou senha incorretos.",
          status: "error",
        });
      }
    } catch (error) {
      console.error("Erro ao acessar a conta:", error);
      toast({
        description: "Erro ao acessar a conta. Tente novamente.",
        status: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 flex w-full flex-col items-center justify-center"
    >
      <h2 className="font-bold text-start w-full text-xl">Acessar</h2>
      <div className="space-y-4 w-full">
        <div className="space-y-2 w-full">
          <Label htmlFor="conta" className="font-semibold">
            Conta
          </Label>
          <Input
            id="conta"
            className="p-2 bg-zinc-800 text-white border-zinc-600 flex justify-between items-center"
            placeholder="Conta"
            value={accountNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="password" className="font-semibold">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            className="p-2 bg-zinc-800 text-white border-zinc-600 flex justify-between items-center"
            placeholder="Senha"
            value={password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button
        className="bg-red-500 text-white w-full hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
        type="submit"
      >
        Acessar Conta
      </Button>
    </form>
  );
}
