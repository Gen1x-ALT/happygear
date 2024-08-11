'use client';

import { useEffect, useState } from 'react';

export default function Page() {
    const [progress, setProgress] = useState(null);
    const [projectName, setProjectName] = useState('');

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch('falta.json');
                const data = await response.json();
                const project = data.projects.find(p => p.name === "Undertale: Orange & Blue");
                if (project) {
                    setProgress(project.progress);
                    setProjectName(project.name);
                } else {
                    setProgress(0);
                }
            } catch (error) {
                console.error('Error fetching progress data:', error);
                setProgress(0);
            }
        };

        fetchProgress();
    }, []);

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <i>Página en construcción - todo en esta página puede cambiar después</i>
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <h1 className="mb-0">Lo que falta</h1>
                <p className="text-lg">
                    Un análisis de lo que falta hacer en qué juego.
                </p>
                <small style={{ color: 'grey' }}>TODOS los porcentajes mostrados son aproximados.</small>
                <p className="text-lg font-semibold mb-2">{projectName}</p>
                {progress !== null && (
                    <div className="w-full bg-gray-200 rounded-full">
                        <div
                            className="bg-blue-600 text-white text-center p-1 rounded-full"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}