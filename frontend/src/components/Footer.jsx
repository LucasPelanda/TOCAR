const Footer = () => {
  return (
    <footer className="rounded-b-3xl mt-16 px-10 py-12 text-sm text-gray-700 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        <div className="flex flex-col items-start gap-6">
          <img src="/logo.png" alt="TOCAR" className="w-24" />
          <span className="text-sm">eduardo@tocar.com</span>
          <span className="text-sm">+55 (41) 992453398</span>
        </div>

        <div>
        <h4 className="font-semibold mb-2">Para o Produtor</h4>
        <ul className="space-y-1">
            <li>Como Funciona</li>
            <li>Benefícios</li>
            <li>Planos e Preços</li>
            <li>Histórias de Sucesso</li>
            <li>Ajuda e Suporte</li>
            <li>Entrar em Contato</li>
        </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Redes Sociais</h4>
          <ul className="space-y-1">
            <li>Facebook</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Escritório Central</h4>
          <p className="mb-4">
            R. Imac. Conceição, 1155 – Prado Velho,<br />
            Curitiba - PR
          </p>
          <div className="flex items-center border-b border-gray-400 pb-1">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="bg-transparent outline-none w-full placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © 2025 One Root. Todos os direitos reservados.
      </div>
    </footer>
  )
}

export default Footer