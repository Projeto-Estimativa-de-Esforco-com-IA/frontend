export default function Dashboard() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      {/* Cabeçalho da seção */}
      <section className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Bem-vindo à Ferramenta Ágil de Estimativa de Esforço com IA
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          Centralize o processo de estimativa de esforço em projetos ágeis, organize equipes e tarefas, 
          e utilize inteligência artificial para previsões mais precisas. 
          Use o menu lateral para navegar entre os módulos.
        </p>

        {/* Cards de destaque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">Projetos</h2>
            <p className="text-sm text-gray-600 mt-2">
              Gerencie seus projetos ágeis com facilidade e visibilidade.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">Tarefas</h2>
            <p className="text-sm text-gray-600 mt-2">
              Crie, edite e acompanhe tarefas com estimativas inteligentes.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">Equipe</h2>
            <p className="text-sm text-gray-600 mt-2">
              Organize sua equipe e acompanhe o desempenho colaborativo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
