import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Password() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSwitchingPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="relative w-full space-y-2">
      <Label htmlFor="senha" className="font-semibold">
        Senha
      </Label>
      <Input
        type={isPasswordVisible ? "text" : "password"}
        className="text-black w-full pr-10"
        placeholder="Digite sua senha"
      />
      {isPasswordVisible ? (
        <Eye
          onClick={handleSwitchingPassword}
          className="absolute top-8 right-3 text-black cursor-pointer"
        />
      ) : (
        <EyeOff
          onClick={handleSwitchingPassword}
          className="absolute top-8 right-3 text-black cursor-pointer"
        />
      )}
    </div>
  );
}
