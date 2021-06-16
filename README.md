# Indice

1. [Introducción](#introducción)

## Módulos usados

1. Cliente
   1. [Create React App](#getting-started-with-create-react-app)
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
   2. [Button]()
   3. [CardWorkerDisplay](#cardWorkerDisplay)
   4. [Inputs]()
   5. [Labels]()
   6. [NavegadorPrincipal](#NavegadorPrincipal)
   7. [Api](#api-client)
   8. [Display / Api consumer](#Display)
   9. [Form / Api send](#Form)

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

## API

---

## Introducción

El proyecto se refiere a un software de oferta y demanda de empleo. Será el enlace entre las empresas y los candidatos, ya que su servicio consiste en servir como medio para que las empresas den a conocer las ofertas de trabajo que tienen y para que los postulantes ofrezcan sus servicios.

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

Es un módulo que permite enviar mails de forma sencilla. Vease en **mail.js**

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

### CardWorkerDisplay

Crea un conjunto de tarjetas para consumir una api de trabajadores

```javascript
{ seed, gender, cant = 10 }
```

#### seed

La semilla buscada (porque usamos una api aleatoria, cuando sea el final le ponemos algo mas util). Por defecto busca con semilla aleatoria (sin semilla)

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
{ name:{first,last}, email, cell, job, picture:{large}}
```

#### index

Indice para usar en caso de crear una lista de tarjeta

[indice](#indice)

---

### NavegadorPrincipal

Del archivo Navegador. La barra superior que incluye botones para navegar por el sitio.

[indice](#indice)

---

### API-client

La clase API del cliente es una interfaz entre el cliente y el servidor. Permite crear un vinculo hacia una url especifica del server para enviar datos y recibir una respuesta. 

Para crear una instancia Api usamos:

```javascript
 const api = new API(url, dataState, responseKey , infoState , infoKey)

 const apiEjemplo = new API('https://randomuser.me/api/', useState([]), "results",useState({}),"info");
```

Donde:

#### url

Es la dirección de la api a la que queremos conectarnos. Puede ser del mismo servidor ```"/user"``` en cuyo caso se redireccionará al puerto 4000. O de un servidor externo ```"https://randomuser.me/api/"``` para ello use siempre "http" o "https" al comienzo del string

#### dataState

Un conjunto del tipo ```[data, setData]``` de hook de estado de React donde se guardaran los datos. Para crearlo use ```useState([])``` en caso de múltiples datos o ```useState({})``` en caso de un dato único. No lo crea la clase automáticamente porque react no lo permite.

#### responseKey

La key con la que el servidor enviará los datos. En el caso del ejemplo el servidor envía un json del tipo ```{results:Array(10),info:{...}}``` por lo que recuperamos los datos en la key "results"  

#### infoState

Igual a dataState pero para la información extra del servidor (Cantidad de paginas, Estados del servidor, Errores, etc), creelo con ```useState({})```

#### infoKey

Igual a responseKey, pero para la key de información. En el ejemplo (```{results:Array(10),info:{...}}```) usamos la key "info"

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
Donde ```api``` es una instancia de [API](#API-Client) que conectará con el servidor

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

Al crear el Form le pasamos el api y el método con el que queremos qu se envíen los datos (get, post, put. Por defecto "post") 

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

## ViewRecoveryPassword

[indice](#indice)

---

## ViewRegister

[indice](#indice)

---
