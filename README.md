# Alumno : **SPECTERMAN LUIS OMAR**

# DNI    : **14.620.696**           

# email  : **lspecte@gmail.com**

## TECNO 3F - JAVASCRIPT -  Año 2024    -     Proyecto Final del Curso


***Descripcion del sitio***. Esta es una solución OnePage con la temática de videojuegos , básicamente es un catálogo de juegos con imagen , nombre y categoría del mismo. El catálogo esta en formato de cards.
Cada card tiene un boton de más detalle , cuya finalidad es mostrar detalles específicos del juego seleccionado , imágenes adicionales , requerimientos de máquina , sitio oficial de la empresa creadora entre otros. Dicho boton solo muestra un mensaje informativo , ya que la la programación del mismo excedIa lo solicitado en la presente entrega final.


Se podrán hacer búsquedas dentro del catálogo ya sea por medio de checkboxes en las distintas categorías de juegos existentes o buscando por nombre del juego. Ambas búsquedas son complementarias .

Los  datos son obtenidos desde una api y con javascript se realiza dinámicamente la creación de la pagina en la seccion novedades , catálogo y checkboxes de búsqueda.

La seccion novedades , con cada ingreso o refresco de la página , se volverá a generar seleccionando algunas imágenes al azar desde la api .


### Estructura de archivos

``` tree
    ├── index.html    ( pagína inicial )  
    ├── README.MD
    ├── Assets
          ├── img     ( imagenes del sitio)
          ├── js 
          |    ├─ productos.js  ( funciones varias javascript) 
          |
          ├── styles  
               ├── estilos.css   ( css con los estilos de la página)  
```



### Api utilizada

**Tematica :** Juegos categorias varias.

Idioma   : Ingles

Link Documentación Api :  https://rapidapi.com/digiwalls/api/free-to-play-games-database


### Opciones del menu

``` tree
    ├── Inicio
    ├── Acerca de
    ├── Api 1
    ├── Api 2
    ├── Contacto
```

Cada opción del menú se corresponde con una sección de la página

#### Opcion Inicio
Se posiciona al inicio de la página

#### Acerca de 
Descripcion de la página y breve comentario sobre cada sección de la misma

#### API 1
Sección donde muestran imágenes obtenidas desde la api , seleccionadas al azar , a manera de novedades de juegos. Estas sección esta armada en forma dinámica con funciones javascript , varia con cada carga / refresco de la página.

#### API 2
Sección donde se muestran datos de todos los juegos obtenidos desde la api. Se visualizan en formato de card mostrandose los datos básicos , imágen del juego , nombre y categoria. Tiene un boton de mas detalle , que tal como su nombre indica , se usará para mostrar detalles específícos del juego seleccionado ( imagenes adicionales , requerimientos de maquina y sistema operativo , descripcion ampliada del objetivo del juego) en una página adicional , como el práctico exigia solo una página , la funcionalidad de este boton se centra en solo mostrar un mensaje por 3 segundos.

#### Contacto 
Sencillo formulario de contacto con ingreso de datos básicos , nombre , mail y telefono. 
Se valida que se ingrese algun dato y que el mismo en caso de ser necesario , tenga un determinado formato segun el tipo de campo. La validación se hará al activarse el evento de envio de formulario , con validación en javascript . Hay además un boton borrar cuyo objetivo es si hubo algun error en la carga de datos , poder volver al formulario en blanco para reingresar la informacion.

