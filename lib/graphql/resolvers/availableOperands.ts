import { RandomOperand } from "../../api/types";
import availableOperands from "../../api/operands/index";

export default {
  availableOperands: (): RandomOperand[] => availableOperands
}