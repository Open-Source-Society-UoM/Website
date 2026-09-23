# Open Source Society Manchester website spec

Version 0.3 (23 Sep 2026). Milestones 1 to 5 are built and the site is live on GitHub Pages. Owner is Tanish Patel (Vice President).

## How to use this file

This file is the single source of truth for the site. A new build session should read this file, build one milestone from section 9, then update the decisions log in section 11.

Start a session by uploading this file plus the hackathon logo and saying which milestone to build. Keep sessions to one milestone each so they stay small and cheap.

If something here is wrong or out of date, fix this file first, then the code.


## 1. Goal and audience

The site has three jobs, in priority order.

1. Get a curious student into the Discord and signed up as a member within one visit
2. Show what's coming up (events, and the hackathon)
3. Give sponsors and the Students' Union a credible, simple place to point people to

Audience is Manchester students of any course and any skill level, plus a small number of sponsors and alumni. Most visitors arrive on a phone from the Instagram bio or a QR code on a poster, so mobile comes first.


## 2. Stack and hosting

| Choice | Decision | Why |
|---|---|---|
| Languages | Plain HTML, CSS and vanilla JavaScript | Anyone on the committee can edit it, now and in three years |
| Build step | None | No npm, no bundler, no framework. You open `index.html` in a browser and it works |
| Hosting | GitHub Pages | Free static hosting straight from a GitHub repo, fits an open source society |
| Content that changes often | One file, `assets/js/data.js` | Events, projects, committee and sponsors live here so edits never touch layout code |
| Fonts | Google Fonts | Free and open licence |

A "static site" means the server just sends fixed files, there is no database or backend. A "build step" is a tool that transforms source code before it can run, which we are deliberately avoiding.

Text that rarely changes (about, what we do, FAQ) is written straight into the HTML. Only the lists above go in `data.js`. This keeps the page readable without JavaScript for the parts that matter most.

`data.js` is a normal script (not JSON loaded with `fetch`) so the site still works when opened by double clicking the file locally.


## 3. File structure

```
/
├── index.html            main page, all society sections
├── hackathon.html        hackathon page
├── 404.html              not found page (GitHub Pages uses this automatically)
├── README.md             how to run locally and how to edit content
├── SPEC.md               this file
└── assets/
    ├── css/
    │   └── style.css     one stylesheet for the whole site
    ├── js/
    │   ├── data.js       ALL frequently edited content
    │   └── main.js       renders data.js into the page, nav toggle
    └── img/
        ├── hackathon-logo.png   transparent PNG made from the JPEG, want an SVG
        ├── favicon.png
        └── og-image.png         preview image for link sharing
```

No other folders unless this spec is updated first.


## 4. Pages and sections

### 4.1 `index.html`

Sections in page order. Each has an `id` so the nav can link to it.

| id | Section | Content | Source |
|---|---|---|---|
| `top` | Header | Society name, nav links (About, Events, Hackathon, Projects, Join), mobile menu button | HTML |
| `hero` | Hero | Name, "University of Manchester", one sentence on what we do, two buttons ("Join the Discord", "Become a member") | HTML |
| `about` | About | One short paragraph explaining open source for someone who has never heard of it, then one on what the society does | HTML |
| `what-we-do` | What we do | Four activities with a line each. Workshops, contribution sprints, talks from people in industry, socials | HTML |
| `events` | Events | Upcoming events list, then a collapsed "Past events" list | `data.js` |
| `hackathon` | Hackathon teaser | Logo, name, date or "Date coming soon", button to `hackathon.html` | `data.js` |
| `projects` | Projects | Society projects with name, one line, link to repo | `data.js` |
| `committee` | Committee | Name, role, optional GitHub link. No photos in v1 | `data.js` |
| `join` | How to join | Three steps (this is a real sequence, so numbering is fine). Join the Discord, buy membership on the SU site, come to an event | HTML |
| `footer` | Footer | Email, Instagram, Discord, GitHub, "This site is open source, edit it on GitHub" link, SU affiliation line | HTML |

Draft hero copy (edit freely)

> **Open Source Society**
> University of Manchester
> We learn, build and contribute to open source together. Every skill level welcome.

### 4.2 `hackathon.html`

| id | Section | Content | Source |
|---|---|---|---|
| `hero` | Hero | Large logo, hackathon name, date, venue, status label, "Register interest" button | `data.js` |
| `about` | About | What a hackathon is in two sentences, who it's for, that beginners are welcome | HTML |
| `tracks` | Tracks and prizes | List of tracks with one line each | `data.js` |
| `schedule` | Schedule | Timeline of the day(s) | `data.js` |
| `sponsors` | Sponsors | Sponsor names and links, plus a "Sponsor us" email link | `data.js` |
| `faq` | FAQ | Uses `<details>` and `<summary>` so it works with no JS. Who can come, cost, team size, what to bring, food, accessibility, code of conduct | HTML |
| `footer` | Footer | Same as index | HTML |

The logo suggests possible themes (security, the terminal, the Manchester worker bee) but tracks are not decided. See open questions.

### 4.3 `404.html`

Short message, link back home. Same header and footer.


## 5. Content data (`assets/js/data.js`)

This is the only file most committee members should ever need to edit. Keep this exact shape.

```js
// Edit this file to update the site. Dates are YYYY-MM-DD.
const SITE = {
  links: {
    email: "open.source@manchesterstudentsunion.com",
    instagram: "https://instagram.com/opensourcesocietymcr",
    discord: "https://discord.gg/Gbe2rGANzu",
    github: "",        // TODO society GitHub org URL
    membership: "",    // TODO SU society page URL
    repo: ""           // TODO this website's repo URL
  },

  events: [
    {
      title: "Example event, replace me",
      date: "2026-10-01",
      time: "18:00",
      location: "TBC",
      description: "One or two sentences.",
      link: ""          // optional, sign up or more info
    }
  ],

  projects: [
    { name: "Society website", description: "This site.", link: "" }
  ],

  committee: [
    { name: "Tanish Patel", role: "Vice President", github: "" }
  ],

  hackathon: {
    name: "",           // TODO, show "Hackathon" if empty
    date: "",           // empty shows "Date coming soon"
    time: "",           // e.g. "12:00 to 19:15", hidden while empty
    venue: "",
    status: "Registration opens soon",
    registerLink: "",   // empty falls back to the Discord link
    tracks: [ { name: "", description: "" } ],
    schedule: [ { time: "", item: "" } ],
    sponsors: [ { name: "", link: "" } ]
  }
};
```

Rendering rules for `main.js`

- Events are split into upcoming and past by comparing `date` to today. Upcoming sorts soonest first, past sorts newest first
- Dates display in UK format using `Intl.DateTimeFormat("en-GB")`, for example "Wed 1 Oct"
- Any empty list shows a helpful empty state instead of nothing. Events empty state is "Nothing booked yet. Join the Discord to hear about the next one first."
- Entries with an empty `link` render without a link, never as a broken one
- Empty strings in `links` hide that link in the footer

How links get their URLs. Any element with `data-link="discord"` (or any key in `links`) gets its `href` from `data.js`. If the value is empty, the element is hidden, or its nearest `data-link-wrap` parent if it has one. Known links also have the real URL in the HTML as a fallback for when JavaScript is off.

How hackathon details get filled. Any element with `data-hack="name"`, `"date"`, `"venue"`, `"time"`, `"status"`, `"register"` or `"logo"` is filled from `SITE.hackathon`. Lists fill `#tracks-list`, `#schedule-list` and `#sponsors-list`. Other lists fill `#events-upcoming`, `#events-past`, `#projects-list` and `#committee-list`.


## 6. Design system

### 6.1 Direction

The logo is thick mint line art on black, with faceted wings, a terminal prompt and three circuit nodes. The site should feel like that logo spread across a page. Line art, not filled cards.

Spend boldness in one place, the hero. Everything else is quiet.

### 6.2 Colour

Sampled from the logo file.

```css
:root {
  --black:     #000000;  /* page background, the logo uses true black */
  --mint:      #BDE9AB;  /* logo green. headings, buttons, key lines */
  --mint-dim:  #68805E;  /* borders, dividers, secondary lines */
  --text:      #E6F2E0;  /* body text, softer than pure mint for long reading */
  --text-dim:  #A9B8A3;  /* dates, captions */
  --honey:     #F2C14E;  /* rare accent for "upcoming" and "live" status only, a nod to the Manchester bee */
}
```

Dark theme only for v1. Set `color-scheme: dark` on `:root`.

Body text must meet WCAG AA contrast (4.5 to 1). Don't use `--mint-dim` for text.

### 6.3 Type

| Role | Typeface | Notes |
|---|---|---|
| Headings, nav, buttons | Chakra Petch 600 | Angular cut corners echo the faceted wings |
| Body | Atkinson Hyperlegible Next 400 and 700 | Designed for readability |
| Commands and code only | `ui-monospace, "SF Mono", Menlo, Consolas, monospace` | Only for things that really are code. Not for labels or dates |

Type scale in px, from The Elements of Typographic Style. 14, 16, 18, 21, 24, 36, 48, 60.

- Body 18px, line height 1.6
- h1 60px desktop, `clamp()` down to 36px on mobile
- h2 36px, h3 24px
- Text measure max 65ch. Content max width 72rem
- Sentence case everywhere. No all caps labels, no eyebrow labels above headings

### 6.4 Shape and layout

- Borders are 2px solid `--mint-dim`, matching the chunky stroke of the logo. Square corners
- Buttons are filled `--mint` with black text and chamfered corners (cut with `clip-path: polygon(...)`) to echo the wing facets. Secondary buttons are outlined. Button text says exactly what happens, no arrows
- Content is left aligned throughout
- The hackathon schedule is drawn as a vertical line with small circles at each item, like the circuit nodes in the logo. This is the only place that motif appears on the page and it's allowed because the schedule really is a sequence

Hero wireframe (desktop). On mobile the logo stacks above the text and shrinks.

```
+--------------------------------------------------------------+
| Open Source Society      About Events Hackathon Projects Join |
+--------------------------------------------------------------+
|                                                              |
|  Open Source Society                     +--------------+    |
|  University of Manchester                |              |    |
|                                          |  logo mark   |    |
|  We learn, build and contribute to       |              |    |
|  open source together._                  +--------------+    |
|                                                              |
|  [ Join the Discord ]  [ Become a member ]                   |
+--------------------------------------------------------------+
```

### 6.5 Motion

One moment only. A blinking `_` cursor at the end of the hero tagline, echoing the `>_` in the logo. Turned off under `prefers-reduced-motion`. No scroll animations, no hover effects beyond a clear colour or underline change.


## 7. Code conventions

These exist so a future session (or a new committee member) can find and change things fast.

- Every HTML section starts with a comment banner, for example `<!-- ===== SECTION about ===== -->`
- Anything that still needs real content is marked `<!-- TODO ... -->` in HTML or `// TODO` in JS, so `grep TODO` finds it all
- `style.css` is ordered in this sequence, each part with a banner comment. Tokens, base, layout, components, sections, utilities
- Class names follow a light BEM style (Block Element Modifier). A block is a thing (`.event`), an element is part of it (`.event__date`), a modifier is a variant (`.button--outline`). No IDs in CSS
- `main.js` has one small function per list (`renderEvents`, `renderProjects` and so on) plus one `init` function. No libraries
- Build DOM with `textContent` and `createElement`, not `innerHTML` with data, so nothing in `data.js` can break the page
- Keep each file under roughly 300 lines. If one grows past that, update this spec before splitting it
- Comments explain why, not what


## 8. Quality floor

- Works and looks right from 360px wide phones up to desktop
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), one `h1` per page
- Visible keyboard focus on every link and button, and a "Skip to content" link
- All images have `alt` text. The logo alt is the hackathon name
- Mobile nav works with keyboard and has `aria-expanded`
- Page `<title>`, meta description and Open Graph tags (the preview that shows when a link is shared on WhatsApp or Discord) on every page
- No console errors. Page loads fast with no JS frameworks and only two font families


## 9. Build milestones

Build in this order, one per session.

Status. 1 to 4 done on 16 Sep 2026, 5 done on 23 Sep 2026 (live on GitHub Pages at `Open-Source-Society-UoM/Website`). Next is working through the open questions.

1. **Skeleton.** File structure, `style.css` tokens and base styles, header, footer, hero, `404.html`, README stub
2. **Index content.** All `index.html` sections, `data.js` with placeholders, `main.js` rendering with empty states
3. **Hackathon page.** Full `hackathon.html` including schedule timeline and FAQ
4. **Polish.** Responsive pass, accessibility pass against section 8, meta and Open Graph tags, favicon
5. **Ship.** Push to GitHub, enable GitHub Pages, write the README "How to add an event" guide in three steps


## 10. Open questions

Answer these as they get decided, then move the answer into section 11.

- Does the society have its own logo, or should the whole site use the hackathon look for now?
- Whether committee members want their GitHub profiles linked
- Can we get the logo as an SVG from whoever designed it? The current file is a 443px JPEG and will look soft when shown large
- Check the Students' Union's rules for society websites, including how to word the affiliation line and not using the University crest
- Confirm the live site address, then make the `og:image` paths in `index.html` and `hackathon.html` full URLs so link previews work
- Two different Discord invites are in use, `Gbe2rGANzu` (given directly) and `Zn5VFzNQPR` (on the Linktree). Check which is current and put that one in `data.js`
- Tracks and prizes for the hack day
- Custom domain, or stay on the github.io address (costs money, check with the treasurer)
- Short name for the society, if any (used in the header on mobile)


## 11. Decisions log

Newest first. One line each.

- 2026-09-23 Filled in the Hacktoberfest Hack Day (11 Oct 2026, SU Theatre), its schedule and real FAQ answers, from the MLH listing. Registration goes to MLH, code of conduct is MLH's
- 2026-09-23 Added `hackathon.time`, shown under the date and hidden while empty
- 2026-09-23 GitHub org, SU membership page, repo and WhatsApp links filled in from the society Linktree
- 2026-09-23 `404.html` is now self contained with its own inline styles. GitHub Pages serves it for any missing address, so a link to `style.css` broke on a project site served under a repo name
- 2026-09-16 Added the full committee from the SU society page (six people). Committee list uses `.grid--trios` so it sits in two rows of three
- 2026-09-16 Built milestones 1 to 4. Checked with screenshots at 1280px and 390px, with empty and filled data
- 2026-09-16 The index hero uses the hackathon logo until the society has its own. The index hackathon teaser has no logo so it isn't shown twice
- 2026-09-16 Logo converted to a transparent PNG (alpha from the green channel) so it sits cleanly on any background
- 2026-09-16 Button chamfers are drawn on `::before` and `::after`, because `clip-path` on the button itself would clip the focus outline
- 2026-09-16 The `js` class is added by an inline script in `<head>` so the mobile menu doesn't flash open on load
- 2026-09-16 `404.html` uses root paths (`/assets/...`). These need a repo name prefix if the site isn't at a domain root
- 2026-09-16 "What we do" uses `.grid--pairs` so four items sit two by two
- 2026-09-16 FAQ answers are drafts marked TODO, confirm before launch
- 2026-09-16 Spec v0.1 written. Static HTML, CSS and JS, no build step, GitHub Pages, content in `data.js`


## 12. Out of scope for v1

Content management system, logins, a blog, light theme toggle, analytics, multiple languages, photo galleries.


## Appendix. Known links

| What | Link |
|---|---|
| Email | open.source@manchesterstudentsunion.com |
| Instagram | https://instagram.com/opensourcesocietymcr |
| Discord | https://discord.gg/Gbe2rGANzu |
