import { RandomOperand } from "../../problemsAPI/types";
import availableOperands from "../../problemsAPI/operands/index";

export default {
  availableOperands: (): RandomOperand[] => availableOperands
}