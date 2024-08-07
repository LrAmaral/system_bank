import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { registerUser } from "../../api/api";
import { toast } from "../ui/use-toast";
import { RegisterUser } from "../../lib/register";
import TypeAccount from "../type-account";
import { Dialog, DialogContent } from "../ui/dialog";

export function Register() {
  const [formData, setFormData] = useState<RegisterUser>({
    id: "",
    username: "",
    password: "",
    email: "",
    cpf: "",
    balance: 0,
    accountType: "",
    accountStatus: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    if (cleanedValue.length === 6) {
      validatePassword(cleanedValue);
    } else {
      setIsPasswordValid(true);
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
      setIsDialogOpen(true);
    } else {
      setIsFormValid(false);
      toast({
        description: "Por favor, preencha todos os campos corretamente.",
      });
    }
  };

  const handleAccountSelection = async (
    accountType: string,
    accountStatus: string
  ) => {
    setFormData({
      ...formData,
      accountType,
      accountStatus,
    });
    setIsDialogOpen(false);

    try {
      const response = await registerUser({
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      });
      sessionStorage.setItem("user", JSON.stringify(response));

      navigate("/initial");
    } catch (error) {
      toast({ description: "Erro ao registrar usuário. Tente novamente." });
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
    <>
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
              className={`bg-zinc-800 text-white border-zinc-600 p-2  flex justify-between items-center  ${
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
              className={`bg-zinc-800 text-white border-zinc-600 p-2  flex justify-between items-center ${
                !isFormValid && !formData.username ? colorScheme.error : ""
              }`}
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
              className={`bg-zinc-800 text-white border-zinc-600 p-2  flex justify-between items-center  ${
                !isPasswordValid ? colorScheme.error : ""
              }`}
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={(e) => handlePassword(e.target.value)}
            />
            {!isPasswordValid && formData.password && (
              <p className={`${colorScheme.error} text-sm mt-1`}>
                A senha deve ter exatamente 6 dígitos e não pode conter
                sequências repetidas ou numéricas.
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
              className={`bg-zinc-800 text-white border-zinc-600 p-2  flex justify-between items-center  ${
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-800 border-none text-white">
          <TypeAccount onSelect={handleAccountSelection} />
        </DialogContent>
      </Dialog>
    </>
  );
}
