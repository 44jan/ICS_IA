/*
  =====================================================================
  GUÍA · COMPONENTE TarjetaModulo (PROPS)
  =====================================================================

  QUÉ ES UN COMPONENTE
  Un componente de React es una función de JavaScript que:
    1. Tiene un nombre que empieza por MAYÚSCULA (TarjetaModulo).
       Si empezara por minúscula, React pensaría que es una etiqueta
       HTML normal (<tarjetamodulo>) y no lo trataría como componente.
    2. Devuelve JSX, que es lo que se pinta en pantalla.
    3. Se exporta para poder importarlo desde otros archivos.

  QUÉ SON LAS PROPS
  Las props (properties) son los datos que el componente padre le pasa
  al hijo, igual que los atributos de una etiqueta HTML:

      <TarjetaModulo titulo="Lenguajes de Marcas" horas={4} />

  Reglas importantes:
    - Las props son SOLO DE LECTURA. El hijo nunca las modifica.
    - Un texto fijo va entre comillas: titulo="Hola"
    - Cualquier otra cosa (números, variables, funciones, booleanos)
      va entre llaves: horas={4}
      Si escribes horas="4" estarías pasando el TEXTO "4", no el número.
    - React junta todas las props en un único objeto y se lo pasa a la
      función como primer parámetro:
          { titulo: 'Lenguajes de Marcas', horas: 4 }

  PASO 1 · DESESTRUCTURAR LAS PROPS EN LA FIRMA
  Podríamos escribir function TarjetaModulo(props) y luego usar
  props.titulo, props.horas... pero es más cómodo desestructurar:
  sacar las propiedades del objeto directamente en los parámetros.

      function TarjetaModulo({ titulo, horas, curso, children })

  Es equivalente a:
      var titulo = props.titulo;
      var horas = props.horas;
      ...

  PASO 2 · VALORES POR DEFECTO
  Si el padre NO pasa una prop, su valor es undefined. Para evitarlo se
  escribe un valor por defecto con "=" dentro de la propia
  desestructuración:

      horas = 0       -> si no llega horas, vale 0
      curso = '1º'    -> si no llega curso, vale '1º'

  El valor por defecto SOLO se usa cuando la prop es undefined, es
  decir, cuando no se pasa. Si el padre pasa horas={0}, vale 0 porque
  él lo ha decidido.

  'titulo' no tiene valor por defecto porque es obligatoria. Si el
  padre se olvida de ella, saldrá undefined y no se verá nada en el
  título. (React no obliga; es responsabilidad del programador.)

  PASO 3 · LA PROP ESPECIAL children
  'children' contiene lo que el padre escribe ENTRE la etiqueta de
  apertura y la de cierre:

      <TarjetaModulo titulo="X">
        Este texto es el children.
      </TarjetaModulo>

  Se pinta con {children}. Es opcional: si no hay contenido entre las
  etiquetas, children es undefined y React no pinta nada.
  =====================================================================
*/

export function TarjetaModulo({ titulo, horas = 0, curso = '1º', children }) {
  /*
    PASO 4 · LÓGICA ANTES DEL return
    Todo lo que no es JSX (cálculos, if, variables) se escribe ANTES del
    return, en JavaScript normal. Dentro del JSX solo caben expresiones.

    Aquí elegimos el emoji según el curso. Primero ponemos los valores
    del caso habitual (1º) y solo los cambiamos si el curso es '2º'.
    Así, cualquier valor raro de 'curso' acaba mostrando el de 1º
    en lugar de romper la tarjeta.

    Usamos === (igualdad estricta) y no ==, para comparar también el tipo.
  */
  var emoji = '📘';
  var descripcionEmoji = 'libro azul de primer curso';
  if (curso === '2º') {
    emoji = '📗';
    descripcionEmoji = 'libro verde de segundo curso';
  }

  /*
    PASO 5 · EL return Y EL JSX
    - Un componente solo puede devolver UN elemento raíz. Aquí es
      <article>. Si necesitaras varios sin envoltorio, usarías el
      fragmento <>...</>, como en App.jsx.
    - Las llaves { } dentro del JSX significan "aquí va JavaScript".
    - Los comentarios dentro del JSX van entre llaves y con asteriscos
      (llave, barra, asterisco ... asterisco, barra, llave), como los
      que ves más abajo. Un comentario normal con // se pintaría como
      texto en la página.
  */
  return (
    <article>
      <h2>
        {/*
          EMOJI ACCESIBLE
          Un emoji es solo texto para el lector de pantalla y a veces lo
          lee mal o lo ignora. Con role="img" le decimos que es una
          imagen y con aria-label le damos la descripción que se leerá
          en voz alta. Es el mismo patrón que usa Bienvenida.jsx.
          aria-label recibe una variable, por eso va entre llaves.
        */}
        <span role="img" aria-label={descripcionEmoji}>{emoji}</span> {titulo}
      </h2>

      {/* Mostramos el curso para ver que el valor por defecto funciona. */}
      <p>{curso} curso</p>

      {/*
        RENDERIZADO CONDICIONAL CON &&
        La expresión  condicion && <elemento />  funciona así:
          - Si la condición es true, devuelve el elemento y se pinta.
          - Si es false, devuelve false y React no pinta nada.

        CUIDADO (error del ejercicio 1.6): si escribiéramos
        {horas && <p>...</p>} y horas fuera 0, JavaScript devolvería 0
        y React SÍ pinta el 0 en pantalla. Por eso la condición se
        convierte en un booleano con la comparación horas > 0.
      */}
      {horas > 0 && <p>{horas} horas semanales</p>}

      {/* Aquí se pinta lo que el padre escribió entre las etiquetas. */}
      <p>{children}</p>
    </article>
  );
}
