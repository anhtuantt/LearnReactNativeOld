export const compareObject = (obj1: any, obj2: any) => {
  if (!obj1 || !obj2) return false;
  return Object.entries(obj1).toString() == Object.entries(obj2).toString();
};