export interface IStyledInputProps {
  hasError?: boolean
}

interface IBaseInputProps {
  fieldName: string,
  hasError?: boolean,
  value: string,
  placeholder?: string
}

export interface IInputProps extends IBaseInputProps {
  onChange(event?: React.ChangeEvent<HTMLInputElement>): void,
}

export interface IOption {
  value: string,
  label: string,
  disabled?: boolean
}

export interface ISelectProps extends IBaseInputProps {
  options: IOption[],
  onChange(event?: React.ChangeEvent<HTMLSelectElement>): void,
}

export interface IMakeInputParams {
  fieldName: string,
  fieldType: FieldType,
  fieldOptions: any,
  changed(event?: React.ChangeEvent<HTMLInputElement>): void,
  hasError: boolean,
  value: string
}

export interface IMakeInput {
  (params: IMakeInputParams): JSX.Element;
};

export type FieldType = 'input' | 'select';
