import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { registerUser } from "../services/api";
import { toast } from "./ui/use-toast";
import { RegisterUser } from "../types/user";

export function Register() {
  const [formData, setFormData] = useState<RegisterUser>({
    username: "",
    password: "",
    email: "",
    cpf: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === "email") {
      validateEmail(value);
    }
  };

  const handlePassword = (value: string) => {
    const regex = /[^0-9]/g;
    let cleanedValue = value.replace(regex, "");

    if (cleanedValue.length > 6) {
      cleanedValue = cleanedValue.slice(0, 6);
    }

    setFormData({
      ...formData,
      password: cleanedValue,
    });

    // Validate the password when it's completed (i.e., length is 6)
    if (cleanedValue.length === 6) {
      validatePassword(cleanedValue);
    } else {
      setIsPasswordValid(true); // While typing, we assume the password is valid
    }
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

  const validateEmail = (value: string) => {
    const re = /\S+@\S+\.\S+/;
    setIsEmailValid(re.test(value));
  };

  const isSequential = (password: string) => {
    for (let i = 0; i < password.length - 1; i++) {
      if (
        parseInt(password[i + 1]) === parseInt(password[i]) + 1 ||
        parseInt(password[i + 1]) === parseInt(password[i]) - 1
      ) {
        return true;
      }
    }
    return false;
  };

  const validatePassword = (password: string) => {
    const regex = /^\d{6}$/;
    const isValid =
      regex.test(password) &&
      !/(.)\1{2,}/.test(password) &&
      !isSequential(password);
    setIsPasswordValid(isValid);
    return isValid;
  };

  const accessRoute = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(formData.password);

    if (
      isEmailValid &&
      isPasswordValid &&
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
        toast({ description: "Erro ao registrar usuário. Tente novamente." });
      }
    } else {
      setIsFormValid(false);
      toast({
        description: "Por favor, preencha todos os campos corretamente.",
      });
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
      <div className="space-y-4 w-full">
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
            onBlur={(e) => validateEmail(e.target.value)}
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
              !isPasswordValid ? colorScheme.error : ""
            }`}
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={(e) => handlePassword(e.target.value)}
          />
          {!isPasswordValid && formData.password && (
            <p className={`${colorScheme.error} text-sm mt-1`}>
              A senha deve ter exatamente 6 dígitos e não pode conter sequências
              repetidas ou numéricas.
            </p>
          )}
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
