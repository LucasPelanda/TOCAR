import { useNavigate } from "react-router-dom"

const FeatureButton = ({ icon, label, to }) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition text-left w-full max-w-[300px]"
    >
      <img src={icon} alt={label} className="w-10 h-10" />
      <span className="text-lg text-gray-800 font-medium">{label}</span>
    </button>
  )
}

export default FeatureButton