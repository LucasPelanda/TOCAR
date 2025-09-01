import Sidebar from "../components/Sidebar"

const Help = () => {
  return (
    <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
      <div className="flex bg-[#f9f9f9] min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
        <Sidebar />
        <main className="md:ml-64 p-10 w-full text-gray-800">
          <h1 className="text-3xl font-bold mb-6"> Central de Ajuda</h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">📌 O que é a plataforma?</h2>
            <p>
              A TOCAR é uma plataforma digital desenvolvida para facilitar o controle de fazendas com rebanho bovino.
              Ela permite o acompanhamento da saúde dos animais, controle de peso, visualização de histórico de check-ups e gestão dos funcionários da propriedade.
              Tudo isso de forma simples e acessível por meio de uma interface amigável.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">👤 Tipos de usuários</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Dono: Visualiza todos os dados da propriedade, gerencia funcionários, acompanha estatísticas, cadastra novos animais e visualiza o desempenho geral do rebanho.
              </li>
              <li>
                Funcionário:Realiza check-ups em animais designados, visualiza tarefas diárias e acessa o histórico de atendimentos realizados por ele.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">🐮 Como realizar um check-up?</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Acesse a dashboard e clique no botão “REALIZAR CHECK-UP”.</li>
              <li>Digite o nome ou ID do animal para buscá-lo no sistema.</li>
              <li>Preencha as informações obrigatórias: peso atual e observações clínicas.</li>
              <li>Escolha se deseja usar um sensor automático ou não usar sensor.</li>
              <li>Selecione se o animal precisa de atenção especial (campo "atenção").</li>
              <li>Clique em “Salvar Check-Up”.</li>
              <li>O peso do animal será atualizado automaticamente no banco de dados.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">📊 Como visualizar o desempenho do rebanho?</h2>
            <p>
              Na opção "Desempenho do Rebanho", o usuário (dono) encontra gráficos com indicadores úteis:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Taxa de monitoramento: porcentagem de animais avaliados recentemente.</li>
              <li>Distribuição de saúde: mostra a proporção entre animais saudáveis, com alerta, com vacinação pendente ou sem dados recentes.</li>
              <li>Histórico de peso:evolução média do peso do rebanho ao longo dos meses.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">📦 Gestão de animais</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Cadastrar Animal:Permite inserir um novo animal com dados como peso inicial, raça, idade e localização.</li>
              <li> Ver Rebanho: Exibe todos os animais ativos da propriedade. É possível filtrar por status ou buscar por nome/ID.</li>
              <li> Vender Animal: Remove o animal do rebanho e registra a venda ou descarte no sistema.</li>
              <li> Histórico de Check-Ups:Permite ver todos os check-ups anteriores de qualquer animal, com data, responsável e observações.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">🧑‍💼 Gestão de Funcionários</h2>
            <p>
              Através da opção <strong>"Gestão de Funcionários"</strong> (disponível apenas para o dono), é possível:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Cadastrar novos usuários com função de funcionário.</li>
              <li> Editar dados de funcionários existentes.</li>
              <li> Remover acesso de ex-funcionários.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">⚙️ Dicas e boas práticas</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Realize check-ups com frequência para manter os dados atualizados.</li>
              <li>Use sensores quando disponíveis para garantir maior precisão.</li>
              <li>Verifique periodicamente os gráficos de desempenho para detectar problemas cedo.</li>
              <li>Faça backup dos dados periodicamente se estiver usando localmente.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">💬 Suporte Técnico</h2>
            <p>
              Em caso de problemas técnicos ou dúvidas sobre o funcionamento da plataforma, entre em contato:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Email: <strong>suporte@TOCAR.com</strong></li>
              <li>WhatsApp: <strong>(41) 99999-9999</strong></li>
              <li>Disponível de segunda a sexta, das 9h às 18h.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Help