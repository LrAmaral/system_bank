import { useState, useEffect } from "react";
import { getAccounts } from "../services/api";
import { Account } from "../types/account";

function Content() {
  const [usuario, setUsuario] = useState("Lucas");
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await getAccounts();
      console.log("Resposta da API:", response);
      if (response.data.length > 0) {
        setAccount(response.data[0]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da conta:", error);
    }
  };

  return (
    <div className="bg-bgColor w-full h-screen p-20 space-y-10">
      <h1 className="text-2xl font-bold">
        Bom dia, <span className="text-red-500">{usuario}!</span>
      </h1>
      <div className="flex gap-10">
        <div className="w-96 h-60 flex flex-col justify-between rounded-lg p-6 bg-zinc-800">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">Saldo disponível</p>
            <p className="text-2xl font-bold">
              {account ? `R$${account.accountBalance}` : "Carregando..."}
            </p>
          </div>
          <div className="space-x-4 font-semibold">
            <button className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white">
              Sacar
            </button>
            <button className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white">
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
    </div>
  );
}

export default Content;
