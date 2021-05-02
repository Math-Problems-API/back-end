const pool = require('../utils/pool');

module.exports = class Preset {
  id;
  name;
  query;

  constructor({ id, name, query }) {
    this.id = id;
    this.name = name;
    this.query = query;
  }

  static async findByName(name) {
    const { rows } = await pool.query(`
      SELECT * FROM presets
      WHERE name = $1
    `, [name]);

    if(!rows[0]) throw new Error(`No preset with name of ${name}`);

    return new Preset(rows[0])
  }

  static async add({ name, query }) {
    const { rows } = await pool.query(`
      INSERT INTO presets (name, query)
      VALUES ($1, $2)
      RETURNING *
    `, [name, query]);

    return new Preset(rows[0])
  }
}