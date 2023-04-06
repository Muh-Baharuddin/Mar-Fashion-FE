export interface SelectBaseProps<T> {
  defaultValue?: T | T[];
  name: string;
  isMulti?: boolean;
  creatable?: boolean;
}

export interface SelectFieldProps<T> extends SelectBaseProps<T>{
  label: string;
  onChange: (data: T|T[]) => void;
}
