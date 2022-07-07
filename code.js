let textArea = document.getElementById("text");
let results = document.getElementById("results");

// Your Code Here.

// Object to store the user's input as properties
let result = {
    text: "",
    vowels: {
        a: 0,
        e: 0,
        i: 0,
        o: 0,
        u: 0
    },
    punctuation: {
        period: 0,
        comma: 0,
        exclamation: 0,
        questionMark: 0
    },
    numCharacters: 0,
    numWords: 0,
    longestWord: "",
    shortestWord: "",
    lastThreeWords: [],
    waldoIndexes: [],
}

// Event listener to obtain the user's inputs when a 'keyup' is registered in the text area
document.addEventListener("keyup", callBack)

// Creating the HTML elements for the web page in JavaScript
let titleDiv = document.createElement("h2")
titleDiv.setAttribute('class', 'title-section')
titleDiv.innerHTML = `Text Analysis`

let boxDiv = document.createElement("div")
boxDiv.setAttribute('class', 'box-flex')

let leftDiv = document.createElement("div")
leftDiv.setAttribute('class', 'left-section')
leftDiv.innerHTML = `
    <h4>Vowel Counts</h4>
    a: ${result.vowels.a} </br>
    e: ${result.vowels.e} </br>
    i: ${result.vowels.i} </br>
    o: ${result.vowels.o} </br>
    u: ${result.vowels.u} </br>
    <h4>Punctuation Counts</h4>
    Periods: ${result.punctuation.period} </br>
    Commas: ${result.punctuation.comma} </br>
    Question Marks: ${result.punctuation.questionMark} </br>
    Exclamation Points: ${result.punctuation.exclamation} </br>
    `

let rightDiv = document.createElement("div")
rightDiv.setAttribute('class', 'right-section')
rightDiv.innerHTML = `
    Number of Characters: ${result.numCharacters} </br></br>
    Number of Words: ${result.numWords} </br></br>
    Longest Word: ${result.longestWord} </br></br>
    Shortest Word: ${result.shortestWord} </br></br>
    Last Three Words: ${result.lastThreeWords} </br></br>
    Waldo Indexes: [${result.waldoIndexes}]
    `

boxDiv.append(leftDiv, rightDiv)

// Call back function initialized when event listener triggers; the user performs a 'keyup' in the text area
function callBack() {
    result.text = textArea.value // Accessing the user's input in the text area and holding that information in the 'text' property in the 'result' object

    let lowerCharacters = result.text.toLowerCase() // .toLowerCase() to ensure count includes capitalized characters too

    // Counting the user's vowel occurrences
    let userVowelA = lowerCharacters.split('a')
    let userVowelE = lowerCharacters.split('e')
    let userVowelI = lowerCharacters.split('i')
    let userVowelO = lowerCharacters.split('o')
    let userVowelU = lowerCharacters.split('u')

    result.vowels.a = userVowelA.length - 1
    result.vowels.e = userVowelE.length - 1
    result.vowels.i = userVowelI.length - 1
    result.vowels.o = userVowelO.length - 1
    result.vowels.u = userVowelU.length - 1

    // Counting the user's punctuation occurrences
    let userPeriod = result.text.split('.')
    let userComma = result.text.split(',')
    let userQuestionMark = result.text.split('?')
    let userExclamation = result.text.split('!')

    result.punctuation.period = userPeriod.length - 1
    result.punctuation.comma = userComma.length - 1
    result.punctuation.questionMark = userQuestionMark.length - 1
    result.punctuation.exclamation = userExclamation.length - 1

    // Updating data of the information in the left section
    leftDiv.innerHTML = `
        <h4>Vowel Counts</h4>
        a: ${result.vowels.a} </br>
        e: ${result.vowels.e} </br>
        i: ${result.vowels.i} </br>
        o: ${result.vowels.o} </br>
        u: ${result.vowels.u} </br>
        <h4>Punctuation Counts</h4>
        Periods: ${result.punctuation.period} </br>
        Commas: ${result.punctuation.comma} </br>
        Question Marks: ${result.punctuation.questionMark} </br>
        Exclamation Points: ${result.punctuation.exclamation} </br>
        `

    // Counting the user's amount of characters
    let userCharacter = result.text.split('')
    result.numCharacters = userCharacter.length

    // Counting the user's amount of words
    let prepWords = result.text.replace(/  +/g, ' ') // To account for double spaces; changes into single space
    let userWords = prepWords.replace(/[.,?!]/g, '').trim().split(' ') // To replace punctuations with an empty string; trims whitespace from string; splits string at single space to obtain the words
    result.numWords = userWords.length

    // The user's longest and shortest words
    result.longestWord = userWords[0]
    result.shortestWord = userWords[0]

    for (index = 0; index < userWords.length; index += 1) {
        if (userWords[index].length > result.longestWord.length) {
            result.longestWord = userWords[index]
        }
        if (userWords[index].length < result.shortestWord.length) {
            result.shortestWord = userWords[index]
        }
    }

    // The user's last three words
    let lastWordOne = userWords[userWords.length - 3]
    let lastWordTwo = userWords[userWords.length - 2]
    let lastWordThree = userWords[userWords.length - 1]

    if (userWords.length === 1) {
        result.lastThreeWords = [userWords[0]]
    } else if (userWords.length === 2) {
        result.lastThreeWords = [userWords[0], userWords[1]]
    } else {
        result.lastThreeWords = [lastWordOne, lastWordTwo, lastWordThree]
    }

    // Index of when the user inputs 'Waldo', case-insensitive
    let searchTerm = 'waldo'
    let indexPrevious

    if (result.waldoIndexes.length === 0) {
        indexPrevious = lowerCharacters.indexOf(searchTerm)
    }

    if (result.waldoIndexes.length > 0) {
        indexPrevious = lowerCharacters.indexOf(searchTerm, (result.waldoIndexes[result.waldoIndexes.length - 1] + 1))
    }

    while (indexPrevious !== -1) {
        result.waldoIndexes.push(indexPrevious)
        indexPrevious = lowerCharacters.indexOf(searchTerm, (indexPrevious + 1))
    }

    // Updating data of the information in the right section
    rightDiv.innerHTML = `
        Number of Characters: ${result.numCharacters} </br></br>
        Number of Words: ${result.numWords} </br></br>
        Longest Word: ${result.longestWord} </br></br>
        Shortest Word: ${result.shortestWord} </br></br>
        Last Three Words: ${result.lastThreeWords} </br></br>
        Waldo Indexes: [${result.waldoIndexes}]
        `
}

results.append(titleDiv)

results.append(boxDiv)

// Test: Hello! Welcome to Kenzie.  My name is Robert, and I'm here with my friend Waldo.  Have you met waldo?
