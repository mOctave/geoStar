// Get high score and badges info
window.onload = function() {
    /*localStorage.clear()*/
    let readouts = ["highScoreContinents"]
    for (i in readouts) {
        item = readouts[i]
        try { // Is value on page?
            if (localStorage.getItem(item) != null) { // Stored value found! Continue!
                document.getElementById(item).innerText += localStorage.getItem(item)
                console.log("Value displayed for " + item)
            } else { // No value in local storage
                document.getElementById(item).innerText += 0
                console.log("No value in local storage for " + item)
                localStorage.setItem(item, 0)
            }
        } catch { // No value on page
            console.log("No value on page for " + item)
        }
    }
    if (localStorage.getItem("badges") != null) { // Badges array found! Continue!
        badges = localStorage.getItem("badges")
        console.log("Value found for badges.")
    } else { // No value in local storage
        console.log("No value in local storage for badges.")
        localStorage.setItem("badges", "000")
    }
    displayBadges()
}

var badges = "000"
var badgeIDs = ["SEAsoned Skill", "Peak of Skill", "Continental Expert"]

function displayBadges() {
    for (i in badges) {
        console.log(i)
        console.log(badges[i])
        if (badges[i] == "1") {
            document.getElementById(badgeIDs[i]).src = "Assets/Badges/" + badgeIDs[i] + ".svg"
        }
    }
}

function randInt(min, max) { // W3 Schools Random Number Generator
    x = Math.floor(Math.random() * (max - min)) + min
    console.log("Random integer between " + min + " and " + max + ": " + x)
    return x
}

var answer = ""
var score = 0
var cluesArray = []
var answers = ["Europe", "Africa", "North America", "South America", "Asia", "Oceania", "Antarctica"]
var timeBonus = 100
var clearTime

// Play continents game
function playContinents() {
    if (answers.length < 1) {
        endContinents()
        return
    }
    document.getElementById("startButton").innerHTML = ""
    let continent = randInt(0, answers.length)
    for (i in answers) {
        document.getElementById("answerButtons").innerHTML += '<button onclick="sendAnswer(\'' + answers[i] + '\')">' + answers[i] + '</button><br>'
    }
    document.getElementById("answerButtons").innerHTML += '<button onclick="sendAnswer(\'Skip\')">Another Clue</button><br>'
    answer = answers.splice(continent, 1)
    console.log(answer)
    if (answer == "Europe") {
        cluesArray = ["I am really just an oversized peninsula.", "I am bordered by the Mediterranean Sea and the North Sea.", "I have a few rivers including the Volga, Danube, and the Ural.", "I am one of the only continents that shares a city with another continent.", "The Scandinavian mountain range is the longest mountain range in me.", "My name does not start with the letter A.", "My three tallest buildings are Federation Tower, OKO Tower, and Varso.", "The largest city completely contained within me is Moscow."]
    } else if (answer == "Africa") {
        cluesArray = ["I am the most impoverished continent.", "I am bordered by the Mediterranean Sea and the Red Sea.", "I have many rivers including the Nile, Congo, and the Niger.", "I am one of the only continents where you can find elephants in the wild.", "The Atlas mountain range is the longest mountain range in me.", "My name is less than seven letters long.", "My three tallest buildings are the Great Mosque of Algiers, the Leonardo, and Britam Tower.", "The largest city completely contained within me is Lagos.", "Scientists think humans originated in me."]
    } else if (answer == "North America") {
        cluesArray = ["I am the continent with the largest islands in the world.", "I am bordered by the Bering Sea and the Labrador Sea.", "I have many rivers including the Missouri, Mississippi, and the Yukon.", "I am one of the only continents in the so-called New World.", "The Rocky mountain range is the longest mountain range in me.", "My name contains two words.", "My three tallest buildings are the One World Trade Center, Willis Tower, and One Vanderbilt.", "The largest city completely contained within me is Mexico City."]
    } else if (answer == "South America") {
        cluesArray = ["I am the continent with the world's most famous rainforest.", "I am bordered by the Pacific Ocean and the Caribbean Sea.", "I have a few rivers including the Amazon, Paraná, and the Juruá.", "I am one of the only continents in the so-called New World.", "The Andes mountain range is the longest mountain range in me.", "My name contains two words.", "My three tallest buildings are the Gran Torre Santiago, Alvear Tower, and Parque Central Torre Officinas I.", "The largest city completely contained within me is São Paulo."]
    } else if (answer == "Asia") {
        cluesArray = ["I am the largest continent.", "I am bordered by the Sea of Okhotsk and the Arabian Sea.", "I have many rivers including the Yangtze, Yellow, and the Mekong.", "I am one of the only continents that contains part of Egypt.", "The Kunlun mountain range is the longest mountain range in me.", "My name begins with the letter A.", "My three tallest buildings are the Burj Khalifa, Shanghai Tower, and Makkah Clock Royal Tower.", "The largest city completely contained within me is Tokyo.", "I have the world's largest dam inside me."]
    } else if (answer == "Oceania") {
        cluesArray = ["I am the smallest continent.", "I am bordered by the Coral Sea and the Indian Ocean.", "I have a couple of rivers including the Murray, Murrumbidgee, and the Darling.", "I am the only continent that contains only one nation that does not entirely consist of islands.", "The Great Dividing Range is the longest mountain range in me.", "I have multiple names.", "My three tallest buildings are Q1, Eureka Skydeck, and Aurora Melbourne Central.", "The largest city completely contained within me is Sydney.", "I have the world's largest reef."]
    } else if (answer == "Antarctica") {
        cluesArray = ["I am the coldest continent.", "I am bordered by three oceans.", "I have very few rivers including the Onyx.", "I am the only continent that does not bear frogs.", "My longest mountain range includes my name in its.", "My name is more than seven letters long.", "My tallest buildings are the Long Duration Balloon Payload Preperation Buildings.", "The largest city completely contained within me is McMurdo Station.", "The south pole is located in me."]
    }
    clearTime = setTimeout(clockIncrement, 500);
    nextClue()
}

// Send answers to continents game
function sendAnswer(ans) {
    console.log("Answer passed")
    if (ans == "Skip") {
        console.log("Next Clue.")
        score -= 5
        nextClue()
    } else if (ans == answer) {
        console.log("Correct!")
        showMessage("Correct! (+100)", "green")
        score += 100
        document.getElementById("answerButtons").innerHTML = ""
        setTimeout(playContinents, 750)
    } else {
        console.log("Incorrect.....")
        showMessage("Sorry, that's incorrect. (-30)", "red")
        score -= 30
    }
}

// Provide a clue for the continents game
function nextClue() {
    document.getElementById("currentScore").innerText = "Current Score: " + score
    if (gameIsOver == false) {
        document.getElementById("clue").innerText = cluesArray.splice(randInt(0, cluesArray.length), 1)
        document.getElementById("clue").style.color = "black"
    }
}

// Show a message in any colour
function showMessage(message, colour) {
    document.getElementById("clue").innerText = message
    document.getElementById("clue").style.color = colour
    setTimeout(nextClue, 800)
}

var gameIsOver = false

// Stop the continents game
function endContinents() {
    document.getElementById("startButton").innerHTML = '<br/><a href="index.html">Home</a>'
    document.getElementById("answerButtons").innerHTML = ""
    score += timeBonus
    clearTimeout(clearTime)
    if (score > localStorage.getItem("highScoreContinents")) {
        localStorage.setItem("highScoreContinents", score)
        gameIsOver = true
        showMessage("NEW HIGH SCORE! --- " + score, "blue")
    } else {
        gameIsOver = true
        showMessage("Well done! You completed the challenge!", "green")
    }
    if (score > 700) {
        console.log("Added Badge")
        var x = []
        x = localStorage.getItem("badges")
        x = x[0] + x[1] + "1"
        console.log(x)
        localStorage.setItem("badges", x)
        console.log(localStorage.getItem("badges"))
    }
}

function clockIncrement() {
    timeBonus -= 1
}