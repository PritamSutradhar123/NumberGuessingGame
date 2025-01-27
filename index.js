let random_number = Math.floor(Math.random() * 100);
console.log(random_number);

let iteration;
let Won = false;

document.getElementById("selectbtn").onclick = function () {
    let level = document.getElementsByName("difficulty");
    for (let i = 0; i < level.length; i++) {
        if (level[i].checked) {
            console.log(level[i].value);
            document.getElementById("Difficulty Level").style.display = "none";
            document.getElementById("Rules").style.display = "block";
            document.getElementById("announcement").style.display = "none";
            document.getElementById("selectbtn").style.display = "none";
            document.getElementById("guessbtn").style.display = "inline";
            document.getElementById("inputText").style.display = "inline";

            // Seting iterations based on difficulty
            if (level[i].value == "easy") {
                iteration = 10;
            } else if (level[i].value == "hard") {
                iteration = 5;
            } else {
                console.log(`Enter a valid difficulty level, it cannot be ${level[i].value}`);
            }
        }
    }

    async function startGame(iteration) {
        for (let i = 0; i < iteration; i++) {
            console.log(`You have ${iteration - i} chances left`);
            document.getElementById("lives").innerHTML =`You have ${iteration - i} chances left`;

            await new Promise((resolve) => {
                document.getElementById("guessbtn").onclick = function () {
                    let guess = parseInt(document.getElementById("inputText").value);
                    document.getElementById("inputText").value = "";
                    console.log(guess);

                    if (number_guesser(guess, random_number) == 1) {
                        document.getElementById("number").innerText = `You Won 😎 The correct answer was ${random_number}`;
                        console.log(`You won! The number was ${random_number}`);
                        
                        document.getElementById("restart").innerText = "Reload to Start a new game";
                        document.getElementById("Rules").style.display = "none";
                        document.getElementById("announcement").style.display = "none";
                        document.getElementById("guessbtn").style.display = "none";
                        document.getElementById("inputText").style.display = "none";
                        document.getElementById("lives").style.display = "none";
                        Won = true;
                        resolve(); // Resolve to stop waiting
                        return;    // Exit the loop
                    } else {
                        resolve(); // Resolve to proceed to the next iteration
                    }
                };
            });

            if (Won) break;
        }

        if (!Won) {
            console.log(`You lost! The number was ${random_number}`);
            document.getElementById("number").innerText = ` You Lost 😭😭The correct answer was ${random_number}`;
            document.getElementById("restart").innerText = "Reload to Start a new game";
            document.getElementById("Rules").style.display = "none";
            document.getElementById("guessbtn").style.display = "none";
            document.getElementById("inputText").style.display = "none";
            document.getElementById("lives").style.display = "none";
            document.getElementById("guessbtn").style.display = "none";
        }
    }

    startGame(iteration);
};

function number_guesser(guess, random_number) {
    if (guess > random_number) {
        document.getElementById("number").innerText = "Too High";
        console.log("Too High");
    } else if (guess < random_number) {
        document.getElementById("number").innerText = "Too Low";
        console.log("Too Low");
    }
    else{
        return 1;
    }
}
