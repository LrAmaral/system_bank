import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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
  const [selectedNotes, setSelectedNotes] = useState<{
    [denomination: number]: number;
  }>({});

  const handleNoteChange = (denomination: number, count: number) => {
    setSelectedNotes((prev) => ({
      ...prev,
      [denomination]: count,
    }));
  };

  const handleWithdraw = () => {
    onWithdraw(selectedNotes);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl mx-auto">
        <DialogHeader>
          <DialogTitle>Sacar</DialogTitle>
        </DialogHeader>
        <div>
          {availableSlots
            .filter((slot) => slot.quantity > 0)
            .map(({ denomination, quantity }) => (
              <div key={denomination} className="mb-4">
                <p className="text-lg font-semibold">
                  Nota de R$ {denomination}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from({ length: quantity }).map((_, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded border ${
                        (selectedNotes[denomination] || 0) > index
                          ? "bg-green-500 text-white border-green-700"
                          : "bg-gray-200 text-gray-700 border-gray-400"
                      } hover:bg-green-600 hover:text-white`}
                      onClick={() =>
                        handleNoteChange(
                          denomination,
                          selectedNotes[denomination] === index + 1
                            ? index
                            : index + 1
                        )
                      }
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Disponível: {quantity}
                </p>
              </div>
            ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleWithdraw}
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
