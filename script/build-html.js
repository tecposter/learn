#!/usr/bin/env node

const markdown = require('markdown').markdown;

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const meow = require('meow');
const chalk = require('chalk');
const util = require('util');

const glob = require('glob');

const Emitter = require('events').EventEmitter;

function run(inputDir, outputDir, emitter) {
    let globPath = path.resolve(inputDir, '**/*.md');

    glob(globPath, {follow: true}, function (err, files) {
        if (err) {
            return emitter.emit(
                'error',
                chalk.red(
                    util.format('no premission to access to this path: %s.', err.path)
                )
            );
        }
        if (!files.length) {
            return emitter.emit('error', chalk.red('No input file was found.'));
        }

        files.forEach((inputFile) => {
            let outputFile = inputFile.replace(inputDir, outputDir);
            outputFile = outputFile.replace('.md', '.html');
            render(inputFile, outputFile, emitter);
        });
    });
}

function render(inputFile, outputFile, emitter) {
    fs.readFile(inputFile, (err, data) => {
        if (err) {
            return emitter.emit('error', chalk.red(err));
        }

        mkdirp(path.dirname(outputFile), (err) => {
            let html;

            if (err) {
                return emitter.emit('error', chalk.red(err));
            }

            html = `<!DOCTYPE html><html><body><div style="width: 630px; margin: 0 auto;">${markdown.toHTML(data.toString())}</div></body></html>`

            fs.writeFile(outputFile, html, (err) => {
                if (err) {
                    return emitter.emit('error', chalk.red(err));
                }
                emitter.emit('warn', chalk.green('Wrote html to ' + outputFile));
            });
        });
    });
}

function getEmitter() {
    var emitter = new Emitter();
    emitter.on('error', function (err) {
        console.log(err);
        process.exit(1);
    });

    emitter.on('warn', function (data) {
        console.warn(data);
    });

    return emitter;
}

const baseDir = path.join(__dirname, './../');
const defaultInputDir = path.join(baseDir, 'md');
const defaultOutputDir = path.join(baseDir, 'html');


let cli = meow({
    pkg: '../package.json',
    version: '1.0',
    help: 'help'
}, {
    default: {
        'input': defaultInputDir,
        'output': defaultOutputDir
    }
});


run(cli.flags.input, cli.flags.output, getEmitter());
