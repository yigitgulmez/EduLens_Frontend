import { StudentProps, StudentStatusProps } from "@/types/class";

const axios = require('axios');
const url = 'http://localhost:8000/v1/attendance/';
const token = process.env.API_TOKEN
// const response = [
//   {
//     id: "attandance-001",
//     level: 10,
//     branch: "A",
//     students: [
//       {
//         id: "stu-1001",
//         studentImage: "http://localhost:8000/image/1001",
//         schollNumber: 101,
//         firstName: "Ali",
//         lastName: "Kaya",
//         isPresent: true
//       },
//       {
//         id: "stu-1002",
//         studentImage: "http://localhost:8000/image/1002",
//         schollNumber: 102,
//         firstName: "Fatma",
//         lastName: "Yıldız",
//         isPresent: false
//       }
//     ],
//     createdAt: 1745269200
//   },
//   {
//     id: "attandance-002",
//     level: 11,
//     branch: "B",
//     students: [
//       {
//         id: "stu-2001",
//         studentImage: "http://localhost:8000/image/2001",
//         schollNumber: 201,
//         firstName: "Ahmet",
//         lastName: "Demir",
//         isPresent: true
//       },
//       {
//         id: "stu-2002",
//         studentImage: "http://localhost:8000/image/2002",
//         schollNumber: 202,
//         firstName: "Zeynep",
//         lastName: "Şahin",
//         isPresent: false
//       }
//     ],
//     createdAt: 1745269200
//   },
//   {
//     id: "attandance-003",
//     level: 12,
//     branch: "C",
//     students: [
//       {
//         id: "stu-3001",
//         studentImage: "http://localhost:8000/image/3001",
//         schollNumber: 301,
//         firstName: "Mert",
//         lastName: "Çelik",
//         isPresent: true
//       },
//       {
//         id: "stu-3002",
//         studentImage: "http://localhost:8000/image/3002",
//         schollNumber: 302,
//         firstName: "Elif",
//         lastName: "Arslan",
//         isPresent: true
//       }
//     ],
//     createdAt: 1745269200
//   }
// ];
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
    
    return response
    // const classItem = response.find(item => item.id === id && item.createdAt === date);
    // return classItem;
  } catch (error) {
    console.error('Hata:', error);
    return undefined;
  }
}

export async function checkDate(id: string | undefined, date: number | undefined): Promise<boolean> {
  const data = await fetchData(id, date);
  return data !== undefined;
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

export async function getStudents(id: string | undefined, date: number | undefined): Promise<StudentProps[]> {
  const data = await fetchData(id, date);
  return data ? [data] : [];
}

export async function getAttendanceID(id: string | undefined, date: number | undefined): Promise<string | undefined> {
  const data = await fetchData(id, date);
  console.log("attadance get data",data);
  return data?.id;
}

export async function postStudentPresents(endpoint:string | undefined, data: StudentStatusProps[]) {
  postData(endpoint, data);
}

export async function putStudentPresents(endpoint:string | undefined, data: StudentStatusProps[]) {
  putData(endpoint, data);
}