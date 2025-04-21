import { ClasesResponseProps, ListClassesProps } from "@/types/class";

const axios = require('axios');
const url = 'https://localhost:8000/v1/classes';
const token = process.env.API_TOKEN

// async function fetchData(): Promise<ClasesResponseProps[]> {
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Hata:', error);
//     throw error;
//   }
// }

const data = [
  { "id": "class-001", "level": 10, "branch": "A" },
  { "id": "class-003", "level": 12, "branch": "C" },
  { "id": "3", "level": 10, "branch": "E" },
  { "id": "class-002", "level": 11, "branch": "B" },
  { "id": "5", "level": 10, "branch": "B" },
  { "id": "6", "level": 9, "branch": "P" },
  { "id": "7", "level": 11, "branch": "F" },
  { "id": "8", "level": 9, "branch": "X" },
  { "id": "9", "level": 9, "branch": "C" },
  { "id": "10", "level": 11, "branch": "J" },
  { "id": "11", "level": 11, "branch": "K" },
  { "id": "12", "level": 12, "branch": "J" },
  { "id": "13", "level": 9, "branch": "R" },
  { "id": "14", "level": 10, "branch": "K" },
  { "id": "15", "level": 12, "branch": "S" },
  { "id": "16", "level": 11, "branch": "W" },
  { "id": "17", "level": 9, "branch": "D" },
  { "id": "18", "level": 12, "branch": "W" },
  { "id": "19", "level": 9, "branch": "N" },
  { "id": "20", "level": 9, "branch": "W" }
]

export const getClassList = async () => {
  //await fetchData();
  return data.reduce((list: ListClassesProps, item: ClasesResponseProps) => {
    if (!list[item.level]) {
      list[item.level] = [];
    }
    list[item.level].push(item.branch);
    return list;
  }, {});
}

export async function getId(level: number | undefined, branch: string | undefined) {
  // const data = await fetchData();
  const item = data.find(item => item.level === level && item.branch === branch);
  
  return item ? item.id : "";
}

export function getClasses(classList: ListClassesProps | undefined) {
  if (!classList) return [];

  return Object.keys(classList).map(key => ({
    key: key,
    label: key
  }));
} 

export function getBranchs(selectedClass: number | undefined, classList: ListClassesProps | undefined) {
  if (!selectedClass) return [];
  const selectedClassValues = classList ? classList[selectedClass]: undefined;

  if (!selectedClassValues) return [];

  return selectedClassValues.map(value => ({
    key: value,
    label: value,
  }));
}

