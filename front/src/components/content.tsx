import {useState} from 'react'

function Content() {
  const [usuario, setUsuario] = useState();

  return (
    <div className="bg-bgColor w-full h-screen p-20 space-y-10">
      <h1 className='text-2xl font-bold'>
        Bom dia, <span className='text-red-500'>{usuario ? `usuario!` : 'Lucas!'}
        </span>
      </h1>
      <div className='w-96 h-80 flex flex-col justify-between rounded-lg p-6 bg-zinc-800'>
      <div className='space-y-2'>
        <p className='text-2xl font-semibold'>Saldo disponível</p>
        <p className='text-2xl font-bold'>R$2.500,00</p>
      </div>
      <div className='space-x-4 font-semibold'>
        <button  className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300  font-medium hover:text-white">
          Sacar
        </button>
        <button  className="bg-red-500 text-white w-40 p-2 rounded-lg hover:bg-red-700 transition ease-in-out duration-300 font-medium hover:text-white">
          Depositar
        </button>
      </div>
      </div>
    </div>
  )
}

export default Content
