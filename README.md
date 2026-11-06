# StatusLog AI kit sample

A small, working sample **AI kit** for StatusLog. Copy it to start your own.

> This is a sample. It is meant to be read, copied and changed, not depended on.

## What is an AI kit?

An AI kit is a git repo of agents, skills, rules and scripts, laid out like a `.claude` folder, with a `statuslog-kit.json` manifest at its root. You point StatusLog at the repo, sync it, and switch it on. StatusLog keeps an immutable copy (a release) of each synced version.

This kit shows each feature once, around one small flow: a **weekly status summary** that reads StatusLog work items when the StatusLog MCP tools are connected, and works from pasted notes when they are not.

## Try it in StatusLog

1. Open **Agents** in StatusLog.
2. Add an AI kit. Use this repo URL and the ref `main`:
   `https://github.com/emmertio/statuslog-ai-kit-sample.git`
3. Press **Sync**. StatusLog fetches the repo, checks the manifest and shows the synced version.
4. Open **Settings** to look at the settings the kit declares. All of them have defaults, so nothing is required.
5. Switch the kit **on**.

If the sync fails, the error on the kit names what is wrong with the manifest or the repo.

Using an enabled kit from a Claude session is coming with the StatusLog MCP kit tools (#153), and installing kits natively into a client (such as Claude Code) with #154 and later. Until then, sync, settings and enable are what you can try.

## Start your own from this one

1. Copy this repo (use it as a template, or copy the files into a new repo).
2. Edit `statuslog-kit.json`: change `name`, `title`, `description`, `triggers` and the rest.
3. Replace the skills, agent, rule and tools with your own.
4. Push, add your repo URL in StatusLog, and sync.

Public repos need no credentials. A private repo needs a read-only, single-repo access token in StatusLog, which depends on your StatusLog deployment being set up for it.

## What each file does

| File | What it shows |
| --- | --- |
| `statuslog-kit.json` | The manifest: name, triggers, clients, main skill, settings, tools, ignore list |
| `.claude/skills/weekly-status/SKILL.md` | The **main skill**, the kit's entry point (`mainSkill`) |
| `.claude/skills/status-writing/SKILL.md` | A **supporting skill** the main skill leans on |
| `.claude/agents/status-researcher.md` | A named **agent** that gathers work items. Pinned to `model: sonnet`. No `tools:` line, on purpose: in Claude Code a `tools:` line removes the MCP tools from an agent |
| `.claude/rules/plain-language.md` | A **rule**: guidance that always applies |
| `tools/status-report-outline.md` | The `status_report_outline` tool, `run.kind: "instructions"`: a markdown file the client follows |
| `scripts/week-range.mjs` | The `week_range` tool, `run.kind: "script"`: a tiny script |
| `README.md` | This file. Listed in `ignore`, so it is left out of the release |

### Settings in this kit

| Key | Type | Default |
| --- | --- | --- |
| `tone` | select | `concise` |
| `lookbackDays` | number | `7` |
| `includeBlocked` | boolean | `true` |
| `kbUrl` | url | none (optional) |

**Settings are not secrets.** They are stored as plain values and can be shown to agents. Never put tokens, passwords or keys in a setting.

### The script

`node scripts/week-range.mjs [YYYY-MM-DD]` prints the Monday to Sunday range of that week, for example:

```
$ node scripts/week-range.mjs 2026-03-18
2026-03-16 to 2026-03-22
```

It uses no network and no dependencies, and writes only to stdout. **Scripts run locally on the client, never on StatusLog servers.** StatusLog only stores the file. Keep scripts small enough to read at a glance, since the person running one should be able to check it.

## Field reference

The manifest format, limits (file count and sizes) and sync behaviour are documented in StatusLog's docs, not repeated here:

- The "Kit manifest" and "Sync and its limits" sections of `docs/features/agents/README.md` in the StatusLog repo.

Unknown manifest fields are refused, so a typo fails the sync instead of being ignored.
