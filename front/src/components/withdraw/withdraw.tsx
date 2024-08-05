import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (selectedNotes: { [denomination: number]: number }) => void;
  availableSlots: Array<{ denomination: number; quantity: number }>;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  onWithdraw,
  availableSlots,
}: WithdrawModalProps) {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [selectedNotes, setSelectedNotes] = useState<{
    [denomination: number]: number;
  }>({});
  const [error, setError] = useState<string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(Number(event.target.value));
  };

  const calculateNotes = () => {
    let amount = withdrawAmount;
    const notes: { [denomination: number]: number } = {};

    const sortedSlots = [...availableSlots].sort(
      (a, b) => b.denomination - a.denomination
    );

    for (const slot of sortedSlots) {
      if (amount <= 0) break;
      const { denomination, quantity } = slot;
      const count = Math.min(Math.floor(amount / denomination), quantity);
      if (count > 0) {
        notes[denomination] = count;
        amount -= count * denomination;
      }
    }

    if (amount > 0) {
      setError(
        "Não é possível sacar o valor solicitado com as notas disponíveis."
      );
      setSelectedNotes({});
    } else {
      setError("");
      setSelectedNotes(notes);
    }
  };

  const handleWithdraw = () => {
    onWithdraw(selectedNotes);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-xl mx-auto bg-zinc-900 text-white border-none"
        aria-describedby="dialog-description"
      >
        <DialogDescription>Realize o seu saque</DialogDescription>
        <DialogHeader>
          <DialogTitle>Sacar</DialogTitle>
        </DialogHeader>
        <div id="dialog-description">
          <div className="mb-4">
            <label htmlFor="withdraw-amount" className="text-lg font-semibold">
              Valor do Saque
            </label>
            <input
              type="number"
              id="withdraw-amount"
              value={withdrawAmount}
              onChange={handleAmountChange}
              className="w-full mt-2 p-2 border-none rounded bg-zinc-800"
            />
          </div>
          <button
            onClick={calculateNotes}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
          >
            Calcular Notas
          </button>
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <div>
            {Object.entries(selectedNotes).map(([denomination, count]) => (
              <div key={denomination} className="mb-4">
                <p className="text-lg font-semibold">
                  {count} nota de R$ {denomination}:
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleWithdraw}
            className="bg-green-500 text-white p-2 rounded hover:cursor-pointer hover:bg-green-700"
            disabled={Object.keys(selectedNotes).length === 0}
          >
            Confirmar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded hover:cursor-pointer hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
