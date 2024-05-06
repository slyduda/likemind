import { faker } from "@faker-js/faker";

export const probability = (n: number): boolean => {
  return !!n && faker.number.float() <= n;
};

export const randomIndex = (length: number): number => {
  return Math.floor(faker.number.float() * length);
};

export const randomWeightedValue = (
  min: number,
  max: number,
  weights?: number[],
) => {
  // If no weights are provided, return a random integer between min and max
  if (!weights || weights.length === 0) {
    return Math.floor(faker.number.float() * (max - min + 1)) + min;
  }

  // Pad weights array with 0s if its length is less than max - min + 1
  if (weights.length < max - min + 1) {
    weights.push(...Array(max - min + 1 - weights.length).fill(0));
  }

  // Calculate the total weight
  const totalWeight = weights.reduce((acc, val) => acc + val, 0);

  // Generate a random number between 0 and the total weight
  const randomNum = faker.number.float() * totalWeight;

  // Iterate through the weights to find the corresponding value
  let cumulativeWeight = 0;
  let selectedValue = min; // Initialize with min value
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i];
    if (randomNum <= cumulativeWeight) {
      selectedValue = min + i;
      break; // Stop once a value is selected
    }
  }

  // Ensure the selected value is not greater than max
  if (selectedValue > max) {
    selectedValue = max;
  }

  return selectedValue;
};

export const randomNonCollidingIndices = (
  length: number,
  n: number,
): number[] => {
  if (n > length) {
    throw new Error(
      "Number of indices requested exceeds the length of the list",
    );
  }

  const indices: number[] = [];
  while (indices.length < n) {
    const newIndex = Math.floor(faker.number.float() * length);
    if (!indices.includes(newIndex)) {
      indices.push(newIndex);
    }
  }
  return indices;
};

export const randomId = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let id = "";
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return id;
};
