export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  author: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  cover: string; // absolute image URL (Unsplash, WebP)
  content: string[]; // paragraphs (markdown-ish plain text)
};

export const CATEGORIES: { name: string; slug: string; description: string }[] = [
  { name: "Inteligencia Artificial", slug: "inteligencia-artificial", description: "Modelos, agentes, LLMs y el futuro de la IA aplicada." },
  { name: "Ciberseguridad", slug: "ciberseguridad", description: "Amenazas, defensa, privacidad y buenas prácticas." },
  { name: "Desarrollo", slug: "desarrollo", description: "Lenguajes, frameworks, arquitectura y DevOps." },
  { name: "Hardware", slug: "hardware", description: "Procesadores, GPUs, componentes y benchmarks." },
  { name: "Gadgets", slug: "gadgets", description: "Móviles, wearables y dispositivos que marcan tendencia." },
  { name: "Cloud", slug: "cloud", description: "Infraestructura, edge computing y servicios gestionados." },
  { name: "Blockchain", slug: "blockchain", description: "Web3, criptomonedas y contratos inteligentes." },
  { name: "Ciencia y Futuro", slug: "ciencia-futuro", description: "Cuántica, biotech, espacio y ciencia aplicada." },
];

// Curated tech-themed Unsplash photo IDs per category. Served as WebP via Unsplash CDN.
const IMAGE_POOL: Record<string, string[]> = {
  "inteligencia-artificial": [
    "1677442136019-21780ecad995", // ChatGPT screen
    "1620712943543-bcc4688e7485", // AI brain
    "1531746790731-6c087fecd65a", // humanoid robot
    "1555255707-c07966088b7b", // neural mesh
    "1516110833967-0b5716ca1387", // circuit AI
    "1485827404703-89b55fcc595e", // robot face
  ],
  ciberseguridad: [
    "1550751827-4bd374c3f58b", // hacker terminal
    "1563986768609-322da13575f3", // padlock
    "1526374965328-7f61d4dc18c5", // matrix code
    "1614064641938-3bbee52942c7", // security shield
    "1544197150-b99a580bb7a8", // server security
    "1510511459019-5dda7724fd87", // encryption
  ],
  desarrollo: [
    "1461749280684-dccba630e2f6", // code editor
    "1555066931-4365d14bab8c", // code screen
    "1517694712202-14dd9538aa97", // developer laptop
    "1587620962725-abab7fe55159", // terminal
    "1607799279861-4dd421887fb3", // js code
    "1542831371-29b0f74f9713", // github
  ],
  hardware: [
    "1591488320449-011701bb6704", // GPU
    "1587202372775-e229f172b9d7", // pc build
    "1518770660439-4636190af475", // circuit board
    "1591799264318-7e6ef8ddb7ea", // cpu
    "1555617981-dac3880eac6e", // motherboard
    "1526925539332-aa3b66e35444", // ram
  ],
  gadgets: [
    "1512446816042-444d641267d4", // smartphone
    "1523275335684-37898b6baf30", // smartwatch
    "1583394838336-acd977736f90", // headphones
    "1592434134753-a70baf7979d5", // phones lineup
    "1585386959984-a4155224a1ad", // earbuds
    "1544866092-1935c5ef2a8f", // tablet
  ],
  cloud: [
    "1451187580459-43490279c0fa", // fiber servers
    "1544197150-b99a580bb7a8", // datacenter
    "1518432031352-d6fc5c10da5a", // network
    "1558494949-ef010cbdcc31", // cloud infra
    "1573164713714-d95e436ab8d6", // server rack
    "1591808216268-ce0b82787efe", // switch
  ],
  blockchain: [
    "1621761191319-c6fb62004040", // crypto coins
    "1518544801976-3e159e50e5bb", // bitcoin
    "1620321023374-d1a68fbc720d", // eth
    "1639762681485-074b7f938ba0", // web3
    "1516245834210-c4c142787335", // blocks
    "1622790698286-eaeba03d84d1", // ledger
  ],
  "ciencia-futuro": [
    "1446776653964-20c1d3a81b06", // earth space
    "1451187580459-43490279c0fa", // fiber
    "1462331940025-496dfbfc7564", // lab
    "1532187863486-abf9dbad1b69", // dna
    "1614935151651-0bea6508db6b", // quantum
    "1543722530-d2c3201371e7", // biotech
  ],
};

// Overrides por título exacto cuando la imagen automática no encaja con el tema.
const COVER_OVERRIDES: Record<string, string> = {
  "El nuevo iPhone plegable: qué esperamos y qué no": "1592286927505-1def25115558",
};

function pickCover(categorySlug: string, seedText: string): string {
  const override = COVER_OVERRIDES[seedText];
  const id = override
    ? override
    : (() => {
        const pool = IMAGE_POOL[categorySlug] ?? IMAGE_POOL["desarrollo"];
        let h = 0;
        for (let i = 0; i < seedText.length; i++) h = (h * 31 + seedText.charCodeAt(i)) >>> 0;
        return pool[h % pool.length];
      })();
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&h=675&q=70&fm=webp`;
}

type Seed = {
  title: string;
  category: string;
  tags: string[];
  intro: string;
  points: [string, string][]; // [subheading, paragraph]
  conclusion: string;
};

const seeds: Seed[] = [
  {
    title: "Qué son los agentes de IA y por qué van a cambiar el software",
    category: "Inteligencia Artificial",
    tags: ["Agentes", "LLM", "Automatización"],
    intro: "Los agentes de IA no son solo chatbots: son sistemas que planifican, deciden y ejecutan acciones para cumplir objetivos con mínima supervisión.",
    points: [
      ["De asistentes a agentes", "Un asistente responde preguntas; un agente descompone un objetivo, elige herramientas y actúa. Esa diferencia rompe la interfaz clásica basada en botones y formularios."],
      ["Arquitectura típica", "Un LLM como cerebro, un conjunto de herramientas (APIs, navegador, terminal), memoria persistente y un bucle de razonamiento tipo ReAct que alterna pensar y actuar."],
      ["Casos reales", "Investigación automatizada, soporte técnico end-to-end, generación de código, análisis financiero y operaciones sobre navegadores y hojas de cálculo."],
      ["Riesgos y límites", "Alucinaciones amplificadas, costes impredecibles y ataques de prompt injection. El diseño defensivo y la observabilidad son tan importantes como el propio modelo."],
    ],
    conclusion: "El software del futuro no se usará: se le encargarán tareas. Y quien entienda a los agentes hoy tendrá una ventaja enorme mañana.",
  },
  {
    title: "GPT-5, Claude 4 y Gemini 2: comparativa práctica de los mejores LLMs",
    category: "Inteligencia Artificial",
    tags: ["LLM", "Comparativa", "Benchmarks"],
    intro: "Elegir modelo ya no es cuestión de moda: cada LLM top brilla en tareas distintas. Aquí una guía honesta basada en uso real.",
    points: [
      ["Razonamiento largo", "Los modelos con cadena de pensamiento explícita ganan en matemáticas y código complejo, pero cuestan más tokens y latencia."],
      ["Ventana de contexto", "Contextos de un millón de tokens permiten analizar bases de código enteras, aunque la calidad cae en la mitad de la ventana."],
      ["Coste por tarea", "Un modelo caro puede ser más barato si resuelve al primer intento. Mide por tarea completada, no por 1M de tokens."],
      ["Multimodalidad", "Visión, audio y vídeo abren casos nuevos: OCR de facturas, revisión de UI, análisis de reuniones."],
    ],
    conclusion: "No hay un ganador único: usa un enrutador que elija modelo según la tarea y evalúa con tus propios datos.",
  },
  {
    title: "Prompt injection: la vulnerabilidad más ignorada de la IA",
    category: "Ciberseguridad",
    tags: ["IA", "Seguridad", "OWASP"],
    intro: "Si tu producto usa un LLM con herramientas, probablemente tienes una vulnerabilidad de prompt injection. Y no, un filtro de palabras no la resuelve.",
    points: [
      ["Qué es", "Cuando una entrada externa (email, PDF, web) contiene instrucciones que el modelo interpreta como órdenes del usuario legítimo."],
      ["Ataques indirectos", "Un email con instrucciones ocultas puede pedirle al agente que exfiltre datos o envíe dinero. El usuario nunca escribió el prompt malicioso."],
      ["Defensas reales", "Separar contenido de instrucciones, sandbox de herramientas, confirmación humana en acciones sensibles y monitorización semántica."],
      ["OWASP LLM Top 10", "Consúltalo. Es el nuevo checklist básico para cualquier producto con IA generativa."],
    ],
    conclusion: "La seguridad de la IA no se compra: se diseña. Y empieza asumiendo que todo texto externo es potencialmente hostil.",
  },
  {
    title: "Rust vs Go en 2026: cuándo elegir cada uno",
    category: "Desarrollo",
    tags: ["Rust", "Go", "Backend"],
    intro: "Rust y Go compiten por el mismo espacio: servicios modernos, rápidos y concurrentes. Pero optimizan valores muy distintos.",
    points: [
      ["Curva de aprendizaje", "Go se aprende en un fin de semana. Rust requiere meses para dominar el borrow checker, pero paga con seguridad de memoria."],
      ["Rendimiento", "Rust suele ganar en cargas CPU-bound; Go compite en I/O gracias a su runtime y goroutines ligeras."],
      ["Ecosistema", "Go domina en Kubernetes, CLIs y APIs. Rust brilla en sistemas, WebAssembly, compiladores y bases de datos."],
      ["Productividad de equipo", "Un equipo mediano entrega más rápido con Go. Un equipo experto en Rust construye software prácticamente incuestionable."],
    ],
    conclusion: "Elige Go para lanzar rápido y Rust cuando el coste de un bug supere el coste de aprender el lenguaje.",
  },
  {
    title: "Kubernetes en 2026: ¿sigue teniendo sentido para tu startup?",
    category: "Cloud",
    tags: ["Kubernetes", "DevOps", "Startups"],
    intro: "Kubernetes es potente, pero también es una fábrica de complejidad. En 2026 hay alternativas más simples para el 90% de proyectos.",
    points: [
      ["El coste oculto", "No es solo el cluster: son los operadores, el service mesh, la observabilidad y el equipo que lo mantiene."],
      ["Alternativas modernas", "Cloud Run, Fly.io, Railway y Cloudflare Workers cubren la mayoría de cargas sin YAML."],
      ["Cuándo sí", "Multi-región compleja, workloads híbridos, requisitos de compliance específicos o un equipo de plataforma ya montado."],
      ["Migración inversa", "Cada vez más startups salen de Kubernetes hacia PaaS. No es un fracaso: es sensatez económica."],
    ],
    conclusion: "Kubernetes es una herramienta, no un objetivo. Úsalo cuando el problema lo justifique, no porque esté de moda.",
  },
  {
    title: "Zero Trust explicado sin jerga: por qué la VPN ya no basta",
    category: "Ciberseguridad",
    tags: ["Zero Trust", "Empresa", "Red"],
    intro: "El modelo de seguridad basado en «dentro es confiable, fuera es peligroso» murió con el teletrabajo. Zero Trust asume que la red no protege nada.",
    points: [
      ["Principios clave", "Verificar siempre, mínimo privilegio, asumir brecha. Cada petición se autentica y autoriza como si viniera de internet abierto."],
      ["Identidad como perímetro", "El nuevo cortafuegos es la identidad: SSO, MFA obligatorio, dispositivos gestionados y políticas contextuales."],
      ["Implementación gradual", "Empieza por aplicaciones críticas, mueve accesos a un proxy con SSO y elimina la VPN progresivamente."],
      ["Errores comunes", "Comprar una herramienta y llamarlo Zero Trust. Es una arquitectura, no un producto."],
    ],
    conclusion: "Zero Trust no es paranoia: es aceptar la realidad de una red que ya no tiene fronteras claras.",
  },
  {
    title: "Apple M5, Snapdragon X Elite 2 y AMD Ryzen AI: la nueva era del portátil",
    category: "Hardware",
    tags: ["CPU", "Portátiles", "ARM"],
    intro: "El portátil de 2026 es silencioso, dura todo el día y ejecuta modelos de IA en local. Tres arquitecturas compiten por ese título.",
    points: [
      ["Rendimiento por vatio", "ARM sigue liderando en eficiencia; x86 responde con núcleos híbridos y aceleradores integrados."],
      ["NPU y IA local", "Todas las plataformas incluyen una NPU de decenas de TOPS. Ejecutar un LLM 8B en local ya es rutinario."],
      ["Compatibilidad", "Windows on ARM ha madurado, pero algunos drivers y software profesional siguen siendo el talón de Aquiles."],
      ["Autonomía real", "18-22 horas de trabajo ligero es el nuevo estándar. La era del cargador siempre encima está terminando."],
    ],
    conclusion: "El diferenciador ya no es la potencia bruta, sino cómo la NPU y el software local aprovechan cada vatio.",
  },
  {
    title: "El fin de las contraseñas: passkeys en la vida real",
    category: "Ciberseguridad",
    tags: ["Passkeys", "Autenticación", "UX"],
    intro: "Google, Apple y Microsoft empujan las passkeys desde hace años. En 2026 ya son mayoritarias en servicios grandes. ¿Qué cambia para ti?",
    points: [
      ["Cómo funcionan", "Un par de claves criptográficas: la privada nunca sale de tu dispositivo, la pública queda en el servidor. Sin secreto compartido, sin phishing."],
      ["Sincronización entre dispositivos", "Los llaveros de plataforma sincronizan tus passkeys cifradas. Cambiar de móvil ya no rompe nada."],
      ["Casos límite", "Compartir cuentas familiares, recuperación tras perder todos los dispositivos y compatibilidad con clientes antiguos."],
      ["Cómo migrar tus servicios", "Empieza por email, banca y gestor de contraseñas. Elimina la contraseña solo cuando la passkey funcione en todos tus dispositivos."],
    ],
    conclusion: "La contraseña no morirá mañana, pero sí es hora de dejar de tratarla como tu principal barrera de seguridad.",
  },
  {
    title: "TypeScript vs JavaScript en 2026: ¿tiene sentido volver atrás?",
    category: "Desarrollo",
    tags: ["TypeScript", "Frontend", "Herramientas"],
    intro: "Con el nuevo compilador nativo y JSDoc reforzado, algunos proyectos plantean volver a JavaScript puro. ¿Es un buen movimiento?",
    points: [
      ["Lo que ganamos con TS", "Refactor seguro, autocompletado real y documentación viva. En equipos, es difícil justificar prescindir de eso."],
      ["Lo que perdimos", "Complejidad de configuración, tiempos de build y una capa extra de errores propios del sistema de tipos."],
      ["JSDoc como tercera vía", "Librerías pequeñas pueden tipar con JSDoc y evitar el build de TS sin renunciar al chequeo estático."],
      ["El nuevo compilador nativo", "10x más rápido cambia la ecuación: TypeScript deja de ser un impuesto en el ciclo de feedback."],
    ],
    conclusion: "Para librerías pequeñas, JSDoc. Para producto y equipo, TypeScript sigue siendo la opción por defecto sensata.",
  },
  {
    title: "Edge computing: por qué tu backend debería vivir cerca del usuario",
    category: "Cloud",
    tags: ["Edge", "Latencia", "Performance"],
    intro: "Cada 100 ms de latencia cuesta conversión. El edge computing acerca la lógica al usuario y cambia cómo diseñamos sistemas.",
    points: [
      ["Qué es edge realmente", "No es un CDN con esteroides: es ejecutar código en cientos de ubicaciones cerca del usuario final."],
      ["Casos ganadores", "Autenticación, personalización, A/B testing, rate limiting y transformación de imágenes."],
      ["Limitaciones", "Bases de datos globales siguen siendo el reto. Réplicas de lectura en el edge y escrituras centralizadas suelen ser el patrón."],
      ["Plataformas maduras", "Cloudflare Workers, Deno Deploy, Vercel Edge y Fastly Compute cubren el 95% de necesidades."],
    ],
    conclusion: "No todo va al edge, pero lo que sí va marca una diferencia de rendimiento imposible de igualar con arquitecturas centralizadas.",
  },
  {
    title: "Computación cuántica útil: qué es real y qué es marketing",
    category: "Ciencia y Futuro",
    tags: ["Cuántica", "Investigación", "Futuro"],
    intro: "Los titulares prometen romper toda la criptografía mañana. La realidad es más matizada, y también más interesante.",
    points: [
      ["Estado actual", "Miles de qubits físicos, decenas de qubits lógicos con corrección de errores. Aún lejos del millón necesario para Shor a gran escala."],
      ["Ventaja cuántica práctica", "En simulación de materiales y optimización específica ya hay resultados que superan a lo clásico."],
      ["Criptografía post-cuántica", "NIST ya estandarizó algoritmos resistentes. Migrar hoy es más barato que hacerlo con prisas mañana."],
      ["Qué mirar", "Tasa de error, coherencia y algoritmos híbridos clásico-cuántico son las métricas que importan."],
    ],
    conclusion: "La revolución cuántica no será un big bang: será una serie de victorias específicas que cambien industrias concretas.",
  },
  {
    title: "WebAssembly fuera del navegador: la plataforma universal",
    category: "Desarrollo",
    tags: ["WASM", "Runtime", "Portabilidad"],
    intro: "WebAssembly empezó como forma de correr C en el navegador. Ahora es un runtime universal, seguro y multiplataforma.",
    points: [
      ["WASI maduro", "El estándar de interfaz de sistema permite código WASM portable con acceso controlado a red y disco."],
      ["Casos servidor", "Plugins seguros para SaaS, funciones serverless con arranque en milisegundos y ejecución de código de usuario."],
      ["Lenguajes soportados", "Rust y Go lideran, pero Python, Ruby y JavaScript ya compilan a WASM con rendimiento aceptable."],
      ["Comparado con contenedores", "Arranca más rápido, ocupa menos y aísla mejor, aunque no reemplaza a Docker para todo."],
    ],
    conclusion: "WebAssembly no es el futuro del frontend: es el futuro del sandbox universal para ejecutar código de terceros.",
  },
  {
    title: "RAG explicado: cómo darle memoria y contexto a tu IA",
    category: "Inteligencia Artificial",
    tags: ["RAG", "Vector DB", "Embeddings"],
    intro: "Retrieval Augmented Generation es la forma más práctica de hacer que un LLM responda con datos tuyos sin reentrenarlo.",
    points: [
      ["El flujo básico", "Chunk, embed, guarda en vector DB. En cada pregunta, recupera los chunks relevantes y pásalos como contexto al LLM."],
      ["Calidad del retrieval", "El 80% de la calidad de un RAG está en cómo trocean, indexan y filtran los documentos. El modelo importa menos de lo que crees."],
      ["Reranking", "Un reranker sobre los 50 mejores resultados suele mejorar más que cambiar de LLM."],
      ["Errores frecuentes", "Chunks demasiado pequeños, ignorar metadatos y no evaluar con un dataset propio."],
    ],
    conclusion: "RAG es sencillo de prototipar y difícil de dominar. Invierte en evaluación desde el día uno.",
  },
  {
    title: "El renacer del correo electrónico: Fastmail, HEY y la vuelta a lo simple",
    category: "Gadgets",
    tags: ["Email", "Productividad", "Privacidad"],
    intro: "Después de años de intentos de reinventar el email, muchos vuelven a clientes cuidados que respetan el estándar y tu atención.",
    points: [
      ["Por qué ahora", "La saturación de apps de chat y notificaciones ha revalorizado el email asíncrono y buscable."],
      ["Alternativas serias", "Fastmail, Proton, HEY y Superhuman ofrecen experiencias muy distintas del gmail promedio."],
      ["Privacidad", "Proveedores europeos y cifrado extremo a extremo son opciones reales para quien lo necesita."],
      ["Automatización", "Filtros server-side, alias y integración con calendarios convierten el email en un sistema de trabajo, no una bandeja de entrada infinita."],
    ],
    conclusion: "El email no está muerto. Solo hacía falta tratarlo con el mismo cuidado que tratamos otras herramientas serias.",
  },
  {
    title: "Contratos inteligentes: dónde han funcionado de verdad",
    category: "Blockchain",
    tags: ["Smart Contracts", "DeFi", "Casos"],
    intro: "Más allá del hype, algunos casos de uso de contratos inteligentes han demostrado valor real. Repasamos los que sí han funcionado.",
    points: [
      ["Stablecoins", "USDC y similares mueven cientos de miles de millones y sostienen mercados en países con hiperinflación."],
      ["Infraestructura DeFi", "Protocolos de préstamo y intercambios descentralizados operan sin caídas durante años."],
      ["Tokenización de activos", "Bonos, fondos y bienes raíces empiezan a existir on-chain con reguladores de acuerdo."],
      ["Lo que sigue sin cuajar", "NFTs de arte especulativo, DAOs sociales y muchos «juegos web3»."],
    ],
    conclusion: "Blockchain no cambió el mundo como prometía, pero sí cambió pagos y liquidación financiera de forma silenciosa y duradera.",
  },
  {
    title: "Cómo montar un homelab en 2026 sin arruinarte",
    category: "Hardware",
    tags: ["Homelab", "Self-hosting", "Servidores"],
    intro: "Un mini PC, un NAS y un poco de software abierto bastan para tener tu propia nube en casa. Aquí una guía sensata.",
    points: [
      ["Hardware recomendado", "Un mini PC con N100 o Ryzen 8000 consume menos que una bombilla y mueve decenas de contenedores."],
      ["Almacenamiento", "Un NAS con dos discos en RAID1 más backup externo cubre a la gran mayoría."],
      ["Software base", "Proxmox o Docker Compose, Traefik como proxy, Authelia para SSO y Immich para fotos."],
      ["Seguridad", "No expongas puertos: usa Tailscale o Cloudflare Tunnel y limita accesos por identidad."],
    ],
    conclusion: "Un homelab bien montado ahorra suscripciones y enseña más sobre sistemas que cualquier curso online.",
  },
  {
    title: "El nuevo iPhone plegable: qué esperamos y qué no",
    category: "Gadgets",
    tags: ["iPhone", "Plegables", "Móviles"],
    intro: "Los rumores apuntan a un iPhone plegable en los próximos ciclos. Analizamos qué es realista y qué es fantasía.",
    points: [
      ["Diseño esperado", "Formato libro tipo Galaxy Fold, bisagra sin arruga visible y grosor cerrado por debajo de 10 mm."],
      ["Software", "iPadOS y iOS convergen: multitarea, ventanas y Stage Manager adaptados al plegable."],
      ["Precio", "Difícil por debajo de 2.000 €. Apple posicionará el plegable como categoría premium, no como sustituto."],
      ["Impacto en el mercado", "Los plegables Android maduran; un Apple plegable acelerará su adopción mainstream."],
    ],
    conclusion: "El primer plegable de Apple no será perfecto, pero definirá el estándar de UX que copiará el resto.",
  },
  {
    title: "Observabilidad moderna: logs, métricas y trazas ya no bastan",
    category: "Desarrollo",
    tags: ["Observability", "SRE", "OpenTelemetry"],
    intro: "La nueva ola de observabilidad no es más datos, sino mejores preguntas. Y la IA está en el centro.",
    points: [
      ["OpenTelemetry como estándar", "Un solo SDK para logs, métricas y trazas te libera del vendor lock-in."],
      ["Eventos amplios", "Un evento por request con muchos atributos suele responder mejor que decenas de métricas separadas."],
      ["Coste bajo control", "Sampling inteligente, retención por criticidad y almacenamiento en objeto reducen la factura sin perder señal."],
      ["IA sobre telemetría", "Detección de anomalías, resúmenes de incidentes y correlación automática dejan de ser ciencia ficción."],
    ],
    conclusion: "La observabilidad ya no compite en volumen: compite en velocidad para pasar de síntoma a causa raíz.",
  },
  {
    title: "SQLite en producción: por qué está reemplazando a Postgres en muchos proyectos",
    category: "Desarrollo",
    tags: ["SQLite", "Bases de datos", "Arquitectura"],
    intro: "SQLite fue durante años sinónimo de móvil y desarrollo local. Hoy potencia sistemas reales que sirven millones de peticiones.",
    points: [
      ["Rendimiento sorprendente", "En lecturas locales, SQLite pulveriza a cualquier base cliente-servidor porque no hay red por medio."],
      ["Réplicas y edge", "Herramientas como LiteFS y Turso permiten distribuir SQLite globalmente con réplicas cerca del usuario."],
      ["Simplicidad operativa", "Sin servidor separado, sin usuarios, sin firewalls. Un archivo y buenas prácticas de backup."],
      ["Cuándo NO", "Escrituras muy concurrentes desde múltiples nodos siguen pidiendo Postgres o similar."],
    ],
    conclusion: "SQLite no reemplaza a Postgres para todo, pero merece estar en tu radar mucho más de lo que crees.",
  },
  {
    title: "Cómo elegir una GPU en 2026: guía honesta sin fanboyismos",
    category: "Hardware",
    tags: ["GPU", "Gaming", "IA"],
    intro: "El mercado de GPUs sigue distorsionado por la demanda de IA. Aquí una guía que optimiza rendimiento por euro real.",
    points: [
      ["Gaming 1440p", "La franja media-alta es donde hay más competencia y mejor relación calidad-precio."],
      ["IA en local", "VRAM manda. Menos de 16 GB limita mucho los modelos que puedes ejecutar cómodamente."],
      ["Consumo", "Fuentes de 850W+ empiezan a ser recomendables. Pico y sostenido varían mucho entre modelos."],
      ["Alternativas", "AMD e Intel han recortado distancias en drivers y precio. Ya no es un mercado de un solo actor."],
    ],
    conclusion: "Compra por el uso real, no por benchmarks sintéticos ni por la marca que domina el marketing.",
  },
  {
    title: "Autohosting: 10 servicios que puedes reemplazar por alternativas libres",
    category: "Cloud",
    tags: ["Self-hosting", "Open Source", "Privacidad"],
    intro: "Cada SaaS suma coste y datos fuera de tu control. Estas alternativas open source son maduras y llevan años en producción.",
    points: [
      ["Fotos y notas", "Immich sustituye a Google Photos y Obsidian sincronizado con un backend propio a Notion básico."],
      ["Documentos y colaboración", "Nextcloud AIO cubre archivos, calendario, contactos y colaboración ofimática."],
      ["Comunicación", "Matrix para chat y Jitsi para videollamadas son alternativas creíbles a Slack y Zoom para equipos pequeños."],
      ["Automatización", "n8n reemplaza a Zapier con más flexibilidad y sin límite de ejecuciones."],
    ],
    conclusion: "Autohospedar no es para todos, pero cada servicio migrado reduce dependencia y factura mensual.",
  },
  {
    title: "El futuro de los navegadores: Arc, Zen y la vuelta al usuario",
    category: "Gadgets",
    tags: ["Navegadores", "UX", "Productividad"],
    intro: "Después de una década de estancamiento visual, una nueva generación de navegadores está reinventando cómo trabajamos en la web.",
    points: [
      ["Nuevas metáforas", "Espacios, pestañas verticales y perfiles por proyecto reemplazan la barra de pestañas infinita."],
      ["IA integrada", "Resúmenes, búsqueda inteligente y agentes que actúan sobre páginas empiezan a formar parte del navegador base."],
      ["Rendimiento y privacidad", "Chromium sigue dominando el motor, pero con capas de privacidad y bloqueo de anuncios de serie."],
      ["Qué probar", "Arc, Zen, Vivaldi y Orion cubren estilos muy distintos: elige según cómo trabajes tú."],
    ],
    conclusion: "El navegador es donde pasamos la mitad del día. Merece la misma consideración que un buen editor o IDE.",
  },
  {
    title: "Ransomware en 2026: cómo protegerse sin gastar una fortuna",
    category: "Ciberseguridad",
    tags: ["Ransomware", "Backup", "PYME"],
    intro: "El ransomware sigue siendo la principal amenaza para pymes. La buena noticia: las defensas fundamentales no han cambiado.",
    points: [
      ["Backups 3-2-1-1", "Tres copias, dos medios, una offsite y una offline. Sin backup offline, no hay defensa real."],
      ["MFA obligatorio", "El vector más común sigue siendo credenciales robadas. MFA en todo lo expuesto a internet es innegociable."],
      ["Segmentación", "Si todo tu Active Directory cae con un solo usuario comprometido, tienes un problema de arquitectura."],
      ["Plan de respuesta", "Saber a quién llamar y qué hacer las primeras 24 horas marca la diferencia entre susto y catástrofe."],
    ],
    conclusion: "Protegerse contra ransomware es más cuestión de disciplina que de presupuesto. Lo básico, bien hecho, funciona.",
  },
  {
    title: "Diseño de APIs: REST, GraphQL, gRPC y tRPC en la práctica",
    category: "Desarrollo",
    tags: ["APIs", "Backend", "Arquitectura"],
    intro: "Cada estilo de API resuelve un problema distinto. Elegir bien depende de quién consume tu API y cómo evoluciona.",
    points: [
      ["REST", "Estándar universal, cacheable y simple. Sigue siendo la mejor opción para APIs públicas."],
      ["GraphQL", "Ideal cuando el cliente necesita ensamblar datos de múltiples fuentes con poca coordinación con el backend."],
      ["gRPC", "Contratos fuertes y binario eficiente. Perfecto entre microservicios internos, incómodo desde el navegador."],
      ["tRPC", "Cuando cliente y servidor son TypeScript, elimina la capa de API sin renunciar a tipos extremo a extremo."],
    ],
    conclusion: "No hay ganador universal: mapea consumidores y evolución esperada antes de elegir estilo.",
  },
  {
    title: "Baterías de estado sólido: por qué 2026 puede ser el año del despegue",
    category: "Ciencia y Futuro",
    tags: ["Baterías", "Movilidad", "Energía"],
    intro: "Las baterías de estado sólido llevan una década a punto de llegar. Esta vez, varias señales apuntan a que va en serio.",
    points: [
      ["Ventajas reales", "Mayor densidad, carga más rápida y menor riesgo de incendio. En papel, casi todo son ventajas."],
      ["El obstáculo", "Fabricar a escala con costes competitivos ha sido el gran freno. Varias plantas piloto ya operan."],
      ["Impacto en coches", "Coches con 800 km de autonomía y carga en 10 minutos dejan de ser demo para acercarse a producción."],
      ["Efecto en gadgets", "Portátiles y móviles con el doble de autonomía sin más peso llegarían poco después."],
    ],
    conclusion: "Aún cabe cautela, pero por primera vez el estado sólido tiene calendario de fabricación y clientes firmes.",
  },
  {
    title: "Servidores caseros con Raspberry Pi 6: lo que puedes y no puedes hacer",
    category: "Hardware",
    tags: ["Raspberry Pi", "Homelab", "SBC"],
    intro: "La Pi 6 es más potente que muchos servidores de hace pocos años. Pero sigue teniendo límites que conviene conocer antes de comprarla.",
    points: [
      ["Casos ideales", "DNS local, VPN, domótica, servidor multimedia ligero, dashboards e IoT."],
      ["Casos límite", "Bases de datos grandes, transcodificación 4K en tiempo real y modelos de IA medianos."],
      ["Almacenamiento", "Olvida la microSD para uso continuo: SSD por USB o M.2 con adaptador HAT."],
      ["Alternativas", "Mini PCs x86 usados suelen dar más rendimiento por euro para muchos casos."],
    ],
    conclusion: "La Pi es fantástica cuando eliges bien el problema. Si le pides demasiado, un mini PC probablemente sea mejor.",
  },
  {
    title: "SEO en la era de la IA: qué cambia y qué sigue igual",
    category: "Desarrollo",
    tags: ["SEO", "Marketing", "Contenido"],
    intro: "Google ya no manda solo: ChatGPT, Perplexity y Gemini responden preguntas sin enviar tráfico. El SEO tradicional evoluciona.",
    points: [
      ["Lo que sigue igual", "Contenido útil, técnico limpio, velocidad y enlaces desde sitios de calidad."],
      ["Lo nuevo: GEO", "Optimizar para ser citado por LLMs pasa por contenido claro, estructurado y con datos concretos."],
      ["Schema y datos estructurados", "Más importantes que nunca: ayudan a máquinas y agentes a entender tu contenido."],
      ["Métricas que importan", "Menciones en respuestas de IA, tráfico de referencia desde asistentes y engagement, no solo clics."],
    ],
    conclusion: "El SEO no muere: se expande. Ahora hay que optimizar tanto para humanos como para modelos que responden por ellos.",
  },
  {
    title: "Coches conectados: la nueva frontera de la ciberseguridad",
    category: "Ciberseguridad",
    tags: ["Automoción", "IoT", "Regulación"],
    intro: "Un coche moderno tiene más líneas de código que un caza. Y la superficie de ataque crece cada actualización OTA.",
    points: [
      ["Vectores reales", "Bluetooth, LTE, sistemas de infoentretenimiento y APIs de fabricante son puntos ya explotados en pruebas."],
      ["Regulación", "UNECE R155 obliga a los fabricantes a demostrar procesos de ciberseguridad para vender en muchos mercados."],
      ["Actualizaciones OTA", "Bien: permiten parchear rápido. Mal: si el proceso es débil, un atacante puede empujar firmware."],
      ["Privacidad", "Los datos que un coche envía a diario superan con creces lo que la mayoría de conductores imagina."],
    ],
    conclusion: "El coche es hoy uno de los dispositivos IoT más críticos que posees. Pídele a la marca la misma transparencia que a tu banco.",
  },
  {
    title: "React Server Components: qué son y cuándo usarlos",
    category: "Desarrollo",
    tags: ["React", "Frontend", "SSR"],
    intro: "React Server Components rompen la separación clásica entre servidor y cliente. Bien usados, simplifican mucho el frontend moderno.",
    points: [
      ["El modelo mental", "Componentes que se ejecutan en el servidor, pueden acceder a datos directamente y no envían JS al cliente."],
      ["Ventajas claras", "Bundles más pequeños, acceso a bases de datos sin API intermedia y menos duplicación de lógica."],
      ["Trampas comunes", "Mezclar client y server components sin cuidado provoca cascadas y errores confusos."],
      ["Cuándo evitarlo", "SPAs muy interactivas o proyectos donde el SSR no aporta valor probablemente no lo necesiten."],
    ],
    conclusion: "RSC no es un truco: es un cambio arquitectónico. Vale la pena aprenderlo antes de usarlo en producción.",
  },
  {
    title: "El estado del ecosistema Linux en el escritorio",
    category: "Desarrollo",
    tags: ["Linux", "Desktop", "Open Source"],
    intro: "El año de Linux en el escritorio nunca llega, pero Linux en el escritorio nunca ha estado tan bien como ahora.",
    points: [
      ["Distribuciones maduras", "Fedora, Ubuntu, Pop!_OS y Bazzite ofrecen experiencia moderna sin renunciar a personalización."],
      ["Gaming", "Steam Deck y Proton han normalizado jugar en Linux con rendimiento comparable a Windows."],
      ["Hardware", "Frame.work y otros fabricantes venden portátiles con Linux preinstalado y soporte real."],
      ["Retos", "Aplicaciones profesionales creativas siguen siendo el gran hueco: Adobe y algunos DAWs siguen ausentes."],
    ],
    conclusion: "Linux en escritorio no reemplazará a Windows para todos, pero para desarrolladores y usuarios avanzados es una opción de primera.",
  },
  {
    title: "MLOps: cómo llevar modelos de IA a producción sin morir en el intento",
    category: "Inteligencia Artificial",
    tags: ["MLOps", "Producción", "Infraestructura"],
    intro: "Entrenar un modelo es fácil comparado con mantenerlo en producción, monitorizado y actualizado.",
    points: [
      ["Versionado", "Datos, código y modelos versionados juntos evitan el clásico «funcionaba en mi notebook»."],
      ["Pipelines", "Automatiza entrenamiento, evaluación y despliegue. Sin pipelines, cada modelo es un artefacto único imposible de reproducir."],
      ["Monitorización", "Drift de datos y de concepto degradan silenciosamente los modelos. Alertas específicas son imprescindibles."],
      ["Herramientas", "MLflow, Weights & Biases, DVC y ZenML cubren distintos puntos del ciclo. No necesitas todo desde el día uno."],
    ],
    conclusion: "Un modelo en producción es un producto, no un experimento. Trátalo con el mismo rigor que cualquier otro servicio crítico.",
  },
  {
    title: "Realidad mixta: Apple Vision, Quest y la promesa aún por cumplir",
    category: "Gadgets",
    tags: ["VR", "AR", "Vision Pro"],
    intro: "Los cascos de realidad mixta han mejorado radicalmente. Falta el software que justifique llevarlos horas al día.",
    points: [
      ["Hardware maduro", "Pantallas, tracking y confort ya no son el cuello de botella. Peso y batería sí lo son."],
      ["Casos de uso reales", "Trabajo enfocado con múltiples pantallas, entrenamiento industrial, cirugía asistida y ciertos juegos inmersivos."],
      ["Barrera del contenido", "Sin apps «imprescindibles», la mayoría de usuarios prueba una semana y guarda el casco."],
      ["El siguiente salto", "Gafas ligeras con paso a través realista y varias horas de autonomía cambiarán la ecuación."],
    ],
    conclusion: "La realidad mixta no ha fracasado: solo va más despacio que el hype. La revolución llegará cuando el hardware desaparezca en unas gafas cómodas.",
  },
  {
    title: "Cómo funciona realmente un CDN moderno",
    category: "Cloud",
    tags: ["CDN", "Performance", "Red"],
    intro: "Los CDNs ya no son cachés estáticos. Son plataformas de cómputo distribuido con reglas complejas de enrutamiento.",
    points: [
      ["Anycast y BGP", "La misma IP anunciada desde muchas ubicaciones lleva a cada usuario al PoP más cercano automáticamente."],
      ["Cache dinámica", "Cachear respuestas personalizadas con claves cuidadosas puede acelerar drásticamente sin sacrificar frescura."],
      ["Compute en el edge", "Reescribir headers, hacer A/B testing o autenticar en el edge reduce latencia y carga origen."],
      ["Ataques y protección", "WAF, mitigación DDoS y bot management son ya casi parte del paquete básico."],
    ],
    conclusion: "Un CDN bien configurado no es un lujo: es el pilar de rendimiento y disponibilidad de la web moderna.",
  },
  {
    title: "El futuro del almacenamiento: SSDs de 100 TB y memoria persistente",
    category: "Hardware",
    tags: ["SSD", "Almacenamiento", "Datacenter"],
    intro: "El coste por terabyte sigue cayendo y las capacidades individuales explotan. Cambia lo que es posible arquitecturar.",
    points: [
      ["QLC y PLC NAND", "Más bits por celda bajan precio, aunque penalizan resistencia. Perfecto para lecturas intensivas."],
      ["Memoria persistente", "El hueco entre RAM y SSD se acorta con tecnologías nuevas y bases de datos diseñadas para ello."],
      ["Efectos en software", "Índices en memoria, checkpoints instantáneos y bases columnares se benefician de forma no obvia."],
      ["Consumidor", "SSDs de 8 TB por menos que un fin de semana ya son realidad. El disco mecánico se retira poco a poco."],
    ],
    conclusion: "Cuando el almacenamiento deja de ser cuello de botella, aparecen arquitecturas que antes ni se planteaban.",
  },
  {
    title: "DevSecOps: seguridad como parte del pipeline, no como auditoría final",
    category: "Ciberseguridad",
    tags: ["DevSecOps", "CI/CD", "SAST"],
    intro: "Detectar vulnerabilidades en producción es caro. Detectarlas en cada commit cuesta minutos y ahorra fortunas.",
    points: [
      ["Shift left real", "SAST, SCA y secretos escaneados en cada PR. Fallar rápido educa al equipo mejor que cualquier curso."],
      ["Infra como código auditada", "Scanners de Terraform y Kubernetes detectan configuraciones inseguras antes de aplicarlas."],
      ["Cultura", "La seguridad no es un equipo separado que dice no: es un equipo que da herramientas al resto para decir sí con seguridad."],
      ["Métricas útiles", "Tiempo medio para parchear, cobertura de escaneo y volumen de vulnerabilidades por severidad."],
    ],
    conclusion: "DevSecOps no es una moda: es aceptar que la seguridad es parte inseparable del ciclo de desarrollo.",
  },
  {
    title: "Bases de datos vectoriales: pgvector, Qdrant y el nuevo stack de IA",
    category: "Inteligencia Artificial",
    tags: ["Vector DB", "RAG", "pgvector"],
    intro: "Las bases vectoriales son el corazón de las aplicaciones de IA modernas. Elegir bien afecta a coste, latencia y calidad.",
    points: [
      ["pgvector", "La opción pragmática: si ya usas Postgres, extiendes lo que tienes en vez de sumar una pieza."],
      ["Especializadas", "Qdrant, Weaviate y Milvus escalan mejor a miles de millones de vectores y ofrecen filtros híbridos potentes."],
      ["Coste real", "Los embeddings son baratos, pero el índice ocupa mucho. Ajustar dimensiones y cuantización ahorra factura."],
      ["Búsqueda híbrida", "Combinar densa (vectorial) y dispersa (BM25) suele mejorar resultados frente a solo vectorial."],
    ],
    conclusion: "No hay una vector DB perfecta: hay la adecuada para tu volumen, presupuesto y tolerancia a operar una pieza más.",
  },
  {
    title: "Cómo escribir código legible: 10 principios que sí importan",
    category: "Desarrollo",
    tags: ["Clean Code", "Buenas prácticas", "Legibilidad"],
    intro: "El código se lee muchas más veces de las que se escribe. Optimizar por legibilidad es siempre rentable.",
    points: [
      ["Nombres honestos", "Un nombre miente cuando lo que hace la función no coincide. Renombrar es a menudo el refactor más valioso."],
      ["Funciones pequeñas", "Si una función necesita comentarios para entenderse por bloques, esos bloques probablemente sean funciones."],
      ["Ausencia de sorpresas", "Un método `getUser` que además envía un email es un truco pesado que romperá a alguien."],
      ["Tests como documentación", "Un test claro explica el contrato mejor que cualquier README."],
    ],
    conclusion: "Código legible no es cuestión de gusto: es una ventaja competitiva medible en velocidad futura del equipo.",
  },
  {
    title: "5G, 6G y la red del futuro: qué llega y cuándo",
    category: "Ciencia y Futuro",
    tags: ["5G", "6G", "Telecomunicaciones"],
    intro: "5G se implanta a distinto ritmo por país mientras 6G ya está en fase de estandarización. ¿Cambiará algo perceptible para el usuario?",
    points: [
      ["5G maduro", "Latencia baja y ancho de banda enorme empiezan a habilitar casos industriales, no solo mejor Instagram."],
      ["Fixed Wireless Access", "En muchas zonas rurales, 5G reemplaza al cable con instalación de minutos."],
      ["6G en el horizonte", "Frecuencias sub-terahercios, integración con satélite y sensado ambiental prometen usos radicalmente nuevos."],
      ["Salud y regulación", "Los debates sobre exposición y regulación se intensificarán a medida que la infraestructura densifique."],
    ],
    conclusion: "5G y 6G cambiarán más la industria que la experiencia del móvil. Ahí es donde hay que mirar el impacto real.",
  },
  {
    title: "Automatizar tu vida con n8n: 15 flujos útiles que puedes montar hoy",
    category: "Gadgets",
    tags: ["n8n", "Automatización", "Productividad"],
    intro: "n8n es una alternativa open source a Zapier con flexibilidad casi ilimitada. Estos flujos te pueden ahorrar horas cada semana.",
    points: [
      ["Email y calendario", "Clasifica correos con IA, extrae eventos y agéndalos automáticamente en tu calendario."],
      ["Finanzas personales", "Ingesta de facturas, categorización automática y reporte mensual en tu hoja de cálculo favorita."],
      ["Contenido", "Programa publicaciones cruzadas entre redes con transformaciones específicas por plataforma."],
      ["Alertas inteligentes", "Monitoriza webs, precios y estados con notificaciones que solo saltan cuando de verdad importa."],
    ],
    conclusion: "La automatización personal ya no es solo para desarrolladores. Con n8n y un LLM, cualquiera puede construirla.",
  },
  {
    title: "Contenedores en 2026: Docker, Podman y el mundo post-Kubernetes",
    category: "Desarrollo",
    tags: ["Docker", "Contenedores", "DevOps"],
    intro: "Los contenedores siguen siendo la unidad de despliegue por defecto, pero el ecosistema alrededor se ha diversificado mucho.",
    points: [
      ["Docker Desktop y alternativas", "Podman, OrbStack, Rancher Desktop y Colima cubren distintos gustos y licencias."],
      ["Rootless", "Ejecutar contenedores sin root reduce superficie de ataque significativamente y ya es viable en la mayoría de casos."],
      ["Imágenes mínimas", "Distroless y Wolfi bajan tamaño y CVEs sin sacrificar funcionalidad."],
      ["Firmas y SBOM", "Sigstore y SBOMs auditables se están volviendo requisito, no lujo."],
    ],
    conclusion: "Los contenedores maduraron: hoy la conversación es sobre supply chain, no sobre si usarlos o no.",
  },
  {
    title: "El estado real de los coches autónomos",
    category: "Ciencia y Futuro",
    tags: ["Autonomía", "Waymo", "Automoción"],
    intro: "Waymo hace decenas de miles de viajes semanales sin conductor en varias ciudades. Otros siguen a distancia. ¿Dónde estamos realmente?",
    points: [
      ["Nivel 4 real", "Robotaxis operan en zonas geográficamente limitadas con condiciones controladas. Funciona, pero no en todas partes."],
      ["Consumo", "Sistemas nivel 2 avanzado son mayoritarios en coches nuevos: útiles pero requieren atención plena del conductor."],
      ["Regulación", "Cada jurisdicción avanza a distinto ritmo. Europa suele ir más lenta que EE.UU. y China."],
      ["Seguridad comparada", "Los datos muestran menos accidentes por milla que humanos en las zonas donde operan, aunque los casos raros importan más."],
    ],
    conclusion: "Los coches autónomos ya existen, solo que a poca escala y en pocas ciudades. La expansión será geográfica antes que tecnológica.",
  },
  {
    title: "Cifrado extremo a extremo: qué protege y qué no",
    category: "Ciberseguridad",
    tags: ["E2EE", "Privacidad", "Mensajería"],
    intro: "«Cifrado extremo a extremo» aparece en marketing de casi cualquier app. Vale la pena entender exactamente qué garantiza.",
    points: [
      ["Qué protege", "El contenido de los mensajes en tránsito y en los servidores del proveedor. Solo emisor y receptor pueden leerlo."],
      ["Qué NO protege", "Metadatos: quién habla con quién, cuándo, cuánto. Muchas veces revelan más que el contenido."],
      ["Backups", "Backups en la nube sin cifrar por el usuario pueden anular en la práctica el E2EE."],
      ["Modelos de amenaza", "Signal, iMessage, WhatsApp y Matrix tienen matices distintos que importan según qué te preocupe."],
    ],
    conclusion: "E2EE es imprescindible, no suficiente. Combínalo con higiene de metadatos y decisiones informadas sobre backups.",
  },
  {
    title: "Diseño de sistemas: cómo prepararse para una entrevista técnica sénior",
    category: "Desarrollo",
    tags: ["Carrera", "Entrevistas", "System Design"],
    intro: "Las entrevistas de diseño de sistemas evalúan cómo piensas, no si conoces la solución oficial. Aquí un método para no bloquearte.",
    points: [
      ["Aclarar requisitos", "Los primeros minutos deciden el resto. Escala, restricciones y trade-offs son más importantes que la primera arquitectura."],
      ["Diseño de alto nivel", "Dibuja componentes, flujos de datos y APIs. No entres al detalle sin acordar el marco general."],
      ["Deep dives", "Elige 2-3 áreas para profundizar: normalmente base de datos, caché y consistencia."],
      ["Evolución", "Cierra explicando cómo escalarías 10x, monitorización y modos de fallo."],
    ],
    conclusion: "La entrevista no premia la solución perfecta: premia el diálogo estructurado sobre trade-offs realistas.",
  },
  {
    title: "Fotografía computacional: por qué tu móvil vence a tu réflex",
    category: "Gadgets",
    tags: ["Fotografía", "Móviles", "IA"],
    intro: "Píxel por píxel, un sensor de móvil sigue siendo peor. Pero la fotografía moderna ya no se decide en el sensor.",
    points: [
      ["Fusión de exposiciones", "Cada foto es en realidad muchas combinadas por software, con mayor rango dinámico que casi cualquier réflex."],
      ["IA generativa", "Reencuadres, cielos reemplazados y detalles interpolados hacen fotos «imposibles» del hardware."],
      ["Ventaja de la réflex", "Control creativo, óptica intercambiable y menos artefactos siguen importando en trabajos profesionales."],
      ["Ética", "La línea entre foto y edición se difumina. Los medios empiezan a exigir metadatos de procedencia (C2PA)."],
    ],
    conclusion: "La cámara más importante ya no es la que tenga mejor sensor, sino la que mejor software esconde detrás de un obturador.",
  },
  {
    title: "Web3 sin ilusiones: dónde sigue vivo y dónde no",
    category: "Blockchain",
    tags: ["Web3", "Crypto", "Realidad"],
    intro: "Después del pico especulativo y el invierno, queda una capa útil de infraestructura. Repasamos qué merece atención sin fanatismos.",
    points: [
      ["Pagos", "Stablecoins mueven volúmenes reales y compiten con SWIFT en corredores concretos."],
      ["Identidad", "Wallets como identidad y credenciales verificables tienen sentido, aunque el UX sigue siendo hostil."],
      ["Juegos y coleccionables", "Casi todos los proyectos ambiciosos fracasaron. Quedan usos nicho y experimentos interesantes."],
      ["Regulación", "MiCA en Europa y marcos similares en otros mercados dan claridad y filtran proyectos serios."],
    ],
    conclusion: "Web3 no cambió internet, pero dejó piezas útiles. Ignorarlas por completo es tan miope como abrazarlas sin criticismo.",
  },
  {
    title: "El SDK que cambió mi productividad: por qué merece la pena pagar herramientas",
    category: "Desarrollo",
    tags: ["Herramientas", "Productividad", "Carrera"],
    intro: "Muchos desarrolladores dedican horas a evitar suscripciones de decenas de euros al mes. Casi siempre es un mal cálculo.",
    points: [
      ["El coste real de tu tiempo", "Una hora mal invertida vale más que la suscripción anual de casi cualquier herramienta."],
      ["Editores y IA", "Un IDE con buena integración de IA no es un juguete: es un multiplicador diario."],
      ["Servicios gestionados", "Base de datos, colas y observabilidad gestionadas eliminan trabajo que no diferencia tu producto."],
      ["Cuándo sí ahorrar", "Cuando pagas por lujo o por miedo, no cuando pagas por productividad medible."],
    ],
    conclusion: "Elige herramientas con la misma seriedad que eliges equipo. Ninguna suscripción sensata es cara comparada con el tiempo que ahorra.",
  },
  {
    title: "Green IT: cómo hacer que tu app consuma menos y contamine menos",
    category: "Cloud",
    tags: ["Sostenibilidad", "Green IT", "Eficiencia"],
    intro: "Cada petición que sirves consume energía. Optimizar por eficiencia no es solo por planeta: es por factura.",
    points: [
      ["Medir primero", "Sin métricas de watt-hora o CO2 por petición, cualquier optimización es adivinar."],
      ["Región importa", "Elegir regiones con matriz eléctrica más limpia baja la huella sin tocar código."],
      ["Cache y estáticos", "Cachear bien y servir estáticos desde CDN suele reducir emisiones más que reescribir en un lenguaje más rápido."],
      ["Hardware moderno", "ARM y NPUs suelen dar más rendimiento por vatio que x86 tradicional para muchas cargas."],
    ],
    conclusion: "Green IT es al final buena ingeniería: menos recursos por unidad de trabajo útil. Ganan usuarios, empresa y planeta.",
  },
  {
    title: "Cómo elegir framework frontend sin arrepentirte en dos años",
    category: "Desarrollo",
    tags: ["Frontend", "React", "Frameworks"],
    intro: "React, Vue, Svelte, Solid, Qwik. La lista crece cada año. Un método simple para no equivocarte demasiado.",
    points: [
      ["Talento disponible", "Un framework popular es más fácil de contratar. Nichos brillantes pueden dejarte sin equipo."],
      ["Estabilidad", "Un framework con roadmap claro y respaldo de una empresa grande tiende a envejecer mejor."],
      ["Ecosistema", "Libraries, integraciones y stack meta (Next, Nuxt, SvelteKit) importan tanto como el framework base."],
      ["El código que escribes", "Componentes y hooks son transferibles entre frameworks. Prioriza patrones sobre sintaxis."],
    ],
    conclusion: "Elige aburrido cuando el negocio dependa de ello. Guarda los frameworks brillantes para proyectos donde el aprendizaje sea parte del premio.",
  },
  {
    title: "Tests que sí valen la pena: pirámide, trofeo y sentido común",
    category: "Desarrollo",
    tags: ["Testing", "Calidad", "Ingeniería"],
    intro: "Discutir sobre cobertura sin hablar de valor produce tests inútiles. Aquí un marco práctico para escribir los que sí importan.",
    points: [
      ["Unitarios", "Rápidos y numerosos, ideales para lógica pura. Malos para probar integraciones reales."],
      ["Integración", "Prueban módulos juntos, incluida base de datos real cuando cabe. Suelen dar el mejor retorno."],
      ["End to end", "Pocos, críticos y estables. Un E2E que falla cada dos por tres se acaba ignorando."],
      ["Contract testing", "Entre servicios, evita el falso sentido de seguridad de mockear al otro lado."],
    ],
    conclusion: "Buenos tests son los que fallan solo cuando algo real se rompe. Optimizar por eso, no por número, siempre paga.",
  },
  {
    title: "Servidores MCP: la nueva forma de dar herramientas a la IA",
    category: "Inteligencia Artificial",
    tags: ["MCP", "Agentes", "IA"],
    intro: "Model Context Protocol se está consolidando como estándar para exponer herramientas y datos a modelos de lenguaje.",
    points: [
      ["Qué resuelve", "Un protocolo común evita que cada aplicación reinvente cómo conectar LLMs con bases de datos, APIs y ficheros."],
      ["Casos claros", "Asistentes de código, agentes empresariales que leen documentos internos y pipelines de análisis."],
      ["Seguridad", "Autenticar, autorizar y auditar cada llamada de herramienta es más importante que la funcionalidad misma."],
      ["Ecosistema", "Cada vez más productos ofrecen servidor MCP oficial. Elegir clientes compatibles evita bloqueo."],
    ],
    conclusion: "MCP no es glamuroso, pero es la fontanería que hará posibles agentes útiles a gran escala.",
  },
  {
    title: "El backend perfecto para un side project en 2026",
    category: "Cloud",
    tags: ["Side project", "Backend", "Stack"],
    intro: "Elegir stack para un proyecto personal debería optimizar por tiempo hasta lanzar, no por currículum.",
    points: [
      ["Base gestionada", "Postgres o SQLite en un servicio gestionado te quita 90% del trabajo de operar datos."],
      ["Auth de terceros", "No implementes login desde cero. Un proveedor te da OAuth, MFA y magic links en horas."],
      ["Frontend en un solo sitio", "Un framework fullstack (Next, Nuxt, SvelteKit, TanStack Start) reduce contexto y complejidad."],
      ["Despliegue simple", "Push a git, deploy automático. Cualquier cosa más compleja para un side project es mala inversión."],
    ],
    conclusion: "El mejor stack para tu side project es el que te lleva a producción esta semana, no el que impresiona en una conferencia.",
  },
  {
    title: "Datos sintéticos: entrenar IA sin tocar datos personales",
    category: "Inteligencia Artificial",
    tags: ["Datos", "Privacidad", "Entrenamiento"],
    intro: "Los datos sintéticos permiten entrenar modelos, hacer tests y compartir datasets sin comprometer privacidad real.",
    points: [
      ["Cómo se generan", "Modelos generativos aprenden distribuciones reales y producen nuevos ejemplos que preservan patrones sin copiar registros."],
      ["Casos idóneos", "Testing de sistemas, entrenamiento cuando los datos reales son sensibles y aumento de clases minoritarias."],
      ["Riesgos", "Fuga de información si el generador memoriza; sesgos amplificados si el modelo original ya los tenía."],
      ["Evaluación", "Compara utilidad de modelo entrenado en sintético vs real. Sin eso, es imposible saber si funciona."],
    ],
    conclusion: "Los datos sintéticos no son magia, pero abren puertas donde antes había muros de cumplimiento normativo.",
  },
  {
    title: "Cómo mantener sano un monorepo grande",
    category: "Desarrollo",
    tags: ["Monorepo", "Herramientas", "Escala"],
    intro: "Los monorepos escalan bien cuando se cuidan. Sin disciplina, se convierten en el peor multi-repo de tu vida.",
    points: [
      ["Herramientas modernas", "Turborepo, Nx, Bazel y Moon aceleran builds y tests solo sobre lo que cambia."],
      ["Fronteras claras", "Reglas de dependencias entre paquetes evitan el spaguetti de imports cruzados."],
      ["CI incremental", "Ejecutar solo tests afectados por un cambio es la diferencia entre CI en 2 minutos y en 40."],
      ["Cultura", "Cambios grandes bien coordinados requieren procesos, no solo herramientas."],
    ],
    conclusion: "Un monorepo bien hecho es una ventaja competitiva. Uno mal hecho es una losa. La diferencia está en la disciplina diaria.",
  },
  {
    title: "Salud digital: cómo aprovechar wearables sin obsesionarse",
    category: "Gadgets",
    tags: ["Wearables", "Salud", "Datos"],
    intro: "Los wearables miden más que nunca, desde sueño hasta variabilidad cardíaca. Pero más datos no siempre es más salud.",
    points: [
      ["Métricas útiles", "Pasos, sueño y frecuencia cardíaca en reposo son señales robustas con impacto directo en decisiones."],
      ["Métricas ruidosas", "SpO2, temperatura y estrés dependen mucho de la implementación. Trátalas como tendencias, no valores absolutos."],
      ["Privacidad", "Tus datos de salud viajan a servidores de terceros. Elige proveedores con políticas claras y controles de exportación."],
      ["Cuándo desconectar", "Si un anillo empeora tu sueño porque te obsesionas con la puntuación, quítatelo. La ironía es demasiado grande."],
    ],
    conclusion: "Los wearables son herramientas potentes cuando informan hábitos, no cuando dictan estados de ánimo.",
  },
  {
    title: "Antipatrones en microservicios: los errores que veo una y otra vez",
    category: "Desarrollo",
    tags: ["Microservicios", "Arquitectura", "Antipatrones"],
    intro: "Microservicios pueden ser una gran solución. También pueden multiplicar la complejidad sin justificarla.",
    points: [
      ["El monolito distribuido", "Servicios acoplados temporalmente que solo pueden desplegarse juntos. Peor que un monolito, con más piezas."],
      ["Shared database", "Varios servicios compartiendo tablas rompen todas las promesas del modelo. Cada servicio, sus datos."],
      ["Sagas mal diseñadas", "Coordinación entre servicios sin idempotencia ni compensación produce estados inconsistentes silenciosos."],
      ["Observabilidad ausente", "Sin trazas distribuidas, depurar problemas cross-service es casi imposible."],
    ],
    conclusion: "Microservicios no son la solución por defecto: son una estrategia de escala organizacional que exige madurez técnica.",
  },
  {
    title: "Compilar Python: cómo Mojo, Nuitka y PyPy cambian el juego",
    category: "Desarrollo",
    tags: ["Python", "Rendimiento", "Compiladores"],
    intro: "Python es cómodo pero lento. Varias iniciativas atacan ese problema desde ángulos distintos, con resultados prometedores.",
    points: [
      ["PyPy", "JIT maduro con ganancias de 4-10x en código puro, aunque con incompatibilidades en librerías nativas."],
      ["Nuitka y Cython", "Compilan Python a C, ganando rendimiento y distribución sin runtime Python."],
      ["Mojo", "Superset de Python enfocado en IA, con rendimiento cercano a C++ en cargas numéricas específicas."],
      ["CPython acelerado", "El propio intérprete oficial ha mejorado mucho en versiones recientes con optimizaciones profundas."],
    ],
    conclusion: "Python ya no es sinónimo de lento por defecto. Elegir la variante correcta puede ahorrar rescribir en otro lenguaje.",
  },
  {
    title: "Del monorepo al pnpm workspaces: cómo migrar sin drama",
    category: "Desarrollo",
    tags: ["pnpm", "Monorepo", "JavaScript"],
    intro: "Consolidar proyectos JS/TS en un workspace con pnpm ahorra dependencias, mejora el CI y estandariza scripts.",
    points: [
      ["Ventajas concretas", "Instalación más rápida, dedupe eficiente y visibilidad clara de dependencias entre paquetes."],
      ["Migración por fases", "Empieza moviendo librerías internas. La app principal debería ser el último paso."],
      ["Tooling complementario", "Changesets para versionado, Turborepo o Nx para builds incrementales."],
      ["Errores comunes", "Duplicar dependencias entre paquetes, no fijar versiones y CI que no aprovecha el caché."],
    ],
    conclusion: "Consolidar en workspaces es una de esas mejoras que se sienten pequeñas pero pagan intereses cada semana.",
  },
];

const authors = ["Norvenxa"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function daysAgoISO(days: number): string {
  const d = new Date("2026-07-01T10:00:00Z");
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
}

export const ARTICLES: Article[] = seeds.map((s, i) => {
  const cat = CATEGORIES.find((c) => c.name === s.category)!;
  const paragraphs: string[] = [s.intro];
  for (const [h, p] of s.points) {
    paragraphs.push(`## ${h}`);
    paragraphs.push(p);
  }
  paragraphs.push(`## Conclusión`);
  paragraphs.push(s.conclusion);
  return {
    slug: slugify(s.title),
    title: s.title,
    description: s.intro.slice(0, 155),
    category: cat.name,
    categorySlug: cat.slug,
    author: authors[i % authors.length],
    date: daysAgoISO(i * 3),
    readingMinutes: 4 + (i % 5),
    tags: s.tags,
    cover: pickCover(cat.slug, s.title),
    content: paragraphs,
  };
});

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelated(slug: string, limit = 3): Article[] {
  const current = getArticle(slug);
  if (!current) return [];
  return ARTICLES.filter(
    (a) => a.slug !== slug && a.categorySlug === current.categorySlug,
  ).slice(0, limit);
}

export function byCategory(slug: string): Article[] {
  return ARTICLES.filter((a) => a.categorySlug === slug);
}
