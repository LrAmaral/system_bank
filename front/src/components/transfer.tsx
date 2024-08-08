import { useState } from "react";
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
  onTransfer: (recipientAccount: string, amount: number) => void;
  balance?: number;
}

export default function TransferModal({
  isOpen,
  onClose,
  onTransfer,
  balance,
}: TransferModalProps) {
  const [recipientAccount, setRecipientAccount] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleRecipientChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientAccount(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransferAmount(Number(event.target.value));
  };

  const handleTransfer = () => {
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

    if (recipientAccount.trim() === "") {
      setError("O destinatário da transferência deve ser informado.");
      return;
    }

    setError("");
    onTransfer(recipientAccount, transferAmount);
    onClose();
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
            <label
              htmlFor="recipient-account"
              className="text-lg font-semibold"
            >
              Conta Destinatária
            </label>
            <input
              type="text"
              id="recipient-account"
              value={recipientAccount}
              onChange={handleRecipientChange}
              className="w-full mt-2 p-2 border-none rounded bg-zinc-800"
            />
          </div>
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
            disabled={
              transferAmount <= 0 ||
              transferAmount > balance! ||
              recipientAccount.trim() === ""
            }
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
