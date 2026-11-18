# Manual Maestro de Contenidos, Materia Completa y Guion Pedagógico Humanizado: Mecánica de Fluidos (UTFSM - MEC120)

## INSTRUCCIONES DIRECTAS PARA LA INTELIGENCIA ARTIFICIAL CONSTRUCTORA DEL SOFTWARE

Este documento contiene **toda la materia oficial de la asignatura Mecánica de Fluidos (MEC120 - UTFSM)** extraída directamente de las presentaciones de cátedra (Prof. Iván González y Prof. M. Roth), guías de ejercicios, controles, certámenes e informes de laboratorio, siguiendo el orden cronológico exacto del semestre.

**REGLAS OBLIGATORIAS DE IMPLEMENTACIÓN PEDAGÓGICA Y VISUAL:**

1. **Público Objetivo (Alumnos de Primera Vez):** Los estudiantes que usarán esta plataforma nunca han cursado Mecánica de Fluidos. Prohibido mostrar resúmenes planos o listas de fórmulas sin contexto. Cada diapositiva de la sección **"Cátedra Interactiva"** debe redactarse con un **lenguaje humanizado, cercano, conversacional y detallado**, como si el mejor profesor estuviera sentado al lado del alumno explicándole con paciencia.

2. **Estructura de Cada Lección en la Interfaz:**

   * **¿Qué estamos viendo en la vida real? (Introducción empática):** Explicación cotidiana del fenómeno antes de mostrar cualquier ecuación.

   * **Desarrollo Teórico y Físico Completo:** Toda la materia de las diapositivas explicada paso a paso, diciendo qué significa cada letra, en qué unidades se mide y de dónde sale cada término.

   * **Demostración Matemática Desplegable:** Explicación de cómo se llega a la fórmula (sin saltarse pasos).

   * **Ejemplo Visual e Interactivo (Canvas/SVG):** Cada tema debe incluir un mini-simulador o esquema interactivo basado en las figuras reales de los PPTs (el buzo, el insecto zapatero, la paradoja hidrostática, el flujo de Couette, la cuña de presión, los vórtices en esquinas, el túnel de viento, etc.).

   * **Ejercicios de Cátedra Resueltos Paso a Paso:** Incluye todos los ejercicios propuestos en los PPTs con su desarrollo explicado línea por línea.

   * **Alertas de Error Típico de Certamen:** Consejos prácticos sobre dónde suelen equivocarse los alumnos al calcular.

# UNIDAD 0: PRESENTACIÓN E INTRODUCCIÓN A LA MECÁNICA DE FLUIDOS

*(Fuente: `01a Presentación.pdf` - Prof. M.Sc. Iván González)*

## 0.1. Mapa General y Continuidad de la Asignatura

El curso se estructura en **7 bloques secuenciales** que van desde el fluido quieto hasta las máquinas hidráulicas industriales:

1. **Propiedades de los fluidos e Introducción al Medio Continuo** (La base física de qué es un fluido).

2. **Distribución de presión en un fluido — Hidrostática** (Fluidos en reposo, manometría, compuertas y flotación).

3. **Relaciones integrales para un Volumen de Control — Dinámica** (Teorema de Transporte de Reynolds, Conservación de Masa, Momento, Energía y Ecuación de Bernoulli).

4. **Relaciones diferenciales para una partícula fluida** (Cinemática tridimensional, Continuidad diferencial, Ecuaciones de Euler, Cauchy y Navier-Stokes).

5. **Análisis dimensional y semejanza** (Teorema $\Pi$ de Buckingham, números adimensionales y escalamiento de modelos en túneles de viento y canales).

6. **Flujos viscosos en ductos — Flujos Internos** (Flujo laminar de Poiseuille, turbulencia, Diagrama de Moody, pérdidas primarias por roce y pérdidas secundarias en codos, válvulas y cambios de diámetro).

7. **Aplicación en Turbomáquinas y Sistemas de Bombeo** (Curvas características de bombas, punto de operación, cavitación $NPSH$ y ecuación de Euler en rodetes centrífugos).

* **Bibliografía Oficial del Curso:**

  * *Texto Guía:* Fox, R.; Pritchard, P.; McDonald, A. (2015). *Introduction to Fluid Mechanics*, $9^{\text{a}}$ edición, John Wiley & Sons.

  * *Textos Recomendados:* Yunus A. Çengel & John M. Cimbala (*Mecánica de Fluidos*, McGraw-Hill); Robert L. Mott (2006, *Mecánica de Fluidos*, Pearson); Merle Potter & David Wiggert (2012, *Mecánica de los Fluidos*, $4^{\text{a}}$ ed., Cengage).

## 0.2. ¿Qué es realmente un Fluido? (Diferencia Física entre Sólido y Fluido)

### Explicación Humanizada del Profesor

> *"Imagina que tienes sobre tu escritorio una goma de borrar (un sólido) y un charco de agua o miel (un fluido). Si empujas la cara superior de la goma de borrar de forma lateral con tu dedo (aplicando una fuerza tangencial o de corte* $F$*), la goma se inclina un cierto ángulo* $\Theta$ *y se detiene: resiste la fuerza y, cuando sueltas el dedo, vuelve a su forma original. En cambio, si haces exactamente lo mismo sobre el agua o la miel, el líquido no se inclina hasta un ángulo fijo y se frena: **se sigue moviendo y deformando sin parar** mientras tu dedo siga empujando. Eso es un fluido: una sustancia incapaz de quedarse quieta cuando la empujan de lado."*

### Conceptos Teóricos Clave (Slide 6)

* **Definición formal de Fluido:** Es toda sustancia (líquido o gas) que **cambia su forma continuamente** (fluye) siempre que esté sometida a un **esfuerzo cortante** ($\tau$), sin importar qué tan pequeño sea dicho esfuerzo. Como consecuencia directa, un fluido en reposo **adquiere siempre la forma de su recipiente**.

* **Esfuerzo Cortante (**$\tau$**):** Es la fuerza tangencial ($dF$) que actúa de forma paralela sobre una superficie dividida por el área ($dA$) de esa superficie:
  

  $$
  \tau = \frac{dF}{dA} \quad \left[\frac{\text{N}}{\text{m}^2} = \text{Pa}\right]
  $$

* **Ejemplo Visual para Programar en la Interfaz (Slide 6):**

  * **Izquierda:** Un bloque romboidal de altura $l$ y área superior $A$ sometido a una fuerza lateral $F$ que produce un desplazamiento $\Delta x$ y un ángulo de deformación $\Theta$.

  * **Derecha:** 5 recipientes de vidrio de formas completamente distintas: (a) probeta cilíndrica, (b) vaso cónico, (c) matraz esférico, (d) matraz volumétrico de cuello angosto y (e) tubo quebrado en zig-zag. El agua adopta instantáneamente la geometría interna de los 5 recipientes y mantiene una superficie libre horizontal plana.

## 0.3. Clasificación de la Mecánica de Fluidos y Áreas de la Ingeniería (Slides 7 y 8)

### 1. Ramas Principales

* **Estática de Fluidos (Fluidos en reposo):**

  * **Hidrostática:** Estudia líquidos en reposo (prácticamente incompresibles, como el agua en una represa o un buzo en el mar).

  * **Aerostática:** Estudia gases en reposo (compresibles, como la variación de presión del aire en la atmósfera con la altitud).

* **Dinámica de Fluidos (Fluidos en movimiento):**

  * **Flujos Internos vs. Externos:**

    * *Internos:* El fluido viaja completamente encerrado por paredes sólidas (ej. agua por una cañería, aceite en un circuito hidráulico, sangre por una arteria).

    * *Externos:* El fluido envuelve y corre por fuera de un cuerpo sumergido (ej. aire alrededor del ala de un avión, agua alrededor de un cilindro o del casco de un submarino).

  * **Flujos Compresibles vs. Incompresibles:**

    * *Incompresibles:* La densidad $\rho$ permanece prácticamente constante ($\Delta \rho \approx 0$). Aplica a todos los líquidos y también a gases que se mueven a baja velocidad ($Ma < 0.3$, es decir, menos de $\sim 100\text{ m/s}$ en aire).

    * *Compresibles:* La densidad varía fuertemente con la presión y la temperatura (gases a alta velocidad, toberas supersónicas, compresores).

  * **Flujos Reales (Viscosos) vs. Ideales (No Viscosos):**

    * *Fluido Ideal (No viscoso):* Modelo teórico donde se asume viscosidad nula ($\mu = 0$), por lo que no existe roce ni esfuerzos cortantes ($\tau = 0$). En un cilindro sumergido en flujo ideal (Fig. 2-11b del PPT), las líneas de corriente se abren en el punto de estancamiento delantero $A$, aceleran simétricamente hasta los polos superior/inferior $D$ y vuelven a cerrarse de forma perfecta en la parte trasera $E$ sin despegarse jamás.

    * *Fluido Real (Viscoso):* Todos los fluidos reales tienen viscosidad ($\mu > 0$). Al rodear un cilindro o un perfil alar (Fig. 2-11a del PPT), se forma una **Capa Límite** pegada a la pared; el fluido pierde energía por el roce y, al llegar a la parte trasera donde la presión sube, no tiene fuerza para seguir pegado a la curva: ocurre el **Punto de Desprendimiento (Separación)** $C$ y se forma detrás una **Estela** turbulenta llena de remolinos que frena al objeto (arrastre de presión).

### 2. Aplicaciones en Áreas de la Ingeniería (Slide 8)

* **Aerodinámica:** Estudio de fuerzas de sustentación (*lift*) y arrastre (*drag*) entre fluidos (aire) y superficies (aviones, automóviles, turbinas eólicas).

* **Hidráulica:** Flujo de líquidos a través de tuberías, canales abiertos, equipos de procesos industriales, bombas y turbinas.

* **Hidrología:** Movimiento de aguas subterráneas, filtración en suelos, sistemas de drenaje y escurrimiento pluvial.

* **Meteorología:** Movimiento de fluidos a gran escala en la atmósfera y corrientes oceánicas.

## 0.4. El Medio Continuo, Partícula Fluida, Campos y Enfoques de Estudio (Slides 9 a 14)

### 1. Hipótesis del Medio Continuo y Partícula de Fluido (Slides 9 y 10)

* **Explicación del Profesor:** *"Sabemos por Química que el agua y el aire están hechos de trillones de moléculas chocando entre sí con espacio vacío entre medio. Pero si quisiéramos calcular la trayectoria de cada molécula de agua en una tubería, ni el supercomputador más potente del mundo podría hacerlo. Por eso usamos la **Hipótesis del Medio Continuo**: miramos el fluido desde una escala macroscópica donde las propiedades son el promedio estadístico de millones de moléculas."*

* **Elemento o Partícula de Fluido:** Es el volumen infinitesimal más pequeño ($\delta V = \delta x \cdot \delta y \cdot \delta z$, con caras orientadas Norte $N$, Sur $S$, Este $E$, Oeste $W$, Arriba $T$ y Abajo $B$ centradas en $(x,y,z)$) que todavía contiene suficientes moléculas para que la densidad, presión y velocidad sean continuas y suaves, sin fluctuaciones moleculares locas.

* **Propiedades Macroscópicas que describen el fluido:**

  1. Velocidad vectorial: $\vec{V} = u\hat{i} + v\hat{j} + w\hat{k}$ (o $\vec{u} = (u,v,w)$).

  2. Presión: $p$

  3. Densidad: $\rho$

  4. Temperatura: $T$

  5. Energía: $E$

* **Concepto de Campo y Campo de Flujo:**

  * **Campo:** Es la distribución continua de una magnitud física descrita mediante funciones continuas del espacio y del tiempo: $f(x,y,z,t)$.

  * **Campo Escalar:** Solo necesita un número y su unidad en cada punto (ej. Campo de Presiones $p(x,y,z,t)$, Campo de Temperaturas $T(x,y,z,t)$, Densidad $\rho(x,y,z,t)$).

  * **Campo Vectorial:** Necesita magnitud, dirección y sentido en cada punto (ej. Campo de Velocidades $\vec{V}(x,y,z,t) = u(x,y,z,t)\hat{i} + v(x,y,z,t)\hat{j} + w(x,y,z,t)\hat{k}$).

### 2. Punto de Vista Lagrangiano vs. Euleriano (Slide 11)

* **Descripción Lagrangiana (Seguir a la partícula):**

  * Identifica a cada partícula individual de masa fija, le pone un "GPS" y describe su posición $\vec{r}_p(t)$, velocidad y estado a medida que se mueve por el espacio a lo largo del tiempo.

  * *Dónde se usa:* Es el método clásico de la **Mecánica de Sólidos** y Dinámica de partículas (ej. seguir una pelota lanzada al aire). En fluidos es muy difícil porque las partículas se deforman y mezclan.

* **Descripción Euleriana (Mirar una ventana fija del espacio):**

  * En lugar de perseguir una gota de agua, el observador **fija su atención en un punto o volumen definido del espacio** $(x,y,z)$ (un Volumen de Control) y mide cómo cambian las propiedades del fluido que pasa por ese punto a lo largo del tiempo $t$.

  * *Dónde se usa:* Es el método estándar de la **Mecánica de Fluidos** (ej. instalar un manómetro y un caudalímetro a la salida de una bomba).

### 3. Visualización del Flujo y Condición de No Deslizamiento (Slides 12 y 13)

* **Perfil de Velocidad:** Es la curva continua que une las puntas de las flechas de los vectores velocidad a través de una sección transversal del ducto.

* **Línea de Corriente (*Streamline*):** Curva imaginaria cuya recta tangente en cualquier punto coincide exactamente con la dirección del vector velocidad $\vec{V}$ del flujo en ese instante (es un concepto **analítico / euleriano**; si el flujo cambia con el tiempo de $t_0$ a $t_1$, las líneas de corriente cambian).

* **Tubo de Corriente o Tubo de Flujo (*Streamtube*):** Es un "conducto imaginario" cuyas paredes están formadas íntegramente por líneas de corriente. Como la velocidad es tangente a las paredes, **ningún fluido puede atravesar las paredes laterales de un tubo de corriente (*No Flow*)**; el fluido solo entra y sale por las tapas transversales.

* **Línea de Trayectoria (*Pathline*) / Traza:** Es el camino real que deja grabado una partícula individual a medida que viaja a través del campo de flujo a lo largo del tiempo (concepto **lagrangiano / experimental de laboratorio**, como tomar una foto de larga exposición de una partícula brillante). *Nota clave: En flujo estacionario (que no cambia con el tiempo), las líneas de corriente y las líneas de trayectoria son idénticas.*

* **Condición de No Deslizamiento (*No-Slip Condition* - Slide 13):**

  * **Ley física fundamental:** Cuando un fluido real entra en contacto con una superficie sólida, **la capa de moléculas de fluido adyacente a la superficie se "pega" completamente a ella** y adquiere exactamente la misma velocidad de la superficie.

  * Si la placa o pared de la tubería está quieta ($V_{\text{pared}} = 0$), entonces **la velocidad del fluido en la pared es estrictamente cero (**$u(y=0) = 0$**)**.

  * **¿Qué propiedad causa esto?** La **viscosidad** del fluido y las fuerzas de adhesión molecular.

  * **Consecuencia:** Como en la pared la velocidad es $0$ y lejos de la pared el fluido lleva una velocidad de aproximación $V$, las capas de fluido deben deslizarse unas sobre otras frenándose mutuamente. Esto crea un gradiente de velocidades, esfuerzos de corte ($\tau$), fuerza de arrastre sobre el sólido y el desarrollo de la **Capa Límite**. Es la **condición de borde obligatoria** para resolver cualquier ecuación diferencial en Mecánica de Fluidos.

### 4. Las 3 Técnicas Básicas en el Análisis de Flujos (Slide 14)

1. **Volumen de Control (Análisis Integral):** Se analiza una región finita del espacio (ej. una turbina completa, una bomba o un tramo de tubería) aplicando las leyes de conservación de masa, cantidad de movimiento y energía en forma integral sobre sus fronteras de entrada y salida. No interesa el detalle punto a punto adentro, sino el balance global.

2. **Partícula Fluida (Análisis Diferencial):** Se analiza un cubo infinitesimal de fluido ($dx\,dy\,dz$) aplicando ecuaciones diferenciales en cada punto. Permite obtener las **Ecuaciones de Navier-Stokes** para conocer el campo detallado de velocidades y presiones punto por punto.

3. **Estudio Experimental (Análisis Dimensional):** Cuando la geometría es tan compleja que no se puede resolver a mano, se usa la teoría de similitud y el **Teorema** $\Pi$ **de Buckingham** para reducir la cantidad de variables y ensayar modelos a escala en laboratorios.

* *En los 3 métodos se deben cumplir siempre:* Las leyes de conservación de la mecánica, las ecuaciones de estado termodinámicas y las condiciones iniciales y de borde.

# UNIDAD 1: PROPIEDADES FÍSICAS, REOLÓGICAS Y TÉRMICAS DE LOS FLUIDOS

*(Fuentes: `MecFlu_S02_PropiedadesFluidos.pdf` - Prof. M. Roth e `Informe_Laboratorio_Viscosidad.docx`)*

## 1.1. Propiedades Intensivas vs. Extensivas (Slide 3)

* **Explicación del Profesor:** *"Las propiedades macroscópicas representan lo que hacen las moléculas a nivel microscópico. Para saber si una propiedad es intensiva o extensiva, haz el **Experimento Mental de la Guilliotina** que sale en la diapositiva 3: imagina una caja con un gas que tiene temperatura* $T$*, presión* $p$*, densidad* $\rho$*, masa* $M$ *y volumen* $V$*. Ahora pon una pared divisoria justo al medio. Cada mitad quedó con la mitad de la masa (*$M/2$*) y la mitad del volumen (*$V/2$*), pero la temperatura* $T$*, la presión* $p$ *y la densidad* $\rho$ *siguen valiendo exactamente lo mismo en cada lado."*

* **Propiedades Intensivas (Independientes de la masa o tamaño del sistema):** Temperatura ($T$), Presión ($p$), Densidad ($\rho$), Volumen específico ($v$), Viscosidad ($\mu, \nu$), Energía específica ($e, u, h$).

* **Propiedades Extensivas (Dependientes de la cantidad de masa):** Masa ($M$), Peso ($W$), Volumen total ($V$), Energía total ($E, U, H$).

## 1.2. Densidad, Peso Específico, Gravedad Específica y Gases Ideales (Slides 4 y 5)

### 1. Fórmulas Fundamentales

* **Densidad (**$\rho$**):** Masa contenida por unidad de volumen:
  

  $$
  \rho = \frac{m}{V} \quad \left[\frac{\text{kg}}{\text{m}^3}\right]
  $$

  * **Valores de Referencia a Condiciones Atmosféricas que todo estudiante debe saber (Slide 4):**

    * Aire: $\rho_{\text{aire}} = 1.22\text{ kg/m}^3$

    * Agua líquida ($20^\circ\text{C}$): $\rho_{\text{agua}} = 998\text{ kg/m}^3 \approx 1000\text{ kg/m}^3$

    * Mercurio ($\text{Hg}$): $\rho_{\text{Hg}} = 13600\text{ kg/m}^3$

* **Comportamiento de** $\rho$ **con** $p$ **y** $T$ **(Gráfico de Anomalía del Agua - Slide 4):**

  * En general, al calentar un fluido se expande y su densidad baja. Sin embargo, el **agua presenta un comportamiento anómalo**: en estado sólido (hielo a $0^\circ\text{C}$) tiene una densidad de $\sim 0.92\text{ g/cm}^3$ ($920\text{ kg/m}^3$, por eso el hielo flota). Al derretirse a $0^\circ\text{C}$ salta a $\sim 0.9998\text{ g/cm}^3$ y **alcanza su densidad máxima exacta de** $1.000\text{ g/cm}^3$ **(**$1000\text{ kg/m}^3$**) a los** $4^\circ\text{C}$. Sobre $4^\circ\text{C}$ disminuye monotónicamente hasta $\sim 0.958\text{ g/cm}^3$ a $100^\circ\text{C}$.

  * Si $\Delta \rho = 0 \Rightarrow$ el fluido se modela como **incompresible**.

* **Volumen Específico (**$v$**):** Es el inverso de la densidad (volumen que ocupa $1\text{ kg}$ de sustancia):
  

  $$
  v = \frac{1}{\rho} = \frac{V}{m} \quad \left[\frac{\text{m}^3}{\text{kg}}\right]
  $$

* **Gravedad Específica (**$GE$ **o** $SG$ **- *Specific Gravity*) o Densidad Relativa:** Razón adimensional entre la densidad de una sustancia y la densidad del agua pura a $4^\circ\text{C}$ ($\rho_{\text{H}_2\text{O}(4^\circ\text{C})} = 1000\text{ kg/m}^3$):
  

  $$
  GE = SG = \frac{\rho}{\rho_{\text{H}_2\text{O}(4^\circ\text{C})}} \quad [- \text{ adimensional}]
  $$

  
  *(Ejemplo: Si el mercurio tiene* $SG = 13.6$*, su densidad es instantáneamente* $13.6 \times 1000 = 13600\text{ kg/m}^3$*).*

* **Peso Específico (**$\gamma$**):** Es el peso por unidad de volumen de un fluido:
  

  $$
  \gamma = \frac{W}{V} = \frac{m \cdot g}{V} = \rho \cdot g \quad \left[\frac{\text{N}}{\text{m}^3}\right]
  $$

* **Ecuación Térmica de Estado para Gases (Slides 5 y 24):**

  * Para gases reales: $p \cdot v = Z \cdot R \cdot T$ (donde $Z$ es el factor de compresibilidad).

  * Para **Gas Ideal** ($Z = 1$, ausencia de atracción intermolecular y choques perfectamente elásticos):
    

    $$
    p \cdot v = R \cdot T \implies \rho = \frac{p}{R \cdot T} \quad \text{y} \quad p \cdot V = n \cdot \bar{R} \cdot T
    $$

    
    Donde:

    * $p$: Presión **ABSOLUTA** en $[\text{Pa}]$ (¡Jamás usar presión manométrica!).

    * $T$: Temperatura **ABSOLUTA** en $[\text{K}]$ ($T[\text{K}] = T[^\circ\text{C}] + 273.15$).

    * $\bar{R} = 8.314\text{ kJ/(kmol}\cdot\text{K)}$: Constante universal de los gases.

    * $R = \frac{\bar{R}}{M_{\text{molar}}}\text{ [J/(kg}\cdot\text{K)]}$: Constante particular del gas (para el aire seco, $R_{\text{aire}} = 287\text{ J/(kg}\cdot\text{K)}$).

## 1.3. Viscosidad, Flujo de Couette y Reología No Newtoniana (Slides 11 a 20)

### 1. Experimento de las Dos Placas de Newton (Flujo de Couette - Slides 11 y 12)

* **Explicación paso a paso del fenómeno:**
  Considera dos placas planas paralelas de área $A$ separadas por una pequeña altura $h$ llena de fluido. La placa inferior está fija ($u = 0$) y la placa superior se mueve hacia la derecha con velocidad constante $u_x$ tirada por una fuerza $F_x$.
  Debido a la **condición de no deslizamiento**, la lámina de fluido pegada abajo tiene velocidad $0$ y la lámina pegada arriba viaja a velocidad $u_x$. Si la brecha $h$ es pequeña, la velocidad varía linealmente formando un triángulo de velocidades.

* **Ley de Viscosidad de Newton (1687):** Isaac Newton descubrió experimentalmente que la fuerza tangencial $F_x$ necesaria para mover la placa es directamente proporcional al área $A$ y a la velocidad $u_x$, e inversamente proporcional al espesor $h$:
  

  $$
  F_x = \mu \cdot A \cdot \frac{u_x}{h} \xrightarrow{h \to dy} F_x = \mu \cdot A \cdot \frac{du_x}{dy}
  $$

  
  Dividiendo por el área $A$, obtenemos la **Ley de Newton de la Viscosidad**:
  

  $$
  \tau_{yx} = \frac{F_x}{A} = \mu \frac{du_x}{dy} \quad [\text{Pa}]
  $$

  
  Donde:

  * $\tau_{yx}$: Esfuerzo cortante $[\text{Pa} = \text{N/m}^2]$.

  * $\frac{du_x}{dy}$: Gradiente de velocidad o **tasa/razón de deformación angular** $[1/\text{s} = \text{s}^{-1}]$.

  * $\mu$: **Viscosidad dinámica o absoluta** $[\text{Pa}\cdot\text{s} = \text{N}\cdot\text{s/m}^2 = \text{kg/(m}\cdot\text{s)}]$.

  * **Equivalencia de unidades:** $1\text{ Poise (P)} = 100\text{ centipoise (cP)} = 1\text{ g/(cm}\cdot\text{s)} = 0.1\text{ Pa}\cdot\text{s}$. Por lo tanto: $1\text{ cP} = 1\text{ mPa}\cdot\text{s} = 0.001\text{ Pa}\cdot\text{s}$ (que es exactamente la viscosidad del agua a $20^\circ\text{C}$).

### 2. Reología: Fluidos Newtonianos vs. No Newtonianos (Slides 12, 14 y 15)

* **Modelo de Ley de Potencia (Ostwald-de Waele):**
  

  $$
  \tau_{yx} = k \left(\frac{du_x}{dy}\right)^n
  $$

  
  La pendiente de la curva esfuerzo cortante vs. razón de deformación representa la **viscosidad aparente**.

* **Clasificación Completa de Cátedra (Tabla Slide 15 y Gráfico Slide 14):**

| Categoría Reológica | Tipo de Fluido | Comportamiento Físico y Matemático | Ejemplos Reales de Cátedra | 
| ----- | ----- | ----- | ----- | 
| **Newtonianos** | **Newtoniano (**$n = 1$**)** | Relación lineal perfecta entre $\tau$ y $du/dy$. La viscosidad $\mu$ es constante y no cambia por mucho que agites el fluido (solo depende de $T$ y $p$). | Agua, aire, aceites minerales (SAE 30), gasolina, alcohol, mercurio. | 
| **Plásticos** | **Plástico Perfecto** | La aplicación de una deformación no conlleva un esfuerzo de resistencia en sentido contrario una vez superado el límite elástico. | Metales dúctiles una vez superado el límite elástico. | 
| **Plásticos** | **Plástico de Bingham** | Se comporta como un sólido rígido hasta que se supera un **esfuerzo cortante umbral (**$\tau_0$**)**; recién ahí empieza a fluir linealmente: $\tau = \tau_0 + \mu_p \frac{du}{dy}$. | Pasta de dientes, mayonesa, barro, lodos de perforación. | 
| **Ley de Potencias** | **Pseudoplástico (**$n < 1$**)** | **Fluyen mejor con el esfuerzo** (*adelgazamiento por corte*): su viscosidad aparente disminuye cuando aumenta el gradiente de velocidad (la curva se aplana). | Sangre humana, leche, gelatina, arcilla, coloides, pinturas modernas. | 
| **Ley de Potencias** | **Dilatante (**$n > 1$**)** | **Espesan con el esfuerzo** (*espesamiento por corte*): su viscosidad aparente aumenta bruscamente cuando los golpeas o deformas rápido (la curva se empina hacia arriba). | Suspensiones concentradas de almidón de maíz en agua (*maicena*), almidón de arroz, soluciones concentradas de azúcar, arena húmeda. | 
| **Viscoelásticos** | **Maxwell / Oldroyd-B / Kelvin** | Combinan comportamiento viscoso (fluido) y elástico (sólido que guarda memoria de forma) en serie (Maxwell) o en paralelo (Kelvin). | Masa panadera, betún, nailon fundido, plastilina, polímeros. | 
| **Dependientes del Tiempo** | **Tixotrópico** | La viscosidad aparente **decrece** con la **duración (tiempo)** del esfuerzo aplicado (si lo revuelves varios minutos se vuelve más líquido). | Algunas variedades de mieles, kétchup, pinturas antigoteo. | 
| **Dependientes del Tiempo** | **Reopéctico** | La viscosidad aparente **se incrementa** con el tiempo que dura la agitación. | Algunos lubricantes especiales y pastas de yeso. | 

### 3. Desmitificación Crítica de Cátedra: ¡Densidad NO es Viscosidad! (Slide 16)

* En la diapositiva 16 el profesor tacha con una gran **X roja** la frase: *"mientras mayor densidad de una sustancia, mayor su resistencia a fluir"*.

* **Demostración con la Tabla de Sustancias a** $25^\circ\text{C}$ **(Slide 16):**

  * **Aceite de soya:** $\rho = 0.916\text{ g/mL}$ (más liviano que el agua), pero $\mu = 47.5\text{ cP}$.

  * **Aceite de castor (ricino):** $\rho = 0.961\text{ g/mL}$ (flota en el agua), pero $\mu = 985\text{ cP}$ (¡casi mil veces más viscoso que el agua!).

  * **Agua:** $\rho = 0.997\text{ g/mL}$, $\mu = 0.900\text{ cP}$ (a $25^\circ\text{C}$).

  * **Miel de abejas:** $\rho = 1.360\text{ g/mL}$, $\mu = 2000\text{ a }10000\text{ cP}$.

  * **Mercurio líquido:** $\rho = 13.546\text{ g/mL}$ (¡13.5 veces más denso que el agua!), pero su viscosidad es apenas $\mu = 1.526\text{ cP}$ (casi tan fluido como el agua).

### 4. Viscosidad Cinemática ($\nu$) y Efecto de la Temperatura (Slides 18 a 20)

* **Viscosidad Cinemática (**$\nu$**):** Relaciona la viscosidad dinámica con la densidad:
  

  $$
  \nu = \frac{\mu}{\rho} \quad \left[\frac{\text{m}^2}{\text{s}}\right] \quad ; \quad 1\text{ Stoke (St)} = 100\text{ centistokes (cSt)} = 10^{-4}\text{ m}^2/\text{s} \implies 1\text{ cSt} = 10^{-6}\text{ m}^2/\text{s}
  $$

* **¿Por qué los líquidos se vuelven más líquidos al calentarlos, pero los gases se vuelven más viscosos? (Slides 18 y 19 - Gráfico de Frank M. White):**

  * **En Líquidos (**$\mu$ **disminuye al subir** $T$**):** Las moléculas están muy juntas y dominan las **fuerzas de cohesión intermolecular**. Al calentar el líquido (ej. aceite de motor o miel en una sartén), las moléculas ganan energía térmica y vencen las fuerzas de atracción, deslizándose con mucha menor resistencia.

  * **En Gases (**$\mu$ **aumenta al subir** $T$**):** Las moléculas están muy separadas y las fuerzas cohesivas son despreciables; aquí la viscosidad se debe a los **choques e intercambio de cantidad de movimiento (momentum)** entre moléculas de capas rápidas y lentas. Al calentar el gas, la agitación molecular aumenta, hay más choques cruzados y el gas frena más a las capas vecinas.

* **Laboratorio N°1 de la Asignatura (`Informe_Laboratorio_Viscosidad.docx`):**

  * En el laboratorio de la USM se caracteriza **Aceite de motor SAE 30 Monogrado** a $T = 22^\circ\text{C}$ usando dos equipos:

    1. **Viscosímetro Rotacional (Rotores 0 al 4):** Mide directamente el torque resistente para entregar la **viscosidad dinámica** $\mu$ **en** $[\text{cP}]$. Resultados experimentales medidos a 1, 2 y 3 minutos: $\mu = 303.5\text{ cP}$, $303.5\text{ cP}$ y $302.0\text{ cP}$ (comportamiento constante que demuestra que el aceite SAE 30 es un fluido newtoniano, no tixotrópico).

    2. **Viscosímetro Capilar:** Mide el tiempo ($t_1 \approx 242\text{ s}$, $t_2 \approx 351\text{ s}$) que tarda el aceite en escurrir por gravedad a través de un tubo calibrado, obteniendo directamente la **viscosidad cinemática** $\nu \approx 309.4\text{ a }321.9\text{ cSt}$.

## 1.4. Presión, Escalas de Medición y Presión de Vapor (Slides 21 a 25)

### 1. Definición y Escalas de Presión (Slides 21 a 23)

* **Presión (**$p$**):** Fuerza compresiva normal ($\Delta F_n$) por unidad de área ($\Delta A$) sobre una superficie:
  

  $$
  p = \lim_{\Delta A \to \delta A} \frac{\Delta F_n}{\Delta A} \quad \left[\text{Pa} = \frac{\text{N}}{\text{m}^2}\right] \quad ; \quad 1\text{ bar} = 10^5\text{ Pa} = 100\text{ kPa} \quad ; \quad 1\text{ atm} = 101325\text{ Pa} = 14.696\text{ psi}
  $$

* **Relación entre Presión Absoluta, Atmosférica, Manométrica y de Vacío (Diagrama Slide 21):**

  * **Presión Cero Absoluto:** Vacío total perfecto (ausencia absoluta de choques moleculares). Es el piso de referencia para la **Presión Absoluta (**$p_{\text{abs}}$**)**.

  * **Presión Atmosférica (**$p_{\text{atm}}$**):** Peso de la columna de aire sobre la Tierra, medida con un **Barómetro**.

  * **Presión Manométrica (**$p_{\text{man}}$ **o** $p_g$**):** Mide cuánto supera la presión absoluta a la atmosférica local (usando un **Manómetro ordinario**, como el de tubo Bourdon o tubo en U):
    

    $$
    p_{\text{abs}} = p_{\text{atm}} + p_{\text{man}} \implies p_{\text{man}} = p_{\text{abs}} - p_{\text{atm}}
    $$

  * **Presión de Vacío (**$p_{\text{vac}}$**):** Cuando la presión absoluta es *menor* que la atmosférica, se mide la diferencia con un **Vacuómetro**:
    

    $$
    p_{\text{abs}} = p_{\text{atm}} - p_{\text{vac}}
    $$

### 2. Presión de Vapor ($p_v$) y Diagrama de Fases (Slide 25)

* **Definición física:** Es la presión a la cual un líquido hierve (se evapora cambiando de fase líquida a vapor) a una temperatura dada.

* **Explicación del Profesor:** *"La gente suele creer que el agua solo hierve a* $100^\circ\text{C}$*. ¡Eso es solo porque vivimos a* $1\text{ atm}$ *(*$101.3\text{ kPa}$*) de presión! Si estás con agua a temperatura ambiente de* $20^\circ\text{C}$ *y mediante una jeringa o el lado de succión de una bomba bajas la presión absoluta hasta **2337 Pa (2.34 kPa)**, el agua empieza a hervir violentamente en frío. Ese valor (*$p_v = 2337\text{ Pa}$ *a* $20^\circ\text{C}$*) es el culpable de la cavitación que destruye las bombas e impulsores de barcos."*

* **Puntos clave del Diagrama de Fases del Agua (Slide 25):**

  * Punto Triple $A$: Coexisten hielo, agua líquida y vapor en equilibrio a $T = 0.0098^\circ\text{C}$ y $p = 4.58\text{ torr}$ ($\sim 611\text{ Pa}$).

  * Punto de fusión normal $B$: $0^\circ\text{C}$ a $1\text{ atm}$.

  * Punto de ebullición normal $C$: $100^\circ\text{C}$ a $1\text{ atm}$ ($p_v(100^\circ\text{C}) = 101325\text{ Pa}$).

  * Punto Crítico $D$: $T = 374^\circ\text{C}$ y $p = 218\text{ atm}$.

## 1.5. Propiedades Térmicas, Compresibilidad y Tensión Superficial (Slides 26 a 41)

### 1. Energía Interna, Entalpía y Calores Específicos (Slides 26 y 27)

* **Energía Interna (**$U\text{ [J]}$**, específica** $u\text{ [J/kg]}$**):** Energía asociada al movimiento térmico traslacional/rotacional/vibracional de las moléculas y fuerzas intermoleculares.

* **Entalpía Específica (**$h\text{ [J/kg]}$**):** Combina la energía térmica interna ($u$) con la **energía o trabajo de flujo (**$p \cdot v$**)** necesaria para empujar al fluido dentro de un volumen de control:
  

  $$
  h = u + p \cdot v = u + \frac{p}{\rho} \quad \left[\frac{\text{J}}{\text{kg}}\right]
  $$

* **Calores Específicos (**$c_v$ **y** $c_p$**):** Cantidad de calor necesaria para elevar en $1\text{ K}$ (o $1^\circ\text{C}$) la temperatura de $1\text{ kg}$ de fluido:
  

  $$
  c_v = \left(\frac{\partial u}{\partial T}\right)_v \quad ; \quad c_p = \left(\frac{\partial h}{\partial T}\right)_p \quad \left[\frac{\text{J}}{\text{kg}\cdot\text{K}}\right]
  $$

  * *En líquidos y fluidos incompresibles:* $c_p \approx c_v = c$.

  * *Conversiones de cátedra:* $1\text{ Btu} = 1.0551\text{ kJ}$ ; $1\text{ cal} = 4.1868\text{ J}$.

* **Energía Total por unidad de masa de un Fluido en Movimiento (Slide 27):**
  

  $$
  e = u + p \cdot v + \frac{1}{2}c^2 + g \cdot z = h + \frac{1}{2}c^2 + g \cdot z \quad \left[\frac{\text{J}}{\text{kg}}\right]
  $$

### 2. Compresibilidad y Expansión Térmica (Slides 28 a 30)

* **Módulo de Elasticidad Volumétrico o Módulo de Compresibilidad (**$\kappa$ **o** $E_v$ **- Slide 28):**
  Mide qué tan "duro de comprimir" es un fluido cuando le aplicas un aumento de presión $dp$:
  

  $$
  \kappa = -V \left(\frac{\partial p}{\partial V}\right)_T = \rho \left(\frac{\partial p}{\partial \rho}\right)_T \quad [\text{Pa}]
  $$

  
  *(El signo menos va porque al aumentar la presión* $dp > 0$*, el volumen disminuye* $dV < 0$*, haciendo que* $\kappa$ *sea siempre positivo).*

  * Para el agua a condiciones atmosféricas: $\kappa_{\text{agua}} \approx 2.1 \times 10^9\text{ Pa} = 2100\text{ MPa}$.

  * Para un gas ideal en proceso isotérmico: $\kappa_T = p$.

  * **Coeficiente de compresibilidad:** Es el inverso del módulo: $\frac{1}{\kappa_{T/S}} = -\frac{1}{V}\left(\frac{\partial V}{\partial p}\right)_{T/S} = \frac{1}{\rho}\left(\frac{\partial \rho}{\partial p}\right)_{T/S}\text{ [Pa}^{-1}]$.

  * **Importancia en Ingeniería:** Determina la **velocidad del sonido en el fluido** ($c = \sqrt{\kappa/\rho}$) y las sobrepresiones destructivas del **Golpe de Ariete** cuando se cierra una válvula de golpe.

  * **Criterio de Incompresibilidad:** Un flujo se considera incompresible si $\frac{\Delta p}{\kappa} < 0.1$ o si $\frac{\rho c^2}{\kappa} < 0.02$ (en aire a temperatura ambiente equivale a velocidades menores a $\sim 40 - 100\text{ m/s}$).

* **Coeficiente de Expansión Térmica Volumétrica (**$\gamma$ **o** $\beta$ **- Slide 29):**
  Mide el cambio fraccional de volumen o densidad cuando cambia la temperatura a presión constante:
  

  $$
  \beta = \frac{1}{V}\left(\frac{\partial V}{\partial T}\right)_p = -\frac{1}{\rho}\left(\frac{\partial \rho}{\partial T}\right)_p \quad [\text{K}^{-1}]
  $$

  
  *(Nota: en la diapositiva 29 del Prof. Roth se usa la letra* $\gamma = 3\alpha$ *para este coeficiente:* $\gamma_{\text{agua}} \approx 1.5 \times 10^{-4}\text{ K}^{-1}$*,* $\gamma_{\text{aire}} = \frac{1}{T} \approx 3.5 \times 10^{-3}\text{ K}^{-1}$*).*

  * **Aplicaciones:** Corrientes oceánicas, vientos atmosféricos, ascenso de humo en chimeneas, globos aerostáticos y transferencia de calor por convección natural.

* **Ecuación Combinada de Variación de Volumen y Densidad (Slide 30):**
  Cuando un líquido sufre simultáneamente un cambio de temperatura $\Delta T$ y un cambio de presión $\Delta p$:
  

  $$
  \frac{dv}{v} = -\frac{\Delta \rho}{\rho} \cong \beta \Delta T - \frac{1}{\kappa} \Delta p
  $$

### 3. Tensión Superficial ($\sigma$) y Capilaridad (Slides 32 a 34)

* **Origen físico:** En el interior del líquido una molécula es atraída por igual en todas direcciones por sus vecinas (fuerzas de **cohesión** en equilibrio). Pero en la superficie libre en contacto con el aire, no hay moléculas de agua arriba, por lo que existe una fuerza neta hacia el interior que tensa la superficie como una membrana elástica.

* **Definición de Tensión Superficial (**$\sigma$**):** Trabajo ($dW$) necesario para crear una nueva unidad de área superficial ($dA$), o fuerza por unidad de longitud de película:
  

  $$
  \sigma = \frac{dW}{dA} = \frac{F}{2L} \quad \left[\frac{\text{N}}{\text{m}}\right] \quad \left(\text{Agua-aire a }20^\circ\text{C}: \sigma = 0.073\text{ N/m} \quad ; \quad \text{Mercurio-aire}: \sigma = 0.514\text{ N/m}\right)
  $$

* **Sobrepresión dentro de una Gota Esférica vs. una Burbuja (Pompa de Jabón) (Slides 33 y 39):**

  * **Gota de líquido (1 sola interfaz líquido-aire):** Cortando la gota por la mitad, la fuerza de presión interna ($\Delta p \cdot \pi R^2$) equilibra a la tensión superficial en el perímetro ($2\pi R \cdot \sigma$):
    

    $$
    -\Delta p \cdot \pi R^2 + 2\pi R \sigma = 0 \implies \Delta p_{\text{gota}} = \frac{2\sigma}{R}
    $$

  * **Pompa de jabón o burbuja hueca (2 interfaces: interior y exterior):** Tiene doble perímetro de película líquida ($2 \times 2\pi R \sigma$):
    

    $$
    \Delta p_{\text{burbuja}} = \frac{4\sigma}{R}
    $$

* **Capilaridad en Tubos Pequeños (Slide 34):**

  * Cuando las **fuerzas de adhesión** (líquido-pared de vidrio) superan a las **fuerzas de cohesión** (líquido-líquido), el líquido "moja" la pared ($\theta < 90^\circ$, para agua-vidrio $\theta \approx 20^\circ$ o $0^\circ$) y sube por el capilar formando un menisco cóncavo.

  * En el **Mercurio**, la cohesión interna es mucho mayor que la adhesión al vidrio ($\theta \approx 130^\circ > 90^\circ$), por lo que el menisco es convexo y el nivel desciende (depresión capilar).

  * **Ecuación de Ascenso Capilar (Equilibrio vertical** $\sum F_z = 0$**):** La componente vertical de la tensión superficial hacia arriba ($\sigma \cdot \pi D \cos\theta$) sostiene el peso de la columna cilíndrica de líquido ($W = \rho g \frac{\pi D^2}{4} h$):
    

    $$
    \sigma \pi D \cos\theta - \rho g \frac{\pi D^2}{4} h = 0 \implies h = \frac{4\sigma \cos\theta}{\rho g D}
    $$

### 4. Ejercicios Oficiales Resueltos de la Sesión 02 (Slides 30 y 37 a 41)

1. **Ejercicio Comb. Térmica/Compresibilidad (Slide 30):** Agua inicialmente a $20^\circ\text{C}$ y $1\text{ atm}$ ($\rho_0 = 998\text{ kg/m}^3$, $\beta = 1.5\times 10^{-4}\text{ K}^{-1}$, $1/\kappa = 4.8\times 10^{-5}\text{ atm}^{-1}$).

   * *Caso a) Se calienta a* $50^\circ\text{C}$ *(*$\Delta T = 30\text{ K}$*) a* $p = \text{cte}$*:* $\frac{\Delta \rho}{\rho} = -\beta \Delta T = -(1.5\times 10^{-4})(30) = -0.0045 \implies \rho_f = 998(1 - 0.0045) = 993.5\text{ kg/m}^3$.

   * *Caso b) Se comprime hasta* $100\text{ atm}$ *(*$\Delta p = 99\text{ atm}$*) a* $T = 20^\circ\text{C}$*:* $\frac{\Delta \rho}{\rho} = \frac{1}{\kappa}\Delta p = (4.8\times 10^{-5})(99) = +0.00475 \implies \rho_f = 998(1 + 0.00475) = 1002.7\text{ kg/m}^3$.

2. **Ejercicio Placas Paralelas (Slide 37):** Aceite SAE 30 a $20^\circ\text{C}$ ($\mu = 0.29\text{ kg/(m}\cdot\text{s)}$) entre placas con $u = 3\text{ m/s}$ y $h = 2\text{ cm} = 0.02\text{ m}$.
   

   $$
   \tau = \mu \frac{u}{h} = 0.29 \cdot \frac{3}{0.02} = 43.5\text{ Pa} \approx 44\text{ Pa}
   $$

3. **Ejercicio Bloque en Plano Inclinado (Slide 38):** Bloque de peso $W = 1\text{ kN} = 1000\text{ N}$ y lado $b = 200\text{ mm} = 0.2\text{ m}$ ($A = 0.2^2 = 0.04\text{ m}^2$) desliza por un plano inclinado $\theta = 20^\circ$ sobre película de aceite de espesor $h = 0.005\text{ mm} = 5\times 10^{-6}\text{ m}$ y $\mu = 0.26\text{ Pa}\cdot\text{s}$.

   * *Desarrollo paso a paso:* En velocidad terminal constante ($a = 0$), la componente del peso paralela al plano ($W\sin 20^\circ$) se equilibra con la fuerza viscosa ($F_\tau = \tau A = \mu \frac{V}{h} A$):
     

     $$
     W\sin 20^\circ = \mu \frac{V}{h} A \implies V = \frac{W \sin 20^\circ \cdot h}{\mu \cdot A} = \frac{1000 \cdot \sin(20^\circ) \cdot 5\times 10^{-6}}{0.26 \cdot 0.04} = 0.164\text{ m/s}
     $$

4. **Ejercicio Módulo de Compresibilidad en Tanque de Acero (Slide 40):** Líquido a $p_1 = 10\text{ atm}$ ocupa $V_1 = 1.2320\text{ L}$. A $p_2 = 25\text{ atm}$ ocupa $V_2 = 1.2310\text{ L}$.
   

   $$
   \kappa \approx -V_1 \frac{p_2 - p_1}{V_2 - V_1} = -1.2320 \cdot \frac{25 - 10}{1.2310 - 1.2320} = 18480\text{ atm} \approx 1.872\text{ GPa} \quad ; \quad \frac{1}{\kappa} = 5.41\times 10^{-5}\text{ atm}^{-1}
   $$

5. **Ejercicio Viscosímetro de Cilindros Concéntricos (Slide 41):** Largo $L = 40\text{ cm} = 0.4\text{ m}$, diámetro interior $D = 12\text{ cm} \Rightarrow R = 0.06\text{ m}$, brecha $l = 0.15\text{ cm} = 0.0015\text{ m}$, giro $\dot{n} = 300\text{ rpm}$, torque medido $T = 1.8\text{ N}\cdot\text{m}$.

   * *Desarrollo paso a paso:* Velocidad tangencial en la pared del cilindro interno: $u = \omega R = \left(\frac{2\pi \dot{n}}{60}\right) R = \frac{2\pi(300)}{60}(0.06) = 1.885\text{ m/s}$. El área lateral mojada es $A = 2\pi R L$. El torque es $T = F_\tau \cdot R = (\tau \cdot A) R = \left(\mu \frac{u}{l}\right)(2\pi R L) R$:
     

     $$
     \mu = \frac{T \cdot l}{2\pi R^2 L u} = \frac{1.8 \cdot 0.0015}{2\pi (0.06)^2 (0.4)(1.885)} = 0.158\text{ N}\cdot\text{s/m}^2\text{ (Pa}\cdot\text{s)}
     $$

# UNIDAD 2: ESTÁTICA DE FLUIDOS E HIDROSTÁTICA

*(Fuentes: `MecFlu_S03_Hidrostatica.pdf`, `Ejercicios 1 vespertino (1).pdf` y `pauta certamen 1.pdf`)*

## 2.1. Presión en un Punto y Ecuación Fundamental de la Hidrostática (Slides 3 a 14)

### 1. ¿Por qué en Hidrostática la Presión es igual en todas las direcciones? (Ley de Pascal en un punto - Slides 4 a 7)

* En un fluido estático no hay movimiento relativo entre capas ($\frac{du}{dy} = 0$), por lo tanto **no existen esfuerzos de corte (**$\tau_{ij} = 0$**)**. Las únicas fuerzas son las de cuerpo (gravedad $W = mg$) y las fuerzas superficiales normales de presión ($p$).

* **Demostración de la Cuña Infinitesimal (Slide 6):**
  Tomando un elemento prismático triangular de lados $\Delta x, \Delta z$, hipotenusa $\Delta s$ (inclinada un ángulo $\theta$) y profundidad $\Delta y$:

  * Equilibrio horizontal ($\sum F_x = 0$): $p_x \Delta y \Delta z = p_n \sin\theta \Delta y \Delta s$. Como geométricamente $\Delta s \sin\theta = \Delta z$, se cancelan las áreas y queda:
    

    $$
    p_n = p_x
    $$

  * Equilibrio vertical ($\sum F_z = 0$): $p_z \Delta y \Delta x = p_n \cos\theta \Delta y \Delta s + \frac{1}{2}\rho g \Delta y \Delta x \Delta z$. Como $\Delta s \cos\theta = \Delta x$, al dividir por $\Delta x \Delta y$ queda:
    

    $$
    p_z = p_n + \frac{1}{2}\rho g \Delta z \xrightarrow{\Delta z \to 0} p_x = p_z = p_n = p
    $$

  * **Conclusión física:** En un punto de un fluido en reposo, la presión es una magnitud **escalar isotrópica**: tiene exactamente el mismo valor en cualquier dirección sin importar la inclinación de la superficie.

### 2. Deducción Diferencial del Gradiente de Presión (Slides 8 a 12)

* Considerando un cubo diferencial $dx\,dy\,dz$ con presión $p$ en el centro (desarrollo en serie de Taylor en las 6 caras):

  * En la cara izquierda ($-dy/2$): $\left(p - \frac{\partial p}{\partial y}\frac{dy}{2}\right)dx\,dz$. En la cara derecha ($+dy/2$): $\left(p + \frac{\partial p}{\partial y}\frac{dy}{2}\right)dx\,dz$.

  * Restando ambas fuerzas se obtiene la fuerza neta de presión en cada eje:
    

    $$
    d\vec{F}_{\text{presión}} = -\left(\frac{\partial p}{\partial x}\hat{i} + \frac{\partial p}{\partial y}\hat{j} + \frac{\partial p}{\partial z}\hat{k}\right) dx\,dy\,dz = -\nabla p \, dV
    $$

    
    Por lo tanto, la **fuerza neta de presión por unidad de volumen** es el negativo del gradiente de presión: $\vec{f}_p = -\nabla p$.

  * Aplicando la Segunda Ley de Newton ($\sum \vec{F} = dm \cdot \vec{a}$) con gravedad en el eje $-z$:
    

    $$
    -\frac{\partial p}{\partial x} = \rho a_x \quad ; \quad -\frac{\partial p}{\partial y} = \rho a_y \quad ; \quad -\frac{\partial p}{\partial z} = \rho(a_z + g)
    $$

    $$
    dp = -\rho a_x dx - \rho a_y dy - \rho(a_z + g)dz
    $$

  * **En un Fluido Estático (**$\vec{a} = 0$**):**
    

    $$
    \frac{\partial p}{\partial x} = 0 \quad ; \quad \frac{\partial p}{\partial y} = 0 \quad ; \quad \frac{\partial p}{\partial z} = -\rho g = -\gamma
    $$

    1. **No hay variación de presión en dirección horizontal** (planos horizontales dentro de un mismo fluido continuo e incompresible son planos isobáricos de igual presión).

    2. Integrando en la vertical para densidad constante ($\rho = \text{cte}$) con profundidad $h = z_0 - z$ medida hacia abajo desde la superficie libre:
       

       $$
       p(h) = p_0 + \rho g h = p_0 + \gamma h \quad \text{y} \quad \text{Carga Piezométrica } = \frac{p}{\gamma} + z = \text{cte } [\text{m}]
       $$

### 3. Variación de la Presión en la Atmósfera Estándar (Fluido Compresible - Slide 14)

* En la atmósfera el aire es un gas compresible cuya densidad depende de la altura $z$: $\rho = \frac{p}{RT}$.

* En la **Tropósfera** (de $0$ a $11\text{ km}$ de altitud), la temperatura disminuye linealmente con la altura según el gradiente térmico $B = 0.0065\text{ K/m}$ ($6.5^\circ\text{C}$ por cada kilómetro):
  

  $$
  T(z) = T_0 - B \cdot z \quad \left(\text{con } T_0 = 288.15\text{ K} = 15^\circ\text{C} \text{ y } p_0 = 101320\text{ Pa}\right)
  $$

* Sustituyendo en $\frac{dp}{dz} = -\rho g = -\frac{p g}{R(T_0 - Bz)}$ e integrando desde $z=0$ hasta $z$:
  

  $$
  \int_{p_0}^{p} \frac{dp}{p} = -\int_{0}^{z} \frac{g \, dz}{R(T_0 - Bz)} \implies p(z) = p_0 \left(1 - \frac{B \cdot z}{T_0}\right)^{\frac{g}{R \cdot B}}
  $$

## 2.2. Manometría, Sistemas Cilindro-Émbolo y Prensa de Pascal (Slides 13, 15, 16 + Guía 1 y Certamen 1)

### 1. Vasos Comunicantes Multifluido (Ejemplo Slide 13)

* En el esquema de 4 ramas conectadas por el fondo con agua, teniendo Aceite arriba a la izquierda (rama $a-A$) y Mercurio abajo a la derecha (rama $d-D$):

  * En la **Profundidad 1** ($a, b, c, d$): $p_b = p_c = p_d = p_{\text{atm}} + \rho_{\text{agua}} g h_1$, pero en $a$ hay aceite encima ($\rho_{\text{aceite}} < \rho_{\text{agua}}$), por lo tanto: $p_a < p_b = p_c = p_d$.

  * En la **Profundidad 2** ($A, B, C, D$): $A, B$ y $C$ están conectados de forma continua por agua a la misma cota horizontal, por lo tanto $p_A = p_B = p_C$ (aunque sobre $A$ haya aceite, la interfaz agua-aceite está más abajo para compensar). En cambio, para llegar a $D$ desde la cota superior se baja por Mercurio ($\rho_{\text{Hg}} \gg \rho_{\text{agua}}$), por lo tanto $p_D > p_A = p_B = p_C$.

### 2. Manómetros en U, Diferenciales, de Cisterna e Inclinados

* **Regla de Recorrido Paso a Paso:** Parte en un extremo conocido ($p_1$), avanza hacia el otro extremo sumando $+\rho_i g h_i$ cuando bajas verticalmente una columna $h_i$ y restando $-\rho_i g h_i$ cuando subes, e iguala a la presión final ($p_2$). Si hay un gas atrapado en un tramo pequeño, su variación hidrostática ($\rho_{\text{gas}} g h$) es despreciable frente a la de los líquidos.

* **Manómetro Inclinado (Problema 3-35 de `Ejercicios 1 vespertino.pdf`):**

  * Un depósito ancho de diámetro $D$ se conecta a un tubo delgado de diámetro $d$ inclinado un ángulo $\theta = 30^\circ$ donde se lee una escala de longitud $L$.

  * Por conservación de volumen de líquido: si el menisco sube una distancia $L$ a lo largo del tubo inclinado, el nivel en el depósito ancho baja $\Delta h_1 = L \left(\frac{d}{D}\right)^2$.

  * La diferencia total de altura vertical entre ambos meniscos es $h = \Delta h_1 + L \sin\theta = L \left[\sin\theta + \left(\frac{d}{D}\right)^2\right]$, lo que amplifica la lectura para medir presiones muy pequeñas (ej. hasta $100\text{ Pa}$) con mínimo error.

* **Desplazamiento de Meniscos ante un Cambio de Presión (Problema 3-51 de Guía 1 y Problema 2.43 de Pauta Certamen 1):**

  * Si en un manómetro de áreas distintas $A_1$ y $A_2$ la interfaz derecha baja $\Delta h_2 = 5\text{ mm}$ cuando la presión del aire sube $\Delta P_{\text{aire}} = 0.9\text{ kPa}$, por **incompresibilidad del volumen desplazado** la interfaz izquierda debe subir $\Delta h_1 = \Delta h_2 \left(\frac{A_2}{A_1}\right)$.

  * En un tubo en U de sección uniforme (Problema 2.43: Gasolina $SG=0.7$, Aceite $SG=0.9$, Mercurio $SG=13.6$, caída $\Delta P_A = 25\text{ kPa}$): lo que baja una rama ($a$) es exactamente igual a lo que sube la otra ($a$), por lo que el cambio en la lectura diferencial es $2a = 0.30 - \Delta h \implies a = \frac{0.30 - \Delta h}{2}$, dando $\Delta h = 0.100\text{ m}$.

### 3. Sistemas Cilindro-Émbolo con Peso, Tracción, Resortes y Cámaras (Guía 1 y Certamen 1)

* **Balance de Fuerzas Verticales sobre el Émbolo (**$\sum F_z = 0$**):**
  El estudiante debe dibujar siempre el Diagrama de Cuerpo Libre (DCL) del pistón de área $A$ y masa $m_p$:

  1. **Émbolo simple con gas (Problema 3-24):** $P_{\text{gas}} A = P_{\text{atm}} A + m_p g \implies P_{\text{gas}} = P_{\text{atm}} + \frac{m_p g}{A} = 95\text{ kPa} + \frac{40 \times 9.81}{0.012 \times 1000} = 127.7\text{ kPa}$. *Pregunta conceptual b): Si se transfiere calor al gas y su volumen se duplica, ¿cambia la presión adentro?* **NO**, porque el émbolo flota libremente y ni $P_{\text{atm}}$, ni la masa del émbolo $m_p$, ni el área $A$ cambiaron (proceso isobárico).

  2. **Émbolo con resorte comprimido (Problema 3-30):** $P_{\text{gas}} = P_{\text{atm}} + \frac{m_p g + F_{\text{resorte}}}{A} = 95\text{ kPa} + \frac{4(9.81) + 60}{35\times 10^{-4} \times 1000} = 123.4\text{ kPa}$.

  3. **Émbolo succionando columna de agua hacia arriba (Problema 3-26):** A una altura $h$ sobre la superficie libre del lago, la presión del agua bajo el émbolo es **menor que la atmosférica** ($P_{\text{agua}} = P_{\text{atm}} - \rho g h$). Para sostener el émbolo sin peso se requiere una fuerza de tracción hacia arriba $F = (P_{\text{atm}} - P_{\text{agua}})A = \rho g h A$.

  4. **Émbolo entre dos cámaras de aire** $A$ **y** $B$ **(Problema 3-54 - Pauta Certamen 1):** En la cara del pistón $P_C = P_{\text{atm}} + \frac{W_{\text{piston}}}{A_{\text{piston}}}$. Bajando $25\text{ cm}$ hasta la interfaz $E$ de la cámara $A$: $P_{\text{air }A,\text{gage}} = \frac{W_p}{A_p} + \rho g (0.25) = +2.81\text{ kPa}$. Subiendo $25\text{ cm}$ hasta la interfaz $D$ de la cámara $B$: $P_{\text{air }B,\text{gage}} = \frac{W_p}{A_p} - \rho g (0.25) = -2.10\text{ kPa}$ (vacío que succiona el agua hacia arriba).

### 4. Prensa Hidráulica de Pascal (Slide 16)

* El fluido transmite **presión**, no fuerza. Si los pistones están a la misma cota:
  

  $$
  p_i = p_0 \implies \frac{F_i}{A_i} = \frac{F_0}{A_0} \implies F_0 = \left(\frac{d_0}{d_i}\right)^2 F_i
  $$

* Por conservación del volumen desplazado ($V_d = A_i L_i = A_0 L_0$):
  

  $$
  L_0 = \left(\frac{d_i}{d_0}\right)^2 L_i
  $$

  
  *(Lo que se gana en multiplicación de fuerza se sacrifica exactamente en menor distancia recorrida; el trabajo mecánico* $F_i L_i = F_0 L_0$ *se conserva).*

## 2.3. Fuerzas Hidrostáticas sobre Superficies Sumergidas y Arquímedes (Slides 17 a 25)

### 1. Superficies Planas Horizontales y Paradoja Hidrostática (Slide 17)

* Sobre un fondo plano horizontal de área $A_B$ a profundidad $h_B$: la presión es uniforme en todo el fondo y la fuerza resultante es simplemente el peso de una columna cilíndrica imaginaria sobre el fondo:
  

  $$
  F_n = \rho g h_B A_B \quad \text{(o } F_n = (p_i + \rho g h)A_B \text{ si hay gas presurizado } p_i \text{ arriba)}
  $$

  
  Esto se cumple en los 5 recipientes de la diapositiva 17 aunque uno sea angosto arriba y otro sea ancho como un embudo.

### 2. Superficies Planas Inclinadas Sumergidas (Deducción de W. Bohl - Slides 18 y 19)

* **Explicación del Profesor:** *"Cuando tienes una compuerta plana sumergida e inclinada un ángulo* $\alpha$ *respecto a la vertical (o respecto a la superficie), la presión del agua va creciendo a medida que bajas. Por eso, si calculas la **fuerza total*** $F_n$*, puedes usar la presión justo en el centro geométrico (Centroide* $S$*) multiplicada por el área. ¡PERO CUIDADO! Como abajo hay más presión que arriba, el punto donde debes poner un dedo para sostener la compuerta sin que gire (**Centro de Presión*** $D$*) NO está en el centroide* $S$*, sino siempre **más abajo** a una distancia* $e$ *llamada excentricidad."*

* **Fórmulas Exactas de Cátedra (con eje** $w$ **medido a lo largo del plano inclinado desde la línea de intersección con la superficie libre *Spiegelschnittlinie*):**

  1. **Magnitud de la Fuerza Resultante (**$F_n$**):**
     

     $$
     F_n = \int_A p \, dA = \gamma \int_A z \, dA = \gamma \cos\alpha \int_A w \, dA = \gamma z_s A = p_s \cdot A
     $$

     
     Donde $z_s = w_s \cos\alpha$ es la profundidad vertical del **Centroide (**$S$**)** de la figura y $p_s$ es la presión en el centroide.

  2. **Ubicación del Centro de Presión (**$D$**) mediante Equilibrio de Momentos (**$\sum M = 0$**):**
     

     $$
     F_n \cdot w_D = \int_A w \cdot p \, dA \implies w_D = \frac{\int_A w^2 \, dA}{\int_A w \, dA} = \frac{I_x}{w_s \cdot A}
     $$

     
     Por el Teorema de Steiner (ejes paralelos), $I_x = I_s + A w_s^2$, donde $I_s$ es el momento de inercia del área respecto al eje que pasa por su propio centroide $S$ (ej. para un círculo de diámetro $d$: $I_s = \frac{\pi d^4}{64}$; para un rectángulo de ancho $b$ y alto $h$: $I_s = \frac{b h^3}{12}$). Dividiendo por $A w_s$:
     

     $$
     w_D = w_s + e \quad \text{con Excentricidad: } \quad e = \frac{I_s}{A \cdot w_s}
     $$

  3. **Coordenada lateral (**$x_D$**):** $x_D = \frac{I_{wx}}{w_s A}$ (para figuras simétricas respecto al eje vertical, $I_{wx} = 0$ y $x_D = x_s$).

### 3. Principio de Arquímedes y Flotación (Slide 20)

* La diferencia entre las fuerzas de presión en la cara inferior ($z_2$) y superior ($z_1$) de un cuerpo sumergido genera una fuerza vertical hacia arriba llamada **Empuje (**$F_b$**)**:
  

  $$
  dF_b = \gamma(z_2 - z_1)dA = \rho_{\text{fl}} g \, dV \implies F_b = \rho_{\text{fl}} \cdot g \cdot V_d
  $$

* **Fórmula de Laboratorio para medir la densidad de una roca o pieza irregular (**$\rho_{\text{ob}}$ **- Slide 20):**
  Si pesas el objeto en el aire ($G = \rho_{\text{ob}} g V$) y luego lo pesas colgado de una cuerda totalmente sumergido en un fluido ($G_{\text{sum}} = G - F_b$):
  

  $$
  \rho_{\text{ob}} = \frac{G}{G - G_{\text{sum}}} \cdot \rho_{\text{fl}}
  $$

### 4. Ejercicios Oficiales Resueltos de la Sesión 03 (Slides 22 a 25)

1. **Ejercicio 1 (Slide 22 - Estanque con Gasolina y Agua):** Columna de gasolina de $h_1 = 3\text{ m}$ ($\gamma_G \approx 6800\text{ N/m}^3$) sobre un estanque de agua de $h_2 = 2\text{ m}$ ($\gamma_w = 9807\text{ N/m}^3$).
   

   $$
   p_C = p_0 + \gamma_G h_1 + \gamma_w h_2 \implies p_{C,\text{man}} = (6800)(3) + (9807)(2) = 20400 + 19614 = 40014\text{ Pa} \approx 40\text{ kPa}
   $$

2. **Ejercicio 2 (Slide 23 - Momento sobre Válvula de Mariposa Circular):** Disco vertical ($\alpha = 0^\circ \Rightarrow w = z$) de diámetro $d = 1\text{ m}$ articulado en su eje central, con el borde inferior a profundidad $z = 2\text{ m}$ (por tanto el centroide $S$ está a $w_s = z_s = 2 - 0.5 = 1.5\text{ m}$). Al otro lado hay presión atmosférica $p_0$ (se cancela).

   * Área del disco: $A = \frac{\pi (1)^2}{4} = 0.7854\text{ m}^2$. Momento de inercia centroidal: $I_s = \frac{\pi d^4}{64} = \frac{\pi (1)^4}{64} = 0.04909\text{ m}^4$.

   * Fuerza hidrostática neta: $F_n = \rho g z_s A = (1000)(9.81)(1.5)(0.7854) = 11557\text{ N}$.

   * Distancia entre el eje de giro (centroide $S$) y el punto de aplicación $D$: $e = \frac{I_s}{A w_s} = \frac{0.04909}{0.7854 \times 1.5} = 0.04167\text{ m}$.

   * **Momento de giro hidrostático (**$M_h$**):**
     

     $$
     M_h = F_n \cdot e = (\rho g w_s A) \left(\frac{I_s}{A w_s}\right) = \rho \cdot g \cdot I_s = (1000)(9.81)(0.04909) = 481.5\text{ N}\cdot\text{m}
     $$

   * *Pregunta de cátedra: ¿Y cómo varía* $M_h$ *si la profundidad sube a* $z = 5\text{ m}$*?* **¡Sorpresa física! NO CAMBIA (**$M_h$ **sigue siendo** $481.5\text{ N}\cdot\text{m}$**)**, porque en $M_h = F_n \cdot e = (\gamma w_s A)\left(\frac{I_s}{A w_s}\right) = \gamma I_s$, la profundidad $w_s$ se cancela: al bajar más profundo la fuerza $F_n$ aumenta, pero el brazo de palanca $e$ se achica en la misma proporción.

3. **Ejercicio 3 (Slide 24 - El Iceberg):** Hielo ($\rho_{\text{hielo}} \approx 920\text{ kg/m}^3$) flotando en agua de mar ($\rho_{\text{mar}} \approx 1025\text{ kg/m}^3$).

   * En equilibrio ($W = F_b$): $\rho_{\text{hielo}} g V_{\text{total}} = \rho_{\text{mar}} g V_{\text{sum}} \implies \frac{V_{\text{sum}}}{V_{\text{total}}} = \frac{920}{1025} = 0.898$ ($89.8\%$ sumergido). Por lo tanto, la **fracción expuesta** es $1 - 0.898 = 0.102$ ($\sim 10.2\%$).

4. **Ejercicio 4 (Slide 25 - Pistones Acoplados por Barra Rígida):** Dos pistones sin roce unidos por un vástago horizontal tienen diámetros $d_1 = 0.03\text{ m}$ y $d_2 = 0.01\text{ m}$, sosteniendo columnas de agua $h_1 = 1\text{ m}$ y $h_2$.

   * ¡Cuidado! Aquí están unidos por una barra mecánica rígida, por lo que **se igualan las FUERZAS sobre los pistones (**$F_1 = F_2$**), no las presiones**:
     

     $$
     p_1 A_1 = p_2 A_2 \implies (\rho g h_1)\left(\frac{\pi d_1^2}{4}\right) = (\rho g h_2)\left(\frac{\pi d_2^2}{4}\right) \implies h_2 = h_1 \left(\frac{d_1}{d_2}\right)^2 = 1\text{ m} \cdot \left(\frac{0.03}{0.01}\right)^2 = 9\text{ m}
     $$

# UNIDAD 3: MÉTODO DIFERENCIAL — CINEMÁTICA Y ECUACIONES DE NAVIER-STOKES

*(Fuente: `MecFlu_S05_MetodoDiferencial.pdf` - Prof. M. Roth)*

## 3.1. Notación Tensorial y Cinemática de Partículas Fluidas (Slides 4 a 16)

### 1. Notación Indicial / Tensorial de Einstein (Slide 6)

* **Escalar:** $\varphi$ (orden 0, 1 componente). **Vector:** $\vec{c} = c_i \vec{e}_i \Rightarrow c_i$ (orden 1, 3 componentes). **Tensor de 2° orden:** $\mathbf{A} = A_{ij}\vec{e}_i\vec{e}_j \Rightarrow A_{ij}$ (matriz de $3\times 3 = 9$ componentes).

* **Regla del subíndice repetido (Divergencia):** Cuando un subíndice se repite en un mismo término, implica sumatoria automática sobre $x, y, z$:
  

  $$
  \frac{\partial V_i}{\partial x_i} = \frac{\partial V_x}{\partial x} + \frac{\partial V_y}{\partial y} + \frac{\partial V_z}{\partial z} = \nabla \cdot \vec{V}
  $$

* **Regla del subíndice diferente (Tensor Gradiente de Velocidad):** $\frac{\partial V_i}{\partial x_j}$ representa la matriz completa de 9 derivadas parciales cruzadas.

### 2. La Derivada Sustancial o Material ($D/Dt$) y Aceleración (Slides 8 a 12)

* **Explicación del Profesor:** *"Imagina que vas en una balsa bajando por un río que entra a un cañón estrecho. Tu velocidad puede cambiar por dos motivos distintos: primero, porque abrieron las compuertas de la represa y todo el río empezó a correr más rápido con el reloj (**aceleración local*** $\frac{\partial \vec{c}}{\partial t}$*); y segundo, aunque el caudal del río sea totalmente constante con el reloj (*$\frac{\partial \vec{c}}{\partial t} = 0$*), cuando tu balsa pasa de la parte ancha del río a la garganta estrecha del cañón, tú aceleras porque te moviste hacia un lugar donde el agua corre más rápido (**aceleración convectiva**). La suma de ambos efectos es la **Derivada Sustancial**."*

* **Fórmula General para cualquier propiedad** $\varphi(x,y,z,t)$**:**
  

  $$
  \frac{D\varphi}{Dt} = \underbrace{\frac{\partial \varphi}{\partial t}}_{\text{Cambio Local (temporal)}} + \underbrace{u\frac{\partial \varphi}{\partial x} + v\frac{\partial \varphi}{\partial y} + w\frac{\partial \varphi}{\partial z}}_{\text{Cambio Convectivo (espacial)}} = \frac{\partial \varphi}{\partial t} + \vec{c} \cdot \nabla \varphi
  $$

* **Vector Aceleración de una Partícula Fluida (**$\vec{a} = \frac{D\vec{c}}{Dt}$ **- Slide 12):**
  

  $$
  a_x = \frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z}
  $$

  $$
  a_y = \frac{\partial v}{\partial t} + u\frac{\partial v}{\partial x} + v\frac{\partial v}{\partial y} + w\frac{\partial v}{\partial z}
  $$

  $$
  a_z = \frac{\partial w}{\partial t} + u\frac{\partial w}{\partial x} + v\frac{\partial w}{\partial y} + w\frac{\partial w}{\partial z}
  $$

  $$
  \text{Forma Vectorial: } \quad \vec{a} = \frac{D\vec{c}}{Dt} = \frac{\partial \vec{c}}{\partial t} + (\vec{c} \cdot \nabla)\vec{c}
  $$

### 3. Los 4 Movimientos Cinemáticos de una Partícula Fluida (Slides 7 y 13 a 16)

Cuando un elemento cuadrado de fluido se mueve en el espacio, experimenta 2 movimientos de cuerpo rígido y 2 deformaciones:

1. **Traslación Pura:** Desplazamiento del centro de masa con velocidad $\vec{c} = u\hat{i} + v\hat{j} + w\hat{k}$.

2. **Rotación o Giro (**$\vec{\Omega}$**) y Vector Vorticidad (**$\vec{\omega}$ **- Slide 14):**

   * En un fluido las aristas horizontal $AA'$ y vertical $BB'$ pueden girar a velocidades distintas; por eso la velocidad angular $\Omega_z$ se define como el promedio de giro de ambas líneas perpendiculares:
     

     $$
     \Omega_z = \frac{1}{2}\left(\Omega_{AA'} + \Omega_{BB'}\right) = \frac{1}{2}\left(\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}\right) \implies \vec{\Omega} = \frac{1}{2}\nabla \times \vec{V}
     $$

   * **Vector Vorticidad (**$\vec{\omega}$**):** Es el doble de la velocidad angular (igual al rotacional del campo de velocidades):
     

     $$
     \vec{\omega} = 2\vec{\Omega} = \text{rot }\vec{V} = \nabla \times \vec{V}
     $$

   * **Condición de Flujo Irrotacional:** Si las partículas se trasladan sin girar sobre su propio eje, $\vec{\omega} = \nabla \times \vec{V} = 0$.

3. **Deformación Lineal (Estiramiento) y Tasa de Dilatación Volumétrica (Slide 15):**

   * Tasas de deformación normal en cada eje: $\dot{\epsilon}_{xx} = \frac{\partial u}{\partial x}$, $\dot{\epsilon}_{yy} = \frac{\partial v}{\partial y}$, $\dot{\epsilon}_{zz} = \frac{\partial w}{\partial z}$.

   * **Velocidad de Deformación Volumétrica (Tasa de Dilatación):** Es el cambio relativo de volumen por unidad de tiempo, y equivale a la divergencia de la velocidad:
     

     $$
     \frac{1}{\delta V}\frac{d(\delta V)}{dt} = \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = \nabla \cdot \vec{V} = \frac{\partial u_i}{\partial x_i}
     $$

     
     *(En un flujo incompresible no hay dilatación volumétrica, por lo que* $\nabla \cdot \vec{V} = 0$*).*

4. **Deformación Angular (Cortante) y Tensor Tasa de Deformación (Slide 16):**

   * Mide la rapidez con que el ángulo recto original entre las aristas del elemento fluido se cierra o se abre (convirtiendo el cuadrado en un rombo):
     

     $$
     \dot{\gamma}_{xy} = \dot{\gamma}_{yx} = \left(\frac{\partial v}{\partial x} + \frac{\partial u}{\partial y}\right) \quad ; \quad \dot{\gamma}_{ij} = \left(\frac{\partial v_j}{\partial x_i} + \frac{\partial v_i}{\partial x_j}\right)
     $$

   * **Tensor Tasa de Deformación:**
     

     $$
     \dot{\mathbf{\epsilon}} = \begin{bmatrix} \dot{\epsilon}_{xx} & \dot{\gamma}_{xy} & \dot{\gamma}_{xz} \\ \dot{\gamma}_{yx} & \dot{\epsilon}_{yy} & \dot{\gamma}_{yz} \\ \dot{\gamma}_{zx} & \dot{\gamma}_{zy} & \dot{\epsilon}_{zz} \end{bmatrix}
     $$

## 3.2. Ecuación Diferencial de Continuidad (Conservación de Masa - Slides 17 y 18)

### Deducción Paso a Paso sobre el Cubo Infinitesimal $\delta x\,\delta y\,\delta z$

* El balance de conservación de masa exige que la variación temporal de masa dentro del Volumen de Control más el flujo másico neto que sale por las caras sea cero:
  

  $$
  \frac{\partial (m)_{VC}}{\partial t} + \sum \dot{m}_{\text{sal}} - \sum \dot{m}_{\text{ent}} = 0
  $$

* En el eje $x$, por la cara izquierda entra $\left[\rho u - \frac{\partial(\rho u)}{\partial x}\frac{\delta x}{2}\right]\delta y \delta z$ y por la cara derecha sale $\left[\rho u + \frac{\partial(\rho u)}{\partial x}\frac{\delta x}{2}\right]\delta y \delta z$. La resta (salida menos entrada) da $\frac{\partial(\rho u)}{\partial x}\delta x \delta y \delta z$.

* Sumando los 3 ejes y dividiendo por el volumen $\delta x \delta y \delta z$, se obtiene la **Ecuación Diferencial General de Continuidad**:
  

  $$
  \frac{\partial \rho}{\partial t} + \frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} + \frac{\partial(\rho w)}{\partial z} = 0 \iff \frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \vec{V}) = 0 \iff \frac{\partial \rho}{\partial t} + \frac{\partial(\rho v_i)}{\partial x_i} = 0
  $$

* **Casos Particulares de Certamen (Slide 18):**

  1. **Flujo Compresible Estacionario (**$\frac{\partial \rho}{\partial t} = 0$**):** $\nabla \cdot (\rho \vec{V}) = 0$.

  2. **Flujo Incompresible (estacionario o transitorio,** $\rho = \text{cte}$**):** La densidad sale de las derivadas y queda:
     

     $$
     \nabla \cdot \vec{V} = \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0
     $$

## 3.3. Dinámica Diferencial: De Euler y Cauchy a Navier-Stokes (Slides 19 a 31)

### 1. Dinámica de Fluidos No Viscosos ($\mu = 0$): Ecuaciones de Euler (Slides 19 a 22)

* Si despreciamos la viscosidad ($\mu = 0$), los esfuerzos cortantes desaparecen y sobre la partícula solo actúan fuerzas de presión ($-\nabla p$) y gravedad ($\rho \vec{g}$). Aplicando $\delta m \cdot \vec{a} = \delta \vec{F}_p + \delta \vec{F}_g$ y dividiendo por $\delta m = \rho \delta x \delta y \delta z$:
  

  $$
  \frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z} = -\frac{1}{\rho}\frac{\partial p}{\partial x} + g_x
  $$

  $$
  \frac{\partial v}{\partial t} + u\frac{\partial v}{\partial x} + v\frac{\partial v}{\partial y} + w\frac{\partial v}{\partial z} = -\frac{1}{\rho}\frac{\partial p}{\partial y} + g_y
  $$

  $$
  \frac{\partial w}{\partial t} + u\frac{\partial w}{\partial x} + v\frac{\partial w}{\partial y} + w\frac{\partial w}{\partial z} = -\frac{1}{\rho}\frac{\partial p}{\partial z} + g_z
  $$

  $$
  \text{Forma Vectorial de Euler: } \quad \frac{\partial \vec{V}}{\partial t} + (\vec{V}\cdot\nabla)\vec{V} = -\frac{\nabla p}{\rho} + \vec{g}
  $$

* **Tarea de Cátedra Resuelta (Slide 22): Integración de Euler a lo largo de una Línea de Corriente** $s$ **para llegar a Bernoulli:**

  * A lo largo de una coordenada natural de línea de corriente $s$, la ecuación de Euler se escribe:
    

    $$
    \frac{\partial V_s}{\partial t} + V_s \frac{\partial V_s}{\partial s} + \frac{1}{\rho}\frac{\partial p}{\partial s} + g\frac{\partial z}{\partial s} = 0
    $$

  * Asumiendo: (1) Flujo estacionario ($\frac{\partial V_s}{\partial t} = 0$), (2) Fluido incompresible ($\rho = \text{cte}$), (3) Gravedad constante ($g = \text{cte}$) y (4) Flujo sin viscosidad ($\mu = 0$), multiplicamos por $ds$ e integramos a lo largo de la línea de corriente:
    

    $$
    \int V_s \, dV_s + \frac{1}{\rho}\int dp + g \int dz = 0 \implies \frac{V^2}{2} + \frac{p}{\rho} + g \cdot z = \text{cte} \quad \text{(¡Ecuación de Bernoulli!)}
    $$

### 2. Dinámica de Flujos Viscosos: Ecuaciones de Cauchy y Ley de Stokes (Slides 23 a 28)

* Cuando el fluido es viscoso ($\mu > 0$), aparecen sobre las 6 caras del cubo los componentes del **Tensor de Esfuerzos (**$\mathbf{T}$ **o** $\tau_{ij}$**)**, que es simétrico por conservación de momento angular ($\tau_{xy} = \tau_{yx}$):
  

  $$
  \mathbf{T} = \begin{bmatrix} \sigma_x & \tau_{xy} & \tau_{xz} \\ \tau_{yx} & \sigma_y & \tau_{yz} \\ \tau_{zx} & \tau_{zy} & \sigma_z \end{bmatrix}
  $$

* **Ecuación de Movimiento de Cauchy (Válida para cualquier medio continuo, newtoniano o no newtoniano - Slide 27):**
  

  $$
  \rho \left(\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z}\right) = -\frac{\partial p}{\partial x} + \rho g_x + \frac{\partial \sigma_x}{\partial x} + \frac{\partial \tau_{yx}}{\partial y} + \frac{\partial \tau_{zx}}{\partial z}
  $$

  
  *(Aquí* $\sigma_x, \sigma_y, \sigma_z$ *son los esfuerzos normales viscosos desviadores aparte de la presión* $-p$*).*

* **El Problema de Cierre y la Ley Constitutiva de Stokes (Slide 28):**
  Tenemos 4 ecuaciones (Continuidad + 3 de Cauchy) pero 10 incógnitas ($u,v,w,p$ y los 6 esfuerzos independientes). Para cerrar el sistema en un **fluido newtoniano isotrópico**, George Stokes postuló que los esfuerzos viscosos son linealmente proporcionales a las tasas de deformación (igual que la Ley de Hooke en sólidos):
  

  $$
  \tau_{xx} = \sigma_x = \mu\left(2\frac{\partial u}{\partial x} - \frac{2}{3}\nabla\cdot\vec{V}\right) - p \quad ; \quad \tau_{xy} = \tau_{yx} = \mu\left(\frac{\partial u}{\partial y} + \frac{\partial v}{\partial x}\right)
  $$

  $$
  T_{ij} = \mu\left(\frac{\partial v_i}{\partial x_j} + \frac{\partial v_j}{\partial x_i} - \frac{2}{3}\frac{\partial v_k}{\partial x_k}\delta_{ij}\right) - p\delta_{ij}
  $$

### 3. Las Ecuaciones de Navier-Stokes para Flujos Incompresibles (Slides 29 a 31)

* Si el fluido es **incompresible (**$\nabla \cdot \vec{V} = 0$**)** y tiene **viscosidad constante (**$\mu = \text{cte}$**)**, al reemplazar la Ley de Stokes dentro de las Ecuaciones de Cauchy los términos cruzados se simplifican al Laplaciano de la velocidad ($\nabla^2 \vec{V} = \Delta \vec{V}$) y nacen las famosas **Ecuaciones de Navier-Stokes**:
  

  $$
  \rho\left(\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z}\right) = -\frac{\partial p}{\partial x} + \rho g_x + \mu\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}\right)
  $$

  $$
  \rho\left(\frac{\partial v}{\partial t} + u\frac{\partial v}{\partial x} + v\frac{\partial v}{\partial y} + w\frac{\partial v}{\partial z}\right) = -\frac{\partial p}{\partial y} + \rho g_y + \mu\left(\frac{\partial^2 v}{\partial x^2} + \frac{\partial^2 v}{\partial y^2} + \frac{\partial^2 v}{\partial z^2}\right)
  $$

  $$
  \rho\left(\frac{\partial w}{\partial t} + u\frac{\partial w}{\partial x} + v\frac{\partial w}{\partial y} + w\frac{\partial w}{\partial z}\right) = -\frac{\partial p}{\partial z} + \rho g_z + \mu\left(\frac{\partial^2 w}{\partial x^2} + \frac{\partial^2 w}{\partial y^2} + \frac{\partial^2 w}{\partial z^2}\right)
  $$

  $$
  \text{Forma Vectorial Compacta: } \quad \rho\left(\frac{\partial \vec{V}}{\partial t} + (\vec{V}\cdot\nabla)\vec{V}\right) = -\nabla p + \mu \nabla^2\vec{V} + \vec{f}
  $$

* **Jerarquía Unificadora de toda la Mecánica de Fluidos (Preguntas del Profesor en Slide 31):**

  * Con $\rho$ y $\mu$ conocidas, Continuidad + las 3 de Navier-Stokes forman un sistema cerrado de **4 ecuaciones y 4 incógnitas (**$u, v, w, p$**)**.

  * **¿Qué pasa si hacemos** $\mu = 0$ **en Navier-Stokes?** Se anula $\mu\nabla^2\vec{V}$ y recuperamos las **Ecuaciones de Euler** (y al integrar, **Bernoulli**).

  * **¿Qué pasa si hacemos** $u_i = 0$ **(velocidad cero) en Navier-Stokes?** Se anulan la aceleración y la viscosidad y recuperamos la **Ecuación Fundamental de la Hidrostática** ($\nabla p = \rho \vec{g}$).

# UNIDAD 4: ANÁLISIS DIMENSIONAL, TEOREMA $\Pi$ Y SEMEJANZA

*(Fuente: `MecFlu_S07_AnalisisDimensional.pdf` - Prof. M. Roth)*

## 4.1. Dimensiones Fundamentales y Homogeneidad Dimensional (Slides 5 a 12)

* **¿Por qué existe el Análisis Dimensional? (Ejemplo de la Placa Orificio - Slide 6):**
  Si quieres medir la caída de presión $\Delta p = p_1 - p_2$ en un estrechamiento que depende de 5 variables ($\Delta p, \rho, V_1, d_1, d_0$), tendrías que llenar libros enteros de gráficos cambiando un diámetro y una densidad a la vez. Al agruparlas en solo 2 números adimensionales $\left[\frac{\Delta p}{\frac{1}{2}\rho V_1^2}, \frac{d_1}{d_0}\right]$, ¡todos los experimentos del mundo colapsan en **una sola curva universal**!

* **Sistemas de Dimensiones Primarias (Slides 8 a 11):**

  * Sistema Masa: $\{M, L, T, \Theta\}$ (Masa, Longitud, Tiempo, Temperatura).

  * Sistema Fuerza: $\{F, L, T, \Theta\}$ (recordando por 2da Ley de Newton que $F = M \cdot L \cdot T^{-2} \iff M = F \cdot T^2 \cdot L^{-1}$).

| Magnitud Física | Unidad SI | Dimensiones en $\{M, L, T, \Theta\}$ | Dimensiones en $\{F, L, T, \Theta\}$ | 
| ----- | ----- | ----- | ----- | 
| Longitud ($L, D$) | $\text{m}$ | $L$ | $L$ | 
| Tiempo ($t$) | $\text{s}$ | $T$ | $T$ | 
| Masa ($m$) | $\text{kg}$ | $M$ | $F T^2 L^{-1}$ | 
| Fuerza ($F$) | $\text{N} = \text{kg}\cdot\text{m/s}^2$ | $M L T^{-2}$ | $F$ | 
| Velocidad ($V, c$) | $\text{m/s}$ | $L T^{-1}$ | $L T^{-1}$ | 
| Aceleración ($a, g$) | $\text{m/s}^2$ | $L T^{-2}$ | $L T^{-2}$ | 
| Presión o Esfuerzo ($p, \tau$) | $\text{Pa} = \text{N/m}^2$ | $M L^{-1} T^{-2}$ | $F L^{-2}$ | 
| Densidad ($\rho$) | $\text{kg/m}^3$ | $M L^{-3}$ | $F T^2 L^{-4}$ | 
| Viscosidad dinámica ($\mu$) | $\text{kg/(m}\cdot\text{s)}$ | $M L^{-1} T^{-1}$ | $F T L^{-2}$ | 
| Viscosidad cinemática ($\nu$) | $\text{m}^2/\text{s}$ | $L^2 T^{-1}$ | $L^2 T^{-1}$ | 
| Torque, Energía, Trabajo ($T, E, W$) | $\text{N}\cdot\text{m} = \text{J}$ | $M L^2 T^{-2}$ | $F L$ | 
| Flujo volumétrico / Caudal ($Q$) | $\text{m}^3/\text{s}$ | $L^3 T^{-1}$ | $L^3 T^{-1}$ | 
| Flujo másico ($\dot{m}$) | $\text{kg/s}$ | $M T^{-1}$ | $F T L^{-1}$ | 
| Potencia ($P, \dot{W}$) | $\text{W} = \text{J/s}$ | $M L^2 T^{-3}$ | $F L T^{-1}$ | 
| Velocidad angular ($\omega, n$) | $\text{Hz} = \text{s}^{-1}$ | $T^{-1}$ | $T^{-1}$ | 
| Calor específico ($c_p, c_v$) | $\text{J/(kg}\cdot\text{K)}$ | $L^2 T^{-2} \Theta^{-1}$ | $L^2 T^{-2} \Theta^{-1}$ | 

## 4.2. Teorema $\Pi$ de Buckingham, Método de Rayleigh y Método de Ipsen (Slides 12 a 20)

### 1. Enunciado del Teorema $\Pi$ de Buckingham (Slide 12)

Si un proceso físico relaciona $n$ variables dimensionales $x_1 = f(x_2, x_3, \dots, x_n)$ que involucran $k$ dimensiones primarias fundamentales (usualmente $k = 3$ para $M, L, T$), entonces la relación se puede reducir exactamente a $n - k$ **grupos adimensionales (**$\Pi$**)**:

$$
\Pi_1 = \phi(\Pi_2, \Pi_3, \dots, \Pi_{n-k}) \quad \text{donde } \quad \#\Pi = \#\text{variables } (n) - \#\text{dimensiones primarias } (k)
$$

### 2. Ejemplo Completo de Cátedra: Fuerza de Arrastre sobre una Esfera Lisa (Slides 14 a 20)

* **Planteamiento:** La fuerza de arrastre $F_D$ depende del diámetro $D$, velocidad del fluido $V$, densidad $\rho$ y viscosidad $\mu$: $F_D = f(D, V, \rho, \mu)$.

  * Número de variables: $n = 5$. Dimensiones primarias ($M, L, T$): $k = 3$. Número de grupos adimensionales: $\#\Pi = 5 - 3 = 2$.

* **Método 1: Método de los Exponentes (Rayleigh/Buckingham - Slides 15 a 18):**
  Planteamos $F_D = K \cdot D^a \cdot V^b \cdot \rho^c \cdot \mu^d$. Reemplazando dimensiones:
  

  $$
  \left[M^1 L^1 T^{-2}\right] = (L)^a \cdot (L T^{-1})^b \cdot (M L^{-3})^c \cdot (M L^{-1} T^{-1})^d
  $$

  
  Igualando los exponentes de cada dimensión primaria:

  * Para $L$: $1 = a + b - 3c - d$

  * Para $M$: $1 = c + d \implies c = 1 - d$

  * Para $T$: $-2 = -b - d \implies b = 2 - d$

  * Sustituyendo $b$ y $c$ en la ecuación de $L$: $1 = a + (2-d) - 3(1-d) - d \implies a = 2 - d$.

  * Reemplazando los exponentes en función de $d$:
    

    $$
    F_D = K \cdot D^{2-d} V^{2-d} \rho^{1-d} \mu^d = K \cdot \rho D^2 V^2 \left(\frac{\rho V D}{\mu}\right)^{-d} \implies \underbrace{\frac{F_D}{\rho D^2 V^2}}_{\Pi_1 \text{ (Coef. Arrastre } C_D)} = f\left(\underbrace{\frac{\rho V D}{\mu}}_{\Pi_2 \text{ (Reynolds } Re)}\right)
    $$

* **Método 2: Método Tabular Escalonado de Ipsen (Slide 20):**
  Es mucho más rápido para certámenes porque elimina una dimensión primaria por columna dividiendo o multiplicando entre variables:

| Variable | Dimensión Inicial | Paso 1: Eliminar $M$ (usando $\rho = \frac{M}{L^3}$) | Paso 2: Eliminar $T$ (usando $c = \frac{L}{T}$) | Paso 3: Eliminar $L$ (usando $D = L$) $\rightarrow$ ¡Grupos $\Pi$! | 
| ----- | ----- | ----- | ----- | ----- | 
| $F_D$ | $\frac{M L}{T^2}$ | $\frac{F_D}{\rho} \rightarrow \left[\frac{L^4}{T^2}\right]$ | $\frac{F_D}{\rho c^2} \rightarrow \left[L^2\right]$ | $\Pi_1 = \frac{F_D}{\rho c^2 D^2}$ | 
| $c$ | $\frac{L}{T}$ | $\frac{L}{T}$ | *(Usada para eliminar* $T$*)* | — | 
| $\rho$ | $\frac{M}{L^3}$ | *(Usada para eliminar* $M$*)* | — | — | 
| $\mu$ | $\frac{M}{L T}$ | $\frac{\mu}{\rho} \rightarrow \left[\frac{L^2}{T}\right]$ | $\frac{\mu}{\rho c} \rightarrow \left[L\right]$ | $\Pi_2 = \frac{\mu}{\rho c D} = \frac{1}{Re}$ | 
| $D$ | $L$ | $L$ | $L$ | *(Usada para eliminar* $L$*)* | 

## 4.3. Significado Físico de Todos los Números Adimensionales (Slides 21 a 29)

En Mecánica de Fluidos la fuerza de inercia característica es $F_i = m \cdot a \sim (\rho L^3)(c^2 / L) = \rho L^2 c^2$. Dividiendo esta fuerza de inercia por cada una de las fuerzas que actúan sobre el fluido se obtienen todos los números adimensionales:

| Número Adimensional | Fórmula Exacta | Razón de Fuerzas que Compara | Cuándo Domina y Aplicaciones Reales (Slides 23 a 29) | 
| ----- | ----- | ----- | ----- | 
| **Reynolds (**$Re$**)** | $Re = \frac{\rho L c}{\mu} = \frac{L c}{\nu}$ | $\frac{\text{Fuerzas de Inercia } (\rho L^2 c^2)}{\text{Fuerzas Viscosas } (\mu c L)}$ | Flujos internos en tuberías ($L = D$) y cuerpos sumergidos subsónicos. Define si el régimen es **laminar** o **turbulento**. | 
| **Froude (**$Fr$**)** | $Fr = \frac{c}{\sqrt{g L}}$ (o $\frac{c^2}{g L}$) | $\frac{\text{Fuerzas de Inercia}}{\text{Fuerzas de Gravedad } (\rho L^3 g)}$ | Flujos con **superficie libre** (ríos, canales, vertederos de presas, olas de barcos).  • $Fr < 1$: Régimen **subcrítico** (las ondas viajan aguas arriba).  • $Fr = 1$: Régimen **crítico**.  • $Fr > 1$: Régimen **supercrítico** (el flujo va más rápido que las ondas y genera ondas de choque / resalto hidráulico). | 
| **Mach (**$Ma$**)** | $Ma = \frac{c}{a}$  ($a_{\text{gas}} = \sqrt{k R T}$)  ($a_{\text{líq}} = \sqrt{K/\rho}$) | $\sqrt{\frac{\text{Fuerzas de Inercia}}{\text{Fuerzas de Compresibilidad } (L^2 K)}}$ | Aerodinámica de alta velocidad y gases compresibles. Si $Ma < 0.3$ el flujo se trata como incompresible; si $Ma > 1$ es supersónico (cono de onda de choque). | 
| **Weber (**$We$**)** | $We = \frac{\rho L c^2}{\sigma}$ | $\frac{\text{Fuerzas de Inercia}}{\text{Fuerza Tensión Superficial } (L\sigma)}$ | Formación de **gotas, sprays, atomizadores**, burbujas y películas líquidas muy delgadas (a menor $We$, más esférica es la gota). | 
| **Strouhal (**$St$**)** | $St = \frac{\omega L}{U} = \frac{n D}{V}$ | $\frac{\text{Frecuencia de Oscilación Local}}{\text{Velocidad Convectiva}}$ | Flujos oscilatorios periódicos y desprendimiento alternado de vórtices (**Calle de Vórtices de Von Kármán** tras cilindros, cables o chimeneas; para $10^2 < Re < 10^5$, $St \approx 0.20 - 0.21$). | 
| **Euler (**$Eu$**) y Coef. Presión (**$C_p$**)** | $Eu = \frac{\Delta p}{\rho c^2}$  $C_p = \frac{p - p_0}{\frac{1}{2}\rho c^2} = 2 Eu$ | $\frac{\text{Fuerzas de Presión } (L^2 \Delta p)}{\text{Fuerzas de Inercia } (\rho L^2 c^2)}$ | Distribución de presiones sobre perfiles alares NACA (zona de sobrepresión inferior y succión superior) y pérdidas en ductos. | 
| **Cavitación (**$Ca$**)** | $Ca = \frac{p - p_v}{\frac{1}{2}\rho c^2}$ | $\frac{\text{Margen sobre Presión de Vapor}}{\text{Presión Dinámica}}$ | Hélices marinas, turbinas hidráulicas e impulsores de bombas para predecir la aparición de burbujas de vapor. | 

## 4.4. Teoría de Modelos, Similitud y Leyes de Escala (Slides 30 a 42)

### 1. Los 3 Niveles de Semejanza entre Prototipo ($p$, tamaño real) y Modelo ($m$, ensayo)

1. **Semejanza Geométrica (Factor de escala lineal** $\lambda = \frac{L_p}{L_m}$**):**
   

   $$
   \frac{L_p}{L_m} = \lambda \quad ; \quad \frac{A_p}{A_m} = \lambda^2 \quad ; \quad \frac{V_p}{V_m} = \lambda^3 \quad ; \quad \text{Rugosidad: } \frac{k_p}{k_m} = \lambda
   $$

2. **Semejanza Cinemática (Factor de tiempo** $\tau = \frac{t_p}{t_m}$**):** Las líneas de corriente son geométricamente idénticas.
   

   $$
   \text{Velocidades: } \frac{c_p}{c_m} = \frac{\lambda}{\tau} \quad ; \quad \text{Aceleraciones: } \frac{a_p}{a_m} = \frac{\lambda}{\tau^2}
   $$

3. **Semejanza Dinámica (Factor de fuerzas** $\kappa = \frac{F_p}{F_m}$**):** Exige que los números adimensionales dominantes del modelo y del prototipo sean iguales ($Re_p = Re_m$, $Fr_p = Fr_m$, $Ma_p = Ma_m$).

### 2. Leyes de Escala Directas para Certámenes (Slides 36 a 40)

* **Si domina la Gravedad (Semejanza de Froude:** $Fr_p = Fr_m$ **con** $g_p = g_m$ **y mismo fluido** $\gamma_p = \gamma_m$**):**
  

  $$
  \frac{u_p}{u_m} = \lambda^{1/2} \quad ; \quad \frac{Q_p}{Q_m} = \lambda^{5/2} \quad ; \quad \frac{F_p}{F_m} = \lambda^3 \quad ; \quad \frac{P_p}{P_m} = \lambda^{7/2}
  $$

  
  *(Ejemplo Slide 36-38: Para escala* $\lambda = 25 \Rightarrow u_p/u_m = 5$ *;* $Q_p/Q_m = 3125$ *;* $F_p/F_m = 15625$ *;* $P_p/P_m = 78125$*).*

* **Si domina la Viscosidad (Semejanza de Reynolds:** $Re_p = Re_m$**):**
  

  $$
  \frac{u_p}{u_m} = \left(\frac{\nu_p}{\nu_m}\right) \frac{1}{\lambda} \quad ; \quad \frac{\dot{m}_p}{\dot{m}_m} = \left(\frac{\mu_p}{\mu_m}\right) \lambda
  $$

  * **¡Imposibilidad de cumplir Froude y Reynolds a la vez con el mismo fluido! (Slide 39):** Si $\lambda = 25$ y usas agua en ambos ($\nu_p = \nu_m$), Froude exige ensayar con una velocidad 5 veces menor ($u_m = u_p/5$), mientras que Reynolds exige ensayar con una velocidad 25 veces mayor ($u_m = 25 u_p$). Solo se logra si cambias de fluido en el modelo o eliges el número dominante.

### 3. Ejercicios Oficiales Resueltos de la Sesión 07 (Slides 41 y 42)

1. **Ejercicio Tubería Aire/Agua (Slide 41):** Prototipo conduce aire a $1\text{ bar}, 20^\circ\text{C}$ ($\rho_p \approx 1.20\text{ kg/m}^3, \nu_p \approx 1.5\times 10^{-5}\text{ m}^2/\text{s}$) a $c_p = 10\text{ m/s}$ en $D_p = 25\text{ cm}$. Se modela con agua ($\rho_m = 998\text{ kg/m}^3, \nu_m = 1.0\times 10^{-6}\text{ m}^2/\text{s}$) en $D_m = 6\text{ cm}$ (donde se mide $\Delta p_m = 200\text{ kPa}$).

   * Igualando Reynolds ($Re_m = Re_p$): $c_m = c_p \left(\frac{\nu_m}{\nu_p}\right)\left(\frac{D_p}{D_m}\right) = 10 \left(\frac{1.0\times 10^{-6}}{1.5\times 10^{-5}}\right)\left(\frac{25}{6}\right) = 2.78\text{ m/s}$.

   * Igualando Número de Euler ($Eu_p = Eu_m \implies \frac{\Delta p_p}{\rho_p c_p^2} = \frac{\Delta p_m}{\rho_m c_m^2}$):
     

     $$
     \Delta p_p = \Delta p_m \left(\frac{\rho_p}{\rho_m}\right)\left(\frac{c_p}{c_m}\right)^2 = 200\text{ kPa} \left(\frac{1.20}{998}\right)\left(\frac{10}{2.78}\right)^2 = 3.11\text{ kPa}
     $$

2. **Ejercicio 23.2: Leyes de Afinidad en Bomba de Flujo Axial (Slide 42):**
   Variables: $P, \rho, n, D, H_D, Q$. Los 3 números adimensionales de turbomáquinas son:
   

   $$
   \Pi_Q = \frac{Q}{n D^3} \quad (\text{Coef. Caudal}) \quad ; \quad \Pi_H = \frac{g H_D}{n^2 D^2} \quad (\text{Coef. Carga}) \quad ; \quad \Pi_P = \frac{P}{\rho n^3 D^5} \quad (\text{Coef. Potencia})
   $$

   
   Datos del modelo a escala $1:3$ ($\lambda = D_p/D_m = 3 \Rightarrow D_p = 2.4\text{ m}$): $n_m = 900\text{ rpm}$, $D_m = 0.8\text{ m}$, $H_m = 2\text{ m}$, $Q_m = 0.005\text{ m}^3/\text{s}$, $P_m = 5\text{ kW}$.

   * **Parte 1) Si el prototipo (**$D_p = 3 D_m$**) gira a** $n_p = 300\text{ rpm}$ **(**$n_p/n_m = 1/3$**):**

     * Potencia: $P_p = P_m \left(\frac{n_p}{n_m}\right)^3 \left(\frac{D_p}{D_m}\right)^5 = 5\text{ kW} \cdot \left(\frac{1}{3}\right)^3 \cdot (3)^5 = 5 \cdot 9 = 45\text{ kW}$.

     * Altura: $H_p = H_m \left(\frac{n_p}{n_m}\right)^2 \left(\frac{D_p}{D_m}\right)^2 = 2\text{ m} \cdot \left(\frac{1}{3}\right)^2 \cdot (3)^2 = 2\text{ m}$.

     * Caudal: $Q_p = Q_m \left(\frac{n_p}{n_m}\right) \left(\frac{D_p}{D_m}\right)^3 = 0.005 \cdot \left(\frac{1}{3}\right) \cdot (3)^3 = 0.045\text{ m}^3/\text{s}$.

# UNIDAD 5: FLUJOS INTERNOS VISCOSOS Y PÉRDIDAS EN REDES DE TUBERÍAS

*(Fuentes: `MecFlu_S08_FlujosInternos.pdf`, `Certamen_3.pdf`, `control 3.docx` y `Desarrollo_Control_3_MEC120-B.docx`)*

## 5.1. Diámetro Hidráulico y Longitud de Entrada (Slides 4 a 6)

* **Diámetro Hidráulico (**$D_H$ **- Slide 5):** Cuando el conducto NO es circular, se reemplaza $D$ por el diámetro hidráulico que produce la misma caída de presión:
  

  $$
  D_H = \frac{4 \cdot \text{Área transversal }(A)}{\text{Perímetro mojado }(P)} = 4 R_h
  $$

  * *Para un ducto rectangular lleno de lados* $L_1$ *y* $L_2$*:* $A = L_1 L_2$, $P = 2(L_1 + L_2) \implies D_H = \frac{2 L_1 L_2}{L_1 + L_2}$.

  * *(La diapositiva 5 incluye además las fórmulas de Área* $A$*, Perímetro mojado* $P$*, Radio hidráulico* $R_h = A/P$ *y Espejo de agua* $T$ *para secciones Rectangular, Trapezoidal, Triangular, Circular parcialmente llena y Parabólica).*

* **Región de Entrada (**$L_e$**) vs. Flujo Completamente Desarrollado (Slide 6):**
  Al entrar a una tubería desde un estanque, el perfil de velocidad es inicialmente plano. A medida que avanza en $x$, la capa límite viscosa crece desde las paredes hasta juntarse en el centro del tubo. Desde ese punto en adelante el perfil de velocidad $u(r)$ ya no cambia con $x$ (**flujo completamente desarrollado**):
  

  $$
  \text{Flujo Laminar } (Re < 2320): \quad \frac{L_e}{D} \approx 0.06 \cdot Re \quad ; \quad \text{Flujo Turbulento } (Re > 2320): \quad \frac{L_e}{D} \approx 0.6 \cdot Re^{0.25}
  $$

## 5.2. Flujo Laminar en Tuberías: Deducción de Hagen-Poiseuille (Slides 7 a 13)

### 1. Deducción Analítica Paso a Paso (Slides 8 a 11)

* **Equilibrio de Fuerzas en un Cilindro Diferencial de Fluido de radio** $r$ **y largo** $dl$ **inclinado (Slide 8):**
  Como el flujo está desarrollado y no acelera ($a = 0$), la sumatoria de fuerzas axiales es cero:
  

  $$
  p(\pi r^2) - (p + dp)(\pi r^2) - \tau (2\pi r \, dl) - \rho g (\pi r^2 \, dl)\sin\theta = 0
  $$

  
  Como $\sin\theta = \frac{dz}{dl}$ y en flujo laminar $\tau = -\mu \frac{du}{dr}$ (negativo porque $u$ disminuye al crecer $r$), simplificando por $\pi r^2 dl$:
  

  $$
  \mu \frac{du}{dr} = \frac{r}{2}\frac{d(p + \gamma z)}{dl}
  $$

* **Integración con la Condición de No Deslizamiento (**$u = 0$ **en la pared** $r = r_0 = D/2$**):**

  1. **Perfil Parabólico de Velocidades (**$u(r)$**):**
     

     $$
     u(r) = \frac{1}{4\mu}\frac{d(p + \gamma z)}{dl}\left(r^2 - r_0^2\right) = u_{\max}\left(1 - \frac{r^2}{r_0^2}\right)
     $$

  2. **Velocidad Máxima en el centro (**$r = 0$**) y Velocidad Media (**$\bar{u}$**):**
     El volumen de un paraboloide de revolución es exactamente la mitad del cilindro circunscrito ($V_p = \frac{1}{2}\text{base}\times\text{altura}$), por lo que en flujo laminar circular **la velocidad media es exactamente la mitad de la velocidad máxima**:
     

     $$
     \bar{u} = \frac{1}{2} u_{\max} = \frac{r_0^2 \Delta p}{8 \mu L} = \frac{D^2 \Delta p}{32 \mu L}
     $$

  3. **Caudal Volumétrico (Ecuación de Hagen-Poiseuille - Slide 10):**
     

     $$
     \dot{V} = Q = \int_0^{r_0} u(r) \, 2\pi r \, dr = \bar{u} \cdot \pi r_0^2 = \frac{\pi r_0^4 \Delta p}{8 \mu L} = \frac{\pi D^4 \Delta p}{128 \mu L}
     $$

  4. **Pérdida de Presión (**$\Delta p$**) y Factor de Fricción Laminar (**$f_L$ **- Slides 11 y 12):**
     Despejando $\Delta p$ en función de la velocidad media $\bar{u}$:
     

     $$
     \Delta p = p_1 - p_2 = \frac{32 \mu L \bar{u}}{D^2} = \underbrace{\left(\frac{64}{\frac{\rho \bar{u} D}{\mu}}\right)}_{f = \frac{64}{Re}} \cdot \frac{L}{D} \cdot \frac{\rho \bar{u}^2}{2} \implies h_v = \frac{\Delta p}{\rho g} = \frac{64}{Re} \cdot \frac{L}{D} \cdot \frac{\bar{u}^2}{2g}
     $$

     * **Conclusión clave de cátedra:** En flujo laminar ($Re < 2300$), el factor de fricción es $f_L = \frac{64}{Re}$ y **NO depende en absoluto de la rugosidad de la tubería**.

* **Ejercicio Resuelto de Cátedra (Slide 13):** Tubería de $D = 50\text{ cm} = 0.5\text{ m}$ y $L = 1000\text{ m}$ conduce aceite térmico ($\nu = 40\times 10^{-6}\text{ m}^2/\text{s}$) con $\Delta p = 6.54\text{ bar}$ (o caudal dado para despejar $\Delta p$ mediante Poiseuille).

* **Ejercicio Resuelto Viscosímetro Capilar (Slide 32):** Tubo capilar con $Q = 880\text{ mm}^3/\text{s} = 8.8\times 10^{-7}\text{ m}^3/\text{s}$, $L = 1\text{ m}$, $D = 0.5\text{ mm} = 5\times 10^{-4}\text{ m}$, $\Delta p = 1\text{ MPa} = 10^6\text{ Pa}$.
  

  $$
  \mu = \frac{\pi D^4 \Delta p}{128 L Q} = \frac{\pi (5\times 10^{-4})^4 (10^6)}{128 (1)(8.8\times 10^{-7})} = 1.745\times 10^{-3}\text{ Pa}\cdot\text{s} = 1.745\text{ cP}
  $$

## 5.3. Flujo Turbulento, Capa Límite y Diagrama de Moody (Slides 14 a 31)

### 1. Física de la Turbulencia y Esfuerzos de Reynolds (Slides 14 a 18)

* Sobre el Reynolds crítico ($Re_c \approx 2300$), el flujo sufre fluctuaciones tridimensionales aperiódicas de alta frecuencia llenas de torbellinos (*eddies*) que intercambian masa, momento y energía entre capas.

* **Descomposición de Reynolds (Slides 16 y 17):** Cada componente instantánea de velocidad se descompone en un valor promedio temporal más una fluctuación turbulenta:
  

  $$
  u = \bar{u} + u' \quad ; \quad v = \bar{v} + v' \quad ; \quad w = \bar{w} + w' \quad \text{con } \bar{u} = \frac{1}{T}\int_0^T u(t)\,dt
  $$

* **Esfuerzo Cortante Total en Flujo Turbulento (Slide 18):**
  

  $$
  \bar{\tau} = \bar{\tau}_{\text{lam}} + \bar{\tau}_{\text{tur}} = \mu \frac{d\bar{u}}{dy} - \rho \overline{u'v'}
  $$

  
  El término adicional $-\rho \overline{u'v'}$ son los **Esfuerzos Turbulentos o de Reynolds**, provocados por el transporte macroscópico de momentum de los remolinos, el cual aplana el perfil de velocidades en el centro del tubo y aumenta drásticamente la caída de presión.

### 2. Estructura Multicapa de la Capa Límite Turbulenta (Slides 19 a 25)

* **Variables de Pared Adimensionales (Slide 23):**

  * Velocidad de fricción (o de corte): $u_\tau = \sqrt{\frac{|\tau_w|}{\rho}}\text{ [m/s]}$.

  * Distancia adimensional a la pared: $y^+ = \frac{y \cdot u_\tau}{\nu}$.

  * Velocidad adimensional: $u^+ = \frac{U}{u_\tau}$.

* **Las 4 Zonas desde la Pared hacia el Centro del Tubo (Slides 22 y 24):**

  1. **Subcapa Viscosa Laminar (**$0 \le y^+ \le 5$**):** Pegada a la pared los remolinos se amortiguan y domina la viscosidad molecular. El perfil es lineal: $u^+ = y^+$.

  2. **Capa de Transición o *Buffer Layer* (**$5 < y^+ < 60$**):** Coexisten esfuerzos viscosos y turbulentos en igual magnitud.

  3. **Zona Completamente Turbulenta o Capa Logarítmica (**$y^+ \ge 60$**):** Dominan los remolinos según la **Ley Logarítmica de la Pared de Von Kármán**:
     

     $$
     u^+ = \frac{1}{\kappa}\ln(y^+) + B \implies \frac{U}{u_\tau} = 2.5 \ln\left(\frac{u_\tau y}{\nu}\right) + 5.45 \quad (\text{con } \kappa = 0.41)
     $$

  4. **Perfil Empírico de Ley de Potencia (Slide 25):**
     

     $$
     \frac{u(y)}{u_{\max}} = \left(\frac{y}{r_0}\right)^{1/n} \quad \text{donde } n = \frac{1}{\sqrt{f}} \approx 6 \text{ a } 10
     $$

     
     *(Para* $Re = 4\times 10^3 \Rightarrow n=6$*; para* $Re = 10^5 \Rightarrow n=7$ *\[Ley de 1/7\]; para* $Re = 10^6 \Rightarrow n=9$*; para* $Re > 2\times 10^6 \Rightarrow n=10$*. A mayor* $Re$*, más plano es el perfil).*

### 3. Ecuación de Darcy-Weisbach, Diagrama de Moody y Todas sus Correlaciones (Slides 27 a 30)

* **Ecuación de Darcy-Weisbach (Válida para laminar y turbulento):**
  

  $$
  h_v = f \cdot \frac{L}{D} \cdot \frac{\bar{u}^2}{2g} \quad [\text{m}] \iff \Delta p_f = f \cdot \frac{L}{D} \cdot \frac{\rho \bar{u}^2}{2} \quad [\text{Pa}]
  $$

* **Cómo interactúa la Rugosidad Absoluta (**$k$ **o** $e$**) con la Subcapa Viscosa (**$\delta_l$**) — Las 3 Zonas Turbulentas (Slide 29):**

  1. **Tuberías Hidráulicamente Lisas** $\left(Re \cdot \frac{k}{d} < 65\right)$**:** El espesor de la subcapa viscosa $\delta_l$ es mucho mayor que las asperezas $k$ de la pared ($k < \delta_l$). La subcapa viscosa "tapa" las rugosidades como una alfombra suave, por lo que $f$ solo depende de $Re$:

     * **Fórmula de Blasius** ($2320 < Re < 10^5$): $f = 0.3164 \cdot Re^{-0.25}$

     * **Fórmula de Nikuradse** ($10^5 < Re < 5\times 10^6$): $f = 0.0032 + 0.221 \cdot Re^{-0.237}$

     * **Fórmula de Prandtl y Von Kármán** ($Re > 10^6$): $\frac{1}{\sqrt{f}} = 2 \log_{10}(Re\sqrt{f}) - 0.8$

     * **Fórmula de Hermann** (hasta $Re \approx 2\times 10^6$): $f = 0.0054 + \frac{0.396}{Re^{0.3}}$

  2. **Zona de Transición Turbulenta** $\left(65 < Re \cdot \frac{k}{d} < 1300\right)$**:** Las puntas de la rugosidad empiezan a romper la subcapa viscosa. El factor $f$ depende tanto de $Re$ como de la rugosidad relativa $k/d$:

     * **Ecuación de Prandtl-Colebrook (Colebrook-White):**
       

       $$
       \frac{1}{\sqrt{f}} = -2 \log_{10}\left[\frac{2.51}{Re\sqrt{f}} + 0.269 \frac{k}{d}\right] \quad \left(\text{donde } 0.269 = \frac{1}{3.71}\right)
       $$

     * **Fórmula explícita de Moody:** $f = 0.0055 \left[1 + \left(20000\frac{k}{d} + \frac{10^6}{Re}\right)^{1/3}\right]$

  3. **Zona Completamente Turbulenta o Hidráulicamente Rugosa** $\left(Re \cdot \frac{k}{d} > 1300\right)$**:** A altos números de Reynolds la subcapa viscosa se adelgaza tanto que todas las asperezas $k$ quedan totalmente expuestas al flujo principal. Las curvas del Diagrama de Moody se vuelven **horizontales**: ¡el factor de fricción $f$ deja de depender del número de Reynolds y depende únicamente de la rugosidad relativa $k/d$!

     * **Fórmula de Nikuradse para pared rugosa:** $\frac{1}{\sqrt{f}} = 2 \log_{10}\left(\frac{d}{k}\right) + 1.14 = -2 \log_{10}\left(0.269 \frac{k}{d}\right)$

* **Tabla Oficial de Rugosidad Absoluta (**$e$ **o** $k$**) de Materiales (Slide 30 y Fig. 5 Certamen 3):**

  * Latón, cobre, plomo, vidrio o plástico comercialmente liso: $e = 0.0015\text{ mm}$

  * Tubos estirados de acero / fundición revestida de cemento: $e = 0.0024\text{ mm}$

  * Acero comercial o hierro forjado (*wrought iron*): $e = 0.046\text{ mm}$ (rango PPT: $0.03 - 0.09\text{ mm}$)

  * Ductos de aluminio: $e = 0.04 - 0.06\text{ mm}$

  * Hierro o acero galvanizado: $e = 0.15\text{ mm}$ (rango PPT: $0.06 - 0.24\text{ mm}$)

  * Hierro fundido (*cast iron*): $e = 0.26\text{ mm}$ (asfaltado: $0.12\text{ mm}$)

  * Madera: $e = 0.18 - 0.9\text{ mm}$

  * Hormigón (*concrete*): $e = 0.3 - 3.0\text{ mm}$

  * Acero roblonado / remachado (*riveted steel*): $e = 0.9 - 9.0\text{ mm}$

## 5.4. Pérdidas Menores (Singulares) en Elementos y Accesorios (Slides 34 a 47 + Certamen 3 y Control 3)

### 1. Expresiones de Pérdida Localizada y Longitud Equivalente (Slides 39 y 46 + Control 3)

* **Pérdida de Carga por unidad de peso (**$h_{lm}$ **en metros de columna de fluido):**
  

  $$
  h_{lm} = K \cdot \frac{\bar{V}^2}{2g} = \zeta \cdot \frac{\bar{u}^2}{2g} \quad [\text{m}]
  $$

* **Pérdida de Energía Mecánica por unidad de masa (**$e_L$ **en Joules por kilogramo):**
  

  $$
  e_L = g \cdot h_{lm} = K \cdot \frac{\bar{V}^2}{2} \quad \left[\frac{\text{J}}{\text{kg}} = \frac{\text{m}^2}{\text{s}^2}\right] \quad ; \quad \Delta p_v = \rho \cdot e_L = K \cdot \frac{\rho \bar{V}^2}{2} \quad [\text{Pa}]
  $$

* **Longitud Equivalente (**$L_{\text{eq}}$ **- Slides 39 y 46):** Es el largo de tubería recta del mismo diámetro que produciría la misma caída de presión que el accesorio:
  

  $$
  f \frac{L_{\text{eq}}}{D} = K \implies L_{\text{eq}} = K \cdot \frac{D}{f} \quad [\text{m}]
  $$

### 2. Deducción Analítica de una Expansión Súbita (Ecuación de Borda-Carnot - Slides 40 y 41)

* **Explicación Física del Profesor (Pregunta 4 del Control 3):** *"Cuando el fluido viaja rápido por un tubo estrecho de área* $A_1$ *(velocidad* $V_1$*) y entra de golpe a un tubo ancho de área* $A_2$ *(velocidad menor* $V_2$*), por inercia el chorro no puede doblar en* $90^\circ$ *para pegarse a las paredes nuevas. El chorro se despega de la esquina viva formando **zonas muertas de separación con vórtices de recirculación** en los rincones. Esos remolinos chocan con el chorro central y transforman parte de la energía cinética en calor irreversible. Por eso, aunque la presión estática sube al ensancharse el tubo (*$p_2 > p_1$*), la línea de energía total cae un escalón* $h_L$*."*

* **Demostración combinando Continuidad, Momentum y Energía (Slide 41):**

  1. Continuidad incompresible: $Q = V_1 A_1 = V_2 A_2 \implies V_2 = V_1 \left(\frac{A_1}{A_2}\right)$.

  2. Conservación de Cantidad de Movimiento en el volumen de control entre 1 y 2 (asumiendo que en los rincones de separación actúa la presión $p_1$ sobre toda el área $A_2$):
     

     $$
     p_1 A_2 + \rho Q V_1 - p_2 A_2 - \rho Q V_2 = 0 \implies \frac{p_2 - p_1}{\rho} = V_2(V_1 - V_2)
     $$

  3. Ecuación de Energía entre 1 y 2:
     

     $$
     \frac{p_1}{\rho} + \frac{V_1^2}{2} = \frac{p_2}{\rho} + \frac{V_2^2}{2} + g h_v \implies g h_v = \frac{V_1^2 - V_2^2}{2} - \frac{p_2 - p_1}{\rho} = \frac{V_1^2 - V_2^2 - 2V_1 V_2 + 2V_2^2}{2} = \frac{(V_1 - V_2)^2}{2}
     $$

  4. Expresado en función de la velocidad mayor de entrada $V_1$:
     

     $$
     h_v = \frac{(V_1 - V_2)^2}{2g} = \underbrace{\left(1 - \frac{A_1}{A_2}\right)^2}_{K_e = \zeta} \cdot \frac{V_1^2}{2g} = \left(1 - \frac{D_1^2}{D_2^2}\right)^2 \frac{V_1^2}{2g}
     $$

### 3. Contracción Súbita, Vena Contracta, Difusores y Codos (Slides 42 a 45 y Certamen 3)

* **Contracción Súbita (Slide 42 y Fig. 7 Certamen 3):** Al pasar de un tubo ancho ($A_1$) a uno angosto ($A_2$), las líneas de corriente convergen y, al doblar por la esquina afilada, el chorro se estrecha formando un cuello mínimo llamado **Vena Contracta** justo después de la entrada, rodeado de una zona anular de turbulencia. La pérdida se evalúa siempre con la **velocidad aguas abajo (**$V_2$**, la del tubo pequeño)**:
  

  $$
  h_{lm} = K_c \frac{V_2^2}{2g} \quad \text{con } K_c \approx 0.42\left(1 - \frac{D_2^2}{D_1^2}\right) \text{ o hasta } 0.50 \text{ cuando } A_2/A_1 \to 0
  $$

* **Difusor Cónico Gradual (Slide 42):** Si ensanchas el tubo gradualmente con un cono de ángulo $\theta$, el coeficiente de pérdida baja a un mínimo óptimo alrededor de $\theta \approx 7^\circ - 10^\circ$ ($K \approx 0.13$). Pero si el ángulo supera $\theta > 40^\circ - 60^\circ$, la capa límite se desprende violentamente y un difusor de $60^\circ$ pierde incluso más energía ($K \approx 1.15$) que una expansión brusca de $180^\circ$.

* **Física de la Pérdida en Codos (Slide 43):** En una curva o codo ocurren 3 fenómenos simultáneos: (1) Fricción con la pared, (2) Separación de la capa límite en la pared interior y exterior, y (3) **Flujo Secundario de Doble Vórtice (Vórtices de Dean)**: por fuerza centrífuga el fluido rápido del centro se va hacia la pared exterior del codo (subiendo la presión afuera y bajándola adentro), lo que genera dos remolinos contrarrotatorios en la sección transversal. Para reducir esta pérdida en ductos rectangulares grandes se instalan **álabes directores (*turning vanes*,** $K = 0.20$**)**.

### 4. Tablas Completas de Coeficientes de Pérdida $K$ (Slide 44-45 y Figs. 6 a 8 Certamen 3)

* **Entradas de Tubería desde un Depósito (Slide 44 y Fig. 6 Certamen 3):**

  * Entrada Reentrante (tubo metido hacia adentro del estanque): $K = 0.5\text{ a }1.0$ (con borde afilado entrante en Slide 44 hasta $\zeta = 3.0$).

  * Entrada de Borde Vivo / Canto Filo (*Square-edged*): $K = 0.5$.

  * Entrada Inclinada ángulo $\delta$: $\zeta \approx 0.5 + 0.3\cos\delta + 0.2\cos^2\delta$.

  * Entrada Redondeada (*Rounded*): según radio de curvatura $r/D = 0.02 \Rightarrow K=0.3$ ; $r/D = 0.06 \Rightarrow K=0.2$ ; $r/D \ge 0.15$ (borde bien acampanado) $\Rightarrow K = 0.04$.

* **Salida de Tubería hacia un Depósito Grande (Descarga Sumergida):** Toda la energía cinética del chorro se disipa en el estanque quieto $\Rightarrow K_{\text{salida}} = 1.0$.

* **Codos, Tés y Válvulas (Figura 8 Certamen 3 y Tabla 7.2 Slide 45):**

  * Codo de $90^\circ$ bridado regular (*Flanged regular*): $K = 0.3$

  * Codo de $90^\circ$ bridado de radio largo (*Flanged long radius*): $K = 0.2$

  * Codo de $90^\circ$ roscado regular (*Threaded regular*): $K = 1.5$ (en $2\text{ in}: 0.95$, en $4\text{ in}: 0.64$)

  * Codo de $90^\circ$ roscado de radio largo (*Threaded long radius*): $K = 0.7$

  * Codo en inglete soldado (*Miter*): sin álabes $K = 1.30$; con álabes directores (*with vanes*) $K = 0.20$

  * Codo de $45^\circ$: roscado regular $K = 0.4$; bridado radio largo $K = 0.2$

  * Te flujo directo en línea (*Straight through*): roscada $K = 0.9$; bridada $K = 0.2$

  * Te flujo en ramificación (*Branching*): roscada $K = 2.0$; bridada $K = 1.0$

  * **Válvula de Globo (*Globe valve*):** abierta $100\% \Rightarrow K = 10$ ($L_e/D = 340$); abierta $50\% \Rightarrow K \approx 17 - 21$; abierta $25\% \Rightarrow K \approx 40 - 60$

  * **Válvula de Ángulo (*Angle valve*):** abierta $K = 5$ ($L_e/D = 150$)

  * **Válvula de Compuerta (*Gate valve*):** abierta $100\% \Rightarrow K = 0.20$ ($L_e/D = 8$); abierta $75\% \Rightarrow K = 1.10$; **abierta** $50\%$ **(medio abierta)** $\Rightarrow K = 3.6$; abierta $25\% \Rightarrow K = 28.8$

  * **Válvula de Bola (*Ball valve*):** abierta $100\% \Rightarrow K = 0.5$ ($L_e/D = 3$); $1/3$ cerrada $\Rightarrow K = 5.5$; $2/3$ cerrada $\Rightarrow K = 200$

  * **Válvula de Retención (*Check valve*):** disco oscilante $K = 2.0$; caudalímetro (*water meter*) $K = 7$; unión (*coupling*) $K = 0.08$.

# UNIDAD 6: SISTEMAS DE BOMBEO, CAVITACIÓN, VENTURI Y TURBOMÁQUINAS

*(Fuentes: `MecFlu_S08_FlujosInternos.pdf` Slides 48-57, `Certamen_3.pdf`, `Ejercicio Perdida de Carga, Turbomaquinas.pdf`, `control 3.docx` e `informe laboratorio venturi.pdf`)*

## 6.1. Los 4 Casos de Cálculo de Tuberías y Ecuación de Energía con Bomba (Slides 49 a 55)

### 1. Ecuación General de la Energía entre dos Puntos 1 y 2 (Slides 49 y 50)

* En términos de **energía por unidad de masa** $[\text{J/kg} = \text{m}^2/\text{s}^2]$ (donde $Y = w_t$ es el trabajo específico entregado por la bomba):
  

  $$
  \frac{p_1}{\rho} + \frac{c_1^2}{2} + g z_1 + Y = \frac{p_2}{\rho} + \frac{c_2^2}{2} + g z_2 + e_v \quad \text{con } e_v = \sum f\frac{L}{D_H}\frac{c^2}{2} + \sum K\frac{c^2}{2}
  $$

* En términos de **alturas o cargas hidráulicas** $[\text{m}]$ (donde $H_B = \frac{Y}{g}$ es la carga de la bomba):
  

  $$
  \frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 + H_B = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + \sum_{\text{tramos}} f_i \frac{L_i}{D_i}\frac{V_i^2}{2g} + \sum_{\text{accesorios}} K_j \frac{V_j^2}{2g}
  $$

* **Potencia Hidráulica y Potencia Eléctrica / al Freno requerida por la Bomba:**
  

  $$
  \dot{W}_{\text{hidráulica}} = \dot{m} \cdot Y = \rho \cdot g \cdot Q \cdot H_B \quad [\text{W}] \quad ; \quad \dot{W}_{\text{bomba (freno)}} = \frac{\rho \cdot g \cdot Q \cdot H_B}{\eta_{\text{bomba}}} \quad [\text{W}]
  $$

### 2. Los 4 Casos Clásicos de Diseño de Tuberías (Slides 51 a 55)

1. **Caso 1 — Hallar** $\Delta p$ **o** $H_B$ **(Conocidos** $D, L, Q$**):** **Cálculo Directo.** Con $Q$ y $D$ calculas $V = \frac{4Q}{\pi D^2} \rightarrow Re \rightarrow$ lees $f$ en Moody/Colebrook $\rightarrow$ despejas directamente $\Delta p$ o la altura de bomba $H_B$.

2. **Caso 2 — Hallar la Longitud máxima** $L$ **(Conocidos** $\Delta p, D, Q$**):** **Cálculo Directo.** Calculas $V \rightarrow Re \rightarrow f \rightarrow$ despejas $L$ de Darcy-Weisbach.

3. **Caso 3 — Hallar el Caudal** $Q$ **(Conocidos** $L, D, \Delta p$**):** **Cálculo Iterativo.** Como no tienes $Q$, no tienes la velocidad $V$ ni el número de Reynolds $Re$, así que no puedes leer $f$ directamente. *Método de solución:* (1) Asumes un $f_0$ inicial en la zona completamente turbulenta de Moody para tu $e/D$; (2) despejas $V_1$ de la ecuación de energía; (3) calculas $Re_1$ y buscas el nuevo $f_1$ en Moody; (4) recalculas $V_2$ e iteras hasta que $f$ converja (usualmente 2 iteraciones bastan).

4. **Caso 4 — Hallar el Diámetro** $D$ **(Conocidos** $\Delta p, L, Q$**):** **Cálculo Iterativo.** Sin $D$ no tienes ni $V$, ni $Re$, ni la rugosidad relativa $e/D$. Asumes un $f_0 \approx 0.02$, despejas $D_1$ de la ecuación de energía (donde $V^2 \propto 1/D^4$, quedando $D^5$), calculas $Re_1$ y $e/D_1$, corriges $f_1$ e iteras hasta converger, eligiendo finalmente el diámetro comercial estandarizado superior.

## 6.2. Curva del Sistema, Curva de la Bomba, Punto de Operación y Cavitación ($NPSH$)

*(Fuentes: `Certamen_3.pdf`, `Ejercicio Perdida de Carga, Turbomaquinas.pdf` y `control 3.docx`)*

### 1. Deducción de la Carga Requerida por el Sistema ($H_{\text{req}}$ - Pregunta 5 Control 3)

Cuando bombeamos desde la superficie libre de un pozo o estanque abierto a la atmósfera (punto 1) hacia una descarga libre a la atmósfera (punto 2):

* $p_1 = p_2 = p_{\text{atm}} \implies$ se anulan mutuamente.

* Como el área del estanque es enorme ($A_1 \gg A_{\text{tubo}}$), la velocidad de descenso del nivel es despreciable ($V_1 \approx 0$).

* Despejando la carga que el sistema le exige a la bomba para mover un caudal $Q$:
  

  $$
  H_{\text{requerida}}(Q) = (z_2 - z_1) + \frac{V_{\text{descarga}}^2}{2g} + \sum h_{L,\text{mayores}} + \sum h_{L,\text{menores}}
  $$

### 2. Comparación entre $H_{\text{bomba}}$ y $H_{\text{requerida}}$ y Punto de Operación (Pregunta 6 Control 3 y Certamen 3)

* **Curvas Polinómicas Reales de la Bomba del Certamen 3 (con** $Q$ **en** $[\text{m}^3/\text{s}]$**):**
  

  $$
  H_B(Q) = -0.5582\times 10^6 Q^2 - 3.8441\times 10^3 Q + 28.011 \quad [\text{m}]
  $$

  $$
  \eta(Q) = -0.0802\times 10^6 Q^2 - 0.3459\times 10^3 Q + 0.0133 \quad [-] \quad (\text{o curva gráfica Fig. 2 con máx } \eta \approx 0.40 \text{ en } 2.2\text{ L/s})
  $$

  $$
  NPSHR(Q) = 0.3\times 10^6 Q^2 + 1.0 \quad [\text{m}]
  $$

* **Análisis Dinámico para un Caudal Evaluado (ej.** $Q = 10^{-3}\text{ m}^3/\text{s} = 1\text{ L/s}$**, donde** $H_B(1\text{ L/s}) = 23.61\text{ m}$**):**

  * **Si** $H_B(Q) > H_{\text{requerida}}(Q)$**:** La bomba entrega *más energía* de la que el sistema consume a ese caudal. Ese exceso de energía acelera el fluido, haciendo que **el caudal real aumente** ($Q_{\text{real}} > Q_{\text{evaluado}}$) hasta que las pérdidas por fricción crezcan y alcancen el equilibrio.

  * **Si** $H_B(Q) < H_{\text{requerida}}(Q)$**:** La bomba entrega *menos energía* de la que exige el sistema (como ocurre en el Problema 1 del Certamen 3 con el tubo de $1.9\text{ cm}$, donde la alta velocidad dispara las pérdidas por encima de los $23.61\text{ m}$). El fluido se frena y **el caudal real disminuye** ($Q_{\text{real}} < Q_{\text{evaluado}}$).

  * **Punto de Operación:** Es la intersección gráfica y algebraica exacta donde $H_B(Q_{\text{op}}) = H_{\text{requerida}}(Q_{\text{op}})$.

### 3. Análisis Completo de Cavitación: $NPSHA$ vs. $NPSHR$ y Altura Máxima de Succión (Preguntas 7 y 8 Control 3)

* **Definición de** $NPSHA$ **(Altura Neta Positiva de Succión Disponible):** Es la energía absoluta del fluido justo en la brida de entrada (succión $i$) de la bomba por encima de la presión de vapor $p_v$:
  

  $$
  NPSHA = \frac{p_i - p_v}{\rho g} + \alpha \frac{\bar{V}_i^2}{2g}
  $$

* **Deducción aplicando Bernoulli modificado entre la superficie del pozo (1) y la entrada de la bomba (**$i$**, ubicada a altura** $z_b$**):**
  

  $$
  \frac{p_{\text{atm}}}{\rho g} + 0 + 0 = \frac{p_i}{\rho g} + \frac{V_i^2}{2g} + z_b + h_{L,\text{succión}} \implies \frac{p_i}{\rho g} + \frac{V_i^2}{2g} = \frac{p_{\text{atm}}}{\rho g} - z_b - h_{L,\text{succión}}
  $$

  
  Restando $\frac{p_v}{\rho g}$ a ambos lados, obtenemos la **Fórmula Maestra de Succión de Cátedra**:
  

  $$
  NPSHA = \frac{p_{\text{atm}} - p_v}{\rho g} - z_b - h_{L,\text{succión}}
  $$

  * **¿Por qué en** $h_{L,\text{succión}}$ **SOLO entran las pérdidas ubicadas antes de la bomba?** Porque el punto de mínima presión de toda la instalación es el ojo de entrada de la bomba; una vez que el agua atraviesa el rodete, la bomba le inyecta alta presión y las pérdidas de descarga no afectan la presión de succión.

  * **Condición de No Cavitación:** $NPSHA > NPSHR$ (usando obligatoriamente presiones absolutas porque $p_v$ está referida al cero absoluto).

  * **Altura Máxima de Instalación de la Bomba (**$z_{b,\max}$ **en condición límite** $NPSHA = NPSHR$**, como en el Ejercicio 21.1 Slide 57):**
    

    $$
    z_{b,\max} = \frac{p_{\text{atm}} - p_v}{\rho g} - h_{L,\text{succión}} - NPSHR
    $$

  * **Las 2 Soluciones de Ingeniería para eliminar la Cavitación:** (1) Bajar la cota $z_b$ de la bomba (o instalarla sumergida/ahogada bajo el nivel del estanque para que $z_b < 0$ sume presión hidrostática), y (2) Aumentar el diámetro $D_s$ de la tubería de succión para reducir drásticamente $h_{L,\text{succión}} \propto 1/D_s^5$.

## 6.3. Turbomáquinas Centrífugas y Ecuación de Euler (Problema 2 del `Certamen_3.pdf`)

### Desarrollo Completo del Problema 2 del Certamen 3 (Página 4)

* **Datos del Problema:** Caudal $Q = 0.01\text{ m}^3/\text{s}$ de agua ($\rho = 1000\text{ kg/m}^3$). Entrada axial uniforme por radio $R_1 = 1.6\text{ cm} = 0.016\text{ m}$ ($D_1 = 3.2\text{ cm}$). Radio exterior del impulsor $R_2 = 5\text{ cm} = 0.05\text{ m}$ ($D_2 = 10\text{ cm}$). A la salida, la componente radial de la velocidad es $V_{r2} = 0.3\text{ m/s}$ y el ángulo del álabe es $\beta_2 = 60^\circ$. Velocidad de giro $\omega = 3450\text{ rpm} = 3450 \times \frac{2\pi}{60} = 361.28\text{ rad/s}$.

* **Item (a) Determinar el ancho** $b_2$ **del impulsor en la salida:**
  Por conservación de masa (continuidad), el caudal $Q$ sale atravesando el área cilíndrica periférica del rodete ($A_2 = 2\pi R_2 b_2$) con velocidad perpendicular (radial) $V_{r2}$:
  

  $$
  Q = 2 \pi R_2 b_2 V_{r2} \implies b_2 = \frac{Q}{2 \pi R_2 V_{r2}} = \frac{0.01}{2\pi (0.05)(0.3)} = 0.1061\text{ m} = 10.61\text{ cm}
  $$

* **Item (b) Vector velocidad relativa a los álabes en la salida (**$\vec{W}_2$**) en coordenadas polares** $(\hat{e}_r, \hat{e}_\theta)$**:**
  La velocidad relativa $\vec{W}_2$ es tangente al álabe de ángulo $\beta_2 = 60^\circ$. Su componente radial es $W_{r2} = V_{r2} = 0.3\text{ m/s}$. Por trigonometría del triángulo de velocidades:
  

  $$
  \tan\beta_2 = \frac{V_{r2}}{W_{\theta 2}} \implies W_{\theta 2} = \frac{V_{r2}}{\tan 60^\circ} = \frac{0.3}{\sqrt{3}} = 0.1732\text{ m/s}
  $$

  $$
  \vec{W}_2 = (0.3\,\hat{e}_r - 0.1732\,\hat{e}_\theta)\text{ m/s} \quad (\text{magnitud } W_2 = \frac{0.3}{\sin 60^\circ} = 0.3464\text{ m/s})
  $$

* **Item (c) Torque en el eje (**$T_{\text{eje}}$**) mediante la Ecuación de Euler para Turbomáquinas:**

  * Velocidad tangencial del rodete en la salida: $U_2 = R_2 \omega = (0.05)(361.28) = 18.064\text{ m/s}$.

  * Componente tangencial absoluta del fluido en la salida: $V_{\theta 2} = U_2 - W_{\theta 2} = 18.064 - 0.1732 = 17.891\text{ m/s}$ (o $U_2 + W_{\theta 2}$ según si los álabes están curvados hacia atrás o hacia adelante como en la Fig. 3 del certamen donde $\vec{V}_2$ adelanta o atrasa a $R_2\omega$).

  * Como el flujo entra de forma puramente axial, no tiene prerrotación tangencial en la entrada ($V_{\theta 1} = 0$).

  * **Ecuación de Euler del Momento Angular:**
    

    $$
    T_{\text{eje}} = \dot{m} \left(R_2 V_{\theta 2} - R_1 V_{\theta 1}\right) = \rho Q R_2 V_{\theta 2} = (1000)(0.01)(0.05)(17.891) = 8.95\text{ N}\cdot\text{m}
    $$

    $$
    \text{Potencia en el eje: } \quad \dot{W}_{\text{eje}} = T_{\text{eje}} \cdot \omega = 8.95 \times 361.28 = 3233\text{ W} = 3.23\text{ kW}
    $$

## 6.4. Laboratorio N°2: Tubo de Venturi y Evaluación Experimental de Bernoulli

*(Fuentes: `Guia de laboratorio - Tubo Venturi (1).pdf`, `Poster - Tubo Venturi.pdf` e `informe laboratorio venturi.pdf`)*

### 1. Geometría Exacta del Tubo Venturi de la USM (`Poster - Tubo Venturi.pdf`)

* **Diámetros:** Entrada $D_1 = 26\text{ mm} = 0.026\text{ m}$ ($A_1 = 5.309\times 10^{-4}\text{ m}^2$); Garganta (toma 4) $D_4 = 16\text{ mm} = 0.016\text{ m}$ ($A_4 = 2.011\times 10^{-4}\text{ m}^2$); Salida (toma 11) $D_{11} = 26\text{ mm} = 0.026\text{ m}$.

* **Longitudes de los tramos:** Cono convergente = $25\text{ mm}$; Garganta cilíndrica = $16\text{ mm}$; Cono difusor divergente = $89\text{ mm}$; Largo total entre toma 1 y 11 = $155\text{ mm}$ ($12 + 143\text{ mm}$).

* **Posiciones longitudinales exactas de los 11 tubos piezométricos desde la toma 1 (**$x_1 = 0\text{ mm}$**):**

  * Toma 1: $0\text{ mm}$ (inicio cono a los $12\text{ mm}$)

  * Toma 2: $19\text{ mm}$ ($12+7$)

  * Toma 3: $30\text{ mm}$ ($12+18$)

  * Toma 4 (Garganta): $45\text{ mm}$ ($12+33$)

  * Toma 5: $60\text{ mm}$ ($12+48$)

  * Toma 6: $75\text{ mm}$ ($12+63$)

  * Toma 7: $90\text{ mm}$ ($12+78$)

  * Toma 8: $105\text{ mm}$ ($12+93$)

  * Toma 9: $120\text{ mm}$ ($12+108$)

  * Toma 10: $135\text{ mm}$ ($12+123$)

  * Toma 11 (Salida): $155\text{ mm}$ ($12+143$)

### 2. Demostración Matemática del Caudal Teórico ($Q_{\text{teórico}}$) y Coeficientes ($C_q, K$)

1. **Bernoulli Ideal Horizontal (**$z_1 = z_4$**) entre entrada (1) y garganta (4):**
   

   $$
   \frac{p_1}{\gamma} + \frac{v_1^2}{2g} = \frac{p_4}{\gamma} + \frac{v_4^2}{2g} \implies h_1 - h_4 = \frac{v_4^2 - v_1^2}{2g}
   $$

2. **Sustituyendo Continuidad (**$v_1 = v_4 \frac{A_4}{A_1}$**):**
   

   $$
   2g(h_1 - h_4) = v_4^2 \left[1 - \left(\frac{A_4}{A_1}\right)^2\right] \implies Q_{\text{teórico}} = A_4 v_4 = A_4 \sqrt{\frac{2g(h_1 - h_4)}{1 - (A_4/A_1)^2}}
   $$

3. **Coeficiente de Caudal o Descarga (**$C_q$**):**
   

   $$
   C_q = \frac{Q_{\text{medido}}}{Q_{\text{teórico}}} \quad (\text{En flujo turbulento desarrollado } C_q \approx 0.95\text{ a }0.99)
   $$

4. **Pérdida de Presión Irreversible entre Entrada (1) y Salida (11) y Coeficiente Global de Pérdida (**$K$**):**
   Como $D_1 = D_{11} \Rightarrow v_1 = v_{11}$. El modelo ideal de Bernoulli predice que la presión en 11 debería recuperarse al $100\%$ ($h_{11} = h_1$). Pero debido al roce y la separación en el cono difusor (tomas 5 a 11), siempre se mide $h_{11} < h_1$:
   

   $$
   \Delta p_{\text{pérdida}} = \rho g (h_1 - h_{11}) \quad ; \quad K = \frac{2 \Delta p_{\text{pérdida}}}{\rho v_1^2} = \frac{h_1 - h_{11}}{v_1^2 / (2g)}
   $$

### 3. Tabla Completa de Datos Experimentales y Resultados del Laboratorio USM

*(Con* $\rho = 1000\text{ kg/m}^3$*,* $\mu = 10^{-3}\text{ Pa}\cdot\text{s}$*,* $g = 9.79\text{ m/s}^2$*)*:

| Caudal $[L/\text{min}]$ | $Q_{\text{medido}}$ $[\text{m}^3/\text{s}]$ | $h_1$ $[\text{mm}]$ | $h_4$ $[\text{mm}]$ | $h_{11}$ $[\text{mm}]$ | $v_1$ $[\text{m/s}]$ | $v_4$ $[\text{m/s}]$ | $h_1 - h_4$ $[\text{m}]$ | $Q_{\text{teórico}}$ $[\text{m}^3/\text{s}]$ | Coef. Caudal $C_q$ $[-]$ | Reynolds Garganta $Re_4$ | Pérdida $h_1 - h_{11}$ $[\text{m}]$ | Coef. Pérdida $K$ $[-]$ | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **7.5** | $0.0001250$ | $266$ | $250$ | $260$ | $0.2354$ | $0.6217$ | $0.016$ | $0.0001216$ | $1.028^*$ | $9947$ | $0.006$ | $2.119$ | 
| **10.0** | $0.0001667$ | $270$ | $240$ | $263$ | $0.3139$ | $0.8289$ | $0.030$ | $0.0001665$ | $1.001$ | $13263$ | $0.007$ | $1.391$ | 
| **12.5** | $0.0002083$ | $275$ | $225$ | $266$ | $0.3924$ | $1.0362$ | $0.050$ | $0.0002149$ | $0.969$ | $16579$ | $0.009$ | $1.144$ | 
| **15.0** | $0.0002500$ | $283$ | $208$ | $265$ | $0.4709$ | $1.2434$ | $0.075$ | $0.0002633$ | $0.950$ | $19894$ | $0.018$ | $1.590$ | 
| **17.5** | $0.0002917$ | $287$ | $193$ | $268$ | $0.5494$ | $1.4506$ | $0.094$ | $0.0002947$ | $0.990$ | $23210$ | $0.019$ | $1.233$ | 
| **20.0** | $0.0003333$ | $293$ | $170$ | $270$ | $0.6278$ | $1.6579$ | $0.123$ | $0.0003371$ | $0.989$ | $26526$ | $0.023$ | $1.142$ | 

* *Perfiles longitudinales completos de las 11 tomas* $[h_1 \text{ a } h_{11}]\text{ en }[\text{mm}]$*:*

  * Para $12.5\text{ L/min}$: $[275, 270, 255, 225, 230, 240, 250, 255, 260, 265, 266]\text{ mm}$.

  * Para $20.0\text{ L/min}$: $[293, 283, 245, 170, 180, 215, 240, 255, 260, 268, 270]\text{ mm}$.

* *Nota pedagógica sobre* $C_q = 1.028$ *en* $7.5\text{ L/min}$*:* Es físicamente imposible que un fluido real pasivo supere el caudal ideal sin roce ($C_q > 1$); esto demuestra a los estudiantes cómo un error de paralaje humano de apenas $1\text{ mm}$ al leer meniscos con baja diferencia de altura ($\Delta h = 16\text{ mm}$) distorsiona fuertemente el cálculo en escalas bajas.