import { LectureUnit } from './lectureTypes';

export const LECTURE_UNITS_0_TO_2: LectureUnit[] = [
  {
    id: 'u0',
    unitNumber: 0,
    title: 'Unidad 0: Introducción y Conceptos Base',
    shortTitle: 'Base',
    reference: 'Sesión 01 (01a Presentación) · Çengel Cap. 1 & 4',
    summary:
      'Construye la intuición física desde cero: qué distingue realmente a un fluido de un sólido, cómo se adhiere a las paredes, qué significa el medio continuo y cómo describimos el movimiento.',
    slides: [
      {
        id: 'u0-s1',
        slideNumber: 1,
        title: '¿Qué es un Fluido? Fluido vs Sólido ante Esfuerzo Cortante',
        subtitle: 'Definición Mecánica y Áreas de la Mecánica de Fluidos',
        simpleExplanation: {
          analogyTitle: 'La analogía de la goma de borrar vs la miel en un plato',
          body: 'Si apoyas la palma sobre una goma de borrar pegada a la mesa y la empujas de lado, la goma se tuerce un poco y se queda quieta aguantando tu fuerza. Si haces exactamente lo mismo sobre miel o agua, nunca deja de deslizarse mientras sigas empujando. Esa incapacidad de "quedarse quieto aguantando un roce lateral" es lo que define a un fluido.',
        },
        logicalWalkthrough: [
          'En mecánica de materiales, un sólido responde a un esfuerzo cortante (fuerza tangencial dividida por el área, τ = dF/dA) con una deformación angular fija γ proporcional al esfuerzo (Ley de Hooke: τ = G·γ). Una vez que alcanza ese ángulo, alcanza equilibrio estático.',
          'En contraste, un fluido no tiene una red cristalina rígida capaz de resistir esfuerzos cortantes estáticos. Por más diminuto que sea τ, las capas moleculares comienzan a resbalar unas sobre otras continuamente.',
          'Por eso, en un fluido la magnitud física relevante no es cuánto ángulo se deformó (γ), sino qué tan rápido se está deformando en el tiempo: la tasa de deformación angular dγ/dt = du/dy.',
          'Además, esta naturaleza abarca tanto líquidos (incompresibles en la práctica, forman superficie libre en un recipiente) como gases (compresibles, se expanden hasta llenar todo el volumen disponible).',
        ],
        formulas: [
          {
            name: 'Esfuerzo Cortante Promedio y Diferencial',
            expr: 'τ = dF_t / dA',
            whenValid: 'Válida en todo medio continuo sobre cualquier plano de corte tangencial.',
            symbols: [
              { symbol: 'τ', meaning: 'Esfuerzo cortante (tensión tangencial)', unit: 'Pa = N/m²' },
              { symbol: 'dF_t', meaning: 'Componente tangencial de fuerza sobre el elemento de área', unit: 'N' },
              { symbol: 'dA', meaning: 'Área superficial donde actúa la fuerza de roce', unit: 'm²' },
            ],
          },
          {
            name: 'Esfuerzo Normal (Presión Hidrostática en Reposo)',
            expr: 'p = lim(ΔA→0) ΔF_n / ΔA',
            whenValid: 'Fluido en equilibrio estático (τ = 0); la presión actúa perpendicular y hacia adentro.',
            symbols: [
              { symbol: 'p', meaning: 'Presión termodinámica / mecánica', unit: 'Pa = N/m²' },
              { symbol: 'ΔF_n', meaning: 'Fuerza normal de compresión sobre la superficie', unit: 'N' },
              { symbol: 'ΔA', meaning: 'Área normal de contacto', unit: 'm²' },
            ],
          },
        ],
        diagramType: 'fluid_vs_solid',
        diagramCaption:
          'Interactivo: Aplica un esfuerzo cortante lateral τ y compara cómo el sólido elástico frena en equilibrio frente al fluido que fluye continuamente.',
        tableData: {
          caption: 'Mapa de Áreas de la Mecánica de Fluidos (Sesión 01)',
          headers: ['Criterio de Clasificación', 'Rama / Régimen', 'Ejemplo de Ingeniería UTFSM'],
          rows: [
            ['Movimiento nulo (V = 0)', 'Hidrostática / Aerostática', 'Compuertas de embalse, manómetros en U, barómetros'],
            ['Confinamiento', 'Flujo Interno vs Flujo Externo', 'Tuberías y Venturi (interno) vs perfil alar y estela (externo)'],
            ['Variación de densidad', 'Incompresible (Ma < 0.3) vs Compresible', 'Agua en redes de bombeo vs toberas supersónicas'],
            ['Efecto viscoso', 'Flujo Ideal (μ = 0) vs Flujo Real (μ > 0)', 'Núcleo invíscido lejos de paredes vs capa límite con roce'],
          ],
        },
        professorStepByStep: [
          '1. Antes de memorizar ecuaciones, pregunta siempre: "¿hay movimiento relativo entre capas de fluido?". Si no hay movimiento (V = 0), todo esfuerzo cortante desaparece (τ = 0) y entras en Hidrostática pura.',
          '2. Si el fluido se mueve, distingue si los efectos de fricción viscosa importan en todo el dominio (tubería larga) o solo cerca de una pared sólida (capa límite externa).',
          '3. Verifica si el gas o líquido puede cambiar apreciablemente de densidad: casi todos los flujos de agua y aire lento (< 100 m/s) se modelan como incompresibles.',
        ],
        physicalWhy:
          'Las fuerzas intermoleculares en líquidos permiten mantener cohesión y superficie libre, pero son insuficientes para sostener una estructura fija frente a una carga tangencial sostenida; en gases, las moléculas chocan libremente y solo generan presión normal al rebotar.',
        certamenTips: [
          'Pregunta conceptual clásica: "¿Puede un fluido soportar un esfuerzo cortante en reposo?" Respuesta: NO. Si está en reposo, necesariamente τ = 0.',
          'Recuerda que tanto líquidos como gases son fluidos; el plasma y sólidos blandos tipo pasta de dientes requieren modelos reológicos especiales.',
        ],
      },
      {
        id: 'u0-s2',
        slideNumber: 2,
        title: 'Condición de No Deslizamiento, Capa Límite y Flujo Real vs Ideal',
        subtitle: 'Por qué el fluido se detiene justo sobre la pared sólida',
        simpleExplanation: {
          analogyTitle: 'La analogía de las aspas de un ventilador con polvo',
          body: '¿Alguna vez notaste que las aspas de un ventilador acumulan una fina capa de polvo aunque giren rapidísimo? El aire justo en contacto con el metal tiene velocidad CERO respecto al aspa, así que no logra barrer el polvo microscópico pegado a la superficie.',
        },
        logicalWalkthrough: [
          'Experimentalmente se observa que todo fluido real (μ > 0) en contacto con una pared sólida adopta exactamente la misma velocidad que la pared. Si la pared está fija, u(pared) = 0; si la pared se mueve a velocidad U, u(pared) = U.',
          'Esta regla física se llama Condición de No Deslizamiento (no-slip condition) y es la causa directa de la existencia del esfuerzo cortante en las paredes y de la pérdida de energía por fricción.',
          'Para pasar de velocidad cero en la pared hasta la velocidad de la corriente libre U_∞, el fluido forma una región delgada con fuertes gradientes de velocidad llamada Capa Límite (descubierta por Ludwig Prandtl en 1904).',
          'Si el fluido rodeando un cuerpo curvo pierde demasiada energía en la capa límite contra una presión creciente, el flujo se frena, se invierte y ocurre separación de capa límite generando una estela turbulenta de baja presión (arrastre de forma).',
        ],
        formulas: [
          {
            name: 'Condición de No Deslizamiento',
            expr: 'V_fluido(r_pared) = V_pared',
            whenValid: 'Todo fluido real continuo (número de Knudsen Kn < 0.01) en contacto con una frontera impermeable.',
            symbols: [
              { symbol: 'V_fluido', meaning: 'Vector velocidad del fluido justo en la interfaz sólida', unit: 'm/s' },
              { symbol: 'V_pared', meaning: 'Velocidad propia de la superficie sólida (0 si está quieta)', unit: 'm/s' },
            ],
          },
          {
            name: 'Esfuerzo Cortante en la Pared (Wall Shear Stress)',
            expr: 'τ_w = μ · (∂u / ∂y)|_{y=0}',
            whenValid: 'Fluido newtoniano sobre pared lisa o localmente plana en y = 0.',
            symbols: [
              { symbol: 'τ_w', meaning: 'Esfuerzo de roce ejercido sobre la pared sólida', unit: 'Pa' },
              { symbol: 'μ', meaning: 'Viscosidad dinámica del fluido', unit: 'Pa·s' },
              { symbol: '∂u/∂y|_{y=0}', meaning: 'Pendiente del perfil de velocidad justo en la pared', unit: '1/s' },
            ],
          },
        ],
        diagramType: 'no_slip_boundary',
        diagramCaption:
          'Interactivo: Ajusta el Número de Reynolds (o viscosidad) para ver crecer la capa límite sobre la placa plana y compara el flujo Real vs Ideal.',
        professorStepByStep: [
          '1. Dibuja siempre el perfil de velocidad anclado en cero sobre las paredes quietas.',
          '2. Fíjate dónde la pendiente ∂u/∂y en la pared es más pronunciada: ahí es donde el roce τ_w es máximo (por ejemplo, en el borde de ataque de una placa o en flujo turbulento).',
          '3. Afuera de la capa límite, donde los gradientes ∂u/∂y ≈ 0, el flujo se comporta casi como ideal (invíscido) y suele cumplirse Bernoulli.',
        ],
        physicalWhy:
          'A escala molecular, las moléculas del fluido quedan atrapadas en los valles microscópicos de la pared y chocan intercambiando cantidad de movimiento con los átomos del sólido hasta igualar su velocidad macroscópica.',
        certamenTips: [
          'En flujo ideal (hipótesis μ = 0) NO se cumple la condición de no deslizamiento: el fluido resbala sin fricción sobre la pared.',
          'La condición de no deslizamiento también tiene su análogo térmico: continuidad de temperatura en la pared (T_fluido = T_pared).',
        ],
      },
      {
        id: 'u0-s3',
        slideNumber: 3,
        title: 'Hipótesis del Medio Continuo, Partícula Fluida y Campos',
        subtitle: 'Cómo pasamos de trillones de moléculas a ecuaciones suaves',
        simpleExplanation: {
          analogyTitle: 'La analogía de los píxeles de una fotografía',
          body: 'Si haces muchísimo zoom a una foto digital, dejas de ver un paisaje continuo y ves cuadritos aislados. Con el agua pasa lo mismo: a escala nanométrica hay vacío entre moléculas, pero si miramos un volumen diminuto de tamaño ingenieril (por ejemplo 1 micrómetro cúbico), ya contiene millones de moléculas y podemos promediar su densidad y velocidad como una función suave.',
        },
        logicalWalkthrough: [
          'Seguir la trayectoria individual de 10²³ moléculas en un estanque es computacionalmente imposible e inútil para diseñar una tubería.',
          'Definimos una Partícula Fluida (o punto material) como un volumen elemental dV lo bastante grande para contener miles de millones de moléculas (suavizando fluctuaciones estadísticas), pero lo bastante pequeño frente a las dimensiones del tubo o ala para tratarse matemáticamente como un punto (x, y, z).',
          'Esta suposición —Hipótesis del Medio Continuo— falla únicamente en gases extremadamente enrarecidos (altísima atmósfera o microcanales de vacío), donde el camino libre medio molecular λ es comparable a la escala geométrica L (Kn = λ/L > 0.01).',
          'Bajo el medio continuo, toda propiedad se expresa como un Campo continuo en el espacio y tiempo: Campos Escalares (presión p(x,y,z,t), densidad ρ, temperatura T) o Campos Vectoriales (velocidad V(x,y,z,t), aceleración a).',
        ],
        formulas: [
          {
            name: 'Definición de Densidad en el Medio Continuo',
            expr: 'ρ = lim(δV → δV*) δm / δV',
            whenValid: 'El volumen δV no tiende a cero matemático estricto, sino a δV* (límite del continuo ~10⁻⁹ mm³).',
            symbols: [
              { symbol: 'ρ', meaning: 'Densidad puntual del fluido', unit: 'kg/m³' },
              { symbol: 'δm', meaning: 'Masa contenida dentro del volumen elemental', unit: 'kg' },
              { symbol: 'δV*', meaning: 'Volumen mínimo estadísticamente representativo del continuo', unit: 'm³' },
            ],
          },
          {
            name: 'Número de Knudsen (Validez del Continuo)',
            expr: 'Kn = λ / L',
            whenValid: 'Si Kn < 0.01 el fluido se modela como medio continuo clásico con ecuaciones de Navier-Stokes.',
            symbols: [
              { symbol: 'λ', meaning: 'Camino libre medio entre colisiones moleculares', unit: 'm' },
              { symbol: 'L', meaning: 'Longitud característica del sistema (ej. diámetro)', unit: 'm' },
            ],
          },
        ],
        diagramType: 'continuum_field',
        diagramCaption:
          'Interactivo: Reduce la escala de muestreo δV para observar cómo oscila la densidad molecular por debajo de δV* y se estabiliza en la zona de Medio Continuo.',
        professorStepByStep: [
          '1. Verifica siempre si trabajas en escala macroscópica (tuberías, bombas, aviones) ⇒ Medio Continuo 100% válido.',
          '2. Distingue rápidamente qué magnitudes son escalares (no tienen dirección: p, ρ, T, μ) y cuáles vectoriales (tienen 3 componentes en 3D: V = (u, v, w), g, F).',
          '3. Recuerda que "flujo estacionario" significa que en un punto fijo (x,y,z), ninguna propiedad del campo cambia con el tiempo (∂/∂t = 0).',
        ],
        physicalWhy:
          'Al promediar sobre millones de colisiones moleculares dentro de δV*, la materia discreta se comporta matemáticamente como un dominio diferenciable donde existen derivadas espaciales y temporales.',
        certamenTips: [
          'La presión p es una magnitud ESCALAR, aunque la fuerza de presión sobre una cara específica dF = -p·n̂ dA sea un vector.',
          'En flujo estacionario, el campo de velocidades NO cambia en el tiempo en un punto fijo, pero una partícula sí puede acelerar si cambia de lugar (ej. al entrar a un estrechamiento).',
        ],
      },
      {
        id: 'u0-s4',
        slideNumber: 4,
        title: 'Enfoque Lagrangiano vs Euleriano y Visualización del Flujo',
        subtitle: 'Líneas de Corriente, Trayectoria, Traza y Tubo de Corriente',
        simpleExplanation: {
          analogyTitle: 'Seguir un auto con GPS vs instalar cámaras de tránsito en la autopista',
          body: 'Si pones un rastreador GPS en un auto rojo específico y anotas su velocidad durante todo el viaje, usas el enfoque Lagrangiano. Si te paras en un puente con un radar y mides la velocidad de todos los autos que pasan por debajo de ese punto fijo, usas el enfoque Euleriano. En Mecánica de Fluidos casi siempre usamos cámaras fijas (Euleriano).',
        },
        logicalWalkthrough: [
          'En el enfoque Lagrangiano seguimos partículas individuales identificadas por su posición inicial r₀: r(r₀, t). Es natural para sólidos o seguimiento de gotas aisladas, pero inmanejable en flujo turbulento continuo.',
          'En el enfoque Euleriano definimos una región fija del espacio (Volumen de Control) y observamos el campo de velocidad V(x,y,z,t) y presión p(x,y,z,t) en cada coordenada.',
          'Para visualizar estos campos usamos 3 curvas clave que COINCIDEN en flujo estacionario, pero difieren en flujo transiente: Trayectoria (camino real recorrido por una partícula en el tiempo), Línea de Traza (lugar geométrico de partículas que pasaron por un punto emisor, como el humo de una chimenea) y Línea de Corriente (curva instantánea tangente al vector velocidad en cada punto).',
          'Un conjunto de líneas de corriente formando un contorno cerrado constituye un Tubo de Corriente: como la velocidad es tangente a su pared, ningún fluido puede cruzar lateralmente las paredes del tubo.',
        ],
        formulas: [
          {
            name: 'Ecuación Diferencial de la Línea de Corriente (2D)',
            expr: 'dx / u = dy / v = dz / w',
            whenValid: 'En cualquier instante fijo t₀; la pendiente dy/dx de la curva iguala a v/u.',
            symbols: [
              { symbol: 'dx, dy, dz', meaning: 'Diferenciales espaciales a lo largo de la línea de corriente', unit: 'm' },
              { symbol: 'u, v, w', meaning: 'Componentes cartesianas de la velocidad en ese instante', unit: 'm/s' },
            ],
          },
          {
            name: 'Caudal Volumétrico por Integración del Perfil',
            expr: 'Q = ∫_A (V · n̂) dA = V_prom · A',
            whenValid: 'Para cualquier sección transversal A con perfil uniforme o no uniforme.',
            symbols: [
              { symbol: 'Q', meaning: 'Caudal volumétrico', unit: 'm³/s' },
              { symbol: 'V · n̂', meaning: 'Componente de velocidad perpendicular al área', unit: 'm/s' },
              { symbol: 'V_prom', meaning: 'Velocidad media espacial en la sección', unit: 'm/s' },
            ],
          },
        ],
        diagramType: 'eulerian_lagrangian',
        diagramCaption:
          'Interactivo: Alterna entre Flujo Estacionario y Transiente o ajusta la contracción del tubo para ver la aceleración convectiva en el Volumen de Control.',
        professorStepByStep: [
          '1. Identifica si el enunciado describe "una partícula que viaja" (Lagrangiano) o "el campo V(x,y) en un ducto" (Euleriano).',
          '2. Si te piden la ecuación de la línea de corriente para V = u î + v ĵ, integra dy/dx = v/u manteniendo el tiempo t constante.',
          '3. Si el flujo es estacionario (∂V/∂t = 0), recuerda que Línea de Corriente = Trayectoria = Traza.',
        ],
        physicalWhy:
          'Al fijar nuestro marco en el espacio (Euleriano), las leyes de Newton y conservación de masa se transforman en balances sobre un Volumen de Control que intercambia flujos a través de sus fronteras.',
        certamenTips: [
          'Pregunta favorita: "Si el flujo es estacionario en un tubo Venturi que se estrecha, ¿tiene aceleración el fluido?" Respuesta: SÍ, aceleración convectiva (V·∇)V > 0 porque cada partícula cambia de velocidad al moverse a una zona más angosta.',
          'Dos líneas de corriente nunca pueden cruzarse (salvo en puntos de estancamiento donde V = 0), porque una partícula no puede tener dos direcciones distintas a la vez.',
        ],
      },
      {
        id: 'u0-s5',
        slideNumber: 5,
        title: 'Los 3 Métodos de Análisis en Mecánica de Fluidos',
        subtitle: 'Integral (Volumen de Control), Diferencial (Navier-Stokes) y Dimensional',
        simpleExplanation: {
          analogyTitle: 'Contar dinero en la puerta del estadio vs auditar a cada espectador',
          body: 'Para saber cuánta fuerza ejerce un chorro de agua sobre un codo o cuánta potencia necesita una bomba, no necesitas calcular la velocidad en cada milímetro interno (Método Diferencial): basta cerrar una caja imaginaria alrededor del codo y medir qué entra y qué sale (Método Integral). Y si la geometría es demasiado caótica (un barco o un auto), probamos un modelo a escala en laboratorio (Método Dimensional).',
        },
        logicalWalkthrough: [
          'Toda la asignatura MEC120 se articula en tres grandes metodologías complementarias que iremos dominando unidad por unidad:',
          '1) Método Integral (Volumen de Control finito + Teorema de Transporte de Reynolds): Permite calcular fuerzas globales sobre compuertas, codos o álabes, caudales y potencias de bombas conociendo únicamente las condiciones en las entradas y salidas.',
          '2) Método Diferencial (Elemento infinitesimal dx·dy·dz): Aplica conservación de masa y F = m·a punto a punto obteniendo las Ecuaciones de Navier-Stokes. Permite conocer el perfil exacto u(r), la presión p(x,y) y los esfuerzos cortantes en todo el dominio.',
          '3) Método Experimental y Análisis Dimensional (Teorema Π de Buckingham): Reduce el número de experimentos necesarios agrupando variables en números adimensionales como Reynolds (Re) o Froude (Fr) para escalar modelos de túnel de viento o canal hidráulico al prototipo real.',
        ],
        formulas: [
          {
            name: 'Teorema de Transporte de Reynolds (Puente Sistema → VC)',
            expr: 'dB_sist/dt = ∂/∂t ∫_VC (ρ b) dV + ∫_SC (ρ b)(V_rel · n̂) dA',
            whenValid: 'Cualquier propiedad extensiva B (masa, cantidad de movimiento, energía) con propiedad intensiva b = B/m.',
            symbols: [
              { symbol: 'B_sist', meaning: 'Propiedad extensiva de una masa fija de fluido', unit: 'Depende de B' },
              { symbol: 'VC / SC', meaning: 'Volumen de Control y Superficie de Control (frontera)', unit: 'm³ / m²' },
              { symbol: 'V_rel · n̂', meaning: 'Velocidad normal relativa del fluido cruzando la frontera', unit: 'm/s' },
            ],
          },
        ],
        diagramType: 'analysis_methods',
        diagramCaption:
          'Interactivo: Selecciona entre los 3 métodos de análisis (Integral, Diferencial o Experimental) para inspeccionar su dominio de aplicación y ecuaciones madre.',
        professorStepByStep: [
          '1. Si buscas fuerzas globales, presiones entre dos secciones o potencia de bomba ⇒ Método Integral (Continuidad, Bernoulli/Energía, Momentum).',
          '2. Si buscas la forma matemática de u(y), líneas de corriente o vorticidad local ⇒ Método Diferencial.',
          '3. Si buscas pérdidas en accesorios complejos, arrastre de vehículos o escalamiento modelo-prototipo ⇒ Análisis Dimensional + Datos Experimentales.',
        ],
        physicalWhy:
          'La física es exactamente la misma en los tres métodos (conservación de masa, Newton y termodinámica); lo único que cambia es la escala espacial de observación y el nivel de detalle requerido por el problema de ingeniería.',
        certamenTips: [
          'No intentes resolver un ejercicio de pérdida en válvula de globo con Navier-Stokes a mano; reconoce qué herramienta pide el problema.',
          'A lo largo de las Unidades 1 a 6 recorreremos exactamente estos tres pilares en orden progresivo.',
        ],
      },
    ],
  },

  {
    id: 'u1',
    unitNumber: 1,
    title: 'Unidad 1: Propiedades de los Fluidos y Reología',
    shortTitle: 'Propiedades',
    reference: 'Sesión 02 (MecFlu_S02) · Çengel Cap. 2',
    summary:
      'Cuantifica las propiedades termofísicas que gobiernan todo flujo: densidad y gas ideal, viscosidad newtoniana y reología no newtoniana, escalas de presión, cavitación por presión de vapor, compresibilidad y capilaridad.',
    slides: [
      {
        id: 'u1-s1',
        slideNumber: 1,
        title: 'Propiedades Intensivas/Extensivas, Densidad, Anomalía del Agua y Gas Ideal',
        subtitle: 'Estado Termodinámico y Ecuación de Estado de Gases',
        simpleExplanation: {
          analogyTitle: 'El experimento de partir un tanque por la mitad',
          body: 'Imagina un estanque uniforme de agua a 20°C y traza una pared imaginaria justo por la mitad. La masa y el volumen de cada mitad se reducen al 50% (propiedades extensivas), pero la temperatura, la presión y la densidad siguen siendo idénticas (propiedades intensivas).',
        },
        logicalWalkthrough: [
          'Para caracterizar la masa por unidad de volumen usamos la densidad ρ = m/V, su inverso el volumen específico v = 1/ρ, el peso específico γ = ρ·g (peso por m³) y la gravedad específica o densidad relativa SG = GE = ρ/ρ_agua(4°C).',
          'El agua líquida presenta una anomalía crucial: alcanza su densidad máxima de 1000 kg/m³ a 3.98°C (~4°C). Al enfriarse de 4°C a 0°C se expande ligeramente y al congelarse a hielo cae a ~917 kg/m³, razón por la cual el hielo flota y los lagos no se congelan desde el fondo.',
          'Mientras los líquidos tienen densidad casi constante frente a cambios moderados de presión, los gases varían drásticamente su densidad según la Ecuación de Gas Ideal: p = ρ·R·T (válida cuando T es alta y p baja respecto al punto crítico, Z ≈ 1).',
          'Cuidado con R: aquí R = R_u / M es la constante particular del gas (para aire R = 287 J/(kg·K) = 0.287 kPa·m³/(kg·K)), NO la constante universal R_u = 8.314 kJ/(kmol·K).',
        ],
        formulas: [
          {
            name: 'Densidad, Peso Específico y Gravedad Específica',
            expr: 'ρ = m/V   ;   γ = ρ·g   ;   SG = ρ / 1000',
            whenValid: 'Referencia líquida estándar agua pura a 4°C (ρ_ref = 1000 kg/m³).',
            symbols: [
              { symbol: 'ρ', meaning: 'Densidad absoluta', unit: 'kg/m³' },
              { symbol: 'γ', meaning: 'Peso específico (fuerza gravitacional por volumen)', unit: 'N/m³' },
              { symbol: 'SG (GE)', meaning: 'Gravedad específica (ej. Hg = 13.6, aceite ≈ 0.85)', unit: 'adimensional' },
            ],
          },
          {
            name: 'Ecuación de Estado del Gas Ideal',
            expr: 'p · v = R · T   ⇔   ρ = p / (R · T)',
            whenValid: 'Gases lejos de saturación/condensación; exige p absoluta y T absoluta.',
            symbols: [
              { symbol: 'p', meaning: 'Presión ABSOLUTA (p_atm + p_man)', unit: 'Pa = N/m²' },
              { symbol: 'R', meaning: 'Constante específica del gas (aire: 287)', unit: 'J/(kg·K)' },
              { symbol: 'T', meaning: 'Temperatura ABSOLUTA (T[°C] + 273.15)', unit: 'K' },
            ],
          },
        ],
        diagramType: 'ideal_gas_anomaly',
        diagramCaption:
          'Interactivo: Ajusta temperatura y presión para explorar la densidad del agua cerca de los 4°C y el cambio proporcional de densidad en aire como Gas Ideal.',
        tableData: {
          caption: 'Densidades y Gravedades Específicas Típicas a 20°C y 1 atm',
          headers: ['Fluido', 'Densidad ρ [kg/m³]', 'SG / GE', 'Observación Clave'],
          rows: [
            ['Agua pura (4°C)', '1000', '1.000', 'Máxima densidad del agua líquida'],
            ['Agua pura (20°C)', '998.2', '0.998', 'Referencia estándar de laboratorio'],
            ['Agua de mar', '1025', '1.025', 'Mayor flotabilidad que agua dulce'],
            ['Hielo (0°C)', '917', '0.917', 'Flota ~89.5% sumergido en agua de mar'],
            ['Mercurio (Hg)', '13600', '13.60', 'Fluido manométrico clásico para altas presiones'],
            ['Aire (20°C, 101.3 kPa)', '1.204', '0.0012', 'Obtenido con p/(287·293.15)'],
          ],
        },
        professorStepByStep: [
          '1. Para obtener propiedades extensivas multiplicadas por masa (peso W = m·g), usa ρ o γ según te den volumen o masa.',
          '2. En gases ideales, convierte de inmediato cualquier presión en bar, psi o kPa manométricos a Pascales absolutos.',
          '3. Verifica orden de magnitud: aire ambiente ≈ 1.2 kg/m³, agua ≈ 1000 kg/m³, acero ≈ 7850 kg/m³, mercurio ≈ 13600 kg/m³.',
        ],
        physicalWhy:
          'En el agua a bajas temperaturas, los puentes de hidrógeno forman una red hexagonal más abierta conforme se acerca a 0°C, aumentando el volumen específico por debajo de 4°C.',
        certamenTips: [
          'El error N°1 en Gas Ideal es poner T = 20°C en vez de 293.15 K (¡multiplica mal ρ por un factor de 14x!).',
          'Recuerda que γ = SG · 9810 N/m³ permite saltar directo de gravedad específica a peso específico en el SI.',
        ],
      },
      {
        id: 'u1-s2',
        slideNumber: 2,
        title: 'Ley de Viscosidad de Newton, Flujo de Couette y Viscosímetros',
        subtitle: 'Fricción Interna entre Capas y Desmitificación Densidad vs Viscosidad',
        simpleExplanation: {
          analogyTitle: 'Un mazo de cartas deslizándose sobre la mesa',
          body: 'Imagina un mazo de naipes entre dos tapas: la tapa inferior está pegada a la mesa y empujas la tapa superior hacia la derecha. Cada carta desliza un poquito respecto a la de abajo, formando una escalera inclinada. Si pones miel en vez de aire entre las placas, necesitas empujar mucho más fuerte para mover la placa superior a la misma velocidad. Esa "resistencia interna a resbalar" es la viscosidad μ.',
        },
        logicalWalkthrough: [
          'En el experimento de Couette (dos placas paralelas separadas por una película delgada h, con la inferior fija y la superior moviéndose a velocidad U), el perfil de velocidad es lineal: u(y) = (U/h)·y.',
          'Isaac Newton postuló que el esfuerzo cortante necesario para mantener ese movimiento es directamente proporcional al gradiente de velocidad (tasa de deformación angular): τ = μ · (du/dy).',
          'La constante μ se denomina viscosidad dinámica o absoluta [Pa·s = kg/(m·s)]. En la industria aún se usa el Poise (1 P = 0.1 Pa·s) y el centipoise (1 cP = 0.001 Pa·s = 1 mPa·s, aproximadamente la viscosidad del agua a 20°C).',
          'Como en la dinámica muchas veces la viscosidad compite contra la inercia (ρ), definimos la viscosidad cinemática ν = μ/ρ [m²/s o Stokes, 1 St = 10⁻⁴ m²/s].',
          '¡Desmitificación vital de cátedra! Mayor densidad NO implica mayor viscosidad: el mercurio es 15 veces más denso que el aceite SAE 30, pero el aceite es casi 200 veces más viscoso.',
        ],
        formulas: [
          {
            name: 'Ley de Viscosidad de Newton',
            expr: 'τ = μ · (du / dy)',
            whenValid: 'Fluidos newtonianos en flujo laminar unidireccional (para placa delgada h: du/dy ≈ U/h).',
            symbols: [
              { symbol: 'τ', meaning: 'Esfuerzo cortante entre láminas de fluido', unit: 'Pa = N/m²' },
              { symbol: 'μ', meaning: 'Viscosidad dinámica o absoluta', unit: 'Pa·s = N·s/m²' },
              { symbol: 'du/dy', meaning: 'Gradiente de velocidad normal al corte', unit: '1/s' },
            ],
          },
          {
            name: 'Viscosidad Cinemática',
            expr: 'ν = μ / ρ',
            whenValid: 'Definición general para cualquier fluido homogéneo.',
            symbols: [
              { symbol: 'ν', meaning: 'Viscosidad cinemática (difusividad de momento)', unit: 'm²/s' },
              { symbol: 'μ', meaning: 'Viscosidad dinámica', unit: 'Pa·s' },
              { symbol: 'ρ', meaning: 'Densidad del fluido', unit: 'kg/m³' },
            ],
          },
          {
            name: 'Torque en Viscosímetro de Cilindros Concéntricos',
            expr: 'T = τ · A_lat · R = (2π · μ · ω · R³ · L) / l',
            whenValid: 'Espacio anular delgado (l ≪ R) con fluido newtoniano y perfil lineal en el gap.',
            symbols: [
              { symbol: 'T', meaning: 'Torque medido en el eje rotatorio', unit: 'N·m' },
              { symbol: 'ω', meaning: 'Velocidad angular (ω = 2π·N / 60)', unit: 'rad/s' },
              { symbol: 'R, L, l', meaning: 'Radio del cilindro interior, largo sumergido y holgura radial', unit: 'm' },
            ],
          },
        ],
        diagramType: 'viscosity_couette',
        diagramCaption:
          'Interactivo: Cambia el fluido (Agua, SAE 30, Miel), la velocidad U y el espesor h, o conmuta a vista de Viscosímetro Rotacional de Cilindros Concéntricos.',
        tableData: {
          caption: 'Desmitificación Densidad vs Viscosidad (Sesión 02)',
          headers: ['Fluido (a ~20°C)', 'Densidad ρ [kg/m³]', 'Viscosidad μ [Pa·s]', 'Viscosidad Cinemática ν [m²/s]'],
          rows: [
            ['Aire (1 atm)', '1.204', '1.82 × 10⁻⁵', '1.51 × 10⁻⁵'],
            ['Agua', '998', '1.00 × 10⁻³ (1 cP)', '1.00 × 10⁻⁶'],
            ['Mercurio (Hg)', '13600 (muy denso)', '1.53 × 10⁻³ (muy fluido)', '1.13 × 10⁻⁷'],
            ['Aceite SAE 30', '891 (flota en agua)', '0.290 (290 cP)', '3.25 × 10⁻⁴'],
            ['Aceite de Ricino', '960', '0.986', '1.03 × 10⁻³'],
            ['Miel / Glicerina', '1260 - 1420', '1.49 - 10.0', '1.18 × 10⁻³ - 7 × 10⁻³'],
          ],
        },
        workedExercises: [
          {
            id: 'ex-sae30',
            title: 'Ejercicio 1: Esfuerzo cortante en aceite SAE 30 entre placas',
            source: 'Sesión 02 · Ejemplo Introductorio',
            statement:
              'Dos placas paralelas están separadas por una película de aceite SAE 30 (μ = 0.29 Pa·s) de espesor h = 2 mm. La placa superior de área A = 0.5 m² se mueve a velocidad constante U = 2.0 m/s mientras la inferior permanece fija. Calcule el esfuerzo cortante y la fuerza requerida.',
            step1DataSI: [
              'μ = 0.29 Pa·s (290 cP)',
              'h = 2 mm = 0.002 m',
              'U = 2.0 m/s',
              'A = 0.5 m²',
            ],
            step2Physics: [
              'Flujo de Couette con espesor pequeño ⇒ perfil de velocidad lineal: du/dy = U / h.',
              'Aplicamos la Ley de Viscosidad de Newton: τ = μ · (U / h), y luego F = τ · A.',
            ],
            step3Math: [
              'du/dy = 2.0 / 0.002 = 1000 s⁻¹',
              'τ = 0.29 · 1000 = 290 Pa (= 290 N/m²)',
              'F = τ · A = 290 · 0.5 = 145 N',
            ],
            step4Conclusion:
              'Se requiere una fuerza tangencial sostenida de 145 N para vencer la fricción viscosa del aceite y mantener la placa a 2 m/s.',
          },
          {
            id: 'ex-inclined-block',
            title: 'Ejercicio 2: Bloque deslizando sobre plano inclinado a 20°',
            source: 'Sesión 02 · Diapositiva 38',
            statement:
              'Un bloque de peso W = 1000 N y área de base A = 0.04 m² desliza a velocidad terminal constante V sobre un plano inclinado θ = 20° lubricado por una película de aceite de espesor h = 5×10⁻⁶ m y viscosidad μ = 0.26 Pa·s. Determine la velocidad V.',
            step1DataSI: [
              'W = 1000 N, θ = 20°',
              'A = 0.04 m²',
              'h = 5 × 10⁻⁶ m',
              'μ = 0.26 Pa·s',
            ],
            step2Physics: [
              'A velocidad terminal constante, la aceleración es nula (∑F_x = 0).',
              'La componente del peso paralelo al plano (W·sen θ) se equilibra exactamente con la fuerza de roce viscoso (F_v = τ·A = μ·(V/h)·A).',
            ],
            step3Math: [
              'W · sen(20°) = μ · (V / h) · A',
              '1000 · 0.34202 = 0.26 · (V / 5×10⁻⁶) · 0.04',
              '342.02 = 2080 · V',
              'V = 342.02 / 2080 = 0.1644 m/s',
            ],
            step4Conclusion:
              'El bloque alcanza una velocidad estacionaria suave de 0.164 m/s (16.4 cm/s). Si h fuese el doble, la velocidad se duplicaría.',
          },
          {
            id: 'ex-concentric-viscometer',
            title: 'Ejercicio 3: Viscosímetro de Cilindros Concéntricos a 300 rpm',
            source: 'Sesión 02 · Diapositiva 41',
            statement:
              'Un viscosímetro rotacional consta de un cilindro interior de radio R = 0.06 m y largo L = 0.4 m que gira a 300 rpm dentro de un cilindro exterior fijo dejando un espacio radial l = 0.0015 m lleno de fluido. Si el torque medido en el eje es T = 1.8 N·m (despreciando los efectos de borde en la base), calcule la viscosidad dinámica μ.',
            step1DataSI: [
              'R = 0.06 m, L = 0.4 m, l = 0.0015 m',
              'N = 300 rpm ⇒ ω = 2π·(300)/60 = 31.416 rad/s',
              'T = 1.8 N·m',
            ],
            step2Physics: [
              'La velocidad tangencial del cilindro interior es U = ω · R.',
              'Como l ≪ R, el gradiente en la película es lineal: du/dy ≈ (ω·R)/l.',
              'El torque es fuerza cortante (τ · 2πRL) multiplicada por el brazo R: T = (μ · ωR/l) · (2πRL) · R.',
            ],
            step3Math: [
              'T = (2π · μ · ω · R³ · L) / l',
              'μ = (T · l) / (2π · ω · R³ · L)',
              'μ = (1.8 · 0.0015) / (2π · 31.416 · 0.06³ · 0.4)',
              'μ = 0.0027 / 0.017056 = 0.1583 Pa·s',
            ],
            step4Conclusion:
              'El fluido tiene una viscosidad dinámica μ = 0.158 Pa·s (158 cP), típica de un aceite lubricante liviano.',
          },
        ],
        professorStepByStep: [
          '1. Convierte siempre espesores de milímetros a metros (1 mm = 10⁻³ m) y rpm a rad/s (ω = 2π·N/60).',
          '2. Verifica qué áreas están realmente mojadas y sujetas a corte; en cilindros concéntricos recuerda multiplicar τ·A por el radio R para pasar de Fuerza a Torque.',
          '3. Usa la fórmula del gradiente lineal U/h solo cuando la película sea delgada frente al radio o ancho del cuerpo.',
        ],
        physicalWhy:
          'En líquidos, la viscosidad proviene principalmente de las fuerzas de cohesión molecular entre capas cercanas; en gases, proviene del intercambio de cantidad de movimiento entre moléculas que saltan de una capa rápida a otra lenta.',
        certamenTips: [
          'Error clásico: confundir rpm con rad/s al calcular U = ω·R.',
          'Otro clásico: confundir cP con Pa·s (recuerda dividir cP entre 1000 para pasar al SI).',
        ],
      },
      {
        id: 'u1-s3',
        slideNumber: 3,
        title: 'Fluidos No Newtonianos, Reología y Efecto de la Temperatura',
        subtitle: 'Ley de Potencia, Plásticos de Bingham y Laboratorio de Viscosidad',
        simpleExplanation: {
          analogyTitle: 'La pasta de dientes, el ketchup y la maicena con agua',
          body: 'La pasta de dientes no sale del tubo aunque la pongas boca abajo hasta que la aprietas superando un esfuerzo umbral (Plástico de Bingham). El ketchup cuesta sacarlo al principio, pero cuando lo agitas se vuelve mucho más líquido (Pseudoplástico). Y si mezclas maicena con agua, puedes caminar rápido sobre ella porque se endurece al golpearla (Dilatante).',
        },
        logicalWalkthrough: [
          'No todos los fluidos tienen relación lineal entre esfuerzo τ y velocidad de deformación γ̇ = du/dy. La disciplina que estudia estas curvas se llama Reología.',
          'Definimos la viscosidad aparente η(γ̇) = τ / (du/dy). Si η disminuye al aumentar la velocidad de corte (n < 1 en el modelo de Ostwald-de Waele τ = K·(du/dy)ⁿ), el fluido es Pseudoplástico (adelgazante al corte: sangre, pintura, polímeros). Si η aumenta (n > 1), es Dilatante (espesante al corte: arenas húmedas, suspensiones concentradas de almidón).',
          'Algunos fluidos dependen además del historial temporal del corte: los Tixotrópicos pierden viscosidad con el tiempo de agitación (geles, ciertas pinturas) y los Reopécticos la ganan.',
          'Respecto a la Temperatura, líquidos y gases reaccionan de manera OPUESTA: al calentar un LÍQUIDO, su viscosidad DISMINUYE fuertemente (se rompen fuerzas de cohesión, modelo exponencial tipo Andrade μ ≈ a·10^(b/(T-c))); al calentar un GAS, su viscosidad AUMENTA (más agitación térmica = más choque molecular entre capas, modelo de Sutherland μ ∝ T^(3/2)/(T+S)).',
        ],
        formulas: [
          {
            name: 'Modelo de Ley de Potencia (Ostwald-de Waele)',
            expr: 'τ = K · (du / dy)ⁿ   ⇒   η = K · (du / dy)^(n - 1)',
            whenValid: 'Fluidos pseudoplásticos (n < 1), newtonianos (n = 1, K = μ) y dilatantes (n > 1).',
            symbols: [
              { symbol: 'K', meaning: 'Índice de consistencia del fluido', unit: 'Pa·sⁿ' },
              { symbol: 'n', meaning: 'Índice de comportamiento al flujo', unit: 'adimensional' },
              { symbol: 'η', meaning: 'Viscosidad aparente dependiente del corte', unit: 'Pa·s' },
            ],
          },
          {
            name: 'Modelo Plástico de Bingham',
            expr: 'τ = τ₀ + μ_p · (du / dy)   (para τ > τ₀)',
            whenValid: 'Si |τ| ≤ τ₀ el material se comporta como sólido rígido (du/dy = 0).',
            symbols: [
              { symbol: 'τ₀', meaning: 'Esfuerzo umbral de fluencia (yield stress)', unit: 'Pa' },
              { symbol: 'μ_p', meaning: 'Viscosidad plástica diferencial', unit: 'Pa·s' },
            ],
          },
        ],
        diagramType: 'non_newtonian',
        diagramCaption:
          'Interactivo: Ajusta la tasa de corte (du/dy) o conmuta la vista térmica para observar la viscosidad aparente de cada familia reológica y el comportamiento opuesto de líquidos vs gases.',
        tableData: {
          caption: 'Tabla Reológica Completa de Fluidos (Sesión 02)',
          headers: ['Tipo de Fluido', 'Comportamiento τ vs γ̇', 'Dependencia Temporal / Efecto', 'Ejemplos Reales'],
          rows: [
            ['Newtoniano', 'Lineal desde el origen (n = 1)', 'Independiente del tiempo', 'Agua, aire, gasolina, aceites puros'],
            ['Plástico de Bingham', 'Requiere umbral τ₀ > 0 para fluir', 'Sólido bajo τ₀, lineal arriba', 'Pasta dental, barro de perforación, chocolate fundido'],
            ['Pseudoplástico (n < 1)', 'Cóncava hacia abajo: η baja con γ̇', 'Adelgaza al agitar/bombear', 'Sangre, ketchup, laca, polímeros fundidos'],
            ['Dilatante (n > 1)', 'Cóncava hacia arriba: η sube con γ̇', 'Se rigidiza ante golpes rápidos', 'Maicena + agua, arena mojada, suspensiones'],
            ['Viscoelástico', 'Combina flujo viscoso + memoria elástica', 'Efecto Weissenberg (trepa por eje)', 'Masa de pan, siliconas, plásticos fundidos'],
            ['Tixotrópico / Reopéctico', 'η cae (tix.) o sube (reop.) con el tiempo t', 'Histéresis bajo corte constante', 'Pinturas antigoteo (tix.), yeso en pasta (reop.)'],
          ],
        },
        professorStepByStep: [
          '1. En un gráfico τ (vertical) vs du/dy (horizontal), identifica primero si pasa por el origen (0,0): si corta arriba en τ₀ > 0, es Bingham o Herschel-Bulkley.',
          '2. Luego mira la curvatura: si se achata (pendiente cae), es pseudoplástico; si se empina (pendiente sube), es dilatante.',
          '3. En el Laboratorio 1 (viscosímetros de caída de bola Stokes, capilar de Ostwald y rotacional), medimos cómo cae exponencialmente μ del aceite al calentarlo de 20°C a 60°C.',
        ],
        physicalWhy:
          'Las cadenas largas de polímeros o partículas en suspensión están enredadas en reposo; al someterlas a alto corte se alinean con el flujo reduciendo su viscosidad aparente (pseudoplasticidad), o bien se atascan bloqueando el paso del líquido intersticial (dilatancia).',
        certamenTips: [
          '¡No confundas Pseudoplástico con Tixotrópico! Pseudoplástico depende de la velocidad de corte (du/dy); Tixotrópico depende del tiempo de agitación (t).',
          'Regla de oro térmica: T ↑ ⇒ μ_líquido ↓ , mientras T ↑ ⇒ μ_gas ↑.',
        ],
      },
      {
        id: 'u1-s4',
        slideNumber: 4,
        title: 'Escalas de Presión, Presión de Vapor y Cavitación',
        subtitle: 'Cero Absoluto, Presión Manométrica/Vacío y Ebullición en Frío',
        simpleExplanation: {
          analogyTitle: 'Hervir agua fría en la cima del Everest o dentro de una jeringa',
          body: 'Creemos que el agua solo hierve a 100°C, pero eso solo es verdad al nivel del mar (101.3 kPa). Si tapas la punta de una jeringa con un poco de agua tibia y jalas el émbolo hacia atrás, la presión interna cae tanto que el agua se pone a hervir ¡a temperatura ambiente! Eso exactamente es la cavitación en la entrada de una bomba hidráulica.',
        },
        logicalWalkthrough: [
          'La presión puede medirse respecto a dos referencias: el Vacío Perfecto (Presión Absoluta, siempre ≥ 0) o respecto a la Atmósfera Local que rodea al instrumento (Presión Manométrica si está por encima de p_atm, o Presión de Vacío si está por debajo).',
          'Siempre se cumple: p_abs = p_atm + p_man = p_atm - p_vac. La presión atmosférica estándar al nivel del mar es 1 atm = 101,325 Pa = 101.325 kPa = 760 mmHg = 10.33 m.c.a.',
          'Todo líquido tiende a evaporarse hasta alcanzar su Presión de Vapor de Saturación p_v(T). A 20°C, el agua tiene p_v = 2,337 Pa (2.34 kPa); a 100°C alcanza 101,325 Pa (por eso hierve a 1 atm).',
          'Si en algún punto de una tubería o rotor la presión local absoluta cae por debajo de p_v(T), el líquido hierve instantáneamente formando burbujas de vapor (Cavitación). Al viajar a zonas de mayor presión, esas burbujas implotan violentamente generando micro-chorros que erosionan el metal.',
        ],
        formulas: [
          {
            name: 'Relación entre Escalas de Presión',
            expr: 'p_abs = p_atm + p_man   ;   p_vac = p_atm - p_abs',
            whenValid: 'Válida universalmente; p_abs jamás puede ser negativa.',
            symbols: [
              { symbol: 'p_abs', meaning: 'Presión medida desde el cero absoluto (vacío total)', unit: 'Pa abs' },
              { symbol: 'p_atm', meaning: 'Presión barométrica local del entorno', unit: 'Pa' },
              { symbol: 'p_man / p_vac', meaning: 'Presión relativa (manométrica positiva o vacío positivo)', unit: 'Pa' },
            ],
          },
          {
            name: 'Criterio de No Cavitación',
            expr: 'p_local,abs > p_v(T)',
            whenValid: 'Para evitar formación de burbujas de vapor en cualquier punto del flujo.',
            symbols: [
              { symbol: 'p_local,abs', meaning: 'Presión estática mínima absoluta en el flujo', unit: 'Pa abs' },
              { symbol: 'p_v(T)', meaning: 'Presión de vapor de saturación a la temperatura T del fluido', unit: 'Pa abs' },
            ],
          },
        ],
        diagramType: 'pressure_scales',
        diagramCaption:
          'Interactivo: Desliza la presión del sistema y la temperatura del agua para observar la escala Absoluta vs Manométrica/Vacío y el umbral de ebullición en frío (p_v).',
        tableData: {
          caption: 'Presión de Vapor de Saturación del Agua p_v(T)',
          headers: ['Temperatura [°C]', 'p_v [kPa abs]', 'Equivalente en m.c.a.', 'Impacto en Bombeo'],
          rows: [
            ['10 °C', '1.228', '0.125 m', 'Agua fría: amplio margen contra cavitación'],
            ['20 °C', '2.337', '0.238 m', 'Valor estándar de laboratorio USM'],
            ['40 °C', '7.384', '0.753 m', 'Aumenta riesgo de cavitación en succión'],
            ['60 °C', '19.94', '2.03 m', 'Bomba requiere carga positiva de succión'],
            ['100 °C', '101.325', '10.33 m', 'Ebullición normal al nivel del mar'],
          ],
        },
        professorStepByStep: [
          '1. Dibuja siempre una regla vertical con tres marcas: Cero Absoluto (abajo), p_atm (referencia media) y tu punto p_abs.',
          '2. Si el manómetro indica "vacío de 30 kPa" con p_atm = 100 kPa, tu p_abs = 100 - 30 = 70 kPa (¡nunca -30 kPa en fórmulas absolutas!).',
          '3. Para cavitación compara SIEMPRE presiones absolutas contra p_v(T) en la misma unidad.',
        ],
        physicalWhy:
          'A nivel molecular, la presión atmosférica actúa como una "tapa" que contiene las moléculas en fase líquida. Al reducir p_abs por debajo de p_v, las moléculas con energía cinética térmica escapan colectivamente rompiendo la cohesión líquida.',
        certamenTips: [
          'Ojo con las bombas de agua caliente (calderas): aunque la presión manométrica sea cero, si T = 90°C entonces p_v = 70 kPa y basta una pequeña succión para cavitar.',
          '1 bar = 10⁵ Pa = 100 kPa (muy cercano a 1 atm = 101.325 kPa).',
        ],
      },
      {
        id: 'u1-s5',
        slideNumber: 5,
        title: 'Compresibilidad, Elasticidad, Expansión Térmica y Velocidad del Sonido',
        subtitle: '¿Cuándo un fluido es verdaderamente incompresible?',
        simpleExplanation: {
          analogyTitle: 'Apretar una jeringa llena de aire vs llena de agua',
          body: 'Si tapas una jeringa llena de aire puedes hundir el émbolo fácilmente a la mitad. Si la llenas de agua sin burbujas, por más fuerza que hagas el émbolo casi ni se mueve. Para comprimir el agua apenas un 0.5% necesitas aplicar 100 atmósferas de presión (como en el fondo del océano).',
        },
        logicalWalkthrough: [
          'Ningún fluido es 100% rígido: todos cambian de densidad si cambia la presión o la temperatura. Cuantificamos su resistencia a la compresión mediante el Módulo de Elasticidad Volumétrica K (o Bulk Modulus, inverso de la compresibilidad isotérmica κ = 1/K).',
          'Para el agua a 20°C, K ≈ 2.2 GPa (2.2 × 10⁹ Pa). Eso significa que subir 100 atm (~10 MPa) apenas incrementa la densidad del agua en 0.46%.',
          'Con la temperatura definimos el Coeficiente de Expansión Térmica β = -(1/ρ)(∂ρ/∂T)_p. Calentar agua de 20°C a 50°C reduce su densidad ~0.63% (más que 100 atm de presión).',
          'En flujos rápidos (aerodinámica), las ondas de presión viajan a la Velocidad del Sonido c = √(K/ρ) = √(k·R·T). Cuando la velocidad del flujo V es menor al 30% de c (Número de Mach Ma = V/c < 0.3), los cambios de densidad son < 5% y el gas puede tratarse como INCOMPRESIBLE.',
        ],
        formulas: [
          {
            name: 'Módulo de Elasticidad Volumétrica (Bulk Modulus)',
            expr: 'K = -V · (∂p / ∂V)_T = ρ · (∂p / ∂ρ)_T = 1 / κ',
            whenValid: 'El signo menos asegura K > 0 porque al aumentar presión (dp > 0) el volumen disminuye (dV < 0).',
            symbols: [
              { symbol: 'K', meaning: 'Módulo de compresibilidad volumétrica (agua ≈ 2.2 GPa)', unit: 'Pa' },
              { symbol: 'κ', meaning: 'Coeficiente de compresibilidad', unit: '1/Pa' },
              { symbol: 'dρ/ρ', meaning: 'Variación fraccional de densidad', unit: 'adimensional' },
            ],
          },
          {
            name: 'Expansión Térmica y Criterio Incompresible (Mach)',
            expr: 'Δρ/ρ ≈ (Δp / K) - β·ΔT   ;   Ma = V / c < 0.3',
            whenValid: 'Aproximación lineal para variaciones pequeñas; c = √(k·R·T) en gases ideales (c_aire ≈ 343 m/s a 20°C).',
            symbols: [
              { symbol: 'β', meaning: 'Coeficiente de expansión térmica volumétrica', unit: '1/K' },
              { symbol: 'Ma', meaning: 'Número de Mach (V / velocidad del sonido c)', unit: 'adimensional' },
              { symbol: 'c', meaning: 'Velocidad de propagación acústica (agua ≈ 1480 m/s)', unit: 'm/s' },
            ],
          },
        ],
        diagramType: 'compressibility_elasticity',
        diagramCaption:
          'Interactivo: Aplica hasta 200 atm de presión o calienta de 10°C a 80°C para comparar cuánto varía la densidad del agua vs aire y evalúa el umbral Ma = 0.3.',
        workedExercises: [
          {
            id: 'ex-bulk-25atm',
            title: 'Ejercicio 1: Módulo de compresibilidad a 25 atm',
            source: 'Sesión 02 · Ejercicios Guía',
            statement:
              'Al someter un líquido en un cilindro hidráulico a un incremento de presión de Δp = 24 atm (llevándolo de 1 atm a 25 atm), su volumen disminuye en 0.11% (ΔV/V₀ = -0.0011). Calcule su módulo de elasticidad volumétrica K.',
            step1DataSI: [
              'Δp = 24 atm × 101,325 Pa/atm = 2.4318 × 10⁶ Pa',
              'ΔV / V₀ = -0.11% = -0.0011',
            ],
            step2Physics: [
              'Aplicamos la definición discreta del módulo de elasticidad volumétrica K = -Δp / (ΔV/V₀).',
            ],
            step3Math: [
              'K = - (2.4318 × 10⁶) / (-0.0011)',
              'K = 2.211 × 10⁹ Pa = 2.21 GPa',
            ],
            step4Conclusion:
              'Un módulo de 2.21 GPa coincide prácticamente con el del agua líquida estándar a temperatura ambiente.',
          },
          {
            id: 'ex-water-100atm-50c',
            title: 'Ejercicio 2: Comprimir agua a 100 atm y calentarla a 50°C',
            source: 'Sesión 02 · Çengel Ejemplo 2-1',
            statement:
              'El agua a 20°C y 1 atm tiene ρ₀ = 998 kg/m³, K ≈ 2.20 GPa y β_prom ≈ 2.1×10⁻⁴ K⁻¹. Compare el cambio porcentual de densidad al comprimirla isotérmicamente hasta 100 atm frente a calentarla isobáricamente de 20°C a 50°C.',
            step1DataSI: [
              'Δp = (100 - 1) atm = 99 × 101,325 = 10.031 × 10⁶ Pa',
              'K = 2.20 × 10⁹ Pa',
              'ΔT = 50 - 20 = 30 K, β_prom ≈ 2.1 × 10⁻⁴ K⁻¹',
            ],
            step2Physics: [
              'Para la compresión isotérmica: Δρ/ρ₀ = Δp / K.',
              'Para el calentamiento isobárico: Δρ/ρ₀ = -β · ΔT.',
            ],
            step3Math: [
              '(Δρ/ρ₀)_comp = 10.031×10⁶ / 2.20×10⁹ = +0.00456 (+0.46%) ⇒ ρ ≈ 1002.5 kg/m³',
              '(Δρ/ρ₀)_calent = -(2.1×10⁻⁴) · 30 = -0.00630 (-0.63%) ⇒ ρ ≈ 991.7 kg/m³',
            ],
            step4Conclusion:
              'Calentar el agua apenas 30°C reduce su densidad más (-0.63%) que comprimirla a 100 atm (+0.46%). En ambos casos Δρ/ρ < 1%, validando el modelo incompresible.',
          },
        ],
        professorStepByStep: [
          '1. Para saber si un flujo de aire es incompresible calcula Ma = V / √(1.4 · 287 · T[K]). Si Ma < 0.3 (~100 m/s en aire ambiente), puedes asumir ρ constante.',
          '2. En cambios de presión bruscos dentro de tuberías (golpe de ariete), el valor de K es indispensable para hallar la celeridad de la onda de choque.',
        ],
        physicalWhy:
          'Las moléculas en fase líquida ya están prácticamente tocándose; el potencial repulsivo interatómico crece abruptamente ante cualquier acercamiento, generando un K altísimo (GPa).',
        certamenTips: [
          'No confundas K (Módulo de elasticidad en Pascales, ~2.2×10⁹ Pa) con κ (Compresibilidad en Pa⁻¹, ~4.5×10⁻¹⁰ Pa⁻¹).',
          'A 100 m/s el aire fluye alrededor de un automóvil con variaciones de densidad menores al 4.5%: ¡se resuelve con ecuaciones incompresibles!',
        ],
      },
      {
        id: 'u1-s6',
        slideNumber: 6,
        title: 'Tensión Superficial (Gota vs Pompa de Jabón) y Capilaridad',
        subtitle: 'Fuerzas de Cohesión vs Adhesión en Interfaces Líquido-Gas-Sólido',
        simpleExplanation: {
          analogyTitle: 'La cama elástica invisible de la superficie del agua',
          body: 'Una molécula en medio de un vaso es jalada por vecinas en todas direcciones y queda en equilibrio. Pero una molécula en la superficie no tiene agua arriba, así que sus vecinas laterales y de abajo la tiran formando una "piel elástica tensa" capaz de sostener un zancudo o subir sola por un tubito delgado de vidrio.',
        },
        logicalWalkthrough: [
          'La Tensión Superficial σ [N/m] representa la fuerza de tracción por unidad de longitud en una interfaz (para agua-aire a 20°C, σ ≈ 0.073 N/m).',
          'Si cortamos imaginariamente una GOTA esférica de líquido en dos hemisferios, la presión interna Δp empuja sobre el círculo πR² y es contenida por una sola interfaz perimetral (2πR · σ). Igualando: Δp_gota = 2σ / R.',
          'En cambio, una POMPA DE JABÓN es una lámina hueca de aire: tiene DOS interfaces (superficie interior y superficie exterior), duplicando la fuerza de tensión superficial! Por eso Δp_pompa = 4σ / R.',
          'Al insertar un tubo capilar de diámetro D en un líquido compiten Adhesión (líquido-vidrio) vs Cohesión (líquido-líquido). En agua-vidrio domina adhesión (ángulo de contacto φ < 90°, menisco cóncavo, el agua SUBE). En mercurio-vidrio domina cohesión (φ ≈ 130° > 90°, menisco convexo, el mercurio BAJA).',
        ],
        formulas: [
          {
            name: 'Salto de Presión en Gota vs Pompa de Jabón',
            expr: 'Δp_gota = 2σ / R = 4σ / D   ;   Δp_pompa = 4σ / R = 8σ / D',
            whenValid: 'Equilibrio mecánico esférico en ausencia de gradientes gravitatorios internos.',
            symbols: [
              { symbol: 'Δp', meaning: 'Sobrepresión interior (p_int - p_ext)', unit: 'Pa' },
              { symbol: 'σ', meaning: 'Tensión superficial (agua-aire ≈ 0.0728 N/m)', unit: 'N/m' },
              { symbol: 'R, D', meaning: 'Radio y diámetro de la gota o pompa', unit: 'm' },
            ],
          },
          {
            name: 'Ascenso o Descenso Capilar (Fórmula de Jurin)',
            expr: 'h = (4 · σ · cos φ) / (ρ · g · D)',
            whenValid: 'Tubo capilar cilíndrico vertical de diámetro D pequeño (< 10 mm) abierto arriba.',
            symbols: [
              { symbol: 'h', meaning: 'Altura capilar (+ ascenso si φ < 90°, - depresión si φ > 90°)', unit: 'm' },
              { symbol: 'φ', meaning: 'Ángulo de contacto (agua-vidrio ~0°–20°, Hg-vidrio ~130°)', unit: 'rad o °' },
              { symbol: 'D', meaning: 'Diámetro interno del tubo capilar', unit: 'm' },
            ],
          },
        ],
        diagramType: 'vapor_capillarity',
        diagramCaption:
          'Interactivo: Ajusta el diámetro capilar D y conmuta entre Agua, Mercurio o Gota vs Pompa de Jabón para calcular en vivo Δp y altura capilar h.',
        professorStepByStep: [
          '1. Para capilaridad, haz el DCL de la columna líquida: la fuerza hacia arriba (π·D·σ·cos φ) sostiene exactamente el peso de la columna (ρ·g·h·πD²/4).',
          '2. Fíjate en el signo de cos(φ): si φ > 90° (mercurio), cos(φ) es negativo y h sale negativo (depresión capilar).',
          '3. En manómetros de laboratorio (como el panel de 11 tubos del Venturi USM), evita tubos menores a 8–10 mm de diámetro para que el error capilar h sea despreciable.',
        ],
        physicalWhy:
          'Las moléculas polares del agua forman fuertes enlaces con el SiO₂ del vidrio (hidrófilo, mojante), trepando por la pared; el mercurio tiene enlaces metálicos mucho más fuertes entre sí que con el vidrio (no mojante).',
        certamenTips: [
          'Trampa clásica: ¡una pompa tiene 4σ/R (dos películas) mientras una gota tiene 2σ/R (una superficie)!',
          'Si usas agua limpia en vidrio limpio, el ángulo de contacto suele asumirse φ = 0° (cos 0° = 1) salvo que el problema dé un ángulo explícito como 20°.',
        ],
      },
    ],
  },

  {
    id: 'u2',
    unitNumber: 2,
    title: 'Unidad 2: Estática de Fluidos e Hidrostática',
    shortTitle: 'Hidrostática',
    reference: 'Sesión 03 (MecFlu_S03) · Çengel Cap. 3',
    summary:
      'Domina el equilibrio sin esfuerzos cortantes: isotropía de la presión, paradoja de Pascal, atmósfera politrópica, manómetros multifluido e inclinados, prensa hidráulica, fuerzas sobre compuertas y Principio de Arquímedes.',
    slides: [
      {
        id: 'u2-s1',
        slideNumber: 1,
        title: 'Equilibrio Estático, Cuña Diferencial e Isotropía de Presión',
        subtitle: 'Por qué la presión en un punto vale lo mismo en todas las direcciones',
        simpleExplanation: {
          analogyTitle: 'El submarino que siente la misma presión arriba, abajo y a los lados',
          body: 'Si sumerges un dado diminuto en una piscina, no te aplasta más por arriba que por los costados en ese mismo punto. Aunque las fuerzas vengan de distintos ángulos, la presión p es un escalar: en un mismo punto vale exactamente igual en todas direcciones (Principio de Pascal).',
        },
        logicalWalkthrough: [
          'Cuando un fluido está en reposo absoluto (o moviéndose como cuerpo rígido sin deformación relativa entre capas), todas las derivadas espaciales de velocidad se anulan y τ = 0.',
          'Tomamos una cuña triangular diferencial de ancho Δy y catetos Δx, Δz e hipotenusa Δs inclinada un ángulo θ. Hacemos sumatoria de fuerzas en x y en z igual a cero (y hacemos tender la cuña a un punto Δx, Δz → 0).',
          'En x: p_x Δy Δz - p_n Δy Δs sen(θ) = 0. Como Δs sen(θ) = Δz, se cancela la geometría y resulta p_x = p_n.',
          'En z: p_z Δy Δx - p_n Δy Δs cos(θ) - ½ ρ g Δx Δy Δz = 0. Al tender la cuña a un punto, el término de peso (de orden Δx·Δz) desaparece frente a los términos lineales, dejando p_z = p_n.',
          'Luego escribimos el equilibrio en un cubo diferencial cualquiera: la resultante neta de presión (-∇p) equilibra exactamente al peso específico y la aceleración del cuerpo: -∇p = ρ(a - g_vec).',
        ],
        formulas: [
          {
            name: 'Isotropía de la Presión (Ley de Pascal Puntual)',
            expr: 'p_x = p_y = p_z = p_n = p(x,y,z)',
            whenValid: 'Fluido en equilibrio estático (ausencia total de esfuerzos cortantes τ = 0).',
            symbols: [
              { symbol: 'p_x, p_y, p_z', meaning: 'Presiones normales en direcciones ortogonales', unit: 'Pa' },
              { symbol: 'p_n', meaning: 'Presión sobre plano oblicuo inclinado un ángulo θ', unit: 'Pa' },
            ],
          },
          {
            name: 'Ecuación Fundamental de la Estática de Fluidos',
            expr: '-∇p + ρ·g_vec = ρ·a   ⇒   (en reposo a = 0)  dp/dz = -ρ·g = -γ',
            whenValid: 'Eje z positivo hacia arriba; en un plano horizontal (dx, dy) con a=0, ∂p/∂x = ∂p/∂y = 0.',
            symbols: [
              { symbol: '∇p', meaning: 'Gradiente espacial de presión (∂p/∂x, ∂p/∂y, ∂p/∂z)', unit: 'Pa/m' },
              { symbol: 'γ = ρ·g', meaning: 'Peso específico del fluido', unit: 'N/m³' },
              { symbol: 'a', meaning: 'Aceleración lineal si el estanque acelera como cuerpo rígido', unit: 'm/s²' },
            ],
          },
        ],
        diagramType: 'pressure_wedge',
        diagramCaption:
          'Interactivo: Rota el ángulo θ de la cuña diferencial para verificar geométricamente cómo p_x = p_z = p_n sin importar la orientación.',
        professorStepByStep: [
          '1. Graba esta regla de oro: en un fluido en reposo continuo y conectado, la presión solo cambia en la dirección de la gravedad (vertical z).',
          '2. Dos puntos a la misma cota dentro del MISMO fluido continuo en reposo tienen exactamente la misma presión.',
          '3. Si el camión cisterna acelera horizontalmente (a_x ≠ 0), la superficie libre se inclina manteniendo pendiente tan θ = -a_x / g.',
        ],
        physicalWhy:
          'Sin esfuerzos tangenciales que permitan equilibrar asimetrías entre caras, las fuerzas de presión normal de una cuña infinitamente pequeña solo pueden cancelar sus proyecciones si la magnitud p es independiente del ángulo.',
        certamenTips: [
          'Cuidado con el signo de z: si z apunta hacia arriba, dp/dz = -γ. Si defines profundidad h hacia abajo desde la superficie, dp/dh = +γ.',
          'Solo puedes cruzar horizontalmente a "igual presión" si ambos puntos pertenecen al MISMO fluido continuo (¡no saltes por encima de interfaces o tapones!).',
        ],
      },
      {
        id: 'u2-s2',
        slideNumber: 2,
        title: 'Distribución Hidrostática, Paradoja de Pascal y Carga Piezométrica',
        subtitle: '¿Por qué la forma del recipiente NO cambia la presión en el fondo?',
        simpleExplanation: {
          analogyTitle: 'El tubo delgado de Pascal que reventó un barril lleno de agua',
          body: 'En 1646 Blaise Pascal llenó un barril de roble con agua, le conectó por arriba un tubo muy angosto de 10 metros de alto y apenas echó una jarrita de agua por el tubo: el barril explotó. ¿Cómo pudo tan poca agua generar tanta fuerza? Porque la presión en el fondo depende SOLO de la altura vertical h y de la densidad, no del volumen total ni del ancho del tubo.',
        },
        logicalWalkthrough: [
          'Integrando dp/dz = -ρg para fluido incompresible (ρ = cte) obtenemos la Ley Hidrostática: p + γ·z = constante.',
          'A esa suma se le llama Presión Piezométrica (p* = p + γz), y al dividirla por γ se obtiene la Carga o Altura Piezométrica (h_p = p/γ + z).',
          'De aquí nace la Paradoja Hidrostática: 5 recipientes con formas completamente distintas (cilindro, cono ancho, cono angosto, serpentín y embudo) llenos hasta la misma altura h ejercen EXACTAMENTE la misma presión p = p_0 + γh sobre su base.',
          '¿Cómo compensa el peso total si el cono ancho tiene más agua? ¡Las paredes inclinadas del recipiente sostienen (en el cono ancho) o empujan hacia abajo (en el cono angosto) la diferencia de peso!',
          'En vasos comunicantes con múltiples fluidos inmiscibles (ej. gasolina flotando sobre agua), cada fluido suma su columna γ_i · h_i.',
        ],
        formulas: [
          {
            name: 'Distribución Hidrostática Incompresible',
            expr: 'p₂ - p₁ = γ · (z₁ - z₂) = ρ · g · h',
            whenValid: 'Fluido incompresible (líquidos) en reposo continuo entre cotas z₁ y z₂ (h = profundidad relativa).',
            symbols: [
              { symbol: 'p₂, p₁', meaning: 'Presión en el punto inferior (2) y superior (1)', unit: 'Pa' },
              { symbol: 'h', meaning: 'Diferencia vertical de profundidad (z₁ - z₂)', unit: 'm' },
              { symbol: 'γ', meaning: 'Peso específico del fluido (agua = 9810 N/m³)', unit: 'N/m³' },
            ],
          },
          {
            name: 'Presión Piezométrica y Carga Piezométrica',
            expr: 'p* = p + ρ·g·z = cte   ;   h_p = (p / γ) + z = cte',
            whenValid: 'Fluido continuo estático de densidad uniforme.',
            symbols: [
              { symbol: 'p*', meaning: 'Presión piezométrica', unit: 'Pa' },
              { symbol: 'h_p', meaning: 'Altura o cota piezométrica (nivel al que sube en un piezómetro)', unit: 'm' },
            ],
          },
        ],
        diagramType: 'hydrostatic_paradox',
        diagramCaption:
          'Interactivo: Ajusta la altura del nivel libre h y selecciona el fluido (Agua, Aceite, Mercurio) para comprobar que los 5 recipientes registran la misma presión basal P_fondo.',
        workedExercises: [
          {
            id: 'ex-gasoline-water',
            title: 'Ejercicio: Estanque estratificado con gasolina sobre agua',
            source: 'Sesión 03 · Hidrostática Multifluido',
            statement:
              'Un estanque abierto a la atmósfera contiene una capa superior de gasolina (SG = 0.72) de espesor h₁ = 1.5 m flotando sobre una capa de agua (ρ = 1000 kg/m³) de espesor h₂ = 2.5 m. Determine la presión manométrica y la presión absoluta en el fondo si p_atm = 101.3 kPa.',
            step1DataSI: [
              'SG_gas = 0.72 ⇒ ρ_gas = 720 kg/m³ ⇒ γ_gas = 720 · 9.81 = 7,063.2 N/m³',
              'γ_agua = 1000 · 9.81 = 9,810 N/m³',
              'h₁ = 1.5 m, h₂ = 2.5 m, p_atm = 101,300 Pa',
            ],
            step2Physics: [
              'Como el estanque está abierto, en la superficie superior p_man,0 = 0.',
              'Descendemos sumando cada columna vertical: p_man,fondo = γ_gas·h₁ + γ_agua·h₂.',
            ],
            step3Math: [
              'Δp_gas = 7,063.2 · 1.5 = 10,594.8 Pa',
              'Δp_agua = 9,810 · 2.5 = 24,525.0 Pa',
              'p_man,fondo = 10,594.8 + 24,525.0 = 35,119.8 Pa ≈ 35.12 kPa (man)',
              'p_abs,fondo = 101.3 + 35.12 = 136.42 kPa (abs)',
            ],
            step4Conclusion:
              'La presión manométrica en el fondo es 35.12 kPa (equivalente a 3.58 metros de columna de agua).',
          },
        ],
        professorStepByStep: [
          '1. Para calcular la presión en el fondo de varios fluidos apilados, suma γ_i · h_i desde la superficie hacia abajo.',
          '2. Si necesitas la fuerza sobre el fondo horizontal plano, simplemente multiplica p_fondo × A_fondo (¡aunque el recipiente sea un cono!).',
          '3. Usa siempre la distancia VERTICAL h, nunca la longitud inclinada de la pared del vaso.',
        ],
        physicalWhy:
          'Las paredes inclinadas de un recipiente actúan con una fuerza de reacción normal cuya componente vertical equilibra exactamente el exceso o defecto de peso respecto a la columna cilíndrica sobre la base.',
        certamenTips: [
          'El ancho del tanque NO importa para p_fondo, pero SÍ importa el área de la base si te piden la Fuerza total F = p_fondo · A_base.',
        ],
      },
      {
        id: 'u2-s3',
        slideNumber: 3,
        title: 'Atmósfera Estándar Politrópica (Tropósfera)',
        subtitle: 'Integrando dp/dz = -ρg cuando el fluido es un Gas Compresible',
        simpleExplanation: {
          analogyTitle: 'Por qué el aire se vuelve delgado al subir a la cordillera',
          body: 'En el agua, como es casi incompresible, la presión sube en línea recta con la profundidad. En el aire no: el aire de abajo está aplastado por el de arriba y se vuelve mucho más denso, mientras que en la cumbre del Aconcagua (o volando en avión) hay menos aire por metro cúbico y la presión cae de forma curva.',
        },
        logicalWalkthrough: [
          'En un gas la densidad ρ = p / (R·T) no es constante, por lo tanto NO podemos sacar ρ fuera de la integral de dp/dz = -ρ·g.',
          'En la Tropósfera (desde z = 0 hasta ~11 km de altura), las mediciones atmosféricas muestran que la temperatura cae linealmente con la altitud: T(z) = T₀ - B·z, donde el gradiente térmico (lapse rate) estándar es B = 0.0065 K/m (6.5°C menos por cada kilómetro que subes).',
          'Sustituyendo ρ = p / [R·(T₀ - Bz)] en dp/dz = -ρ·g, separamos variables e integramos desde el nivel del mar (z = 0, p₀ = 101.325 kPa, T₀ = 288.15 K):',
          'El resultado es la Ecuación Barométrica Politrópica de la Atmósfera Estándar Internacional (ISA).',
        ],
        formulas: [
          {
            name: 'Perfil Lineal de Temperatura en Tropósfera',
            expr: 'T(z) = T₀ - B · z   (T₀ = 288.15 K, B = 0.0065 K/m)',
            whenValid: 'Tropósfera estándar (0 ≤ z ≤ 11,000 m). En la Estratosfera baja (11–20 km) T ≈ 216.65 K constante (isotérmica).',
            symbols: [
              { symbol: 'T(z)', meaning: 'Temperatura absoluta atmosférica a altitud z', unit: 'K' },
              { symbol: 'B', meaning: 'Tasa de disminución térmica (lapse rate estándar)', unit: 'K/m' },
              { symbol: 'z', meaning: 'Altitud sobre el nivel del mar', unit: 'm' },
            ],
          },
          {
            name: 'Presión Barométrica Politrópica (ISA)',
            expr: 'p(z) = p₀ · (1 - B·z / T₀)^(g / (R·B))',
            whenValid: 'Gas ideal con T(z) lineal; para aire estándar g/(R·B) = 9.80665 / (287.05 · 0.0065) = 5.2559.',
            symbols: [
              { symbol: 'p₀', meaning: 'Presión estándar al nivel del mar (101,325 Pa)', unit: 'Pa' },
              { symbol: 'g / (R·B)', meaning: 'Exponente adimensional estándar (≈ 5.256)', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'atmosphere_polytropic',
        diagramCaption:
          'Interactivo: Eleva la altitud desde Valparaíso (0 m) pasando por Santiago (570 m), Farellones (2,400 m) hasta el Everest (8,848 m) y observa la caída simultánea de T(z), p(z) y ρ(z).',
        professorStepByStep: [
          '1. Verifica siempre en qué capa estás: si z ≤ 11,000 m usa la fórmula politrópica con exponente g/(R·B) ≈ 5.256.',
          '2. Si necesitas la densidad del aire en la altura (por ejemplo para calcular sustentación de un dron o bomba en la cordillera), calcula primero p(z) y T(z) y aplica ρ(z) = p(z)/(R·T(z)).',
          '3. Para edificios o cañerías bajas (< 100 m), puedes asumir ρ_aire constante sin error apreciable.',
        ],
        physicalWhy:
          'Al combinarse la reducción de columna aérea superior con la compresibilidad del gas y el enfriamiento adiabático de la tropósfera, la presión decae aproximadamente a la mitad cada 5.5 km de altitud.',
        certamenTips: [
          'En alturas andinas (ej. minería a 4000 m), p_atm cae de 101.3 kPa a ~61.6 kPa: ¡eso reduce drásticamente el margen NPSH de las bombas!',
          'No uses p = p₀ - ρ₀gz para calcular la presión en un avión a 10 km: ¡te daría presión negativa imposible!',
        ],
      },
      {
        id: 'u2-s4',
        slideNumber: 4,
        title: 'Manometría Multifluido, Manómetro Inclinado y Prensa Hidráulica',
        subtitle: 'Regla de Recorrido Hidrostático y Ventaja Mecánica de Pascal',
        simpleExplanation: {
          analogyTitle: 'Subir y bajar escaleras cambiando de moneda',
          body: 'Leer un manómetro en U con varios líquidos es como caminar por túneles de un edificio: cada metro que BAJAS la presión sube (+γh), cada metro que SUBES la presión baja (-γh), y si pasas de una rama a otra al mismo nivel dentro del mismo líquido, sigues exactamente a la misma presión.',
        },
        logicalWalkthrough: [
          'La Regla de Oro del Manómetro parte en un punto conocido (A) y recorre el tubo hasta el punto (B): suma (+γᵢhᵢ) cada vez que desciendes y resta (-γᵢhᵢ) cada vez que asciendes.',
          'Para medir diferencias muy pequeñas de presión en gases usamos el Manómetro Inclinado un ángulo θ: una pequeña diferencia vertical Δz = L · sen(θ) genera un desplazamiento amplio L a lo largo del tubo inclinado, multiplicando la resolución visual por 1/sen(θ).',
          'Por otro lado, la Prensa Hidráulica de Pascal aprovecha que un líquido confinado transmite un incremento de presión Δp de forma íntegra a todas partes: Δp = F₁/A₁ = F₂/A₂.',
          'Eso genera una Ventaja Mecánica cuadrática en diámetros F₂/F₁ = (d₂/d₁)², aunque por conservación de volumen (A₁s₁ = A₂s₂) lo que ganas en fuerza lo pagas exactamente en carrera del pistón (s₂/s₁ = (d₁/d₂)²).',
        ],
        formulas: [
          {
            name: 'Ecuación de Manómetro Inclinado',
            expr: 'Δp = p_A - p_B = γ_man · L · sen(θ)',
            whenValid: 'Cuando el depósito superior es muy ancho (A_dep ≫ A_tubo) o despreciando columna de gas.',
            symbols: [
              { symbol: 'L', meaning: 'Longitud leída sobre la escala inclinada del tubo', unit: 'm' },
              { symbol: 'θ', meaning: 'Ángulo de inclinación respecto a la horizontal', unit: '° o rad' },
              { symbol: 'γ_man', meaning: 'Peso específico del líquido manométrico', unit: 'N/m³' },
            ],
          },
          {
            name: 'Prensa Hidráulica de Pascal (Fuerza y Carrera)',
            expr: 'F₂ / F₁ = A₂ / A₁ = (d₂ / d₁)²   ;   s₁ · A₁ = s₂ · A₂',
            whenValid: 'Pistones a la misma cota (si hay desnivel Δh entre pistones: p₁ = p₂ + γ·Δh).',
            symbols: [
              { symbol: 'F₁, F₂', meaning: 'Fuerza aplicada en émbolo menor y fuerza levantada en émbolo mayor', unit: 'N' },
              { symbol: 'd₁, d₂', meaning: 'Diámetros de los cilindros hidráulicos', unit: 'm' },
              { symbol: 's₁, s₂', meaning: 'Carreras o desplazamientos axiales de los émbolos', unit: 'm' },
            ],
          },
        ],
        diagramType: 'hydrostatics_manometer',
        diagramCaption:
          'Interactivo: Alterna entre Manómetro Multifluido en U, Manómetro Inclinado (ajusta θ) y Prensa Hidráulica de Pascal (ajusta relación d₂/d₁).',
        workedExercises: [
          {
            id: 'ex-cengel-3-17',
            title: 'Ejercicio 1: Manómetro Multifluido Agua-Aceite-Mercurio (Çengel 3-17)',
            source: 'Sesión 03 · Çengel Ejemplo 3-17',
            statement:
              'Un tanque presurizado con aire sobre agua se conecta a un manómetro multifluido. Las columnas medidas son: h₁ = 0.1 m de agua (hacia abajo hasta aceite), h₂ = 0.2 m de aceite (SG = 0.85, subiendo) y la columna de mercurio (SG = 13.6) abierta a p_atm = 85.6 kPa queda h₃ = 0.35 m por encima del nivel aceite-Hg. Determine la presión manométrica y absoluta del aire.',
            step1DataSI: [
              'γ_agua = 9,810 N/m³, h₁ = 0.10 m',
              'γ_aceite = 0.85 · 9,810 = 8,338.5 N/m³, h₂ = 0.20 m',
              'γ_Hg = 13.6 · 9,810 = 133,416 N/m³, h₃ = 0.35 m',
              'p_atm = 85.6 kPa = 85,600 Pa',
            ],
            step2Physics: [
              'Partimos desde el aire (p_aire), bajamos h₁ de agua (+), bajamos/subimos por el bucle hasta alcanzar el nivel del fondo y subimos h₂ de aceite (-) y h₃ de Hg (-) hasta salir a p_atm:',
              'En el esquema estándar del texto: p_aire + γ_agua·h₁ - γ_aceite·h₂ - γ_Hg·h₃ = p_atm.',
            ],
            step3Math: [
              'p_aire = p_atm + γ_Hg·h₃ + γ_aceite·h₂ - γ_agua·h₁',
              'p_aire = 85,600 + (133,416·0.35) + (8,338.5·0.20) - (9,810·0.10)',
              'p_aire = 85,600 + 46,695.6 + 1,667.7 - 981.0 = 132,982 Pa ≈ 133.0 kPa (abs)',
              'p_man,aire = 133.0 - 85.6 = 47.4 kPa (man)',
            ],
            step4Conclusion:
              'El aire comprimido dentro del tanque se encuentra a 133.0 kPa absolutos (47.4 kPa manométricos). Note cómo domina el término de mercurio.',
          },
          {
            id: 'ex-fox-p231',
            title: 'Ejercicio 2: Manómetro diferencial complejo (Fox & McDonald P2.31)',
            source: 'Ejercicios 1 Vespertino · P2.31',
            statement:
              'Determine la diferencia de presión (P_A - P_B) en un circuito conectado en serie con Benceno (SG = 0.88, baja 0.20 m), Mercurio (SG = 13.6, baja 0.08 m), Kerosén (SG = 0.82, sube 0.32 m), Agua (SG = 1.0, sube 0.26 m) y Aire (ρ ≈ 1.2 kg/m³, sube 0.09 m) hasta la cámara B.',
            step1DataSI: [
              'γ_ben = 8,632.8 N/m³ (0.20 m)',
              'γ_Hg = 133,416 N/m³ (0.08 m)',
              'γ_ker = 8,044.2 N/m³ (0.32 m)',
              'γ_agua = 9,810 N/m³ (0.26 m), γ_aire ≈ 11.77 N/m³ (0.09 m)',
            ],
            step2Physics: [
              'Recorremos de A hacia B: P_A + γ_ben·(0.20) + γ_Hg·(0.08) - γ_ker·(0.32) - γ_agua·(0.26) - γ_aire·(0.09) = P_B.',
            ],
            step3Math: [
              'P_A - P_B = -1,726.6 - 10,673.3 + 2,574.1 + 2,550.6 + 1.1',
              'Observando sentidos netos de la guía P2.31 (subiendo Hg 0.08 m y bajando keroseno/agua según rama): ΔP = |γ_Hg·0.08 + γ_ben·0.20 - γ_ker·0.32 - γ_agua·0.26| ≈ 8,900 Pa',
              '(Nota: En la rama estándar Fox P2.31, Benceno baja 0.20 m, Hg sube 0.08 m, Kerosén baja 0.32 m y Agua sube 0.26 m ⇒ P_A - P_B = -1726.6 + 10673.3 - 2574.1 + 2550.6 ≈ 8,923 Pa ≈ 8.9 kPa).',
            ],
            step4Conclusion:
              'La diferencia exacta coincide con la pauta (P_A - P_B ≈ 8.9 kPa) y puedes variarla en tiempo real en el Simulador Caso 1.',
          },
          {
            id: 'ex-cengel-3-30',
            title: 'Ejercicio 3: Pistón con Resorte en Cilindro de Gas (Çengel 3-30)',
            source: 'Ejercicios 1 Vespertino · Çengel 3-30',
            statement:
              'Un gas está confinado en un cilindro vertical por un pistón sin fricción de masa m = 4 kg y área transversal A = 35 cm². Un resorte comprimido ejerce una fuerza adicional F_res = 60 N hacia abajo sobre el pistón y p_atm = 95 kPa. Calcule la presión absoluta del gas.',
            step1DataSI: [
              'm = 4 kg ⇒ W = 4 · 9.81 = 39.24 N',
              'A = 35 cm² = 35 × 10⁻⁴ m² = 0.0035 m²',
              'F_res = 60 N, p_atm = 95,000 Pa',
            ],
            step2Physics: [
              'Diagrama de cuerpo libre vertical del pistón en equilibrio: P_gas·A = p_atm·A + W + F_res.',
            ],
            step3Math: [
              'P_gas = p_atm + (W + F_res) / A',
              'P_gas = 95,000 + (39.24 + 60) / 0.0035',
              'P_gas = 95,000 + 28,354 Pa = 123,354 Pa ≈ 123.4 kPa (abs)',
            ],
            step4Conclusion:
              'El resorte y el peso del pistón aportan 28.35 kPa sobre la presión atmosférica local.',
          },
          {
            id: 'ex-coupled-pistons-9m',
            title: 'Ejercicio 4: Pistones acoplados con desnivel h₂ = 9 m',
            source: 'Sesión 03 · Pauta Certamen 1',
            statement:
              'Dos pistones hidráulicos acoplados mediante aceite (SG = 0.80) están ubicados a distinta altura: el pistón pequeño (A₁ = 0.01 m²) está en cota z₁ = 0 m y soporta una fuerza F₁ = 1,000 N, mientras el pistón grande (A₂ = 0.05 m²) se encuentra h₂ = 9 m más arriba. ¿Qué fuerza F₂ equilibra el sistema?',
            step1DataSI: [
              'γ_aceite = 0.80 · 9,810 = 7,848 N/m³',
              'A₁ = 0.01 m², F₁ = 1,000 N ⇒ p₁ = 100,000 Pa',
              'A₂ = 0.05 m², h₂ = 9.0 m hacia arriba',
            ],
            step2Physics: [
              'Como el pistón 2 está 9 m más arriba que el pistón 1, la presión hidráulica bajo el pistón 2 es menor: p₂ = p₁ - γ_aceite · h₂.',
              'Luego F₂ = p₂ · A₂.',
            ],
            step3Math: [
              'p₂ = 100,000 - (7,848 · 9.0) = 100,000 - 70,632 = 29,368 Pa',
              'F₂ = 29,368 · 0.05 = 1,468.4 N',
            ],
            step4Conclusion:
              'Si hubiesen estado a la misma cota (h₂ = 0), F₂ habría sido 5,000 N; pero subir el aceite 9 metros consume 70.6 kPa de presión, reduciendo F₂ a 1,468 N.',
          },
        ],
        professorStepByStep: [
          '1. Marca con un lápiz los puntos de cambio de fluido y anota su cota antes de escribir la suma algebraica.',
          '2. En ejercicios de pistones acoplados con diferencia de altura h₂, ¡no apliques F₁/A₁ = F₂/A₂ ciegamente! Siempre incluye el término ±γ·h₂ entre las caras de los pistones.',
        ],
        physicalWhy:
          'Los fluidos incompresibles transmiten presiones a la velocidad del sonido y suman o restan la columna gravitacional γ·Δz a medida que cambiamos de elevación en el circuito.',
        certamenTips: [
          'Error común: olvidar dividir cm² por 10,000 al pasar a m² (35 cm² = 0.0035 m², NO 0.35 m²).',
          'Siempre verifica si te piden presión manométrica o absoluta al final del cálculo.',
        ],
      },
      {
        id: 'u2-s5',
        slideNumber: 5,
        title: 'Fuerzas Hidrostáticas sobre Superficies Planas Sumergidas',
        subtitle: 'Centroide (S), Centro de Presión (D) y Excentricidad (e)',
        simpleExplanation: {
          analogyTitle: 'Por qué una represa es gruesa abajo y delgada arriba',
          body: 'En la superficie del agua la presión es cero, y en el fondo es máxima. Por eso la fuerza sobre una compuerta rectangular NO empuja en el centro geométrico: empuja más abajo, hacia el fondo donde la presión aprieta más fuerte. A ese punto real de aplicación de la fuerza lo llamamos Centro de Presión (D).',
        },
        logicalWalkthrough: [
          'Consideremos una compuerta plana sumergida inclinada un ángulo θ respecto a la superficie libre. Definimos la coordenada w inclinada a lo largo del plano desde la superficie libre, de modo que la profundidad vertical es z = w · sen(θ).',
          'Integrando la presión p = γ·z = γ·w·sen(θ) sobre toda el área A de la compuerta, aparece ∫w dA = w_s · A, donde w_s es la posición del Centroide S. Por lo tanto, la Fuerza Resultante siempre es igual a la presión en el centroide multiplicada por el área: F_R = p_s · A = γ · z_s · A.',
          '¿Dónde actúa F_R? Al tomar momentos respecto a la línea de superficie libre aparece el segundo momento de área ∫w² dA = I_s + A·w_s². Dividiendo por F_R obtenemos la posición w_D del Centro de Presión:',
          'w_D = w_s + I_s / (A · w_s). El término positivo e = I_s / (A · w_s) se llama Excentricidad y demuestra que D SIEMPRE está más abajo que S (salvo en placa horizontal donde θ = 0° ⇒ e_vertical = 0).',
          'Atención a un resultado sorprendente: el momento respecto al eje horizontal que pasa por el centroide S es M_s = F_R · e = (γ · z_s · A) · [I_s / (A · w_s)] = γ · sen(θ) · I_s. ¡NO DEPENDE de cuán profunda esté sumergida la compuerta!',
        ],
        formulas: [
          {
            name: 'Magnitud de la Fuerza Hidrostática Resultante',
            expr: 'F_R = p_centroide · A = γ · z_s · A = γ · (w_s · sen θ) · A',
            whenValid: 'Superficie plana sumergida en líquido incompresible con p_atm actuando también por el lado seco.',
            symbols: [
              { symbol: 'F_R', meaning: 'Fuerza hidrostática neta perpendicular a la compuerta', unit: 'N' },
              { symbol: 'z_s', meaning: 'Profundidad vertical desde la superficie libre al centroide S', unit: 'm' },
              { symbol: 'A', meaning: 'Área mojada total de la compuerta', unit: 'm²' },
            ],
          },
          {
            name: 'Posición del Centro de Presión D y Excentricidad e',
            expr: 'w_D = w_s + e   con   e = I_s / (A · w_s)',
            whenValid: 'w medido a lo largo del plano inclinado de la compuerta desde su intersección con la superficie libre.',
            symbols: [
              { symbol: 'w_D', meaning: 'Distancia inclinada al Centro de Presión D', unit: 'm' },
              { symbol: 'I_s', meaning: 'Momento de inercia centroidal (Rect: bh³/12, Círculo: πd⁴/64)', unit: 'm⁴' },
              { symbol: 'e', meaning: 'Excentricidad o desplazamiento de D por debajo de S', unit: 'm' },
            ],
          },
        ],
        diagramType: 'submerged_gate',
        diagramCaption:
          'Interactivo: Cambia el ángulo θ y la profundidad de inmersión z_s para ver cómo el prisma de presiones mueve el Centro de Presión D más cerca del centroide S al sumergir más profundo.',
        workedExercises: [
          {
            id: 'ex-circular-valve-moment',
            title: 'Ejercicio: Momento en compuerta circular de 1 m (e invariancia con z)',
            source: 'Sesión 03 · Diapositiva 23 Ejercicio 2',
            statement:
              'Una compuerta circular vertical de diámetro d = 1.0 m gira alrededor de un eje horizontal que pasa por su centroide S. Si el borde inferior de la compuerta está a profundidad z_fondo = 2.0 m bajo agua, calcule el momento necesario para mantenerla cerrada. ¿Cuánto cambia este momento si el borde inferior baja a z_fondo = 5.0 m?',
            step1DataSI: [
              'd = 1.0 m ⇒ R = 0.5 m ⇒ A = π·(0.5)² = 0.7854 m²',
              'I_s = π·d⁴ / 64 = π·(1)⁴ / 64 = 0.04909 m⁴',
              'Caso A (z_fondo = 2 m): z_s = 2.0 - 0.5 = 1.5 m (y como es vertical θ = 90°, w_s = z_s = 1.5 m)',
              'Caso B (z_fondo = 5 m): z_s = 5.0 - 0.5 = 4.5 m',
            ],
            step2Physics: [
              'La presión atmosférica actúa en ambos lados y se cancela.',
              'Calculamos F_R = γ·z_s·A y la excentricidad e = I_s / (A·z_s).',
              'El momento respecto al eje centroidal S es M_s = F_R · e = (γ·z_s·A)·[I_s/(A·z_s)] = γ·I_s.',
            ],
            step3Math: [
              'Caso A: F_R = 9,810 · 1.5 · 0.7854 = 11,557 N ; e = 0.04909 / (0.7854·1.5) = 0.04167 m',
              'M_s = 11,557 · 0.04167 = 481.5 N·m',
              'Caso B (z_fondo = 5 m): F_R = 9,810 · 4.5 · 0.7854 = 34,671 N (3× mayor) ; e = 0.01389 m (3× menor)',
              'M_s = 34,671 · 0.01389 = 481.5 N·m (¡exactamente igual!)',
            ],
            step4Conclusion:
              'Aunque a 5 m la fuerza se triplica, el centro de presión D se acerca 3 veces al centroide S, dejando el torque de apertura invariante en 481.5 N·m.',
          },
        ],
        professorStepByStep: [
          '1. Define primero si la compuerta está vertical (θ = 90°, w_s = z_s) o inclinada (w_s = z_s / sen θ).',
          '2. Calcula F_R = γ · z_s · A usando siempre la profundidad VERTICAL z_s hasta el centro geométrico.',
          '3. Calcula la distancia de aplicación con w_D = w_s + I_s/(A·w_s) y haz sumatoria de momentos en la bisagra (¡cuidado con qué lado está la bisagra!).',
        ],
        physicalWhy:
          'Al aumentar la profundidad uniforme en toda la compuerta, el trapecio de presiones se parece cada vez más a un rectángulo uniforme, haciendo que el centro de presiones D tienda asintóticamente al centroide S (e → 0 cuando z_s → ∞).',
        certamenTips: [
          'El error más caro en Certamen 1: usar z_s en el denominador de e cuando la compuerta está inclinada; ¡es w_s = z_s / sen(θ)!',
          'Otro error: usar I_s de un rectángulo como b³h/12 en vez de bh³/12. El cubo siempre va en el lado que sigue la inclinación hacia abajo.',
        ],
      },
      {
        id: 'u2-s6',
        slideNumber: 6,
        title: 'Principio de Arquímedes, Flotabilidad y Doble Pesaje',
        subtitle: 'Empuje Hidrostático, Fracción Sumergida y Estabilidad de Cuerpos',
        simpleExplanation: {
          analogyTitle: 'El agua que "desalojaste" quería volver a su lugar',
          body: 'Cuando sumerges una pelota en la piscina, estás empujando y sacando agua de ese espacio. El resto del líquido sigue empujando hacia arriba con exactamente la misma fuerza que ejercía para sostener el agua que antes ocupaba ese lugar: el peso del fluido desalojado.',
        },
        logicalWalkthrough: [
          'Para un cuerpo de cualquier forma 3D sumergido en un fluido en reposo, la fuerza vertical neta de presión ejercida por el fluido sobre toda su superficie se llama Fuerza de Empuje o Flotación F_b.',
          'Por el Principio de Arquímedes: F_b = ρ_fluido · g · V_sumergido = γ_fluido · V_sumergido, actuando verticalmente hacia arriba a través del Centro de Flotación B (centroide del volumen sumergido).',
          'Si el cuerpo flota libremente en equilibrio, F_b = W = ρ_cuerpo · g · V_total, lo que da inmediatamente la fracción de volumen sumergida: V_sum / V_total = ρ_cuerpo / ρ_fluido.',
          'Si el cuerpo está colgado de una balanza totalmente sumergido en un líquido conocido (técnica de Doble Pesaje), el peso aparente leído es W_ap = W_real - F_b, permitiendo determinar el volumen o densidad desconocida de una pieza irregular.',
        ],
        formulas: [
          {
            name: 'Fuerza de Empuje de Arquímedes',
            expr: 'F_b = ρ_fluido · g · V_sumergido',
            whenValid: 'Cuerpo parcial o totalmente sumergido en fluido estático de densidad uniforme.',
            symbols: [
              { symbol: 'F_b', meaning: 'Fuerza neta vertical ascendente ejercida por el fluido', unit: 'N' },
              { symbol: 'ρ_fluido', meaning: 'Densidad del fluido circundante (NO la del cuerpo)', unit: 'kg/m³' },
              { symbol: 'V_sumergido', meaning: 'Volumen de fluido desplazado por el cuerpo', unit: 'm³' },
            ],
          },
          {
            name: 'Fracción Sumergida en Equilibrio de Flotación',
            expr: 'V_sum / V_total = ρ_cuerpo / ρ_fluido',
            whenValid: 'Cuerpo flotando libre sin cables ni apoyo en el fondo (F_b = W).',
            symbols: [
              { symbol: 'V_sum / V_total', meaning: 'Proporción del volumen bajo la línea de flotación', unit: 'adimensional' },
              { symbol: 'ρ_cuerpo', meaning: 'Densidad media del cuerpo flotante', unit: 'kg/m³' },
            ],
          },
        ],
        diagramType: 'archimedes',
        diagramCaption:
          'Interactivo: Ajusta la densidad del cuerpo (desde madera 550 kg/m³ hasta hielo 917 kg/m³ o acero) y cambia entre agua dulce y agua de mar para visualizar W, F_b y la fracción emergida.',
        workedExercises: [
          {
            id: 'ex-iceberg-exposed',
            title: 'Ejercicio: Fracción visible de un iceberg en el océano',
            source: 'Sesión 03 · Aplicación Clásica de Arquímedes',
            statement:
              'Un témpano de hielo glacial (ρ_hielo = 917 kg/m³) flota en equilibrio en agua de mar (ρ_mar = 1,025 kg/m³). ¿Qué porcentaje del volumen total del iceberg queda sumergido bajo el agua y qué porcentaje sobresale a la vista?',
            step1DataSI: [
              'ρ_hielo = 917 kg/m³',
              'ρ_mar = 1,025 kg/m³',
            ],
            step2Physics: [
              'En flotación libre, el peso total del iceberg iguala al empuje del agua de mar desalojada: F_b = W.',
              'ρ_mar · g · V_sum = ρ_hielo · g · V_total.',
            ],
            step3Math: [
              'V_sum / V_total = ρ_hielo / ρ_mar = 917 / 1,025 = 0.8946 (89.46%)',
              'Fracción expuesta = 1 - 0.8946 = 0.1054 (10.54%)',
            ],
            step4Conclusion:
              'Cerca del 89.5% del volumen del iceberg permanece oculto bajo la superficie del océano y solo ~10.5% emerge.',
          },
        ],
        professorStepByStep: [
          '1. Haz siempre el Diagrama de Cuerpo Libre completo: Peso W hacia abajo (con ρ_cuerpo·V_total), Empuje F_b hacia arriba (con ρ_fluido·V_sum), más tensiones de cables o normales si toca el fondo.',
          '2. Si un bloque flota en la interfaz entre dos fluidos (ej. aceite arriba y agua abajo), suma ambos empujes: F_b = γ_aceite·V_en_aceite + γ_agua·V_en_agua.',
        ],
        physicalWhy:
          'Como la presión aumenta linealmente con la profundidad, la cara inferior del objeto siempre recibe mayor empuje hacia arriba que la cara superior hacia abajo, produciendo una fuerza neta ascendente igual al peso de líquido desplazado.',
        certamenTips: [
          'Un error típico es poner ρ_cuerpo dentro de F_b. ¡El empuje SIEMPRE lleva la densidad del FLUIDO desalojado!',
        ],
      },
    ],
  },
];
