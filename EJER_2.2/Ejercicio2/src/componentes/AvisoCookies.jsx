/*
  =====================================================================
  GUÍA · COMPONENTE AvisoCookies (EVENTOS PERSONALIZADOS)
  =====================================================================

  EL FLUJO DE DATOS EN REACT
  Los datos viajan SIEMPRE de padre a hijo mediante props. Pero a veces
  el hijo necesita avisar al padre de que algo ha pasado (aquí: "el
  usuario ha aceptado las cookies"). Un hijo no puede modificar el
  estado del padre directamente.

  La solución es el patrón de EVENTOS PERSONALIZADOS:
    1. El padre define una función (manejador) y se la pasa al hijo
       como una prop. Por convención el nombre empieza por "on":
       onAceptar, onRechazar, onCambio, onEnviar...
    2. El hijo LLAMA a esa función cuando ocurre algo.
    3. Al ejecutarse, la función (que vive en el padre) puede cambiar
       el estado del padre.

  Los datos bajan (props) y los avisos suben (llamadas a funciones).

  DOS NIVELES DE EVENTOS EN ESTE COMPONENTE
    - Eventos del navegador: onClick de los botones. Los maneja el
      propio AvisoCookies con manejarAceptar y manejarRechazar.
    - Eventos personalizados: onAceptar y onRechazar. Los inventamos
      nosotros y son props que llegan desde App.
  =====================================================================
*/

import { useState } from 'react';

/*
  PROPS
    children   -> el texto del aviso (lo que va entre las etiquetas).
    onAceptar  -> función opcional que se ejecuta al aceptar.
    onRechazar -> función opcional que se ejecuta al rechazar.

  Fíjate en que onAceptar y onRechazar NO tienen valor por defecto:
  si el padre no las pasa valdrán undefined, y lo tendremos en cuenta
  dentro de los manejadores.
*/
export function AvisoCookies({ children, onAceptar, onRechazar }) {
  /*
    PASO 1 · ESTADO visible
    Controla si el aviso se muestra. Empieza en true.
    Este estado pertenece a AvisoCookies: el padre no necesita saber
    si está visible, solo qué decidió el usuario.
  */
  var [visible, setVisible] = useState(true);

  /*
    PASO 2 · MANEJADORES
    Ambos hacen dos cosas: ocultar el aviso y avisar al padre.

    EVENTOS OPCIONALES
    Si el padre no pasó onAceptar, vale undefined, y escribir
    onAceptar() daría el error "onAceptar is not a function"
    (ejercicio 1.5). Por eso comprobamos que existe antes de llamarla:

        if (onAceptar) {
          onAceptar();
        }

    Una función es "truthy" (cuenta como verdadera) y undefined es
    "falsy", así que el if solo entra cuando el padre sí la pasó.
    Así el componente no falla nunca, tenga o no tenga eventos.
  */
  function manejarAceptar() {
    setVisible(false);
    if (onAceptar) {
      onAceptar();
    }
  }

  function manejarRechazar() {
    setVisible(false);
    if (onRechazar) {
      onRechazar();
    }
  }

  /*
    PASO 3 · NO PINTAR NADA CON null
    Si un componente devuelve null, React no pinta nada para él (no
    queda ni un elemento vacío en el DOM). Así "ocultamos" el aviso.

    IMPORTANTE: este return anticipado va DESPUÉS de useState. Los Hooks
    deben ejecutarse siempre en el mismo orden en cada renderizado; si
    pusiéramos useState después de este if, a veces se llamaría y a
    veces no, y React daría error.
  */
  if (!visible) {
    return null;
  }

  return (
    <aside>
      <p>{children}</p>
      <button onClick={manejarAceptar}>Aceptar</button>
      <button onClick={manejarRechazar}>Rechazar</button>
    </aside>
  );
}
