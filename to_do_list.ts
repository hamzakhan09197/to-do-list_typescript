import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import showBanner from "node-banner";

let todos: string[] = [];

let time = (time = 2000) => new Promise((r) => (setTimeout(r, time)));
async function myBanner(): Promise<void> {
    showBanner('TO-DO LIST',
        'You can add to-do , delete to-do, show to-do')

}



async function options(): Promise<{ userOptions: string }> {
    let { userOptions } = await inquirer.prompt({
        name: "userOptions",
        type: "list",
        choices: ["Add To-Do", "Remove To-Do", "Display All To-Do"],
        message: chalk.rgb(181, 114, 94)("What do you want to do ?")
    })



    return { userOptions }

}



async function addToDo() {
    while (true) {
        let { addtodo } = await inquirer.prompt({
            name: "addtodo",
            type: "input",
            message: chalk.rgb(181, 114, 94)("Enter To-do")

        })

        let spinner = createSpinner(chalk.magenta('       Adding To-Do...\n<<<<-----Please Wait----->>>>')).start()
        await time()
        let input = await addtodo;
        if (input.trim()) {
            todos.push(input);
            spinner.success({ text: chalk.greenBright("To Do Added Successfully") });
            break;
        } else {
            spinner.error({ text: chalk.redBright("Dont use Only spaces") })

        }

    }


}



async function removeToDo() {
    if (!todos.length) {
        console.log(chalk.redBright("todos not found!"));
        return
    }
    let { deleteTodo } = await inquirer.prompt({
        name: "deleteTodo",
        type: "list",
        choices: todos,
        message: chalk.rgb(181, 114, 94)("Select To-do")

    })
    let spinner = createSpinner(chalk.magenta('       Removing To-Do...\n<<<<-----Please Wait----->>>>')).start()
    await time()

    if (deleteTodo) {
        let indexToremove = todos.findIndex(todo => todo === deleteTodo);
        if (indexToremove !== -1) {
            todos.splice(indexToremove, 1)
            spinner.success({ text: chalk.greenBright("To Do Removed Successfully.") });
        }

    } else {
        console.log("no todo avalible");

    }
}



async function userConfirm(): Promise<{ confirmUser: boolean }> {
    let { confirmUser } = await inquirer.prompt({
        name: "confirmUser",
        type: "confirm",
        message: "Do you want to complete and remove todo?",

    })
    return { confirmUser }

}


async function displayToDo() {
    if (!todos.length) {
        console.log(chalk.redBright("todos not found!"));
        return
    }
    let { displayTodo } = await inquirer.prompt({
        name: "displayTodo",
        type: "list",
        choices: todos,
        message: "select Todo"
    })

    if (displayTodo) {
        let indexTodidplay = todos.findIndex(todo => todo === displayTodo);
        if (displayTodo !== -1) {
            let { confirmUser } = await userConfirm();

            todos.splice(indexTodidplay, 1)

            if (confirmUser) {
                let spinner = createSpinner(chalk.magenta('      Completing and Removing To-Do...\n     <<<<-----Please Wait----->>>>')).start()
                await time()
                spinner.success({ text: chalk.greenBright(`Your todo completed successfully and removed.`) });

            } else {
                console.log(chalk.redBright("Your todo is safe."));

            }
        }
    }
}


async function userExit(): Promise<boolean> {
    let { exit } = await inquirer.prompt({
        name: "exit",
        type: "confirm",
        default: false,
        message: chalk.rgb(191, 155, 82)("Do you want to Exit?")
    });

    return exit
}
    

async function todoFunction(): Promise<void> {
    await myBanner();
    await time(1000);
    let exit = true;
    while (exit) {
        let { userOptions } = await options();

        if (userOptions === "Add To-Do")
            await addToDo();

        if (userOptions === "Remove To-Do")
            await removeToDo();
        if (userOptions === "Display All To-Do")
            await displayToDo()

        let playAgain = await userExit();
        exit = !playAgain;
        console.log(chalk.whiteBright(`\n======================================================\n`));
    }

}

todoFunction(); 
 