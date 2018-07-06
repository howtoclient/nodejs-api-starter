const
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    adapter = new FileSync('jsondb/db.json'),
    db = low(adapter);

db.defaults({tokens: [], users: []}).write();

module.exports = db;