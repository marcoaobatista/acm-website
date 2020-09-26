'use strict';

const url = require('url');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const { build } = require('./build');
const { logErrorAndExit, watchItems } = require('./util');

const contentTypeHeaders = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.ttf': 'application/x-font-ttf',
    '.otf': 'application/x-font-opentype',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.sfnt': 'application/font-sfnt',
	'.ico': 'image/vnd.microsoft.icon'
}

// Creates a local http server.
http.createServer(async (req, res) => {
    // This is everything in the URL after 'http://localhost:8000'.
    let urlPath = url.parse(req.url).pathname;

    switch (urlPath) {
        default:
            try
			{
                if (urlPath === '/') urlPath = '/index.html';

                const itemExtension = path.extname(urlPath);

				if (!contentTypeHeaders.hasOwnProperty(itemExtension))
				{
					logErrorAndExit(new Error(`The content type header is not known for requested item: ${urlPath}.`));
				}

                res.writeHead(200, { 'Content-Type': contentTypeHeaders[itemExtension] });

                // Some files are blobs and aren't represented as characers.
                const encoding = (
                    itemExtension === '.jpg' ||
                    itemExtension === '.png' ||
                    itemExtension === '.ttf' ||
                    itemExtension === '.oft' ||
                    itemExtension === '.woff' ||
                    itemExtension === '.woff2' ||
                    itemExtension === '.eot' ||
                    itemExtension === '.sfnt'
                ) ? null : 'utf-8';

                let itemContents = await fsp.readFile(`./build${urlPath}`, { encoding: encoding })
                    .catch(err => logErrorAndExit(new Error(err)));

                if (itemExtension === '.html')
                {
                    // Add hot-reload script to bottom of <body>.
                    // It waits for a message from the websocket server then
                    // refreshes the page.
                    itemContents = itemContents.replace('</body>', `
                        <script type="application/javascript">
                            const ws = new WebSocket('ws://localhost:8001');
                            ws.onmessage = function(msg) {
                                location.reload();
                            }
                        </script></body>
                        `);
                }

                // Return the response.
                res.end(itemContents);
            }
			catch (error)
			{
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end(`Route not found: ${error}`);
            }
    }
}).listen(8000, () =>
{
    console.log('Server now available at http://localhost:8000');
});

// Creates a WebSocket server that maintains an array of socket connections.
const wss = new WebSocket.Server({ port: 8001 });
let sockets = [];
wss.on('connection', ws =>
{
    sockets.push(ws);

    ws.on('close', closeCode =>
	{
    	// Removes the socket that was just closed.
        sockets = sockets.filter(socket => socket._closeCode != closeCode);
    });
});



watchItems(['src', 'content'], async (filePath) => {
    await build()
            .catch(err => logErrorAndExit(err));

    // The client hot-reload script will receive this message and
    // refresh the browser.
    for (const ws of sockets)
    {
        ws.send('refresh');
    }
});
