// 1 ЧАСТЬ
// Задание 1
function isNumberEven(num) {
    let result = num%2==0 ? 'Число четное' : 'Число нечетное';
    return result;
    }

//Задание 2
function maxNum(num1, num2, num3) {
    let result = Math.max(num1, num2, num3)
    return result;
    }
    
//Задание 3
function mcalculator(num1, num2, operation) {
    if (isNaN(num1) || isNaN(num2)) {
      return 'Это не число.';
    }
    if (operation == '*') { return num1*num2} 
    else if (operation == '-') { return num1-num2}
    else if (operation == '/') if (num2 === 0) {
        return 'Делить на ноль запрещено.' ;
    } else {
        return num1/num2;
    }
    else if (operation == '+') { return num1+num2}
    else { return 'Такой операции нетю' };
    }

//Задание 4
function factorial(num) {
    if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
        return 'Число не подходит.';
    } else {
        let result = 1;
        while(num > 0){
            result *= num--;
        }
        return result;
    }
}

// 2 ЧАСТЬ

//Задание 1
function arraySum(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
     result += arr[i];
  }
  return result; 
}


//Задание 2
function filterEven(arr) {
  let evenArr = arr.filter(function(number) {
  return number%2==0;
});
  return evenArr;
}

//Задание 3
function sortArr(arr) {
  arrSorted = arr.sort((a, b) => b - a);
  return arrSorted;
}


//Задание 4
function mapArr(arr1, arr2) {
  let arr3 = arr1.map((item, index) => {
 return item === arr2[index] ? item : null;
 });
 return arr3;
}

//Задание 5
function map(arr, callback, thisArgument) {
    let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i in arr) { 
        let callbackResult;
        if (thisArgument) {
          callbackResult = callback.call(thisArgument, arr[i], i, arr);
        } else {
          callbackResult = callback(arr[i], i, arr);
        }
        resultArr[i] = callbackResult;
      }
    }
    return resultArr;
  }

//Задание 6
function filter(arr, callback, thisArgument) {
    let resultArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        let ifPush;
        if (thisArgument) {
          ifPush = callback.call(thisArgument, arr[i], i, arr);
        } else {
          ifPush = callback(arr[i], i, arr);
        }
        if (ifPush) {
          resultArr.push(arr[i]);
        }
      }
    }
    return resultArr;
  }

//Задание 7
function reduce(arr, callback, initialValue) {
    if (arr.length === 0 && initialValue === undefined) {
      throw new TypeError('Нет элемента для инициализации массива.');
    }
    let accumulator;
    let startIndex;
    if (initialValue !== undefined) {
      accumulator = initialValue;
      startIndex = 0;
    } else {
      let foundFirst = false;
      for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
          accumulator = arr[i];
          startIndex = i + 1;
          foundFirst = true;
          break;
        }
      }
      if (!foundFirst) {
        throw new TypeError('Нет элемента для инициализации массива.');
      }
    }
    for (let i = startIndex; i < arr.length; i++) {
      if (i in arr) {
        accumulator = callback(accumulator, arr[i], i, arr);
      }
    } return accumulator;
  }


// 3 ЧАСТЬ
//Задание 1
let book = {
  title:'Book',
  author:'Book Author',
  year:1111,
}


//Задание 2
function bookTitleAuthor(book) {
  return `Название: ${book.title}, Автор: ${book.author}`
}

//Задание 3
function changeYear(book, new_year) {
  book.year = new_year;
  return true;
}

//Задание 4
function addGenre(book, genre) {
  book.genre = genre;
  return true;
}

//Задание 5
const book_array = [
    {title: 'Book1', author: 'Author1', year: 1111},
    {title: 'Book2', author: 'Author2', year: 2222},
    {title: 'Book3', author: 'Author3', year: 3333}
]

function getBookTitle(arr) {
  const result = arr.map(obj => obj.title);
  return result;
}
