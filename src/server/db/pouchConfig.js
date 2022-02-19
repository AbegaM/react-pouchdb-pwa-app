import PouchDB from "pouchdb";
import mangoQuery from "pouchdb-find"
import pouchdbAuth from "pouchdb-authentication"

PouchDB.plugin(mangoQuery);
PouchDB.plugin(pouchdbAuth);

var db = new PouchDB("pwadb");
//   var remoteDb = new PouchDB(env.db.remoteDb);
//   db.sync(remoteDb, { live: true, retry: true })
//     .on("change", (change) => {})
//     .on("paused", (info) => {})
//     .on("active", (info) => {})
//     .on("error", (error) => {});

export default db;
