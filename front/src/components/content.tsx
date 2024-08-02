import { useState, useEffect } from "react";
import { deposit } from "../services/api";
import { RegisterUser } from "../types/user";
import DepositModal from "./deposit-modal";

function Content() {
  const [user, setUser] = useState<RegisterUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleDeposit = async (amount: number) => {
    try {
      if (user) {
        await deposit(parseInt(user.id, 10), amount);
        setUser({ ...user, balance: (user.balance || 0) + amount });
      }
    } catch (error) {
      console.error("Erro ao realizar depósito:", error);
    }
  };

  return (
    <div className="bg-bgColor w-full h-screen p-20 space-y-10">
      <div className="text-2xl font-bold flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-gray-800">Bom dia,</p>
          <span className="text-red-600 font-bold">
            {user ? user.username : "Carregando..."}
          </span>
        </div>
        <p className="text-base text-gray-700">
          {user ? (
            <span>
              Conta:{" "}
              <strong className="text-red-500">{user.accountNumber}</strong>
            </span>
          ) : (
            "Carregando..."
          )}
        </p>
      </div>
      <div className="flex gap-10">
        <div className="w-96 h-60 flex flex-col justify-between rounded-lg p-6 bg-zinc-800">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">Saldo disponível</p>
            <p className="text-2xl font-bold">
              {user
                ? `R$ ${user.balance === null ? "0.00" : user.balance}`
                : "Carregando..."}
            </p>
          </div>
          <div className="space-x-4 font-semibold">
            <button className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white">
              Sacar
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
            >
              Depositar
            </button>
          </div>
        </div>
        <div className="w-96 h-60 space-y-6 flex flex-col justify-between rounded-lg p-6 bg-zinc-800">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">Extrato</p>
            <div className="space-x-4 font-semibold">
              <div className="space-y-2 p-2 bg-zinc-900 rounded-lg">
                <div className="space-x-2 flex">
                  <span className="border-r-2 border-red-500" />
                  <p className="text-sm text-zinc-400">-R$100,00</p>
                </div>
                <div className="space-x-2 flex">
                  <span className="border-r-2 border-green-500" />
                  <p className="text-sm text-zinc-400">+R$125,45</p>
                </div>
                <div className="space-x-2 flex">
                  <span className="border-r-2 border-red-500" />
                  <p className="text-sm text-zinc-400">-R$150,00</p>
                </div>
              </div>
            </div>
          </div>
          <button className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white">
            Ver mais
          </button>
        </div>
      </div>
      <DepositModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeposit={handleDeposit}
      />
    </div>
  );
}

export default Content;
