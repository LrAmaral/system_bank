import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"; // Ajuste o caminho conforme necessário

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

export default function DepositModal({
  isOpen,
  onClose,
  onDeposit,
}: DepositModalProps) {
  const [amount, setAmount] = useState<string>("");

  const handleDeposit = () => {
    const numericAmount = parseFloat(amount);
    if (amount && !isNaN(numericAmount) && numericAmount > 0) {
      onDeposit(numericAmount);
      onClose();
    } else {
      alert("Por favor, insira um valor válido.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Depositar</DialogTitle>
        </DialogHeader>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Valor a depositar"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDeposit}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
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
