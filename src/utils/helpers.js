export const calculateRewardPoints = (amount) => {
    let points = 0;
    if (amount > 100) {
      points += 50; 
      points += (amount - 100) * 2;
    } else if (amount > 50) {
      points += amount - 50;
    }
    return points;
  };

export const initializeDummyData = () => {
  const dataKey = 'apiData';
  
  const existingData = localStorage.getItem(dataKey);
  
  if (existingData) {
    return;
  }
  
  const dummyData = [
    { name: 'Pooja', email: 'pooja@gmail.com', payment: '100', paymentDate: '2025-11-17' },
    { name: 'Pooja', email: 'pooja@gmail.com', payment: '150', paymentDate: '2025-11-17' },
    { name: 'Preeti', email: 'preeti@gmail.com', payment: '500', paymentDate: '2025-11-17' },
    { name: 'Shyam', email: 'shyam@gmail.com', payment: '800', paymentDate: '2025-11-11' },
    { name: 'Sarita', email: 'sarita@gmail.com', payment: '600', paymentDate: '2025-11-17' },
  ];
  
  localStorage.setItem(dataKey, JSON.stringify(dummyData));
};
  