import { useEffect, useState } from "react";
import { fetchTransactions } from "../../api/api";
import TransactionHistoryModal from "./transaction-history-modal";

interface UserProps {
  userId: number;
}

interface Transaction {
  id: number;
  amount: number;
  type: "Depósito" | "Saque" | "Transferência";
  date: string;
}

export const TransactionHistory = ({ userId }: UserProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTransactions = await fetchTransactions(userId);
        setTransactions(fetchedTransactions);
      } catch (error) {
        setError("Erro ao buscar transações.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleShowMore = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-96 h-60 space-y-6 flex flex-col justify-between rounded-lg p-6 bg-zinc-800">
      <div className="space-y-2">
        <p className="text-2xl font-semibold">Extrato</p>
        <div className="space-x-4 font-semibold">
          {transactions.length > 0 ? (
            <div className="space-y-2 p-2 bg-zinc-900 rounded-lg">
              {transactions.slice(0, visibleCount).map((transaction) => (
                <div key={transaction.id} className="space-x-2 flex">
                  <span
                    className={`border-r-2 ${
                      transaction.type === "Depósito"
                        ? "border-green-500"
                        : transaction.type === "Saque"
                        ? "border-red-500"
                        : "border-blue-500"
                    }`}
                  />
                  <div className="text-sm text-zinc-400">
                    {transaction.type === "Depósito"
                      ? "+"
                      : transaction.type === "Saque"
                      ? "-"
                      : "~"}{" "}
                    R$
                    {transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-red-500">
              Ainda não há transações para esta conta.
            </p>
          )}
        </div>
      </div>
      {visibleCount < transactions.length && (
        <button
          onClick={handleShowMore}
          className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
        >
          Ver mais
        </button>
      )}
      <TransactionHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transactions={transactions}
      />
    </div>
  );
};
