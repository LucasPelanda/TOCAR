import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function SeeAnimals() {
    const [animais, setAnimais] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const propriedadeId = localStorage.getItem("propriedadeId")

        fetch(`http://localhost:8000/propriedades/${propriedadeId}/animais`)
            .then(res => {
                if (!res.ok) throw new Error("Erro ao buscar animais")
                return res.json()
            })
            .then(data => setAnimais(data))
            .catch(err => console.error("Erro ao carregar animais:", err))
    }, [])

    return (
        <div className="flex bg-[#0B3B3B] min-h-screen items-center justify-center p-4">
            <div className="flex min-h-screen w-full max-w-[1440px] rounded-3xl shadow-lg overflow-hidden">
                <Sidebar />

                <main className="w-full p-6 md:ml-64 md:p-10">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">🐄 Animais Cadastrados</h1>
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-[#0B3B3B] text-white px-4 py-2 rounded-md"
                            >
                                Voltar
                            </button>
                        </div>

                        {animais.length === 0 ? (
                            <p className="text-gray-500 text-center">Nenhum animal encontrado.</p>
                        ) : (
                            <ul className="space-y-4">
                                {animais.map(animal => (
                                    <li
                                        key={animal.id}
                                        className="border border-gray-200 p-4 rounded-lg shadow-sm"
                                    >
                                        <p className="font-semibold text-lg">{animal.numero_identificacao} - {animal.raca}</p>
                                        <p className="text-gray-600">Espécie: {animal.especie}</p>
                                        <p className="text-gray-600">Sexo: {animal.sexo}</p>
                                        <p className="text-gray-600">Idade: {animal.idade} anos</p>
                                        <p className="text-gray-600">Peso atual: {animal.peso_atual} kg</p>
                                        <p className="text-gray-600">Origem: {animal.origem}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SeeAnimals