# advency

Este repositorio es para hacer el reto del advency proporcionado por Goncy

## Día 1

Realizar una lista con 3 regalos
En este caso lo voy a hardcodear con puro html.

## Día 2

Toca agregarle un poco de color al proyecto
Hice un fondo en canva y lo puse en el body
Modifique estilos para que todo se vea bien

## Día 3

Tocó agregarle un form para añadir más regalos
Agregue un scrip js, dentro hice la funcionalidad para añadir regalos
modifique algunos estilos para que se vea decente.

## Día 4

Tocó poder eliminar regalos de la lista.
Cambie código para tener un estado local, y poder manejar los regalos que se eliminan y los que se muestran.
Hice uso de event delegation para escuchar los eventos en los elementos generados dinámicamente y poder borrar.
Por el momento todo ok.

## Día 5

Goncy puso la tarea de agregar un botón para eliminar todos los regalos de una vez.
También voy a agregar un mensaje en el contenedor de los regalos para cuando no haya regalos.

## Día 6

Agregar mensaje cuando no hay regalos
Eso pense en hacerlo ayer pero me daba un bug que aún no se como solucionar, pero ni modo
Para el día 6 si tocó hacerlo pero con otra aproximación diferente a la que tenía ayer.

## Día 7

No permitir agregar regalos vacios ni repetidos.
Para los vacios es re izi voy a poner required al input.
Para los repetidos voy a usar includes, en mi estado y si ya esta no lo agrego y mando un alert
para que sepan que ya esta repetido.

## Día 8

Permitir agregar una cantidad a los regalos, para no tener duplicados pero si cuantos se necesitan.
Simplemente agrege el input y su valor a una nueva propiedad en el estado, y ya renderice.
