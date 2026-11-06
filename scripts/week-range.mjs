// Prints the Monday-to-Sunday range of the week containing a date.
// Usage: node scripts/week-range.mjs [YYYY-MM-DD]   (default: today)
// Reads nothing, writes only to stdout, uses no network and no dependencies.

const arg = process.argv[2]
const day = arg ? new Date(`${arg}T00:00:00Z`) : new Date()
if (Number.isNaN(day.getTime())) {
    console.error('Expected a date like 2026-03-18')
    process.exit(1)
}

const daysSinceMonday = (day.getUTCDay() + 6) % 7
const monday = new Date(day.getTime() - daysSinceMonday * 86_400_000)
const sunday = new Date(monday.getTime() + 6 * 86_400_000)
const iso = (d) => d.toISOString().slice(0, 10)

console.log(`${iso(monday)} to ${iso(sunday)}`)
