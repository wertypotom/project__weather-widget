export const getFromLocalStorage = (value: string) => {
  return JSON.parse(localStorage.getItem(value) as string);
};

export const setToLocalStorage = (title: string, data: any) => {
  localStorage.setItem(title, JSON.stringify(data));
};
