# Buddy Backend Project - Developed by [SoymichelDev](https://www.linkedin.com/in/soymichelt)


Este proyecto de GitHub contiene el Backend de un proyecto de una aplicación de gestión de tareas, el cúal he nombrado como **Buddy***. Esta es una herramienta sencilla, eficiente y fácil de usar diseñada para ayudar a usuarios a organizar su flujo de trabajo de manera efectiva. Los usuarios pueden registrarse e iniciar sesión para acceder a su panel personal, donde pueden crear, editar y eliminar tareas según sus necesidades.

Cada tarea cuenta con una descripción y puede ser asignada a diferentes estados, como "Por Hacer", "En Proceso", "Testeando", "Congelada" y "Completada", facilitando el seguimiento del progreso de cada una. La interfaz es intuitiva, lo que permite a los usuarios gestionar sus tareas de manera rápida y sin complicaciones, optimizando su tiempo y productividad.

## Domain Driven Design

Domain Driven Design (DDD) es un enfoque de desarrollo de software que se centra en modelar soluciones alineadas con las reglas, procesos y comportamientos del dominio de negocio que el software busca resolver. Esta técnica se basa en principios como la creación de domain entities, value objects, agregados, repositorios, servicios de dominio, eventos, etc, todos enfocados en estructurar el sistema para que sea comprensible y adaptable a medida que el negocio evoluciona. Es especialmente útil en sistemas complejos, ya que ayuda a gestionar la complejidad y a mantener el software alineado con el dominio.

Es importante señalar que, para el desarrollo de este proyecto, se asumió que **Buddy** evolucionaría hasta convertirse en un sistema complejo, con múltiples módulos y la necesidad de gestionar diferentes bounded contexts, posiblemente a través de microservicios. Con este escenario en mente, muchas de las decisiones de diseño (tanto en patrones como en arquitecturas de software) fueron tomadas según la perspectiva subjetiva del desarrollador. Es posible que, en un equipo de desarrollo más amplio o en un contexto diferente, estas decisiones se hubieran abordado de otra manera.

1. **Arquitectura Hexagonal**

Para estructurar el código y los módulos de este proyecto se ha implementado la arquitectura hexagonal. La decisión se tomó debido a que esta es una arquitectura limpia y además, cumple con una de las reglas principales del DDD, la de estructurar tu proyecto en capas cuyos elementos de capas internas no conozcan a los elementos de capaz externas. Para poder respetar esta regla se deben implementar los principios SOLID y algunos patrones como la inyección de dependencias.

La organización de archivos y directorios de la arquitectura hexagonal cuenta de 3 tipos de elementos o capas:

* **Capa de dominio:** Esta capa contiene los elementos del dominio, entre los cuales se encuentra: las entidades de dominio, agregados, excepciones de dominio, repositorios, servicios de dominio, eventos de dominio y value objects. Estos elementos se encargan de encapsular la lógica en una capa de dominio que estará aislada en la parte más profunda de nuestra arquitectura lejos de cualquier implementación de herramientas de infraestructura, lo que nos permite crear reglas y añadir test a dichas reglas con mayor facilidad. Otro aspecto que obtenemos en esta capa es que podemos dotar de semántica a nuestro proyecto lo que facilita la mantenibilidad y legibilidad del código.

* **Capa de aplicación:** Esta capa se podría describir como un envoltorio de la capa de dominio, esta se encarga de tomar los elementos de dominio y definir los casos de uso que se pueden realizar en nuestro proyecto. Aquí es en donde estará nuestra lógica de negocio sobre las operaciones que se pueden realizar. Para este proyecto en específico, esta capa contiene 3 elementos: responses, request y casos de uso. Los responses son las definiciones o tipos de las respuestas que van a entregar nuestros casos de uso (por ejemplo, un listado de tareas). Las request's son las definiciones o tipos de las entrada de datos que recibirán nuestros casos de uso. Por último, un caso de uso es una operación que puede realizar nuestro sistema; por ejemplo, la creación o eliminación de una tarea.

* **Capa de infraestructura:** Esta capa es la más externa de nuestra arquitectura, es la implementación de herramientas de infraestructura en nuestra aplicación. Aquí contamos con bases de datos, controladores, apis, servicios de nube, etc. En esta capa es en donde desarrollaremos los módulos con las herramientas que implementaremos. Por ejemplo, aquí tendremos los repositorios implementados con firestore o los controladores de express. Como se puede apreciar fácilmente, estos elementos dotan de funcionamiento a nuestros sitemas; pero, no de lógica de negocio por lo que se debe evitar cualquier regla de negocio en este punto.

Una de las principales razones por las que se decidió implementar esta arquitectura es por la facilidad a la hora de crear testing unitarios y de integración. La razón, es debido a que las primeras dos capas son las que tienen las reglas de negocio y estas están aisladas de las implementaciones de infraestructura, por lo que para añadir testing no necesitamos tener que conectarnos a una base de datos u otros servicios externos que solo van a ralentizar el proceso de ejecución de test's. Esto último es debido a que el proceso de validación del funcionamiento de los procesos del sistema es independiente de que bases de datos, sistemas de almacenamiento u otros servicios externos utilicemos.

Otro aspecto muy importante, es que la organización del proyecto no solo depende de la arquitectura hexagonal sino también, de otras técnicas propuestas en DDD y que ayudan a mejorar la estructura. Al final la arquitectura hexagonal se ha utilizado para organizar los módulos del proyecto, que son dos: users y tasks. Pero, debido a que estos elementos cuentas con componentes y módulos similares, es necesario agrupar dichos componentes y para esto se ha utilizado el patrón shared kernel que consiste en separar aspectos que se pueden reutilizar entre módulos y entre microservicios. Además, nos hemos visto en la necesidad de implementar el patrón de inyección de dependencias para facilitar la construcción y reutilización de componentes en el proyecto.

Al final la estructura ha quedado de la siguiente forma:

![imagen](https://github.com/user-attachments/assets/1dda90df-d3e1-4cf2-af90-f124bc2fdb1e)

Se puede ver en la imagen anterior que en la raíz del proyecto, se encuentran 3 carpetas: `di`, `modules`, `shared`. Esto es algo que añade mucho sentido al proyecto, ya que define un patrón o flujo que se debe seguir para el desarrollo de cada feature o bug.


2. **Inyección de Dependencias**

El principal objetivo de la inyección de dependencias es desacoplar el código, lo que permite que las clases sean más flexibles, fáciles de probar y de mantener. En este proyecto se utiliza hay dos paquetes principales para poder implementar este patrón: **tsyringe** y **reflect-metadata**. Tsyringe es la herramienta que utilizamos para crear el contenedor de inyección de dependencias, mientras que reflect-metadata es para que podamos utilizar los decoradores `injectable` e `inject`.

Tsyringe es un paquete que permite implementar el patrón de inyección de dependencias, pero es requerido utilizar tokens y decoradores. Los tokens se utilizan al momento de registrar una clase y al momento de inyectarla. Cuando la inyectamos utilizando el decorador `inject` debemos especificar la clase a inyectar mediante el token. Los decoradores por su parte son una característica experimental de TypeScript y por ello necesitamos el polyfill `reflect-metadata`. El decorador `injectable` permite marcar una clase para su inyección (de igual forma es necesario registrarla en el contenedor).

En base a la arquitectura y patrones implementados en este proyecto, los elementos que se deben marcar como inyectables son los siguientes: repositorios, servicios de dominio, loggers, event bus, casos de uso y controladores.

3. Repositorios y Servicios de Dominio

Uno de los lineamientos más importantes en los que se basa este proyecto es en la implementación de los principios SOLID. Y uno de los principios más representativos es el principio de inversión de dependencias, cuyo objetivo es que las clases dependan de abstracciones y no de implementaciones, lo cuál tiene una serie de ventajas como las que se listan a continuación:

* El principal objetivo de la inversión de dependencias es desacoplar el código, lo que permite que las clases sean más flexibles, fáciles de probar y de mantener.

* Al no depender de implementaciones específicas, es posible cambiar el comportamiento de las clases con solo cambiar la implementación que se inyecta y esto sin la necesidad de cambiar el código de la clase que ha recibido la abstracción. Esto quiere decir que podemos crear casos de uso, que tengan implementaciones para distintas bases de datos sin que los casos de uso tengan que cambiar ninguna parte de su código.

* Ya que podemos mantener distintas implementaciones, esto es útil para el testing. Podemos fácilmente crear mocks, bases de datos para testing o hacer un fake de cualquier servicio de infraestructura.

Este principio es fundamental en el uso de la arquitectura hexagonal. Este nos permite poder definir los repositorios y los servicios de dominio como interfaces en los que describimos únicamente las operaciones que se pueden realizar con dichos compoentes. Estas interfaces son las abstracciones que inyectaremos en nuestros casos de uso. De esta forma el caso de uso se centrará en el qué debe hacer y no en el cómo. El resultado será nuestra lógica de negocio con bajo acoplamiento. Así podremos testear la lógica de negocio con mucha facilidad. Una vez hecho esto, podremos centrarnos en las decisiones de infraestructura, podremos crear las implementaciones específicas utilizando la herramienta que más convenga para los intereses del proyecto. Es decir, que podremos implementar la base de datos o sistema de almacenamiento que querramos y podremos cambiarla cuando querramos sin necesidad de afectar a la lógica del negocio.

## Buenas prácticas

A parte de la arquitectura de software, los patrones de diseño y los lineamientos de DDD, se han configurado una serie de buenas prácticas en el proyecto, dentro de las que se listan las siguientes:

* El proyecto cuenta con una serie de configuración de ESLint, con diferentes reglas que se deben seguir que ayudarán a mantener un código prolijo.

* También, hay una configuración de prettier para poder aplicar las reglas de manera automática utilizando la extensión de VS Code.

* Se ha configurado jest y se ha añadido testing a los diferentes elementos que contienen lógica de negocio.

* Para facilitar el enrutamiento de la aplicación se ha añadido una aplicación de Express a Firebase Cloud Functions. En dicha aplicación se ha configurado `helmet`, `cors` y `rate limiting` con el objetivo de mejorar la seguridad de las Cloud Functions.

## CI / CD

Se ha configurado un pipeline para CI / CD con GitHub Actions el cual se dispara cuando se añaden cambios a la rama `main`. Este ejecuta un flujo en el cuál corre el linter para verificar que se respeten las reglas de ESLint, luego se ejecutan los tests y sí todo va bien, se hace un build del proyecto y se hace un deploy de las funciones a Firebase.
