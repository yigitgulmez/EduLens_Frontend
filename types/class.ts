export interface ClasesResponseProps {
  id: string;
  level: number;
  branch: string;
}

export interface ListClassesProps { [key: number]: string[] }

export interface SelectProps { key: string, label: string }

export interface StudentProps { 
  id: string, 
  studentImage: string,
  schollNumber: number,
  firstName: string,
  lastName: string,
  isPresent: boolean
}

export interface StudentComponentProps {
  avatar: string,
  name: string,
  number: number,
  present: boolean
}