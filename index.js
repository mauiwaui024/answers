//1.разница между типами переменных var, let, const ;
//начнем с var
//легче всего объяснить на примере:
var greeter = "hey hi";

  function newFunction() {
      var hello = "hello";
  }

  //greeter находится в глобальном скопе, поэтому будет доступна на всей странице
  //hello находится в локальном скопе, поэтому будет доступна только внутри функции,
  //то есть, если мы попытаемся сделать console.log(hello) за пределами функции
  // мы получим сообщение, что hello is not defined
  //также var мы можем изменить и объявить заново, (в отличие от const)
  //Поднятие var - вот тут как раз виден недостаток var и почему сейчас люди
  //стараются использовать let
  //опять же на примере:

  var nihao = "nihao";
   var times = 4;

   if (times > 3) {
       var nihao = "nihao ma";
   }

   console.log(nihao) // получим "nihao ma", и это может вызвать проблемы в будущем


//Отличие let от var в том, что let будет замыкаться в блоке кода, то есть
// всё что закрыто фигурными скобками - это блок. Также let можно перезаписать,
//но нельзя заново объявить. Но если мы объявляем одну и ту же переменную в разных
//блоках кода - ошибки не будет



//const переменные в отличе от var и let не могут быть объявлены заново или изменены.
//хоть мы и не можем изменить саму переменную, мы можем изменять свойства объекта, например:

const boy1 = {
  name: "Вася",
  surname: "Иванов"
}

boy1.surname = "Петров";

console.log(boy1) // { name: 'Вася', surname: 'Петров' }
//const также как и let будет замыкаться в блоке кода.
//const нужно инициализировать, мы не можем написать const year , а потом уже присвоить значение







//2. первый способ копирования объекта:

//-поверхностное копирование c помощью spread оператора
const user = {
  username: "mauiwaui",
  age: 30,
  active: true,
  friends: ["Matt", "Anna", "David"]
}

const copiedUser1 = {...user}
console.log(copiedUser1); // копия оригинального user
console.log(copiedUser1.friends === user.friends); //true - это референс к массиву оригинального объекта
console.log(copiedUser1 == user); // false
//поверхностное копирование делает копию только простых типов данных таких как строка, число,
//но не делает копию сложных типов данных таких как объекты и массивы
copiedUser1.friends[0] = "Sergei"
console.log(user); // Вместо "Matt" мы получим "Sergei"


//-поверхностное копирование с помощью метода assign

const copiedUser2 = assign({}, user); // результат будет такой же как и с помощью spread синтаксиса

//- глубокое копирование осуществляет в два шага, сначала мы с помощью json.stringify() конвертируем наш
// user объект в json строку, затем передаем эту строку в json.parse() и  конвертируем в js объект.
const copiedUser3 = JSON.parse(JSON.stringify(user))
console.log(copiedUser3); // копия оригинального user
console.log(copiedUser3.friends === user.friends); //false
console.log(copiedUser3 == user); // false
//Этот способ позволяет копировать сложные типы данных внутри объекта. (надо быть осоторожным с типом Date,
// потому что при конвертации в строку, мы можем потерять данные)










//3.обработать много промисов одновременно

//с помощою chain оператора .then
//пример:
// const promiseExample = new Promise((resolve, reject)=>{
//   resolve()
// });
// promiseExample
// .then(()=>{
//   console.log("первый промис");
// })
// .then(()=>{
//   console.log("второй промис");
// })
// .then(()=>{
//   console.log("третий промис");
// })
// .catch((error)=>{
//   console.log("error", error);
// })
//в этом случае мы получим в консоли ожидаемый результат, каждый промис
//выполнится один за другим по порядку.
//Но это не означает, что так будет всегда, потому как эти действия асинхронные и порядок
//их выполнения зависит от времени исполнения кода. Например:
// const promiseExample2 = new Promise((resolve, reject)=>{
//   resolve()
// });
// promiseExample2
// .then(()=>{
//   console.log("первый промис");
// })
// .then(()=>{
//   setTimeout(()=>{
//     console.log("второй промис");
//   }, 4000)
// })
// .then(()=>{
//   setTimeout(()=>{
//     console.log("второй промис");
//   }, 2000)
// })
// .catch((error)=>{
//   console.log("error", error);
// })
//в данном примере выполнится сначала первый промис, затем трейтий, затем второй.
//В общем если время выполнения второго промиса больше, чем третьего, то третий промис
//не будет ждать выполнения второго и просто исполнится

//Чтобы код исполнялся в последовательности, в которой мы его написали, мы можем
//вернуть еще один промис из второго then хэндлера и вызвать резолв или реджект
//только после того как выполнится остальной код (это может быть запрос к Api и любой другой
//долго исполняющийся код) пример:

// const promiseExample3 = new Promise ((resolve, reject)=>{
//   resolve()
// });
//
// promiseExample3
// .then(()=>{
//   console.log("первый промис");
// })
// .then(()=>{
//   return new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//       console.log("второй промис")
//       resolve()
//     }, 4000)
//   });
// })
// .then(()=>{
//   setTimeout(()=>{
//     console.log("третий промис");
//   }, 2000)
// })


//4. в node.js есть нативная библиотека с одноименным названием HTTP, которая позволяет
//выполнять Api запросы. Также есть несколько сторонних библиотек типа Axios и request.

// 5. вычисляем длину последнего слова в строке:

let exampleSentence = "  Programmig is just my hobby, but i would like to get a job as a developper  "
let exampleSentence2 = "I'm hiding in a very remote village where no one can find me ever)"

const calculateLengthOfLastWord = (sentence)=>{
  const words = sentence.trim().split(" ")
  if(words.length > 0){
    return words[words.length - 1].length;
  }
  return 0;
}

console.log(calculateLengthOfLastWord(exampleSentence));
console.log(calculateLengthOfLastWord(exampleSentence2));
//Эта задачу я уже решал на codewors.com
