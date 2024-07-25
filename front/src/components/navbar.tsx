import { Home, Banknote, ArrowLeftFromLine, ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';

const info = [
    {
        icon: <Home />,
        text: "Página Inicial",
        route: '/initial'
    },
    {
        icon: <ArrowLeftFromLine />,
        text: "Sair",
        route: '/initial'
    },
]


function NavBar() {
  return (
    <div className="w-96 p-24 h-screen bg-zinc-900 text-red-500 space-y-14 font-bold border-r-2 border-zinc-800 border-solid">
        {info.map((item, index) => (
        <Link to={item.route} key={index} className="flex gap-4 hover:text-white transition ease-in-out duration-300">
            {item.icon}
            {item.text}
        </Link>
        ))}
    </div>
  )
}

export default NavBar
