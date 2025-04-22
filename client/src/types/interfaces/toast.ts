import ActionInterface from "./actions";

interface ToastInterface {
  id: string;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  title?: string | React.ReactElement;
  body?: string | React.ReactElement;
  actions?: Array<ActionInterface>;
}
export default ToastInterface;
