import chalk from "chalk";
import inquirer from "inquirer";
// Initialize user balance and pin code
let myBalance = 50000;
let myPin = 1234;
//print welcome message
console.log(chalk.yellowBright(" \tWelcome to the ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.cyanBright(" Enter your pin code:\n")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.greenBright(" Pin is Correct, Login successfully!\n"));
    // console.log(`Current Account Balance is ${myBalance}`)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.magenta("Select an operation:\n"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select withdrawl method:",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastcashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: "Select Amount:",
                    choices: [5000, 10000, 20000, 50000]
                }
            ]);
            if (fastcashAns > myBalance) {
                console.log(chalk.redBright("Insufficient Balance"));
            }
            else {
                myBalance -= fastcashAns.fastcash;
                console.log(`${fastcashAns.fastcash} withdraw sucessfully`),
                    console.log(`Your Remaining Balance is ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:",
                    choices: ["Enter Amount to withdraw:"]
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.redBright("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Reamining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.redBright("Your Pin is Incorrect , Try Again"));
}
