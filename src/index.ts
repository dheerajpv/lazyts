#! /usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import cp from "child_process";
import log from "./logs";

const program = new Command("lazyts");

const version = process.env.npm_package_version!;

program
    .version(version)
    .addHelpText(
        "beforeAll",
        `lazyts v${version}\n\nlazyts is a command for lazy people to create TS projects.`
    );

program
    .command("init <name> [framework]")
    .description("Initialize a TS project. Defaults framework to 'node'")
    .action(async (name: string, framework = "node") => {
        const frameworks = await fs.readdir(
            path.join(__dirname, "../frameworks")
        );

        if (!frameworks.includes(framework)) {
            log.error(
                `framework ${framework} not recognized. Run 'npx lazyts --list' to see a list of frameworks`
            );
            process.exit(1);
        }

        const pathName = path.join(process.cwd(), name);

        try {
            if ((await fs.stat(pathName)).isDirectory()) {
                log.error(`directory '${name}' already exists`);
                process.exit(2);
            }
        } catch {}

        try {
            await fs.copy(
                path.join(__dirname, `../frameworks/${framework}`),
                pathName,
                {
                    overwrite: false,
                    errorOnExist: true,
                }
            );
            log.success("copied files");
        } catch {
            log.error("cannot copy files");
            process.exit(3);
        }

        cp.exec(`cd ${pathName} && npm init -y`, (err) => {
            if (err) {
                log.error("cannot write package.json");
                process.exit(4);
            }
        });
    });

program
    .command("setup")
    .description(
        "setup TypeScript by installing NPM packages, may require admin/root on some cases"
    )
    .action(async () => {
        log.info("installing required NPM packages...");

        const child = cp.exec(
            "npm i -g typescript nodemon ts-node @types/node tsconfig.json"
        );

        child.stdout?.on("data", (data) => {
            console.log(data.toString());
        });

        child.stderr?.on("data", (data) => {
            console.error(data);
        });

        child.on("close", (code) => {
            if (code === 0) {
                log.success("successfully installed packages");
            } else {
                log.error("error installing packages");
                log.error("see NPM's error message above");
                process.exit(1);
            }
        });
    });

program
    .command("list")
    .description("List all framwework options for init")
    .action(async () => {
        console.log("Available Framweworks:");
        (await fs.readdir(path.join(__dirname, "../frameworks"))).forEach(
            (f) => {
                console.log(`    ${f}`);
            }
        );
    });

program.parse(process.argv);
