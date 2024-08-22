import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (
    notes: { [denomination: string]: number },
    currency: string
  ) => void;
  currency: string;
}

export default function DepositModal({
  isOpen,
  onClose,
  onDeposit,
  currency,
}: DepositModalProps) {
  const [notes, setNotes] = useState<{ [denomination: string]: number }>({
    "2": 0,
    "5": 0,
    "10": 0,
    "20": 0,
    "50": 0,
    "100": 0,
    "200": 0,
  });
  const [currencyNow, setCurrencyNow] = useState(currency);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrencyNow(e.target.value);
  };

  const handleDeposit = () => {
    if (Object.values(notes).some((amount) => amount < 0)) {
      alert("Por favor, insira valores válidos para todas as notas.");
      return;
    }

    onDeposit(notes, currencyNow);
    onClose();
  };

  const handleNoteChange = (denomination: string, value: number) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [denomination]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby="Depósito"
        className="bg-zinc-900 text-white border-none"
      >
        <DialogHeader>
          <DialogTitle>Depositar Notas</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label className="block">
            Escolha a moeda:
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full p-2 mt-2 rounded bg-zinc-800"
            >
              <option value="BRL">Real (BRL)</option>
              <option value="USD">Dólar (USD)</option>
            </select>
          </label>
          {Object.keys(notes).map((denomination) => (
            <label key={denomination} className="block">
              Nota de {denomination}:
              <input
                type="number"
                value={notes[denomination]}
                onChange={(e) =>
                  handleNoteChange(denomination, parseInt(e.target.value, 10))
                }
                className="w-full p-2 mt-2 rounded bg-zinc-800"
              />
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleDeposit}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300"
          >
            Confirmar Depósito
          </button>
          <button
            onClick={onClose}
            className="bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-800 transition ease-in-out duration-300"
          >
            Cancelar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
