export async function runDownloadTest(
  onProgress?: (mbps: number) => void
): Promise<number> {
  const TEST_FILE =
    "https://speed.cloudflare.com/__down?bytes=50000000"; // 50MB
  const startTime = performance.now();

  const response = await fetch(TEST_FILE, { cache: "no-store" });
  const reader = response.body?.getReader();

  if (!reader) throw new Error("No stream");

  let receivedBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    receivedBytes += value.length;

    const elapsedSeconds = (performance.now() - startTime) / 1000;
    const bits = receivedBytes * 8;
    const mbps = bits / elapsedSeconds / 1_000_000;

    onProgress?.(mbps);
  }

  const totalTime = (performance.now() - startTime) / 1000;
  return (receivedBytes * 8) / totalTime / 1_000_000;
}
