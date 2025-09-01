import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import StatusCard from "../components/StatusCard"
import FeatureButton from "../components/FeatureButton"
import IndicatorCard from "../components/IndicatorCard"
import AnimalCard from "../components/AnimalCard"
import HealthDonutChart from "../components/HealthDonutChart"
import Footer from "../components/Footer"



const fetchDashboardData = async () => {
  return {
    totalAnimais: 621,
    comPendencias: 262,
    taxaMonitoramento: "11.91%",
    indicadores: [
      {
        icon: "/icons/vaca.png",
        title: "Peso médio do rebanho",
        subtitle: 400,
        unit: "Kg",
        percent: 5
      },
      {
        icon: "/icons/vaca.png",
        title: "Número de eventos futuros programados",
        subtitle: "50 vacinações\n10 check-ups",
        unit: "",
        percent: -5
      },
      {
        icon: "/icons/vaca.png",
        title: "Vacas vendidas",
        subtitle: "$8000.00/",
        unit: "Vaca",
        percent: 5
      }
    ],
    animais: [
      {
        id: 123,
        location: "Hyderabad",
        peso: "450kg",
        data: "12/04/2025",
        idade: "2 anos",
        raca: "Nelori",
        status: "Perfeito",
        icon: "/icons/vaca.png"
      },
      {
        id: 124,
        location: "Hyderabad",
        peso: "800kg",
        data: "12/04/2025",
        idade: "2 anos",
        raca: "Nelori",
        status: "Perfeito",
        icon: "/icons/vaca.png"
      },
      {
        id: 125,
        location: "Hyderabad",
        peso: "420kg",
        data: "12/04/2025",
        idade: "2 anos",
        raca: "Nelori",
        status: "Perfeito",
        icon: "/icons/vaca.png"
      }
    ],
    saude: [
      { name: "Saudáveis", value: 310 },
      { name: "Com alerta", value: 155 },
      { name: "Vacinação pendente", value: 31 },
      { name: "Sem dados recentes", value: 40 }
    ]
  }
}

const Dashboard = () => {
  const [dados, setDados] = useState({
    totalAnimais: 0,
    comPendencias: 0,
    taxaMonitoramento: "0%"
  })

  useEffect(() => {
    const carregarDados = async () => {
      const dadosAPI = await fetchDashboardData()
      setDados(dadosAPI)
    }

    carregarDados()
  }, [])

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
      <div className="flex bg-[#f9f9f9] min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />

        <main className="ml-64 p-10 w-full">
          <div className="flex justify-between items-center mb-8">
            <button className="text-2xl font-bold text-gray-700">📆</button>
            <button className="bg-[#0B3B3B] text-white px-6 py-4 rounded-md shadow-md">
              REALIZAR CHECK-UP
            </button>
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <StatusCard value={dados.totalAnimais} label="Total de animais" icon="😗" />
            <StatusCard value={dados.comPendencias} label="Animais com pendências" icon="😏" />
            <StatusCard value={dados.taxaMonitoramento} label="Taxa mensal de monitoramento" icon="😔" />
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <FeatureButton icon="/icons/vaca.png" label="Historico de check-ups" to="/HistoricoCheckups" />
            <FeatureButton icon="/icons/vaca.png" label="Encontre sua Vaquinha" to="/encontrar-vaquinha" />
            <FeatureButton icon="/icons/vaca.png" label="Status geral" to="/status-geral" />
            <FeatureButton icon="/icons/vaca.png" label="Adicionar Evento na agenda" to="/agenda" />
            <FeatureButton icon="/icons/vaca.png" label="Testar Sensores" to="/sensores" />
            <FeatureButton icon="/icons/vaca.png" label="Gráficos" to="/graficos" />
        </div>

        <h2 className="text-xl font-bold mt-10 mb-4 text-gray-800">Indicadores Úteis</h2>

        <div className="flex gap-6 flex-wrap ">
          {dados.indicadores?.map((item, index) => (
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
              {dados.animais?.map((animal) => (
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
            <HealthDonutChart data={dados.saude || []} />
          </div>
        </div>
            <Footer />
        </main>
      </div>
    </div>

  )
  
}

export default Dashboard