import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPage from "./pages/taskPages.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardDono from "./pages/DashboardDono.jsx"
import DashboardFuncionario from "./pages/DashboardFuncionario.jsx"
import Checkup from "./pages/Checkup.jsx"
import HistoricoCheckups from "./pages/HistoryCheckups" 
import GestaoFuncionarios from "./pages/Workers" 
import DesempenhoRebanho from "./pages/DesempenhoRebanho" 
import NoDone from "./pages/NoDone" 
import Proft from "./pages/Proft.jsx";
import NewAnimal from "./pages/NewAnimal.jsx";
import SeeAnimals from "./pages/SeeAnimals.jsx";
import ControlCheckis from "./pages/ControlCheckis.jsx";
import Help from "./pages/Help.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
  path: "/dashboard-dono",
  element: <DashboardDono />,
  },
  {
  path: "/dashboard-funcionario",
  element: <DashboardFuncionario />,
  },
  {
  path: "/checkup",
  element: <Checkup />,
  },
    {
  path: "/HistoryCheckups",
  element: <HistoricoCheckups />,
  },
  {
  path: "/Workers",
  element: <GestaoFuncionarios />,
  },
  {
  path: "/DesempenhoRebanho",
  element: <DesempenhoRebanho />,
  },
  {
  path: "/NoDone",
  element: <NoDone />,
  },
  {
  path: "/Proft",
  element: <Proft />,
  },
  {
  path: "/NewAnimal",
  element: <NewAnimal />,
  },
  {
  path: "/SeeAnimals",
  element: <SeeAnimals />,
  },
  {
  path: "/ControlCheckis",
  element: <ControlCheckis />,
  },
  {
  path: "/Help",
  element: <Help />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
