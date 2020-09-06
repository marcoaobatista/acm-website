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
    // check if `source` exists and grab metadata if so
    const sourceStats = await fsp.stat(source)
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });

    // check if `source` is a directory
    if (!sourceStats.isDirectory())
        throw new Error(`Error: ${source} is not a directory`);

    // check if `target` exists and grab metadata if so
    const targetStats = await fsp.stat(target)
        .catch(() => false);

    if (targetStats)
    {
        // check if `target` is a directory
        if (targetStats.isDirectory())
        {
            await fsp.rmdir(target, { recursive: true })
                .catch(err => {
                    console.error(new Error(err));
                    process.exit(1);
                });
        }
    }
    
    // Make `target` directory
    await fsp.mkdir(target)
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });
    
    // Initialize recursive copying from `src` to `target`
    const contents = await fsp.readdir(source)
        .catch(err => {
            console.error(new Error(err));
            process.exit(1);
        });

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

        // get item metaddata
        const itemSourceStats = await fsp.stat(itemSourcePath)
            .catch(err => {
                console.error(new Error(err));
                process.exit(1);
            });
        
        // check if source item is directory
        if (itemSourceStats.isDirectory())
        {
            // create matching directory in `itemTargetPath`
            await fsp.mkdir(itemTargetPath)
                .catch(err => {
                    console.error(new Error(err));
                    process.exit(1);
                });
            
            // get contents of directory in `itemSourcePath`
            const itemContents = await fsp.readdir(itemSourcePath)
                .catch(err => {
                    console.error(new Error(err));
                    process.exit(1);
                });
            
            // proceed to copy items from new source directory
            copyDirRec(itemContents, itemSourcePath, itemTargetPath);
        }
        else
        {
            // copy file from `itemSourcePath` to `itemTargetPath`
            await fsp.copyFile(itemSourcePath, itemTargetPath)
                .catch(err => {
                    console.error(new Error(err));
                    process.exit(1);
                });
        }
    }
}


exports.copyDir = copyDir;