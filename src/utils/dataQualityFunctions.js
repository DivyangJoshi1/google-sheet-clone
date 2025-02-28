// Removes leading and trailing whitespace from a string
export const trim = (value) => {
    return typeof value === "string" ? value.trim() : value;
  };
  
  // Converts a string to uppercase
  export const toUpperCase = (value) => {
    return typeof value === "string" ? value.toUpperCase() : value;
  };
  
  // Converts a string to lowercase
  export const toLowerCase = (value) => {
    return typeof value === "string" ? value.toLowerCase() : value;
  };
  
  // Removes duplicate values from an array (ignores case sensitivity)
  export const removeDuplicates = (values) => {
    if (!Array.isArray(values)) return values;
    return [...new Set(values.map((v) => (typeof v === "string" ? v.trim().toLowerCase() : v)))];
  };
  
  // Finds a specific value in a dataset and replaces it with another value
  export function findAndReplace(values, findStr, replaceStr) {
    return values.map(value => value.replaceAll(findStr, replaceStr));
}
  