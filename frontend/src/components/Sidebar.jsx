import { useEffect, useState } from "react"

const Sidebar = () => {
  const [rotaHome, setRotaHome] = useState("/")

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario")
    if (tipo === "dono") {
      setRotaHome("/dashboard-Dono")
    } else if (tipo === "funcionario") {
      setRotaHome("/dashboard-Funcionario")
    }
  }, [])

  return (
    <aside className="hidden md:flex w-64 h-screen bg-[#DADFDB] p-6 flex-col justify-between fixed top-0 left-0 rounded-3xl shadow-lg overflow-hidden z-20">
      <div>
        <img src="/logo.png" alt="TOCAR" className="w-24 mx-auto mb-10" />
        <nav className="flex flex-col gap-6">
          <a href={rotaHome} className="flex items-center gap-3 text-gray-800 font-medium">
            🏚️ Home
          </a>
          <a href="/Proft" className="flex items-center gap-3 text-gray-800 font-medium">
            🙅🏻‍♂️ Perfil
          </a>
        </nav>
      </div>
      <a href="/Help" className="text-sm text-gray-600">❓ Ajuda</a>
    </aside>
  )
}

export default Sidebar