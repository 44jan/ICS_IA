import { useState } from 'react';
import { Cabecera } from './componentes/Cabecera';
import { Principal } from './componentes/Principal';
import { Pie } from './componentes/Pie';
import { TarjetaModulo } from './componentes/TarjetaModulo';
import { Contador } from './componentes/Contador';
import { AvisoCookies } from './componentes/AvisoCookies';
import { PreguntaFrecuente } from './componentes/PreguntaFrecuente';

function App() {
  /*
    EJERCICIO 4 (ampliación) · ESTADO DEL PADRE
    'decision' guarda qué eligió el usuario. Vive en App porque es el
    padre quien recibe los avisos del hijo AvisoCookies.
    Empieza como cadena vacía: mientras esté vacía, el párrafo de
    abajo no muestra nada.
  */
  var [decision, setDecision] = useState('');

  /*
    MANEJADORES DE LOS EVENTOS PERSONALIZADOS
    Son las funciones que se pasan al hijo en onAceptar y onRechazar.
    Las ejecuta AvisoCookies cuando el usuario pulsa un botón, pero
    VIVEN aquí, así que pueden cambiar el estado de App.
    Hacen dos cosas:
      1. console.log -> escribe en la consola del navegador (F12).
      2. setDecision -> cambia el estado, App se vuelve a renderizar y
         el párrafo muestra el mensaje.
  */
  function manejarAceptar() {
    console.log('Cookies aceptadas');
    setDecision('Has aceptado las cookies');
  }

  function manejarRechazar() {
    console.log('Cookies rechazadas');
    setDecision('Has rechazado las cookies');
  }

  return (
    <>
      <Cabecera />
      <Principal />

      {/*
        EJERCICIO 2 · TarjetaModulo con distintos datos

        Tarjeta 1: todas las props. Fíjate en que 7 va entre llaves
        (es un número) y "2º" entre comillas (es un texto). El texto
        entre las etiquetas llega al componente como 'children'.
      */}
      <TarjetaModulo titulo="Desarrollo Web en Entorno Cliente" horas={7} curso="2º">
        JavaScript, TypeScript y React en el navegador.
      </TarjetaModulo>

      {/* Tarjeta 2: sin 'curso', así que usa el valor por defecto '1º'. */}
      <TarjetaModulo titulo="Lenguajes de Marcas" horas={4}>
        HTML, CSS y XML.
      </TarjetaModulo>

      {/*
        Tarjeta 3: sin 'curso' ni 'horas'. Sale el emoji de 1º y NO
        aparece la línea de horas, porque el valor por defecto es 0 y
        la condición horas > 0 es falsa.
      */}
      <TarjetaModulo titulo="Formación y Orientación Laboral">
        Derechos y deberes en el trabajo.
      </TarjetaModulo>

      {/*
        EJERCICIO 3 · DOS CONTADORES INDEPENDIENTES
        Cada <Contador /> crea su propio estado. Pulsar +1 en uno NO
        afecta al otro. El segundo no recibe valorInicial y usa el 0
        por defecto. El primero empieza en 5, y al pulsar Reiniciar
        vuelve a 5 (no a 0).
      */}
      <Contador etiqueta="Asistentes a la charla" valorInicial={5} />
      <Contador etiqueta="Entradas vendidas" />

      {/* EJERCICIO 5 · componente de práctica para las DevTools. */}
      <PreguntaFrecuente pregunta="¿Qué es JSX?">
        Una sintaxis parecida a HTML dentro de JavaScript.
      </PreguntaFrecuente>

      {/*
        EJERCICIO 4 · AvisoCookies
        Le pasamos nuestras funciones en las props onAceptar y
        onRechazar. Se pasan SIN paréntesis: las ejecutará el hijo
        cuando toque. Si quitaras estas dos props, el aviso seguiría
        funcionando (se oculta) pero no avisaría a nadie.
      */}
      <AvisoCookies onAceptar={manejarAceptar} onRechazar={manejarRechazar}>
        Usamos cookies para mejorar tu experiencia.
      </AvisoCookies>

      {/*
        Muestra la decisión. Al inicio decision vale '' y el párrafo
        queda vacío; tras pulsar un botón aparece el mensaje.
      */}
      <p>{decision}</p>

      <Pie />
    </>
  );
}

export default App;