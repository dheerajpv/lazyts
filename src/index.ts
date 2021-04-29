#! /usr/bin/env node

import fs from "fs/promises";
import path from "path";
import cp from "child_process";

import { Command } from "commander";
import log from "./logs";

const program = new Command("lazyts");

program
    .version("0.0.1")
    .addHelpText(
        "beforeAll",
        "lazyts is a command for lazy people to create TS projects."
    );

program
    .command("init <name> [framework]")
    .description("Initializes a TS project.")
    .action(async (name: string) => {
        const pathName = path.join(process.cwd(), name);

        try {
            if ((await fs.stat(pathName)).isDirectory()) {
                log.error(`directory '${name}' already exists.`);
                process.exit(1);
            }
        } catch {}

        try {
            await fs.mkdir(pathName);
        } catch {
            log.error("error creating directory.");
            process.exit(2);
        }

        log.success("successfully created directory");

        try {
            await fs.mkdir(path.join(pathName, "src"));
            await fs.writeFile(
                path.join(pathName, "src", "index.ts"),
                'console.log("Hello, World!");'
            );
            log.success("created src/index.ts");

            await fs.copyFile(
                "tsconfig.json",
                path.join(pathName, "tsconfig.json")
            );
            log.success("wrote tsconfig.json");

            cp.exec(`cd ${pathName} && npm init -y`);
            log.success("wrote package.json");
        } catch {
            log.error("error writing files.");
            process.exit(3);
        }
    });

program.parse(process.argv);
