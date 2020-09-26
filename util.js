'use strict';

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const process = require('process');


// Copy `source` directory to `target` directory. Will overwrite existing
// `target` directory by default.
// @param {string} source   Path of directory you want to copy
// @param {string} target   Path of directory where source files will be copied
async function copyDir(source, target)
{
	// Check if `source` exists and grab metadata if so.
    const sourceStats = await fsp.stat(source)
        .catch(err => logErrorAndExit(new Error(err)));

    // Check if `source` is a directory.
    if (!sourceStats.isDirectory())
    {
        logErrorAndExit(new Error(`Error: ${source} is not a directory`));
    }

    // Check if `target` exists and grab metadata if so.
    const targetStats = await fsp.stat(target)
        .catch(() => false);

    if (targetStats)
    {
        // Check if `target` is a directory.
        if (targetStats.isDirectory())
        {
            // Remove `target` directory.
            await fsp.rmdir(target, { recursive: true })
                .catch(err => logErrorAndExit(new Error(err)));
        }
    }

    // Make `target` directory.
    await fsp.mkdir(target)
        .catch(err => logErrorAndExit(new Error(err)));

    // Read items in `source`.
    const contents = await fsp.readdir(source)
        .catch(err => logErrorAndExit(new Error(err)));

    // Initialize recursive copying from `src` to `target`.
    await copyDirRec(contents, source, target);
}


// @param {array[string]}   contents    Array with contents of directory to be copied over to target
// @param {string}          source      Items to be copied
// @param {string}          target      Where items in `source` should be copied to
async function copyDirRec(contents, source, target)
{
    let itemSourcePath = '';
    let itemTargetPath = '';

    for (const item of contents)
    {
        itemSourcePath = path.join(source, item);
        itemTargetPath = path.join(target, item);

        // Get item metadata.
        const itemSourceStats = await fsp.stat(itemSourcePath)
            .catch(err => logErrorAndExit(new Error(err)));

        // Check if source item is directory.
        if (itemSourceStats.isDirectory())
        {
            // Create matching directory in `itemTargetPath`.
            await fsp.mkdir(itemTargetPath)
                .catch(err => logErrorAndExit(new Error(err)));

            // Get contents of directory in `itemSourcePath`.
            const itemContents = await fsp.readdir(itemSourcePath)
                .catch(err => logErrorAndExit(new Error(err)));

            // Proceed to copy items from new source directory.
            copyDirRec(itemContents, itemSourcePath, itemTargetPath);
        }
        else
        {
            // Copy file from `itemSourcePath` to `itemTargetPath`.
            await fsp.copyFile(itemSourcePath, itemTargetPath)
                .catch(err => logErrorAndExit(new Error(err)));
        }
    }
}


// @param {Error} err   An Error object that was initialized where the code
// failed.
function logErrorAndExit(err) {
    console.error(err);
    process.exit(1);
}


exports.copyDir = copyDir;
exports.logErrorAndExit = logErrorAndExit;
