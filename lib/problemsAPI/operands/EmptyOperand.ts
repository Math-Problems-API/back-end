import { Property, RandomOperand, Operand } from "../types";

const emptyProperties: Property[] = [];
const emptyOperand: Operand = { value: 0 };

const EmptyRandomOperand: RandomOperand = {
  generator: () => emptyOperand,
  properties: emptyProperties,
  name: "Empty Random Operand"
}

export default EmptyRandomOperand;
