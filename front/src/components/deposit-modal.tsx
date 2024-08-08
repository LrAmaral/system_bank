import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (notes: { [denomination: string]: number }) => void;
}

export default function DepositModal({
  isOpen,
  onClose,
  onDeposit,
}: DepositModalProps) {
  const [notes, setNotes] = useState<{ [denomination: string]: number }>({
    "2": 0,
    "5": 0,
    "10": 0,
    "20": 0,
    "50": 0,
    "100": 0,
  });

  const handleDeposit = () => {
    if (Object.values(notes).some((amount) => amount < 0)) {
      alert("Por favor, insira valores válidos para todas as notas.");
      return;
    }

    onDeposit(notes);
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
        className=" bg-zinc-900 text-white border-none"
      >
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>Depositar Notas</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {Object.keys(notes).map((denomination) => (
            <div key={denomination} className="flex items-center gap-2">
              <label className="flex-1">
                R${denomination}
                <input
                  type="number"
                  value={notes[denomination]}
                  onChange={(e) =>
                    handleNoteChange(denomination, parseFloat(e.target.value))
                  }
                  placeholder={`Quantidade de R$${denomination}`}
                  className="w-full p-2 border-none rounded bg-zinc-800"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDeposit}
            className="bg-green-500 text-white p-2 rounded hover:cursor-pointer hover:bg-green-700"
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
