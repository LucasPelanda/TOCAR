import Logo from "../components/Logo"
import UserCard from "../components/UserCard"
import SocialIcons from "../components/SocialIcons"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const getSavedUsers = () => [
  {
    name: "Lucas",
    email: "lucas@tocar.com",
    image: "/lucas.jpeg"
  },
  {
    name: "Leo",
    email: "leo@funcionario.com",
    image: "/leo.jpeg"
  },
  {
    name: "Edu",
    email: "eduardo@tocar.com",
    image: "/edu.jpeg"
  }
]

const Login = () => {
  const navigate = useNavigate()
  const savedUsers = getSavedUsers()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const handleLogin = async (emailInput) => {
    try {
      const response = await fetch(`http://localhost:8000/usuarios/email/${emailInput}`);
      if (!response.ok) throw new Error("Usuário não encontrado");

      const usuario = await response.json();

      let propriedadeId;

      if (usuario.tipo === "dono") {
        propriedadeId = usuario.propriedades?.[0]?.id;
      } else if (usuario.tipo === "funcionario") {
        propriedadeId = usuario.propriedade_id;
      }

      if (!propriedadeId) {
        throw new Error("Nenhuma propriedade vinculada ao usuário.");
      }

      localStorage.setItem("usuarioId", usuario.id)
      localStorage.setItem("propriedadeId", propriedadeId);
      localStorage.setItem("tipoUsuario", usuario.tipo);
      localStorage.setItem("nome", usuario.nome);

      if (usuario.tipo === "dono") {
        navigate("/dashboard-dono");
      } else if (usuario.tipo === "funcionario") {
        navigate("/dashboard-funcionario");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      alert("Digite um e-mail válido.")
      return
    }
    handleLogin(email)
  }

  const handleRemove = () => {
    alert("Usuário removido!")
  }

  return (
    <div className="min-h-screen bg-[#0B3B3B] flex items-center justify-center">
      <div className="bg-gray-300 text-white flex flex-col items-center justify-center px-6 py-8 rounded-3xl shadow-lg w-[375px]">
        <div className="w-full max-w-md">
          <Logo />

          <h1 className="text-2xl font-bold mb-1 text-center text-[#0B3B3B]">Login</h1>

          <div className="h-32 overflow-y-auto mb-4">
            {savedUsers.map((user, index) => (
              <UserCard
                key={index}
                name={user.name}
                image={user.image}
                onRemove={handleRemove}
                onLogin={() => handleLogin(user.email)}
              />
            ))}
          </div>

          <form onSubmit={handleFormSubmit} className="w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0B3B3B] ">Email</label>
              <input
                type="email"
                placeholder="exemplo@tocar.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-[#0B3B3B] bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0B3B3B]">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-[#0B3B3B] bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0B3B3B] text-white py-2 rounded-md hover:bg-[#062121] transition"
            >
              Entrar com email
            </button>
          </form>

          <hr className="my-6 border-gray-600" />

          <SocialIcons />
        </div>
      </div>
    </div>
  )
}

export default Login