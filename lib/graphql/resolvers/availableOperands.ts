import { RandomOperand } from "../../api/Problem";
import availableOperands from "../../api/operands/index";

export default {
  availableOperands: (): RandomOperand[] => availableOperands
}