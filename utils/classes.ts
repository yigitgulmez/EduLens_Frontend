import { ClasesResponseProps, ListClassesProps } from "@/types/class";

const axios = require('axios');
const url = process.env.NEXT_PUBLIC_API_URL + '/v1/classes/';
const token = process.env.API_TOKEN
var data: ClasesResponseProps[] | undefined

async function fetchData(): Promise<ClasesResponseProps[]> {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
}

export const getClassList = async () => {
  data = await fetchData();
  data.sort((a, b) => a.branch.localeCompare(b.branch));
  return data.reduce((list: ListClassesProps, item: ClasesResponseProps) => {
    if (!list[item.level]) {
      list[item.level] = [];
    }
    list[item.level].push(item.branch);
    return list;
  }, {});
}

export async function getClassId(level: number | undefined, branch: string | undefined) {
  if (!data) data = await fetchData();
  const item = data.find(item => item.level === level && item.branch === branch);
  console.log("item",item);
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

