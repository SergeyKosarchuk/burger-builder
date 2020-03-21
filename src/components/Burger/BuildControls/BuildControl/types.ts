export interface IBuildControlProps {
  label: string,
  disabled: boolean,
  added(): void,
  removed(): void,
}