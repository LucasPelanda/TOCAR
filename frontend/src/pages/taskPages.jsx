import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const navigation = useNavigate();

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-[500px] space-y-4 ">
        <div className="flex justify-center relative mb-6">
          <button onClick={() => navigation(-1)} className="absolute left-0 top-0 bottom-0 text-slate-600 bg-slate-200 rounded-md">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Detalhes da Tarefas
          </h1>
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-xl font-bold text-slade-600">{title}</h2>
          <p className="text-slade-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
