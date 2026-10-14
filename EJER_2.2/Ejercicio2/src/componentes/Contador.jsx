/*
  =====================================================================
  GUÍA · COMPONENTE Contador (ESTADO Y EVENTOS)
  =====================================================================

  PROBLEMA QUE RESUELVE EL ESTADO
  Una variable normal (var x = 0) NO sirve para datos que cambian y
  deben verse en pantalla, por dos motivos:
    1. Cada vez que React vuelve a ejecutar la función del componente,
       la variable se crea de nuevo con su valor inicial y se pierde
       lo que valía.
    2. Cambiar una variable normal no avisa a React, así que la
       pantalla no se actualiza.

  El ESTADO (useState) soluciona ambas cosas: React guarda el valor
  FUERA de la función, lo conserva entre renderizados y se entera de
  cada cambio para volver a pintar el componente.

  CÓMO FUNCIONA useState
      var [valor, setValor] = useState(valorInicial);

    - useState devuelve un array con dos elementos:
        [0] el valor actual del estado        -> valor
        [1] una función para cambiarlo        -> setValor
    - Los desestructuramos con corchetes y les damos nombre. La
      convención es  [cosa, setCosa].
    - El argumento de useState es el valor INICIAL. Solo se usa la
      primera vez que se crea el componente; en los siguientes
      renderizados React ignora ese argumento y devuelve el valor
      guardado.

  REGLAS DE ORO
    1. NUNCA modifiques el estado directamente:  valor = valor + 1  ✗
       Hay que usar la función:  setValor(valor + 1)                ✓
       (error del ejercicio 1.2).
    2. Hay que IMPORTAR useState de 'react' (error del ejercicio 1.4).
    3. Los Hooks (funciones que empiezan por "use") se llaman siempre
       en el nivel superior del componente, nunca dentro de un if, un
       bucle o después de un return condicional.
    4. Cada instancia de un componente tiene SU PROPIO estado. Dos
       <Contador /> en la misma pantalla son independientes.

  QUÉ PASA AL LLAMAR A setValor
    1. React guarda el nuevo valor.
    2. Vuelve a ejecutar la función Contador entera (un "re-render").
    3. Esta vez useState devuelve el valor nuevo.
    4. React compara el JSX nuevo con el anterior y actualiza solo lo
       que ha cambiado en la página.
  =====================================================================
*/

import { useState } from 'react';

/*
  PROPS
    etiqueta     -> texto que acompaña al número (por ejemplo "Asistentes").
    valorInicial -> valor con el que empieza y al que vuelve al reiniciar.
                    Por defecto vale 0 (valor por defecto en la firma).
*/
export function Contador({ etiqueta, valorInicial = 0 }) {
  /*
    PASO 1 · CREAR EL ESTADO
    Inicializamos el estado con la prop valorInicial.
    Atención: valorInicial solo se lee en el PRIMER renderizado. Si el
    padre cambiara la prop después, el estado no se enteraría y por eso
    "Reiniciar" usa la prop directamente (ver paso 4).
  */
  var [valor, setValor] = useState(valorInicial);

  /*
    PASO 2 · MANEJADORES DE EVENTOS
    Un manejador (handler) es la función que se ejecuta cuando ocurre
    un evento, por ejemplo un clic. Por convención se nombran con el
    prefijo "manejar" (en inglés "handle") + la acción.

    Se pueden escribir de varias formas y todas valen:

      a) Declaración de función (la usamos en incremento y reinicio):
            function manejarIncremento() { ... }

      b) Función flecha guardada en una variable (la usamos en el
         decremento, para practicar esta sintaxis):
            var manejarDecremento = () => { ... };

      c) Función flecha escrita directamente en el atributo:
            onClick={() => setValor(valor + 1)}
         Es cómoda para cosas muy cortas, pero con lógica más larga
         queda ilegible; por eso aquí usamos nombres.
  */
  function manejarIncremento() {
    setValor(valor + 1);
  }

  /*
    REQUISITO: el contador no puede bajar de 0.
    Aunque el botón estará desactivado en 0 (paso 5), protegemos
    también la lógica con un if. Es buena práctica no depender solo de
    la interfaz para evitar valores inválidos.
  */
  var manejarDecremento = () => {
    if (valor > 0) {
      setValor(valor - 1);
    }
  };

  /*
    REQUISITO: reiniciar vuelve al valorInicial, no necesariamente a 0.
    (Esto responde a la pregunta del ejercicio 5: si cambias el estado
    a 10 desde las DevTools y pulsas Reiniciar, vuelve a valorInicial
    porque las DevTools solo cambian el estado, no la prop.)
  */
  function manejarReinicio() {
    setValor(valorInicial);
  }

  return (
    <div>
      {/* Mostramos la etiqueta (prop) y el valor (estado). */}
      <p>{etiqueta}: {valor}</p>

      {/*
        PASO 3 · ENLAZAR LOS MANEJADORES CON LOS EVENTOS
        En JSX los eventos se escriben en camelCase: onClick, no onclick.
        Se les pasa la FUNCIÓN, no el resultado de llamarla:

            onClick={manejarIncremento}     ✓  (se ejecutará al hacer clic)
            onClick={manejarIncremento()}   ✗  (se ejecuta YA, durante el
                                                renderizado, cambia el
                                                estado, vuelve a renderizar
                                                y entra en un bucle infinito:
                                                "Too many re-renders", error
                                                del ejercicio 1.3)

        Si necesitas pasar un argumento, envuelve la llamada en una flecha:
            onClick={() => miFuncion(5)}
      */}
      <button onClick={manejarIncremento}>+1</button>

      {/*
        PASO 5 · BOTÓN DESACTIVADO
        'disabled' es un atributo booleano. Recibe una expresión que da
        true o false. Mientras valor sea 0, el botón −1 está desactivado
        y el navegador ignora los clics. Cuando el estado cambia, React
        vuelve a renderizar y el atributo se actualiza solo.
      */}
      <button onClick={manejarDecremento} disabled={valor === 0}>−1</button>

      {/* PASO 4 · Reiniciar usa la prop valorInicial (ver manejarReinicio). */}
      <button onClick={manejarReinicio}>Reiniciar</button>
    </div>
  );
}
