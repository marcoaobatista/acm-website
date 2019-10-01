### Site
[https://acm.cse.msu.edu/](https://acm.cse.msu.edu/)


## Getting started

`npm install`: This will install all dependencies required for the project in 
the node_modules folder.

Have a look at ./testing.html as a reference for the color palette.

### NPM Commands

`npm run sass`: Monitors the sass folder for any changes, and outputs 
./dist/css/index.css.

`npm run lambda-serve`: Builds the serverless functions in `functions/` into `compiled/`, and runs a local server (usually on port 9000) which you can use to test the compiled functions locally.

`npm run lambda-buid`: Builds the serverless functions in `functions/` into `compiled/`. This command is run by Netlify when deploying the site, which will generate the compiled functions on the remote server.

### Possible issues you might run into

**Images not loading in:** If images are not being loaded in, this might be due 
to you running the website on a local server. In order to view the images 
(brought in from imgur), you'll need to change the url from 127.0.0.1 to 
localhost, or possibly vise versa (your port may vary). I believe this is due 
to imgur blocking local requests by default, so keep that in mind when making 
changes.

**CORS-related error:** If you are running `lambda-serve` and viewing `dist/index.html` locally, you might run into an error that disallows you from sending a request to the local web server. This is simply a security measure placed by the browser, and a way to get around it is by using Chrome with security features disabled (https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/)

### Things you should know

#### Frontend
* General HTML/CSS: https://internetingishard.com/
* CSS BEM architecture: http://getbem.com/
* Sass: https://sass-lang.com/
* JavaScript for browsers (<ES6)

#### Backend
* JavaScript for Node.js (ES6+)
* Familiarity with Node.js environment and base modules (https://www.youtube.com/watch?v=fBNz5xF-Kx4)
* Know how web servers work
* Netlify serverless functions: https://www.netlify.com/docs/functions/
* MongoDB and connecting to a database (https://www.youtube.com/watch?v=-56x56UppqQ)
* Environment variables and dotenv (https://github.com/motdotla/dotenv)
* Familiarity with creating HTTP CRUD (Create, Read, Update, Delete) operations on database elements
* Familiarity with Postman for testing HTTP routes (https://www.getpostman.com/)
* Familiarity with JSON Web Token (JWT) authentication process (https://jwt.io/)

#### DevOps
* Knowing your way around Netlify and how to deploy

## Testing
[![BrowserStack Image](https://i.imgur.com/pR72Nni.png)](http://github.com)

Proudly using BrowserStack to perform cross-browser testing. I think it's important to make websites [progressively enhanced](https://adamsilver.io/articles/progressively-enhanced-javascript/), and BrowserStack is the perfect solution.
