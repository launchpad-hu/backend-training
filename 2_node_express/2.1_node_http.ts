// Készíts egy http szervert, ami a 3000-es porton figyel, és minden kérésre egy
// "Hello World" szöveget küld vissza.

// nézd meg a doksit: https://nodejs.org/api/http.html

import { createServer } from "http";

const server = createServer(


// futtasd, és teszteld a böngészőben: http://localhost:3000


// Most módosítsd úgy, hogy 
// - a http://localhost:3000/hello útvonalra egy "Hello World" szöveget küldjön vissza
// - a http://localhost:3000/bye útvonalra egy "Goodbye World" szöveget küldjön vissza
// - minden más esetben 404-es hibakódot küldjön vissza