// export interface FieldProps<T> {
//   label?: string;
//   name: string;
//   placeholder?: string;
//   defaultSingleValue?: T;
//   defaultMultiValues?: T[];
//   onChange?: (data: T | T[]) => void;
//   isMulti?: boolean;
//   creatable? : boolean;
//   singleDefaultValue?: {
//     value: string;
//     label: string;
//   } | null
//   multipleDefaultValues?: {
//     value: string;
//     label: string;
//   }[] | undefined
// }


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
