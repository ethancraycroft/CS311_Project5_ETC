window.onload = function hideDice()
{
    document.getElementById("d1").style.visibility = 'hidden';
    document.getElementById("d2").style.visibility = 'hidden';

    turn = 0;
}

let turn = 0;
let bankBalance =  Number(document.getElementById("bankBalance").innerText);
let yourPoint = 0;
let wager = 0;

function rollDice()
{
    let sum = 0;
    document.getElementById("winner").style.background = 'none'
    wager = Number(document.getElementById("betPlaced").value);
    bankBalance = Number(document.getElementById("bankBalance").innerText);

    if(wager <= bankBalance && wager > 0 && document.getElementById("betPlaced").value !=='')
    {
        let dieOne = Math.floor(Math.random() * 6) + 1;
        let dieTwo = Math.floor(Math.random() * 6) + 1;
        document.getElementById("d1").src="img/" + dieOne + ".png";
        document.getElementById("d2").src="img/" + dieTwo + ".png";
        document.getElementById("d1").style.visibility = 'visible';
        document.getElementById("d2").style.visibility = 'visible';
        turn++; 
        sum = dieOne + dieTwo;
    }
    else if(wager > bankBalance)
    {
        alert("Wager too high! Wager cannot exceed bank balance. Try again.");
    }
    else if(document.getElementById("betPlaced").value =='' || wager == 0)
    {
        alert("Enter a wager!");
    }
    if(turn == 1)
    {
        switch(sum)
        {
            case 2:
            case 3:
            case 12:
                win();
                break;
            case 7:
            case 11:
                lose();
                break;
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
                makeYourPoint(sum);
                break;
            default: 
                break;
        }
    }
    else if(turn > 1)
    { 
        switch(sum)
        {
            case yourPoint:
                win();
                break;
            case 7:
                lose();
                break;
            default:

        }
    }
}


function lose()
{
    document.getElementById("result").innerText = "You lost!";
    bankBalance -= wager;
    document.getElementById("bankBalance").innerText = bankBalance;
    turn = 0;
}

function win()
{
    document.getElementById("result").innerHTML = "You Win!";
    bankBalance += wager;
    document.getElementById("bankBalance").innerText = bankBalance;
    turn = 0;
    document.getElementById("winner").style.backgroundImage = "url('https://c.tenor.com/ZDe0dPKLr3AAAAAi/raining-money-money.gif')"; 
}

function makeYourPoint(sum)
{
    yourPoint = sum;
    document.getElementById("result").innerText = ("Your point is " + yourPoint + ". Roll a " + yourPoint + " to win! If you roll a 7 you lose!");
}