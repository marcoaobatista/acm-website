const url = require('url');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const http = require('http');
const process = require('process');
const WebSocket = require('ws');
const chokidar = require('chokidar');
const EventEmitter = require('events');
const { build } = require('./build');

const contentTypeHeaders = {
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html',
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
}

// create a local http server
http.createServer(async (req, res) => {
    // this is everything after http://localhost:8000
    let urlPath = url.parse(req.url).pathname;

    switch (urlPath) {        
        default:
            try {                
                if (urlPath == '/') urlPath = '/index.html';

                const ext = path.extname(urlPath);
                res.writeHead(200, { 'Content-Type': contentTypeHeaders[ext] });
                
                // some files are blobs and aren't represented as characers
                const enc = (ext == '.jpg' || ext == '.png') ? null : 'utf-8';

                let extString = await fsp.readFile(`./build${urlPath}`, { encoding: enc })
                    .catch(err => {
                        console.log(new Error(err));
                        process.exit(1);
                    });
                
                if (ext == '.html')
                {
                    // replace placeholder with hot-reload script
                    // it waits for a message from the websocket server then refreshes the page
                    extString = extString.replace(/<!-- @HOTRELOAD -->/g, `
                        <script type="application/javascript">
                            const ws = new WebSocket('ws://localhost:8001');
                            ws.onmessage = function(msg) {
                                location.reload();
                            }
                        </script>
                        `);
                }
                
                // return the response
                res.end(extString);
            } catch (error) {
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('Route not found');
            }
    }
}).listen(8000, () => {
    console.log('Server now available at http://localhost:8000');
});

// creates a WebSocket server that maintains an array of socket connections
const wss = new WebSocket.Server({ port: 8001 });
let sockets = [];
wss.on('connection', ws => {
    sockets.push(ws);

    ws.on('close', closeCode => {
        sockets = sockets.filter(socket => socket._closeCode != closeCode);
    });
});

// watch the `src` directory for changes
const watcher = chokidar.watch('src', { persistent: true })
    .on('ready', () => console.log('Initial watcher scan complete, ready for changes.'))
    .on('change', async () => {
        await build()
            .catch(err => {
                console.error(new Error(err));
                process.exit(1);
            });
        
        // the client hot-reload script will receive this message and refresh the browser
        for (const ws of sockets) {
            ws.send('refresh');
        }
    });

// watch the `content` directory for changes
watcher.add('content');