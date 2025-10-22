import chalk from "chalk";
export function errorMessage(message) {
    console.log(chalk.red(message));
}
export function successMessage(message) {
    console.log(chalk.blueBright(message));
}
export function warningMessage(message) {
    console.log(chalk.yellow(message));
}
