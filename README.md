# Open Source Society Manchester website

The website for the University of Manchester's Open Source Society. Plain HTML, CSS and JavaScript with no build step.

`SPEC.md` explains every decision behind the site. Read it before making big changes.


## Run it locally

Double click `index.html` and it opens in your browser. That's it.

The 404 page uses root paths, so to test it properly run a tiny local server from this folder instead.

```
python3 -m http.server
```

Then open http://localhost:8000


## Update the content

Almost everything that changes lives in `assets/js/data.js`. You shouldn't need to touch the HTML to add an event, a project, a committee member or hackathon details.

### Add an event

1. Open `assets/js/data.js` and find `events`
2. Copy an existing event block, paste it inside the list, and change the details. Dates are `YYYY-MM-DD`
3. Save, refresh the page, then commit and push

Events move from upcoming to past on their own once the date has gone.

### Fill in a missing link

Links with an empty value (`""`) are hidden on the site. Add the URL in `links` at the top of `data.js` and it appears everywhere it's used.

### Find everything that still needs doing

```
grep -rn TODO .
```


## Where things are

| File | What it's for |
|---|---|
| `index.html` | Main page |
| `hackathon.html` | Hackathon page |
| `404.html` | Page shown for broken links |
| `assets/js/data.js` | All the content that changes |
| `assets/js/main.js` | Puts `data.js` content into the pages, runs the mobile menu |
| `assets/css/style.css` | All styling. Colours and fonts are at the top |

The header and footer are copied into each HTML page. If you change one, change all of them.


## Put it online with GitHub Pages

1. Push this folder to a GitHub repo
2. In the repo go to Settings, then Pages
3. Under "Build and deployment" choose "Deploy from a branch", pick `main` and `/ (root)`, then save

After a minute the site is live at the address GitHub shows you. Then add the repo URL to `links.repo` in `data.js`, and make the `og:image` paths in the HTML full URLs so link previews work.


## Contributing

Open an issue or a pull request. Keep to the conventions in `SPEC.md` section 7 so the code stays easy for the next person.
