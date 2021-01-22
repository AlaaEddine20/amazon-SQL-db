const db = require("../db");

class Model {
  constructor(name) {
    this.name = name;
  }
  async run(query) {
    try {
      const response = await db.query(query);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
  async findById(id) {
    if (!id) {
      throw new Error("No id provided!");
    }
    const query = `SELECT * FROM ${this.name} WHERE id=${parseInt(id, 10)}`;
    const response = await this.run(query);
    return response;
  }
}

module.exports = Model;
