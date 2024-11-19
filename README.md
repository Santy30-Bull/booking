# Booking Microservice

Este repositorio contiene el código de un microservicio para la gestión de reservas (**Booking**). Este servicio utiliza **SQLite** como base de datos y se comunica con el microservicio de **Liquour** mediante **NATS**. 

---

## Características principales

- **Base de datos**: Utiliza un archivo SQLite para almacenar y gestionar las reservas.
- **Mensajería**: Se conecta al microservicio de **Liquour** mediante el sistema de mensajería **NATS**.
- **Configuración flexible**: Requiere un archivo `.env` para especificar las variables de entorno esenciales.

---

## Configuración

### Requisitos previos
1. **Node.js** instalado en tu máquina.
2. **NATS** en funcionamiento para la comunicación entre microservicios.
3. Archivo `.env` configurado correctamente.

### Variables de entorno necesarias

Debes crear un archivo `.env` en el directorio raíz del proyecto con las siguientes configuraciones:

```bash
# Configuración del puerto
PORT=tu puerto

# Configuración de la base de datos de Bookings (SQLite)
BOOKINGS_DB_NAME= tu nombre de base de datos

# Configuración de NATS
NATS_SERVER_URL= tu url de tu base de datos
```
## Instalación

Clona este repositorio:

```bash
git clone https://github.com/Santy30-Bull/booking.git
cd booking
```
Instala las dependencias:

```bash
npm install
Asegúrate de tener configurado el archivo .env como se describe en la sección anterior.
```

Ejecución
Inicia el microservicio:

```bash
npm run start:dev
El servicio estará disponible en el puerto definido en el archivo .env (por defecto: 3001).
```

## Base de datos

El microservicio utiliza un archivo SQLite ubicado en `./database/bookings.db`. Si este archivo no existe, el sistema intentará crearlo automáticamente al inicializarse.

---

## Comunicación con otros microservicios

Este microservicio se comunica con el microservicio de **Liquour** utilizando **NATS**, un sistema de mensajería ligera y eficiente. Asegúrate de que el servidor **NATS** esté activo y accesible desde tu entorno.
