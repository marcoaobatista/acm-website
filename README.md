# Getting started

```
git clone git@github.com:acm-msu/acm-website.git
cd acm-website
npm install
```
Anytime you wanted to start making changes, run `npm run serve` and go to 
http://localhost:8000. When changes are made, your browser will refresh.

## Things you should know
* HTML5
* CSS3
* JavaScript - not strictly necessary for editing the website content
    * ES6+ features
    * Node.js standard modules
* Netlify
    * Pretty just know how to log in, view deployment status, and redeploy if 
    necessary

### Things worth mentioning
* Things have been kept very simple to allow for a low barrier of entry. For the 
next webmasters' sake, please do follow the 
[KISS principle](https://en.wikipedia.org/wiki/KISS_principle) whenever you're 
thinking about modifying the build process, for example.
* Additional tooling like bundlers are not included for the sake of simplicity.
* Try to keep the page resources light; keep an eye on how large the images are 
that you are trying to serve.
* SVG icons in `src/images/icons/` are downloaded from 
[fontawesome](https://fontawesome.com/). Additional versions of icons may need 
to be created if you want to change their color. Color can be changed with the 
`fill` attribute inside the `.svg` file.

## Development process
There are two npm scripts available to you:

### `npm run build`
Whenever a commit is pushed to the repo, Netlify (where our 
website is hosted) will automatically detect and deploy these new changes live 
to https://acm.cse.msu.edu. The `netlify.toml` file tells Netlify to run 
`npm run build` which builds the `build/` folder on the remote server, then to 
serve the `build/` folder as our static website.

### `npm run serve`
You'll pretty much want to run this whenever you're making
changes and want to view them. This will start a local http server at 
http://localhost:8000 and start watching for changes in `src/` and `content/`. 
When changes are recognized, `build/` is rebuilt and your browser client should 
refresh, showing the new changes.

The only files you'll likely need to make modifications to are ones in `src/` 
or `content/`. Everything in `src/` is copied over to `build/` on a new build 
process. Files in `content/` are used to build pages out of data, like from 
`content/events.json` and HTML in `content/events/`. How this data is used to 
build pages can be seen in `build.js`.