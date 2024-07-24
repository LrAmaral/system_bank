import { Home, Banknote, ArrowLeftFromLine, ReceiptText } from 'lucide-react';

const info = [
    {
        icon: <Home />,
        text: "Página Inicial",
    },
    {
        icon: <ReceiptText />,
        text: "Extrato",
    },
    {
        icon: <Banknote />,
        text: "Depósito",
    },
    {
        icon: <ArrowLeftFromLine />,
        text: "Sair",
    },
]


function NavBar() {
  return (
    <div className="w-96 p-24 h-screen bg-zinc-900 text-red-500 space-y-14 font-bold border-r-2 border-zinc-800 border-solid">
        {info.map((item, index) => (
        <div key={index} className="flex gap-4">
            {item.icon}
            {item.text}
        </div>
        ))}
    </div>
  )
}

export default NavBar
