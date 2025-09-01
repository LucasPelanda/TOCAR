import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { useNavigate } from "react-router-dom"

const Proft = () => {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const carregarUsuario = async () => {
      const id = localStorage.getItem("usuarioId")
      if (!id) return

      try {
        const res = await fetch(`http://localhost:8000/usuarios/${id}`)
        if (!res.ok) throw new Error("Erro ao buscar usuário")
        const data = await res.json()
        setUsuario(data)
      } catch (err) {
        console.error(err)
        alert("Erro ao carregar dados do usuário.")
      }
    }

    carregarUsuario()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate("/") 
  }

  if (!usuario) {
    return <div className="text-white p-10">Carregando...</div>
  }

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
      <div className="flex bg-[#f9f9f9] min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />
        <main className="w-full p-6 md:ml-64 md:p-10">
          <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Perfil do Usuário</h1>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-gray-800">{usuario.nome}</h2>
              <p className="text-gray-600">{usuario.email}</p>
              <p className="text-sm text-gray-500 mt-1">{usuario.tipo}</p>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-8 w-full bg-[#0B3B3B] text-white py-2 rounded-md"
            >
              Voltar
            </button>

            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
            >
              Sair da Conta
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Proft