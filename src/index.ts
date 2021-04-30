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

program.option("-l --list", "list all framework options").action(async () => {
    const { list } = program.opts();
    if (list) {
        console.log("Available Framweworks:");
        (await fs.readdir(path.join(__dirname, "../frameworks"))).forEach(
            (f) => {
                console.log(`    ${f}`);
            }
        );
    } else {
        console.log(program.help());
    }
});

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

program.parse(process.argv);
