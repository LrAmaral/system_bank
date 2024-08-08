import { useState } from "react";
import { getCPFUser, transferFunds } from "../api/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance?: number;
  userId?: string;
  onTransferSuccess: () => void;
}

interface UserInfo {
  username: string;
  accountNumber: string;
}

export default function TransferModal({
  isOpen,
  onClose,
  balance,
  userId,
  onTransferSuccess,
}: TransferModalProps) {
  const [recipientCPF, setRecipientCPF] = useState<string>("");
  const [recipientInfo, setRecipientInfo] = useState<UserInfo | null>(null);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleCPFChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cpf = event.target.value;
    setRecipientCPF(cpf);

    if (cpf.trim() !== "") {
      try {
        const user: UserInfo = await getCPFUser(cpf);
        if (user) {
          setRecipientInfo(user);
          setError("");
        } else {
          setRecipientInfo(null);
          setError("Usuário não encontrado.");
        }
      } catch {
        setError("Erro ao buscar o CPF.");
      }
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferAmount(Number(event.target.value));
  };

  const handleTransfer = async () => {
    if (transferAmount <= 0) {
      setError("O valor da transferência deve ser maior que zero.");
      return;
    }

    if (transferAmount > balance!) {
      setError(
        "O valor da transferência não pode ser maior que o saldo disponível."
      );
      return;
    }

    try {
      await transferFunds({
        senderId: userId,
        recipientCpf: recipientCPF,
        amount: transferAmount,
      });
      setError("");
      onTransferSuccess();
      onClose();
    } catch (error) {
      setError("Erro ao realizar transferência.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-xl mx-auto bg-zinc-900 text-white border-none"
        aria-describedby="dialog-description"
      >
        <DialogDescription>Realize uma transferência</DialogDescription>
        <DialogHeader>
          <DialogTitle>Transferir</DialogTitle>
        </DialogHeader>
        <div id="dialog-description">
          <div className="mb-4">
            <label htmlFor="recipient-cpf" className="text-lg font-semibold">
              CPF do Destinatário
            </label>
            <input
              type="text"
              id="recipient-cpf"
              value={recipientCPF}
              onChange={handleCPFChange}
              className="w-full mt-2 p-2 border-none rounded bg-zinc-800"
            />
          </div>
          {recipientInfo && (
            <div className="mb-4">
              <p>Nome: {recipientInfo.username}</p>
              <p>Conta: {recipientInfo.accountNumber}</p>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="transfer-amount" className="text-lg font-semibold">
              Valor da Transferência
            </label>
            <input
              type="number"
              id="transfer-amount"
              value={transferAmount}
              onChange={handleAmountChange}
              className="w-full mt-2 p-2 border-none rounded bg-zinc-800"
            />
          </div>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleTransfer}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
            disabled={transferAmount <= 0 || transferAmount > balance!}
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
