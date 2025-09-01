const StatusCard = ({ value, label, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md px-6 py-4 text-center w-full max-w-[200px]">
      <div className="flex items-center justify-center gap-2 text-gray-800">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}

export default StatusCard