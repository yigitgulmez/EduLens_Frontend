import { StudentProps, StudentStatusProps } from "@/types/class";

const axios = require('axios');
const url = 'http://localhost:8000/v1/attendance/';
const token = process.env.API_TOKEN
// const response = [
//   {
//     id: "class-001",
//     level: 10,
//     branch: "A",
//     students: [
//       {
//         id: "stu-1001",
//         studentImage: "http://localhost:8000/image/1001",
//         schoolNumber: 101,
//         firstName: "Ali",
//         lastName: "Kaya",
//         isPresent: true
//       },
//       {
//         id: "stu-1002",
//         studentImage: "http://localhost:8000/image/1002",
//         schoolNumber: 102,
//         firstName: "Fatma",
//         lastName: "Yıldız",
//         isPresent: false
//       }
//     ],
//     createdAt: 1745625600000
//   },
//   {
//     id: "class-002",
//     level: 11,
//     branch: "B",
//     students: [
//       {
//         id: "stu-2001",
//         studentImage: "http://localhost:8000/image/2001",
//         schoolNumber: 201,
//         firstName: "Ahmet",
//         lastName: "Demir",
//         isPresent: true
//       },
//       {
//         id: "stu-2002",
//         studentImage: "http://localhost:8000/image/2002",
//         schoolNumber: 202,
//         firstName: "Zeynep",
//         lastName: "Şahin",
//         isPresent: false
//       }
//     ],
//     createdAt: 1745625600000
//   },
//   {
//     id: "class-003",
//     level: 12,
//     branch: "C",
//     students: [
//       {
//         id: "stu-3001",
//         studentImage: "http://localhost:8000/image/3001",
//         schoolNumber: 301,
//         firstName: "Mert",
//         lastName: "Çelik",
//         isPresent: true
//       },
//       {
//         id: "stu-3002",
//         studentImage: "http://localhost:8000/image/3002",
//         schoolNumber: 302,
//         firstName: "Elif",
//         lastName: "Arslan",
//         isPresent: true
//       }
//     ],
//     createdAt: 1745625600000
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
    
    return response.data
    // const classItem = response.find(item => item.id === id && item.createdAt === 1745625600000);
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

export async function getStudents(id: string | undefined, date: number | undefined): Promise<StudentProps | undefined> {
  const data = await fetchData(id, date);
  return data;
}

export async function getAttendanceID(id: string | undefined, date: number | undefined): Promise<string | undefined> {
  try {
    const data = await fetchData(id, date);
    console.log("attendance get data", data);
    return data?.id;
    console.log("attandanteData: ", data);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return undefined;
  }
}


export async function postStudentPresents(endpoint:string | undefined, data: StudentStatusProps[]) {
  postData(endpoint, data);
}

export async function putStudentPresents(endpoint:string | undefined, data: StudentStatusProps[]) {
  putData(endpoint, data);
}