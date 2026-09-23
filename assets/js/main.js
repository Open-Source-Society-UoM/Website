// Renders content from data.js into the page. See SPEC.md section 5.
// Every function checks its target exists, so one script serves every page.

const shortDate = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short" });
const fullDate = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

// ===== Helpers =====

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function linkTo(href, text) {
  const a = el("a", "", text);
  a.href = href;
  return a;
}

// Parse as local time. new Date("2026-10-01") would be UTC and can shift the day.
function parseDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// Fills a list, or shows a message when there's nothing to show
function fillList(list, items, renderItem, emptyMessage) {
  list.replaceChildren();
  if (items.length === 0) {
    list.append(el("li", "empty", emptyMessage));
    return;
  }
  items.forEach((item) => list.append(renderItem(item)));
}

// ===== Links =====
// Any element with data-link="discord" etc gets its href from SITE.links.
// If the link is empty, the element (or its data-link-wrap parent) is hidden.

function renderLinks() {
  document.querySelectorAll("[data-link]").forEach((node) => {
    const key = node.dataset.link;
    const value = SITE.links[key];
    const target = node.closest("[data-link-wrap]") || node;
    if (!value) {
      target.hidden = true;
      return;
    }
    node.href = key === "email" ? `mailto:${value}` : value;
    target.hidden = false;
  });
}

// ===== Events =====

function renderEvent(event, isPast) {
  const li = el("li", isPast ? "event event--past" : "event");
  const format = isPast ? fullDate : shortDate;
  // Chrome adds a comma after the weekday in short dates, drop it so both lists match
  const date = el("time", "event__date", format.format(event.day).replace(",", ""));
  date.dateTime = event.date;

  const body = el("div");
  body.append(el("h3", "", event.title));
  const meta = [event.time, event.location].filter(Boolean).join(", ");
  if (meta) body.append(el("p", "event__meta", meta));
  if (event.description) body.append(el("p", "", event.description));
  if (event.link) body.append(linkTo(event.link, `More about ${event.title}`));

  li.append(date, body);
  return li;
}

function renderEvents() {
  const upcomingList = document.getElementById("events-upcoming");
  if (!upcomingList) return;
  const pastList = document.getElementById("events-past");
  const pastWrap = document.getElementById("events-past-wrap");

  const today = startOfToday();
  const events = SITE.events
    .filter((e) => e.title && e.date)
    .map((e) => ({ ...e, day: parseDate(e.date) }));

  const upcoming = events.filter((e) => e.day >= today).sort((a, b) => a.day - b.day);
  const past = events.filter((e) => e.day < today).sort((a, b) => b.day - a.day);

  fillList(upcomingList, upcoming, (e) => renderEvent(e, false),
    "Nothing booked yet. Join the Discord to hear about the next one first.");
  fillList(pastList, past, (e) => renderEvent(e, true), "");
  pastWrap.hidden = past.length === 0;
}

// ===== Projects and committee =====

function renderProjects() {
  const list = document.getElementById("projects-list");
  if (!list) return;
  fillList(list, SITE.projects.filter((p) => p.name), (project) => {
    const li = el("li", "item");
    const heading = el("h3");
    heading.append(project.link ? linkTo(project.link, project.name) : project.name);
    li.append(heading, el("p", "", project.description));
    return li;
  }, "Projects are on the way. Got an idea? Bring it to the Discord.");
}

function renderCommittee() {
  const list = document.getElementById("committee-list");
  if (!list) return;
  fillList(list, SITE.committee.filter((m) => m.name), (member) => {
    const li = el("li", "item");
    li.append(el("h3", "", member.name), el("p", "item__role", member.role));
    if (member.github) li.append(linkTo(member.github, `${member.name} on GitHub`));
    return li;
  }, "Committee details coming soon.");
}

// ===== Hackathon =====
// Fills any element with data-hack="name", "date", "venue", "status", "register" or "logo"

function renderHackathon() {
  const h = SITE.hackathon;
  const name = h.name || "Hackathon";
  const values = {
    name,
    date: h.date ? fullDate.format(parseDate(h.date)) : "Date coming soon",
    venue: h.venue || "Venue coming soon",
    status: h.status
  };

  document.querySelectorAll("[data-hack]").forEach((node) => {
    const key = node.dataset.hack;
    if (key === "register") node.href = h.registerLink || SITE.links.discord;
    else if (key === "logo") node.alt = `${name} logo`;
    else if (key === "status") { node.textContent = values.status; node.hidden = !values.status; }
    else if (key in values) node.textContent = values[key];
  });

  if (document.body.dataset.page === "hackathon" && h.name) {
    document.title = `${h.name} | Open Source Society Manchester`;
  }

  const tracks = document.getElementById("tracks-list");
  if (tracks) {
    fillList(tracks, h.tracks.filter((t) => t.name), (track) => {
      const li = el("li", "item");
      li.append(el("h3", "", track.name), el("p", "", track.description));
      return li;
    }, "Tracks and prizes will be announced soon.");
  }

  const schedule = document.getElementById("schedule-list");
  if (schedule) {
    fillList(schedule, h.schedule.filter((s) => s.item), (slot) => {
      const li = el("li", "timeline__item");
      li.append(el("span", "timeline__time", slot.time), el("span", "", slot.item));
      return li;
    }, "The schedule will be posted closer to the day.");
  }

  const sponsors = document.getElementById("sponsors-list");
  if (sponsors) {
    fillList(sponsors, h.sponsors.filter((s) => s.name), (sponsor) => {
      const li = el("li", "item");
      const heading = el("h3");
      heading.append(sponsor.link ? linkTo(sponsor.link, sponsor.name) : sponsor.name);
      li.append(heading);
      return li;
    }, "Sponsors will be announced soon.");
  }
}

// ===== Mobile nav =====

function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
    nav.classList.toggle("nav--open", open);
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("nav--open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// ===== Start =====

function init() {
  renderLinks();
  renderEvents();
  renderProjects();
  renderCommittee();
  renderHackathon();
  initNav();
}

init();
