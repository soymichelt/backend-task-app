# Buddy Backend Project - Developed by [SoymichelDev](https://www.linkedin.com/in/soymichelt)


Este proyecto de GitHub contiene el Backend de un proyecto de una aplicación de gestión de tareas, el cúal he nombrado como **Buddy***. Esta es una herramienta sencilla, eficiente y fácil de usar diseñada para ayudar a usuarios a organizar su flujo de trabajo de manera efectiva. Los usuarios pueden registrarse e iniciar sesión para acceder a su panel personal, donde pueden crear, editar y eliminar tareas según sus necesidades.

Cada tarea cuenta con una descripción y puede ser asignada a diferentes estados, como "Por Hacer", "En Proceso", "Testeando", "Congelada" y "Completada", facilitando el seguimiento del progreso de cada una. La interfaz es intuitiva, lo que permite a los usuarios gestionar sus tareas de manera rápida y sin complicaciones, optimizando su tiempo y productividad.

## Descripción Técnica

Este proyecto ha sido desarrollado implementando varios aspectos del de desarrollo de software DDD (Domain Driven Design). Cada uno de los elementos, patrones de diseño y arquitecturas implementadas serán descritos acá de una forma breve; además, de las herramientas que se implementaron.

### Domain Driven Design

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

├── src
│   ├── di
│   │   ├── modules
│   │   │   ├── users.ts
│   │   │   └── tasks.ts
│   │   ├── shared
│   │       └── index.ts
│   │
│   ├── modules
│   │   ├── users
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │   │
│   │   ├── tasks
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   ├── infrastructure
│   │
│   ├── shared
│   │   ├── domain
│   │   └── infrastructure
│
├── package.json
└── tsconfig.json