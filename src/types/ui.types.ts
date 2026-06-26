export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variation?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
}

export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export interface FormProps extends BaseComponentProps {
  onSubmit: (e: React.FormEvent) => void;
}

export interface InputProps extends BaseComponentProps {
  label?: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface SelectProps extends BaseComponentProps {
  label?: string;
  id: string;
  name: string;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
}

export interface TableProps<T> extends BaseComponentProps {
  columns: {
    key: keyof T | string;
    header: string;
    render?: (value: T[keyof T] | string, row: T) => React.ReactNode;
  }[];
  data: T[];
}