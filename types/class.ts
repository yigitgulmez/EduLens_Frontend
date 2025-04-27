export interface ClasesResponseProps {
  id: string;
  level: number;
  branch: string;
}

export interface ListClassesProps { [key: number]: string[] }

export interface SelectProps { key: string, label: string }

export interface StudentProps {
  id: string,
  level: number,
  branch: string,
  students: {
    id: string, 
    studentImage: string,
    schoolNumber: number,
    firstName: string,
    lastName: string,
    isPresent: boolean
  }[],
  createdAt: number
}

export interface StudentComponentProps {
  id: string,
  avatar: string,
  name: string,
  number: number,
  present: boolean,
  onPresentChange: (status: StudentStatusProps) => void
}

export interface StudentStatusProps {
  studentID: string,
  isPresent: boolean
}