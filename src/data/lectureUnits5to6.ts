import { LectureUnit } from './lectureTypes';

export const LECTURE_UNITS_5_TO_6: LectureUnit[] = [
  {
    id: 'u5',
    unitNumber: 5,
    title: 'Unidad 5: Flujos Internos Viscosos y Pérdidas en Tuberías',
    shortTitle: 'Tuberías',
    reference: 'Sesión 08 (MecFlu_S08) · Çengel Cap. 8 · White Cap. 6',
    summary:
      'Calcula caídas de presión y pérdidas de carga reales: diámetro hidráulico, longitud de entrada, Hagen-Poiseuille, turbulencia de Reynolds y Von Kármán, Diagrama de Moody, pérdidas menores (Borda-Carnot, Dean) y los 4 casos de diseño.',
    slides: [
      {
        id: 'u5-s1',
        slideNumber: 1,
        title: 'Diámetro Hidráulico y Longitud de Entrada Hidrodinámica',
        subtitle: 'Ductos No Circulares y Desarrollo de la Capa Límite Interna',
        simpleExplanation: {
          analogyTitle: 'Un ducto rectangular de aire acondicionado frente a un tubo redondo',
          body: 'Las fórmulas de tuberías usan el diámetro D, pero muchos ductos de ventilación son rectangulares o canales trapezoidales. Para aprovechar exactamente los mismos gráficos de Moody, inventamos un "diámetro equivalente" llamado Diámetro Hidráulico D_H que mide cuánta área de paso tienes frente a cuánto perímetro de pared está frenando el flujo por roce.',
        },
        logicalWalkthrough: [
          'El Diámetro Hidráulico se define como D_H = 4·A / P, donde A es el área transversal mojada y P el perímetro mojado en contacto con paredes sólidas (¡ojo: en canales abiertos al aire, la superficie libre NO se cuenta en P!).',
          'Comprobación rápida: para un tubo circular lleno de diámetro D, A = πD²/4 y P = πD ⇒ D_H = 4·(πD²/4)/(πD) = D.',
          'Al entrar un flujo uniforme a una tubería, en la pared nace una capa límite que crece hacia el eje hasta unirse en el centro. La distancia desde la entrada hasta que el perfil u(r) deja de cambiar se llama Longitud de Entrada Hidrodinámica L_e.',
          'En Flujo Laminar (Re < 2,300), L_e/D ≈ 0.06 · Re (puede llegar a más de 120 diámetros si Re = 2,000!). En Flujo Turbulento (Re > 4,000), la mezcla transversal acelera el desarrollo: L_e/D ≈ 4.4 · Re^(1/6) o ~0.6·Re^(0.25) (típicamente solo 10 a 40 diámetros). Más allá de L_e estamos en Flujo Completamente Desarrollado (∂u/∂x = 0).',
        ],
        formulas: [
          {
            name: 'Diámetro Hidráulico (Ductos No Circulares)',
            expr: 'D_H = 4 · A / P   ;   Re_DH = (ρ · V · D_H) / μ',
            whenValid: 'Sección rectangular a×b: D_H = 2ab/(a+b). Anillo concéntrico D_e - D_i: D_H = D_e - D_i.',
            symbols: [
              { symbol: 'A', meaning: 'Área transversal ocupada por el fluido', unit: 'm²' },
              { symbol: 'P', meaning: 'Perímetro mojado (solo paredes sólidas en contacto con el fluido)', unit: 'm' },
              { symbol: 'D_H', meaning: 'Diámetro hidráulico para evaluar Re y pérdidas', unit: 'm' },
            ],
          },
          {
            name: 'Longitud de Entrada Hidrodinámica (L_e)',
            expr: '(L_e / D)_lam ≈ 0.06 · Re   ;   (L_e / D)_turb ≈ 4.4 · Re^(1/6) (ó 10–40 D)',
            whenValid: 'Entrada redondeada uniforme a tubería recta (tubería circular).',
            symbols: [
              { symbol: 'L_e', meaning: 'Longitud de región de entrada hasta que las capas límite se fusionan en el centro', unit: 'm' },
              { symbol: 'Re', meaning: 'Número de Reynolds basado en D o D_H', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'entrance_length',
        diagramCaption:
          'Interactivo: Ajusta el Número de Reynolds (desde Laminar Re=1,200 hasta Turbulento Re=50,000) y observa cómo cambia la longitud de entrada L_e y el crecimiento de las capas límite hasta el perfil desarrollado.',
        tableData: {
          caption: 'Diámetros Hidráulicos D_H de Secciones Clásicas (Sesión 08)',
          headers: ['Geometría', 'Área A', 'Perímetro Mojado P', 'Diámetro Hidráulico D_H'],
          rows: [
            ['Tubo circular lleno (D)', 'π·D² / 4', 'π·D', 'D'],
            ['Ducto cuadrado (lado a)', 'a²', '4·a', 'a'],
            ['Ducto rectangular (a × b)', 'a·b', '2·(a + b)', '2·a·b / (a + b)'],
            ['Canal abierto rectangular (ancho b, calado y)', 'b·y', 'b + 2y (sin tapa)', '4·b·y / (b + 2y)'],
            ['Tubo circular medio lleno (R)', 'π·R² / 2', 'π·R', '2·R = D (¡igual al lleno!)'],
          ],
        },
        professorStepByStep: [
          '1. En cualquier ducto no circular, tu primer cálculo obligatorio es D_H = 4A/P.',
          '2. Evalúa Re = V·D_H/ν para clasificar el flujo: Laminar (< 2,300), Transición (2,300–4,000) o Turbulento (> 4,000).',
          '3. Comprueba si la tubería es mucho más larga que L_e para justificar la hipótesis de flujo completamente desarrollado.',
        ],
        physicalWhy:
          'En la región de entrada la capa límite es muy fina, por lo que el gradiente ∂u/∂y y el esfuerzo cortante en la pared τ_w son mayores que en la zona completamente desarrollada, además de que el núcleo central se acelera para conservar caudal.',
        certamenTips: [
          '¡Trampa clásica! En un canal abierto rectangular NO incluyas la superficie libre superior en el perímetro mojado P porque el aire casi no ejerce roce.',
        ],
      },
      {
        id: 'u5-s2',
        slideNumber: 2,
        title: 'Flujo Laminar en Tuberías: Deducción de Hagen-Poiseuille',
        subtitle: 'Perfil Parabólico u(r), u_media = ½ u_máx y Factor de Fricción f = 64/Re',
        simpleExplanation: {
          analogyTitle: 'Apretar una manga pastelera o bombear aceite espeso',
          body: 'Cuando el fluido viaja lento o es muy viscoso (Re < 2,300), las láminas avanzan en cilindros concéntricos ordenados sin mezclarse: el fluido en la pared está quieto (no deslizamiento) y el del centro vuela al doble de la velocidad promedio, dibujando una bala parabólica perfecta.',
        },
        logicalWalkthrough: [
          'Partiendo de Navier-Stokes en coordenadas cilíndricas para flujo estacionario, incompresible, horizontal y completamente desarrollado (v_r = v_θ = 0, u = u(r)), sobrevive una ecuación exacta: (1/r)·d/dr(r · du/dr) = (1/μ)·(dp/dx).',
          'Integrando dos veces con simetría en el centro (du/dr = 0 en r = 0) y no deslizamiento en la pared (u = 0 en r = R), obtenemos el Perfil Parabólico de Hagen-Poiseuille:',
          'u(r) = u_máx · [1 - (r/R)²], con u_máx = (-dp/dx) · R² / (4μ).',
          'Integrando el caudal Q = ∫₀ᴿ u(r)·2πr dr resulta la Ley de Hagen-Poiseuille: Q = π · Δp · D⁴ / (128 · μ · L), demostrando que la velocidad promedio es exactamente la mitad de la máxima: V = u_media = ½ · u_máx.',
          'Al reescribir Δp = f · (L/D) · (½ρV²) obtenemos que el factor de fricción laminar vale EXACTAMENTE f_L = 64 / Re, ¡totalmente independiente de la rugosidad ε de la tubería!',
        ],
        formulas: [
          {
            name: 'Ley de Hagen-Poiseuille (Caudal y Caída de Presión Laminar)',
            expr: 'Q = (π · Δp · D⁴) / (128 · μ · L)   ⇔   Δp = (128 · μ · L · Q) / (π · D⁴) = (32 · μ · L · V) / D²',
            whenValid: 'Flujo laminar completamente desarrollado (Re < 2,300) en tubería circular horizontal de diámetro D.',
            symbols: [
              { symbol: 'Δp', meaning: 'Caída de presión por fricción viscosa (p₁ - p₂)', unit: 'Pa' },
              { symbol: 'D', meaning: 'Diámetro interno (¡potencia cuarta! Reducir D a la mitad multiplica Δp por 16)', unit: 'm' },
              { symbol: 'L, μ', meaning: 'Largo del tramo recto y viscosidad dinámica', unit: 'm, Pa·s' },
            ],
          },
          {
            name: 'Perfil Parabólico y Factor de Fricción Laminar',
            expr: 'u(r) = 2 · V · [1 - (r/R)²]   ;   u_media = ½ u_máx   ;   f_L = 64 / Re',
            whenValid: 'Re = ρVD/μ < 2,300; en flujo laminar las rugosidades quedan sumergidas en capas lentas sin efecto.',
            symbols: [
              { symbol: 'u_máx', meaning: 'Velocidad máxima en la línea central r = 0', unit: 'm/s' },
              { symbol: 'f_L', meaning: 'Factor de fricción de Darcy-Weisbach laminar', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'laminar_turbulent',
        diagramCaption:
          'Interactivo: Compara el perfil parabólico laminar (u_media = 0.5 u_máx) frente al perfil plano turbulento y ajusta Re para ver cómo f = 64/Re cae sin depender de ε/D.',
        workedExercises: [
          {
            id: 'ex-thermal-oil-1km',
            title: 'Ejercicio 1: Aceite térmico bombeado por tubería de 1 km',
            source: 'Sesión 08 · Aplicación Hagen-Poiseuille Industrial',
            statement:
              'Se bombea aceite térmico (ρ = 880 kg/m³, μ = 0.080 Pa·s) a caudal Q = 0.01 m³/s por una tubería horizontal de diámetro D = 0.10 m y longitud L = 1,000 m (1 km). Verifique el régimen de flujo y calcule la caída de presión Δp y la pérdida de carga h_f.',
            step1DataSI: [
              'ρ = 880 kg/m³, μ = 0.080 Pa·s',
              'D = 0.10 m ⇒ A = π·(0.10)²/4 = 7.854 × 10⁻³ m²',
              'L = 1,000 m, Q = 0.01 m³/s',
            ],
            step2Physics: [
              '1) Calculamos velocidad media V = Q / A y el Número de Reynolds Re = ρ·V·D / μ.',
              '2) Si Re < 2,300, aplicamos Hagen-Poiseuille exacto: Δp = 128·μ·L·Q / (π·D⁴).',
            ],
            step3Math: [
              'V = 0.01 / 7.854×10⁻³ = 1.273 m/s',
              'Re = (880 · 1.273 · 0.10) / 0.080 = 1,400.6 (< 2,300 ⇒ ¡Flujo Laminar!)',
              'Δp = (128 · 0.080 · 1000 · 0.01) / (π · 0.10⁴) = 102.4 / (3.1416 × 10⁻⁴) = 325,949 Pa ≈ 326.0 kPa',
              'h_f = Δp / (ρ·g) = 325,949 / (880 · 9.81) = 37.76 m (equivale a f = 64/1400.6 = 0.0457)',
            ],
            step4Conclusion:
              'La bomba debe vencer 326 kPa (37.8 metros de columna de aceite) por cada kilómetro. Si duplicáramos el diámetro a 0.20 m, la caída de presión bajaría 16 veces a solo 20.4 kPa!',
          },
          {
            id: 'ex-capillary-880mm3',
            title: 'Ejercicio 2: Viscosímetro Capilar con caudal 880 mm³/s',
            source: 'Sesión 08 · Ejercicio Capilar',
            statement:
              'Un aceite de densidad ρ = 900 kg/m³ fluye a razón de Q = 880 mm³/s a través de un tubo capilar horizontal de diámetro D = 2.0 mm y longitud L = 0.50 m, registrando una caída de presión Δp = 15.0 kPa. Determine la viscosidad dinámica μ del aceite y verifique Re.',
            step1DataSI: [
              'Q = 880 mm³/s × 10⁻⁹ m³/mm³ = 8.80 × 10⁻⁷ m³/s',
              'D = 2.0 mm = 0.002 m, L = 0.50 m',
              'Δp = 15,000 Pa, ρ = 900 kg/m³',
            ],
            step2Physics: [
              'Asumiendo flujo laminar en el capilar, despejamos μ de Hagen-Poiseuille: μ = (π · Δp · D⁴) / (128 · Q · L).',
              'Luego validamos la hipótesis calculando Re = ρ·V·D / μ.',
            ],
            step3Math: [
              'μ = (π · 15,000 · 0.002⁴) / (128 · 8.80×10⁻⁷ · 0.50)',
              'μ = (47,123.9 · 1.6×10⁻¹¹) / (5.632×10⁻⁵) = 7.5398×10⁻⁷ / 5.632×10⁻⁵ = 0.01339 Pa·s (13.4 cP)',
              'V = Q / (πD²/4) = 8.80×10⁻⁷ / 3.1416×10⁻⁶ = 0.280 m/s',
              'Re = (900 · 0.280 · 0.002) / 0.01339 = 37.6 (≪ 2,300 ⇒ Hipótesis laminar validada!)',
            ],
            step4Conclusion:
              'El método capilar entrega μ = 0.0134 Pa·s con Re = 37.6 profundamente dentro del régimen laminar.',
          },
        ],
        professorStepByStep: [
          '1. ¡Nunca apliques Hagen-Poiseuille sin calcular Re primero! Si Re > 2,300 el flujo es turbulento y Δp será muchísimo mayor al calculado por fórmula laminar.',
          '2. Ten extremo cuidado al convertir mm³/s a m³/s: 1 m = 1,000 mm ⇒ 1 m³ = 10⁹ mm³!',
        ],
        physicalWhy:
          'Sin mezcla turbulenta, la energía solo se disipa por deslizamiento molecular ordenado entre cilindros concéntricos de fluido, produciendo una caída de presión lineal con V (en vez de cuadrática con V² como en turbulento).',
        certamenTips: [
          'El factor de fricción laminar f = 64/Re es un resultado exacto analítico de Navier-Stokes, no una correlación empírica.',
          'En tuberías laminares, la potencia de bombeo es muy sensible al diámetro: Ẇ = Q·Δp ∝ Q²/D⁴.',
        ],
      },
      {
        id: 'u5-s3',
        slideNumber: 3,
        title: 'Estructura de la Turbulencia, Esfuerzos de Reynolds y Subcapa Viscosa',
        subtitle: 'De la Descomposición de Reynolds a la Ley Logarítmica de Von Kármán',
        simpleExplanation: {
          analogyTitle: 'Un río con remolinos frenando las zonas rápidas y empujando las lentas',
          body: 'En flujo turbulento (el 99% de los tubos de ingeniería), las partículas no viajan en líneas rectas: dan tumbos caóticos en 3D intercambiando paquetes de fluido rápido del centro con fluido lento de la pared. Ese intercambio mezcla la velocidad dejando un perfil casi plano en el centro y una caída violentísima pegada a la pared.',
        },
        logicalWalkthrough: [
          'Osborne Reynolds propuso descomponer toda magnitud instantánea en su promedio temporal más una fluctuación caótica: u = ū + u\', v = v̄ + v\'.',
          'Al promediar en el tiempo Navier-Stokes, las fluctuaciones no se cancelan en los productos cruzados y aparece un esfuerzo cortante adicional llamado Esfuerzo Aparente o de Reynolds: τ_turb = -ρ · (u\'v\'_prom), típicamente cientos de veces mayor que el roce viscoso μ·dū/dy en el núcleo del tubo!',
          'Sin embargo, justo pegado a la pared sólida (y = 0) las fluctuaciones turbulentas mueren por la condición de no deslizamiento. Esto divide la capa cercana a la pared en tres zonas medidas en coordenadas adimensionales y⁺ = y·u_*/ν (con velocidad de fricción u_* = √(τ_w/ρ)):',
          '1) Subcapa Viscosa (0 ≤ y⁺ < 5): domina μ, u⁺ = y⁺. Si la rugosidad ε de la pared cabe dentro de esta subcapa, ¡la tubería se comporta como HIDRÁULICAMENTE LISA!',
          '2) Capa Buffer o de Transición (5 ≤ y⁺ ≤ 30): compiten viscosidad y turbulencia.',
          '3) Capa Logarítmica de Von Kármán (y⁺ > 30): u⁺ = (1/κ)·ln(y⁺) + B (κ ≈ 0.41, B ≈ 5.0), que también se aproxima empíricamente con la Ley de Potencia u(y)/u_máx = (y/R)^(1/n) (n ≈ 7 ⇒ u_media ≈ 0.82·u_máx).',
        ],
        formulas: [
          {
            name: 'Esfuerzo Cortante Total en Flujo Turbulento',
            expr: 'τ_total = τ_lam + τ_turb = μ · (dū/dy) - ρ · u\'v\'_prom',
            whenValid: 'Flujo turbulento estacionario en promedio; -ρ u\'v\'_prom domina afuera de y⁺ > 30.',
            symbols: [
              { symbol: 'τ_lam', meaning: 'Esfuerzo viscoso molecular (domina en subcapa y⁺ < 5)', unit: 'Pa' },
              { symbol: 'τ_turb', meaning: 'Esfuerzo turbulento de Reynolds por mezcla de vórtices', unit: 'Pa' },
            ],
          },
          {
            name: 'Ley Logarítmica y Perfil de Potencia 1/n',
            expr: 'u / u_* = (1/κ)·ln(y·u_*/ν) + 5.0   ;   u(r)/u_máx = (1 - r/R)^(1/n)',
            whenValid: 'Capa logarítmica (y⁺ > 30); en perfil de potencia n ≈ 7 para Re ~ 10⁵ (u_media/u_máx = 2n²/[(n+1)(2n+1)] ≈ 0.817).',
            symbols: [
              { symbol: 'u_*', meaning: 'Velocidad de fricción √(τ_w / ρ)', unit: 'm/s' },
              { symbol: 'κ', meaning: 'Constante universal de Von Kármán (≈ 0.41)', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'turbulent_sublayer',
        diagramCaption:
          'Interactivo: Aumenta Re o la rugosidad ε para observar cómo se adelgaza la subcapa viscosa (δ_v = 5ν/u_*), exponiendo los granos de rugosidad hacia la zona rugosa plena.',
        professorStepByStep: [
          '1. Comprende esta idea física brillante: ¡la rugosidad de una tubería es relativa a Re! Un mismo tubo de acero puede comportarse "hidráulicamente liso" a Re bajo (subcapa viscosa gruesa tapa los granos) y "completamente rugoso" a Re alto (subcapa más delgada que ε).',
          '2. En el perfil turbulento plano, V ≈ 0.82·u_máx (mucho más uniforme que el 0.5·u_máx laminar), por eso el coeficiente de corrección cinética α ≈ 1.05 ≈ 1.',
        ],
        physicalWhy:
          'Al subir la velocidad, los vórtices turbulentos comprimen la capa límite laminar contra la pared reduciendo el espesor de la subcapa viscosa δ_v ~ 5ν/u_*; cuando ε > δ_v, cada aspereza genera micro-estelas de arrastre de forma independientes de ν.',
        certamenTips: [
          'En tuberías turbulentas α ≈ 1.05 (se suele aproximar α = 1 en la ecuación de energía), mientras en flujo laminar α = 2.0 (¡el doble de energía cinética real que ½V²!).',
        ],
      },
      {
        id: 'u5-s4',
        slideNumber: 4,
        title: 'Ecuación de Darcy-Weisbach y las 4 Zonas del Diagrama de Moody',
        subtitle: 'Correlaciones de Blasius, Nikuradse, Colebrook-White y Tabla de Rugosidades',
        simpleExplanation: {
          analogyTitle: 'El GPS histórico que resume 100 años de experimentos en una hoja',
          body: 'En lugar de deducir una fórmula imposible para el caos turbulento, Lewis Moody trazó en 1944 el mapa definitivo que relaciona el factor de fricción f con dos números: cuán caótico es el flujo (Re) y cuán áspero es el tubo por dentro (ε/D). Todo diseñador de tuberías del planeta vive con este diagrama.',
        },
        logicalWalkthrough: [
          'La pérdida de energía mecánica por fricción a lo largo de una tubería de diámetro D constante se expresa universalmente mediante la Ecuación de Darcy-Weisbach: h_f = f · (L/D) · V²/(2g).',
          'El factor de fricción f se lee en el Diagrama de Moody o se calcula según las 4 zonas físicas exactas gobernadas por el Número de Rugosidad Re_ε = Re · (ε/D):',
          '• Zona 1 — Laminar (Re < 2,300): Recta decreciente única f = 64/Re (independiente de ε/D).',
          '• Zona 2 — Tubería Lisa (Re · ε/D < 65): Las asperezas quedan sumergidas bajo la subcapa viscosa. Rige Blasius (f = 0.3164·Re⁻⁰·²⁵ para Re < 10⁵) o Prandtl-Kármán: 1/√f = 2·log₁₀(Re√f) - 0.8.',
          '• Zona 3 — Zona de Transición (65 ≤ Re · ε/D ≤ 1,300): Compiten viscosidad y rugosidad mediante la ecuación implícita de Colebrook-White (aproximada explícitamente por Haaland con error < 1.5%).',
          '• Zona 4 — Turbulencia Rugosa Plena (Re · ε/D > 1,300): Líneas horizontales donde f ya NO depende de Re sino únicamente de ε/D mediante Nikuradse: 1/√f = -2·log₁₀((ε/D)/3.7).',
        ],
        formulas: [
          {
            name: 'Ecuación de Darcy-Weisbach (Pérdida Mayor por Fricción)',
            expr: 'h_f = f · (L / D) · (V² / 2g)   ;   Δp_f = ρ · g · h_f = f · (L / D) · (½ ρ V²)',
            whenValid: 'Válida tanto en flujo laminar como turbulento, y en cualquier inclinación de tubería de sección constante.',
            symbols: [
              { symbol: 'h_f', meaning: 'Pérdida de carga primaria (en metros de columna del mismo fluido)', unit: 'm' },
              { symbol: 'f', meaning: 'Factor de fricción de Darcy (¡no confundir con factor de Fanning f_F = f/4!)', unit: 'adimensional' },
              { symbol: 'L, D', meaning: 'Largo total del tramo recto y diámetro interno', unit: 'm' },
            ],
          },
          {
            name: 'Ecuación de Colebrook-White (y Explícita de Haaland)',
            expr: '1/√f = -2·log₁₀( (ε/D)/3.7 + 2.51/(Re√f) )   |   1/√f ≈ -1.8·log₁₀( ((ε/D)/3.7)^1.11 + 6.9/Re )',
            whenValid: 'Todo el régimen turbulento (Re > 4,000); Haaland permite despejar f directo sin iterar.',
            symbols: [
              { symbol: 'ε / D', meaning: 'Rugosidad relativa (ambos ε y D en la misma unidad, ej. mm/mm)', unit: 'adimensional' },
              { symbol: 'Re', meaning: 'Número de Reynolds ρVD/μ', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'moody_chart',
        diagramCaption:
          'Interactivo: Ajusta Re y ε/D para mover el punto de operación directamente sobre las 4 zonas del Diagrama de Moody (Laminar, Lisa, Transición y Rugosa Plena) y ver qué correlación aplica.',
        tableData: {
          caption: 'Rugosidad Absoluta Equivalente ε de Materiales Comerciales (Sesión 08)',
          headers: ['Material de Tubería', 'Rugosidad ε [mm]', 'Rugosidad ε [m]', 'Nota Práctica'],
          rows: [
            ['Vidrio, cobre o PVC / plástico liso', '0.0015 (≈ 0)', '1.5 × 10⁻⁶', 'Se comporta como lisa en casi todo rango'],
            ['Acero comercial / hierro forjado nuevo', '0.045 - 0.046', '4.6 × 10⁻⁵', 'Valor estándar de certámenes USM'],
            ['Hierro galvanizado', '0.15', '1.5 × 10⁻⁴', 'Instalaciones domiciliarias y redes agua'],
            ['Hierro fundido (cast iron)', '0.26', '2.6 × 10⁻⁴', 'Redes matrices municipales'],
            ['Hormigón (concreto)', '0.3 - 3.0', '3×10⁻⁴ - 3×10⁻³', 'Acueductos y obras hidráulicas grandes'],
          ],
        },
        professorStepByStep: [
          '1. Calcula ε/D asegurándote de tener ε y D en la misma unidad (mm/mm o m/m).',
          '2. Calcula Re = V·D/ν.',
          '3. Usa Haaland para obtener una excelente estimación inicial de f y refina con 1 o 2 iteraciones de Colebrook-White para precisión de certamen.',
        ],
        physicalWhy:
          'En la zona rugosa plena la pérdida por fricción se debe enteramente al arrastre de forma de miles de micro-protuberancias que disipan energía cinética en proporción exacta a V², haciendo f independiente de la viscosidad.',
        certamenTips: [
          'Error fatal de unidades: poner ε = 0.046 mm dividido por D = 0.1 m sin convertir ⇒ ¡errores de 1,000× en ε/D!',
          'En tuberías comerciales estándar en acero nuevo, f turbulento suele caer entre 0.015 y 0.035; si te da 0.25 o 0.001, revisa tu cálculo.',
        ],
      },
      {
        id: 'u5-s5',
        slideNumber: 5,
        title: 'Pérdidas Menores, Borda-Carnot, Vena Contracta y Flujo de Dean',
        subtitle: 'Física de Expansiones, Contracciones, Difusores y Codos',
        simpleExplanation: {
          analogyTitle: 'Doblar en auto a toda velocidad sobre piso mojado',
          body: 'Cuando el fluido viaja en línea recta va ordenado, pero al obligarlo a cruzar una expansión brusca, una válvula estrangulada o un codo de 90°, su propia inercia no logra doblar pegada a la esquina: el chorro se despega creando remolinos que hierven energía mecánica en calor (pérdidas menores, que en redes cortas de laboratorio ¡son mayores que las de fricción!).',
        },
        logicalWalkthrough: [
          'Cada accesorio (válvula, codo, entrada, salida, cambio de diámetro) produce una pérdida localizada proporcional a la energía cinética: h_m = K · V²/(2g) (ó en energía específica e_L = K · V²/2 = g · h_L), o bien expresada como Longitud Equivalente L_eq = K·D/f.',
          '1) Expansión Brusca (Teorema de Borda-Carnot): Aplicando Continuidad, Energía y Momentum en el volumen de control entre 1 y 2 (donde p₁ actúa en toda la sección ampliada A₂ por los remolinos muertos), demostramos analíticamente sin constantes empíricas que K_exp = (1 - A₁/A₂)² basado en V₁ (¡para salida a un gran estanque A₂ → ∞, K_salida = 1.0 y se pierde el 100% de la energía cinética!).',
          '2) Contracción Brusca y Vena Contracta: El chorro no se contrae al área A₂ en la entrada, sino que sobre-converge formando un cuello más angosto llamado Vena Contracta (A_c < A₂) y luego se expande bruscamente con pérdida Borda-Carnot: K_c ≈ 0.42·[1 - (D₂/D₁)²] (en entrada de borde vivo a tubo K_ent = 0.5).',
          '3) Difusor Cónico: Si abres el ángulo suavemente (< 7°–10°) recuperas presión eficientemente; si θ > 40° el flujo se separa de ambas paredes perdiendo incluso más energía que un escalón brusco.',
          '4) Codos de 90° (Flujo Secundario de Dean): La fuerza centrífuga empuja el fluido rápido del centro hacia la pared exterior del codo y obliga al fluido lento cercano a la pared a volver por arriba y abajo hacia el lado interior, creando un par de vórtices helicoidales contrarrotatorios (Vórtices de Dean).',
        ],
        formulas: [
          {
            name: 'Pérdidas Menores Localizadas y Longitud Equivalente',
            expr: 'h_m = K · (V² / 2g)   ;   e_L = K · (V² / 2) = g · h_m   ;   L_eq = K · (D / f)',
            whenValid: 'V = velocidad media en la tubería de referencia (en expansiones/contracciones usar el tubo MENOR salvo indicación contraria).',
            symbols: [
              { symbol: 'K', meaning: 'Coeficiente de pérdida adimensional del accesorio', unit: 'adimensional' },
              { symbol: 'h_m vs e_L', meaning: 'Pérdida en altura [m = J/N] vs pérdida específica [J/kg = m²/s²]', unit: 'm vs J/kg' },
              { symbol: 'L_eq', meaning: 'Largo de tubo recto que disipa la misma pérdida que el accesorio', unit: 'm' },
            ],
          },
          {
            name: 'Coeficiente Exacto de Borda-Carnot (Expansión Brusca)',
            expr: 'K_exp = (1 - A₁ / A₂)² = [1 - (D₁ / D₂)²]²   (basado en V₁)',
            whenValid: 'Expansión súbita de sección 1 a sección 2 con flujo turbulento uniforme.',
            symbols: [
              { symbol: 'A₁, A₂', meaning: 'Áreas transversales aguas arriba (menor) y aguas abajo (mayor)', unit: 'm²' },
            ],
          },
        ],
        diagramType: 'moody_losses',
        diagramCaption:
          'Interactivo: Conmuta entre Expansión Borda-Carnot (ajusta D₁/D₂), Contracción Vena Contracta y Flujo Secundario de Dean en Codo 90°.',
        tableData: {
          caption: 'Coeficientes K de Pérdidas Menores Estándar (Sesión 08 · Crane)',
          headers: ['Accesorio Hidráulico', 'Coeficiente K Típico', 'Nota / Referencia'],
          rows: [
            ['Entrada borde vivo / reentrante', 'K = 0.50 / K = 0.80–1.0', 'Basado en V dentro del tubo'],
            ['Entrada bien redondeada (r/D ≥ 0.2)', 'K = 0.03 – 0.04', 'Minimiza vena contracta'],
            ['Salida sumergida a gran estanque', 'K = 1.0 (α ≈ 1 turb.)', 'Se disipa toda la carga cinética'],
            ['Codo 90° estándar roscado / bridado', 'K = 0.9 / K = 0.3', 'Codo radio largo bridado K ≈ 0.2'],
            ['Válvula de Globo (100% abierta)', 'K = 10.0 (Crane ~5.7–10)', 'Alta pérdida por doble giro interno'],
            ['Válvula de Compuerta (100% abierta)', 'K = 0.15 – 0.20', 'Paso casi libre; sube fuerte al cerrar'],
          ],
        },
        professorStepByStep: [
          '1. ¡Cuidado con los cambios de diámetro! En una tubería en serie con dos diámetros (como el Certamen 3 con D₁ = 2.5 cm y D₂ = 1.9 cm), multiplica cada K por la velocidad V₁² o V₂² del tubo donde corresponde (en expansiones y contracciones usa el tubo más angosto!).',
          '2. Distingue si la guía pide h_L en metros [m] o energía específica e_L [J/kg]: recuerda que e_L = g · h_L.',
        ],
        physicalWhy:
          'En una expansión brusca no hay fuerza que recupere la presión ideal de Bernoulli porque la zona anular de esquina contiene vórtices muertos a baja presión p₁; esa caída irreversible transforma energía ordenada en turbulencia térmica.',
        certamenTips: [
          'Nunca olvides sumar K_entrada = 0.5 y K_salida = 1.0 cuando el tubo conecta dos estanques grandes!',
          'En redes cortas (como un banco de laboratorio de 2 metros), las pérdidas menores ∑K pueden representar más del 70% de la pérdida total.',
        ],
      },
      {
        id: 'u5-s6',
        slideNumber: 6,
        title: 'Los 4 Casos de Diseño en Redes de Tuberías',
        subtitle: 'Problemas Directos (Tipo 1-2) vs Problemas Iterativos (Tipo 3-4)',
        simpleExplanation: {
          analogyTitle: 'Saber qué pregunta haces define si resuelves en 3 pasos o iterando',
          body: 'En tuberías siempre juegan 5 variables: Caudal (Q), Diámetro (D), Largo (L), Rugosidad (ε) y Pérdida de Carga (h_L). Si te dan Q y D, calculas el desnivel h_L directo en un solo paso. Pero si te piden el caudal Q o el diámetro D dada la altura disponible, ¡no conoces V ni Re al principio, así que debes iterar un bucle inteligente que converge en apenas 2 o 3 vueltas!',
        },
        logicalWalkthrough: [
          'Clasificamos todos los problemas de tuberías simples en 4 casos fundamentales:',
          '• Tipo 1 (Directo): Conocemos Q, D, L, ε, ∑K → Hallamos Δp o h_L. Se resuelve directo: A → V → Re → Moody(f) → h_L.',
          '• Tipo 2 (Directo por Fricción Pura / Iteración si hay accesorios): Nos piden el largo L o una cota Δz dado h_L y Q, D. Despeje lineal directo.',
          '• Tipo 3 (Iterativo en Caudal Q): Conocemos Δz o H disponible, D, L, ε → Hallar Q. Como no sabemos V ni Re, suponemos primero flujo totalmente rugoso (f⁰ = Nikuradse), calculamos V⁰ desde h_L = [f(L/D)+∑K]V²/(2g), calculamos Re⁰, actualizamos f¹ con Colebrook/Haaland y repetimos (converge en 2 pasos!).',
          '• Tipo 4 (Iterativo en Diámetro D): Conocemos Q, Δz disponible, L, ε → Hallar el diámetro mínimo comercial D. Aquí ε/D y Re dependen ambos de D⁻⁵! Suponemos f⁰ ≈ 0.020, despejamos D⁰ ~ [(f·L·Q²)/(h_L)]^(1/5), recalculamos Re y ε/D hasta converger y elegimos el diámetro comercial estándar inmediatamente superior.',
        ],
        formulas: [
          {
            name: 'Ecuación Maestra para Despejar Velocidad (Tipo 3)',
            expr: 'V = √( 2·g·h_L,total / (f · (L/D) + ∑K) )',
            whenValid: 'Iteración estable partiendo de f⁰ en zona totalmente rugosa; converge en ≤ 3 pasos al 0.1%.',
            symbols: [
              { symbol: 'h_L,total', meaning: 'Carga disponible para vencer pérdidas (z₁ - z₂ sin bomba)', unit: 'm' },
              { symbol: '∑K', meaning: 'Suma de todos los coeficientes de pérdidas menores', unit: 'adimensional' },
            ],
          },
          {
            name: 'Aproximación de Diseño para Diámetro (Tipo 4, sin accesorios)',
            expr: 'D ≈ [ (8 · f · L · Q²) / (π² · g · h_f) ]^(1/5)',
            whenValid: 'Punto de partida iterativo suponiendo f⁰ ≈ 0.020 (si hay ∑K, incluir f·L/D + ∑K en el bucle).',
            symbols: [
              { symbol: 'D', meaning: 'Diámetro interno calculado (luego redondear a cédula comercial superior)', unit: 'm' },
            ],
          },
        ],
        diagramType: 'pipe_design_cases',
        diagramCaption:
          'Interactivo: Ejecuta en vivo el algoritmo iterativo Tipo 3 (buscar Q dado Δz) o Tipo 4 (buscar D dado Q y Δz) paso a paso observando la convergencia de f en 3 iteraciones.',
        workedExercises: [
          {
            id: 'ex-two-tanks-globe-valve',
            title: 'Ejercicio: Altura H entre dos estanques con válvula de globo y codos',
            source: 'Sesión 08 · Diapositiva 48 (Problema Clásico Tipo 1)',
            statement:
              'Dos grandes estanques abiertos están conectados por una tubería de hierro forjado de 4 pulgadas (D = 0.1023 m, ε = 0.046 mm) de longitud total L = 50 m (tramos 20 m + 10 m + 20 m) que incluye entrada de borde vivo (K_E = 0.5), 2 codos estándar de 90° (K_c = 0.75 c/u), una válvula de globo totalmente abierta (K_v = 10.0, o Crane 5.7) y salida sumergida (K_s = 1.0). Si transporta agua a 20°C (ν = 1.004×10⁻⁶ m²/s) con caudal Q = 0.04 m³/s, determine la diferencia de nivel H = z₁ - z₂.',
            step1DataSI: [
              'D = 0.1023 m ⇒ A = π·(0.1023)²/4 = 8.219 × 10⁻³ m²',
              'Q = 0.04 m³/s, L = 50 m, ε/D = 0.046 / 102.3 = 4.50 × 10⁻⁴',
              'ν = 1.004 × 10⁻⁶ m²/s',
            ],
            step2Physics: [
              'Ecuación de energía entre las superficies libres 1 y 2 (p₁=p₂=p_atm, V₁≈V₂≈0): z₁ - z₂ = H = h_f + h_m.',
              'Calculamos V, Re, f (Colebrook-White) y sumamos h_f + ∑K · V²/(2g).',
            ],
            step3Math: [
              'V = 0.04 / 8.219×10⁻³ = 4.867 m/s ⇒ Carga cinética V²/(2g) = 4.867² / 19.62 = 1.207 m',
              'Re = (4.867 · 0.1023) / 1.004×10⁻⁶ = 4.959 × 10⁵ (Turbulento)',
              'Colebrook-White (Re = 4.96×10⁵, ε/D = 0.00045) ⇒ f ≈ 0.0176',
              'Pérdida mayor: h_f = 0.0176 · (50 / 0.1023) · 1.207 = 10.38 m',
              'Pérdidas menores (K_v = 10.0 estándar): ∑K = 0.5 + 2·(0.75) + 10.0 + 1.0 = 13.0 ⇒ h_m = 13.0 · 1.207 = 15.69 m',
              'H = 10.38 + 15.69 = 26.07 m  (Nota: si usas Crane 4" con K_v = 5.7, ∑K = 8.7 ⇒ h_m = 10.50 m ⇒ H = 20.88 m)',
            ],
            step4Conclusion:
              '¡Observa que la válvula de globo y accesorios disipan MÁS energía (15.7 m) que los 50 metros completos de tubería recta (10.4 m)! Se requieren ~26.1 m de desnivel por gravedad.',
          },
        ],
        professorStepByStep: [
          '1. Antes de empezar a calcular, escribe qué caso eres (1, 2, 3 o 4) para saber si necesitas iterar o no.',
          '2. En problemas iterativos Tipo 3 o 4, muestra claramente en tu hoja de certamen Iteración 1, Iteración 2 y el error porcentual |f_nuevo - f_viejo| < 1%: ¡los profesores premian muchísimo el orden iterativo!',
        ],
        physicalWhy:
          'Al depender f de Re y ε/D de manera implícita mediante logaritmos (Colebrook-White), no existe despeje algebraico cerrado cuando la incógnita Q o D aparece tanto dentro del logaritmo como en V².',
        certamenTips: [
          'Indica siempre explícitamente de qué tabla o manual sacaste K (Çengel estándar vs Crane) si el enunciado no lo da.',
        ],
      },
    ],
  },

  {
    id: 'u6',
    unitNumber: 6,
    title: 'Unidad 6: Bombeo, Cavitación, Venturi y Turbomáquinas',
    shortTitle: 'Bombeo y Euler',
    reference: 'Sesión 08 · Lab Venturi USM · Certamen 3 & Control 3',
    summary:
      'Integra toda la hidráulica aplicada en sistemas reales: ecuación de energía con bomba, sensibilidad D⁵, curva bomba vs sistema y punto de operación, análisis de cavitación NPSHA/NPSHR, física del Tubo Venturi USM y triángulos de Euler.',
    slides: [
      {
        id: 'u6-s1',
        slideNumber: 1,
        title: 'Ecuación de la Energía con Bomba, Sensibilidad 1/D⁵ y Potencia',
        subtitle: 'De la Carga Manométrica H_B a la Potencia Hidráulica y al Eje',
        simpleExplanation: {
          analogyTitle: 'Subir agua a un estanque en altura pagando la cuenta eléctrica',
          body: 'Una bomba es un elevador energético: toma fluido a baja presión y lo entrega con energía extra H_B para vencer la diferencia de altura geométrica Δz y pagar todas las pérdidas por fricción y accesorios. Y aquí hay un secreto económico brutal: achicar un poco el diámetro dispara las pérdidas con 1/D⁵, multiplicando la cuenta de luz del motor.',
        },
        logicalWalkthrough: [
          'La Ecuación General de la Energía estacionaria entre dos secciones 1 (succión) y 2 (descarga) incluye la altura útil entregada por la bomba H_B, la extraída por una turbina H_T y las pérdidas totales h_L = h_f + h_m:',
          '(p₁/γ + α₁V₁²/2g + z₁) + H_B = (p₂/γ + α₂V₂²/2g + z₂) + H_T + h_L.',
          'Cuando conectamos dos estanques grandes abiertos (p₁ = p₂ = p_atm, V₁ ≈ V₂ ≈ 0), la altura requerida por el sistema es simplemente: H_req = (z₂ - z₁) + h_f + h_m.',
          'Sustituyendo V = 4Q/(πD²), la pérdida por fricción escala como h_f = (8·f·L·Q²)/(π²·g·D⁵). Esa dependencia inversa con la QUINTA potencia del diámetro D⁵ explica por qué bajar de 2 pulgadas a 1 pulgada multiplica ¡32 veces! la fricción para el mismo caudal.',
          'Finalmente, la potencia neta transferida al agua es Ẇ_hid = ρ·g·Q·H_B [W]. Considerando el rendimiento mecánico-hidráulico η_B de la bomba, la potencia real en el eje del motor es Ẇ_eje = Ẇ_hid / η_B.',
        ],
        formulas: [
          {
            name: 'Ecuación General de la Energía (Forma de Alturas)',
            expr: 'p₁/γ + V₁²/2g + z₁ + H_B = p₂/γ + V₂²/2g + z₂ + H_T + h_L,total',
            whenValid: 'Flujo estacionario e incompresible en volumen de control entre secciones 1 y 2 (α ≈ 1 en turbulento).',
            symbols: [
              { symbol: 'H_B', meaning: 'Carga o altura útil agregada al fluido por la bomba', unit: 'm' },
              { symbol: 'h_L,total', meaning: 'Suma de pérdidas mayores (f·L/D·V²/2g) y menores (∑K·V²/2g)', unit: 'm' },
            ],
          },
          {
            name: 'Potencia Hidráulica y Potencia al Freno (Eje)',
            expr: 'Ẇ_hid = γ · Q · H_B = ρ · g · Q · H_B   ;   Ẇ_eje = Ẇ_hid / η_B',
            whenValid: 'η_B ∈ (0, 1] es la eficiencia global hidráulica-mecánica de la bomba.',
            symbols: [
              { symbol: 'Ẇ_hid', meaning: 'Potencia energética neta recibida por el fluido', unit: 'W (J/s)' },
              { symbol: 'Ẇ_eje', meaning: 'Potencia mecánica suministrada por el motor al eje (brake power)', unit: 'W (o kW, HP)' },
              { symbol: 'η_B', meaning: 'Eficiencia de la bomba (ej. 0.70–0.95)', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'pump_system_energy',
        diagramCaption:
          'Interactivo: Ajusta el diámetro de tubería D y el desnivel Δz para visualizar las líneas EGL (Energía) y HGL (Piezométrica) dando el salto +H_B en la bomba y cayendo por fricción h_L.',
        professorStepByStep: [
          '1. Elige siempre los puntos 1 y 2 donde conozcas presiones y velocidades (ej. superficies libres de los estanques, donde V ≈ 0 y p = p_atm).',
          '2. Despeja H_B = (z₂ - z₁) + (p₂ - p₁)/γ + h_L.',
          '3. Para pasar de H_B [m] a Potencia al eje [W], multiplica por ρ·g·Q y DIVIDE (¡nunca multipliques!) por la eficiencia η_B.',
        ],
        physicalWhy:
          'Cada kilogramo de agua requiere g·H_B Joules para subir Δz y vencer la disipación viscosa; como las pérdidas crecen con V² ∝ Q²/D⁴ y además L/D introduce otro factor 1/D, el costo energético explota como 1/D⁵.',
        certamenTips: [
          'Error clásico de examen: multiplicar por η_B en lugar de dividir por η_B al buscar la potencia del motor. La potencia del motor SIEMPRE debe ser MAYOR que la hidráulica!',
          '1 HP = 745.7 W ≈ 0.746 kW.',
        ],
      },
      {
        id: 'u6-s2',
        slideNumber: 2,
        title: 'Curva Bomba vs Curva Sistema y Dinámica del Punto de Operación',
        subtitle: 'Por qué el Caudal se Autorregula en la Intersección H_B(Q) = H_req(Q)',
        simpleExplanation: {
          analogyTitle: 'La bicicleta subiendo una cuesta hasta encontrar su velocidad de equilibrio',
          body: 'La bomba ofrece energía según una curva descendente H_B(Q): si sale poca agua empuja altísimo, si sale mucha agua empuja menos. La tubería en cambio pide energía según una parábola creciente H_req(Q). El sistema solo puede vivir tranquilo donde la oferta de la bomba iguala exactamente a la demanda de la cañería!',
        },
        logicalWalkthrough: [
          'Una bomba centrífuga real no da altura constante: su curva característica del fabricante suele ajustarse como una parábola invertida H_B(Q) = a - b·Q - c·Q² (con altura a válvula cerrada H₀ = a).',
          'En paralelo, la instalación exige H_req(Q) = Δz + R_sist · Q², donde Δz es la carga estática independiente del caudal y R_sist · Q² agrupa todas las pérdidas mayores y menores proporcionales a V².',
          'El Punto de Operación real (Q_op, H_op) ocurre exactamente en la intersección H_B(Q_op) = H_req(Q_op).',
          '¿Qué pasa dinámicamente si en un instante transiente probamos un caudal Q < Q_op? Ahí H_B(Q) > H_req(Q): la bomba inyecta MÁS energía de la que la tubería disipa, por lo tanto el fluido ACELERA aumentando Q hacia Q_op! Si Q > Q_op entonces H_B < H_req y el exceso de fricción FRENA el flujo de regreso a Q_op.',
        ],
        formulas: [
          {
            name: 'Equilibrio del Punto de Operación Bomba-Sistema',
            expr: 'H_bomba(Q_op) = H_req(Q_op) = Δz + [ ∑(f·L/D + K) / (2·g·A²) ] · Q_op²',
            whenValid: 'Operación estacionaria estable sin cavitación severa.',
            symbols: [
              { symbol: 'H_bomba(Q)', meaning: 'Curva característica de carga entregada por la bomba', unit: 'm' },
              { symbol: 'H_req(Q)', meaning: 'Curva resistente del sistema (estática Δz + fricción)', unit: 'm' },
              { symbol: 'Q_op', meaning: 'Caudal real de equilibrio al que opera el sistema', unit: 'm³/s o L/s' },
            ],
          },
        ],
        diagramType: 'pump_npsh',
        diagramCaption:
          'Interactivo: Ajusta la apertura de válvula (cambia la pendiente de H_req) y la cota Δz para observar cómo se desplaza el Punto de Operación Q_op y si el flujo acelera o frena a un Q dado.',
        workedExercises: [
          {
            id: 'ex-s08-pump-21-1',
            title: 'Ejercicio: Bombeo entre estanques (Sesión 08 · Ejercicio 21.1)',
            source: 'Sesión 08 · Diapositiva 48/57 (Ex. 21.1)',
            statement:
              'Una bomba con eficiencia η = 95% impulsa Q = 0.06 m³/s (60 L/s) de agua a través de una tubería de diámetro D = 0.10 m y longitud L = 18 m hasta un estanque elevado H = 15 m. El factor de fricción es f = 0.03 y los accesorios suman entrada (K_E = 0.3), codo (K_K = 0.4) y salida (K_A = 0.8), con bomba ubicada a z_suc = 1 m (nota: la energía total a vencer incluye Δz = 15 m + pérdidas). Calcule la altura de bomba H_B y la potencia requerida en el eje.',
            step1DataSI: [
              'Q = 0.06 m³/s, D = 0.10 m ⇒ A = π·(0.10)²/4 = 7.854 × 10⁻³ m²',
              'L = 18 m, f = 0.03, ∑K = 0.3 + 0.4 + 0.8 = 1.5',
              'Δz = 15 m, η = 0.95, ρ = 1,000 kg/m³, g = 9.81 m/s²',
            ],
            step2Physics: [
              'Calculamos velocidad V y carga cinética V²/(2g).',
              'Sumamos pérdida mayor h_f = f(L/D)V²/(2g) y pérdidas menores h_m = ∑K·V²/(2g).',
              'H_B = Δz + h_f + h_m, y luego Ẇ_eje = (ρ·g·Q·H_B) / η.',
            ],
            step3Math: [
              'V = 0.06 / 7.854×10⁻³ = 7.639 m/s ⇒ V²/(2g) = 7.639² / 19.62 = 2.974 m',
              'h_f = 0.03 · (18 / 0.10) · 2.974 = 5.40 · 2.974 = 16.06 m',
              'h_m = 1.5 · 2.974 = 4.46 m',
              'H_B = 15 + 16.06 + 4.46 = 35.52 m',
              'Ẇ_hid = 1,000 · 9.81 · 0.06 · 35.52 = 20,907 W ≈ 20.91 kW',
              'Ẇ_eje = 20.91 / 0.95 = 22.01 kW',
            ],
            step4Conclusion:
              'A 7.64 m/s (una velocidad altísima en 10 cm!), las pérdidas (20.5 m) superan incluso el desnivel geométrico (15 m), exigiendo 35.5 m de altura y 22.0 kW en el eje.',
          },
        ],
        professorStepByStep: [
          '1. Para diagnosticar en certamen si a un caudal dado Q_prueba "el flujo acelera o frena", evalúa H_B(Q_prueba) y H_req(Q_prueba) por separado.',
          '2. Si H_B > H_req ⇒ sobra energía ⇒ el caudal tiende a AUMENTAR. Si H_B < H_req ⇒ falta energía ⇒ el caudal tiende a DISMINUIR.',
        ],
        physicalWhy:
          'Una bomba entrega máxima energía a caudal nulo y cae al aumentar Q por choques internos y pérdidas en el rodete; la tubería disipa energía cuadráticamente con Q², garantizando un único punto de corte estable.',
        certamenTips: [
          '¡Ojo en el Certamen 3! Cuando el enunciado pregunta "¿el caudal de 1 L/s se mantiene, aumenta o disminuye?", no adivines: compara numéricamente H_B(1 L/s) contra H_req(1 L/s)!',
        ],
      },
      {
        id: 'u6-s3',
        slideNumber: 3,
        title: 'Análisis de Cavitación en Succión: NPSHA vs NPSHR',
        subtitle: 'Altura Máxima de Succión z_{b,máx} y Soluciones de Ingeniería',
        simpleExplanation: {
          analogyTitle: 'Por qué una bomba nunca puede chupar agua desde un pozo de 15 metros de profundidad',
          body: 'La bomba no "jala" el agua por arte de magia: la bomba solo crea baja presión en su entrada y es la presión atmosférica afuera la que empuja el agua hacia arriba. Incluso haciendo vacío perfecto (0 Pa), la atmósfera solo logra empujar agua hasta 10.3 metros. Pero mucho antes de llegar a 0 Pa, el agua hierve al llegar a su presión de vapor p_v y destruye el rodete por cavitación.',
        },
        logicalWalkthrough: [
          'La energía absoluta disponible justo en la brida de entrada (succión) de la bomba por encima de la presión de vapor del líquido se denomina NPSHA (Net Positive Suction Head Available):',
          'NPSHA = (p_1,abs / γ) - (p_v / γ) - z_b - h_L,succión  (cuando el estanque de succión 1 está abierto a p_atm y z₁ = 0).',
          'Por otro lado, cada bomba tiene una caída interna propia en el ojo del rodete cuantificada por el fabricante como NPSHR (Required).',
          'Regla de oro anti-cavitación: SIEMPRE debe cumplirse NPSHA > NPSHR (idealmente con margen ≥ 0.5–1.0 m).',
          'Si NPSHA ≤ NPSHR, el agua hierve en la entrada de la bomba, se desploma el caudal y aparecen vibraciones destructivas. Las dos soluciones directas de ingeniería son: (1) Bajar la cota z_b de la bomba (incluso instalarla "ahogada" con z_b < 0 por debajo del nivel del estanque), o (2) Aumentar el diámetro / acortar la línea de succión para reducir h_L,succión (¡NUNCA estrangules una válvula en la succión!).',
        ],
        formulas: [
          {
            name: 'NPSH Disponible (Estanque de Succión Abierto a p_atm)',
            expr: 'NPSHA = (p_atm - p_v(T)) / (ρ·g) - z_b - h_L,succión',
            whenValid: 'z_b = altura de la entrada de la bomba sobre el nivel libre del estanque 1 (negativa si está bajo el nivel).',
            symbols: [
              { symbol: 'NPSHA', meaning: 'Carga neta positiva de succión disponible en brida entrada', unit: 'm' },
              { symbol: 'p_atm, p_v', meaning: 'Presión barométrica local y presión de vapor a T del fluido', unit: 'Pa abs' },
              { symbol: 'z_b', meaning: 'Elevación de la bomba sobre el espejo de agua de succión', unit: 'm' },
            ],
          },
          {
            name: 'Altura Máxima de Instalación Anti-Cavitación',
            expr: 'z_b,máx = (p_atm - p_v) / (ρ·g) - h_L,succión - NPSHR',
            whenValid: 'Condición límite NPSHA = NPSHR; por seguridad se diseña z_b bastante menor a z_b,máx.',
            symbols: [
              { symbol: 'NPSHR', meaning: 'NPSH requerido especificado en catálogo del fabricante para ese Q', unit: 'm' },
              { symbol: 'z_b,máx', meaning: 'Altura máxima geométrica antes de iniciar ebullición en el ojo del rodete', unit: 'm' },
            ],
          },
        ],
        diagramType: 'cavitation_suction',
        diagramCaption:
          'Interactivo: Eleva la cota z_b de la bomba, aumenta la temperatura del agua o cambia el diámetro de succión para detectar cuándo NPSHA cae bajo NPSHR y estalla la cavitación.',
        workedExercises: [
          {
            id: 'ex-certamen3-pump-cavitation',
            title: 'Ejercicio: Análisis Completo de Bombeo y Cavitación (Certamen 3)',
            source: 'Certamen 3 UTFSM · Problema 1',
            statement:
              'Un sistema bombea agua a 20°C (ρ = 998 kg/m³, ν = 1.004×10⁻⁶ m²/s, p_v = 2,337 Pa) a razón de Q = 1.0 L/s desde un estanque abierto (p_atm = 100 kPa, z₁ = 0) hasta un estanque superior a z₂ = 3.0 m. La succión tiene D₁ = 2.5 cm, L_s = 1.5 m (entrada K_e = 0.5) y la descarga tiene D₂ = 1.9 cm, L_d = 18.0 m con 2 codos bridados radio largo, contracción en bomba y válvula al 50% (ε = 0.046 mm). La bomba tiene H_B(Q[L/s]) = -0.5582·Q² - 3.8441·Q + 28.011 m y NPSHR = 3.2 m. Con z_b = 1.0 m, (a) ¿el caudal tiende a subir o bajar respecto a 1 L/s? (b) ¿Cuál es la cota máxima z_b,máx sin cavitación?',
            step1DataSI: [
              'Q = 1.0 L/s = 0.001 m³/s',
              'D₁ = 0.025 m ⇒ V₁ = 2.037 m/s (V₁²/2g = 0.2115 m), Re₁ = 50,726',
              'D₂ = 0.019 m ⇒ V₂ = 3.527 m/s (V₂²/2g = 0.6341 m), Re₂ = 66,743',
              '(p_atm - p_v)/(ρg) = (100,000 - 2,337) / (998·9.81) = 9.975 m',
            ],
            step2Physics: [
              'Evaluamos H_B(1 L/s) de la curva de bomba y lo comparamos contra H_req = Δz + h_L,succión + h_L,descarga.',
              'Luego aplicamos z_b,máx = (p_atm - p_v)/(ρg) - h_L,succión - NPSHR.',
            ],
            step3Math: [
              'H_B(1 L/s) = -0.5582(1)² - 3.8441(1) + 28.011 = 23.61 m',
              'Succión (ε/D₁ = 0.00184, Re₁ = 50,726 ⇒ f₁ ≈ 0.026): h_L,s = [0.026·(1.5/0.025) + 0.5] · 0.2115 = 2.06 · 0.2115 = 0.436 m',
              'Descarga (f₂ ≈ 0.0265, ∑K_desc ≈ 3.1 con válvula 50% + contracción + codos + salida): h_L,d ≈ [0.0265·(18/0.019) + 3.1] · 0.6341 ≈ 17.89 m',
              'H_req(1 L/s) = (3.0 - 0) + 0.44 + 17.89 = 21.33 m < H_B (23.61 m) ⇒ ¡El flujo AUMENTA por sobre 1 L/s!',
              'Con z_b = 1.0 m: NPSHA = 9.975 - 1.0 - 0.436 = 8.54 m > NPSHR (3.2 m) ⇒ NO cavita.',
              'Altura límite de cavitación: z_b,máx = 9.975 - 0.436 - 3.2 = 6.34 m',
            ],
            step4Conclusion:
              'A 1 L/s la bomba entrega más carga (23.61 m) que la exigida (21.33 m), así que el caudal real acelerará ligeramente por encima de 1 L/s. Con z_b = 1 m opera segura (NPSHA = 8.54 m); recién cavitaría si subimos la bomba sobre 6.34 m.',
          },
        ],
        professorStepByStep: [
          '1. ¡Nunca metas las pérdidas de la tubería de DESCARGA dentro del cálculo de NPSHA! La cavitación ocurre en la ENTRADA de la bomba, así que solo restas las pérdidas de la línea de SUCCIÓN.',
          '2. Si te da z_b,máx < 0 (negativo), significa que la bomba DEBE instalarse sumergida o por debajo del nivel del estanque para evitar que hierva el líquido (típico en agua caliente).',
        ],
        physicalWhy:
          'Al entrar al impulsor giratorio, los álabes aceleran el fluido bruscamente generando zonas locales de baja presión; NPSHR representa exactamente esa caída interna mínima necesaria para impedir que el líquido alcance p_v dentro del rodete.',
        certamenTips: [
          'Si una bomba está cavitando en terreno, cerrar la válvula de descarga reduce Q y baja h_L,succión + NPSHR (solución de emergencia), mientras cerrar una válvula en la SUCCIÓN la destruye de inmediato!',
        ],
      },
      {
        id: 'u6-s4',
        slideNumber: 4,
        title: 'Física Real del Tubo Venturi USM (C_q, K y Error de Paralaje)',
        subtitle: 'Del Flujo Ideal de Bernoulli a la Calibración Experimental del Laboratorio',
        simpleExplanation: {
          analogyTitle: 'Por qué el agua real no llega tan alto en los tubos piezométricos después de la garganta',
          body: 'En teoría ideal sin fricción (Bernoulli), toda la presión que bajó al acelerar en la garganta angosta del Venturi se recuperaría al 100% al ensancharse de nuevo al final. En el banco de laboratorio real de la UTFSM, la fricción viscosa y los remolinos en el difusor de salida roban parte de esa presión (pérdida permanente K), y por eso el caudal real es un pequeño porcentaje menor al teórico (C_q < 1).',
        },
        logicalWalkthrough: [
          'El Tubo Venturi USM cuenta con 11 tomas piezométricas desde la entrada (toma 1, D₁ = 26 mm), pasando por la garganta estrecha (toma 4, D₄ = 16 mm) hasta el difusor de recuperación de salida (toma 11, D₁₁ = 26 mm).',
          'Aplicando Continuidad y Bernoulli ideal entre 1 y 4 obtenemos el Caudal Teórico Ideal: Q_ideal = A₄ · √[ 2·g·Δh₁₋₄ / (1 - (D₄/D₁)⁴) ].',
          'En el laboratorio medimos el caudal real por pesaje/probeta cronometrada y calculamos el Coeficiente de Descarga C_q = Q_real / Q_ideal (típicamente C_q ≈ 0.96–0.99 a Re₄ > 20,000, pero puede caer por debajo de 0.90 a caudales muy bajos).',
          'Además cuantificamos la pérdida irreversible del difusor mediante K = Δh₁₋₁₁ / (V₄²/2g) o la Recuperación de Presión.',
          '¿Por qué en el informe Venturi USM aparecen desviaciones anómalas o incluso C_q > 1 a caudales pequeñísimos (< 6 L/min)? Por dos causas físicas experimentales: (1) Error de paralaje y menisco al leer diferencias milimétricas Δh₁₋₄ ≈ 1–3 mm en tubos de vidrio, y (2) Flujo en transición laminar/bajo Re₄ donde el perfil no es uniforme (α > 1).',
        ],
        formulas: [
          {
            name: 'Caudal Teórico y Coeficiente de Descarga C_q del Venturi',
            expr: 'Q_real = C_q · A₄ · √( 2·g·Δh₁₋₄ / [1 - (D₄/D₁)⁴] )',
            whenValid: 'Fluido incompresible leyendo pies de altura piezométrica Δh₁₋₄ = h₁ - h₄ en el panel vertical.',
            symbols: [
              { symbol: 'C_q', meaning: 'Coeficiente de descarga experimental (Q_real / Q_ideal)', unit: 'adimensional' },
              { symbol: 'D₁, D₄', meaning: 'Diámetro de entrada (26 mm) y de garganta (16 mm) del banco USM', unit: 'm' },
              { symbol: 'Δh₁₋₄', meaning: 'Diferencia piezométrica medida entre toma 1 y garganta 4', unit: 'm.c.a.' },
            ],
          },
          {
            name: 'Coeficiente Global de Pérdida Irreversible del Venturi',
            expr: 'K_vent = (h₁ - h₁₁) / (V₄² / 2g)   ;   (g_USM = 9.79 m/s²)',
            whenValid: 'Basado en la velocidad máxima en la garganta V₄ (D₁ = D₁₁ ⇒ V₁ = V₁₁).',
            symbols: [
              { symbol: 'h₁ - h₁₁', meaning: 'Pérdida permanente neta entre entrada y salida del Venturi', unit: 'm' },
              { symbol: 'K_vent', meaning: 'Coeficiente de pérdida adimensional respecto a energía cinética en garganta', unit: 'adimensional' },
            ],
          },
        ],
        diagramType: 'venturi_usm',
        diagramCaption:
          'Interactivo: Varía el caudal del banco Venturi (de 4 a 40 L/min) para observar los 11 niveles piezométricos reales vs Bernoulli ideal, C_q(Re₄) y la zona crítica de error de paralaje.',
        professorStepByStep: [
          '1. En el laboratorio USM se utiliza g = 9.79 m/s² (latitud de Valparaíso/Santiago) y conversión Δh en milímetros a metros.',
          '2. Siempre reporta Re₄ = ρ·V₄·D₄/μ junto con C_q: demostrar que C_q converge hacia ~0.985 cuando Re₄ supera 20,000 es la esencia del Informe Venturi.',
        ],
        physicalWhy:
          'Mientras la zona convergente (1→4) acelera con gradiente favorable sin separación de capa límite, el difusor divergente (4→11) somete la capa límite a un gradiente adverso de presión que engrosa la estela generando pérdida K.',
        certamenTips: [
          'Cuando el caudal es muy bajo, Δh₁₋₄ crece apenas con Q² (ej. a 5 L/min Δh ≈ 2 mm!), de modo que un error visual de apenas ±0.5 mm altera Q_ideal en más de 12%!',
        ],
      },
      {
        id: 'u6-s5',
        slideNumber: 5,
        title: 'Triángulos de Velocidades y Ecuación de Euler en Bombas Centrífugas',
        subtitle: 'De la Geometría del Rodete (β₂, b₂, rpm) al Torque y Altura Ideal',
        simpleExplanation: {
          analogyTitle: 'Lanzar agua desde un carrusel giratorio hacia afuera',
          body: 'Imagina pararte en el borde de un carrusel girando a velocidad tangencial U₂ y patear una pelota hacia afuera siguiendo un pasillo inclinado un ángulo β₂ (velocidad relativa W₂). Para alguien parado en el suelo afuera del carrusel, la pelota sale con la suma vectorial de ambos movimientos (V₂ = U₂ + W₂). Ese giro tangencial V_θ2 que le imparte el carrusel es exactamente lo que genera el torque en el eje!',
        },
        logicalWalkthrough: [
          'Para analizar un rodete centrífugo aplicamos el Teorema de Transporte de Reynolds para Momentum Angular alrededor del eje de rotación, obteniendo la Ecuación de Euler de las Turbomáquinas:',
          'T_eje = ρ · Q · (R₂ · V_θ2 - R₁ · V_θ1). Cuando la entrada al rodete es puramente radial sin pre-rotación (α₁ = 90° ⇒ V_θ1 = 0), se simplifica a T_eje = ρ · Q · R₂ · V_θ2.',
          'Multiplicando el torque por la velocidad angular ω = 2π·N/60 obtenemos la Potencia ideal transferida al fluido: Ẇ_ideal = T_eje · ω = ρ · Q · U₂ · V_θ2, y dividiendo por ρ·g·Q resulta la Altura Ideal de Euler: H_ideal = (U₂ · V_θ2) / g.',
          '¿Cómo calculamos V_θ2 desde la geometría de los álabes? Construimos el Triángulo de Velocidades en la salida R₂:',
          '• Velocidad periférica del álabe: U₂ = ω · R₂ = π · D₂ · N / 60.',
          '• Velocidad radial de paso (fijada por el caudal y ancho b₂ del rodete): V_r2 = Q / (2π · R₂ · b₂).',
          '• Con álabes curvados hacia atrás (ángulo β₂ medido respecto a la dirección contraria a U₂, estándar típico 20°–60°): W_θ2 = -V_r2 / tan(β₂), por lo tanto V_θ2 = U₂ + W_θ2 = U₂ - V_r2 / tan(β₂).',
        ],
        formulas: [
          {
            name: 'Ecuación de Euler para Bombas Centrífugas (Entrada Radial V_θ1 = 0)',
            expr: 'T_eje = ρ · Q · R₂ · V_θ2   ;   Ẇ_ideal = T_eje · ω   ;   H_ideal = (U₂ · V_θ2) / g',
            whenValid: 'Flujo unidimensional ideal guiado perfectamente por infinitos álabes (sin deslizamiento ni fricción interna).',
            symbols: [
              { symbol: 'T_eje', meaning: 'Torque hidráulico transferido por el rodete al fluido', unit: 'N·m' },
              { symbol: 'U₂', meaning: 'Velocidad tangencial periférica del rodete (ω·R₂)', unit: 'm/s' },
              { symbol: 'V_θ2', meaning: 'Componente tangencial de la velocidad absoluta a la salida', unit: 'm/s' },
            ],
          },
          {
            name: 'Geometría del Triángulo de Salida y Ancho b₂',
            expr: 'b₂ = Q / (2π · R₂ · V_r2)   ;   V_θ2 = U₂ - V_r2 / tan(β₂)',
            whenValid: 'Álabes curvados hacia atrás con ángulo β₂ medido desde -U₂ hasta W₂ (0° < β₂ < 90°).',
            symbols: [
              { symbol: 'b₂', meaning: 'Ancho axial del canal de salida del impulsor', unit: 'm' },
              { symbol: 'V_r2', meaning: 'Componente radial de salida (perpendicular a U₂)', unit: 'm/s' },
              { symbol: 'β₂', meaning: 'Ángulo de salida del álabe respecto a dirección tangencial inversa', unit: '°' },
            ],
          },
        ],
        diagramType: 'euler_impeller',
        diagramCaption:
          'Interactivo: Ajusta las RPM, el ángulo del álabe β₂ y la velocidad radial V_r2 para construir a escala real el triángulo vectorial V₂ = U₂ + W₂ y calcular b₂, T_eje y H_ideal.',
        workedExercises: [
          {
            id: 'ex-certamen3-euler-p2',
            title: 'Ejercicio: Diseño de Impulsor Centrífugo a 3,450 rpm (Certamen 3 · Problema 2)',
            source: 'Certamen 3 UTFSM · Problema 2',
            statement:
              'Un impulsor de bomba centrífuga gira a N = 3,450 rpm bombeando agua (ρ = 1,000 kg/m³) con caudal Q = 0.01 m³/s y entrada radial sin giro (V_θ1 = 0). El diámetro exterior es D₂ = 10 cm, la componente radial de salida es V_r2 = 0.3 m/s y los álabes salen curvados hacia atrás con ángulo β₂ = 60°. Calcule: (a) ancho del impulsor b₂, (b) componentes U₂, W_θ2 y V_θ2, (c) torque T_eje, potencia ideal Ẇ y altura ideal de Euler H_ideal.',
            step1DataSI: [
              'Q = 0.01 m³/s, D₂ = 0.10 m ⇒ R₂ = 0.05 m',
              'N = 3,450 rpm ⇒ ω = 2π · (3,450) / 60 = 361.28 rad/s',
              'V_r2 = 0.30 m/s, β₂ = 60°, ρ = 1,000 kg/m³',
            ],
            step2Physics: [
              '1) Continuidad en el cilindro de salida de área 2π·R₂·b₂ nos da b₂ = Q / (2π·R₂·V_r2).',
              '2) Velocidad periférica U₂ = ω·R₂; desde el triángulo rectángulo de álabe hacia atrás W_θ2 = -V_r2 / tan(β₂) y V_θ2 = U₂ + W_θ2.',
              '3) Ecuación de Euler: T = ρ·Q·R₂·V_θ2, Ẇ = T·ω, H_ideal = U₂·V_θ2 / g.',
            ],
            step3Math: [
              'b₂ = 0.01 / (2π · 0.05 · 0.30) = 0.1061 m = 106.1 mm',
              'U₂ = 361.28 · 0.05 = 18.064 m/s',
              'W_θ2 = -0.30 / tan(60°) = -0.30 / 1.7321 = -0.1732 m/s',
              'V_θ2 = 18.064 - 0.1732 = 17.891 m/s',
              'T_eje = 1,000 · 0.01 · 0.05 · 17.891 = 8.945 N·m',
              'Ẇ_ideal = 8.945 · 361.28 = 3,232 W ≈ 3.23 kW',
              'H_ideal = (18.064 · 17.891) / 9.81 = 32.94 m',
            ],
            step4Conclusion:
              '¡Puedes probar exactamente estos valores (3,450 rpm, β₂ = 60°, D₂ = 10 cm) en vivo dentro del Simulador Caso 4 de esta misma plataforma!',
          },
        ],
        professorStepByStep: [
          '1. ¡Dibuja SIEMPRE el triángulo de velocidades a mano antes de escribir senos o cosenos! Verifica desde qué vector mide el problema el ángulo β₂.',
          '2. Si los álabes son curvados hacia atrás (0° < β₂ < 90°), W_θ2 apunta opuesto a U₂ (resta en V_θ2 = U₂ - V_r2/tan β₂), lo que produce una curva H(Q) estable que cae suavemente al subir el caudal.',
        ],
        physicalWhy:
          'Al cambiar la cantidad de movimiento angular del fluido desde cero en el eje de entrada hasta R₂·V_θ2 en el perímetro de salida, el fluido ejerce una reacción de torque opuesta sobre los álabes que debe vencer el motor.',
        certamenTips: [
          'Error común: olvidar dividir D₂ entre 2 para obtener R₂ en U₂ = ω·R₂ y en T = ρQR₂V_θ2!',
          'Chequea siempre la consistencia: Ẇ_ideal = T·ω debe darte idéntico a ρ·g·Q·H_ideal.',
        ],
      },
    ],
  },
];
