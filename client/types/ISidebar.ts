export interface ISidebar {
  to?: string;
  color?: string;
  type?: "button" | "link";
  click?: () => void;
  label: string;
  icon: string;
}
