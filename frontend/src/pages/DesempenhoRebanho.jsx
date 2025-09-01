import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts"
import Sidebar from "../components/Sidebar"

const DesempenhoRebanho = () => {
  const navigate = useNavigate()
  const [dados, setDados] = useState({ mediaPeso: 0, porMes: [], status: [] })

  useEffect(() => {
    const carregarDados = async () => {
      const propriedadeId = localStorage.getItem("propriedadeId")
      if (!propriedadeId) return

      try {
        const resposta = await fetch(`http://localhost:8000/checkups/propriedades/${propriedadeId}/desempenho`)
        if (!resposta.ok) throw new Error("Erro ao buscar dados de desempenho")

        const data = await resposta.json()

        const statusTransformado = {
          "Saudável": 0,
          "Atenção": 0
        }

        data.status.forEach(item => {
          const texto = item.nome.toLowerCase()
          if (
            texto.includes("atenção") ||
            texto.includes("urgente") ||
            texto.includes("doente") ||
            texto.includes("problema") ||
            texto.includes("monitorar")
          ) {
            statusTransformado["Atenção"] += item.value
          } else {
            statusTransformado["Saudável"] += item.value
          }
        })

        const statusFinal = Object.entries(statusTransformado).map(([nome, value]) => ({ nome, value }))

        setDados({
          ...data,
          status: statusFinal
        })
      } catch (err) {
        alert(err.message)
      }
    }

    carregarDados()
  }, [])

  const COLORS = ["#82ca9d", "#ffc658"]

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-start justify-center p-4">
      <div className="flex bg-white min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />
        <main className="w-full p-6 md:ml-64 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">📊 Desempenho do Rebanho</h1>
            <button
              onClick={() => navigate(-1)}
              className="bg-[#0B3B3B] text-white px-4 py-2 rounded-md"
            >
              Voltar
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Peso médio atual</h2>
            <p className="text-3xl text-[#0B3B3B] font-bold">{dados.mediaPeso} kg</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-lg font-semibold mb-4">Check-ups por mês</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dados.porMes}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="#0B3B3B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Atençoes nos chek-ups</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dados.status}
                    dataKey="value"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {dados.status?.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DesempenhoRebanho