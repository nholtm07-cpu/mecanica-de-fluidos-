# Mapa Conceptual Maestro: Mecánica de Fluidos (USM - MEC120 / Base Çengel)

Este documento reúne, jerarquiza y vincula **todos los conceptos teóricos, ecuaciones, tablas empíricas, certámenes y laboratorios prácticos** de la asignatura, diseñados para estructurar el desarrollo modular del software interactivo **FluidoTermo Lab**.

---

## 1. Árbol Jerárquico Global de la Asignatura

```text
MECÁNICA DE FLUIDOS (MEC120 - USM & LIBRO YUNUS ÇENGEL)
│
├── MÓDULO 1: FUNDAMENTOS, MEDIO CONTINUO Y CINEMÁTICA DEL FLUJO
│   ├── Definición de Fluido y Esfuerzo Cortante
│   ├── Hipótesis del Medio Continuo y Propiedades Macroscópicas
│   ├── Enfoques de Descripción: Euleriano vs. Lagrangiano
│   ├── Visualización: Líneas de Corriente, Trayectoria, Traza y Tubo de Flujo
│   ├── Condición de No Deslizamiento y Origen de la Capa Límite
│   └── Clasificación General de los Flujos y Técnicas de Análisis
│
├── MÓDULO 2: PROPIEDADES DE LOS FLUIDOS Y REOLOGÍA (+ LAB 1: VISCOSIDAD)
│   ├── Propiedades Intensivas vs. Extensivas
│   ├── Masa y Volumen: Densidad, Volumen Específico, Peso Específico y Gravedad Específica (SG)
│   ├── Gases Ideales y Ecuación Térmica de Estado
│   ├── Viscosidad Dinámica y Cinemática: Flujo de Couette y Ley de Newton
│   ├── Reología de Fluidos No Newtonianos (Ley de la Potencia, Bingham, Tixotrópicos)
│   ├── Dependencia Térmica de la Viscosidad (Líquidos vs. Gases)
│   ├── [LABORATORIO 1] Viscosímetro Rotacional (SAE 30) y Viscosímetro Capilar
│   ├── Propiedades Termodinámicas: Energía Interna, Entalpía, Calores Específicos y Energía Total
│   ├── Compresibilidad (Módulo Volumétrico, Golpe de Ariete) y Expansión Térmica
│   ├── Presión de Vapor, Cambio de Fase y Fenómeno de Cavitación
│   └── Tensión Superficial (Gotas, Pompas) y Capilaridad (Ángulo de Contacto)
│
├── MÓDULO 3: ESTÁTICA DE FLUIDOS E HIDROSTÁTICA (+ CERTAMEN 1 Y EJERCICIOS)
│   ├── Presión en un Punto (Isotropía Escalar) y Escalas de Medición (Absoluta, Manométrica, Vacío)
│   ├── Ecuación Fundamental de la Estática de Fluidos (Gradiente de Presión)
│   ├── Distribución Hidrostática en Líquidos Incompresibles y Paradoja Hidrostática
│   ├── Atmósfera Estándar y Variación Politrópica en Gases Compresibles
│   ├── Manometría Avanzada: Tubos en U, Multifluido, Diferenciales, Inclinados y Cilindro-Émbolo
│   ├── Principio de Pascal y Prensa Hidráulica (Multiplicación Mecánica e Hidráulica)
│   ├── Fuerzas Hidrostáticas sobre Superficies Sumergidas (Centroide vs. Centro de Presión)
│   └── Principio de Arquímedes, Empuje y Estabilidad de Cuerpos Flotantes (Iceberg)
│
├── MÓDULO 4: ANÁLISIS INTEGRAL (VOLUMEN DE CONTROL) Y TUBO VENTURI (+ LAB 2)
│   ├── Teorema del Transporte de Reynolds (TTR)
│   ├── Conservación de la Masa: Ecuación de Continuidad e Incompresibilidad
│   ├── Conservación de la Energía Mecánica: Ecuación de Bernoulli Ideal y sus Limitaciones
│   └── [LABORATORIO 2] Tubo de Venturi (11 Piezómetros, Coeficiente de Caudal y Pérdida de Carga)
│
├── MÓDULO 5: ANÁLISIS DIFERENCIAL Y ECUACIONES DE NAVIER-STOKES (BASE CFD)
│   ├── Notación Indicial/Tensorial de Einstein
│   ├── Cinemática Diferencial: Derivada Sustancial (Aceleración Local + Convectiva)
│   ├── Movimientos de Partícula: Traslación, Rotación (Vorticidad), Dilatación y Deformación Angular
│   ├── Ecuación Diferencial de Continuidad ( Conservación Local de Masa)
│   ├── Dinámica de Fluidos No Viscosos: Ecuaciones de Euler
│   └── Dinámica de Fluidos Viscosos: Tensor de Cauchy, Ley de Stokes y Ecuaciones de Navier-Stokes
│
├── MÓDULO 6: ANÁLISIS DIMENSIONAL, SEMEJANZA Y MODELACIÓN
│   ├── Dimensiones Fundamentales (M-L-T-Θ y F-L-T-Θ) y Homogeneidad Dimensional
│   ├── Reducción de Variables: Método de Rayleigh, Teorema Pi de Buckingham y Método de Ipsen
│   ├── Números Adimensionales Clave: Re, Ma, Fr, We, Eu, Cp, St, Ca y CD
│   └── Teoría de Modelos y Similitud: Semejanza Geométrica, Cinemática y Dinámica (Leyes de Escala)
│
├── MÓDULO 7: FLUJOS INTERNOS VISCOSOS Y SISTEMAS DE TUBERÍAS (+ CONTROL 3)
│   ├── Diámetro Hidráulico para Secciones No Circulares y Longitud de Entrada Hidrodinámica
│   ├── Flujo Laminar en Tuberías Circulares: Ley de Hagen-Poiseuille y Factor f = 64/Re
│   ├── Flujo Turbulento: Fluctuaciones de Reynolds, Esfuerzos de Corte y Estructura de Capa Límite
│   ├── Perfiles de Velocidad Turbulenta: Coordenadas de Pared (y+, u+), Ley Logarítmica y Ley de Potencia
│   ├── Pérdidas Primarias (Mayores): Ecuación de Darcy-Weisbach, Diagrama de Moody y Correlaciones
│   ├── Pérdidas Secundarias (Menores/Singulares): Coeficiente K, Longitud Equivalente y Simbología
│   ├── Física de Cambios de Sección: Expansión Súbita (Borda-Carnot), Contracción Súbita y Difusores
│   └── Los 4 Casos de Diseño de Tuberías: Solución Directa vs. Solución Iterativa
│
└── MÓDULO 8: TURBOMÁQUINAS, SISTEMAS DE BOMBEO Y CAVITACIÓN (+ CERTAMEN 3)
    ├── Ecuación General de la Energía con Máquinas Hidráulicas (Líneas EL y HGL)
    ├── Curvas Características de Bombas Centrífugas: Carga H(Q), Eficiencia y Potencia
    ├── Interacción Bomba-Sistema: Punto de Operación y Estabilidad Dinámica del Caudal
    ├── Análisis de Succión y Cavitación: NPSHA vs. NPSHR y Altura Máxima de Instalación
    └── Hidrodinámica del Rodete: Triángulos de Velocidades y Ecuación de Euler de Turbomáquinas
```

---

## 2. Desglose Detallado de Conceptos, Fórmulas y Relaciones por Módulo

### MÓDULO 1: Fundamentos, Medio Continuo y Cinemática del Flujo
* **Definición física de fluido:** Sustancia que se deforma continuamente bajo la aplicación de un esfuerzo cortante ($\tau = \frac{dF}{dA}$), sin importar cuán pequeño sea este, adoptando la forma de su recipiente.
* **Hipótesis del Medio Continuo:** Permite tratar las propiedades moleculares promediadas en un volumen elemental ($\delta V$) como funciones continuas del espacio y del tiempo: velocidad $\vec{V}(x,y,z,t) = u\hat{i} + v\hat{j} + w\hat{k}$, presión $p(x,y,z,t)$, densidad $\rho(x,y,z,t)$, temperatura $T(x,y,z,t)$ y energía $E$.
* **Campos fluidodinámicos:**
  * *Campo escalar:* Presión $p$, temperatura $T$, densidad $\rho$.
  * *Campo vectorial:* Velocidad $\vec{V}$, aceleración $\vec{a}$.
  * *Campo tensorial:* Esfuerzos viscosos $\tau_{ij}$, tasa de deformación $\dot{\gamma}_{ij}$.
* **Sistemas de descripción:**
  * *Enfoque Lagrangiano:* Sigue a una partícula fluida individual de masa fija a lo largo de su trayectoria $\vec{r}(t)$ aplicando $\sum \vec{F} = m\vec{a}$.
  * *Enfoque Euleriano:* Define un Volumen de Control (VC) fijo en el espacio y analiza el flujo a través de su Superficie de Control (SC).
* **Geometría cinemática del flujo:**
  * *Perfil de velocidad:* Curva que une los extremos de los vectores velocidad en una sección transversal.
  * *Línea de corriente:* Curva tangente en todo punto al vector velocidad instantáneo (concepto analítico euleriano).
  * *Tubo de corriente:* Superficie formada por líneas de corriente a través de cuyas paredes laterales no existe flujo transversal.
  * *Línea de trayectoria / traza:* Recorrido real de una partícula en el tiempo (concepto experimental lagrangiano mediante inyección de tinte o humo).
* **Condición de no deslizamiento (*No-slip condition*):** Debido a la viscosidad, un fluido en contacto con una frontera sólida adquiere exactamente la velocidad de dicha superficie ($u_{\text{fluido}} = u_{\text{pared}}$). Esto origina gradientes de velocidad ($\frac{\partial u}{\partial y}$), esfuerzos de corte en la pared ($\tau_w$), fuerzas de arrastre y el desarrollo de la **capa límite**.
* **Clasificación de los flujos:**
  * *Estática vs. Dinámica:* Fluidos en reposo ($\tau = 0$) vs. fluidos en movimiento ($\tau \neq 0$).
  * *Flujos internos vs. externos:* Flujo confinado en tuberías/canales vs. flujo alrededor de perfiles alares, cilindros o esferas (con punto de desprendimiento y estela).
  * *Flujos compresibles vs. incompresibles:* $\Delta \rho \neq 0$ vs. $\Delta \rho = 0$.
  * *Flujos viscosos (reales) vs. no viscosos (ideales):* Con disipación por fricción ($\mu > 0$) vs. sin fricción ($\mu = 0$).

---

### MÓDULO 2: Propiedades de los Fluidos y Reología (+ Laboratorio 1: Viscosidad)
* **Propiedades termodinámicas básicas:**
  * *Intensivas (independientes de la masa):* $T, p, \rho, v, \mu, e, h$.
  * *Extensivas (dependientes de la masa):* Masa $m$, volumen $V$, energía total $E$, peso $W$.
* **Relaciones de masa y densidad:**
  * Densidad: $\rho = \frac{m}{V}$ ($\text{kg}/\text{m}^3$). En el agua alcanza su máximo a $4^\circ\text{C}$ ($\rho \approx 1000\text{ kg}/\text{m}^3$).
  * Volumen específico: $v = \frac{1}{\rho}$ ($\text{m}^3/\text{kg}$).
  * Peso específico: $\gamma = \rho g$ ($\text{N}/\text{m}^3$).
  * Gravedad específica (densidad relativa): $SG = GE = \frac{\rho}{\rho_{\text{H}_2\text{O}(4^\circ\text{C})}}$.
  * Ecuación de estado de gases: $p v = Z R T$ (para gas ideal $Z = 1 \Rightarrow p = \rho R T$).
* **Viscosidad y Ley de Newton:**
  * *Viscosidad dinámica (absoluta) $\mu$:* Medida de la resistencia interna del fluido a la tasa de deformación angular. Unidades: $\text{Pa}\cdot\text{s} = \text{kg}/(\text{m}\cdot\text{s})$ ($1\text{ Poise} = 100\text{ cP} = 0.1\text{ Pa}\cdot\text{s}$).
  * *Flujo de Couette entre placas paralelas:* Si el espesor $h$ es pequeño, el perfil de velocidades es lineal ($\frac{du}{dy} = \frac{U}{h}$) y el esfuerzo cortante es:
    $$\tau_{yx} = \mu \frac{du_x}{dy} = \mu \frac{U}{h} \implies F_x = \tau_{yx} A$$
  * *Viscosidad cinemática $\nu$:* Relaciona fuerzas viscosas y densidad:
    $$\nu = \frac{\mu}{\rho} \quad [\text{m}^2/\text{s}] \quad (1\text{ Stoke} = 100\text{ cSt} = 10^{-4}\text{ m}^2/\text{s})$$
  * *Desmitificación clave:* Mayor densidad **no** implica mayor viscosidad (ej. el mercurio tiene $\rho = 13546\text{ kg}/\text{m}^3$ y $\mu = 1.53\text{ cP}$, mientras que el aceite de ricino tiene $\rho = 961\text{ kg}/\text{m}^3$ y $\mu = 985\text{ cP}$).
  * *Efecto de la temperatura $T$:*
    * En **líquidos**, al subir $T$ disminuye la cohesión intermolecular y **baja $\mu$** (ley exponencial de Andrade).
    * En **gases**, al subir $T$ aumentan los choques moleculares y el intercambio de cantidad de movimiento, por lo que **sube $\mu$**.
* **Reología y Fluidos No Newtonianos:**
  * Modelo general de Ley de la Potencia (Ostwald-de Waele):
    $$\tau_{yx} = k \left(\frac{du_x}{dy}\right)^n$$
  * *Newtoniano ($n = 1$):* Pendiente constante $\mu$ (agua, aire, aceite SAE 30).
  * *Pseudoplástico ($n < 1$):* Se adelgaza con el esfuerzo; la viscosidad aparente disminuye al aumentar la tasa de corte (sangre, pintura, leche, arcilla).
  * *Dilatante ($n > 1$):* Se espesa con el esfuerzo; la viscosidad aparente crece con la deformación (almidón de maíz en agua, soluciones concentradas de azúcar).
  * *Plástico de Bingham:* Requiere superar un esfuerzo de fluencia umbral ($\tau_0$) antes de comenzar a fluir como líquido (barro, pasta dental, metales dúctiles tras fluencia).
  * *Dependientes del tiempo:* **Tixotrópicos** (su viscosidad decrece con el tiempo de agitación, ej. kétchup, mieles) y **Reopécticos** (su viscosidad aumenta con la duración del esfuerzo).
  * *Viscoelásticos:* Materiales de Maxwell, Kelvin y Oldroyd-B.
* **Aplicación Experimental — Laboratorio N°1 (Viscosidad SAE 30 a $22^\circ\text{C}$) y Viscosímetros:**
  * *Viscosímetro de cilindros concéntricos (rotacional):* Cilindro interior de radio $R$ y largo $L$ girando a $\dot{n}\text{ rpm}$ dentro de una brecha $e$ con par de torsión medido $M$:
    $$\tau = \mu \frac{\omega R}{e} \implies \mu = \frac{M \cdot e}{2\pi R^3 L \omega}$$
  * *Viscosímetro capilar:* Determinación de $\nu$ en $\text{cSt}$ cronometrando el tiempo de vaciado por gravedad ($t_1, t_2$) o mediante Hagen-Poiseuille conociendo $\Delta p$, $Q$, $L$ y $D$.
* **Propiedades Térmicas, Compresibilidad y Fenómenos Interfaciales:**
  * *Energía y calores específicos:* Energía interna específica $u$, entalpía específica $h = u + pv$, calores específicos $c_v = \left(\frac{\partial u}{\partial T}\right)_v$ y $c_p = \left(\frac{\partial h}{\partial T}\right)_p$ (en líquidos incompresibles $c_p \approx c_v$). Energía total por unidad de masa de un fluido en movimiento:
    $$e = u + pv + \frac{1}{2}c^2 + gz = h + \frac{1}{2}c^2 + gz$$
  * *Compresibilidad:* Módulo de elasticidad volumétrico $\kappa = -V \left(\frac{\partial p}{\partial V}\right)_T = \rho \left(\frac{\partial p}{\partial \rho}\right)_T$ (en agua $\kappa \approx 2.1\times 10^9\text{ Pa}$; en gas ideal isotérmico $\kappa_T = p$). Define la velocidad del sonido $c = \sqrt{\frac{\kappa}{\rho}}$ y gobierna el **golpe de ariete**.
  * *Expansión térmica volumétrica:* Coeficiente $\gamma_T = 3\alpha = \frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_p = -\frac{1}{\rho}\left(\frac{\partial \rho}{\partial T}\right)_p$ (origina convección natural). Efecto combinado:
    $$\frac{dv}{v} = -\frac{\Delta \rho}{\rho} \approx \gamma_T \Delta T - \frac{1}{\kappa}\Delta p$$
  * *Presión de vapor ($p_v$):* Presión de saturación a una temperatura dada en la que el líquido coexiste en equilibrio con su vapor (para agua a $20^\circ\text{C}$, $p_v \approx 2337\text{ Pa}$). Si la presión local cae bajo $p_v$, ocurre ebullición en frío (**cavitación**).
  * *Tensión superficial ($\sigma$) y Capilaridad:* Trabajo por unidad de área $\sigma = \frac{dW}{dA} = \frac{F}{2L}$ ($\text{N}/\text{m}$).
    * Sobrepresión en gota esférica (1 interfaz): $\Delta p = \frac{2\sigma}{R}$.
    * Sobrepresión en burbuja/pompa de jabón (2 interfaces): $\Delta p = \frac{4\sigma}{R}$.
    * Ascenso/descenso capilar en tubo de diámetro $D$:
      $$h = \frac{4\sigma \cos\theta}{\rho g D}$$
      (El agua moja el vidrio con menisco cóncavo $\theta \approx 20^\circ$ y sube; el mercurio tiene cohesión mayor que adhesión, menisco convexo $\theta > 90^\circ$ y desciende).

---

### MÓDULO 3: Estática de Fluidos e Hidrostática (+ Certamen 1 y Guía de Ejercicios)
* **Presión en un punto y Escalas:**
  * Fuerza normal compresiva por unidad de área: $p = \lim_{\Delta A \to \delta A} \frac{\Delta F_n}{\Delta A}$. En reposo no hay esfuerzos de corte y la presión es isotrópica ($p_x = p_y = p_z = p_n$).
  * Relaciones de escala:
    $$p_{\text{abs}} = p_{\text{atm}} + p_{\text{man}} \quad ; \quad p_{\text{abs}} = p_{\text{atm}} - p_{\text{vac}}$$
* **Ecuación General de Variación de Presión:**
  * Aplicando la 2ª Ley de Newton a un elemento diferencial:
    $$-\nabla p + \rho \vec{g} = \rho \vec{a} \implies dp = -\rho a_x dx - \rho a_y dy - \rho(a_z + g)dz$$
  * En reposo ($\vec{a} = \vec{0}$): $\frac{\partial p}{\partial x} = 0$, $\frac{\partial p}{\partial y} = 0$, $\frac{\partial p}{\partial z} = -\rho g = -\gamma$.
  * *Fluido incompresible ($\rho = \text{cte}$):* $p(h) = p_0 + \rho g h$. La presión en el fondo depende únicamente de la profundidad $h$ y no de la forma del recipiente (**Paradoja Hidrostática**). Carga piezométrica: $h_p = \frac{p}{\gamma} + z = \text{cte}$.
  * *Atmósfera estándar politrópica:* Con gradiente térmico lineal $T(z) = T_0 - Bz$ ($B = 0.0065\text{ K}/\text{m}$, $T_0 = 288.15\text{ K}$):
    $$p(z) = p_0 \left(1 - \frac{Bz}{T_0}\right)^{\frac{g}{RB}}$$
* **Sistemas de Manometría y Dispositivos Cilindro-Émbolo (Ejercicios y Certamen 1):**
  * *Manómetros multifluido en U:* Recorrido algebraico sumando $+\rho_i g h_i$ al descender y restando $-\rho_i g h_i$ al ascender entre dos puntos $A$ y $B$.
  * *Desplazamiento de meniscos por cambio de presión ($\Delta p$):* Relación cinemática de volúmenes en ramas de distinta sección ($A_1 \Delta h_1 = A_2 \Delta h_2$) o igual sección ($2a + \Delta h = h_0$).
  * *Manómetro de tubo inclinado:* Amplifica la lectura lineal $L = \frac{h}{\sin\theta}$ y permite diseñar la razón de diámetros $d/D$ según el error admisible de escala.
  * *Equilibrio en sistemas cilindro-émbolo verticales:* Balance de fuerzas considerando peso del pistón ($W_p = m_p g$), fuerza de resorte ($F_{\text{res}} = kx$), fuerza de tracción externa ($F$) y presión atmosférica:
    $$p_{\text{int}} A_p = p_{\text{atm}} A_p + m_p g + F_{\text{res}} - F_{\text{tracción}}$$
* **Principio de Pascal y Prensa Hidráulica:**
  * Un cambio de presión aplicado a un fluido confinado incompresible se transmite íntegramente a todos los puntos:
    $$p_1 = p_2 \implies \frac{F_1}{A_1} = \frac{F_2}{A_2} \implies F_2 = F_1 \left(\frac{D_2}{D_1}\right)^2$$
  * Conservación de volumen desplazado: $L_2 = L_1 \left(\frac{D_1}{D_2}\right)^2$. Si existe palanca mecánica de razón $R_{\text{pal}}$, la ventaja mecánica total es $VM_{\text{total}} = R_{\text{pal}} \cdot \left(\frac{D_2}{D_1}\right)^2$.
* **Fuerzas Hidrostáticas sobre Superficies Planas Sumergidas:**
  * *Magnitud de la fuerza resultante:* Evaluada en la profundidad del centroide del área ($z_s = w_s \cos\alpha$, con $\alpha$ medido respecto a la vertical o $\sin\theta$ respecto a la horizontal):
    $$F_R = p_s A = (p_0 + \rho g z_s) A$$
  * *Centro de presión ($D$):* Punto de aplicación de $F_R$, ubicado siempre por debajo del centroide ($S$) debido a la distribución triangular/trapezoidal de presiones. Si $p_0$ actúa por ambos lados de la placa (como en una compuerta con atmósfera al reverso), la excentricidad $e$ es:
    $$w_D = w_s + e \quad ; \quad e = \frac{I_{xx,s}}{A w_s} \quad ; \quad x_D = x_s + \frac{I_{wx,s}}{A w_s}$$
  * *Momento hidrostático sobre válvulas pivotadas en el centroide:* $M_h = F_R \cdot e = \gamma \cos\alpha \cdot I_{xx,s}$.
* **Principio de Arquímedes y Flotabilidad:**
  * Fuerza de empuje vertical hacia arriba igual al peso del fluido desalojado:
    $$F_b = \rho_{\text{fluido}} g V_{\text{desalojado}}$$
  * Fracción sumergida de un cuerpo flotante libre (ej. iceberg): $\frac{V_{\text{sum}}}{V_{\text{total}}} = \frac{\rho_{\text{cuerpo}}}{\rho_{\text{fluido}}}$.
  * Determinación experimental de densidad por pesaje en aire ($G$) y sumergido ($G_{\text{sum}}$): $\rho_{\text{ob}} = \frac{G}{G - G_{\text{sum}}}\rho_{\text{fl}}$.

---

### MÓDULO 4: Análisis Integral (Volumen de Control) y Laboratorio N°2: Tubo de Venturi
* **Ecuaciones de Conservación en Volumen de Control:**
  * *Ecuación de Continuidad (flujo incompresible estacionario):*
    $$Q = A_1 V_1 = A_2 V_2 = \text{cte} \implies V_i = \frac{Q}{A_i}$$
  * *Ecuación de Bernoulli (flujo ideal, incompresible, estacionario, sin roce ni trabajo de eje a lo largo de una línea de corriente):*
    $$\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2$$
* **Modelamiento Completo del Tubo de Venturi (Laboratorio N°2 y Póster USM):**
  * *Geometría real del banco USM:* Tubo horizontal ($z_1 = z_4 = z_{11}$) con diámetro de entrada $D_1 = 26\text{ mm}$, garganta $D_4 = 16\text{ mm}$, salida $D_{11} = 26\text{ mm}$ y 11 tomas piezométricas ubicadas en $x \in [-12, 7, 18, 33, 48, 63, 78, 93, 108, 123, 143]\text{ mm}$ respecto al inicio del cono convergente.
  * *Caída de presión medida vs. teórica entre entrada (1) y garganta (4):*
    $$\Delta p_{\text{medido}} = \rho g (h_1 - h_4) \quad ; \quad \Delta p_{\text{teórico}} = \frac{1}{2}\rho (V_4^2 - V_1^2)$$
  * *Caudal Teórico de Venturi ($Q_{\text{teórico}}$):* Combinando Bernoulli y continuidad entre (1) y (4):
    $$Q_{\text{teórico}} = A_4 \sqrt{\frac{2g(h_1 - h_4)}{1 - (A_4/A_1)^2}}$$
  * *Coeficiente de Caudal o Descarga ($C_q$):* Cuantifica la desviación real por capa límite viscosa en la garganta ($C_q \approx 0.95 - 0.99$ en régimen turbulento desarrollado):
    $$C_q = \frac{Q_{\text{medido}}}{Q_{\text{teórico}}}$$
  * *Irreversibilidad en el Difusor y Coeficiente de Pérdida Global ($K$):* Mientras que en la zona convergente ($1 \to 4$) el flujo acelerado cumple Bernoulli con error $< 2.5\%$, en el cono divergente ($5 \to 11$) el gradiente adverso de presión produce separación y microturbulencia, por lo que $h_{11} < h_1$. La pérdida permanente de presión es $\Delta p_{\text{pérdida}} = \rho g (h_1 - h_{11})$ y su coeficiente de pérdida referido a la entrada es:
    $$K = \frac{2\Delta p_{\text{pérdida}}}{\rho V_1^2} = \frac{2g(h_1 - h_{11})}{V_1^2}$$
  * *Dependencia con el Número de Reynolds en la garganta ($Re_4 = \frac{\rho V_4 D_4}{\mu}$):* A medida que $Re_4$ crece hacia turbulencia plena, tanto $C_q$ como $K$ tienden a estabilizarse asintóticamente.

---

### MÓDULO 5: Análisis Diferencial y Ecuaciones de Navier-Stokes (Base CFD)
* **Notación Tensorial de Einstein:** Subíndice repetido indica sumatoria ($\frac{\partial u_i}{\partial x_i} = \nabla \cdot \vec{V}$); subíndices libres indican componentes de vector o tensor de segundo orden ($A_{ij}$).
* **Derivada Sustancial (Material o Total):** Vincula la tasa de cambio lagrangiana de una partícula con las derivadas eulerianas del campo:
  $$\frac{D\varphi}{Dt} = \underbrace{\frac{\partial \varphi}{\partial t}}_{\text{Cambio local}} + \underbrace{u\frac{\partial \varphi}{\partial x} + v\frac{\partial \varphi}{\partial y} + w\frac{\partial \varphi}{\partial z}}_{\text{Cambio convectivo } (\vec{V}\cdot\nabla)\varphi}$$
  * *Vector aceleración:* $\vec{a} = \frac{D\vec{V}}{Dt} = \frac{\partial \vec{V}}{\partial t} + (\vec{V}\cdot\nabla)\vec{V}$ (un flujo estacionario con $\frac{\partial \vec{V}}{\partial t} = \vec{0}$ tiene aceleración convectiva no nula en una tobera o Venturi).
* **Cinemática Diferencial de la Partícula Fluida:**
  * *Rotación y Vorticidad:* Velocidad angular media $\vec{\Omega} = \frac{1}{2}(\nabla \times \vec{V})$ y vector vorticidad $\vec{\omega} = 2\vec{\Omega} = \nabla \times \vec{V}$ (en 2D: $\omega_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}$). Si $\nabla \times \vec{V} = \vec{0}$, el flujo es **irrotacional**.
  * *Tasa de dilatación volumétrica:* $\frac{1}{\delta V}\frac{D(\delta V)}{Dt} = \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = \nabla \cdot \vec{V}$ (nula en flujos incompresibles).
  * *Tensor tasa de deformación:* Deformaciones lineales $\dot{\epsilon}_{ii} = \frac{\partial u_i}{\partial x_i}$ y deformaciones angulares cortantes $\dot{\gamma}_{ij} = \frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}$.
* **Ecuaciones Diferenciales de Conservación:**
  * *Continuidad General:* $\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \vec{V}) = 0$. Para fluido incompresible ($\rho = \text{cte}$): $\nabla \cdot \vec{V} = 0$.
  * *Ecuaciones de Euler (fluido no viscoso $\mu = 0$):*
    $$\rho \left(\frac{\partial \vec{V}}{\partial t} + (\vec{V}\cdot\nabla)\vec{V}\right) = -\nabla p + \rho \vec{g}$$
    *(Al integrarse sobre una línea de corriente estacionaria e incompresible, demuestra analíticamente la Ecuación de Bernoulli).*
  * *Ecuaciones de Cauchy (cualquier medio continuo con tensor de esfuerzos $T_{ij}$):*
    $$\rho \frac{Dv_i}{Dt} = -\frac{\partial p}{\partial x_i} + \rho g_i + \frac{\partial \tau_{ji}}{\partial x_j}$$
  * *Relaciones Constitutivas de Stokes (fluido newtoniano isotrópico):*
    $$T_{ij} = -p\delta_{ij} + \mu\left(\frac{\partial v_i}{\partial x_j} + \frac{\partial v_j}{\partial x_i} - \frac{2}{3}(\nabla\cdot\vec{V})\delta_{ij}\right)$$
  * *Ecuaciones de Navier-Stokes (incompresible y $\mu = \text{cte}$):*
    $$\rho \left(\frac{\partial \vec{V}}{\partial t} + (\vec{V}\cdot\nabla)\vec{V}\right) = -\nabla p + \mu \nabla^2 \vec{V} + \rho \vec{g}$$
    *(Sistema de 4 ecuaciones junto a continuidad para 4 incógnitas: $u, v, w, p$; base de las simulaciones numéricas en Autodesk CFD / Fusion 360).*

---

### MÓDULO 6: Análisis Dimensional, Semejanza y Modelación Experimental
* **Homogeneidad Dimensional y Teorema $\Pi$ de Buckingham:**
  * Dimensiones primarias: $[M, L, T, \Theta]$ o $[F, L, T, \Theta]$ relacionadas por $[F] = [M L T^{-2}]$.
  * Si un fenómeno físico involucra $n$ variables dimensionales ($x_1 = f(x_2, \dots, x_n)$) descritas por $k$ dimensiones primarias, puede reducirse a $n - k$ grupos adimensionales independientes:
    $$\Pi_1 = \phi(\Pi_2, \Pi_3, \dots, \Pi_{n-k})$$
  * Métodos de resolución: Sistema algebraico de exponentes (Rayleigh/Buckingham) y tabla de eliminación escalonada (**Método de Ipsen**).
* **Catálogo de Números Adimensionales y su Significado Físico:**
  * **Número de Reynolds ($Re$):** $\frac{\text{Fuerzas de Inercia}}{\text{Fuerzas Viscosas}} = \frac{\rho V L}{\mu} = \frac{V L}{\nu}$ (rige flujos internos en ductos y capa límite subsónica).
  * **Número de Froude ($Fr$):** $\frac{\text{Fuerzas de Inercia}}{\text{Fuerzas Gravitacionales}} = \frac{V}{\sqrt{g L}}$ o $\frac{V^2}{g L}$ (rige flujos con superficie libre, canales, vertederos y olas de barcos: $Fr < 1$ subcrítico, $Fr = 1$ crítico, $Fr > 1$ supercrítico con resalto hidráulico).
  * **Número de Mach ($Ma$):** $\frac{\text{Fuerzas de Inercia}}{\text{Fuerzas de Compresibilidad}} = \frac{V}{a}$ (rige aerodinámica compresible; para $Ma < 0.3$ el flujo se modela como incompresible).
  * **Número de Weber ($We$):** $\frac{\text{Fuerzas de Inercia}}{\text{Fuerzas de Tensión Superficial}} = \frac{\rho V^2 L}{\sigma}$ (rige atomización de sprays, gotas y películas delgadas).
  * **Número de Euler ($Eu$) y Coeficiente de Presión ($C_p$):** $\frac{\text{Fuerzas de Presión}}{\text{Fuerzas de Inercia}} = \frac{\Delta p}{\rho V^2}$ ($C_p = \frac{p - p_\infty}{\frac{1}{2}\rho V_\infty^2} = 2 Eu$).
  * **Número de Cavitación ($Ca$):** $Ca = \frac{p - p_v}{\frac{1}{2}\rho V^2}$ (evalúa inicio de vaporización en hélices, válvulas y bombas).
  * **Número de Strouhal ($St$):** $St = \frac{n D}{V} = \frac{\omega L}{V}$ (rige frecuencia de desprendimiento de vórtices de Von Kármán tras cilindros).
  * **Coeficiente de Arrastre ($C_D$):** $C_D = \frac{F_D}{\frac{1}{2}\rho V^2 A}$ (para esfera en régimen reptante $Re \ll 1$, Ley de Stokes: $C_D = \frac{24}{Re}$).
* **Teoría de Modelos, Similitud y Leyes de Escala:**
  * *Semejanza Geométrica:* Razón de escala lineal constante $\lambda = \frac{L_p}{L_m} \implies \frac{A_p}{A_m} = \lambda^2$, $\frac{V_p}{V_m} = \lambda^3$ y escalamiento de rugosidad $\frac{k_p}{k_m} = \lambda$.
  * *Semejanza Cinemática:* Líneas de corriente homólogas; factor temporal $\tau = \frac{t_p}{t_m} \implies \frac{V_p}{V_m} = \frac{\lambda}{\tau}$.
  * *Semejanza Dinámica:* Igualdad de números adimensionales dominantes entre prototipo ($p$) y modelo ($m$):
    * Bajo **Semejanza de Froude ($Fr_p = Fr_m$, con $g_p = g_m$ y mismo fluido):**
      $$\frac{V_p}{V_m} = \lambda^{1/2} \quad ; \quad \frac{Q_p}{Q_m} = \lambda^{5/2} \quad ; \quad \frac{F_p}{F_m} = \lambda^3 \quad ; \quad \frac{P_p}{P_m} = \lambda^{7/2}$$
    * Bajo **Semejanza de Reynolds ($Re_p = Re_m$):**
      $$\frac{V_p}{V_m} = \frac{\nu_p}{\nu_m}\frac{1}{\lambda} \quad ; \quad \frac{\dot{m}_p}{\dot{m}_m} = \frac{\mu_p}{\mu_m}\lambda$$
    * *Leyes de Afinidad en Turbomáquinas (Ejercicio 23.2):* Grupos adimensionales de caudal $\Pi_Q = \frac{Q}{n D^3}$, altura $\Pi_H = \frac{g H}{n^2 D^2}$ y potencia $\Pi_P = \frac{P}{\rho n^3 D^5}$.

---

### MÓDULO 7: Flujos Internos Viscosos y Redes de Tuberías (+ Control 3)
* **Geometría de Ductos y Región de Entrada:**
  * *Diámetro Hidráulico ($D_H$):* Para ductos no circulares de área $A$ y perímetro mojado $P$:
    $$D_H = \frac{4A}{P} = 4 R_h \quad \left(\text{Ducto rectangular } L_1 \times L_2: \; D_H = \frac{2L_1 L_2}{L_1 + L_2}\right)$$
  * *Longitud de Entrada Hidrodinámica ($L_e$):* Distancia hasta alcanzar perfil totalmente desarrollado $u(r)$:
    * Laminar ($Re < 2300$): $\frac{L_e}{D} \approx 0.06 Re$.
    * Turbulento ($Re > 4000$): $\frac{L_e}{D} \approx 0.6 Re^{0.25}$ (o $4.4 Re^{1/6}$).
* **Flujo Laminar en Tuberías Circulares (Hagen-Poiseuille):**
  * Balance de fuerzas en elemento cilíndrico e integración con condición de no deslizamiento ($u(r_0) = 0$):
    $$u(r) = -\frac{r_0^2}{4\mu}\frac{d(p + \gamma z)}{dl}\left(1 - \frac{r^2}{r_0^2}\right) = u_{\max}\left(1 - \frac{r^2}{r_0^2}\right)$$
  * Velocidad media $\bar{u} = \frac{1}{2}u_{\max}$ y caudal volumétrico de Hagen-Poiseuille (tubería horizontal):
    $$\dot{V} = Q = \frac{\pi r_0^4 \Delta p}{8\mu L} = \frac{\pi D^4 \Delta p}{128\mu L}$$
  * Factor de fricción de Darcy en régimen laminar (independiente de la rugosidad):
    $$f_L = \frac{64}{Re}$$
* **Flujo Turbulento y Estructura de Capa Límite en Paredes:**
  * Descomposición de Reynolds: $u = \bar{u} + u'$, $v = \bar{v} + v'$. Esfuerzo cortante total:
    $$\bar{\tau} = \tau_{\text{lam}} + \tau_{\text{tur}} = \mu \frac{d\bar{u}}{dy} - \rho \overline{u'v'}$$
  * *Variables de pared:* Velocidad de fricción $u_\tau = \sqrt{\frac{\tau_w}{\rho}}$, distancia adimensional $y^+ = \frac{y u_\tau}{\nu}$ y velocidad adimensional $u^+ = \frac{\bar{u}}{u_\tau}$.
    * Subcapa viscosa laminar ($0 \le y^+ \le 5$): $u^+ = y^+$.
    * Capa de transición / buffer ($5 < y^+ < 60$).
    * Capa logarítmica turbulenta ($y^+ \ge 60$): $u^+ = \frac{1}{\kappa}\ln y^+ + B \approx 2.5\ln y^+ + 5.45$ ($\kappa = 0.41$).
  * *Perfil empírico de Ley de Potencia:* $\frac{\bar{u}(y)}{u_{\max}} = \left(\frac{y}{r_0}\right)^{1/n}$, donde $n = \frac{1}{\sqrt{f}}$ varía entre $6$ y $10$ ($n = 7$ típico para $Re \approx 10^5$, generando un perfil mucho más plano que el parabólico laminar).
* **Pérdidas Primarias (Mayores) por Fricción en Tramos Rectos:**
  * *Ecuación de Darcy-Weisbach:*
    $$h_f = f \frac{L}{D} \frac{\bar{V}^2}{2g} \quad [\text{m}] \quad \Longleftrightarrow \quad \Delta p_f = f \frac{L}{D} \frac{\rho \bar{V}^2}{2} \quad [\text{Pa}]$$
  * *Sensibilidad paramétrica (Control 3):*
    * Si sube el caudal $Q$ con $D$ constante: $V \propto Q$, $Re \propto Q$ y $h_f \propto Q^2$.
    * Si disminuye el diámetro $D$ con $Q$ constante: $V = \frac{4Q}{\pi D^2} \propto \frac{1}{D^2}$, $Re = \frac{4Q}{\pi D \nu} \propto \frac{1}{D}$ y la pérdida de carga se dispara proporcionalmente a la quinta potencia inversa del diámetro:
      $$h_f = f \frac{8 L Q^2}{\pi^2 g D^5} \propto \frac{1}{D^5}$$
  * *Diagrama de Moody y Correlaciones para el Factor de Fricción $f(Re, e/D)$:*
    * Tuberías hidráulicamente lisas ($Re \cdot \frac{k}{d} < 65$):
      * **Blasius** ($2320 < Re < 10^5$): $f = 0.3164 Re^{-0.25}$.
      * **Prandtl - von Kármán** ($Re > 10^6$): $\frac{1}{\sqrt{f}} = 2\log_{10}(Re\sqrt{f}) - 0.8$.
    * Zona de transición turbulenta ($65 < Re \cdot \frac{k}{d} < 1300$):
      * **Colebrook-White**: $\frac{1}{\sqrt{f}} = -2\log_{10}\left(\frac{2.51}{Re\sqrt{f}} + 0.269\frac{k}{d}\right)$.
    * Zona completamente rugosa / turbulenta plena ($Re \cdot \frac{k}{d} > 1300$, donde $f$ ya no depende de $Re$):
      * **Nikuradse**: $\frac{1}{\sqrt{f}} = 2\log_{10}\left(\frac{d}{k}\right) + 1.14$.
* **Pérdidas Secundarias (Menores o Singulares) en Accesorios:**
  * Expresadas por unidad de masa ($e_L$ en $\text{J}/\text{kg} = \text{m}^2/\text{s}^2$) o por unidad de peso ($h_{lm}$ en $\text{m}$), y longitud equivalente ($L_{eq}$):
    $$e_L = K \frac{\bar{V}^2}{2} \quad ; \quad h_{lm} = K \frac{\bar{V}^2}{2g} \quad ; \quad L_{eq} = \frac{K D}{f}$$
  * *Expansión Súbita (Deducción Analítica de Borda-Carnot):* El chorro de alta velocidad $V_1$ se separa en la esquina viva formando vórtices de recirculación que disipan energía mecánica en calor. Aplicando conservación de masa, momento y energía entre $A_1$ y $A_2$:
    $$h_{lm,\text{exp}} = \frac{(V_1 - V_2)^2}{2g} = \left(1 - \frac{A_1}{A_2}\right)^2 \frac{V_1^2}{2g} \implies K_e = \left(1 - \frac{A_1}{A_2}\right)^2 = \left(1 - \frac{D_1^2}{D_2^2}\right)^2$$
  * *Contracción Súbita:* Formación de **vena contracta** seguida de reexpansión turbulenta (evaluada con la velocidad aguas abajo $V_2$):
    $$h_{lm,\text{cont}} = K_c \frac{V_2^2}{2g} \quad ; \quad K_c \approx 0.42\left(1 - \frac{D_2^2}{D_1^2}\right) \text{ o gráfica de razón de áreas } AR = \frac{A_2}{A_1}$$
  * *Entradas de tubería:* Reentrante ($K = 0.5 - 1.0$), borde vivo / canto afilado ($K = 0.5$), redondeada ($K = 0.3$ para $r/D=0.02$ hasta $K = 0.04$ para $r/D \ge 0.15$). Salida sumergida a estanque: $K_{\text{salida}} = 1.0$.
  * *Codos, Tees y Válvulas (Tablas Crane / Certamen 3):*
    * Codos de $90^\circ$ (bridado radio largo $K=0.2$, bridado regular $K=0.3$, roscado radio largo $K=0.7$, roscado regular $K=1.5$) donde actúan la separación parietal y los vórtices secundarios de Dean.
    * Válvulas según grado de apertura: Compuerta (abierta $K=0.2$, $75\%$ abierta $K=1.1$, $50\%$ abierta $K=3.6$, $25\%$ abierta $K=28.8$), Globo abierta ($K=10$), Ángulo abierta ($K=5$), Bola (abierta $K=0.5$, $1/3$ cerrada $K=5.5$, $2/3$ cerrada $K=200$).
* **Los 4 Problemas Clásicos de Cálculo en Tuberías Simples:**
  * *Caso 1 (Hallar $\Delta p$ dados $D, L, Q$)* y *Caso 2 (Hallar $L$ dados $\Delta p, D, Q$)*: Resolución **directa** ($Q \to V \to Re \to f \to \Delta p \text{ o } L$).
  * *Caso 3 (Hallar $Q$ dados $L, D, \Delta p$)* y *Caso 4 (Hallar $D$ dados $L, Q, \Delta p$)*: Resolución **iterativa** porque $Re$ (y $e/D$ en el Caso 4) son desconocidos; se asume un $f_0$ inicial en la zona turbulenta, se calcula $V$ o $D$, se actualiza $Re$ y $f$ en Moody/Colebrook hasta converger.

---

### MÓDULO 8: Turbomáquinas, Sistemas de Bombeo y Cavitación (+ Certamen 3 y Control 3)
* **Ecuación de la Energía Generalizada en Sistemas con Bomba:**
  * En términos de alturas de columna de fluido ($\text{m}$):
    $$\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 + H_{\text{requerida}} = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + \sum_i f_i \frac{L_i}{D_i}\frac{V_i^2}{2g} + \sum_j K_j \frac{V_j^2}{2g}$$
  * Entre un depósito inferior abierto a la atmósfera ($p_{1,\text{man}} = 0$, $V_1 \approx 0$ por gran área $A_1 \gg A_{\text{tubo}}$) y una descarga libre a la atmósfera a cota $z_2$ ($p_{2,\text{man}} = 0$, con velocidad de chorro $V_2$):
    $$H_{\text{requerida}}(Q) = (z_2 - z_1) + \frac{V_2^2}{2g} + h_{L,\text{succión}} + h_{L,\text{descarga}}$$
  * Potencia hidráulica entregada al fluido y potencia eléctrica/al freno requerida:
    $$\dot{W}_{\text{hid}} = \rho g Q H_B \quad ; \quad \dot{W}_{\text{freno}} = \frac{\rho g Q H_B}{\eta_B}$$
* **Curvas Características de la Bomba vs. Curva del Sistema y Punto de Operación:**
  * *Curvas del fabricante (Certamen 3):* Funciones polinómicas cuadráticas para la carga $H_B(Q) = a Q^2 + b Q + c$, eficiencia $\eta(Q)$ y $NPSH_R(Q) = d Q^2 + e$.
  * *Dinámica del caudal real:*
    * Si para un caudal de prueba $Q_0$ se cumple $H_B(Q_0) > H_{\text{requerida}}(Q_0)$: sobra energía mecánica, el fluido se **acelera** y el caudal real **aumenta** hasta alcanzar el equilibrio.
    * Si $H_B(Q_0) < H_{\text{requerida}}(Q_0)$: falta energía para vencer gravedad y roce, el fluido se **desacelera** y el caudal real **disminuye**.
    * **Punto de operación:** Intersección exacta $H_B(Q_{\text{op}}) = H_{\text{requerida}}(Q_{\text{op}})$.
* **Análisis de la Línea de Succión, $NPSH$ y Cavitación:**
  * *Definición de $NPSH_A$ (Disponible - depende de la instalación) vs. $NPSH_R$ (Requerido - depende del fabricante de la bomba):*
    $$NPSH_A = \frac{p_i - p_v}{\rho g} + \alpha\frac{V_i^2}{2g}$$
  * Aplicando Bernoulli modificado desde la superficie libre del pozo ($p_{\text{atm}}, z_0=0, V_0\approx 0$) hasta la brida de succión de la bomba ubicada a altura $z_b$ (incluyendo **únicamente** las pérdidas aguas arriba de la bomba $h_{L,\text{succión}}$):
    $$NPSH_A = \frac{p_{\text{atm}} - p_v}{\rho g} - z_b - h_{L,\text{succión}}$$
  * *Uso obligatorio de presiones absolutas:* Porque $p_v$ es una propiedad termodinámica referida al vacío absoluto.
  * *Criterio de operación sin cavitación:*
    $$NPSH_A > NPSH_R \quad \left(\text{Condición límite crítica: } NPSH_A = NPSH_R \implies z_{b,\max} = \frac{p_{\text{atm}} - p_v}{\rho g} - NPSH_R - h_{L,\text{succión}}\right)$$
  * *Soluciones de ingeniería para evitar cavitación:*
    1. Bajar la cota de instalación de la bomba $z_b$ (o sumergirla bajo el nivel del estanque, $z_b < 0$).
    2. Aumentar el diámetro de la tubería de succión $D_s$ (reduce $V_s$ cuadráticamente y desploma $h_{L,\text{succión}} \propto 1/D_s^5$).
* **Triángulos de Velocidades y Ecuación de Euler para Turbomáquinas (Certamen 3 - Problema 2):**
  * Geometría de un impulsor centrífugo: Radio de entrada $R_1$, radio de salida $R_2$, ancho del álabe a la salida $b_2$ y velocidad angular $\omega = \frac{2\pi \cdot \text{rpm}}{60}$.
  * Relación de continuidad radial en la periferia de salida:
    $$Q = 2\pi R_2 b_2 V_{r2} \implies b_2 = \frac{Q}{2\pi R_2 V_{r2}}$$
  * *Triángulo de velocidades en la salida del álabe (con ángulo de álabe $\beta_2$):*
    * Velocidad periférica del rodete: $\vec{U}_2 = R_2 \omega \hat{e}_\theta$.
    * Velocidad relativa a los álabes: $\vec{W}_2 = V_{r2}\hat{e}_r + W_{\theta 2}\hat{e}_\theta$ (donde $\tan\beta_2 = \frac{V_{r2}}{|W_{\theta 2}|}$).
    * Velocidad absoluta del fluido: $\vec{V}_2 = \vec{U}_2 + \vec{W}_2 = V_{r2}\hat{e}_r + (R_2\omega - V_{r2}\cot\beta_2)\hat{e}_\theta$.
  * *Ecuación de Euler para Turbomáquinas (Momento de la Cantidad de Movimiento):*
    $$T_{\text{eje}} = \rho Q (R_2 V_{\theta 2} - R_1 V_{\theta 1})$$
    *(Si el flujo ingresa axialmente sin prerrotación, $V_{\theta 1} = 0 \implies T_{\text{eje}} = \rho Q R_2 V_{\theta 2}$ y la potencia ideal de eje es $\dot{W}_{\text{eje}} = \omega T_{\text{eje}}$).*

---

## 3. Puente Interdisciplinario: Mecánica de Sólidos y Termodinámica

1. **Vínculo con Resistencia de Materiales (Lab Tracción MEC255-B):**
   * En diseño de tuberías a presión y estanques hidrostáticos (Módulos 3 y 7), la presión interna $p$ genera esfuerzos circunferenciales (de zuncho) en las paredes metálicas que no deben superar el esfuerzo de fluencia ($\sigma_{fl}$ o $\sigma_{el}$) medido en el ensayo de tracción de materiales como **Acero Inox, SAE-1045, SAE-4130, Latón, Duraluminio y Cobre**.
2. **Vínculo Directo con Termodinámica (Base Yunus Çengel):**
   * **Sustancias Puras y Cambio de Fase:** La curva $p_v(T)$ vista en el Módulo 2 y usada en el cálculo de $NPSH_A$ (Módulo 8) es el domo de saturación líquido-vapor de Termodinámica.
   * **Primera Ley en Sistemas Cerrados:** Los problemas cilindro-émbolo con resorte y transferencia de calor (Guía Ejercicios 1: P3-24 y P3-30) conectan directamente la estática de fluidos con el trabajo de frontera móvil ($W_b = \int p\,dV$).
   * **Primera Ley en Volúmenes de Control (Sistemas Abiertos):** La ecuación de energía mecánica con bombas y pérdidas ($e_v = u_2 - u_1 - q$) es un caso particular de conservación de la energía termodinámica ($\dot{Q} - \dot{W} = \dot{m}[\Delta h + \Delta ec + \Delta ep]$).

---

## 4. Estrategia de División Modular para Programar el Software en Google AI Studio

Para evitar que la IA de programación se sature o pierda precisión al intentar programar todo de una sola vez, dividiremos el desarrollo en **5 Bloques Independientes de Mecánica de Fluidos** (y posteriormente los bloques de Termodinámica):

| Bloque de Desarrollo | Pestaña / Módulo en `FluidoTermo Lab` | Contenidos y Ejercicios Integrados |
| :--- | :--- | :--- |
| **Bloque MF-1** *(Ya avanzado + Mejoras)* | **Propiedades, Reología & Lab Viscosidad** | Curvas $\mu(T)$, simulador de flujo de Couette, comparador reológico Newtoniano vs. No Newtoniano ($n$), tensión superficial/capilaridad y **Laboratorio Virtual SAE 30** (viscosímetro rotacional y capilar). |
| **Bloque MF-2** *(Ampliación de Pascal)* | **Hidrostática, Manometría & Superficies** | Prensa de Pascal actual + Constructor de Manómetros Multifluido (P3-17, 2.31, 2.43), Cilindro-Émbolo con resorte (P3-30, 3-54) y Compuertas Planas Sumergidas ($F_R$, centroide $S$ y centro de presión $D$). |
| **Bloque MF-3** *(Actualización de Venturi)* | **Laboratorio Virtual Tubo de Venturi (USM)** | Geometría exacta del póster USM ($D_1=26\text{ mm}, D_4=16\text{ mm}, 11\text{ piezómetros}$), variador de frecuencia ($7.5\text{ a }20\text{ L/min}$), gráficas en vivo de $dp(x)$, $C_q \text{ vs. } Re_4$ y $K \text{ vs. } Re_4$ + exportador del script Python. |
| **Bloque MF-4** *(Nuevo módulo clave)* | **Redes de Tuberías, Accesorios & 4 Casos** | Solucionador de Darcy-Weisbach + Moody/Colebrook, catálogo visual de accesorios ($K_e$ Borda-Carnot, $K_c$, válvulas al $25\%, 50\%, 75\%, 100\%$, codos), líneas EL/HGL y solucionador iterativo de los **4 Casos ($Q$ y $D$)**. |
| **Bloque MF-5** *(Nuevo módulo Certamen 3)* | **Turbomáquinas, Bombeo & Cavitación (NPSH)** | Simulador del **Certamen 3**: Curvas $H(Q), \eta(Q), NPSH_R(Q)$ vs. Curva del Sistema, punto de operación, alerta visual de cavitación ($NPSH_A \text{ vs. } NPSH_R$, burbujas en succión si $z_b > z_{b,\max}$) y **Triángulos de Velocidades de Euler** ($\vec{V}_2, \vec{W}_2, \vec{U}_2, T_{\text{eje}}$). |