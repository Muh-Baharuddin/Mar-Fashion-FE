export interface FieldProps<T> {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: T;
  defaultValueArray?: T[];
  onChange?: (data: T | T[]) => void;
}