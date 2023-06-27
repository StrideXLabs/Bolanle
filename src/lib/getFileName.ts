export const getFileName = (path: string) => {
  const arr = path.split('/');
  const fileName = arr[arr.length - 1];
  return fileName;
};
