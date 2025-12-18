import { runPingTest } from "./pingTest";

export async function runJitterTest() {
  const results: number[] = [];

  for (let i = 0; i < 5; i++) {
    results.push(await runPingTest());
  }

  const avg = results.reduce((a, b) => a + b, 0) / results.length;

  const variance =
    results.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / results.length;

  return Math.round(Math.sqrt(variance));
}
