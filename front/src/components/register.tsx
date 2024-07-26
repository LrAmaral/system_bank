import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { registerUser } from "../services/api";

interface FormData {
  username: string;
  password: string;
  email: string;
  cpf: string;
  createdAt?: string;
}

export function Register() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    cpf: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /[^a-zA-Z0-9]/g;
    let value = e.target.value.replace(regex, "");

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    setFormData({
      ...formData,
      cpf: value,
    });
  };

  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /\S+@\S+\.\S+/;
    setIsEmailValid(re.test(e.target.value));
  };

  const accessRoute = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isEmailValid &&
      formData.username &&
      formData.password &&
      formData.email &&
      formData.cpf
    ) {
      try {
        const response = await registerUser({
          ...formData,
          createdAt: new Date().toISOString().split("T")[0],
        });
        console.log(response);
        navigate("/initial");
      } catch (error) {
        alert("Erro ao registrar usuário. Tente novamente.");
        console.error("There was an error!", error);
      }
    } else {
      setIsFormValid(false);
      alert("Por favor, preencha todos os campos corretamente.");
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
          <Label htmlFor="username" className="font-semibold">
            Nome
          </Label>
          <Input
            id="username"
            className={`text-black ${
              !isFormValid && !formData.username ? colorScheme.error : ""
            }`}
            placeholder="Digite seu nome"
            value={formData.username}
            onChange={handleInputChange}
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
            value={formData.email}
            onChange={handleInputChange}
            onBlur={validateEmail}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="password" className="font-semibold">
            Senha
          </Label>
          <Input
            id="password"
            type="password"
            className={`text-black ${
              !isFormValid && !formData.password ? colorScheme.error : ""
            }`}
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="cpf" className="font-semibold">
            CPF
          </Label>
          <Input
            id="cpf"
            type="text"
            className={`text-black ${
              !isFormValid && !formData.cpf ? colorScheme.error : ""
            }`}
            placeholder="Digite seu CPF"
            value={formData.cpf}
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
