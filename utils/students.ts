import { StudentProps, StudentStatusProps } from "@/types/class";

const axios = require('axios');
const url = 'https://localhost:8000/v1/attendance';
const token = process.env.API_TOKEN

async function fetchData(id:string | undefined, date:number | undefined): Promise<StudentProps[]> {
  try {
    // const response = await axios.get(url+id+"?date="+date, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
    const response = [
      {
        id: "class-001",
        level: 10,
        branch: "A",
        students: [
          {
            id: "stu-1001",
            studentImage: "http://localhost:8000/image/1001",
            schollNumber: 101,
            firstName: "Ali",
            lastName: "Kaya",
            isPresent: true
          },
          {
            id: "stu-1002",
            studentImage: "http://localhost:8000/image/1002",
            schollNumber: 102,
            firstName: "Fatma",
            lastName: "Yıldız",
            isPresent: false
          }
        ],
        createdAt: 1713700100
      },
      {
        id: "class-002",
        level: 11,
        branch: "B",
        students: [
          {
            id: "stu-2001",
            studentImage: "http://localhost:8000/image/2001",
            schollNumber: 201,
            firstName: "Ahmet",
            lastName: "Demir",
            isPresent: true
          },
          {
            id: "stu-2002",
            studentImage: "http://localhost:8000/image/2002",
            schollNumber: 202,
            firstName: "Zeynep",
            lastName: "Şahin",
            isPresent: false
          }
        ],
        createdAt: 1713700100
      },
      {
        id: "class-003",
        level: 12,
        branch: "C",
        students: [
          {
            id: "stu-3001",
            studentImage: "http://localhost:8000/image/3001",
            schollNumber: 301,
            firstName: "Mert",
            lastName: "Çelik",
            isPresent: true
          },
          {
            id: "stu-3002",
            studentImage: "http://localhost:8000/image/3002",
            schollNumber: 302,
            firstName: "Elif",
            lastName: "Arslan",
            isPresent: true
          }
        ],
        createdAt: 1713700100
      }
    ];
    
    // return response.data.students;
    const classItem = response.find(item => item.id === id && item.createdAt === date);
    return classItem?.students ?? [];
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
}

async function sendData(data:StudentStatusProps[]) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
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
  return data;
}

export async function  postStudentPresents(data: StudentStatusProps[]) {
  sendData(data);
}