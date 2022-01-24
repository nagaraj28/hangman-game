let lives;
let actualAnswer;
const lifeId = document.getElementById("life-id");
const hintTxt = document.querySelector("#hint-txt");
const modalHeadingTextElement = document.querySelector(".modal-heading-txt");
const modalContainer = document.querySelector(".modal-ctnr");
const playAgainElement = document.querySelector("#play-again-btn");
let checkWin;

const setText = (selectedElement,value)=>{
    selectedElement.innerText = value;
}

const showHint = ()=>{
    setText(hintTxt,"Hint:"+actualAnswer.hint);
}
const hintButtonElement = document.querySelector("#hint-btn").addEventListener("click",showHint);



const pickSomeRandomAnswer = ()=>{
    const fruits = [{answer:"apple",hint :"red colour fruit"},{answer:"banana",hint :"yellow colour fruit"},{answer:"watermelon",hint :"water fruit"},{answer:"cherry",hint :"red colour fruit"},{answer:"mango",hint :"yellow colour fruit"}];
    const randomIndex = Math.floor(Math.random()*fruits.length);
    actualAnswer = fruits[randomIndex];
    checkWin = actualAnswer.answer.length;
}


const enableAllAlphabets = ()=>{
    const alphabetElements = document.getElementsByClassName("alpha");
    [...alphabetElements].forEach((alphabetElement)=>{
        alphabetElement.disabled = false;
    });
}
const clearHint = ()=>{
    setText(hintTxt,"");
}

const restartTheGame = ()=>{
    lives = 5;
    pickSomeRandomAnswer();
    enableAllAlphabets();
    clearHint();
    initializeEmptyAnswer(actualAnswer.answer.length);
    setText(lifeId,"Lifes ❤️: "+lives);
}
const playAgain = ()=>{
    restartTheGame();
    modalContainer.classList.toggle("hide");
}

const restartButton = document.getElementById("restart-btn").addEventListener("click",restartTheGame);

const checkLetterInAnswer = (e)=>{
    // console.log(e.target.innerText);
    const selectedLetter = e.target.innerText;
    e.target.disabled = true;
    const showingLettersIndexes = document.getElementsByClassName("item");
  if(actualAnswer.answer.toUpperCase().includes(selectedLetter)){  
      [...actualAnswer.answer.toUpperCase()].forEach((eachLetterofAnswer,index)=>{
        //   console.log(index);
        if(eachLetterofAnswer===selectedLetter){
            checkWin--;
            setText(showingLettersIndexes[index],selectedLetter);
            if(checkWin===0){
                modalContainer.classList.toggle("hide");
                setText(modalHeadingTextElement,"You Won!");
            }
        }
    });
}
else{
    if(lives>1)
    lives--;
    else{
        lives=0;
        setText(modalHeadingTextElement,"You lost!");
        modalContainer.classList.toggle("hide");
    }
    setText(lifeId,"Lifes ❤️: "+lives);
}
}


const initializeEmptyAnswer = (answerLength)=>{
    const letterContainerElement = document.getElementById("guessed-letters-container");
    letterContainerElement.textContent ='';
    for(let i=0;i<answerLength;i++){
        const letterElement = document.createElement("span");
        letterElement.className = "item";
        setText(letterElement,"_");
        letterContainerElement.appendChild(letterElement); 
    }
}

const showLetters = ()=>{
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letterContainerElement = document.getElementById("letters-container");
    for(let alphabet of alphabets){
        const letterElement = document.createElement("button");
        letterElement.className = "alpha";
        setText(letterElement,alphabet);
        letterElement.addEventListener("click",checkLetterInAnswer);
        letterContainerElement.appendChild(letterElement); 
    }
}

const loadGame = ()=>{
    //initialzing our lives
    lives = 5;
    //loads all the letters
    pickSomeRandomAnswer();
    showLetters();
    initializeEmptyAnswer(actualAnswer.answer.length);
    setText(lifeId,"Lifes ❤️: "+lives);
    modalContainer.classList.toggle("hide");
    playAgainElement.addEventListener("click",playAgain);
}

//intial loading
loadGame();
