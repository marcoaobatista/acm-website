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


// Watches directories/files and runs `watchAction` on any changes to them.
// Directories are watched recursively by default.
// @param {array[string]}   items
// @param {function}        watchAction
async function watchItems(items, watchAction)
{
	for (const item of items)
	{
        // Get `item` metadata.
        const itemStats = await fsp.stat(item)
			.catch(err => logErrorAndExit(new Error(err)));

		if (itemStats.isDirectory())
		{
            // Read contents in `item`.
            const itemContents = await fsp.readdir(item)
				.then(contents => contents.map(content => path.join(item, content)))
				.catch(err => logErrorAndExit(new Error(err)));

			await watchItems(itemContents, watchAction);
		}
		else
		{
            // Why are all are these `modified` statements necessary?
            // The main reason is because implemenations of `fs.watch` are 
            // different on all platforms, and sometimes when a watched file is 
            // modified, more than one "change" event will be emitted. To 
            // prevent `watchAction` from being called more than once in a 
            // short period of time, there is a grace period of 1 second. This 
            // pretty much means that if you modify a file twice within a 
            // single second, `watchAction` will only be called once.
            
            let modified = false;
			
			fs.watch(item, async () => {
				if (modified) return;
				modified = true;
				
				setTimeout(() => {
					modified = false;
				}, 1000);
		
				await watchAction(item);
			})
				.on('error', err => logErrorAndExit(err));
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
exports.watchItems = watchItems;
