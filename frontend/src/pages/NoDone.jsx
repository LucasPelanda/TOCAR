import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const NaoDisponivel = () => {
  const navigate = useNavigate()

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
      <div className="flex bg-[#f9f9f9] min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />
        <main className="ml-64 p-10 w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-[#0B3B3B] mb-4">Só na versão princial</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#0B3B3B] text-white px-6 py-3 rounded-md"
          >
            Voltar para o painel
          </button>
        </main>
      </div>
    </div>
  )
}

export default NaoDisponivel