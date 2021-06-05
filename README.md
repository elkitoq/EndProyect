# Indice

1. [Introduccion](#introduccion)

## Modulos usados

1. Cliente
   1. [Create React App](#getting-started-with-create-react-app)
   2. [Reacstrap](#reactstrap)
2. Servidor
   1. [Cookie Parser](#cookie-parser)
   2. [Cors](#cors)
   3. [Express](#express)
   4. [Express Sesion](#express-sesion)
   5. [Nodemon](#nodemon)
3. [Concurrently](#concurrently)

## Cliente

1. Componentes View

   1. [Busqueda](#busqueda)
   2. [Buttons]()
   3. [CardWorkerDisplay](#cardworkerdisplay)
   4. [Inputs]()
   5. [Labels]()
   6. [NavegadorPrincipal](#navegadorprincipal)
   7. [Api](#Api)
   8. [Display / Api consumer](#Display)

2. Views

   1. [ViewAddCVData](#viewaddcvdata)
   2. [ViewCreateCV](#viewcreatecv)
   3. [ViewCreateUser](#viewcreateuser)
   4. [ViewFindJob](#viewfindjob)
   5. [ViewFindService](#viewfindservice)
   6. [ViewFindWorker](#viewfindworker)
   7. [ViewHome](#viewhome)
   8. [ViewHomeAdmin](#viewhomeadmin)
   9. [ViewHomeAspirante](#viewhomeaspirante)
   10. [ViewHomeEmpresa](#viewhomeempresa)
   11. [ViewJobOffice](#viewjoboffice)
   12. [ViewLogin](#viewlogin)
   13. [ViewLookForJob](#viewlookforjob)
   14. [ViewLookForWorker](#viewlookforworker)
   15. [ViewMain](#viewmain)
   16. [ViewOfferJob](#viewofferjob)
   17. [ViewOfferService](#viewofferservice)
   18. [ViewRegister](#viewregister)

## Servidor

## API

---

## Introduccion

Este proyecto lo hicimos para que la gente tenga trabajo, y aprobar la materia

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

## Reactstrap

Para usar Bootstrap dentro de Rect

[indice](#indice)

---

## Cookie parser

Para convertir las cookies en Json

[indice](#indice)

---

## Cors

Permite comunicarse entre el cliente y el servidor sin problemas de permisos. Vease en **server.js** el objeto **corsOptions**

[indice](#indice)

---

## Express

Crea el servidor. Vease **server.js**

[indice](#indice)

---

## Express-Sesion

Permite conservar la sesion entre llamadas al servidor.

[indice](#indice)

---

## Nodemon

Constantemente revisa si hay modificaciones en los archivos para relanzar el servidor. Vease en **package.json** el script **nodemon-server**.

"nodemon --watch src/Server src/Server/server.js".

"--watch src/Server" evita que el server se reinicie por modificaciones fuera de la carpeta server.

[indice](#indice)

---

## Concurrently

Ejecuta al mismo tiempo el server y el cliete. Vease en **package.json** el script **start**.

[indice](#indice)

---

## Componentes View

### Busqueda

conjunto clasico de una entrada de texto y un boton para iniciar una busqueda
parametros:

```javascript
{href="#",text="Buscar",param="b",placeholder="Busqueda"}
```

#### href

Hace referencia a la pagina a la que dirigira el boton. El valor predetermionado **#** llevara a la misma pagina en la que se encuentra.

#### text

El texto mostrado por el boton.

#### placeholder

El texto mostrado por el input.

#### param

Titulo del parametro que encabeza la busqueda. El valor predeterminado agreagara a la url de **href** el parametro "?b=\<valor del input\>"

[indice](#indice)

---

### CardWorkerDisplay

Crea un conjunto de tarjetas para consumir una api de trabajadores

```javascript
{ seed, gender, cant = 10 }
```

#### seed

La semilla buscada (porq usamos una api aleatoria, cuando sea el final le ponemos algo mas util). Por defecto busca con semilla aleatoria (sin semilla)

#### gender

Filtra por genero. Pro defecto, sin filtro

#### cant

Cantidad mostrada por pagina

[indice](#indice)

---

#### CardWorker

Del archivo CardWorkerDisplay. Muestra un elemento **worker**.

#### elemento

Un **worker**, el cual incluye:

```javascript
{ name={first,last}, email, cell, job, picture={large}}
```

#### index

Indice para usar en caso de crear una lista de tarjeta

[indice](#indice)

---

### NavegadorPrincipal

Del archivo Navegador. La barra superior que incluye botones para navegar por el sitio.

[indice](#indice)

---

### API 

La clase API del cliente es una interfaz entre el cliente y el servidor. Permite crear un vinculo hacia una url especifica del server para enviar datos y recibir una respuesta. 

Para crear una instancia Api usamos:
```javascript
 const api = new API(url, dataState, responseKey , infoState , infoKey)

 const apiEjemplo = new API('https://randomuser.me/api/', useState([]), "results",useState({}),"info");
```

Donde:

#### url

Es la direccion de la api a la que queremos conectarnos. Puede ser del mismo servidor ```"/user"``` en cuyo caso se redireccionara al puerto 4000. O de un servidor externo ```"https://randomuser.me/api/"``` para ello use siempre "http" o "https" al comienzo del string

#### dataState

Un conjunto del tipo ```[data, setData]``` de hook de estado de React donde se guardaran los datos. Para crearlo use ```useState([])``` en caso de multiples datos o ```useState({})``` en caso de un dato unico. No lo crea la clase automaticamente porque react no lo permite.

#### responseKey

La key con la que el servidor enviará los datos. En el caso del ejemplo el servidor envia un json del tipo ```{results:Array(10),info:{...}}``` por lo que recuperamos los datos en la key "results"  

#### infoState

Igual a dataState pero para la informacion extra del servidor (Cantidad de paginas, Estados del servidor, Errores, etc), creelo con ```useState({})```

#### infoKey

Igual a responseKey, pero para la key de informacion. En el ejemplo (```{results:Array(10),info:{...}}```) usamos la key "info"

#### Metodos
- ```getData()``` Devuelve una copia de los datos obtenidos o cargados para enviar (Estos datos son estaticos. Para renderizarlos en pantalla use "getHookData")
- ```getHookData()``` Devuelve el Hook de estado de los datos (este se actualiza automaticamente al recibir datos nuevos)
- ```getHookInfo()``` Devuelve el Hook de estado de la informacion extra
- ```send(method = "post", data = this._data)``` Envia "data" a la api servidor usando el metodo "Method". Por defecto "send()" envia los datos pre-cargados por el metodo "post". Puede usar metodos: "post","get","put","delete"
- ```get(data = this._data)``` igual a send("get").
- ```post(data = this._data)``` igual a send("post").
- ```put(data = this._data)``` igual a send("put").
- ```delete(data = this._data)``` igual a send("delete").
- ```refresh()``` Fuerza la actualizacion del render del hook de estado. Usese en caso de haber modificado una parte de los datos
- ```setData()``` Carga datos manualmente. Puede usarse para cambiar los datos o para precargar datos que van a enviarse
- ```static getSearchParam(search)``` crea un json a partir de los parametros de una url. Ejemplo: ```"?job=Electricista&page=1"``` devuelve ```{job:"Electricista", page: "1"}```. Es estatico.

[indice](#indice)

---

### Display



[indice](#indice)

---

## Views

### ViewAddCVData

[indice](#indice)

---

## ViewCreateCV

[indice](#indice)

---

## ViewCreateUser

[indice](#indice)

---

## ViewFindJob

[indice](#indice)

---

## ViewFindService

[indice](#indice)

---

## ViewFindWorker

[indice](#indice)

---

## ViewHome

[indice](#indice)

---

## ViewHomeAdmin

[indice](#indice)

---

## ViewHomeAspirante

[indice](#indice)

---

## ViewHomeEmpresa

[indice](#indice)

---

## ViewJobOffice

[indice](#indice)

---

## ViewLogin

[indice](#indice)

---

## ViewLookForJob

[indice](#indice)

---

## ViewLookForWorker

[indice](#indice)

---

## ViewMain

[indice](#indice)

---

## ViewOfferJob

[indice](#indice)

---

## ViewOfferService

[indice](#indice)

---

## ViewRegister

[indice](#indice)

---
