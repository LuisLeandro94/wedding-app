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


// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('guests').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { familySide: 'bride' } },
]);
