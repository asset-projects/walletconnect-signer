export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const isEmptyObject = (obj: Object) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
