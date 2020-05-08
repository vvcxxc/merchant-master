/**
 *
 * 数组的去重
 */
export function RemoveDup(arr: Array<any>) {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) == -1) {
      hash.push(arr[i]);
    }
  }
  return hash;
}

/**
 *
 *  数组的去重（数组版）,只适用于礼品那里
*/
// export function RemoveDupArray(arr: Array<any>) {
//   var hash = [];
//   for (var i = 0; i < arr.length; i++) {
//     // if (hash.indexOf(arr[i]) == -1) {
//     //   hash.push(arr[i]);
//     // }
//   }

//   // return hash;
// }
