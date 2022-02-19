import db from "./pouchConfig";

const save = async (doc) => {
  var data = await db.post(doc);
  return data;
};

const find = async (query, fields) => {
  var data = await db.find({ selector: query, fields });
  return data.docs;
};

const update = async () => {};

const remove = async () => {};

export default { save, find, update, remove };
