import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import StatusCard from "../components/StatusCard"
import FeatureButton from "../components/FeatureButton"
import IndicatorCard from "../components/IndicatorCard"
import AnimalCard from "../components/AnimalCard"
import HealthDonutChart from "../components/HealthDonutChart"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"

const DashboardDono = () => {
  const [dados, setDados] = useState({
    totalAnimais: 0,
    comPendencias: 0,
    taxaMonitoramento: "0%",
    indicadores: [],
    animais: [],
    saude: []
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
        console.error(error)
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
            <button className="text-2xl font-bold text-gray-700">📆</button>
            <button
              onClick={() => navigate("/checkup")}
              className="bg-[#0B3B3B] text-white px-6 py-4 rounded-md shadow-md"
            >
              REALIZAR CHECK-UP
            </button> 
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <StatusCard value={dados.totalAnimais} label="Total de animais"/>
            <StatusCard value={dados.comPendencias} label="Animais com pendências"  />
            <StatusCard value={dados.taxaMonitoramento} label="Taxa mensal de monitoramento"  />
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <FeatureButton icon="/icons/vaca.png" label="Gestão de Funcionários" to="/Workers" />
            <FeatureButton icon="/icons/vaca.png" label="Historico de check-ups" to="/HistoryCheckups" />
            <FeatureButton icon="/icons/vaca.png" label="Cadastrar novo Animal" to="/NewAnimal" />
            <FeatureButton icon="/icons/vaca.png" label="Ver seu rebanho" to="/SeeAnimals" />
            <FeatureButton icon="/icons/vaca.png" label="Vender animais " to="/ControlCheckis" />
            <FeatureButton icon="/icons/vaca.png" label="Desempenho do Rebanho" to="/DesempenhoRebanho" />
          </div>

          <h2 className="text-xl font-bold mt-10 mb-4 text-gray-800">Indicadores Úteis</h2>

          <div className="flex gap-6 flex-wrap">
            {dados.indicadores.map((item, index) => (
              <IndicatorCard
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                unit={item.unit}
                percent={item.percent}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Últimas atualizações</h2>
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

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default DashboardDono