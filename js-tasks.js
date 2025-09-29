// 1 ЧАСТЬ
// Задание 1
let num=5;
let result = num%2==0 ? console.log('Число четное') : console.log('Число нечетное');

//Задание 2
let num1=1, num2=2, num3=3;
console.log(Math.max(num1,num2,num3));

//Задание 3
let user_num1 = Number(prompt('Введите число 1: '))
let user_num2 = Number(prompt('Введите число 2: '))
let operation = prompt('Выберите операцию (+, -, /, *): ')
if (isNaN(user_num1) || isNaN(user_num2)) {
    console.log('Это не число.')
}
if (operation == '*') {console.log(user_num1*user_num2)} 
else if (operation == '-') {console.log(user_num1-user_num2)}
else if (operation == '/') if (user_num2 === 0) {
    console.log('Делить на ноль запрещено.')
} else {
    console.log(user_num1/user_num2)
}
else if (operation == '+') {console.log(user_num1+user_num2)}
else {console.log('')}

//Задание 4
let number = Number(prompt('Введите число: '))
if (isNaN(number) || number < 0 || !Number.isInteger(number)) {
    console.log('');
} else {
function factorial (n) {
    let result = 1;
    while(n>0){
        result *= n--;
    }
    return result;
}
console.log(factorial(number))
}

// 2 ЧАСТЬ

//Задание 1
const arr = [1,3,5,6]
let result = 0
for (let i=0; i<arr.length; i++) {
    result += arr[i]
}
console.log(result)

***
const arr = [1,3,5,6]
const initialValue = 0;
const sum = arr.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);
console.log(sum)

//Задание 2
const arr = [1,3,5,6,2]
let evenArr = arr.filter(function(number) {
  return number%2==0;
});
console.log(evenArr);

//Задание 3
const arr = [1,3,5,6]
arrSorted = arr.sort((a, b) => b - a);
console.log(arrSorted)

//Задание 4
const arr1 = [1,3,5,6]
const arr2 = [1,3,7,8]

let arr3 = arr1.map((item, index) => {
    return item === arr2[index] ? item : null;
});

console.log(arr3);

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
      throw new TypeError('Нет элемента для инициализации метода.');
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
        throw new TypeError('Нет элемента для инициализации метода.');
      }
    }
    for (let i = startIndex; i < arr.length; i++) {
      if (i in arr) {
        accumulator = callback(accumulator, arr[i], i, arr);
      }
    }
    
    return accumulator;
  }


// 3 ЧАСТЬ
//Задание 1
let book = new Object();
book.title = "Book"
book.author = "Book Author"
book.year = "XXXX"


//Задание 2
console.log(`Название: ${book.title}, Автор: ${book.author}`);

//Задание 3
book.year = "1XXX"

//Задание 4
book.genre = "Certain Genre";

//Задание 5
const book1 = {title: 'Book1', author: 'Author1', year: 1111};
const book2 = {title: 'Book2', author: 'Author2', year: 2222};
const book3 = {title: 'Book3', author: 'Author3', year: 3333};
const book_array = [book1, book2, book3];

function getBookTitle(arr, key) {
    let result = arr.map(obj => obj[key]);
    return result;
}

***

const book_array = [
    {title: 'Book1', author: 'Author1', year: 1111},
    {title: 'Book2', author: 'Author2', year: 2222},
    {title: 'Book3', author: 'Author3', year: 3333}
]

function getBookTitle(arr, title) {
  const result = arr.map(obj => obj.title);
  return result;
}

console.log(getBookTitle(book_array));
