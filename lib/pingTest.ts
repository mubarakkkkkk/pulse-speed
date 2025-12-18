export async function runPingTest() {
  const start = performance.now();
  await fetch("/api/ping", { cache: "no-store" });
  const end = performance.now();

  return Math.round(end - start); // ms
}
