import pool from "../utils/pool";
import fs from "fs"

const getFromDatabase = (query: string, behavior) => {
  return async () => {
    const { rows } = await pool.query(query);

    return behavior(rows);
  }
}

const getOperatorsQuery = "SELECT * FROM operators";

const getOpsBehavior = rows => {
  return rows.map(({ name, value }) => {
    const operator = { name, value, view: null }; 

    const viewPath = `${__dirname}/../views/operators/${name}.html`;
    const opHasView = fs.existsSync(viewPath);

    if(opHasView) {
      operator.view = fs.readFileSync(viewPath, "utf8")
    }
    
    return operator;
  })
}

export const getAllOperators = getFromDatabase(getOperatorsQuery, getOpsBehavior);
