# Especificación Técnica y Pedagógica: Actualización del Módulo "Pérdidas de Carga, Tuberías y Bombeo" (Estilo CFD 3D + Multi-Ejemplos)

## 1. OBJETIVO DE ESTA ACTUALIZACIÓN PARA LA IA CONSTRUCTORA

Actualmente, la pestaña **"Caso 3 · Bombeo y Cavitación"** dentro de la vista **Simuladores** de `FluidoTermo Lab` cuenta únicamente con un esquema 2D plano de líneas azules y un solo caso de estudio.

**Tu misión como IA desarrolladora es realizar una actualización profunda de este módulo cumpliendo 4 objetivos:**

1. **Conservar intacto el Ejemplo 1 actual** (Certamen 3 USM: Pozo con contracción súbita $D_1 = 2.5\text{ cm} \to D_2 = 1.9\text{ cm}$ y análisis de cavitación $NPSH$).
2. **Incorporar un Selector de Casos ("Biblioteca Interactiva de Ejemplos de Pérdida de Carga")** que agregue el **Ejemplo 2 (Sistema Industrial 3D de la Infografía Técnica adjunta)** y el **Ejemplo 3 (Sistema de la Guía de Estudio)**, dejando preparada una arquitectura escalable para añadir futuros ejercicios del libro de Yunus Çengel y Robert Mott.
3. **Mejorar drásticamente la visualización gráfica del simulador (Motor Visual Estilo CFD / Cutaway):** Reemplazar el dibujo plano por un lienzo interactivo inspirado en la imagen adjunta (`Infografía técnica de sistema hidráulico.png`), mostrando tuberías con espesor, bridas (*flanges*), válvulas detalladas ($V_1, V_2, V_3$), bomba con motor acoplado, estanques en corte transversal y un **mapa de colores de velocidad tipo CFD en tiempo real** (Azul = velocidad baja, Cian/Verde = velocidad media, Amarillo/Rojo = velocidad alta y zonas de aceleración en reducciones y accesorios).
4. **Incluir la "Pizarra del Profesor Paso a Paso", el Diccionario de Variables y la Explicación Física del Sistema:** Cada vez que el estudiante mueva un deslizador (*slider*), todos los pasos matemáticos (del Paso 1 al Paso 12) deben recalcularse en vivo explicando qué significa cada número, cómo se convierten las unidades y por qué cambia el comportamiento físico del fluido.

---

## 2. ESTÁNDAR VISUAL OBLIGATORIO (RÉPLICA INTERACTIVA DE LA INFOGRAFÍA CFD)

Para el nuevo **Ejemplo 2** y todos los ejemplos futuros que el usuario agregue desde el libro de Çengel o videos, el lienzo (`HTML5 Canvas` o `SVG` avanzado) debe reproducir fielmente el estilo visual de la imagen `Infografía técnica de sistema hidráulico.png`:

* **Estética de Laboratorio CFD Oscuro:** Fondo técnico cuadriculado en perspectiva oscura (`#0a1120` a `#0f172a`).
* **Mapa Térmico/Cinemático de Velocidades en el Interior del Tubo:**
  * Pinta el flujo interno de cada tramo según su velocidad media local $V_i = \frac{4Q}{\pi D_i^2}$ respecto a la escala ilustrativa inferior:
    * **Baja velocidad ($V < 1.0\text{ m/s}$):** Azul profundo (`#0044ff` a `#0088ff`).
    * **Velocidad media ($1.0 \le V \le 2.5\text{ m/s}$):** Cian a Verde esmeralda (`#00d4ff` a `#00ff66`).
    * **Alta velocidad ($V > 2.5\text{ m/s}$ o gargantas/codos/rodete):** Amarillo a Rojo intenso (`#ffcc00` a `#ff2200`).
  * Añade líneas de corriente luminosas y partículas animadas cuya velocidad de desplazamiento sea proporcional a $V_1$ en el tramo de $125\text{ mm}$ y aceleren visiblemente a $V_2$ al entrar al tramo más angosto de $100\text{ mm}$.
* **Etiquetas Técnicas Flotantes (*Callouts* con borde amarillo/cian como en la infografía):**
  * Muestra directamente sobre el dibujo las cotas dinámicas que cambian cuando el alumno mueve los sliders:
    * `H = ? [Resultado en m]` en la esquina superior izquierda.
    * `D₁ = 125 mm` en la tubería inferior y `D₂ = 100 mm` en la tubería vertical de descarga.
    * `V1 — compuerta 100% abierta`, `V2 — compuerta 100% abierta` y `V3 — válvula check (K = 7)`.
    * Manómetro superior con lectura dinámica: `p = 28.4 lb/plg² (psi) [195.8 kPa]`.
    * Tarjeta lateral dentro o junto al lienzo con **"Parámetros del sistema"**:
      * $\eta_{\text{motor}} = 94\%$
      * $\eta_{\text{bomba}} = 85\%$
      * $\varepsilon = 0.0018\text{ in}\ (0.0457\text{ mm})$
      * $\text{Codos: } K = 5$
  * Incluye en la esquina inferior derecha la barra de leyenda **"Velocidad — escala ilustrativa (Baja | Media | Alta)"**.
  * Incluye un botón **"Ver Infografía 3D Original / Vista Interactiva CFD"** que permita alternar o superponer la imagen realista subida por el usuario con el esquema vectorial animado.

---

## 3. ESPECIFICACIÓN COMPLETA DEL EJEMPLO 2: SISTEMA INDUSTRIAL DE BOMBEO ENTRE 2 ESTANQUES (INFOGRAFÍA TÉCNICA)

### 3.1. Descripción Física del Sistema (Para mostrar al Alumno)

> **¿Cómo funciona esta instalación?**
> Estamos frente a una planta de bombeo industrial que impulsa agua desde un **Estanque Inferior (Izquierda)**, tomando el fluido por una boca sumergida **A**, hacia un **Estanque Superior Elevado (Derecha)** donde además se registra una presión manométrica de operación de $p_2 = 28.4\text{ lb/plg}^2\ (\text{psi})$.
>
> El sistema tiene **dos diámetros distintos conectados en serie**:
> 1. **Línea de Succión / Alimentación ($D_1 = 125\text{ mm}$):** Es más ancha para que el agua viaje más lento ($V_1$ menor), reduciendo las pérdidas de energía antes de entrar a la bomba y protegiéndola contra la cavitación. Cuenta con una bajada de $3\text{ m}$, un tramo horizontal de $10\text{ m}$ y la válvula de compuerta **V1**.
> 2. **Conjunto Bomba Centrífuga + Motor Eléctrico:** La bomba tiene una eficiencia hidráulica $\eta_{\text{bomba}} = 85\%$ y es movida por un motor eléctrico con eficiencia $\eta_{\text{motor}} = 94\%$.
> 3. **Línea de Impulsión / Descarga ($D_2 = 100\text{ mm}$):** A la salida de la bomba la tubería se reduce a $100\text{ mm}$. Como pasa el mismo caudal $Q$ por un área menor, **el agua se ve obligada a acelerar** ($V_2 > V_1$, observa cómo el color CFD pasa a verde/amarillo/rojo). Esta línea sube $22\text{ m}$ pasando por la válvula de compuerta **V2**, dobla horizontalmente, vuelve a subir $12\text{ m}$, recorre $6\text{ m}$ horizontales atravesando la válvula antirretorno (**V3 — válvula check** con $K = 7$) y finalmente baja $5\text{ m}$ para descargar en el estanque superior.

### 3.2. Tabla de Parámetros Modificables (Sliders que debe tener el Ejemplo 2)

Todos los parámetros siguientes deben poder ajustarse mediante deslizadores interactivos, con un botón **"Restaurar Valores de la Infografía"**:

| Parámetro | Símbolo | Valor por Defecto (Infografía / Guía) | Equivalente exacto en SI | Rango del Slider (Mín – Máx) |
| :--- | :---: | :---: | :---: | :---: |
| **Caudal volumétrico** | $Q$ | $15.0\text{ L/s}$ *(o $10.0\text{ L/s}$)* | $0.015\text{ m}^3/\text{s}$ | $1.0\text{ a }50.0\text{ L/s}$ |
| **Diámetro Tramo 1 (Succión)** | $D_1$ | $125\text{ mm}$ | $0.125\text{ m}$ | $50\text{ a }300\text{ mm}$ |
| **Diámetro Tramo 2 (Descarga)** | $D_2$ | $100\text{ mm}$ | $0.100\text{ m}$ | $40\text{ a }250\text{ mm}$ |
| **Cota vertical superior máxima** | $z_{\text{top}}$ | $24.0\text{ m}$ | $24.0\text{ m}$ | $5.0\text{ a }60.0\text{ m}$ |
| **Bajada final al estanque sup.** | $h_{\text{drop}}$ | $5.0\text{ m}$ | $5.0\text{ m}$ | $0.0\text{ a }15.0\text{ m}$ |
| **Desnivel geométrico neto** | $\Delta z = z_2 - z_1$ | $24 - 5 = 19.0\text{ m}$ *(configurable a $24\text{ m}$)* | $19.0\text{ m}$ | $0.0\text{ a }55.0\text{ m}$ |
| ** Tramos en $D_1$ (Bajada + Horiz.)** | $L_1 = 3 + 10$ | $13.0\text{ m}$ | $13.0\text{ m}$ | $2.0\text{ a }100.0\text{ m}$ |
| **Tramos en $D_2$ ($22+L_h+12+6+5$)** | $L_2$ | $45.0\text{ a }55.0\text{ m}$ | $50.0\text{ m}$ | $10.0\text{ a }200.0\text{ m}$ |
| **Presión manométrica en descarga** | $p_2$ | $28.4\text{ lb/plg}^2\text{ (psi)}$ | $195811\text{ Pa}\ (195.81\text{ kPa})$ | $0.0\text{ a }100.0\text{ psi}$ |
| **Rugosidad absoluta del tubo** | $\varepsilon$ | $0.0018\text{ in}$ | $0.04572\text{ mm}\ (4.572\times 10^{-5}\text{ m})$ | $0.0015\text{ a }3.0\text{ mm}$ |
| **Válvula V1 (Compuerta en $D_1$)** | $K_{V1}$ | $100\%$ abierta ($K = 0.20$) | $0.20$ | Selector: $100\% (0.2), 75\% (1.1), 50\% (3.6), 25\% (28.8)$ |
| **Válvula V2 (Compuerta en $D_2$)** | $K_{V2}$ | $100\%$ abierta ($K = 0.20$) | $0.20$ | Selector: $100\% (0.2), 75\% (1.1), 50\% (3.6), 25\% (28.8)$ |
| **Válvula V3 (Check en $D_2$)** | $K_{V3}$ | $K = 7.0$ | $7.0$ | $0.5\text{ a }15.0$ |
| **Coeficiente de Codos** | $K_{\text{codos}}$ | $K = 5.0$ *(modo suma total o unitario)* | $5.0$ | $0.2\text{ a }10.0$ |
| **Entrada en A y Salida al tanque** | $K_{\text{ent}}, K_{\text{sal}}$ | $K_{\text{ent}} = 0.5$ , $K_{\text{sal}} = 1.0$ | $0.5$ y $1.0$ | $0.04\text{ a }1.0$ |
| **Eficiencia de la Bomba** | $\eta_{\text{bomba}}$ | $85\%$ | $0.85$ | $30\%\text{ a }95\%$ |
| **Eficiencia del Motor Eléctrico** | $\eta_{\text{motor}}$ | $94\%$ | $0.94$ | $50\%\text{ a }99\%$ |
| **Temperatura del Agua** | $T$ | $20^\circ\text{C}$ | $\rho = 998.2\text{ kg/m}^3, \nu = 1.004\times 10^{-6}\text{ m}^2/\text{s}$ | $5^\circ\text{C a }80^\circ\text{C}$ |

---

## 4. DESARROLLO MATEMÁTICO PASO A PASO ("PIZARRA DEL PROFESOR") QUE DEBE MOSTRAR EL SIMULADOR

En la parte inferior o lateral del simulador, programa una sección desplegable e interactiva llamada **"Desarrollo Completo del Ejercicio Paso a Paso"** que sustituya en tiempo real los valores de los sliders en las siguientes **10 etapas pedagógicas**:

### Paso 1: Conversión de Unidades al Sistema Internacional (SI)
* **Explicación del Profesor:** *"Antes de meter cualquier número en la calculadora, recuerda la regla de oro de Mecánica de Fluidos: jamás mezcles pulgadas, milímetros, litros y libras por pulgada cuadrada ($\text{psi}$). Pasemos todo a metros ($\text{m}$), segundos ($\text{s}$) y Pascales ($\text{Pa}$)."*
* **Fórmulas de conversión en vivo:**
  $$D_1 = \frac{125\text{ mm}}{1000} = 0.125\text{ m} \quad ; \quad D_2 = \frac{100\text{ mm}}{1000} = 0.100\text{ m}$$
  $$\varepsilon = 0.0018\text{ in} \times 0.0254\frac{\text{m}}{\text{in}} = 4.572 \times 10^{-5}\text{ m} = 0.0457\text{ mm}$$
  $$p_2 = 28.4\text{ lb/plg}^2\text{ (psi)} \times 6894.76\frac{\text{Pa}}{\text{psi}} = 195811\text{ Pa} = 195.81\text{ kPa}$$
  $$Q = \frac{Q\text{ [L/s]}}{1000}\text{ m}^3/\text{s}$$

### Paso 2: Áreas Transversales y Velocidades por Continuidad en Cada Diámetro
* **Explicación del Profesor:** *"Como el sistema cambia de diámetro de $D_1 = 125\text{ mm}$ a $D_2 = 100\text{ mm}$ después de la bomba, ¡está prohibido usar una sola velocidad! El caudal $Q$ es el mismo en toda la línea, pero al achicarse el tubo, el agua tiene que correr más rápido."*
* **Cálculo en Tramo 1 (Succión — $D_1$):**
  $$A_1 = \frac{\pi D_1^2}{4} \quad [\text{m}^2] \implies V_1 = \frac{Q}{A_1} \quad [\text{m/s}] \implies \text{Carga cinética } 1: \frac{V_1^2}{2g} \quad [\text{m}]$$
* **Cálculo en Tramo 2 (Impulsión — $D_2$):**
  $$A_2 = \frac{\pi D_2^2}{4} \quad [\text{m}^2] \implies V_2 = \frac{Q}{A_2} \quad [\text{m/s}] \implies \text{Carga cinética } 2: \frac{V_2^2}{2g} \quad [\text{m}]$$

### Paso 3: Número de Reynolds ($Re$) y Clasificación del Régimen en Ambos Tramos
* **Explicación del Profesor:** *"Calculamos el número de Reynolds en cada diámetro para saber si las fuerzas de inercia superan a las viscosas ($Re > 4000 \Rightarrow \text{Turbulento}$)."*
  $$Re_1 = \frac{V_1 D_1}{\nu} = \frac{\rho V_1 D_1}{\mu} \quad ; \quad Re_2 = \frac{V_2 D_2}{\nu} = \frac{\rho V_2 D_2}{\mu}$$

### Paso 4: Rugosidad Relativa ($\varepsilon/D$) y Factor de Fricción de Darcy ($f_1$ y $f_2$)
* **Explicación del Profesor:** *"Aunque toda la tubería sea del mismo material ($\varepsilon = 0.0018\text{ in}$), como los diámetros $D_1$ y $D_2$ son diferentes, la rugosidad relativa $\varepsilon/D$ cambia en cada tramo y por lo tanto cada tramo tiene su propio factor de fricción $f$."*
  $$\frac{\varepsilon}{D_1} = \frac{4.572\times 10^{-5}}{0.125} = 0.000366 \quad ; \quad \frac{\varepsilon}{D_2} = \frac{4.572\times 10^{-5}}{0.100} = 0.000457$$
* Si $Re < 2300$: $f_i = \frac{64}{Re_i}$.
* Si $Re \ge 2300$ (Colebrook-White / Swamee-Jain):
  $$f_i = \frac{0.25}{\left[\log_{10}\left(\frac{\varepsilon/D_i}{3.7} + \frac{5.74}{Re_i^{0.9}}\right)\right]^2}$$

### Paso 5: Pérdidas Primarias o Distribuidas por Fricción ($h_{f1}$ y $h_{f2}$ — Darcy-Weisbach)
* **Explicación del Profesor:** *"Calculamos la energía que se pierde por el roce continuo contra las paredes a lo largo de los metros rectos de succión ($L_1$) y de descarga ($L_2$)."*
  $$h_{f1} = f_1 \cdot \frac{L_1}{D_1} \cdot \frac{V_1^2}{2g} \quad [\text{m}] \quad ; \quad h_{f2} = f_2 \cdot \frac{L_2}{D_2} \cdot \frac{V_2^2}{2g} \quad [\text{m}]$$
  $$h_{f,\text{total}} = h_{f1} + h_{f2} \quad [\text{m}]$$

### Paso 6: Pérdidas Secundarias o Localizadas por Accesorios ($h_{m1}$ y $h_{m2}$)
* **Explicación del Profesor:** *"¡Mucho cuidado aquí! Cada accesorio multiplica a la carga de velocidad $\frac{V_i^2}{2g}$ de la tubería donde está instalado. No puedes sumar los $K$ del tubo de $125\text{ mm}$ con los $K$ del tubo de $100\text{ mm}$ directamente."*
* **En la línea de $D_1 = 125\text{ mm}$:**
  $$h_{m1} = \left(K_{\text{entrada A}} + K_{V1} + K_{\text{codos},1}\right) \frac{V_1^2}{2g} \quad [\text{m}]$$
* **En la línea de $D_2 = 100\text{ mm}$:**
  $$h_{m2} = \left(K_{V2} + K_{V3\text{ (check)}} + K_{\text{codos},2} + K_{\text{salida}}\right) \frac{V_2^2}{2g} \quad [\text{m}]$$
* **Pérdida de Carga Total Acumulada ($h_L$):**
  $$h_L = h_{f1} + h_{f2} + h_{m1} + h_{m2} \quad [\text{m}]$$

### Paso 7: Planteamiento de la Ecuación General de la Energía (Bernoulli Extendida) y Cálculo de $H$
* **Explicación del Profesor:** *"Planteamos la ecuación de energía entre la superficie libre del estanque inferior (Punto 1) y el punto final en el estanque superior (Punto 2). La bomba debe entregar una carga $H$ capaz de vencer tres cosas: (1) la carga de presión final $p_2/(\rho g)$, (2) el desnivel geométrico de altura $(z_2 - z_1)$ y (3) todas las pérdidas por fricción y accesorios $h_L$."*
  $$\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 + H = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + h_L$$
  Despejando la **Carga Total de la Bomba ($H$)**:
  $$H = \frac{p_2 - p_1}{\rho g} + (z_2 - z_1) + \frac{V_{\text{final}}^2 - V_{\text{inicial}}^2}{2g} + h_L \quad [\text{m}]$$

### Paso 8: Potencia Hidráulica, Potencia al Freno (Eje) y Potencia Eléctrica del Motor
* **Explicación del Profesor:** *"Aquí es donde entran las dos eficiencias de la infografía ($\eta_{\text{bomba}} = 85\%$ y $\eta_{\text{motor}} = 94\%$). Primero calculamos la potencia pura que recibe el agua ($P_{\text{hidráulica}}$). Como la bomba pierde energía por roce interno, dividimos por $\eta_{\text{bomba}}$ para saber qué potencia mecánica pide su eje ($P_{\text{eje}}$). Y como el motor eléctrico también tiene pérdidas al transformar electricidad en giro, dividimos además por $\eta_{\text{motor}}$ para obtener el consumo eléctrico real de la red ($P_{\text{eléctrica}}$)."*
  1. **Potencia Hidráulica entregada al fluido:**
     $$P_{\text{hid}} = \rho \cdot g \cdot Q \cdot H \quad [\text{W}]$$
  2. **Potencia Mecánica en el Eje de la Bomba (Potencia al Freno):**
     $$P_{\text{eje}} = \frac{P_{\text{hid}}}{\eta_{\text{bomba}}} = \frac{\rho \cdot g \cdot Q \cdot H}{0.85} \quad [\text{W}]$$
  3. **Potencia Eléctrica Consumida por el Motor ($\eta_{\text{total}} = \eta_{\text{bomba}} \cdot \eta_{\text{motor}}$):**
     $$P_{\text{eléctrica}} = \frac{P_{\text{eje}}}{\eta_{\text{motor}}} = \frac{\rho \cdot g \cdot Q \cdot H}{\eta_{\text{bomba}} \cdot \eta_{\text{motor}}} = \frac{P_{\text{hid}}}{0.85 \times 0.94} \quad [\text{W}] \quad \left(\text{Mostrar también en } \text{kW} \text{ y } \text{HP} = \frac{\text{W}}{745.7}\right)$$

---

## 5. ESPECIFICACIÓN DEL EJEMPLO 3: SISTEMA DIDÁCTICO DE LA GUÍA DE ESTUDIO (`guia_perdidas_carga_tuberias_video_0qa3vz2TdCc.md`)

Agrega como **Ejemplo 3** en el selector el caso exacto desarrollado en la sección 7 de la guía adjunta para que los estudiantes puedan verificar cada decimal del documento:

* **Valores preconfigurados del Ejemplo 3:**
  * Caudal: $Q = 0.010\text{ m}^3/\text{s}\ (10\text{ L/s})$.
  * Diámetro interior constante: $D = 0.100\text{ m}\ (100\text{ mm}) \implies A = 0.007854\text{ m}^2 \implies V = 1.27324\text{ m/s}$.
  * Longitud total: $L = 50.0\text{ m}$.
  * Rugosidad absoluta: $\varepsilon = 0.045\text{ mm} \implies \varepsilon/D = 0.00045$.
  * Agua a $20^\circ\text{C}$: $\rho = 998.2\text{ kg/m}^3$, $\nu = 1.004\times 10^{-6}\text{ m}^2/\text{s}$, $g = 9.81\text{ m/s}^2 \implies Re = 126817$ (Turbulento).
  * Factor de fricción (Swamee-Jain): $f = 0.01960$.
  * Carga de velocidad: $\frac{V^2}{2g} = 0.08263\text{ m}$.
  * Pérdida primaria: $h_f = 0.80969\text{ m}$.
  * Accesorios: Entrada ($K = 0.5$) + 2 Codos $90^\circ$ ($K = 0.9 \times 2$) + Válvula abierta ($K = 0.2$) + Salida ($K = 1.0$) $\implies \sum K = 3.5 \implies h_m = 0.28919\text{ m}$.
  * **Pérdida total:** $h_L = h_f + h_m = 1.09888\text{ m} \approx 1.099\text{ m}$ ($\Delta p_{\text{equiv}} = 10.76\text{ kPa}$, $P_h = 107.6\text{ W}$).

---

## 6. ARQUITECTURA ESCALABLE PARA AGREGAR FUTUROS EJEMPLOS DEL LIBRO DE ÇENGEL

Estructura el código de este módulo utilizando un arreglo de objetos tipados (`PIPE_SYSTEM_EXAMPLES: PipeSystemCase[]`) y un componente de **"Importador Rápido de Ejemplos de Libros (Çengel / Mott)"**:
* De esta manera, cada vez que el usuario suba en este chat una página escaneada del libro de Termodinámica o Mecánica de Fluidos de Çengel o una nueva infografía 3D, podrás añadir el **Ejemplo 4, Ejemplo 5, Ejemplo 6...** manteniendo exactamente el mismo motor visual CFD con escala de colores de velocidad, etiquetas técnicas amarillas, sliders completos, diccionario de símbolos, alertas de errores típicos y pizarra matemática paso a paso.