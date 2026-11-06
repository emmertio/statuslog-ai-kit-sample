---
name: weekly-status
description: Write a short weekly status summary of the team's work. Use when asked for a weekly status, a status update or "what happened this week".
---

# Weekly status

Write a short summary of what the team did this week.

## Steps

1. Work out the date range. Use the kit's `week_range` tool (it runs `scripts/week-range.mjs`, which prints the current week's Monday to Sunday), or use the range the user gave you.
2. Gather the work.
   - If the StatusLog MCP tools are connected, read the work items that changed in that range with `work_items_read`. Use `team_context` first if you are unsure which team to use.
   - If they are not, ask the user to paste their notes or a list of items and work from that. Say you did so.
3. Hand the gathering to the `status-researcher` agent when there are many items, and ask it for a plain list of what moved. Otherwise do it yourself.
4. Follow the outline in `tools/status-report-outline.md` and the style in the `status-writing` skill.
5. Show the summary and ask if anything is missing. Do not change any work items.

## Settings

The kit declares a few settings (`tone`, `lookbackDays`, `includeBlocked`, `kbUrl`). Use the user's values if you have them. Otherwise use the defaults: concise tone, 7 days, blocked work included, no link.
