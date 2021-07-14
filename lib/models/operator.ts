import pool from "../utils/pool";

const availableOperatorViews = [
  "addition"
]

const getFromDatabase = (query: string, behavior) => {
  return async () => {
    const { rows } = await pool.query(query);

    return behavior(rows);
  }
}

const getOperatorsQuery = "SELECT * FROM operators";

const operatorHasView = (name: string): boolean => {
  return !!availableOperatorViews.find(elem => elem === name)
}

const getOpsBehavior = rows => {
  return rows.map(({ name, value }) => {
    const opHasView = operatorHasView(name);
    const operator = { name, value, view: null };

    if(opHasView) {
      operator.view = "<div>Test</div>"
    }
    
    return operator;
  })
}

export const getAllOperators = getFromDatabase(getOperatorsQuery, getOpsBehavior);
