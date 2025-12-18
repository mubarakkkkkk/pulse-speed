export async function runDownloadTest() {
  const start = performance.now();
  const res = await fetch("/api/download", { cache: "no-store" });
  const blob = await res.blob();
  const end = performance.now();

  const bits = blob.size * 8;
  const seconds = (end - start) / 1000;
  const mbps = bits / seconds / 1_000_000;

  return Math.round(mbps * 10) / 10;
}
