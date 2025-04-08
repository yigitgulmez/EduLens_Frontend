export interface ApiResponseItem {
  id: string;
  level: number;
  branch: string;
}

export interface ListClassesType { [key: number]: string[] }

export interface SelectProps { key: string, label: string }