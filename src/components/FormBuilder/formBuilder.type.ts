export type InputType =
  | 'FieldInput'
  | 'FieldCheckboxes'
  | 'FieldRadios'
  | 'FieldSelect'
  | 'FieldTextarea'
  | 'FieldImage64bit'
  | 'FieldDayPicker'
  | 'FieldVideo';

export type fieldType = {
  id: string;
  inputName: string;
  inputType: string;
  inputValue: string;
  inputOrder: number;
  label: string;
  options: { labal: string; value: string }[];
  helper: string;
  display: boolean;
  principalImage:boolean;
};
