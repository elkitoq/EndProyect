# Indice

1. [Introducción](#introducción)
   1. [Instalación](#Instalación)

## Módulos usados

1. [Cliente](#modulos-del-cliente)
   1. [React App](#react-app)
   2. [Reacstrap](#reactstrap)
2. Servidor
   1. [Cookie Parser](#cookie-parser)
   2. [Cors](#cors)
   3. [Express](#express)
   4. [Express Session](#express-session)
   5. [Nodemon](#nodemon)
   6. [Nodemailer](#nodemailer)
3. [Concurrently](#concurrently)


## Cliente

1. Componentes View

   1. [Búsqueda](#búsqueda)
   2. [NavegadorPrincipal](#NavegadorPrincipal)
   3. [Api](#api-client)
   4. [Display / Api consumer](#Display)
   5. [Form / Api send](#Form)
   6. [DownloadXLS](#DownloadXLS)
   7. [OptionMenu](#OptionMenu)
   8. [Events](#Events)
   9. [ErrorDriver](#ErrorDriver)

2. Views

   1. [ViewAddCVData](#ViewAddCVData)
   2. [ViewCreateCV](#ViewCreateCV)
   3. [ViewCreateUser](#ViewCreateUser)
   4. [ViewFindJob](#ViewFindJob)
   5. [ViewFindService](#ViewFindService)
   6. [ViewFindWorker](#ViewFindWorker)
   7. [ViewHome](#ViewHome)
   8. [ViewHomeAdmin](#ViewHomeAdmin)
   9. [ViewHomeAspirante](#ViewHomeAspirante)
   10. [ViewHomeEmpresa](#ViewHomeEmpresa)
   11. [ViewJobOffice](#ViewJobOffice)
   12. [ViewLogin](#ViewLogin)
   13. [ViewLookForJob](#ViewLookForJob)
   14. [ViewLookForWorker](#ViewLookForWorker)
   15. [ViewMain](#ViewMain)
   16. [ViewOfferJob](#ViewOfferJob)
   17. [ViewOfferService](#ViewOfferService)
   18. [ViewRecoveryPassword](#ViewRecoveryPassword)
   19. [ViewRegister](#ViewRegister)

## Servidor

1. API
   1.  [routes](#routes)
   2.  [cv](#cv)
   3.  [git](#git)
   4.  [job](#job)
   5.  [role](#role)
   6.  [service](#service)
   7.  [user](#user)
   8.  [mensaje](#mensaje)
   9.  [profile](#profile)
   10. [recovery-pass](#recoverypass)

2. Tools
   1. [hashCode](#hashCode)
   2. [repairModule](#repairModule)
   3. [terminal](#terminal)
   
3. DataBase
   1. [User](#User-DB)
   2. [Profile](#Profile-DB)
   3. [Candidate](#Candidate-DB)
   4. [Company](#Company-DB)
   5. [Freelance](#Freelance-DB)
   6. [Application](#Application-DB)
   7. [Listas](#Listas-DB)
---

## Introducción

El proyecto se refiere a un software de oferta y demanda de empleo. Será el enlace entre las empresas y los candidatos, ya que su servicio consiste en servir como medio para que las empresas den a conocer las ofertas de trabajo que tienen y para que los postulantes ofrezcan sus servicios.


[indice](#indice)
---

### Instalación

Es necesario tener instalado nodeJS para ejecutar el software. Y tambien npm que se incluye en nodeJS en sus versiones v14.17.0 pra nodeJS y 6.14.13 para nmp.

Si se adquiere el software se puede clonar o descargar desde git
Una vez clonado el repositorio se pueden instalar todos los modulos con el codigo

   npm install

y comenzar a ejecutarlo con

   npm start


[indice](#indice)

---

# Modulos del Cliente


Comenzaremos hablando de los modulos que usará el cliente. Todos estos modulos estan disponibles desde el momento que se instala el sistema. Esta informacion es importante en caso de que se vaya a realizar modificaciones en la lista de modulos o si se cambiará la version de alguno de ellos, recuerde verificar si se mantienen las compatibilidades

[indice](#indice)

## React app

El principal que usaremos, este modulo marca toda la estructura de la interfaz. Maneja los estados de la pantalla y comprueba que partes de la misma deben actualizarse con nueva informacion

[indice](#indice)
---

## Reactstrap

Para usar Bootstrap dentro de Rect. De las opciones disponibles elegimos esta por ser la mas completa aunque hay que tener en cuenta que no todos sus partes estan actualizadas. Debimos incluir un script para que se actualice el segmento react-transition-group, puede verse en [repairModule](#repairModule). Incluso con esta mejora el carousel de Reactstrap continua presentando un warning que si bien no es un problema esperabamos se solucionara a mitad del desarrollo cuando saliera la nueva version, algo que no ocurrió y queda esperar a la proxima version de Reactstrap. 

[indice](#indice)

---

## Cookie parser

Para convertir las cookies en Json

[indice](#indice)

---

## Cors

Permite comunicarse entre el cliente y el servidor sin problemas de permisos. Véase en **server.js** el objeto **corsOptions**

[indice](#indice)

---

## Express

Crea el servidor. Véase **server.js**

[indice](#indice)

---

## Express-Session

Permite conservar la sesión entre llamadas al servidor.

[indice](#indice)

---

## Nodemon

Constantemente revisa si hay modificaciones en los archivos para relanzar el servidor. Véase en **package.json** el script **nodemon-server**.

"nodemon --watch src/Server src/Server/server.js".

"--watch src/Server" evita que el server se reinicie por modificaciones fuera de la carpeta server.

[indice](#indice)

---

## Nodemailer

Es un módulo que permite enviar Emails de forma sencilla. Véase en **mail.js**

[indice](#indice)

---

## Concurrently

Ejecuta al mismo tiempo el server y el cliente. Véase en **package.json** el script **start**.

[indice](#indice)

---

## Componentes View

### Búsqueda

conjunto clásico de una entrada de texto y un botón para iniciar una búsqueda
parámetros:

```javascript
{href="#",text="Buscar",param="b",placeholder="Búsqueda"}
```

#### href

Hace referencia a la pagina a la que dirigirá el botón. El valor predeterminado **#** llevara a la misma pagina en la que se encuentra.

#### text

El texto mostrado por el botón.

#### placeholder

El texto mostrado por el input.

#### param

Titulo del parámetro que encabeza la búsqueda. El valor predeterminado agregara a la url de **href** el parámetro "?b=\<valor del input\>"

[indice](#indice)

---

### NavegadorPrincipal

Del archivo Navegador. La barra superior que incluye botones para navegar por el sitio.

[indice](#indice)

---

### API-client

La clase API del cliente es una interfaz entre el cliente y el servidor. Permite crear un vinculo hacia una url especifica del server para enviar datos y recibir una respuesta. 

Para crear una instancia Api podemos usar 3 metodos:

   1 - API Rapida
   ```javascript
   const api = new QAPI(url)

   //La api en este caso no almacena los datos pero podemos hacer uso de ellos con promesas:
   const apiEjemplo = new QAPI('/role') //Creamos la api
                        .send("get", {}) // enviamos un get, sin datos
                        .then((res) => { // al llegar la respuesta...
                           setUser("selectUser", res.data.response, { path: '/' }); //... se ejecuta esta función
                         });
   ```

   2 - API como componente:

   Dentro del `<Form>` o del `<Display>` o lo que sea que utiliza la api, creamos el componente:
   ```javascript
   <APIComponent url="/recovery-pass" APIClass={APIRecovery} mode={APIComponent.mode.SINGLE} responseKey="response" infoKey = "info"/>
   ```
   En este caso sera el componente `<Form>` o `<Display>` el que se encarga de crear una api (con el método que veremos en el punto 3) 
   usará la url que se le pase para crear una instancia de la APIClass que se le cargue, `mode={APIComponent.mode.SINGLE}` significa que los datos que se guardaran serán de un único json (default para los `<Form>`) y el `mode={APIComponent.mode.ARRAY}` sera una lista de json (default para los `<Display>`)

   3 - API como objeto

```javascript
 const api = new API({url, responseKey, infoKey,mode})

 const apiEjemplo = new API({url:'https://randomuser.me/api/',responseKey: "results",infoKey: "info", mode: APIComponent.mode.ARRAY);
```


Donde:

#### url

Es la dirección de la api a la que queremos conectarnos. Puede ser del mismo servidor ```"/user"``` en cuyo caso se redireccionará al puerto 4000. O de un servidor externo ```"https://randomuser.me/api/"``` para ello use siempre "http" o "https" al comienzo del string

#### responseKey

La key con la que el servidor enviará los datos. En el caso del ejemplo el servidor envía un json del tipo ```{results:Array(10),info:{...}}``` por lo que recuperamos los datos en la key "results"  

#### infoKey

Igual a responseKey, pero para la key de información. En el ejemplo (```{results:Array(10),info:{...}}```) usamos la key "info"

#### mode

Representa la forma en la que se guardaran los datos:
- `APIComponent.mode.SINGLE` para json simple.
- `APIComponent.mode.ARRAY` para arreglo de jsons.

#### Métodos
- ```getData()``` Devuelve una copia de los datos obtenidos o cargados para enviar (Estos datos son estáticos. Para renderizarlos en pantalla use "getHookData")
- ```getHookData()``` Devuelve el Hook de estado de los datos (este se actualiza automáticamente al recibir datos nuevos)
- ```getHookInfo()``` Devuelve el Hook de estado de la información extra
- ```send(method = "post", data = this._data)``` Envía "data" a la api servidor usando el método "Method". Por defecto "send()" envía los datos pre-cargados por el método "post". Puede usar métodos: "post","get","put","delete"
- ```get(data = this._data)``` igual a send("get").
- ```post(data = this._data)``` igual a send("post").
- ```put(data = this._data)``` igual a send("put").
- ```delete(data = this._data)``` igual a send("delete").
- ```refresh()``` Fuerza la actualización del render del hook de estado. Úsese en caso de haber modificado una parte de los datos
- ```setData()``` Carga datos manualmente. Puede usarse para cambiar los datos o para pre-cargar datos que van a enviarse
- ```static getSearchParam(search)``` crea un json a partir de los parámetros de una url. Ejemplo: ```"?job=Electricista&page=1"``` devuelve ```{job:"Electricista", page: "1"}```. 
Para obtenerlos desde la url del cliente puede usar: 
```javascript
const { search } = useLocation();
const getJson = API.getSearchParam(search);
```

[indice](#indice)

---

### Display

El componente Display se encarga de mostrar el contenido de un array de datos recibido desde el servidor. El display permite ver los datos en forma de tarjeta o en forma de tabla. Display recorrerá el arreglo he imprimirá los datos de cada elemento cono se le indique.

Podemos crear el componente de la siguiente manera:

```html
<Display api={api} get={get}>
```
Donde ```api``` es una instancia de [API](#API-Client) que conectará con el servidor (También se puede usar un componente `<APIComponent>`, véase [Api](#api-client))

```get``` es un json que incluye los datos que se pedirán por method GET. Ej ```{job:"Electricista", page: "1"}```
Para obtenerlos desde la url del cliente vea [API](#API-Client).getSearchParam(search)

Para incluir los datos dentro del Display agregue un CardText o un CardImg

```html
<CardText key="cell">Teléfono:</CardText>
```
En este caso queremos que imprima el Teléfono de cada elemento. Por lo que se le puso titulo ```"Teléfono:"``` en el interior del tag

Ademas el json del elemento guarda el dato como ```cell``` por lo que se lo indicamos como ```key="cell"```

Para indicar la forma de imprimir este dato se ha usado el parámetro ```key```


Si no queremos imprimir el dato directamente sino q se realice algún proceso previo podemos usar:

```html
<CardText func={(elemento) => ` ${elemento.name.last}, ${elemento.name.first}`}>Nombre:</CardText>
```
La función ```func``` Se ejecuta en cada elemento e imprime el return. En el Ejemplo se juntan 2 valores para formar el nombre

En caso de querer incluir un dato fijo, igual para todos los elementos:
```html
<CardText text={getJson.job}>Ocupación:</CardText>
```

Podemos usar imágenes con cualquiera de los métodos anteriores
```html
<CardImg func={(elemento) => elemento.picture.large} >Foto:</CardImg>
```
En este caso el titulo ```"Foto:"``` solo se incluye en el encabezado de la tabla, no en la tarjeta.

Al hacer click en cualquier elemento, se extiende un modal tipo tarjeta del elemento en cuestión.
Es posible agregarle a esta tarjeta, datos que no se muestran en la vista general.
Para ello usamos el booleano hideData

```html
<CardText hideData>OTROS DATOS SON DESCONOCIDOS</CardText>
```

al terminar recuerde cerrar el Display
```html
</Display>
```

[indice](#indice)

---

### Form
Este componente crea un Formulario asociado una instancia de [API](#API-Client) que conectará con el servidor.
Automáticamente cargará los datos del api.getHookData() a través del onChange de cada input.
Los mismos se enviaran al clickear en el botón.

Veamos el ejemplo:

```html
<Form api={api} method="put">
   <FormItem name="Usuario" idInput="name"/>
   <FormItem name="Password" type="password" idInput="password"/>
   <FormItem name="Email"/>
   <FormGroup key="otros" className="separado">
      <Input idInput="otro dato"/>
   </FormGroup>
      <Button size="lg" color="primary" blocks>Crear</Button>
</Form>
```

Al crear el Form le pasamos el api y el método con el que queremos que se envíen los datos (get, post, put. Por defecto "post") 
(También se puede usar un componente `<APIComponent>`, véase [Api](#api-client))

El componente `<FormItem>` se usa para crear un conjunto label-input con el texto de `name` en la label y el key asociado para los datos `idInput`

En caso de ser algún tipo de dato particular se puede especificar `type="password"`

En caso de omitir el `idInput`, el componente usara el `name` como key

Para evitar la creación de un label, usamos `<Input>`

En caso de querer hacer una estructura de datos, usamos `<FormGroup>`
En el ejemplo el se crearía un json del tipo:

```javascript
{
   name:"",
   password:"",
   Email:"",
   otros:{
      "otro dato":"",
   }
}
```

[indice](#indice)

---
## DownloadXLS

Permite la descarga de archivos con formato xls (Excell)

[indice](#indice)

---
## OptionMenu

Este sencillo componente le da forma a los items del menu principal tanto de la pagina de inicio como de los perfiles

[indice](#indice)

---
## Events

Carga los eventos de la API para que por ejemplo se muestren los mensajes enviados por el servidor, se muestren los carteles de error y se actualice el estado de login y logout

[indice](#indice)

---
## ErrorDriver

Este modulo se encarga del manejo de errores

[indice](#indice)

---

## Views

### ViewAddCVData

Este representa dentro de la pantalla de Crear CV los items que se pueden agregar a experiencia laboral, historial academico y habilidades

[indice](#indice)

---

## ViewCreateCV
Le permite al usuario crear su CV puede accederse desde la url `/CVCreate` para los aspirantes o `/CVCreate2` para los autonomos
[indice](#indice)

---

## ViewCreateUser

Puede accederse desde `/Register` esta vista permite crear los diferentes perfiles que usará una cuenta

[indice](#indice)

---

## ViewFindService

Desde `/findService` es posible acceder a un listado de de los servicios que se están ofreciendo y filtrarlos por palabras claves

[indice](#indice)

---

## ViewHome

Pagina de inicio, muestra un menu para las primeras tareas que puede realizar el usuario (el url es `/`)

[indice](#indice)

---

## ViewHomeAspirante

Pagina principal para el aspirante (el url es `/HomeAspirante`)

[indice](#indice)

---

## ViewHomeEmpresa

Pagina principal para el Empresa (el url es `/HomeEmpresa`)

[indice](#indice)

---

## ViewHomeAutonomo

Pagina principal para el Autonomo (el url es `/HomeAutonomo`)

[indice](#indice)

---

## ViewLogin
Le permite al usuario ingresar a la pagina con su cuenta
[indice](#indice)

---

## ViewLookForJob
Le permite al usuario buscar el trabajo que desea 
[indice](#indice)

---

## ViewLookForWorker
 Le permite buscar ala empresa postulantes para el puesto que necesitan cubrir 
[indice](#indice)

---

## ViewMain
Pagina principal del sistema, enruta a todas las demas paginas
[indice](#indice)

---

## ViewOfferJob

Crea busquedas laborales para una empresa

[indice](#indice)

---

## ViewOfferService
El postulante puede ofrecer su servicio 
[indice](#indice)

---

## ViewRecoveryPassword
Verificar o recuperar la contraseña 
[indice](#indice)

---

## ViewRegister

El usuario puede crear su cuenta en la pagina 

[indice](#indice)

---

## routes

Este modulo no es en si parte de la API sino que se encarga de cargar todos las rutas que estén en la carpeta **routes**. De esa forma no es necesario cargarlas manualmente

Para usarla, incluya un archivo en la carpeta **routes**.
En el solicite `Router` de `express`

```javascript
const router = require('express').Router();
```

utilícelo como acostumbra y luego exportelo

```javascript
module.exports = router;
```
El servidor entonces importara todas las rutas al usar la linea:

```javascript
const server = express();
server.use(require("./routes/routes"));
```

[indice](#indice)

---

## cv

### GET /cv (role)

Devuelve el CV del rol numero `role`
En caso de no haber iniciado sesión o no enviar el parámetro `role` devuelve el CV guardado temporalmente por el usuario.(véase [PUT](#PUT-/cv-(role)))

### PUT /cv (role, ...body)

Guarda los datos enviados en el `body` en el CV del rol numero `role`. En caso de no haber iniciado sesión o no enviar el parámetro `role` lo guarda de manera temporal usando [session](#express-session).
Puede ver los datos del CV en [User](#user-db)

[indice](#indice)

---

## git

### GET /statusGit

Ejecuta un `git status` en el servidor

### GET /pullGit

Ejecuta un `git pull` en el servidor

[indice](#indice)

---

## job

### GET /job (role)

Devuelve la lista de **applications** cargados por el rol `role` 

### PUT /job (role, ...body)

Crea un nuevo json para **applications**, a partir de los datos enviados
Puede ver los datos de los **applications** en [User](#user-db)

[indice](#indice)

---

## role

### GET /role ()

Devuelve la lista de roles del usuario que haya iniciado sesión

### PUT /role (role, ...body)

Guarda un nuevo rol
Puede ver los datos de los **role** en [User](#user-db)

[indice](#indice)

---

## service

### GET /service ()

Devuelve la lista de **stalls** del usuario que haya iniciado sesión

### PUT /service (role, ...body)

Guarda un nuevo **stalls**
Puede ver los datos de los **stalls** en [User](#user-db)

[indice](#indice)

---


## user

### POST /login (name,password)

inicia sesión

### POST /logout ()

Termina la sesión

### PUT /user (name, password, password2, email)

Luego de hacer verificaciones crea un nuevo usuario

[indice](#indice)

---

## mensaje

### PUT /mensaje(application,mensaje)
Permite al usuario que haya iniciado sesión enviarle un **mensaje** (por email) a todos los postulantes de una **application** propia

[indice](#indice)

---

## profile

### put /profile ({profile})

Guarda el body completo q se envia como un nuevo 
[profile](#profile-db)

### get /profile (id,type)

devuelve el perfil del tipo: type (Candidate,Company, Freelance) que tenga la id solicitada 

### get /profile (index)

Devuelve el perfil numero **index** de la cuenta que haya iniciado sesión

### get /profile ()

Devuelve la lista de perfiles de la cuenta que haya iniciado sesión (Es importante notar que la lista no incluye informacion especifica de cada tipo de perfil, usa la clase generica [profile](#profile-db))

[indice](#indice)

---

## recoveryPass

### POST /recovery-pass (email,user)

Envia un email de recuperacion de password a una cuenta que responda ya sea al email proporcionado o al nombre de usuario.

el email incluirá un link con un codigo q se genera de manera aleatoria y se guarda en la cuenta de usuario

la recuperacion de password solo responderá al ultimo codigo enviado y solo se podrá usar una vez


### PUT /recovery-pass (user,codeRecoveryPass,password,password2)

Cambia la contraseña del user (siempre y cuando se reciba por duplicada y sea correcto el codigo de recuperación) 

[indice](#indice)

---

## hashCode

Agrega a los String una función para obtener su hashCode. Ej:
```javascript
require('./tools/hashcode');
var cadena="hola";
console.log(cadena.hashCode());
//3208380
```

[indice](#indice)

---

## repairModule

Un script que verifica la version de un sub-modulo, en caso de no ser la versión esperada, pregunta al usuario y en caso afirmativo, actualiza.

[indice](#indice)

---

## terminal

Permite llamar a la consola desde nodejs.

Creamos usando:

```javascript
const terminal = new (require('./terminal'))();
```

- `terminal.display` booleano que determina si se muestra la salida de la consola
- `terminal.setDirectory(dir)` cambia el directorio actual. `dir` es un String que da la ruta en forma absoluta o en relación al root del proyecto (Donde se ejecuta el `npm start`)
- `run(command = "", display = this.display)` ejecuta un comando, en forma async. Devuelve una promesa son el mensaje mostrado por consola.
- `terminal.stdout` función donde se envía la salida de la consola en caso de `terminal.display = true`
- `this.stderr` similar al anterior, para errores.
- `terminal.readline` Una interfaz del modulo `"readline"`. Se usa para realizar preguntas al usuario a través de la consola de la forma:
- 
  ```javascript
  terminal.readline.question("Mensaje", (respuesta)=>{
     //Función que se ejecuta al recibir respuesta del usuario
  })
  ```


[indice](#indice)

---

## User DB

[indice](#indice)

---

## Profile DB

Es una generalizacion para los perfiles (Candidate,Company, Freelance) por si mismo no agrega ningun dato pero se usa como composicion en User, de esta forma se puede agregar a cualquiera de sus hijos mencionados mas arriba

Ademas incluye funcion de creacion de alguno de sus hijos o de busqueda por tipo de perfil

[indice](#indice)

---

## Candidate DB

Esta formado por un cv que incluye los siguientes datos por tipo:

name: String,
lastName: String,
age: Number,
address: String,
cp: Number,
city: String,
phone: String,
email: String,
puesto: String,
description: String,
laboral: Array,
academico: Array,
skill:Array,
jobs:String,
objetives:String,
photo:String

[indice](#indice)

---


## Freelance DB

Al cv de Candidate le agrega 
cuit: Number

y una lista de stalls con estos datos

name: String,
description: String,
price: String

incluye busqueda por servicio 

[indice](#indice)

---

## Company DB

este incluye un objeto data con

razonSocial: String,
cuit:Number,
address: String,
cp: Number,
city: String,
phone: String,
email: String

y una lista de [applications](#Application-DB)

[indice](#indice)

---
## Application DB

name: String,
description: String,
req: String,
zona: String,
tipoContratacion:String,
tipoContrato: Number,
tipoJornada: Number,
status: Number

y una lista de 
data:[Candidates](#candidate-db),
date:Date,
status:Number

Incluye un buscador por nombre,
otro por palabras clave y
uno por candidato

[indice](#indice)

---

## Listas DB

Existen 3 enumeracion simples es la Base de datos

ApplicationContrato incluye los tipos de contrato que puede tener una application (por duracion del contrato)



[indice](#indice)

---