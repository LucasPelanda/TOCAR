import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import AnimalCard from "../components/AnimalCard"
import FeatureButton from "../components/FeatureButton"
import HealthDonutChart from "../components/HealthDonutChart"
import Footer from "../components/Footer"
import StatusCard from "../components/StatusCard"
import { useNavigate } from "react-router-dom"

const DashboardFuncionario = () => {
  const [dados, setDados] = useState({
    totalAnimais: 0,
    comPendencias: 0,
    taxaMonitoramento: "0%",
    animais: [],
    saude: [],
    indicadores: []
  })

  const navigate = useNavigate()
  const propriedadeId = localStorage.getItem("propriedadeId")

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await fetch(`http://localhost:8000/dashboard/${propriedadeId}`)
        if (!response.ok) throw new Error("Erro ao carregar dados do dashboard")

        const dadosAPI = await response.json()
        setDados(dadosAPI)
      } catch (error) {
        console.error("Erro ao buscar dados da dashboard:", error)
        alert("Erro ao carregar dashboard.")
      }
    }

    carregarDados()
  }, [propriedadeId])

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
      <div className="flex bg-[#f9f9f9] min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />
        <main className="md:ml-64 p-10 w-full">
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => navigate("/checkup")} className="bg-[#0B3B3B] text-white px-6 py-4 rounded-md shadow-md">
              REALIZAR CHECK-UP
            </button>
          </div>

          <div className="flex gap-6 flex-wrap justify-center mb-10">
            <StatusCard value={dados.totalAnimais} label="Animais sob cuidado" icon="🐮" />
            <StatusCard value={dados.comPendencias} label="Com alertas de saúde" icon="⚠️" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Animais designados</h2>
              <div className="flex flex-col gap-6">
                {dados.animais.map((animal) => (
                  <AnimalCard
                    key={animal.id}
                    id={animal.id}
                    location={animal.location}
                    peso={animal.peso}
                    data={animal.data}
                    idade={animal.idade}
                    raca={animal.raca}
                    status={animal.status}
                    icon={animal.icon}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Distribuição de Saúde</h2>
              <HealthDonutChart data={dados.saude} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <FeatureButton icon="/icons/vaca.png" label="Histórico de Atendimentos" to="/HistoryCheckups" />
            <FeatureButton icon="/icons/vaca.png" label="Conferir o rebanho" to="/SeeAnimals" />
            <FeatureButton icon="/icons/vaca.png" label="Desempenho dos ultimos chek-ups" to="/DesempenhoRebanho" />
            <FeatureButton icon="/icons/vaca.png" label="Arquivos" to="/NoDone" />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default DashboardFuncionario