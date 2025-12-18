export async function runUploadTest() {
  const sizeInMB = 5;
  const buffer = new Uint8Array(sizeInMB * 1024 * 1024);

  const start = performance.now();
  await fetch("/api/upload", {
    method: "POST",
    body: buffer,
  });
  const end = performance.now();

  const bits = buffer.length * 8;
  const seconds = (end - start) / 1000;
  const mbps = bits / seconds / 1_000_000;

  return Math.round(mbps * 10) / 10;
}
