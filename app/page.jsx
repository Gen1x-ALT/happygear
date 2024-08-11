'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function Page() {
    const [isMounted, setIsMounted] = useState(false);
    const [geoData, setGeoData] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const globeRef = useRef();

    useEffect(() => {
        setIsMounted(true);

        fetch('countries.geojson')
            .then((res) => res.json())
            .then((data) => setGeoData(data));
    }, []);

    useEffect(() => {
        if (globeRef.current) {
            globeRef.current.camera().zoom(1.5);

            const controls = globeRef.current.controls();
            controls.minZoom = 5;
            controls.maxZoom = 1;
        }
    }, [isMounted]);

    const countries = [
        { admin: 'United States of America', name: 'EE.UU (Estados Unidos)' },
        { admin: 'Costa Rica', name: 'Costa Rica' },
        { admin: 'Mexico', name: 'México' },
        { admin: 'Peru', name: 'Perú' },
        { admin: 'Argentina', name: 'Argentina' },
        { admin: 'Venezuela', name: 'Venezuela' },
        { admin: 'Spain', name: 'España' },
        { admin: 'Ecuador', name: 'Ecuador' }
    ];

    const countryColors = {
        'United States of America': '#B31942',
        'Costa Rica': '#002B7F',
        'Mexico': '#006847',
        'Peru': '#D91023',
        'Argentina': '#75AADB',
        'Venezuela': '#F4C300',
        'Spain': '#AA151B',
        'Ecuador': '#FFD100'
    };

    const filteredGeoData = geoData
        ? {
              ...geoData,
              features: geoData.features.filter((feature) =>
                  countries.some((country) => feature.properties.admin === country.admin)
              )
          }
        : null;

    const handlePolygonHover = (polygon, prevPolygon) => {
        if (polygon) {
            setHoveredCountry(polygon.properties.admin);
        } else {
            setHoveredCountry(null);
        }
    };

    return (
        <main className="flex flex-col gap-8 sm:gap-16">
            <i>Página en construcción - todo en esta página puede cambiar después</i>
            <section className="flex flex-col items-start gap-3 sm:gap-4">
                <h1 className="mb-0">HappyGear Studios - Por fans, para fans</h1>
                <p className="text-lg">
                    Un estudio de videojuegos independiente <b>destinado</b> a hacerte feliz con nuestros juegos.
                </p>
                <p className="text-m">
                    Nosotros somos desarrolladores independientes de videojuegos. ¡Nos apasiona poder hacer proyectos
                    rápidos y funcionales que entretengan a la mayor cantidad de gente posible!
                </p>
                <p className="text-m">
                    Por ahora, somos muy nuevos en el ámbito de desarrollo de videojuegos, pero esperamos poder cumplir
                    nuestros sueños. No es por el dinero, es por el <b>hacerlo</b>.
                </p>
            </section>
            <section className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="flex-1">
                    <h1 className="mb-0">"Sí, pero ¿quiénes están en el equipo?"</h1>
                    <br></br>
                    <p className="text-m">
                        Nosotros hablamos Español nativamente, pero la mayoría somos bilingües, entonces hablamos Inglés.
                    </p>
                    <p className="text-m">Tenemos a personas de muchas partes del mundo:</p>
                    <ul>
                        {countries.map((country, index) => (
                            <li
                                key={index}
                                style={{
                                    fontWeight: hoveredCountry === country.admin ? 'bold' : 'normal'
                                }}
                            >
                                {country.name}
                            </li>
                        ))}
                    </ul>
                </div>
                {isMounted && filteredGeoData && (
                    <div
                        className="flex-1"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Globe
                            ref={globeRef}
                            globeImageUrl="https://clouds.matteason.co.uk/images/4096x2048/earth.jpg"
                            polygonsData={filteredGeoData.features}
                            polygonAltitude={0.01}
                            polygonCapColor={(d) => countryColors[d.properties.admin] || 'rgba(200, 0, 0, 0.6)'}
                            polygonSideColor={() => 'rgba(0, 100, 0, 0.05)'}
                            polygonLabel={(d) => `
                                <div style="text-align: center;">
                                    <strong>${d.properties.admin}</strong>
                                </div>
                            `}
                            backgroundColor="rgba(0,0,0,0)"
                            showAtmosphere={false}
                            width="500"
                            height="500"
                            onPolygonHover={handlePolygonHover}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}