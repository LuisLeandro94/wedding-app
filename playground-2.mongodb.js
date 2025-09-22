/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('wedding');

// Insert a few documents into the sales collection.
db.getCollection('guests').insertMany([
  { 'id': 1, 'name': 'Palmira Leandro', 'numberOfGuests': 4, 'familySide': 'groom', 'willBeAttending': false },
  { 'id': 2, 'name': 'Rosa Ramos', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': false },
  { 'id': 3, 'name': 'Feliciano Ramos', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': false },
  { 'id': 4, 'name': 'Anabela Rmaos', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': false },
]);

db.getCollection('guests').insertMany([
  {'id': 1, 'name': 'Mãe e Pai', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 2, 'name': 'Ana', 'numberOfGuests': 1, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 3, 'name': 'Catarina, Teresa e José', 'numberOfGuests': 3, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 4, 'name': 'Abílio e Cristina', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 5, 'name': 'João, Daniela e Leo', 'numberOfGuests': 3, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 6, 'name': 'José e Beatriz', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 7, 'name': 'Madrinha e Padrinho', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 8, 'name': 'Avô Chiquinho e Avó Livinha', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 9, 'name': 'Salete', 'numberOfGuests': 1, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 10, 'name': 'Rosa e César', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 11, 'name': 'Beatriz e Jorge', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 12, 'name': 'Cátia, Ricardo, Guilherme e Camila', 'numberOfGuests': 4, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 13, 'name': 'Avó Aurorinha', 'numberOfGuests': 1, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 14, 'name': 'Josefa e Manuel', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 15, 'name': 'Carina, Bento e Gonçalo', 'numberOfGuests': 3, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 16, 'name': 'Bruno, Marlene e Matilde', 'numberOfGuests': 3, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 17, 'name': 'Deolinda e Domingos', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 18, 'name': 'João, Mulher e Filho', 'numberOfGuests': 3, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 19, 'name': 'Cláudio, Sandrina e Mariana', 'numberOfGuests': 3, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 20, 'name': 'Sérgio e Lúcia', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 21, 'name': 'Pedro', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 22, 'name': 'Anselmo, Mulher e Filha', 'numberOfGuests': 3, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 23, 'name': 'Dores', 'numberOfGuests': 1, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 24, 'name': 'Bruno e namorada', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 25, 'name': 'Miguel e namorada', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 26, 'name': 'Marco e Sofia', 'numberOfGuests': 2, 'familySide': 'groom', 'willBeAttending': null, 'table': null },
  {'id': 27, 'name': 'Mãe e Ângelo', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 28, 'name': 'Feliciano e Andela', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 29, 'name': 'Anabela, Pedro, Flor e Lua', 'numberOfGuests': 4, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 30, 'name': 'Célia e Nelo', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 31, 'name': 'Diogo, Eliana e Margarida', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 32, 'name': 'Sara', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 33, 'name': 'Cristina e Albano', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 34, 'name': 'Tiago', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 35, 'name': 'Beatriz e Marcelo', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 36, 'name': 'Adriano e Carmo', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 37, 'name': 'Adriana, João e Leonor', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 38, 'name': 'Rui', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 39, 'name': 'Vitor, Serena e Leo', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 40, 'name': 'Belém', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 41, 'name': 'Daniel e Helena', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 42, 'name': 'Priscila e Laura', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 43, 'name': 'Madrinha e Manuel', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 44, 'name': 'José, Susana e João', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 45, 'name': 'Leonel, Inês e Alice', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 46, 'name': 'Sérgio, Helena e Luísa', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 47, 'name': 'Avó Emília', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 48, 'name': 'Conceição', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 49, 'name': 'Angelique, Ricardo, Afonso e Luísa', 'numberOfGuests': 4, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 50, 'name': 'Sylviane, Ricardo, Matilde e Clara', 'numberOfGuests': 4, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 51, 'name': 'Fátima', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 52, 'name': 'Óscar, Cindy e Filhas', 'numberOfGuests': 4, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 53, 'name': 'Tony, Mulher e Filha', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 54, 'name': 'Fátima e Feliciano', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 55, 'name': 'António, Esmeralda e Filhos', 'numberOfGuests': 4, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 56, 'name': 'Quinel, Fátima e Filha', 'numberOfGuests': 3, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 57, 'name': 'Armando, Ana e Filhos', 'numberOfGuests': 4, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 58, 'name': 'Anabela e Lucas', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 59, 'name': 'Bruna e Pedro', 'numberOfGuests': 2, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 60, 'name': 'Beatriz Castro', 'numberOfGuests': 1, 'familySide': 'bride', 'willBeAttending': null, 'table': null },
  {'id': 61, 'name': 'Estela e Pedro', 'numberOfGuests': 3, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 62, 'name': 'Francisca e João', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 63, 'name': 'Margarida e Paulo', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 64, 'name': 'Mónica Lopes', 'numberOfGuests': 1, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 65, 'name': 'Francisca e Gabriel', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 66, 'name': 'Gabriela e José', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 67, 'name': 'Bárbara e André', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 68, 'name': 'Tiago e Vaun', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 69, 'name': 'Inês e João', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 70, 'name': 'Daniel e Raquel', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 71, 'name': 'João Bruno e Liliana', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 72, 'name': 'Henrique e Raquel', 'numberOfGuests': 2, 'familySide': 'both', 'willBeAttending': null, 'table': null },
  {'id': 73, 'name': 'Diogo Costa', 'numberOfGuests': 1, 'familySide': 'both', 'willBeAttending': null, 'table': null },
])


// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('guests').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { familySide: 'bride' } },
]);
