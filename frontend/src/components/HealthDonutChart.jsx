import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts"

const COLORS = ["#22c55e", "#8b5cf6", "#f97316", "#e11d48"]

const HealthDonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Distribuição de Saúde</h3>
        <span className="text-sm text-gray-600">Junho ⌄</span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="text-center mt-[-120px] mb-6">
        <p className="text-sm text-gray-600">Total de animais</p>
        <p className="text-2xl font-bold text-gray-800">{total}</p>
      </div>

      <ul className="mt-8 space-y-2 text-sm text-gray-600">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span>{item.name}</span>
            </div>
            <span className="font-semibold text-gray-800">
              {item.value} <span className="text-gray-500">({Math.round((item.value / total) * 100)}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HealthDonutChart