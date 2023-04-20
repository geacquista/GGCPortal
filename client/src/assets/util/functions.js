
export function createStringArray(arr, prop) {
    var result = [];
    for (var i = 0; i < arr.length; i += 1) {
       result.push(arr[i][prop]);
    }
    return result;
 }

 export function filteredList({ list, activeObject, fieldsToCheck }) {
   return list.find((item) => {
     return fieldsToCheck.every((field) => {
       return item[field] === activeObject[field];
     });
   });
 } 

 export function objectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
}