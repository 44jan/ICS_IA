# EJER_02.2

## Ejercicio 1 · Detectar errores

### 1.1

**Error:** el componente se usa con la prop `nombreAlumno`, pero `Saludo` recibe `nombre`. Los nombres de las props no coinciden.

**Síntoma:** muestra "¡Hola, !" porque `nombre` es `undefined`.

**Corrección:**

```jsx
// Saludo.jsx
export function Saludo({ nombreAlumno }) {
  return <p>¡Hola, {nombreAlumno}!</p>;
}
```

(o en App.jsx: `<Saludo nombre="Lucía" />`)

### 1.2

**Error:** se modifica la variable `encendido` directamente en vez de usar `setEncendido`. Además `encendido` es una constante, así que no se puede reasignar.

**Síntoma:** al pulsar el botón da error (`Assignment to constant variable`) o, en cualquier caso, el estado no cambia y el texto del botón no se actualiza.

**Corrección:**

```jsx
<button onClick={() => setEncendido(!encendido)}>
  {encendido ? 'Apagar' : 'Encender'}
</button>
```

### 1.3

**Error:** se pasa a `onClick` el resultado de llamar a `setValor(valor + 1)` en vez de una función. Se ejecuta durante el render.

**Síntoma:** bucle infinito de renderizados y el error `Too many re-renders`.

**Corrección:**

```jsx
<button onClick={() => setValor(valor + 1)}>Pulsado {valor} veces</button>
```

### 1.4

**Error:** falta importar `useState` de React.

**Síntoma:** el navegador muestra `useState is not defined`.

**Corrección:**

```jsx
import { useState } from 'react';

export function Contador() {
  const [valor, setValor] = useState(0);
  return <button onClick={() => setValor(valor + 1)}>{valor}</button>;
}
```

### 1.5

**Error:** `BotonEnviar` se usa sin pasar la prop `onEnviar`, y dentro se llama a `onEnviar()` sin comprobar que existe.

**Síntoma:** al hacer clic da el error `onEnviar is not a function` (es `undefined`).

**Corrección:** pasar la función desde App.jsx:

```jsx
<BotonEnviar onEnviar={() => console.log('Enviado')} />
```

### 1.6

**Error:** se usa `mensajesNuevos && ...` con un número. Cuando vale `0`, la expresión devuelve `0` y React lo pinta.

**Síntoma:** cuando no hay mensajes aparece un `0` en pantalla en vez de no mostrar nada.

**Corrección:**

```jsx
{mensajesNuevos > 0 && <p>Tienes {mensajesNuevos} mensajes nuevos</p>}
```

## Ejercicio 5 · React Developer Tools

### 1. Componente `Contador`

**Cambiar la prop `etiqueta` desde el panel:** sí, la página se actualiza al momento. React vuelve a renderizar el componente con la nueva prop.

**Cambiar el estado a `10` y pulsar Reiniciar:** el contador vuelve a `valorInicial`, no se queda en 10. `manejarReinicio` hace `setValor(valorInicial)`, y la prop `valorInicial` no se ha modificado. Al editar el estado desde el panel solo cambias el valor actual, no la prop.

**Analizar nombres de Hooks (varita):** junto a `State` aparece el nombre de la variable, `Valor`, tomado de `var [valor, setValor] = useState(...)`.

### 2. Componente `PreguntaFrecuente`

Al alternar el estado `abierta` desde el panel, la respuesta se muestra u oculta en la página, igual que al pulsar el botón.

### 3. Profiler (+1 tres veces en un contador)

**Componentes que se volvieron a renderizar:** solo el `Contador` en el que pulsé. `App` y los demás componentes no.

**¿Se renderizó el otro contador?:** no. Cada `Contador` tiene su propio estado. Al cambiar el estado de uno, React renderiza ese componente y sus hijos. El otro no cambia, ni su estado ni sus props, y su padre `App` tampoco se vuelve a renderizar.

**Motivo que indica el Profiler:** «Hooks changed», es decir, cambió un Hook (el estado `valor` del `useState`).
