import { StudentProps, StudentStatusProps } from "@/types/class";

const axios = require('axios');
const url = process.env.NEXT_API_URL + '/v1/attendance/';
const token = process.env.API_TOKEN
async function fetchData(id:string | undefined, date:number | undefined): Promise<StudentProps | undefined> {
  try {
    var request: string
    if (id && date) request = url+id+"?date="+date
    else request = url+id
    const response = await axios.get(request, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data
  } catch (error) {
    console.error('Hata:', error);
    return undefined;
  }
}

export async function checkDate(id: string | undefined, date: number | undefined): Promise<boolean> {
  const data = await fetchData(id, date);
  return data !== undefined;
}
export async function getStudents(id: string | undefined, date: number | undefined): Promise<StudentProps | undefined> {
  const data = await fetchData(id, date);
  return data;
}

export async function postData(endpoint: string | undefined, data:StudentStatusProps[]) {
  try { //TODO classID
    const response = await axios.post(url+endpoint, data, {
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

export async function putData(endpoint: string | undefined, data:StudentStatusProps[]) {
  try { //TODO attendenceID
    const response = await axios.put(url+endpoint, data, {
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


export async function postStudentPresents(endpoint:string | undefined, data: StudentStatusProps[]) {
  postData(endpoint, data);
}

export async function putStudentPresents(endpoint:string | undefined, data: StudentStatusProps[]) {
  putData(endpoint, data);
}