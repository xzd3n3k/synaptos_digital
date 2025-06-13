export interface NavBarLink {
  label: string;
  route: string;
  clickFunction: () => void;
  disabled?: boolean;
}
