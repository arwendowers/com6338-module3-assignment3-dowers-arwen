var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]

/*

* Select a word at random
* Place that word in the #word-to-guess element with its letters
replaced with underscores
* Display 10 remaining guesses in the #remaining-guesses element

* When user presses a letter key, code shoudl check whether letter
is included in the word
* If included, should replace underscores in word with that lettter's
instances
* If not included, #word-to-guess should remain unchanged, and that
letter should be added to the #incorrect-letters element, and the 
#remaining-guesses element should have one fewer remaining guesses

* Game state should not be changed if user presses a non-letter key
or a letter already guessed
* When the user guesses the last correct letter, the #wins element
should go up by 1, and the game should proceed to the next
randomly-chosen word and reset all other elements (incorrect letters
should be blank, remaining guesses should say 10, and #previous-word
should say the previous word)
* If user uses all the guesses and loses, game should proceed the same
as above but losses goes up by 1 instead of wins

*/

var wordToGuessEl = document.getElementById("word-to-guess")
var previousWordEl = document.getElementById("previous-word")
var incorrectLettersEl = document.getElementById("incorrect-letters")
var remainingGuessesEl = document.getElementById("remaining-guesses")
var winsEl = document.getElementById("wins")
var lossesEl = document.getElementById("losses")

var wins = 0
var losses = 0
var remainingGuesses = 10

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var incorrectLetters = []

// selects a random word from the words array
var word = words[Math.floor(Math.random() * words.length)]
// displays the random word as underscores
wordToGuessEl.textContent = '_'.repeat(word.length)
remainingGuessesEl.textContent = remainingGuesses

document.onkeyup = function(e) {
  var key = e.key.toLowerCase()
  // if the user presses a non-letter key, the function returns
  if(letters.indexOf(key) == -1) return

  // splits underscores so we can edit the word display
  var currentDisplay = wordToGuessEl.textContent.split('')

  if(word.includes(key)) {
    // iterates through each letter of the word; if the guessed letter matches,
    // then it's displayed
    for (var i = 0; i < word.length; i++) {
      if (word[i] === key) {
        currentDisplay[i] = key
      }
    }
    wordToGuessEl.textContent = currentDisplay.join('')
  } else {
    // checks if the letter hasn't been guessed yet
    if (incorrectLetters.indexOf(key) === -1) {
      incorrectLetters.push(key)
      remainingGuesses--

      incorrectLettersEl.textContent = incorrectLetters.join(', ')
      remainingGuessesEl.textContent = remainingGuesses
    }
  }

  // win: if the word doesn't contain underscores, aka the word has been fully guessed
  if(wordToGuessEl.textContent.indexOf('_') === -1) {
    wins++
    winsEl.textContent = wins
    previousWordEl.textContent = word

    remainingGuesses = 10
    incorrectLetters = []

    incorrectLettersEl.textContent = ""
    remainingGuessesEl.textContent = remainingGuesses

    word = words[Math.floor(Math.random() * words.length)]
    wordToGuessEl.textContent = '_'.repeat(word.length)

    return
  }

  // loss: if remaining guesses reaches 0, you've lost the round
  if(remainingGuesses <= 0) {
    losses++
    lossesEl.textContent = losses
    previousWordEl.textContent = word

    remainingGuesses = 10
    incorrectLetters = []

    incorrectLettersEl.textContent = ""
    remainingGuessesEl.textContent = "10"

    word = words[Math.floor(Math.random() * words.length)]
    wordToGuessEl.textContent = '_'.repeat(word.length)

    return
  }
}