import { useState } from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface TypeAccountProps {
  onSelect: (accountType: string, accountStatus: string) => void;
}

type AccountType = "Corrente" | "Poupança";
type AccountStatus = "Bronze" | "Prata" | "Ouro";

export default function TypeAccount({ onSelect }: TypeAccountProps) {
  const [accountType, setAccountType] = useState<AccountType | "">("");
  const [accountStatus, setAccountStatus] = useState<AccountStatus | "">("");

  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type);
  };

  const handleAccountStatusSelect = (status: AccountStatus) => {
    setAccountStatus(status);
  };

  const handleSubmit = () => {
    if (accountType && accountStatus) {
      onSelect(accountType, accountStatus);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-white">
          Selecionar o tipo de conta
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-sm text-zinc-200">
        Escolha o tipo de conta que deseja abrir.
      </DialogDescription>
      <div className="flex space-x-4">
        <button
          type="button"
          className={`p-2 w-full rounded font-semibold ${
            accountType === "Corrente"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleAccountTypeSelect("Corrente")}
        >
          Conta Corrente
        </button>
        <button
          type="button"
          className={`p-2 w-full rounded  font-semibold ${
            accountType === "Poupança"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleAccountTypeSelect("Poupança")}
        >
          Conta Poupança
        </button>
      </div>
      <DialogDescription className="text-sm text-zinc-200">
        Escolha o status da conta.
      </DialogDescription>
      <div className="flex space-x-4">
        <button
          type="button"
          className={`p-2 w-full rounded font-semibold ${
            accountStatus === "Bronze"
              ? "bg-yellow-700 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleAccountStatusSelect("Bronze")}
        >
          Bronze
        </button>
        <button
          type="button"
          className={`p-2 w-full rounded font-semibold ${
            accountStatus === "Prata"
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleAccountStatusSelect("Prata")}
        >
          Prata
        </button>
        <button
          type="button"
          className={`p-2 w-full rounded  font-semibold ${
            accountStatus === "Ouro"
              ? " bg-yellow-500 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleAccountStatusSelect("Ouro")}
        >
          Ouro
        </button>
      </div>
      <button
        type="button"
        className="mt-4 p-2 w-full bg-green-500 rounded text-white font-semibold hover:bg-green-700"
        onClick={handleSubmit}
      >
        Confirmar
      </button>
    </div>
  );
}
