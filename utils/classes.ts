const axios = require('axios');
const url = 'https://localhost:8000/v1/classes';
const token = 'TOKEN';

interface ResponseItem {
  id: string;
  level: number;
  branch: string;
}

// API verisini alacak fonksiyon
async function fetchData(): Promise<ResponseItem[]> {
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

// Level'lara göre branch'leri gruplayan fonksiyon
function groupByLevel(data: ResponseItem[]): { [key: number]: string[] } {
  return data.reduce((list: { [key: number]: string[] }, item: ResponseItem) => {
    if (!list[item.level]) {
      list[item.level] = [];
    }
    list[item.level].push(item.branch);
    return list;
  }, {});
}

// Level ve branch kombinasyonlarına göre ID'leri gruplayan fonksiyon
export async function getId(level: number, branch: string): Promise<string[]> {
  const data = await fetchData();
  return data
    .filter(item => item.level === level && item.branch === branch)
    .map(item => item.id);
}

// Ana fonksiyon
export async function getClasses() {
  const data = await fetchData();

  const groupedByLevel = groupByLevel(data);
  console.log('Gruplama (Level):', groupedByLevel);

  return groupedByLevel;
}
