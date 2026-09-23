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
    github: "",       // TODO society GitHub org URL
    membership: "",   // TODO SU society page URL
    repo: ""          // TODO this website's repo URL
  },

  // Past and upcoming are worked out from the date automatically.
  // TODO replace both examples with real events
  events: [
    {
      title: "Example event, replace me",
      date: "2026-10-01",
      time: "18:00",
      location: "TBC",
      description: "One or two sentences about what happens and who it's for.",
      link: ""
    },
    {
      title: "Example past event, replace me",
      date: "2026-05-01",
      time: "18:00",
      location: "TBC",
      description: "Past events stay here and move into the past list on their own.",
      link: ""
    }
  ],

  projects: [
    {
      name: "Society website",
      description: "This site. Plain HTML, CSS and JavaScript, open for anyone to improve.",
      link: ""        // TODO repo URL
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
    name: "",                          // TODO, shows "Hackathon" while empty
    date: "",                          // YYYY-MM-DD, shows "Date coming soon" while empty
    venue: "",                         // shows "Venue coming soon" while empty
    status: "Registration opens soon",
    registerLink: "",                  // TODO form link, falls back to Discord while empty

    // Entries with an empty name or item are ignored
    tracks: [
      { name: "", description: "" }
    ],
    schedule: [
      { time: "", item: "" }
    ],
    sponsors: [
      { name: "", link: "" }
    ]
  }
};
