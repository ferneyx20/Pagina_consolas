import React, { useState } from 'react';
import '../styles/global.css';

// Helper para rutas en GitHub Pages
// Hardcodeamos la base para asegurar que funciona en producción
const BASE_URL = '/Pagina_consolas';

const resolvePath = (path) => {
  // Si es una URL completa (http...), la dejamos igual
  if (path.startsWith('http')) return path;
  // Si ya tiene el prefijo, no lo duplicamos (por seguridad)
  if (path.startsWith(BASE_URL)) return path;
  // Añadimos prefijo
  return `${BASE_URL}${path}`;
};

const consoles = [
  {
    id: 1,
    name: "Magnavox Odyssey",
    year: 1972,
    maker: "Magnavox",
    gen: "1ra Generación",
    image: "/images/consoles/odyssey.jpg",
    description: "La chispa inicial. La Magnavox Odyssey no fue solo una consola, fue la invención de un medio completamente nuevo.",
    full_history: "Concebida por Ralph Baer en 1966 mientras esperaba un autobús, la 'Brown Box' (su prototipo) tardó años en llegar al mercado. Lanzada finalmente en 1972, la Odyssey era una máquina curiosa: carecía de CPU, sonido y capacidad para generar colores o texto. Su funcionamiento se basaba en una compleja ingeniería de diodos y transistores. Para compensar sus limitaciones gráficas (solo podía mostrar puntos y líneas blancas), incluía un ecosistema de accesorios físicos: tableros de juego, dados, billetes de Monopoly falsos y, lo más importante, láminas de plástico ('overlays') que se adherían electrostáticamente a la pantalla del televisor para simular escenarios como canchas de tenis o casas embrujadas. Vendió 350.000 unidades, una cifra modesta pero suficiente para probar que existía un mercado para el entretenimiento interactivo en el hogar.",
    notable_game: {
      title: "Table Tennis",
      image: "/images/games/table_tennis.jpg",
      description: "Más que un simple juego, 'Table Tennis' es el abuelo de todos los videojuegos modernos. Su premisa era insultantemente simple: dos barras luminosas que golpean un punto de luz de un lado a otro. Sin embargo, su física básica (podías darle efecto a la bola moviendo la paleta después del impacto) cautivó a millones. Fue tan influyente que Nolan Bushnell, fundador de Atari, jugó una demo antes del lanzamiento y se inspiró directamente para crear la máquina arcade 'Pong', que acabaría eclipsando a la propia Odyssey en popularidad."
    }
  },
  {
    id: 2,
    name: "Atari 2600",
    year: 1977,
    maker: "Atari",
    gen: "2da Generación",
    image: "/images/consoles/atari2600.jpg",
    description: "El fenómeno cultural que introdujo el concepto de 'videojuego' en el vocabulario mundial.",
    full_history: "Lanzada originalmente como Atari VCS (Video Computer System), esta máquina democratizó la tecnología de microprocesadores para el hogar. Su mayor innovación fue separar el hardware del software: en lugar de tener juegos preinstalados, la 2600 leía cartuchos ROM intercambiables, permitiendo una biblioteca teóricamente infinita. Aunque su hardware era extremadamente limitado (con solo 128 bytes de RAM y una resolución risible), los desarrolladores aprendieron a 'competir con el haz de electrones' del televisor, logrando trucos visuales imposibles sobre el papel. Reinó suprema durante años hasta que la saturación del mercado con juegos de baja calidad provocó el infame 'Crash de 1983'.",
    notable_game: {
      title: "Space Invaders",
      image: "/images/games/space_invaders.jpg",
      description: "El primer 'vende-consolas' de la historia. Cuando la versión doméstica de este éxito de arcade llegó a la Atari 2600 en 1980, las ventas de la consola se cuadruplicaron. Era una conversión técnicamente milagrosa para la época que capturaba la tensión frenética del original. Se dice, aunque es una leyenda urbana, que provocó escasez de monedas de 100 yenes en Japón; lo que es seguro es que transformó los videojuegos de una novedad pasajera en una industria multimillonaria permanente."
    }
  },
  {
    id: 3,
    name: "NES",
    year: 1983,
    maker: "Nintendo",
    gen: "3ra Generación",
    image: "/images/consoles/nes.jpg",
    description: "El ave fénix de los 8 bits. Nintendo rescató a la industria con un control de calidad férreo y diseño icónico.",
    full_history: "Después del colapso de la industria americana en 1983, los minoristas daban por muertos a los videojuegos. Nintendo entró al mercado occidental rediseñando su 'Famicom' japonesa para que pareciera un VCR (videocasetera) futurista, llamándola 'Entertainment System' para evitar el estigma de 'juguete'. Introdujo un modelo de negocio revolucionario basado en licencias estrictas: el 'Nintendo Seal of Quality'. Esto garantizaba que no hubiera 'basura' en su plataforma, recuperando la confianza del consumidor. También estandarizó el control con D-Pad (cruz direccional), que sigue siendo el estándar hoy en día.",
    notable_game: {
      title: "Super Mario Bros.",
      image: "/images/games/mario_bros.jpg",
      description: "Posiblemente el videojuego más importante jamás creado. Shigeru Miyamoto no solo creó un personaje, definió la gramática de cómo nos movemos en mundos virtuales. Su diseño de niveles (empezando con el inigualable Mundo 1-1) enseña al jugador las mecánicas sin una sola palabra de tutorial. La inercia de Mario, los secretos ocultos y la música pegadiza de Koji Kondo crearon un estándar de excelencia y pulido ('Nintendo Polish') que la competencia tardaría años en igualar."
    }
  },
  {
    id: 4,
    name: "Sega Genesis",
    year: 1988,
    maker: "Sega",
    gen: "4ta Generación",
    image: "/images/consoles/genesis.jpg",
    description: "La Guerra de Consolas comienza. Sega desafió al monopolio de Nintendo con velocidad, actitud y marketing agresivo.",
    full_history: "Conocida como Mega Drive fuera de América, fue la primera consola de 16 bits en ganar tracción masiva. Sega se posicionó como la alternativa 'cool' y rebelde frente a la familiar Disney que era Nintendo. Su campaña 'Genesis does what Nintendon't' atacaba directamente. Basada en la placa arcade System 16 de Sega, ofrecía gráficos más oscuros, audio sintetizado más 'rockero' y versiones sangrientas de juegos como Mortal Kombat (mientras Nintendo censuraba la sangre). Fue la consola que probó que había mercado para juegos más maduros y deportivos, dominando el mercado estadounidense durante gran parte de los 90.",
    notable_game: {
      title: "Sonic the Hedgehog",
      image: "/images/games/sonic.jpg",
      description: "Nintendo tenía a Mario, lento y metódico. Sega necesitaba una respuesta, y la encontró en un erizo azul supersónico. Sonic fue diseñado desde cero para mostrar la capacidad de procesamiento ('Blast Processing') de la Genesis, moviéndose a velocidades que Mareo ni soñaba. Su diseño visual vanguardista, combinado con una paleta de colores vibrante y una actitud desafiante, le dio a Sega la mascota perfecta para liderar su revolución cultural en los 90."
    }
  },
  {
    id: 5,
    name: "PlayStation",
    year: 1994,
    maker: "Sony",
    gen: "5ta Generación",
    image: "/images/consoles/ps1.jpg",
    description: "El gigante despierta. Sony entró al juego tras una traición y terminó dominando el mundo con el CD-ROM.",
    full_history: "La historia de la PlayStation nace de un acuerdo roto: Sony iba a crear un lector de CD para la SNES de Nintendo, pero Nintendo se echó atrás públicamente. Humillada, Sony decidió lanzar su propia máquina. Fue una decisión que cambió la historia. Al usar CDs en lugar de cartuchos, ofrecía 650MB de almacenamiento (frente a los escasos 64MB máximos de un cartucho), permitiendo audio de calidad CD, videos de movimiento completo (FMV) y juegos masivos. Además, su arquitectura optimizada para gráficos 3D poligonales democratizó el 3D para las masas, sacándolo de las costosas estaciones de trabajo Silicon Graphics y llevándolo al salón de casa.",
    notable_game: {
      title: "Final Fantasy VII",
      image: "/images/games/ff7.jpg",
      description: "Si había dudas sobre el formato CD, este juego las disipó. Square abandonó a Nintendo por la capacidad de almacenamiento de Sony para contar una historia épica en 3 discos. Sus cinemáticas pre-renderizadas integradas con el juego, su banda sonora orquestal y su narrativa madura y compleja elevaron el medio a la categoría de arte cinematográfico. Fue el juego que hizo que los JRPG (juegos de rol japoneses) se volvieran un fenómeno global masivo."
    }
  },
  {
    id: 6,
    name: "Nintendo 64",
    year: 1996,
    maker: "Nintendo",
    gen: "5ta Generación",
    image: "/images/consoles/n64.jpg",
    description: "Potencia de 64 bits y la obstinación del cartucho, pero con el control que definió el 3D moderno.",
    full_history: "Técnicamente superior a la PlayStation en potencia bruta, la N64 cometió el error estratégico de quedarse con los cartuchos, que eran caros de fabricar y tenían poca memoria. Esto le costó el apoyo de muchas compañías (como Square). Sin embargo, Nintendo compensó la falta de cantidad con una calidad inigualable en sus exclusivos. Su mayor legado es el controlador: introdujo el joystick analógico (thumbstick) en el mercado masivo, una innovación absolutamente necesaria para moverse con precisión en los nuevos entornos tridimensionales de 360 grados. También fue la pionera en la vibración del mando con el accesorio 'Rumble Pak'.",
    notable_game: {
      title: "Super Mario 64",
      image: "/images/games/mario64.jpg",
      description: "Antes de Mario 64, los desarrolladores no sabían cómo hacer juegos 3D jugables; las cámaras eran torpes y los controles confusos. Miyamoto resolvió todo de un golpe. El patio de recreo del castillo de Peach no era solo un nivel, era una declaración de intenciones: 'Ve a donde quieras, haz lo que quieras'. La libertad de movimiento, el salto triple y la cámara controlable por el usuario sentaron las bases que prácticamente todo juego de acción y aventura en 3D ha seguido desde entonces."
    }
  },
  {
    id: 7,
    name: "PlayStation 2",
    year: 2000,
    maker: "Sony",
    gen: "6ta Generación",
    image: "/images/consoles/ps2.jpg",
    description: "El monolito negro. Con más de 155 millones de unidades, es el rey indiscutible de las consolas domésticas.",
    full_history: "La PS2 llegó en el momento perfecto con la característica perfecta: era un reproductor de DVD totalmente funcional al mismo precio que los reproductores dedicados de la época. Millones de personas la compraron 'para ver Matrix' y se quedaron por los juegos. Su 'Emotion Engine' prometía gráficos capaces de transmitir emociones humanas. Aunque difícil de programar al principio, gozó de una vida útil extraordinariamente larga (se siguieron fabricando juegos hasta 2013). Su biblioteca es inabarcable, cubriendo desde experimentos artísticos como 'Ico' y 'Shadow of the Colossus' hasta fenómenos de masas como 'Grand Theft Auto' y 'Guitar Hero'.",
    notable_game: {
      title: "Grand Theft Auto: San Andreas",
      image: "/images/games/gta_sa.jpg",
      description: "La culminación de la ambición de Rockstar en la era PS2. San Andreas no era solo una ciudad, era un estado completo con tres urbes distintas, campo, desierto y montañas, todo sin tiempos de carga visibles al viajar. Agregó elementos de rol (comer, ejercitarse, aprender habilidades) y una narrativa inspirada en el cine de los 90. Fue una prueba de concepto de cuán inmersivo y vasto podría ser un mundo virtual, definiendo el género sandbox por una década."
    }
  },
  {
    id: 8,
    name: "Xbox 360",
    year: 2005,
    maker: "Microsoft",
    gen: "7ma Generación",
    image: "/images/consoles/xbox360.jpg",
    description: "La era de la Alta Definición y la conectividad total. Microsoft conquista el salón on-line.",
    full_history: "Lanzada un año antes que la PS3, la Xbox 360 definió la generación HD. Microsoft aprovechó su experiencia en software para crear Xbox Live, un servicio online unificado que era años luz superior a cualquier cosa vista antes (o a la competencia de Nintendo y Sony). Introdujo conceptos hoy omnipresentes: Logros (Gamerscore), chat de voz en grupo (party chat), bazar de juegos indies digitales (Xbox Live Arcade) y aplicaciones multimedia. A pesar de sufrir el catastrófico fallo de hardware 'Anillo Rojo de la Muerte' en sus primeros modelos, su catálogo de shooters y juegos occidentales la mantuvo como líder en EE.UU. y Reino Unido.",
    notable_game: {
      title: "Halo 3",
      image: "/images/games/halo3.jpg",
      description: "Más que un videojuego, el lanzamiento de Halo 3 fue un evento mediático global. Cerró la trilogía original del Jefe Maestro con una campaña épica, pero su verdadero valor estaba en el multijugador. Introdujo 'La Forja' (Forge), permitiendo a los jugadores editar mapas y compartir sus modos de juego, y un modo Cine para grabar repeticiones. Mantuvo a la comunidad de Xbox Live activa y vibrante durante años, estableciendo el estándar de oro para los FPS de consola."
    }
  },
  {
    id: 9,
    name: "Wii",
    year: 2006,
    maker: "Nintendo",
    gen: "7ma Generación",
    image: "/images/consoles/wii.jpg",
    description: "La revolución azul. Nintendo ignoró los gráficos HD para redefinir CÓMO jugamos.",
    full_history: "Mientras Sony y Microsoft peleaban por quién tenía más píxeles, Nintendo apostó por la 'Estrategia del Océano Azul': buscar un mercado donde no hubiera competencia. Con la Wii, ese mercado eran 'los no jugadores'. Su control remoto con sensores de movimiento (Wiimote) era intuitivo: si quieres batear, mueve el brazo como un bate. Eliminó la barrera de entrada de los complejos mandos de 12 botones. La consola era pequeña, silenciosa y barata. Se convirtió en un fenómeno social instantáneo, encontrando lugar en asilos, hospitales y salas de estar donde nunca hubo una consola antes.",
    notable_game: {
      title: "Wii Sports",
      image: "/images/games/wii_sports.jpg",
      description: "El juego perfecto incluido con la consola (excepto en Japón). No tenía gráficos realistas, pero no los necesitaba. La sensación táctil de jugar al tenis, bolos o boxeo moviendo el cuerpo era mágica y comprensible al instante para cualquier persona de 5 a 95 años. Fue el embajador perfecto de la tecnología de movimiento y se convirtió en el videojuego de una sola plataforma más vendido de la historia (hasta ese momento)."
    }
  },
  {
    id: 10,
    name: "PlayStation 4",
    year: 2013,
    maker: "Sony",
    gen: "8va Generación",
    image: "/images/consoles/ps4.jpg",
    description: "El refinamiento de la fórmula. Potencia, compartir y las mejores exclusivas narrativas.",
    full_history: "Tras tropezar con la compleja PS3, la PS4 fue una carta de amor a los desarrolladores y jugadores tradicionales. Usó una arquitectura x86 (similar a un PC), facilitando enormemente la creación de juegos. Sony se centró en un mensaje simple: 'This is for the Players' (Esto es para los jugadores). Introdujo el botón 'Share' en el mando, reconociendo el auge del streaming y las redes sociales, permitiendo compartir clips y fotos al instante. Dominó esta generación gracias a una biblioteca de exclusivos 'first-party' de calidad cinematográfica inigualable.",
    notable_game: {
      title: "The Last of Us Part II",
      image: "/images/games/tlou2.jpg",
      description: "Controvertido, doloroso y técnicamente impecable. Naughty Dog empujó la PS4 a sus límites absolutos para contar una historia de venganza y redención que desafió las expectativas de los jugadores. Sus animaciones faciales, su inteligencia artificial enemiga y su atención al detalle obsesiva (hasta el sonido de la respiración) mostraron la madurez del medio. No es solo un juego 'divertido', es una experiencia emocionalmente agotadora y transformadora."
    }
  },
  {
    id: 11,
    name: "Nintendo Switch",
    year: 2017,
    maker: "Nintendo",
    gen: "8va Generación",
    image: "/images/consoles/switch.jpg",
    description: "¿Por qué elegir? La genialidad de fusionar el juego portátil y de sobremesa.",
    full_history: "Tras el fracaso comercial de la Wii U, Nintendo se jugó el todo por el todo unificando sus dos líneas de negocio (portátil y sobremesa) en una sola máquina. El concepto 'Switch' (cambiar) es simple pero poderoso: juega en la TV, saca la consola del dock y sigue jugando en el autobús. Sus controles 'Joy-Con' separables permiten multijugador instantáneo en cualquier lugar ('Tabletop mode'). A pesar de ser mucho menos potente que la competencia, su versatilidad y el catálogo estelar de Nintendo la han convertido en una de las consolas más exitosas de la historia.",
    notable_game: {
      title: "Zelda: Breath of the Wild",
      image: "/images/games/botw.jpg",
      description: "Lanzado junto con la consola, fue la razón para comprarla. Rompió todas las convenciones de la saga Zelda y de los mundos abiertos en general. En lugar de llenarte el mapa con iconos de tareas, te daba herramientas y física real y te decía: 'Mira esa montaña lejana, puedes ir allí'. La libertad de escalar cualquier superficie y planear hacia cualquier lugar, junto con su motor de física y química sistémica, creó una sensación de aventura genuina que pocos juegos han igualado."
    }
  },
  {
    id: 12,
    name: "PS5 / Series X",
    year: 2020,
    maker: "Sony / Microsoft",
    gen: "9na Generación",
    image: "/images/consoles/ps5.jpg",
    description: "Velocidad de la luz. El SSD elimina la espera y el Ray Tracing ilumina el futuro.",
    full_history: "Lanzadas en medio de una pandemia mundial, estas consolas representan el salto técnico más centrado en la 'calidad de vida' del usuario. Ambas máquinas apostaron por SSDs (discos de estado sólido) ultrarrápidos y arquitecturas de E/S personalizadas que eliminan casi por completo los tiempos de carga, cambiando cómo se diseñan los mundos (ahora pueden ser más detallados sin pausas para cargar). El Ray Tracing por hardware permite iluminación, sombras y reflejos realistas en tiempo real. Sony destacó además con su mando DualSense, que ofrece respuesta háptica precisa y gatillos adaptativos para simular la tensión de un arco o el freno de un coche.",
    notable_game: {
      title: "Elden Ring",
      image: "/images/games/elden_ring.jpg",
      description: "La obra maestra de Hidetaka Miyazaki y George R.R. Martin. Tomó la fórmula desafiante y precisa de 'Dark Souls' y la expandió a un mundo abierto fascinante y terrorífico, las 'Tierras Intermedias'. A diferencia de otros mundos abiertos que te guían de la mano, Elden Ring confía en la curiosidad e inteligencia del jugador. Su diseño artístico sublime, combates épicos contra jefes y la profundidad de su 'lore' lo convirtieron en un fenómeno cultural inmediato y el Juego del Año indiscutible de su época."
    }
  }
];

export default function Timeline() {
  const [selectedConsole, setSelectedConsole] = useState(consoles[0]);
  // Quitamos isAnimating para evitar bloqueos


  const handleConsoleChange = (newConsole) => {
    // Si es la misma, no hacer nada
    if (newConsole.id === selectedConsole.id) return;

    // Cambio inmediato (sin setTimeouts que puedan fallar)
    setSelectedConsole(newConsole);

    // Reset del scroll
    const scrollContainer = document.getElementById('main-scroll');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  };

  return (
    <div className="timeline-app-wrapper">
      {/* Header Fijo */}
      <header className="fixed-header glass-panel">
        <h2 className="header-title gradient-text">Historia de las Consolas</h2>
        <span className="header-badge">{selectedConsole.year}</span>
      </header>

      {/* Contenido Principal con Scroll Unificado */}
      <div className="main-scroll-area" id="main-scroll">
        <div className="content-container">

          <div className="unified-layout">

            {/* ----------------- SECCIÓN CONSOLA ----------------- */}
            <section className="info-block">
              <div className="text-content">
                <div className="header-badges">
                  <span className="badge gen-badge">{selectedConsole.gen}</span>
                </div>

                <h1 className="unified-heading gradient-text">{selectedConsole.name}</h1>
                <h3 className="unified-subheading">por {selectedConsole.maker}</h3>

                <p className="unified-lead-text">{selectedConsole.description}</p>

                <div className="unified-body-text">
                  <p>{selectedConsole.full_history}</p>
                </div>
              </div>

              <div className="media-content">
                <div className="unified-image-container">
                  <img
                    src={resolvePath(selectedConsole.image)}
                    alt={selectedConsole.name}
                    className="unified-image"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x400/1a1a1a/FFF?text=Imagen+Consola';
                    }}
                  />
                </div>
              </div>
            </section>


            {/* Separador */}
            <div className="section-divider"></div>


            {/* ----------------- SECCIÓN JUEGO ----------------- */}
            <section className="info-block">
              <div className="text-content">
                <div className="header-badges">
                  <span className="badge gen-badge">Juego del Año</span>
                </div>

                <h1 className="unified-heading gradient-text">{selectedConsole.notable_game.title}</h1>
                <h3 className="unified-subheading">Juego Destacado</h3>

                <p className="unified-lead-text">{selectedConsole.notable_game.description}</p>
              </div>

              <div className="media-content">
                <div className="unified-image-container">
                  <img
                    src={resolvePath(selectedConsole.notable_game.image)}
                    alt={selectedConsole.notable_game.title}
                    className="unified-image"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x400/2a2a2a/FFF?text=Juego+Destacado';
                    }}
                  />
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Navegación Inferior Fija */}
      <nav className="timeline-nav glass-panel">
        <div className="nav-track">
          {consoles.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                handleConsoleChange(c);
                const scrollContainer = document.getElementById('main-scroll');
                if (scrollContainer) scrollContainer.scrollTop = 0;
              }}
              className={`nav-item ${selectedConsole.id === c.id ? 'active' : ''}`}
            >
              <span className="nav-year">{c.year}</span>
              <div className="nav-dot"></div>
              <span className="nav-label">{c.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        /* 
           Wrapper principal FIJO que ocupa toda la pantalla.
           Ignora márgenes o layouts externos.
        */
        .timeline-app-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: transparent; /* Deja ver el fondo del body */
          z-index: 10;
        }

        .fixed-header {
          flex-shrink: 0;
          height: 50px; /* Reducido */
          margin: 0.5rem 1rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          border-radius: 12px;
          z-index: 20;
        }

        .header-title { font-size: 1rem; margin: 0; opacity: 0.8; }
        .header-badge {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--accent-primary);
          background: rgba(255,255,255,0.1);
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
        }

        /* Área de scroll principal */
        .main-scroll-area {
          flex: 1;
          min-height: 0; /* Crucial para flexbox scroll */
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
          scroll-behavior: smooth;
        }

        /* Contenedor del contenido limitado para lectura */
        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 2rem 120px; /* Espacio abajo para el nav */
        }

        .fade-out { opacity: 0; transform: translateY(10px); }
        .fade-in { opacity: 1; transform: translateY(0); }
        .content-container { transition: opacity 0.3s ease, transform 0.3s ease; }

        .info-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem; /* Menor gap */
          align-items: center;
          margin-bottom: 2rem;
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        }

        .media-content {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Estilos Unificados con CLAMP para responsividad */
        
        .gen-badge { 
          display: inline-block;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          color: var(--accent-secondary);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .unified-heading {
          /* Escala fluida: mínimo 2rem, ideal 4vw, máximo 3.5rem */
          font-size: clamp(2rem, 4vw, 3.5rem) !important; 
          margin: 0 !important;
          line-height: 1.1 !important;
          font-weight: 700 !important;
          font-family: var(--font-display) !important;
        }

        .unified-subheading {
          font-size: 1.2rem !important;
          color: var(--text-secondary) !important;
          font-weight: 300 !important;
          margin: -0.2rem 0 0 0 !important;
          text-transform: uppercase !important;
          letter-spacing: 1.5px !important;
        }

        .unified-lead-text {
          font-size: 1.1rem !important;
          line-height: 1.5 !important;
          font-weight: 300 !important;
          color: var(--text-primary) !important;
          margin-top: 0.8rem !important;
        }

        .unified-body-text {
          font-size: 1rem !important;
          line-height: 1.6 !important;
          color: var(--text-secondary) !important;
          text-align: justify !important;
        }
        .unified-body-text p { margin: 0 !important; }

        /* Contenedor Imágenes reducido */
        .unified-image-container {
          width: 100%;
          height: 350px; /* Altura más comedida */
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          border: 1px solid var(--glass-border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          padding: 1.5rem;
        }

        .unified-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
          transition: transform 0.4s ease;
        }
        .unified-image:hover { transform: scale(1.05); }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--glass-border), transparent);
          margin: 3rem 0;
          width: 100%;
        }

        /* Nav fijo abajo */
        .timeline-nav {
          height: 80px; /* Más compacto */
          flex-shrink: 0;
          margin: 0 1rem 1rem;
          display: flex;
          align-items: center;
          overflow-x: auto;
          z-index: 100; /* Aumentado para asegurar visibilidad */
          position: relative; /* Necesario para z-index */
          pointer-events: auto; /* Garantizar captura de eventos */
        }

        .nav-track {
          display: flex;
          gap: 1rem;
          min-width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
          pointer-events: auto;
        }

        .nav-item {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          color: var(--text-secondary);
          opacity: 0.5;
          transition: all 0.3s ease;
          min-width: 60px;
          pointer-events: auto; /* Forzar captura de clicks */
          position: relative; /* Asegurar z-index funcione */
        }

        .nav-item:hover, .nav-item.active { opacity: 1; transform: translateY(-3px); }
        .nav-year { font-size: 0.75rem; font-weight: 700; }
        .nav-dot { width: 6px; height: 6px; background: currentColor; border-radius: 50%; }
        
        .nav-item.active .nav-dot {
          background: var(--accent-primary);
          box-shadow: 0 0 10px var(--accent-primary);
          transform: scale(1.4);
        }
        .nav-label { font-size: 0.65rem; max-width: 70px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        @media (max-width: 1024px) {
          .info-block { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
          .unified-image-container { height: 300px; }
          .text-content { align-items: center; } /* Centrado en móvil */
          .content-container { padding: 2rem 1rem 100px; }
        }
      `}</style>
    </div>
  );
}
