import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const GestaoFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([])
  const [novo, setNovo] = useState({ nome: "", email: "" })
  const navigate = useNavigate()

  // Carregar funcionários do backend
  useEffect(() => {
    const carregarFuncionarios = async () => {
      try {
        const propriedadeId = localStorage.getItem("propriedadeId");
        const resposta = await fetch(`http://localhost:8000/propriedades/${propriedadeId}/funcionarios`);
        if (!resposta.ok) throw new Error("Erro ao buscar funcionários")
        const dados = await resposta.json()
        setFuncionarios(dados)
      } catch (err) {
        alert(err.message)
      }
    }

    carregarFuncionarios()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNovo((prev) => ({ ...prev, [name]: value }))
  }
    const adicionarFuncionario = async (e) => {
    e.preventDefault()
    try {
        const propriedadeId = localStorage.getItem("propriedadeId")

        if (!propriedadeId) {
        alert("ID da propriedade não encontrado.")
        return
        }

        const novoFuncionario = {
        nome: novo.nome,
        email: novo.email,
        senha: "123", // senha padrão
        tipo: "funcionario",
        propriedade_id: parseInt(propriedadeId)
        }

        const resposta = await fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoFuncionario)
        })

        if (!resposta.ok) {
        const erro = await resposta.json()
        throw new Error(erro.detail || "Erro ao cadastrar funcionário")
        }

        const funcionarioCriado = await resposta.json()
        setFuncionarios((prev) => [...prev, funcionarioCriado])
        setNovo({ nome: "", email: "" })
    } catch (err) {
        alert(err.message)
    }
    }

  const removerFuncionario = async (email) => {
    const funcionario = funcionarios.find((f) => f.email === email)
    if (!funcionario) return

    try {
      const resposta = await fetch(`http://localhost:8000/usuarios/${funcionario.id}`, {
        method: "DELETE"
      })

      if (!resposta.ok) throw new Error("Erro ao remover funcionário")
      setFuncionarios((prev) => prev.filter((f) => f.id !== funcionario.id))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
      <div className="flex min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />

        <main className="w-full p-6 md:ml-64 md:p-10">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">👨‍🌾 Gestão de Funcionários</h1>
              <button
                onClick={() => navigate(-1)}
                className="bg-[#0B3B3B] text-white px-4 py-2 rounded-md"
              >
                Voltar
              </button>
            </div>

            <form onSubmit={adicionarFuncionario} className="space-y-4 mb-8">
              <input
                type="text"
                name="nome"
                placeholder="Nome do funcionário"
                value={novo.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail do funcionário"
                value={novo.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
              <button type="submit" className="bg-[#0B3B3B] text-white px-6 py-2 rounded-md">
                Adicionar Funcionário
              </button>
            </form>

            <h2 className="text-lg font-semibold mb-4 text-gray-700">Funcionários Cadastrados:</h2>
            <ul className="space-y-3">
              {funcionarios.map((f, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border border-gray-200 p-4 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{f.nome}</p>
                    <p className="text-sm text-gray-500">{f.email}</p>
                  </div>
                  <button
                    onClick={() => removerFuncionario(f.email)}
                    className="text-red-500 hover:underline"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export default GestaoFuncionarios