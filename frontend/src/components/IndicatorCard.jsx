const IndicatorCard = ({ icon, title, subtitle, unit, percent }) => {
  const VerdeVermelho = percent >= 0

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[300px] flex flex-col gap-2 justify-between">
      <div className="flex items-start gap-4">
        <img src={icon} alt={title} className="w-10 h-10" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{subtitle} <span className="text-sm font-normal">{unit}</span></p>
        </div>
      </div>

      <div
        className={`mt-2 flex items-center justify-center text-white px-3 py-1 rounded-full w-fit self-end text-sm font-semibold
          ${VerdeVermelho ? "bg-emerald-900" : "bg-red-800"}`}
      >
        <div className={`w-2 h-2 rounded-full mr-2 ${VerdeVermelho ? "bg-green-400" : "bg-red-400"}`}></div>
        {VerdeVermelho ? "+" : "-"} {Math.abs(percent)}%
      </div>
    </div>
  )
}

export default IndicatorCard