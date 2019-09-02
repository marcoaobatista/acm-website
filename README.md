## Getting started

`npm install`: This will install all dependencies required for the project in 
the node_modules folder.

Have a look at ./testing.html as a reference for the color palette.

### NPM Commands

`npm run sass`: Monitors the sass folder for any changes, and outputs 
./dist/css/index.css.

### Possible issues you might run into

**Images not loading in:** If images are not being loaded in, this might be due 
to you running the website on a local server. In order to view the images 
(brought in from imgur), you'll need to change the url from 127.0.0.1 to 
localhost, or possibly vise versa (your port may vary). I believe this is due 
to imgur blocking local requests by default, so keep that in mind when making 
changes.