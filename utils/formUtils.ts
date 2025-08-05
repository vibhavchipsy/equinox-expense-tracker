export const resetForm = <T extends object>(initialState: T): T => {
    return JSON.parse(JSON.stringify(initialState));
  };
  
  export const isEmpty = (value: string | number) => {
    return value === '' || value === null || value === undefined;
  };
  