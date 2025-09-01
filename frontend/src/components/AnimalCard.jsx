const AnimalCard = ({ id, location, peso, data, idade, raca, status, icon }) => {
  return (
    <div className="bg-[#004b64] rounded-xl p-6 text-white w-full max-w-[500px] flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🕒</span>
          <h3 className="text-lg font-bold">#{id}</h3>
        </div>
        <span className="text-xl font-bold">⋮</span>
      </div>

      <div className="flex items-center gap-4">
        <img src={icon} alt={`Animal ${id}`} className="w-14 h-14 rounded-lg bg-white p-1" />

        <div className="flex flex-col gap-1 text-sm">
          <p>Location: <strong>{location}</strong></p>
          <p>Peso atual: <strong>• {peso}</strong></p>
          <p>Última check-up: <strong>• {data}</strong></p>
        </div>
      </div>

      <div className="bg-gray-300 text-gray-800 text-sm mt-2 rounded-md grid grid-cols-3 divide-x divide-gray-400 overflow-hidden">
        <div className="text-center py-1">
          <strong className="block">Idade</strong>
          {idade}
        </div>
        <div className="text-center py-1">
          <strong className="block">Raça</strong>
          {raca}
        </div>
        <div className="text-center py-1">
          <strong className="block">Status</strong>
          {status}
        </div>
      </div>
    </div>
  )
}

export default AnimalCard