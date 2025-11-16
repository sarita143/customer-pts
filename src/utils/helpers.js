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
  