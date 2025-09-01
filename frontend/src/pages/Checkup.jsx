import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import Sidebar from "../components/Sidebar"


const Checkup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    numeroVaca: "",
    peso: "",
    descricao: "",
    atencao: false,
    sensorSelecionado: "monitor",
    status: "concluido"
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === "checkbox" ? checked : value
    setForm((prev) => ({ ...prev, [name]: val }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.numeroVaca) newErrors.numeroVaca = "Informe o número da vaca";
    if (!form.peso) newErrors.peso = "Informe o peso";
    if (!form.descricao) newErrors.descricao = "Descreva o check-up";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // 1. Buscar animal pelo número de identificação
      const respostaAnimal = await fetch(`http://localhost:8000/animais/identificacao/${form.numeroVaca}`);
      if (!respostaAnimal.ok) throw new Error("Animal não encontrado");
      const animal = await respostaAnimal.json();

      const usuarioId = localStorage.getItem("usuarioId");

      const checkup = {
        peso: parseFloat(form.peso),
        observacoes: form.descricao,
        animal_id: animal.id,
        usuario_id: parseInt(usuarioId)
      }

      const respostaCheckup = await fetch("http://localhost:8000/checkups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkup)
      });

      if (!respostaCheckup.ok) throw new Error("Erro ao registrar check-up");

      alert("Check-up registrado com sucesso!");
      navigate(-1);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-start justify-center p-4">
      <div className="flex min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />
         <main className="w-full p-6 md:ml-64 md:p-10">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-4">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>

            <div>
              <input
                type="text"
                name="numeroVaca"
                placeholder="Número da vaca"
                value={form.numeroVaca}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.numeroVaca ? "border-red-500" : "border-gray-300"} rounded-md`}
              />
              {errors.numeroVaca && <p className="text-sm text-red-600 mt-1">{errors.numeroVaca}</p>}
            </div>

            <div>
              <input
                type="number"
                name="peso"
                placeholder="Peso atual"
                value={form.peso}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.peso ? "border-red-500" : "border-gray-300"} rounded-md`}
              />
              {errors.peso && <p className="text-sm text-red-600 mt-1">{errors.peso}</p>}
            </div>

            <div>
              <textarea
                name="descricao"
                placeholder="Descrição do check-up"
                value={form.descricao}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.descricao ? "border-red-500" : "border-gray-300"} rounded-md`}
              />
              {errors.descricao && <p className="text-sm text-red-600 mt-1">{errors.descricao}</p>}
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" name="atencao" checked={form.atencao} onChange={handleChange} />
              Atenção
            </label>

            <fieldset className="space-y-2">
              <legend className="font-semibold text-sm text-gray-700 mt-4">Tipo de sensor utilizado:</legend>
              <label className="flex items-center gap-2">
                <input type="radio" name="sensorSelecionado" value="sensor" onChange={handleChange} checked={form.sensorSelecionado === "sensor"} /> Não usar sensor
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="sensorSelecionado" value="monitor" onChange={handleChange} checked={form.sensorSelecionado === "monitor"} /> Monitor cardíaco
              </label>
            </fieldset>

            <div>
              <label className="text-sm text-gray-600">Status do check-up</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md mt-1"
              >
                <option value="concluido">Check-up bem concluído</option>
                <option value="parcial">Check-up parcial</option>
                <option value="insuficiente">Check-up insuficiente</option>
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => navigate(-1)} className="border border-purple-500 text-purple-500 px-6 py-2 rounded-md">Cancelar</button>
              <button type="submit" className="bg-[#0B3B3B] text-white px-6 py-2 rounded-md">Salvar Check-up</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Checkup