import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function NewAnimal() {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState({
    numero_identificacao: "",
    especie: "",
    sexo: "",
    idade: "",
    raca: "",
    origem: "",
    peso_atual: ""
  })

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const propriedadeId = localStorage.getItem("propriedadeId")

    if (!propriedadeId) {
      alert("ID da propriedade não encontrado.")
      return
    }

    const dadosAnimal = { ...animal, propriedade_id: propriedadeId }

    try {
      const response = await fetch("http://localhost:8000/animais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAnimal)
      })
      if (response.ok) {
        alert("Animal cadastrado com sucesso!")
        setAnimal({
          numero_identificacao: "",
          especie: "",
          sexo: "",
          idade: "",
          raca: "",
          origem: "",
          peso_atual: ""
        })
      } else {
        alert("Erro ao cadastrar o animal.")
      }
    } catch (err) {
      console.error(err)
      alert("Erro de conexão com o servidor.")
    }
  }

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
      <div className="flex min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />

        <main className="w-full p-6 md:ml-64 md:p-10">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">🐄 Cadastrar Novo Animal</h1>
              <button
                onClick={() => navigate(-1)}
                className="bg-[#0B3B3B] text-white px-4 py-2 rounded-md"
              >
                Voltar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="numero_identificacao"
                placeholder="Número de Identificação"
                value={animal.numero_identificacao}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                name="especie"
                placeholder="Espécie"
                value={animal.especie}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                name="sexo"
                placeholder="Sexo"
                value={animal.sexo}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                name="idade"
                type="number"
                placeholder="Idade"
                value={animal.idade}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                name="raca"
                placeholder="Raça"
                value={animal.raca}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                name="origem"
                placeholder="Origem"
                value={animal.origem}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
              />
              <input
                name="peso_atual"
                type="number"
                step="0.1"
                placeholder="Peso Atual (kg)"
                value={animal.peso_atual}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
              />

              <button
                type="submit"
                className="bg-[#0B3B3B] text-white px-6 py-2 rounded-md"
              >
                Cadastrar Animal
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}