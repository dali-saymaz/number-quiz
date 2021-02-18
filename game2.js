const question = document.getElementById("question");
// Array.from() secenekleri bir diziye donusturmek icin kullandim // burada 4 ayri sik elde etmis oluyoruz
// https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Global_Objects/Array/from
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices)
let currentQuestion = {};//ekrana yazilan soru her sorudan sonra gelen yeni soruyu temsil eder obje kullandik soru ve 4 sikki var
let acceptingAnswers = false;
let score = 0;//
let questionCounter = 0;
let availableQuesions = [];//bunu kullanmamim nedeni sorulan sorulari asil datadan siliyoruz ve hic sorulmamis soru gelmesini sagliyoruz

let questions = [
  {
    question: "1*5 bu iki rakamin carpimi nedir",
    choice1: "5",
    choice2: "67",
    choice3: "77",
    choice4: "10",
    answer: 1
  },
  {
    question: "2*5 bu iki rakamin carpimi nedir",
    choice1: "5",
    choice2: "67",
    choice3: "10",
    choice4: "10",
    answer: 3
  },
  {
    question: "3*5 bu iki rakamin carpimi nedir",
    choice1: "5",
    choice2: "67",
    choice3: "77",
    choice4: "15",
    answer: 4
  }
];
//CONSTANTS sabit degiskenler
const CORRECT_BONUS = 10;//dogru sorunun puan degeri
const MAX_QUESTIONS = 3;//kac soru sorulacak


// oyunu baslatiyoruz
startgame = () => {
  score = 0;
  questionCounter = 0;//kacinci soruda oldugu
  availableQuesions = [...questions];//Spread Operator (...)  bir dizi içerisindeki elemanları tek seferde elde etmek ya da bir başka deyişle yazdırmak için Spread operatörü kullanılmaktadır
  console.log(availableQuesions)
  getNewQuestion();
}

// yeni soru olusturma kismi
getNewQuestion = () => {

  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //soru bittiginde yani data kalmadiginda soru sormayi birakip end.html yonlendirme yapiyoruz
    return window.location.assign("/end.html");
  }


  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);//kalan sorulardan birini almak icin
  currentQuestion = availableQuesions[questionIndex]
  question.innerText = currentQuestion.question;

//sorunun seceneklerini alip yazdirma kismi
  choices.forEach(choice=>{
    const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
  });
  availableQuesions.splice(questionIndex, 1);//var olan datadan sorulan sorulari cikartiyoruz
  acceptingAnswers = true;//sorunun doğru yanlıs sorgulaması yapılması
}



choices.forEach(choice => {
  choice.addEventListener("click",e=>{
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoise = e.target;//tıklanan seceneğ, aktarıyoruz
    const selectedAnswer = selectedChoise.dataset['number'];//burada dataset ile choise un numarası alınıyor

    //bu kisim secilen sik dogru ise yesil yanlissa kirmizi renk veriyor correct ve incorrecte css yazdim
    const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 1000);//settimeout koymamin sebebi hemen ekrandan kayboluyor 1 saniye ekranda durum gozukmesi icin
  })
});

  

startgame();