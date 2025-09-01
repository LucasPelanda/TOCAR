import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const HistoricoCheckups = () => {
  const [checkups, setCheckups] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const carregarCheckups = async () => {
      try {
        const resposta = await fetch("http://localhost:8000/checkups")
        if (!resposta.ok) throw new Error("Erro ao buscar check-ups")

        const dados = await resposta.json()
        setCheckups(dados.reverse()) // Mostra os mais recentes primeiro
      } catch (err) {
        alert(err.message)
      }
    }

    carregarCheckups()
  }, [])

  return (
    <div className="min-h-screen bg-[#0B3B3B] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">📚 Histórico de Check-ups</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-[#0B3B3B] text-white px-4 py-2 rounded-md"
          >
            Voltar
          </button>
        </div>

        {checkups.length === 0 ? (
          <p className="text-gray-300">Nenhum check-up registrado ainda.</p>
        ) : (
          <div className="space-y-4">
            {checkups.map((c, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-lg">🐮 Vaca Nº {c.animal?.numero_identificacao || "?"}</h2>
                  <span className="text-sm text-gray-500">
                    {new Date(c.data).toLocaleString("pt-BR")}
                  </span>
                </div>
                <p><strong>Peso:</strong> {c.peso} kg</p>
                <p><strong>Observações:</strong> {c.observacoes}</p>
                <p><strong>Feito por:</strong> {c.usuario?.nome || "Desconhecido"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoricoCheckups