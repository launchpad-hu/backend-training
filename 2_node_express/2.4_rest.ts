// Készítsünk REST API-t!

// A /api/tasks útvonalra GET kérésre egy JSON tömböt küldjünk vissza, ami a feladatokat tartalmazza
// ilyen formában: [{ id: 1, title: "Learn Node.js" }, { id: 2, title: "Learn Express.js" }]
// (ezt egy változóban tárold egyszerűen)

// A /api/tasks útvonalra POST kérésre egy új feladatot adjon hozzá az eddigiekhez.
// A kérés törzsében egy JSON objektumot várunk, ami a feladatot tartalmazza, pl:
// { title: "Learn TypeScript" }
// generáljon hozzá egy id-t is

// Ezután ha lekérjük a taszkokat, akkor a legújabb feladat is ott legyen

// Kelleni fog a body-parser csomag, ami a kérés törzsét JSON-ból objektummá alakítja
