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