const fs = require("fs");

const html = fs.readFileSync("index.html", "utf8");
const checks = {
  bytes: html.length,
  hasHero: html.includes("Software Security"),
  hasSearch: html.includes('id="search-bar"'),
  hasChecklist: html.includes("Study Progress Checklist"),
  hasCards: html.includes("Attack vs Fix Cards"),
  hasFilters: html.includes('data-filter="vc"') && html.includes('data-filter="imp"'),
  embeddedMarkdown: html.includes('<script id="source-md" type="text/plain">'),
};

const runtimeStart = html.indexOf("<script>\nconst rawMarkdown");
const runtimeEnd = html.lastIndexOf("</script>");
new Function(html.slice(runtimeStart + "<script>".length, runtimeEnd));
checks.scriptSyntax = true;

const failed = Object.entries(checks).filter(([, value]) => value === false);
console.log(JSON.stringify(checks, null, 2));
if (failed.length) process.exit(1);
