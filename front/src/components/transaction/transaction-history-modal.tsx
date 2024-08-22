import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { format } from "date-fns";
import { fetchTransactions } from "../../api/api";

interface Transaction {
  id: number;
  amount: number;
  type: "Depósito" | "Saque" | "Transferência";
  date: string;
}

interface TransactionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onUpdateTransactions: (transactions: Transaction[]) => void;
  userId: number;
}

const PAGE_SIZE = 10;

export default function TransactionHistoryModal({
  isOpen,
  onClose,
  transactions,
  onUpdateTransactions,
  userId,
}: TransactionHistoryModalProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const visibleTransactions = transactions.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTransactions = await fetchTransactions(userId);
        onUpdateTransactions(fetchedTransactions);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    if (isOpen && userId) {
      fetchData();
    }
  }, [isOpen, onUpdateTransactions, userId]);

  // Format the number to have two decimal places and thousand separators without currency symbol
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-xl mx-auto bg-zinc-900 text-white border-none"
        aria-describedby="dialog-description"
      >
        <DialogDescription>
          <p className="text-sm">
            Abaixo você encontra um resumo das últimas transações realizadas.
          </p>
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Histórico de Transações</DialogTitle>
        </DialogHeader>
        <div id="dialog-description">
          <div className="space-y-4">
            {visibleTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-2 bg-zinc-800 rounded-lg flex justify-between items-center"
              >
                <span
                  className={`font-semibold ${
                    transaction.type === "Depósito"
                      ? "text-green-500"
                      : transaction.type === "Saque"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {transaction.type === "Depósito"
                    ? "+"
                    : transaction.type === "Saque"
                    ? "-"
                    : "~"}{" "}
                  {formatAmount(transaction.amount)}
                </span>
                <span className="text-sm text-zinc-400">
                  {format(new Date(transaction.date), "dd/MM/yyyy HH:mm:ss")}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
            >
              Anterior
            </button>
            <span className="text-sm text-zinc-400">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
            >
              Próxima
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded hover:cursor-pointer hover:bg-gray-700"
          >
            Fechar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
