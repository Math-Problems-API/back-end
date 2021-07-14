import pool from "../utils/pool";

const getFromDatabase = (query: string, behavior) => {
  return async () => {
    const { rows } = await pool.query(query);

    return behavior(rows);
  }
}

const getOperatorsQuery = "SELECT * FROM operators";

const getOpsBehavior = rows => {
  console.log("HIII", rows);
  
  return rows.map(({ name, value }) => {
    return { name, value }
  })
}

export const getAllOperators = getFromDatabase(getOperatorsQuery, getOpsBehavior);

