# Guía de estudio: Ejemplo 1 — Tubería con pérdidas de carga

**Tema:** Mecánica de fluidos · Flujo interno en tuberías · Ecuación de energía · Pérdidas de carga  
**Video de referencia:** [«Ejemplo 1 Tubería con pérdidas de carga»](https://www.youtube.com/watch?v=0qa3vz2TdCc)  
**Canal:** *Diseño mecánico y mecánica de fluídos*  
**Publicación del video:** 30 de noviembre de 2020  
**Fecha de elaboración de esta guía:** 17 de noviembre de 2026  
**Público:** personas que comienzan a estudiar mecánica de fluidos.

> **Importante: alcance y trazabilidad.** Se pudo comprobar el título, el canal y la publicación del enlace, pero **no fue posible acceder al audio, la transcripción ni a las imágenes del desarrollo del video**. Por ello, **no se han podido verificar el enunciado, los valores, los componentes específicos, los cálculos ni el resultado que utiliza el expositor**. Esta guía ofrece (1) la explicación técnica necesaria para comprender este tipo de ejercicio, (2) un **ejemplo numérico original y explícitamente ilustrativo**, con sus operaciones completas, y (3) una plantilla para reemplazar cada dato una vez que se disponga del video o de capturas de su pizarra. **El ejemplo ilustrativo NO es una transcripción ni una reproducción fiel del ejercicio del video.**

---

## 1. ¿Qué se busca resolver en este tipo de problema?

Cuando un líquido se mueve por una tubería, pierde parte de su energía mecánica debido al rozamiento con las paredes y a las perturbaciones producidas por codos, válvulas, entradas, salidas y cambios de sección. Esta pérdida se denomina **pérdida de carga** y normalmente se expresa en **metros de columna de fluido (m)**, no en kilogramos ni en metros cúbicos.

Según el enunciado concreto, el objetivo puede consistir en calcular la pérdida de carga total, una presión desconocida, el caudal, el diámetro necesario o la altura que debe proporcionar una bomba. **No es posible asegurar cuál de estos resultados solicita el video sin ver su enunciado.**

### Idea física para comenzar

Imagina que un volumen de agua circula desde el punto 1 hasta el punto 2. La tubería ofrece resistencia: parte de la energía mecánica disponible se disipa. Si además el agua debe subir, el sistema requiere energía para ganar altura; si hay una bomba, esta puede aportar energía al fluido. No hay que confundir la **pérdida por fricción** con el **desnivel geométrico**.

Las pérdidas se agrupan en:

- **Pérdidas distribuidas o primarias:** las que ocurren a lo largo de la longitud de cada tubería, por fricción.
- **Pérdidas localizadas o secundarias:** las asociadas a accesorios y cambios de geometría.

En tuberías, la palabra «carga» se refiere a **energía mecánica por unidad de peso del fluido**, expresada en metros.

---

## 2. ¿Qué información se pudo verificar sobre el video?

| Elemento | Estado de verificación | Dato |
|---|---|---|
| Título | Verificado en la ficha pública | «Ejemplo 1 Tubería con pérdidas de carga» |
| Canal | Verificado en la ficha pública | Diseño mecánico y mecánica de fluídos |
| Fecha de publicación | Verificada en la ficha pública | 30/11/2020 |
| Enunciado exacto | No recuperado | **Pendiente** |
| Fluido y temperatura del video | No recuperados | **Pendiente** |
| Caudal y unidades del video | No recuperados | **Pendiente** |
| Diámetros y longitudes del video | No recuperados | **Pendiente** |
| Material, rugosidad y accesorios del video | No recuperados | **Pendiente** |
| Cotas, presiones y bombas del video | No recuperadas | **Pendiente** |
| Ecuaciones efectivamente utilizadas por el expositor | No recuperadas | **Pendiente** |
| Orden, resultados y aproximaciones del expositor | No recuperados | **Pendiente** |
| Croquis real del video | No recuperado | **Pendiente** |

**Consecuencia práctica:** ningún número de las secciones siguientes debe citarse como «dato utilizado por el caballero del video».

---

## 3. Esquema conceptual de un sistema de tuberías

El siguiente esquema representa **un sistema didáctico inventado para explicar las operaciones**. Es una secuencia hidráulica de dos depósitos, conectados por una tubería con accesorios. **No representa necesariamente la instalación del video.**

```mermaid
flowchart LR
    A["Depósito A<br/>Nivel libre z_A"] --> E["Entrada a la tubería<br/>K = 0,5"]
    E --> T["Tubería<br/>L = 50 m<br/>D = 0,100 m<br/>ε = 0,045 mm"]
    T --> C1["Codo de 90°<br/>K = 0,9"]
    C1 --> C2["Segundo codo de 90°<br/>K = 0,9"]
    C2 --> V["Válvula abierta<br/>K = 0,2"]
    V --> S["Salida al depósito<br/>K = 1,0"]
    S --> B["Depósito B<br/>Nivel libre z_B"]
```

**Lectura del dibujo:** el agua fluye desde A hacia B; el caudal `Q` es el mismo en todos los tramos en serie si no hay derivaciones. La tubería ilustrativa mantiene un diámetro interior constante. Se consideran pérdidas por la longitud recta y por los cuatro tipos de singularidad representados.

**Versión de texto plano (para programas que no muestran Mermaid):**

```text
 [Depósito A] -- [Entrada] -- [Tubería L, D, ε] -- [Codo 1] -- [Codo 2]
                                                              |
                                            [Depósito B] <- [Salida] <- [Válvula]

 Dirección hidráulica: desde el depósito A hacia el depósito B.
 AVISO: esquema DIDÁCTICO; NO verificado contra el video.
```

### ¿Qué se debería ver en el croquis real del video?

Identificar el punto inicial y el final, las superficies libres o las tomas de presión, el sentido de flujo, las alturas, cada tramo de longitud y diámetro, todos los codos y válvulas, y la presencia de bombas o turbinas. En caso de varios diámetros, **cada sección requiere su propia velocidad y sus propias pérdidas**.

---

## 4. Símbolos y unidades: diccionario mínimo

| Símbolo | Qué significa | Unidad usual |
|---|---|---|
| `Q` | Caudal volumétrico: volumen que pasa por segundo | m³/s |
| `D` | Diámetro **interior** de la tubería | m |
| `A` | Área de la sección transversal | m² |
| `V` | Velocidad promedio del fluido | m/s |
| `L` | Longitud recorrida en un tramo | m |
| `ε` | Rugosidad absoluta de la superficie interior | m |
| `ε/D` | Rugosidad relativa | Sin unidad |
| `ρ` (rho) | Densidad del fluido | kg/m³ |
| `μ` (mu) | Viscosidad dinámica | Pa·s |
| `ν` (nu) | Viscosidad cinemática: `μ/ρ` | m²/s |
| `g` | Aceleración de gravedad | m/s² |
| `Re` | Número de Reynolds | Sin unidad |
| `f` | Factor de fricción de **Darcy** | Sin unidad |
| `K` | Coeficiente de pérdida de un accesorio | Sin unidad |
| `h_f` | Pérdida distribuida por fricción | m |
| `h_m` | Pérdida localizada por accesorios | m |
| `h_L` | Pérdida de carga total | m |
| `p` | Presión | Pa, kPa, bar |
| `z` | Elevación respecto de una referencia | m |
| `H_b` | Energía que agrega la bomba, expresada como altura | m |

**Conversión rápida:** `1 m³ = 1.000 L`; `1 L/s = 0,001 m³/s`; `1 mm = 0,001 m`; `1 bar = 100.000 Pa`.

---

## 5. Ecuaciones fundamentales y por qué se usan

### 5.1. Continuidad: del caudal a la velocidad

Para un líquido incompresible:

\[
Q=A\,V,\qquad A=\frac{\pi D^2}{4},\qquad V=\frac{Q}{A}=\frac{4Q}{\pi D^2}.
\]

**Explicación:** para un mismo caudal, una tubería más estrecha obliga al agua a desplazarse más rápido. No se puede calcular Reynolds ni Darcy–Weisbach correctamente si se omite este paso.

Si el sistema tiene diferentes diámetros, aplicar `V_i = 4Q/(πD_i²)` a cada uno.

### 5.2. Reynolds: tipo de flujo

\[
Re=\frac{\rho VD}{\mu}=\frac{VD}{\nu}.
\]

Para flujo interno en tubería circular se emplea usualmente esta clasificación orientativa:

- `Re < 2.300`: laminar.
- `2.300 ≤ Re ≤ 4.000`: transición; las correlaciones deben manejarse con precaución.
- `Re > 4.000`: turbulento.

**Explicación:** Reynolds compara los efectos de la inercia con los de la viscosidad. Permite elegir cómo obtener el factor de fricción.

### 5.3. Factor de fricción de Darcy

Para flujo laminar completamente desarrollado en tubería circular:

\[
f=\frac{64}{Re}.
\]

Para flujo turbulento puede obtenerse mediante el diagrama de Moody o la ecuación implícita de Colebrook–White:

\[
\frac{1}{\sqrt f}=-2\log_{10}\!\left(\frac{\varepsilon/D}{3,7}+\frac{2,51}{Re\sqrt f}\right).
\]

Una aproximación explícita útil para flujo turbulento es **Swamee–Jain**:

\[
f\approx\frac{0,25}{\left[\log_{10}\left(\frac{\varepsilon/D}{3,7}+\frac{5,74}{Re^{0,9}}\right)\right]^2}.
\]

> Advertencia: el factor de fricción de **Fanning** no es el mismo; el de Darcy es cuatro veces el de Fanning. Las ecuaciones de esta guía usan `f` de Darcy.

### 5.4. Pérdida distribuida: ecuación de Darcy–Weisbach

\[
h_f=f\frac{L}{D}\frac{V^2}{2g}.
\]

**Explicación paso a paso:** `L/D` expresa cuántos diámetros caben a lo largo del recorrido; `V²/(2g)` es la carga de velocidad en metros; `f` representa el efecto del rozamiento en esas condiciones.

### 5.5. Pérdida localizada: entradas, codos, válvulas, salidas

\[
h_m=\sum_i K_i\frac{V_i^2}{2g}.
\]

Cuando todos los accesorios están en una tubería de un mismo diámetro:

\[
h_m=\left(\sum_i K_i\right)\frac{V^2}{2g}.
\]

**No sumar los `K` a ciegas si hay distintos diámetros:** primero se calcula `K_i·V_i²/(2g)` para cada accesorio, usando la velocidad de referencia que corresponde a ese coeficiente.

Los valores `K` se obtienen de un enunciado, una tabla o la información técnica del accesorio. Dependen de su geometría y condiciones; **no hay un único `K` universal para todos los codos o todas las válvulas**.

### 5.6. Pérdida total

\[
h_L=\sum h_f+\sum h_m.
\]

Esta suma expresa toda la energía mecánica que se disipa entre los puntos analizados, según las pérdidas incluidas en el modelo.

### 5.7. Ecuación de energía (Bernoulli extendida)

\[
\frac{p_1}{\rho g}+\alpha_1\frac{V_1^2}{2g}+z_1+H_b-H_t
=
\frac{p_2}{\rho g}+\alpha_2\frac{V_2^2}{2g}+z_2+h_L.
\]

`α` es el factor de corrección de energía cinética (en muchos ejercicios introductorios de flujo turbulento se aproxima por 1); `H_t` es la carga extraída por una turbina, si existe.

La forma de despejar depende de qué se conoce y qué se busca. En dos depósitos **abiertos a la atmósfera**, con velocidades despreciables en sus superficies libres y **sin bombas ni turbinas**:

\[
z_A-z_B=h_L.
\]

Si ambos depósitos están abiertos y hay una bomba:

\[
H_b=z_B-z_A+h_L.
\]

### 5.8. Pérdida de presión equivalente

La carga perdida puede convertirse a un **equivalente de presión**:

\[
\Delta p_{\mathrm{equiv}}=\rho g h_L.
\]

**Ojo:** en un sistema con desniveles, la diferencia real de presiones entre dos puntos también depende del término `z`, de la velocidad y de las bombas. El equivalente `ρgh_L` no debe confundirse automáticamente con `p₁−p₂`.

---

## 6. Procedimiento general para resolver un ejercicio real

**Paso 1 — Leer qué se pide.** Escribir la variable desconocida con sus unidades: `h_L`, `p₂`, `Q`, `D` o `H_b`.

**Paso 2 — Dibujar y numerar.** Colocar los puntos 1 y 2, la dirección del flujo, los diámetros, los tramos, los accesorios y los niveles. Distinguir entre superficie libre y sección interior.

**Paso 3 — Registrar los datos.** Crear una tabla de `Q`, `D_i`, `L_i`, `ε_i`, propiedades del fluido (`ρ`, `μ` o `ν`), `K_i`, presiones, cotas y bombas. Registrar también **qué valores son supuestos**.

**Paso 4 — Convertir a un sistema coherente.** Normalmente metros, segundos, kilogramos y pascales. Convertir milímetros y litros antes de sustituir.

**Paso 5 — Calcular la velocidad de cada tramo.** Usar continuidad `V_i = 4Q/(πD_i²)`.

**Paso 6 — Determinar Reynolds y rugosidad relativa de cada tramo.** `Re_i = V_i D_i / ν` y `ε_i/D_i`.

**Paso 7 — Obtener el factor `f` correcto.** Elegir la fórmula según el régimen del flujo y las condiciones de uso. Si el problema exige Moody, dejar constancia de la lectura gráfica.

**Paso 8 — Calcular pérdidas distribuidas.** Para cada tramo, `h_f,i = f_i(L_i/D_i)[V_i²/(2g)]`; luego sumar.

**Paso 9 — Calcular pérdidas localizadas.** Para cada accesorio, `h_m,i = K_i V_i²/(2g)`; luego sumar. Evitar contar dos veces una pérdida incluida en una longitud equivalente.

**Paso 10 — Aplicar la ecuación de energía.** Solo ahora sustituir en Bernoulli y despejar la incógnita solicitada.

**Paso 11 — Comprobar físicamente.** Las pérdidas deben ser no negativas; las unidades deben terminar en metros si se calcula carga; y el sentido de los resultados debe tener lógica.

> Si se desconoce `Q`, este orden puede requerir **iteraciones**: la velocidad, Reynolds, el factor `f` y las pérdidas dependen del propio caudal. No siempre se resuelve con una única sustitución directa.

---

## 7. Ejemplo numérico COMPLETO — creado para esta guía (NO pertenece al video)

### 7.1. Enunciado ilustrativo

Entre dos depósitos abiertos circula agua a **20 °C** por una tubería de diámetro interior constante. Se conocen el caudal y los accesorios. Calcular:

1. Velocidad promedio.
2. Número de Reynolds y régimen de flujo.
3. Factor de fricción de Darcy, aproximado con Swamee–Jain.
4. Pérdida distribuida y pérdida localizada.
5. Pérdida total y diferencia de nivel de agua que la produciría **sin bomba**.
6. Presión equivalente a las pérdidas.

**Supuestos del ejemplo:** flujo estacionario, agua incompresible, tubería circular, diámetro constante, accesorios con coeficientes `K` de demostración, sin bomba, depósitos abiertos, velocidades en las superficies despreciables. No se dispone de una tabla de fabricante para los accesorios.

### 7.2. Datos utilizados (únicamente ilustrativos)

| Dato | Símbolo | Valor | Conversión u observación |
|---|---:|---:|---|
| Caudal | `Q` | `0,010 m³/s` | `10 L/s` |
| Diámetro interior | `D` | `0,100 m` | `100 mm` |
| Longitud total | `L` | `50,0 m` | Tubería de diámetro uniforme |
| Rugosidad absoluta asumida | `ε` | `0,045 mm` | `0,000045 m` |
| Temperatura del agua | `T` | `20 °C` | Propiedades aproximadas abajo |
| Densidad del agua | `ρ` | `998,2 kg/m³` | Aproximada a 20 °C |
| Viscosidad cinemática del agua | `ν` | `1,004 × 10⁻⁶ m²/s` | Aproximada a 20 °C |
| Aceleración gravitatoria | `g` | `9,81 m/s²` | Valor aproximado |
| Entrada de tubería | `K_entrada` | `0,5` | Valor didáctico |
| Codo de 90°, N.º 1 | `K_codo1` | `0,9` | Valor didáctico |
| Codo de 90°, N.º 2 | `K_codo2` | `0,9` | Valor didáctico |
| Válvula abierta | `K_válvula` | `0,2` | Valor didáctico |
| Salida hacia un depósito | `K_salida` | `1,0` | Valor didáctico |

**Observación:** las propiedades del agua y las ecuaciones pueden verificarse en las fuentes indicadas al final; los valores de `Q`, `D`, `L`, `ε` y `K` son **elecciones para enseñar el procedimiento**, no datos extraídos del video ni un diseño certificado.

### 7.3. Cálculo 1: área de la tubería

\[
A=\frac{\pi D^2}{4}=\frac{\pi(0,100\ \mathrm{m})^2}{4}
=0,00785398\ \mathrm{m^2}.
\]

**Interpretación:** esa es el área por la que pasa el agua en cada sección de la tubería.

### 7.4. Cálculo 2: velocidad promedio

\[
V=\frac{Q}{A}=\frac{0,010\ \mathrm{m^3/s}}{0,00785398\ \mathrm{m^2}}
=1,27324\ \mathrm{m/s}.
\]

Las unidades cuadradas del denominador se cancelan con parte de los metros cúbicos del numerador: queda `m/s`.

### 7.5. Cálculo 3: número de Reynolds

\[
Re=\frac{VD}{\nu}
=\frac{(1,27324\ \mathrm{m/s})(0,100\ \mathrm{m})}{1,004\times10^{-6}\ \mathrm{m^2/s}}
\approx126.817.
\]

Como `Re > 4.000`, el flujo **es turbulento** según el criterio adoptado.

### 7.6. Cálculo 4: rugosidad relativa

\[
\frac{\varepsilon}{D}=\frac{0,000045\ \mathrm{m}}{0,100\ \mathrm{m}}=0,00045.
\]

Es un número sin unidades, porque representa una longitud dividida por otra longitud.

### 7.7. Cálculo 5: factor de fricción

Usamos Swamee–Jain, ya que el flujo del ejemplo es turbulento:

\[
f\approx\frac{0,25}{\left[\log_{10}\left(\frac{0,00045}{3,7}+\frac{5,74}{(126.817)^{0,9}}\right)\right]^2}
\approx 0,01960.
\]

**Interpretación:** este número no tiene unidades. Es el factor de fricción **de Darcy**, no de Fanning. El último valor está redondeado.

### 7.8. Cálculo 6: carga de velocidad

Este resultado se ocupará dos veces:

\[
\frac{V^2}{2g}=\frac{(1,27324\ \mathrm{m/s})^2}{2(9,81\ \mathrm{m/s^2})}
=0,0826269\ \mathrm{m}.
\]

### 7.9. Cálculo 7: pérdida distribuida

\[
\begin{aligned}
h_f&=f\frac{L}{D}\frac{V^2}{2g}\\
&=(0,0195987)\left(\frac{50,0}{0,100}\right)(0,0826269)\\
&=0,809688\ \mathrm{m}.
\end{aligned}
\]

Por el rozamiento en los **50 metros de tubería**, se disipan aproximadamente **0,810 m de carga**.

### 7.10. Cálculo 8: suma de coeficientes de accesorios

\[
\sum K=0,5+0,9+0,9+0,2+1,0=3,5.
\]

### 7.11. Cálculo 9: pérdida localizada

\[
\begin{aligned}
h_m&=\left(\sum K\right)\frac{V^2}{2g}\\
&=(3,5)(0,0826269)\\
&=0,289194\ \mathrm{m}.
\end{aligned}
\]

En el ejemplo, las entradas, codos, válvula y salida aportan juntos **0,289 m de carga**. Esto no significa que cada accesorio aporte la misma cantidad.

### 7.12. Cálculo 10: pérdida total

\[
\begin{aligned}
h_L&=h_f+h_m\\
&=0,809688+0,289194\\
&=1,098882\ \mathrm{m}\approx\boxed{1,099\ \mathrm{m}}.
\end{aligned}
\]

**Resultado principal del ejemplo inventado:** el sistema considerado disipa aproximadamente **1,099 metros de carga** al transportar `0,010 m³/s`.

### 7.13. Cálculo 11: diferencia de niveles requerida sin bomba

Como los depósitos son abiertos y despreciamos la velocidad del nivel libre, aplicamos:

\[
z_A-z_B=h_L\approx1,099\ \mathrm{m}.
\]

**Interpretación correcta:** para que el caudal asumido se sostenga **sin bomba** en esta configuración, el nivel libre del depósito A tendría que estar aproximadamente `1,099 m` por encima del nivel libre del B. No se está afirmando que ese desnivel aparezca en el video.

### 7.14. Cálculo 12: pérdida de presión equivalente

\[
\begin{aligned}
\Delta p_{\mathrm{equiv}}&=\rho gh_L\\
&=(998,2)(9,81)(1,098882)\\
&=10.760,6\ \mathrm{Pa}\\
&\approx\boxed{10,76\ \mathrm{kPa}}\approx 0,1076\ \mathrm{bar}.
\end{aligned}
\]

**No interpretar esto como la diferencia real de presión entre las superficies libres de dos depósitos abiertos:** ambas están a presión atmosférica. Es el equivalente en presión de la **energía disipada**.

### 7.15. Cálculo complementario: potencia hidráulica equivalente

Si una bomba debiera compensar **únicamente estas pérdidas** y mantener el mismo caudal, la potencia hidráulica transferida al agua sería:

\[
P_h=\rho gQh_L=(998,2)(9,81)(0,010)(1,098882)
\approx107,6\ \mathrm{W}.
\]

Esta es una **potencia hidráulica**, no la potencia eléctrica nominal del motor. Para estimar potencia de eje habría que dividir por la eficiencia de bomba pertinente; además, se debe incorporar cualquier desnivel de elevación y otros requisitos reales. **En el caso dibujado, si la gravedad ya suministra la diferencia de nivel calculada, no se necesita sumar una bomba solo por esas pérdidas.**

### 7.16. Tabla de resultados resumidos del ejemplo ilustrativo

| Variable calculada | Resultado |
|---|---:|
| Área `A` | `0,007854 m²` |
| Velocidad `V` | `1,273 m/s` |
| Reynolds `Re` | `126.817` |
| Régimen | Turbulento |
| Rugosidad relativa `ε/D` | `0,00045` |
| Factor de Darcy `f` | `0,01960` |
| Carga de velocidad `V²/(2g)` | `0,08263 m` |
| Pérdida distribuida `h_f` | `0,80969 m` |
| Suma de coeficientes `ΣK` | `3,5` |
| Pérdida localizada `h_m` | `0,28919 m` |
| **Pérdida total `h_L`** | **`1,09888 m`** |
| Desnivel requerido sin bomba | `1,09888 m` |
| Presión equivalente | `10,76 kPa` |
| Potencia hidráulica equivalente solo por pérdidas | `107,6 W` |

**Control de consistencia:** `0,80969 + 0,28919 = 1,09888 m`, y ninguna pérdida es negativa. El resultado está redondeado; para calcular se conservaron más cifras decimales.

---

## 8. Cómo adaptar la resolución al video cuando se disponga de sus datos

No hay que cambiar los datos del video por los del ejemplo anterior. Seguir esta secuencia:

1. **Copiar el enunciado real** y precisar si la pregunta pide pérdida de carga, presión, caudal, bomba o diámetro.
2. **Dibujar la instalación real**, con el número efectivo de codos, diámetros, longitudes, desniveles y elementos. Si hay más de una rama, no asumir un único caudal.
3. **Extraer todas las magnitudes con sus unidades originales**, anotando el minuto del video donde aparecen.
4. **Registrar qué procedimiento utiliza el expositor**: Darcy–Weisbach, Moody/Colebrook, longitudes equivalentes, coeficientes `K`, Bernoulli, o un método diferente. No afirmar que utiliza uno de ellos sin verlo.
5. **Sustituir los valores verificados** en las ecuaciones que correspondan. Mantener los cálculos intermedios para que otra persona pueda revisarlos.
6. **Contrastar los resultados** con el video y explicar cualquier diferencia de redondeo, de criterio para `f` o de pérdida incluida/excluida.
7. **Separar lo textual del video, lo reconstruido y lo agregado como explicación docente.**

### Si hay varios tramos con diferente diámetro

Usar una tabla como esta, completada con los números **reales** del sistema:

| Tramo | `L_i` (m) | `D_i` (m) | `Q_i` (m³/s) | `V_i` (m/s) | `Re_i` | `ε_i/D_i` | `f_i` | `h_f,i` (m) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | Por verificar | Por verificar | Por verificar | Calcular | Calcular | Calcular | Calcular | Calcular |
| 2 | Por verificar | Por verificar | Por verificar | Calcular | Calcular | Calcular | Calcular | Calcular |
| 3 | Por verificar | Por verificar | Por verificar | Calcular | Calcular | Calcular | Calcular | Calcular |

Registrar los accesorios por separado:

| Accesorio real | Cantidad | Coeficiente `K` / longitud equivalente | Velocidad de referencia | Pérdida calculada |
|---|---:|---:|---:|---:|
| Por identificar | Por verificar | Por verificar | Por verificar | Por calcular |

---

## 9. Ficha de extracción literal del ejercicio del video (pendiente)

**Enunciado exacto:** `[TRANSCRIBIR DESDE EL VIDEO O UNA CAPTURA]`

**¿Qué se pide calcular?:** `[COMPLETAR]`

**Croquis auténtico y marcas de puntos 1, 2, etc.:** `[INSERTAR CAPTURA O RECONSTRUIR AL VER EL VIDEO]`

**Tiempos del video:**

| Minuto y segundo | ¿Qué muestra o explica? | Dato, fórmula o resultado visible | ¿Verificado? |
|---|---|---|---|
| `00:__` | Enunciado | `[POR TRANSCRIBIR]` | No |
| `__:__` | Datos del sistema | `[POR TRANSCRIBIR]` | No |
| `__:__` | Planteamiento de ecuaciones | `[POR TRANSCRIBIR]` | No |
| `__:__` | Sustituciones y cálculos | `[POR TRANSCRIBIR]` | No |
| `__:__` | Resultado final | `[POR TRANSCRIBIR]` | No |

**Valores textuales del video:**

| Variable | Número original | Unidad original | Equivalente SI | Fuente (minuto) |
|---|---:|---|---:|---|
| Caudal | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Diámetro(s) | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Longitud(es) | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Rugosidad/material | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Temperatura/viscosidad/densidad | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Presión(es) | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Elevación(es) | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Coeficientes de accesorios | `[ ]` | `[ ]` | `[ ]` | `[ ]` |
| Otro dato | `[ ]` | `[ ]` | `[ ]` | `[ ]` |

**Desarrollo exacto hecho por el expositor:** `[PENDIENTE DE TRANSCRIPCIÓN Y VERIFICACIÓN]`

**Resultado exacto del expositor y unidades:** `[PENDIENTE DE VERIFICACIÓN]`

**Diferencias entre el procedimiento del expositor y la reconstrucción técnica:** `[NO DETERMINABLE SIN VER EL VIDEO]`

---

## 10. Errores típicos que conviene evitar

- **Usar milímetros como metros.** `D = 100 mm` debe convertirse a `D = 0,100 m` antes de sustituir.
- **Confundir caudal con velocidad.** `Q` tiene unidades de volumen/tiempo; `V`, de longitud/tiempo.
- **Omitir el diámetro al calcular Reynolds.** No basta con conocer la velocidad.
- **Utilizar `f = 64/Re` con flujo turbulento.** Esa fórmula corresponde al régimen laminar en las condiciones especificadas.
- **Confundir `f` de Darcy con `f` de Fanning.** Puede provocar diferencias por un factor 4.
- **Usar un solo valor de velocidad donde los diámetros cambian.** Se deben separar las secciones.
- **Inventar coeficientes `K`.** En un ejercicio formal deben provenir del enunciado o de una referencia justificada.
- **Sumar el desnivel como si fuera pérdida por fricción.** Son términos físicamente distintos en Bernoulli.
- **Contar dos veces un codo.** Si su pérdida ya está incorporada mediante una longitud equivalente, no volver a agregar el mismo `K`.
- **Tomar un equivalente de presión como diferencia real de presión sin analizar cotas y velocidades.** Primero escribir la ecuación de energía completa.
- **Presentar datos ilustrativos como si fueran datos del video.** La exactitud de la fuente es tan importante como hacer bien la operación.

---

## 11. Preguntas rápidas para comprobar la comprensión

**¿Por qué importa el diámetro?** Porque cambia el área y, con un mismo caudal, cambia la velocidad. Eso afecta Reynolds y las pérdidas.

**¿Por qué la pérdida depende de la velocidad al cuadrado?** En las expresiones comunes de pérdidas por fricción y accesorios aparece la carga cinética `V²/(2g)`; además, en el caso de fricción, el factor `f` también puede cambiar con Reynolds.

**¿Por qué se calculan Reynolds y la rugosidad?** Porque son necesarios para determinar el factor de fricción en flujo turbulento.

**¿Por qué se suman accesorios?** Porque cada elemento puede disipar energía adicional que debe incorporarse al balance.

**¿Qué significa obtener `h_L = 1,099 m`?** En el ejemplo ficticio, significa que el fluido pierde una energía mecánica por unidad de peso equivalente a la de una columna de agua de aproximadamente `1,099 m`. **No es** la longitud del tubo ni la altura física de todos los accesorios.

**¿Puede existir pérdida de carga sin una bomba?** Sí. Puede haber flujo por diferencia de nivel o presión entre extremos; la pérdida describe la disipación durante el recorrido.

---

## 12. Fuentes verificables y alcance de cada una

**Fuente primaria solicitada:**

1. [Video «Ejemplo 1 Tubería con pérdidas de carga» (YouTube)](https://www.youtube.com/watch?v=0qa3vz2TdCc) — se verificaron título, canal y fecha de publicación; **no** se recuperó el contenido audiovisual ni la transcripción.

**Fuentes de respaldo para las ecuaciones y los conceptos generales (NO son fuentes del enunciado del video):**

2. [TU Delft OpenCourseWare — *Friction losses in pipelines*](https://ocw.tudelft.nl/wp-content/uploads/Friction_losses_in_pipelines.pdf). Explica Darcy–Weisbach, Colebrook, factor de fricción y pérdida de carga.
3. [Bentley OpenFlows — *Darcy-Weisbach Formula*](https://prd-aws-docs.bentley.com/LiveContent/web/OpenFlows%20FlowMaster-v2025/Help/en/topics/FlowMasterHelp-06-06.html). Ecuación y tratamiento del factor de fricción.
4. [Hydraulic Institute — *Pipe Frictional Losses*](https://datatool.pumps.org/fluid-flow-iii/general). Cálculo de pérdidas y factor de fricción.
5. [Autodesk — *Friction factor equations*](https://help.autodesk.com/cloudhelp/2019/ENU/MoldflowComm-Analyses/files/GUID-0547A86B-B46B-4D30-BB62-B56CB13ED486.htm). Colebrook–White y aproximación Swamee–Jain.
6. [SimuPipe — *Water Properties Table*](https://simupipe.com/resources/water-properties). Propiedades aproximadas del agua a 20 °C.

**Criterio de elaboración:** los números del ejemplo didáctico se calcularon de manera independiente con las ecuaciones aquí escritas y se redondearon para facilitar su lectura. Las fuentes anteriores sirven para fundamentar la **metodología general**, pero **no identifican el sistema del video**.

---

## 13. Aspectos que conviene personalizar o verificar

Para convertir esta guía en la **resolución fiel del video**, falta incorporar una copia del video, su transcripción o capturas legibles del enunciado, el croquis y los cálculos. Con ese material se podrán reemplazar los datos ilustrativos, rehacer el esquema auténtico, transcribir cada sustitución matemática verificable y cotejar el resultado exacto del expositor. Hasta entonces, **no sería responsable declarar que el ejercicio aquí resuelto es el mismo del video**.
