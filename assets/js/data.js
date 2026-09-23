// ============================================================
// Edit this file to update the site. See README.md for help.
// Dates are YYYY-MM-DD. Leave a field as "" if you don't know it yet,
// the site hides or replaces empty fields automatically.
// ============================================================

const SITE = {
  links: {
    email: "open.source@manchesterstudentsunion.com",
    instagram: "https://instagram.com/opensourcesocietymcr",
    discord: "https://discord.gg/Gbe2rGANzu",
    whatsapp: "https://chat.whatsapp.com/ChgEdnIE53ELexjS3tf8eu",
    github: "https://github.com/Open-Source-Society-UoM",
    membership: "https://manchesterstudentsunion.com/activities/view/open_source",
    repo: "https://github.com/Open-Source-Society-UoM/Website"
  },

  // Past and upcoming are worked out from the date automatically.
  events: [
    {
      title: "Hacktoberfest Hack Day",
      date: "2026-10-11",
      time: "12:00 to 19:15",
      location: "SU Theatre, Steve Biko Building",
      description: "A day of building with open source tools, with a guest talk from Cloud Native Manchester and lunch provided. All skill levels welcome.",
      link: "https://events.mlh.com/events/15041-hacktoberfest-hack-day-manchester-x-open-source-society-uom"
    }
  ],

  projects: [
    {
      name: "Society website",
      description: "This site. Plain HTML, CSS and JavaScript, open for anyone to improve.",
      link: "https://github.com/Open-Source-Society-UoM/Website"
    }
  ],

  // Same order as the SU society page. Add GitHub profile URLs if people want them shown.
  committee: [
    { name: "Talen Mudaly", role: "President", github: "" },
    { name: "Tanish Patel", role: "Vice-President", github: "" },
    { name: "Adam Tabaka", role: "Inclusion Officer", github: "" },
    { name: "Cavan Liaw", role: "Treasurer", github: "" },
    { name: "Evan Sinfield", role: "Vice-Chair", github: "" },
    { name: "Jeevan Francis", role: "Events Coordinator", github: "" }
  ],

  hackathon: {
    name: "Hacktoberfest Hack Day",
    date: "2026-10-11",
    time: "12:00 to 19:15",
    venue: "SU Theatre, Steve Biko Building, Manchester Students' Union",
    status: "Registration is open, spots are limited",
    registerLink: "https://events.mlh.com/events/15041-hacktoberfest-hack-day-manchester-x-open-source-society-uom",

    // Entries with an empty name or item are ignored
    tracks: [
      { name: "", description: "" }   // TODO add tracks and prizes once they're decided
    ],
    schedule: [
      { time: "12:00", item: "Doors open and check-in" },
      { time: "12:15", item: "Welcome and opening ceremony" },
      { time: "12:30", item: "Intro to open source contribution" },
      { time: "13:00", item: "Hacking begins, lunch served" },
      { time: "13:30", item: "Guest talk from Cloud Native Manchester on encouraging open source contribution" },
      { time: "14:00", item: "Open hacking continues" },
      { time: "17:30", item: "Project submissions close" },
      { time: "18:00", item: "Demos and closing ceremony" },
      { time: "18:30", item: "Prizes and wrap up" },
      { time: "20:00", item: "Venue closes" }
    ],
    sponsors: [
      { name: "", link: "" }
    ]
  }
};
