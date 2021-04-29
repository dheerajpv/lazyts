import chalk from "chalk";

/**
 * Collection of quick log functions
 */
export default {
    /**
     * Logs information message to console
     * @param message message to log
     */
    info(message: string) {
        console.log(`${chalk.blueBright("info")} ${message}`);
    },
    /**
     * Logs warning message to console
     * @param message message to log
     */
    warn(message: string) {
        console.warn(`${chalk.yellowBright("warn")} ${message}`);
    },

    /**
     * Logs error message to console
     * @param message message to log
     */
    error(message: string) {
        console.error(`${chalk.redBright("error")} ${message}`);
    },

    /**
     * Logs success message to console
     * @param message message to log
     */
    success(message: string) {
        console.log(`${chalk.greenBright("success")} ${message}`);
    },
};
