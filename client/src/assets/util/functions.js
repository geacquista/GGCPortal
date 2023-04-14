
export function createStringArray(arr, prop) {
    var result = [];
    for (var i = 0; i < arr.length; i += 1) {
       result.push(arr[i][prop]);
    }
    return result;
 }