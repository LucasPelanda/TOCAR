import { useState } from "react";
import Input from "./input";

function AddTask({ onAddTaskSubmit, tasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Obtém o maior ID na lista de tarefas e adiciona +1
  const lastID =
    tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        className="text-center bg-slate-50 border border-slate-300 outline-slate-500 px-2 py-2 rounded-md"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        className="bg-slate-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          if (title.trim() === "" || description.trim() === "") {
            return alert("Preencha os campos solicitados.");
          }

          // Chama a função para adicionar a nova tarefa com ID único
          onAddTaskSubmit(lastID, title, description);

          // Limpa os campos após adicionar
          setTitle("");
          setDescription("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
