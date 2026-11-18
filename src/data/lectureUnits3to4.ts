import { LectureUnit } from './lectureTypes';

export const LECTURE_UNITS_3_TO_4: LectureUnit[] = [
  {
    id: 'u3',
    unitNumber: 3,
    title: 'Unidad 3: Cinemática, Método Diferencial y Navier-Stokes',
    shortTitle: 'Navier-Stokes',
    reference: 'Sesión 05 (MecFlu_S05) · Fox Cap. 4 & 5',
    summary:
      'Entra al interior del flujo punto a punto: los 4 movimientos de una partícula fluida, Derivada Sustancial, continuidad diferencial, Euler-Bernoulli, tensor de Cauchy y las ecuaciones maestras de Navier-Stokes.',
    slides: [
      {
        id: 'u3-s1',
        slideNumber: 1,
        title: 'Notación Indicial y los 4 Movimientos de una Partícula Fluida',
        subtitle: 'Traslación, Rotación (Vorticidad), Dilatación y Deformación Angular',
        simpleExplanation: {
          analogyTitle: 'Un cubo de gelatina flotando por los rápidos de un río',
          body: 'Mientras un cubo diminuto de agua viaja por una corriente, pueden pasarle cuatro cosas al mismo tiempo: avanzar de un lugar a otro (traslación), girar como un trompo (rotación), inflarse o comprimirse como una esponja (dilatación) o estirarse quedando en forma de rombo (deformación angular). Todo campo de velocidades se descompone exactamente en esos 4 gestos.',
        },
        logicalWalkthrough: [
          'Para escribir ecuaciones 3D de forma compacta en cátedra usamos la Notación Indicial (convenio de suma de Einstein): los índices i, j ∈ {1, 2, 3} representan {x, y, z}, las velocidades son uᵢ = (u, v, w), δᵢⱼ es la delta de Kronecker y todo índice repetido en un término implica suma de 1 a 3 (ej. ∂uᵢ/∂xᵢ = ∂u/∂x + ∂v/∂y + ∂w/∂z).',
          'Expandiendo el campo de velocidad alrededor de una partícula mediante Taylor de primer orden, el tensor gradiente de velocidad ∂uᵢ/∂xⱼ se descompone en una parte simétrica (Tasa de Deformación εᵢⱼ) y una parte antisimétrica (Tasa de Rotación Ωᵢⱼ):',
          '1) Traslación pura: desplazamiento uniforme con velocidad V.',
          '2) Rotación rígida y Vorticidad: ω = ∇ × V = 2·Ω. Si ω = 0 en todo el dominio, el flujo es Irrotacional (típico fuera de la capa límite).',
          '3) Dilatación Volumétrica (diagonal de εᵢⱼ): (1/V)(dV/dt) = ∇ · V. En flujo incompresible la dilatación es exactamente cero.',
          '4) Deformación Angular o Cizalladura pura (fuera de la diagonal de εᵢⱼ): γ̇_xy = ∂u/∂y + ∂v/∂x. ¡Esta es la única componente que genera esfuerzos viscosos en fluidos newtonianos incompresibles!',
        ],
        formulas: [
          {
            name: 'Vorticidad y Tasa de Rotación Angular',
            expr: 'ω_vec = ∇ × V = 2 · Ω_vec   ;   ω_z = ∂v/∂x - ∂u/∂y',
            whenValid: 'Cualquier campo de velocidad diferenciable en 3D (o 2D en plano x-y).',
            symbols: [
              { symbol: 'ω_vec', meaning: 'Vector vorticidad (doble de la velocidad angular local)', unit: '1/s' },
              { symbol: 'Ω_vec', meaning: 'Velocidad angular media de dos ejes ortogonales de la partícula', unit: 'rad/s' },
            ],
          },
          {
            name: 'Tasa de Dilatación y Deformación Angular',
            expr: '∇ · V = ∂u/∂x + ∂v/∂y + ∂w/∂z   ;   ε_xy = ½(∂u/∂y + ∂v/∂x)',
            whenValid: 'Cinemática del medio continuo; εᵢⱼ = ½(∂uᵢ/∂xⱼ + ∂uⱼ/∂xᵢ) es el tensor simétrico de deformación.',
            symbols: [
              { symbol: '∇ · V', meaning: 'Divergencia de velocidad (tasa de expansión volumétrica por unidad de volumen)', unit: '1/s' },
              { symbol: 'ε_xy', meaning: 'Componente fuera de la diagonal del tensor tasa de deformación', unit: '1/s' },
            ],
          },
        ],
        diagramType: 'particle_deformations',
        diagramCaption:
          'Interactivo: Selecciona cada uno de los 4 movimientos fundamentales (Traslación, Rotación, Dilatación, Deformación Angular) para animar el elemento fluido diferencial.',
        professorStepByStep: [
          '1. Si te dan V(x,y) = (u, v), calcula primero ∂v/∂x - ∂u/∂y. Si da cero, el flujo es irrotacional (aunque siga una trayectoria curva como en un vórtice libre!).',
          '2. Calcula luego ∂u/∂x + ∂v/∂y. Si da cero, satisface continuidad incompresible.',
          '3. Recuerda que un flujo rotacional puro (vórtice forzado V_θ = Ω·r) NO tiene deformación angular: gira como sólido rígido sin fricción viscosa interna.',
        ],
        physicalWhy:
          'Los esfuerzos viscosos solo nacen cuando las capas fluidas deslizan o se distorsionan angularmente entre sí; una traslación pura o rotación sólida rígida no cambia distancias relativas entre moléculas vecinas.',
        certamenTips: [
          'Clásico de control: la Vorticidad ω es el DOBLE de la velocidad angular Ω (ω = 2·Ω), ¡no olvides el factor 2!',
          'En un flujo entre placas (Couette u = U·y/h), ¡el fluido tiene tanto deformación angular como rotación (vorticidad = -U/h ≠ 0) aunque las trayectorias sean líneas rectas!',
        ],
      },
      {
        id: 'u3-s2',
        slideNumber: 2,
        title: 'Derivada Sustancial (Material): Aceleración Local vs Convectiva',
        subtitle: 'Cómo calcular la aceleración real de una partícula desde el marco Euleriano',
        simpleExplanation: {
          analogyTitle: 'Hacer rafting entrando a un cañón estrecho del río',
          body: 'Supón que el caudal del río no cambia en todo el día (flujo estacionario). Aun así, cuando tu balsa pasa de una laguna ancha a una garganta angosta de rocas, sientes un tirón brusco hacia adelante: ¡te aceleraste! No porque el río cambiara con el reloj (aceleración local = 0), sino porque te moviste hacia un lugar donde el agua va más rápida (aceleración convectiva).',
        },
        logicalWalkthrough: [
          'En descripción Euleriana conocemos el campo V(x,y,z,t). Para saber qué aceleración siente UNA partícula específica que se desplaza dx = u·dt, dy = v·dt, dz = w·dt durante dt, aplicamos la regla de la cadena:',
          'DV/Dt = ∂V/∂t + u(∂V/∂x) + v(∂V/∂y) + w(∂V/∂z) = ∂V/∂t + (V · ∇)V.',
          'Al operador D/Dt = ∂/∂t + (V · ∇) se le llama Derivada Sustancial (o Material / Total). Se aplica a cualquier propiedad φ (temperatura DT/Dt, presión Dp/Dt o velocidad DV/Dt).',
          'El primer término ∂V/∂t es la Aceleración Local (vale cero si el flujo es estacionario, como al abrir una llave de paso). El segundo término (V · ∇)V es la Aceleración Convectiva, debida al cambio de posición espacial (como al cruzar una tobera convergente o tubo Venturi).',
        ],
        formulas: [
          {
            name: 'Operador Derivada Sustancial (para cualquier campo φ)',
            expr: 'Dφ / Dt = ∂φ / ∂t + (c_vec · ∇)φ = ∂φ / ∂t + u(∂φ/∂x) + v(∂φ/∂y) + w(∂φ/∂z)',
            whenValid: 'Puente exacto entre la variación temporal siguiendo a la partícula (Lagrangiana) y el campo espacial (Euleriano).',
            symbols: [
              { symbol: 'Dφ / Dt', meaning: 'Tasa de cambio total percibida por la partícula móvil', unit: '[φ]/s' },
              { symbol: '∂φ / ∂t', meaning: 'Tasa de cambio local en un punto fijo', unit: '[φ]/s' },
              { symbol: '(c_vec · ∇)φ', meaning: 'Tasa de cambio convectiva por transporte espacial', unit: '[φ]/s' },
            ],
          },
          {
            name: 'Aceleración en Componente x (a_x = Du/Dt)',
            expr: 'a_x = ∂u/∂t + u(∂u/∂x) + v(∂u/∂y) + w(∂u/∂z)',
            whenValid: 'Coordenadas cartesianas; análogo para a_y = Dv/Dt y a_z = Dw/Dt.',
            symbols: [
              { symbol: 'a_x', meaning: 'Componente x de la aceleración real de la partícula fluida', unit: 'm/s²' },
              { symbol: 'u, v, w', meaning: 'Componentes de velocidad evaluadas en el punto (x,y,z,t)', unit: 'm/s' },
            ],
          },
        ],
        diagramType: 'eulerian_lagrangian',
        diagramCaption:
          'Interactivo: Activa el flujo estacionario en la tobera convergente y mueve el sensor a lo largo del eje x para medir a_local = 0 frente a a_conv = u·(du/dx) > 0.',
        workedExercises: [
          {
            id: 'ex-nozzle-convective',
            title: 'Ejercicio: Aceleración convectiva en tobera estacionaria / Venturi',
            source: 'Sesión 05 · Ejemplo Clásico Derivada Sustancial',
            statement:
              'Un flujo estacionario e incompresible atraviesa un tramo convergente unidimensional cuyo perfil de velocidad axial viene dado por u(x) = U₀ · (1 + 2x/L), con U₀ = 2.0 m/s y L = 0.5 m. Calcule la aceleración local y la aceleración convectiva en la entrada (x = 0) y a la salida (x = 0.5 m).',
            step1DataSI: [
              'u(x) = 2.0 · (1 + 2x / 0.5) = 2.0 · (1 + 4x) m/s',
              'v = 0, w = 0, flujo estacionario ⇒ ∂u/∂t = 0',
            ],
            step2Physics: [
              'Aplicamos a_x = ∂u/∂t + u·(∂u/∂x).',
              'Aceleración local = ∂u/∂t = 0 en toda la tobera.',
              'Derivamos respecto a x: ∂u/∂x = 2.0 · 4 = 8.0 s⁻¹.',
            ],
            step3Math: [
              'En x = 0: u(0) = 2.0 m/s ⇒ a_x(0) = 2.0 · 8.0 = 16.0 m/s²',
              'En x = 0.5 m: u(0.5) = 2.0 · (1 + 2) = 6.0 m/s ⇒ a_x(0.5) = 6.0 · 8.0 = 48.0 m/s²',
            ],
            step4Conclusion:
              'Aunque ningún instrumento fijo ve cambiar el flujo con el reloj (∂u/∂t = 0), cada partícula sufre casi 5g de aceleración hacia adelante (48 m/s²) al salir de la tobera!',
          },
        ],
        professorStepByStep: [
          '1. Escribe siempre las 4 partes de Du/Dt aunque alguna sea cero; te protege de olvidar términos cruzados v(∂u/∂y).',
          '2. Fíjate que el término convectivo u(∂u/∂x) es NO LINEAL en velocidad: ¡eso es justamente lo que hace tan ricas y difíciles las ecuaciones de Navier-Stokes!',
        ],
        physicalWhy:
          'Al cambiar de región espacial en un campo heterogéneo, una partícula adquiere la velocidad propia de su nueva ubicación en dt, experimentando una aceleración física real que requiere una fuerza neta (-∇p) para impulsarla.',
        certamenTips: [
          'Si el enunciado dice "flujo uniforme", las derivadas espaciales ∂/∂x = ∂/∂y = ∂/∂z = 0 (aceleración convectiva = 0). Si dice "flujo estacionario", ∂/∂t = 0 (aceleración local = 0). ¡No confundas ambos conceptos!',
        ],
      },
      {
        id: 'u3-s3',
        slideNumber: 3,
        title: 'Ecuación Diferencial de Continuidad (Conservación de Masa)',
        subtitle: 'Balance de Flujo Másico en un Elemento Infinitesimal dx·dy·dz',
        simpleExplanation: {
          analogyTitle: 'Contar personas entrando y saliendo de una sala pequeña',
          body: 'En una habitación pequeña sin ventanas secretas, la diferencia entre la gente que entra por la izquierda y la que sale por la derecha, más lo que entra/sale por adelante y arriba, debe acumularse dentro aumentando la densidad de personas en la sala. Si las personas son incompresibles (no se pueden apretar más), todo lo que entra tiene que salir al instante.',
        },
        logicalWalkthrough: [
          'Aislamos un paralelepípedo elemental fijo de volumen dV = dx·dy·dz. Calculamos el flujo másico neto saliente en las caras x, x+dx mediante expansión de Taylor: ∂(ρu)/∂x · dV, y de modo idéntico en las direcciones y y z.',
          'Por conservación de la masa, la tasa de aumento de masa dentro del cubo (∂ρ/∂t · dV) más el flujo másico neto que sale por las 6 caras debe sumar cero:',
          '∂ρ/∂t + ∂(ρu)/∂x + ∂(ρv)/∂y + ∂(ρw)/∂z = 0, o vectorialmente ∂ρ/∂t + ∇ · (ρV) = 0.',
          'Si el fluido es INCOMPRESIBLE (ρ = constante en espacio y tiempo, Dρ/Dt = 0), ∂ρ/∂t = 0 y ρ sale de la divergencia, reduciéndose a la elegante ecuación de divergencia nula: ∇ · V = ∂u/∂x + ∂v/∂y + ∂w/∂z = 0 (¡válida incluso si el flujo es no estacionario!).',
        ],
        formulas: [
          {
            name: 'Ecuación General de Continuidad Diferencial',
            expr: '∂ρ / ∂t + ∇ · (ρ V) = 0   ⇔   Dρ/Dt + ρ(∇ · V) = 0',
            whenValid: 'Válida para cualquier fluido (compresible o incompresible, viscoso o invíscido, estacionario o transiente).',
            symbols: [
              { symbol: '∂ρ/∂t', meaning: 'Tasa temporal local de acumulación de densidad', unit: 'kg/(m³·s)' },
              { symbol: '∇ · (ρV)', meaning: 'Divergencia del flujo másico por unidad de volumen', unit: 'kg/(m³·s)' },
            ],
          },
          {
            name: 'Continuidad para Flujo Incompresible (ρ = cte)',
            expr: '∇ · V = ∂u/∂x + ∂v/∂y + ∂w/∂z = 0',
            whenValid: 'Líquidos y gases con Ma < 0.3, tanto estacionarios como no estacionarios.',
            symbols: [
              { symbol: '∂u/∂x', meaning: 'Gradiente axial de velocidad en dirección x', unit: '1/s' },
              { symbol: '∂v/∂y, ∂w/∂z', meaning: 'Gradientes transversales que compensan estiramiento axial', unit: '1/s' },
            ],
          },
        ],
        diagramType: 'continuity_differential',
        diagramCaption:
          'Interactivo: Ajusta la velocidad entrante y el gradiente ∂u/∂x en el cubo diferencial dx·dy·dz para comprobar que un estiramiento en x exige una contracción ∂v/∂y = -∂u/∂x.',
        professorStepByStep: [
          '1. Para verificar si un campo 2D (u, v) dado en un certamen es físicamente posible en un fluido incompresible, deriva ∂u/∂x + ∂v/∂y y comprueba que dé idénticamente 0.',
          '2. Si conoces u(x, y) y te piden hallar v(x, y), despeja ∂v/∂y = -∂u/∂x e integra respecto a y usando la condición de borde en la pared (v = 0 en y = 0).',
        ],
        physicalWhy:
          'La masa no se crea ni se destruye; si un fluido incompresible se acelera en x (∂u/∂x > 0), sus líneas de corriente deben acercarse en las direcciones transversales y o z (∂v/∂y < 0) para mantener constante el volumen de la partícula.',
        certamenTips: [
          'En coordenadas cilíndricas (tuberías!), la divergencia incluye un factor 1/r: (1/r)∂(r·v_r)/∂r + (1/r)∂v_θ/∂θ + ∂v_z/∂z = 0.',
          'Para continuidad incompresible NO hace falta que el flujo sea estacionario: basta con que Dρ/Dt = 0.',
        ],
      },
      {
        id: 'u3-s4',
        slideNumber: 4,
        title: 'Ecuaciones de Euler (Flujo Invíscido) e Integración a Bernoulli',
        subtitle: 'De la 2ª Ley de Newton Diferencial a la Energía Mecánica en Línea de Corriente',
        simpleExplanation: {
          analogyTitle: 'Cómo nace la famosa Ecuación de Bernoulli sin magia',
          body: 'Mucha gente usa Bernoulli como si fuera una receta mágica, pero en realidad es simplemente F = m·a escrita para un cubito de agua sin roce (μ = 0) deslizándose como un carrito por una montaña rusa llamada "línea de corriente": si la presión baja hacia adelante, el cubito acelera; si sube la colina, se frena.',
        },
        logicalWalkthrough: [
          'Si despreciamos los esfuerzos viscosos (μ ≈ 0, región invíscida fuera de capas límite y estelas), las únicas fuerzas sobre nuestro cubo diferencial son las presiones normales (-∇p) y su propio peso gravitacional (ρ·g_vec).',
          'Aplicando F = m·a por unidad de volumen obtenemos las Ecuaciones de Euler (Leonhard Euler, 1755): ρ·(DV/Dt) = -∇p + ρ·g_vec.',
          'Ahora hagamos un paso histórico: proyectemos la Ecuación de Euler a lo largo de una línea de corriente s bajo 4 hipótesis estrictas: (1) Flujo estacionario (∂V/∂t = 0), (2) Incompresible (ρ = cte), (3) Invíscido (sin fricción) y (4) A lo largo de una misma línea de corriente.',
          'Como a_s = V(∂V/∂s) = ½ ∂(V²)/∂s y g_s = -g(∂z/∂s), al integrar respecto a s aparece inmediatamente la Ecuación de Bernoulli: p/γ + V²/(2g) + z = constante!',
        ],
        formulas: [
          {
            name: 'Ecuación Vectorial de Euler (Fluido Invíscido)',
            expr: 'ρ · (∂V/∂t + (V · ∇)V) = -∇p + ρ · g_vec',
            whenValid: 'Flujo sin viscosidad (μ = 0); recupera la ecuación hidrostática cuando V = 0.',
            symbols: [
              { symbol: 'ρ(DV/Dt)', meaning: 'Fuerza inercial por unidad de volumen', unit: 'N/m³' },
              { symbol: '-∇p', meaning: 'Fuerza neta debida al gradiente de presión (empuja de alta a baja p)', unit: 'N/m³' },
              { symbol: 'ρ·g_vec', meaning: 'Fuerza másica gravitacional', unit: 'N/m³' },
            ],
          },
          {
            name: 'Ecuación de Bernoulli (Forma en Alturas / Cargas)',
            expr: 'p₁/γ + V₁²/(2g) + z₁ = p₂/γ + V₂²/(2g) + z₂ = H_total (cte)',
            whenValid: 'Solo con 4 condiciones simultáneas: Estacionario + Incompresible + Sin fricción (μ=0) + Misma línea de corriente (o irrotacional) y sin máquinas.',
            symbols: [
              { symbol: 'p / γ', meaning: 'Carga de presión (altura piezométrica estática)', unit: 'm' },
              { symbol: 'V² / (2g)', meaning: 'Carga cinética o de velocidad', unit: 'm' },
              { symbol: 'z', meaning: 'Carga potencial geométrica o cota', unit: 'm' },
            ],
          },
        ],
        diagramType: 'euler_bernoulli',
        diagramCaption:
          'Interactivo: Modifica el diámetro de garganta en el Venturi ideal y observa el intercambio exacto entre Carga de Presión (p/γ) y Carga Cinética (V²/2g) manteniendo H constante.',
        professorStepByStep: [
          '1. Antes de aplicar Bernoulli en un ejercicio, recita en voz alta las 4 hipótesis: ¿es estacionario? ¿incompresible? ¿despreciable la fricción y sin bombas/turbinas entre 1 y 2? ¿están 1 y 2 en la misma línea de corriente?',
          '2. Si hay bomba, turbina o pérdidas de carga h_L entre 1 y 2, NO puedes usar Bernoulli: debes pasar a la Ecuación General de la Energía (Unidad 5 y 6).',
        ],
        physicalWhy:
          'La ecuación de Bernoulli expresa la conservación de la energía mecánica en ausencia de disipación viscosa: el trabajo hecho por la presión se convierte íntegramente en energía cinética y potencial gravitacional.',
        certamenTips: [
          'Si entre dos puntos hay una expansión brusca, una válvula semiabierta o una bomba, usar Bernoulli sin término de pérdida/bomba es error grave en certamen.',
          'Recuerda que p + ½ρV² se llama Presión de Estancamiento (total) medida por un Tubo de Pitot donde V se frena a cero.',
        ],
      },
      {
        id: 'u3-s5',
        slideNumber: 5,
        title: 'Tensor de Esfuerzos de Cauchy y Ecuaciones de Navier-Stokes',
        subtitle: 'La Ley de Newton Completa para Fluidos Reales Viscosos',
        simpleExplanation: {
          analogyTitle: 'Agregarle fricción realista a la montaña rusa de Euler',
          body: 'Euler imaginó un mundo perfecto sin roce. Claude-Louis Navier y George Stokes le añadieron el "pegamento viscoso" (μ·∇²V) que frena unas capas respecto a otras y cumple la condición de no deslizamiento en las paredes. Es una de las ecuaciones más poderosas de la física: describe desde el agua en una cañería hasta los huracanes y la sangre en tus arterias.',
        },
        logicalWalkthrough: [
          'En un fluido real (μ > 0), sobre cada cara del cubo diferencial actúan tanto esfuerzos normales (σ_xx, σ_yy, σ_zz) como 6 esfuerzos cortantes tangenciales (τ_xy, τ_xz, τ_yx...). Por equilibrio rotacional de momentos en el cubo elemental, el tensor de esfuerzos de Cauchy es simétrico: τ_xy = τ_yx, τ_xz = τ_zx, τ_yz = τ_zy.',
          'Mediante la Ley Constitutiva de Stokes para fluido Newtoniano, los esfuerzos viscosos se expresan proporcionalmente al tensor de tasa de deformación: τᵢⱼ = -p·δᵢⱼ + 2μ·εᵢⱼ + λ(∇·V)δᵢⱼ.',
          'Al sustituir esta ley dentro de la ecuación de cantidad de movimiento de Cauchy (ρ·DV/Dt = ∇·σ + ρ·g_vec) y aplicar fluido incompresible (∇·V = 0) y μ constante, nacen las célebres Ecuaciones de Navier-Stokes Incompresibles:',
          'ρ · [∂V/∂t + (V · ∇)V] = -∇p + ρ·g_vec + μ·∇²V.',
          'Observa su belleza unificadora: si μ = 0 recuperamos exactamente Euler; si V = 0 (reposo) desaparecen inercia y viscosidad y recuperamos la Ecuación Hidrostática (-∇p + ρg = 0)!',
        ],
        formulas: [
          {
            name: 'Ecuación de Navier-Stokes Incompresible (Forma Vectorial)',
            expr: 'ρ · (∂V/∂t + (V · ∇)V) = -∇p + ρ · g_vec + μ · ∇²V',
            whenValid: 'Fluido newtoniano, incompresible (ρ = cte) y viscosidad uniforme (μ = cte).',
            symbols: [
              { symbol: 'ρ·(DV/Dt)', meaning: 'Término inercial (local + convectivo)', unit: 'N/m³' },
              { symbol: '-∇p', meaning: 'Fuerza de gradiente de presión', unit: 'N/m³' },
              { symbol: 'μ · ∇²V', meaning: 'Fuerza neta de difusión viscosa (Laplaciano de velocidad)', unit: 'N/m³' },
            ],
          },
          {
            name: 'Tensor de Esfuerzos Newtoniano (Componente Cortante)',
            expr: 'τ_xy = τ_yx = μ · (∂u/∂y + ∂v/∂x)',
            whenValid: 'Fluido newtoniano; simetría garantizada por balance de torque en el elemento diferencial.',
            symbols: [
              { symbol: 'τ_xy', meaning: 'Esfuerzo cortante en cara normal a x en dirección y', unit: 'Pa' },
              { symbol: 'μ', meaning: 'Viscosidad dinámica', unit: 'Pa·s' },
            ],
          },
        ],
        diagramType: 'navier_stokes_reduction',
        diagramCaption:
          'Interactivo: Activa o apaga términos físicos en Navier-Stokes (Inercia V=0, Viscosidad μ=0, Flujo Couette/Poiseuille) para ver qué ecuación clásica resulta automáticamente.',
        professorStepByStep: [
          '1. Para resolver flujos laminares simples en placa o tubo (como Flujo de Couette o Poiseuille en Unidad 5), parte de Navier-Stokes y tacha término a término justificando con las hipótesis (ej. flujo estacionario ∂/∂t = 0, unidireccional v = w = 0, completamente desarrollado ∂u/∂x = 0).',
          '2. Lo que sobrevive (típicamente 0 = -dp/dx + μ·d²u/dy²) se integra dos veces aplicando las condiciones de no deslizamiento en las paredes.',
        ],
        physicalWhy:
          'El término Laplaciano μ∇²V mide cuánto difiere la velocidad de una partícula respecto al promedio de sus vecinas: si viaja más rápido que las capas adyacentes, el roce viscoso la frena y acelera a sus vecinas (difusión de cantidad de movimiento).',
        certamenTips: [
          'Aunque Navier-Stokes tiene solución analítica solo en geometrías simples (placas, tubos circulares), es la ecuación exacta que resuelven todos los programas CFD modernos (ANSYS Fluent, OpenFOAM).',
          'Nunca taches el término convectivo (V·∇)V sin verificar antes por continuidad que la velocidad no varía en la dirección del flujo.',
        ],
      },
    ],
  },

  {
    id: 'u4',
    unitNumber: 4,
    title: 'Unidad 4: Análisis Dimensional y Semejanza Física',
    shortTitle: 'Dimensional',
    reference: 'Sesión 07 (MecFlu_S07) · Çengel Cap. 7',
    summary:
      'Reduce experimentos complejos a grupos universales: homogeneidad dimensional, Teorema Π de Buckingham (método de exponentes y método tabular de Ipsen), los 7 números adimensionales, escalamiento Froude/Reynolds y leyes de afinidad.',
    slides: [
      {
        id: 'u4-s1',
        slideNumber: 1,
        title: 'Homogeneidad Dimensional, Colapso de Curvas y Sistemas {M,L,T} / {F,L,T}',
        subtitle: 'Cómo pasar de 1,000 experimentos a una única curva universal',
        simpleExplanation: {
          analogyTitle: 'No puedes sumar peras con manzanas... ¡ni metros con kilogramos!',
          body: 'Cualquier ecuación física verdadera tiene que tener exactamente las mismas dimensiones a la izquierda y a la derecha (homogeneidad dimensional). Pero lo más genial del análisis dimensional es que si graficas variables crudas (ej. caída de presión vs caudal en 10 diámetros distintos), obtienes 10 curvas separadas; cuando las combinas en grupos adimensionales, ¡todas colapsan en una sola curva maestra!',
        },
        logicalWalkthrough: [
          'El Principio de Homogeneidad Dimensional establece que todos los términos aditivos de una ecuación física válida poseen exactamente las mismas dimensiones fundamentales.',
          'En Mecánica de Fluidos sin transferencia térmica compleja bastan 3 dimensiones fundamentales: el sistema Masa-Longitud-Tiempo {M, L, T} (el más usado en UTFSM y SI) o el sistema Fuerza-Longitud-Tiempo {F, L, T} (donde M = F·T²·L⁻¹ por la 2ª ley de Newton). Si aparece temperatura se agrega Θ.',
          'Ejemplo real de cátedra (Placa Orificio): la caída de presión Δp depende de 5 variables (ρ, V, D, d, μ). Hacer 10 pruebas por cada variable exigiría 10⁴ = 10,000 ensayos de laboratorio. Al adimensionalizar obtenemos solo 3 grupos: C_d = f(Re, d/D), reduciendo drásticamente el trabajo experimental y haciendo colapsar todos los datos en una curva única.',
        ],
        formulas: [
          {
            name: 'Relación entre Sistemas {M,L,T} y {F,L,T}',
            expr: '[F] = M · L · T⁻²   ⇔   [M] = F · L⁻¹ · T²',
            whenValid: 'Universal por la Segunda Ley de Newton (F = m·a).',
            symbols: [
              { symbol: 'M, L, T, Θ', meaning: 'Dimensiones primarias: Masa, Longitud, Tiempo, Temperatura', unit: 'kg, m, s, K' },
              { symbol: 'F', meaning: 'Fuerza tratada como dimensión primaria en sistema gravitacional', unit: 'N' },
            ],
          },
        ],
        diagramType: 'dimensional_collapse',
        diagramCaption:
          'Interactivo: Alterna entre gráficos dimensionales crudos (dispersos por diámetro/fluido) y el gráfico adimensional colapsado C_d vs Re.',
        tableData: {
          caption: 'Tabla de Dimensiones en {M, L, T, Θ} y {F, L, T, Θ} (Sesión 07)',
          headers: ['Magnitud Física', 'Símbolo', 'Sistema {M, L, T, Θ}', 'Sistema {F, L, T, Θ}'],
          rows: [
            ['Velocidad', 'V', 'L·T⁻¹', 'L·T⁻¹'],
            ['Caudal volumétrico', 'Q', 'L³·T⁻¹', 'L³·T⁻¹'],
            ['Densidad', 'ρ', 'M·L⁻³', 'F·L⁻⁴·T²'],
            ['Presión / Esfuerzo', 'p, τ', 'M·L⁻¹·T⁻²', 'F·L⁻²'],
            ['Viscosidad dinámica', 'μ', 'M·L⁻¹·T⁻¹', 'F·L⁻²·T'],
            ['Viscosidad cinemática', 'ν', 'L²·T⁻¹', 'L²·T⁻¹'],
            ['Tensión superficial', 'σ', 'M·T⁻²', 'F·L⁻¹'],
            ['Potencia', 'Ẇ', 'M·L²·T⁻³', 'F·L·T⁻¹'],
          ],
        },
        professorStepByStep: [
          '1. Usa un único sistema en todo el ejercicio ({M, L, T} es el más rápido para la mayoría de problemas con ρ, μ y F).',
          '2. Verifica las dimensiones de cualquier fórmula nueva antes de memorizarla: si ambos lados no reducen a la misma potencia de M, L, T, hay un error algebraico.',
        ],
        physicalWhy:
          'Las leyes de la naturaleza son independientes de las unidades humanas arbitrarias (metros vs pulgadas, segundos vs horas); por lo tanto, toda relación física puede reescribirse en forma completamente adimensional.',
        certamenTips: [
          'Memoriza de memoria las dimensiones de ρ (ML⁻³), p o τ (ML⁻¹T⁻²) y μ (ML⁻¹T⁻¹): aparecen en el 95% de los problemas de Buckingham.',
          'Recuerda que los ángulos (rad), deformaciones y números puros (π, e, funciones trigonométricas) son adimensionales [M⁰L⁰T⁰].',
        ],
      },
      {
        id: 'u4-s2',
        slideNumber: 2,
        title: 'Teorema Π de Buckingham (Método de Exponentes e Ipsen)',
        subtitle: 'Algoritmo Paso a Paso para Construir Grupos Adimensionales',
        simpleExplanation: {
          analogyTitle: 'Cambiar monedas distintas por fichas universales de casino',
          body: 'Si un fenómeno depende de n = 5 variables (como fuerza, velocidad, diámetro, densidad y viscosidad) y entre todas solo usan k = 3 dimensiones básicas (M, L, T), el Teorema Π de Buckingham garantiza que puedes empaquetar las 5 variables en apenas n - k = 2 "fichas universales" adimensionales Π₁ y Π₂.',
        },
        logicalWalkthrough: [
          'Regla de Buckingham: Un proceso con n variables físicas dependientes e independientes que involucran k dimensiones primarias independientes se reduce exactamente a p = n - k parámetros adimensionales independientes Π₁ = φ(Π₂, ..., Π_p).',
          'Método 1 (Exponentes / Variables Repetidoras): (1) Lista las n variables y sus dimensiones. (2) Determina k (usualmente 3: M, L, T). (3) Elige k variables repetidoras que contengan todas las dimensiones básicas y NO formen un grupo adimensional entre sí (regla de oro: elige una geométrica D o L, una cinemática V, y una de fluido ρ; ¡NUNCA elijas la variable dependiente F_D ni μ si hay otra opción!). (4) Combina cada variable restante con las repetidoras elevadas a exponentes a, b, c e iguala M⁰L⁰T⁰.',
          'Método 2 (Método Tabular de Ipsen): Escribe una fila por cada variable y sus dimensiones; luego divide o multiplica sucesivamente por una variable pivote para eliminar una dimensión por paso (primero M, luego T, luego L) hasta que todas las filas restantes queden adimensionales [1]. Es infalible y evita sistemas de ecuaciones.',
        ],
        formulas: [
          {
            name: 'Teorema Π de Buckingham',
            expr: 'p = n - k   ⇒   Π₁ = φ(Π₂, Π₃, ..., Π_p)',
            whenValid: 'k iguala al rango de la matriz dimensional (generalmente igual al número de dimensiones primarias presentes).',
            symbols: [
              { symbol: 'n', meaning: 'Número total de variables físicas involucradas (incluyendo la dependiente)', unit: 'entero' },
              { symbol: 'k', meaning: 'Número de dimensiones independientes (rango matricial)', unit: 'entero' },
              { symbol: 'p', meaning: 'Cantidad mínima de números adimensionales Π independientes', unit: 'entero' },
            ],
          },
        ],
        diagramType: 'buckingham_pi',
        diagramCaption:
          'Interactivo: Selecciona un fenómeno (Fuerza de Arrastre en Esfera o Caída de Presión en Tubería) y observa el paso a paso del algoritmo de Exponentes vs Tabla de Ipsen.',
        workedExercises: [
          {
            id: 'ex-buckingham-sphere',
            title: 'Ejercicio: Arrastre sobre una esfera F_D = f(D, V, ρ, μ) por Exponentes e Ipsen',
            source: 'Sesión 07 · Ejemplo Central Buckingham',
            statement:
              'La fuerza de arrastre F_D sobre una esfera lisa en flujo estacionario depende de su diámetro D, la velocidad V, la densidad ρ y la viscosidad μ. Obtenga los grupos adimensionales usando (A) el Método de Exponentes y (B) el Método Tabular de Ipsen.',
            step1DataSI: [
              'n = 5 variables: F_D [MLT⁻²], D [L], V [LT⁻¹], ρ [ML⁻³], μ [ML⁻¹T⁻¹]',
              'Dimensiones involucradas: {M, L, T} ⇒ k = 3 ⇒ p = 5 - 3 = 2 grupos Π',
            ],
            step2Physics: [
              '(A) Variables repetidoras: elegimos {D, V, ρ} (cubren L, T, M y no forman Π entre sí).',
              'Formamos Π₁ = F_D · Dᵃ · Vᵇ · ρᶜ y Π₂ = μ · Dᵈ · Vᵉ · ρᶠ.',
            ],
            step3Math: [
              'Para Π₁: [M¹ L¹ T⁻²] · [L]ᵃ · [L T⁻¹]ᵇ · [M L⁻³]ᶜ = M⁰ L⁰ T⁰',
              '  • M: 1 + c = 0 ⇒ c = -1  |  T: -2 - b = 0 ⇒ b = -2  |  L: 1 + a + b - 3c = 0 ⇒ 1 + a - 2 + 3 = 0 ⇒ a = -2',
              '  ⇒ Π₁ = F_D / (ρ · V² · D²)',
              'Para Π₂: [M¹ L⁻¹ T⁻¹] · [L]ᵈ · [L T⁻¹]ᵉ · [M L⁻³]ᶠ = M⁰ L⁰ T⁰',
              '  • M: f = -1  |  T: -1 - e = 0 ⇒ e = -1  |  L: -1 + d - 1 + 3 = 0 ⇒ d = -1',
              '  ⇒ Π₂ = μ / (ρ · V · D) = 1 / Re',
              '(B) Verificación Método de Ipsen (eliminación paso a paso):',
              '  • Paso 1 (eliminar M con ρ): F_D/ρ [L⁴T⁻²], D [L], V [LT⁻¹], μ/ρ [L²T⁻¹]',
              '  • Paso 2 (eliminar T con V): (F_D/ρ)/V² = F_D/(ρV²) [L²], D [L], (μ/ρ)/V = μ/(ρV) [L]',
              '  • Paso 3 (eliminar L con D): F_D/(ρV²D²) [1]  y  μ/(ρVD) [1]',
            ],
            step4Conclusion:
              'Ambos métodos llegan exactamente a la relación universal: F_D / (ρ·V²·D²) = φ(Re), base del coeficiente de arrastre C_D(Re)!',
          },
        ],
        professorStepByStep: [
          '1. Al elegir repetidoras, evita elegir dos variables cuyas dimensiones solo difieran en potencia (ej. nunca escojas D y Área A juntas).',
          '2. Si tienes dudas de que tus grupos sean correctos, haz un chequeo rápido de unidades SI: cada Π debe cancelar absolutamente todos los kg, m y s.',
          '3. Recuerda que puedes elevar un grupo Π a -1 o multiplicarlo por constantes numéricas (como ½ o π/4) para obtener formas estándar de libro (como Re = ρVD/μ en lugar de μ/(ρVD)).',
        ],
        physicalWhy:
          'Los grupos Π revelan cuáles fuerzas físicas realmente gobiernan el fenómeno (inercia vs viscosidad, inercia vs gravedad, etc.) más allá de los valores individuales de cada variable.',
        certamenTips: [
          'En el método de Ipsen, si eliminas M, T y L usando D, V y ρ en 3 filas de tabla, ¡resuelves un problema de certamen en menos de 2 minutos sin errores de signos!',
        ],
      },
      {
        id: 'u4-s3',
        slideNumber: 3,
        title: 'Los 7 Números Adimensionales Clave de la Mecánica de Fluidos',
        subtitle: 'Interpretación Física como Cociente de Fuerzas Competidoras',
        simpleExplanation: {
          analogyTitle: 'Un pulso de fuerzas compitiendo dentro del fluido',
          body: 'Cada número adimensional famoso es el marcador de una pelea entre dos fuerzas físicas: la Inercia del movimiento contra algún freno o restaurador (la viscosidad en Reynolds, la gravedad en Froude, la compresibilidad en Mach, la tensión superficial en Weber). El que gana el cociente decide cómo se comporta el fluido.',
        },
        logicalWalkthrough: [
          'Todo flujo resulta de la competencia entre la Fuerza de Inercia (∝ ρ·V²·L²) y las restantes fuerzas físicas presentes:',
          '• Reynolds (Re): Inercia / Viscosidad. Si Re es pequeño (< 2300 en tuberías), gana la viscosidad y el flujo es suave (Laminar). Si Re es grande, gana la inercia y estalla el caos (Turbulento).',
          '• Froude (Fr): Inercia / Gravedad. Domina donde hay superficie libre con olas (canales, vertederos, barcos). Fr < 1 es flujo subcrítico (tranquilo), Fr > 1 es supercrítico (rápido).',
          '• Mach (Ma): Inercia / Compresibilidad elástica (= V/c). Domina en aerodinámica rápida y ondas de choque; si Ma < 0.3 el flujo es incompresible.',
          '• Weber (We): Inercia / Tensión Superficial. Gobierna atomización de gotas, sprays, burbujas y ondas capilares.',
          '• Strouhal (St): Frecuencia de oscilación / Frecuencia convectiva (desprendimiento de vórtices de Von Kármán detrás de cilindros o cables).',
          '• Euler (Eu / C_p): Presión / Inercia. Cuantifica pérdidas de carga en válvulas y coeficientes de presión.',
          '• Cavitación (Ca / σ): (p - p_v) / (½ρV²). Indica cuán lejos estamos de hervir localmente en hélices o rodetes.',
        ],
        formulas: [
          {
            name: 'Definición de los Principales Grupos Adimensionales',
            expr: 'Re = ρVL/μ  ;  Fr = V/√(gL)  ;  Ma = V/c  ;  We = ρV²L/σ',
            whenValid: 'V = velocidad característica, L = longitud característica (D en tubería, cuerda en ala, calado en canal).',
            symbols: [
              { symbol: 'Re', meaning: 'Número de Reynolds (F_inercia / F_viscosa)', unit: 'adimensional' },
              { symbol: 'Fr', meaning: 'Número de Froude (√(F_inercia / F_gravedad))', unit: 'adimensional' },
              { symbol: 'Ma, We', meaning: 'Números de Mach (compresibilidad) y Weber (tensión superficial)', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'dimensionless_numbers',
        diagramCaption:
          'Interactivo: Selecciona un caso real de ingeniería (Tubería, Buque en Canal, Avión, Spray o Hélice) para ver qué número adimensional domina y su interpretación física.',
        tableData: {
          caption: 'Tabla Maestra de los 7 Números Adimensionales (Sesión 07)',
          headers: ['Número', 'Expresión', 'Cociente de Fuerzas', 'Aplicación Típica'],
          rows: [
            ['Reynolds (Re)', 'ρ·V·L / μ = V·L / ν', 'Inercia / Viscosidad', 'Tuberías, capa límite, arrastre'],
            ['Froude (Fr)', 'V / √(g·L)', 'Inercia / Gravedad (√)', 'Canales abiertos, presas, cascos de barcos'],
            ['Mach (Ma)', 'V / c', 'Inercia / Compresibilidad (√)', 'Flujo compresible, toberas, aeronáutica'],
            ['Weber (We)', 'ρ·V²·L / σ', 'Inercia / Tensión superficial', 'Gotas, sprays, burbujas, interfaces delgadas'],
            ['Strouhal (St)', 'f · L / V', 'Inercia local / Inercia convectiva', 'Vórtices de Von Kármán, flujos pulsantes'],
            ['Euler (Eu o C_p)', 'Δp / (½ρ·V²)', 'Fuerza presión / Inercia', 'Cavitación parcial, válvulas, Venturi'],
            ['Cavitación (Ca)', '(p - p_v) / (½ρ·V²)', 'Margen presión sobre p_v / Inercia', 'Bombas, turbinas hidráulicas, hélices'],
          ],
        },
        professorStepByStep: [
          '1. Frente a cualquier problema físico real, pregúntate: "¿hay superficie libre con gravedad?" ⇒ Froude. "¿El tubo está completamente lleno y cerrado?" ⇒ Reynolds. "¿La velocidad supera ~100 m/s en aire?" ⇒ Mach.',
          '2. En flujos internos totalmente cerrados (sin aire libre), la gravedad NO altera la trayectoria relativa del flujo (solo suma presión hidrostática) ⇒ Froude NO aplica.',
        ],
        physicalWhy:
          'Cada término de la ecuación adimensionalizada de Navier-Stokes queda multiplicado por el inverso de uno de estos números (1/Re, 1/Fr², Ma²), demostrando matemáticamente qué fuerza gobierna la dinámica.',
        certamenTips: [
          'Ojo con las definiciones alternativas de Euler y Froude: algunos autores definen Fr = V²/(gL) y otros V/√(gL). Revisa siempre el contexto; la razón de escalado es idéntica.',
        ],
      },
      {
        id: 'u4-s4',
        slideNumber: 4,
        title: 'Semejanza Geométrica, Cinemática y Dinámica (Leyes de Escala)',
        subtitle: 'Escalamiento Froude vs Reynolds y el Conflicto del Agua en Modelos',
        simpleExplanation: {
          analogyTitle: 'Probar un barco o una represa de juguete antes de gastar millones',
          body: 'Antes de construir una central hidroeléctrica gigante o un buque carguero, los ingenieros fabrican una maqueta a escala 1:25 en un laboratorio. Para que los resultados de la maqueta predigan fielmente al monstruo real, no basta con que tenga la misma forma (semejanza geométrica): también deben ser proporcionales las velocidades (cinemática) y las fuerzas dominantes (dinámica).',
        },
        logicalWalkthrough: [
          'Definimos la escala geométrica λ = L_p / L_m > 1 (ej. si el modelo es 1:25, λ = 25). Hay tres niveles jerárquicos de semejanza:',
          '1) Semejanza Geométrica: Todas las dimensiones espaciales y rugosidades escalan igual (L_p/L_m = D_p/D_m = ε_p/ε_m = λ) y todos los ángulos son idénticos.',
          '2) Semejanza Cinemática: Las líneas de corriente son geométricamente similares y los cocientes de velocidades y tiempos en puntos homólogos son constantes.',
          '3) Semejanza Dinámica (la condición maestra): Todos los números adimensionales relevantes son iguales entre modelo y prototipo (Π_i,m = Π_i,p).',
          'Bajo Semejanza por Froude (Fr_m = Fr_p, ej. canales/barcos con g_m = g_p): V_p/V_m = λ^(1/2) ; Q_p/Q_m = λ^(5/2) ; F_p/F_m = (ρ_p/ρ_m)·λ³ ; Potencia Ẇ_p/Ẇ_m = (ρ_p/ρ_m)·λ^(7/2).',
          'Bajo Semejanza por Reynolds (Re_m = Re_p, ej. túneles de viento/tuberías): V_p/V_m = (ν_p/ν_m)·(1/λ). ¡Un modelo 10 veces más chico en el MISMO fluido requiere 10 veces MÁS velocidad!',
        ],
        formulas: [
          {
            name: 'Leyes de Escala por Semejanza de Froude (λ = L_p / L_m)',
            expr: 'V_p/V_m = λ^(1/2)  ;  Q_p/Q_m = λ^(5/2)  ;  F_p/F_m = λ³  ;  Ẇ_p/Ẇ_m = λ^(7/2)',
            whenValid: 'Flujos con superficie libre (g_m = g_p, ρ_m ≈ ρ_p).',
            symbols: [
              { symbol: 'λ', meaning: 'Factor de escala geométrica (L_prototipo / L_modelo)', unit: 'adimensional' },
              { symbol: 'Q_p/Q_m', meaning: 'Razón de caudales (V·A ∝ λ^(1/2) · λ² = λ^(5/2))', unit: 'adimensional' },
            ],
          },
          {
            name: 'Ley de Escala por Semejanza de Reynolds',
            expr: 'V_m / V_p = (ν_m / ν_p) · (L_p / L_m) = (ν_m / ν_p) · λ',
            whenValid: 'Flujos cerrados o sumergidos sin efectos de compresibilidad ni superficie libre.',
            symbols: [
              { symbol: 'ν_m / ν_p', meaning: 'Cociente de viscosidades cinemáticas entre fluido del modelo y del prototipo', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'similarity_scaling',
        diagramCaption:
          'Interactivo: Ajusta la escala geométrica λ = L_p / L_m y alterna entre criterio Froude vs Reynolds para ver cómo explotan las velocidades y fuerzas escaladas.',
        workedExercises: [
          {
            id: 'ex-re-fr-conflict',
            title: 'Ejercicio: ¿Por qué NO se puede igualar Re y Fr a la vez usando agua?',
            source: 'Sesión 07 · Problema Conceptual de Semejanza',
            statement:
              'Un vertedero de presa se ensaya con un modelo a escala 1:25 (λ = L_p/L_m = 25). Si el prototipo trabaja con agua (ν_p = 1.0×10⁻⁶ m²/s), ¿qué viscosidad cinemática ν_m debería tener el fluido del modelo para satisfacer simultáneamente Froude (Fr_m = Fr_p) y Reynolds (Re_m = Re_p)?',
            step1DataSI: [
              'λ = L_p / L_m = 25',
              'g_m = g_p = 9.81 m/s²',
              'ν_p = 1.0 × 10⁻⁶ m²/s (agua a 20°C)',
            ],
            step2Physics: [
              'Igualando Froude: V_m / √(g L_m) = V_p / √(g L_p) ⇒ V_m / V_p = λ^(-1/2).',
              'Igualando Reynolds: V_m·L_m / ν_m = V_p·L_p / ν_p ⇒ ν_m / ν_p = (V_m/V_p) · (L_m/L_p) = λ^(-1/2) · λ^(-1) = λ^(-3/2).',
            ],
            step3Math: [
              'ν_m = ν_p · λ^(-3/2) = 1.0×10⁻⁶ · (25)^(-1.5)',
              '25^(1.5) = (√25)³ = 5³ = 125',
              'ν_m = 1.0×10⁻⁶ / 125 = 8.0 × 10⁻⁹ m²/s',
            ],
            step4Conclusion:
              'No existe ningún líquido convencional en la Tierra con ν = 8×10⁻⁹ m²/s (¡ni el mercurio llega a 10⁻⁷!). Por eso en hidráulica se iguala Froude y se asegura Re_m suficientemente alto (> 10⁵) para permanecer en zona turbulenta rugosa independiente de Re.',
          },
        ],
        professorStepByStep: [
          '1. Identifica primero cuál es el número adimensional dominante (Fr o Re) según el problema.',
          '2. Despeja siempre V_p / V_m primero, luego multiplica por λ² para obtener Q_p/Q_m y usa F = C_F · ρ · V² · L² para obtener fuerzas y potencias.',
        ],
        physicalWhy:
          'Froude pide que el modelo sea más LENTO (V_m ∝ 1/√λ) mientras Reynolds pide que el modelo sea más RÁPIDO (V_m ∝ λ) cuando ambos usan el mismo fluido; son físicamente incompatibles a menos que cambies de fluido o presurices un túnel de viento.',
        certamenTips: [
          'En modelos de túnel de viento (autos/aviones), se suele igualar Re usando aire comprimido a alta presión (sube ρ, baja ν) o bien túneles de agua.',
        ],
      },
      {
        id: 'u4-s5',
        slideNumber: 5,
        title: 'Leyes de Afinidad en Turbomáquinas (Bombas y Ventiladores)',
        subtitle: 'Predicción de Caudal, Altura y Potencia al Cambiar RPM o Diámetro',
        simpleExplanation: {
          analogyTitle: 'Acelerar el motor de una bomba centrífuga con un variador de frecuencia',
          body: 'Si tienes una bomba girando a 1,450 rpm y le conectas un variador de frecuencia para subirla al doble (2,900 rpm), ¿cuánto más agua entrega y cuánta electricidad extra consume? El análisis dimensional responde de inmediato: el caudal sube al doble (×2), la presión/altura sube 4 veces (×2²), pero la potencia eléctrica se dispara ¡8 veces (×2³)!',
        },
        logicalWalkthrough: [
          'Aplicando el Teorema Π de Buckingham a una familia geométricamente similar de bombas centrífugas de diámetro de rodete D y velocidad angular N (o ω), emergen tres grupos adimensionales fundamentales:',
          '1) Coeficiente de Caudal: C_Q = Q / (N · D³) = constante.',
          '2) Coeficiente de Altura (Carga): C_H = (g · H) / (N² · D²) = constante.',
          '3) Coeficiente de Potencia: C_P = Ẇ / (ρ · N³ · D⁵) = constante.',
          'Al comparar puntos homólogos de operación (igual eficiencia η) para una misma bomba (D₁ = D₂) variando la velocidad de giro N₁ → N₂, obtenemos las célebres Leyes de Afinidad usadas a diario en plantas industriales.',
        ],
        formulas: [
          {
            name: 'Leyes de Afinidad de Turbomáquinas (Misma Bomba o Familia Similar)',
            expr: 'Q₂/Q₁ = (N₂/N₁)(D₂/D₁)³  ;  H₂/H₁ = (N₂/N₁)²(D₂/D₁)²  ;  Ẇ₂/Ẇ₁ = (ρ₂/ρ₁)(N₂/N₁)³(D₂/D₁)⁵',
            whenValid: 'Puntos de operación homólogos con semejanza geométrica, alto Re (flujo turbulento) y sin cavitación.',
            symbols: [
              { symbol: 'N', meaning: 'Velocidad de rotación del eje (en rpm o rps, consistente en ambos lados)', unit: 'rpm' },
              { symbol: 'D', meaning: 'Diámetro exterior del impulsor / rodete', unit: 'm' },
              { symbol: 'Q, H, Ẇ', meaning: 'Caudal, altura manométrica y potencia hidráulica/al eje', unit: 'm³/s, m, W' },
            ],
          },
        ],
        diagramType: 'affinity_laws',
        diagramCaption:
          'Interactivo: Cambia la razón de velocidad N₂/N₁ (por ejemplo mediante VDF) y observa cómo escalan linealmente Q, cuadráticamente H y cúbicamente la Potencia Ẇ.',
        professorStepByStep: [
          '1. Si el ejercicio mantiene el mismo rodete (D₁ = D₂) y el mismo fluido (ρ₁ = ρ₂), simplifica D₂/D₁ = 1 quedando las leyes puras de rpm: Q ∝ N, H ∝ N², Ẇ ∝ N³.',
          '2. Verifica que el motor eléctrico soporte la potencia cúbica (N³): subir las rpm apenas un 20% aumenta el consumo eléctrico en 1.2³ = 1.728 (+73%!).',
        ],
        physicalWhy:
          'La velocidad periférica del rodete escala con N·D: el caudal escala con velocidad × área (∝ ND·D² = ND³), la altura con energía cinética específica V²/g (∝ N²D²), y la potencia con flujo másico × energía específica (∝ ρQ·gH ∝ ρN³D⁵).',
        certamenTips: [
          '¡No apliques Q ∝ N a la curva del sistema si hay altura estática Δz ≠ 0! Las leyes de afinidad trasladan la curva de la BOMBA; luego debes intersectarla con H_sistema(Q).',
        ],
      },
    ],
  },
];
