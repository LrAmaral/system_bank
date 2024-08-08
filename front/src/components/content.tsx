import { useState, useEffect } from "react";
import { deposit, withdraw, fetchAvailableSlots, fetchUser } from "../api/api";
import DepositModal from "./deposit-modal";
import WithdrawModal from "./withdraw/withdraw";
import { toast } from "./ui/use-toast";
import { RegisterUser } from "../lib/register";
import { TransactionHistory } from "./transaction/transaction";
import TransferModal from "./transfer";

function Content() {
  const [user, setUser] = useState<RegisterUser | null>(null);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<
    Array<{ denomination: number; quantity: number }>
  >([]);

  const userId = user ? parseInt(user.id, 10) : null;

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");

    toast({ description: "Acesso realizado com sucesso!" });
    if (storedUser) {
      setUser(JSON.parse(storedUser) as RegisterUser);
    }
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetchAvailableSlots();
        setAvailableSlots(response);
      } catch (error) {
        console.error("Failed to fetch available slots:", error);
      }
    };

    fetchSlots();
  }, []);

  const handleDeposit = async (notes: { [denomination: string]: number }) => {
    try {
      if (user) {
        const notesArray = Object.entries(notes)

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, quantity]) => quantity > 0)
          .map(([denomination, quantity]) => ({
            denomination: parseInt(denomination, 10),
            quantity,
          }));

        const response = await deposit(parseInt(user.id, 10), notesArray);
        const updatedBalance = response.balance;

        setUser({ ...user, balance: updatedBalance });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...user, balance: updatedBalance })
        );

        const updatedSlots = await fetchAvailableSlots();
        setAvailableSlots(updatedSlots);

        toast({ description: "Depósito realizado com sucesso!" });
      }
    } catch (error) {
      console.error("Erro ao realizar depósito:", error);
      toast({ description: "Erro ao realizar depósito.", type: "error" });
    }
  };

  const handleWithdraw = async (selectedNotes: {
    [denomination: number]: number;
  }) => {
    try {
      if (user) {
        const totalAmount = Object.keys(selectedNotes).reduce(
          (total, denom) =>
            total + parseInt(denom) * selectedNotes[parseInt(denom, 10)],
          0
        );

        await withdraw(parseInt(user.id, 10), selectedNotes);
        const updatedBalance = (user.balance || 0) - totalAmount;

        setUser({ ...user, balance: updatedBalance });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...user, balance: updatedBalance })
        );
        toast({ description: "Saque realizado com sucesso!" });
      }
    } catch (error) {
      console.error("Erro ao realizar saque:", error);
      toast({ description: "Erro ao realizar saque.", type: "error" });
    }
  };

  const handleTransferSuccess = async () => {
    try {
      if (user) {
        const updatedUser = await fetchUser(user.id);
        console.log(updatedUser.data)
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        const updatedSlots = await fetchAvailableSlots();
        setAvailableSlots(updatedSlots);

        toast({ description: "Transferência realizada com sucesso!" });
      }
    } catch (error) {
      console.error("Erro ao atualizar informações após transferência:", error);
      toast({ description: "Erro ao atualizar informações.", type: "error" });
    }
  };

  return (
    <div className="bg-bgColor w-full h-screen p-20 space-y-10">
      <div className="text-2xl font-bold flex flex-col p-4 bg-zinc-800 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-white">Olá,</p>
          <span className="text-red-500 font-bold">
            {user ? user.username : "Carregando..."}
          </span>
        </div>
        <p className="text-sm text-white space-y-2 flex flex-col">
          {user ? (
            <span>
              Nº da conta:{" "}
              <strong className="text-red-500">{user.accountNumber}</strong>
            </span>
          ) : (
            "Carregando..."
          )}
          <div className="flex gap-2 text-xs">
            {user ? (
              <span>
                Conta:{" "}
                <strong className="text-red-500">{user.accountType}</strong>
              </span>
            ) : (
              "Carregando..."
            )}
            {user ? (
              <span>
                Tipo da conta:{" "}
                <strong className="text-red-500">{user.accountStatus}</strong>
              </span>
            ) : (
              "Carregando..."
            )}
          </div>
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
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className={`cursor-pointer text-white w-40 p-2 rounded-lg transition ease-in-out duration-300 font-medium ${
                user?.balance === 0
                  ? "bg-red-600 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-700 hover:text-white"
              }`}
              disabled={user?.balance === 0}
            >
              Sacar
            </button>
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
            >
              Depositar
            </button>
          </div>
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white"
          >
            Transferir
          </button>
        </div>
        {userId && <TransactionHistory userId={userId} />}
      </div>
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onDeposit={handleDeposit}
      />
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
        availableSlots={availableSlots}
        balance={user?.balance}
      />
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        balance={user?.balance}
        userId={user?.id}
        onTransferSuccess={handleTransferSuccess}
      />
    </div>
  );
}

export default Content;
