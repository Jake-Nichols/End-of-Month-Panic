# End-of-Month Panic

A lightweight EPM dashboard that pulls evidence from GitHub, ClickUp, and Harvest.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Set these to enable live data:

```bash
GITHUB_TOKEN=...
GITHUB_REPOS=owner1/repo1,owner2/repo2
CLICKUP_TOKEN=...
CLICKUP_LIST_ID=...
HARVEST_TOKEN=...
HARVEST_ACCOUNT_ID=...
```

If any values are missing the dashboard renders sample data so you can still see the layout.
