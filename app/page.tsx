"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import GraphVisualization from "./components/graphs/GraphVisualization";
import Link from "next/link";
import Header from "./components/Header/page";

import { runJitterTest } from "@/lib/jitterTest";
import { runPingTest } from "@/lib/pingTest";
import { runDownloadTest } from "@/lib/downloadedTest";
import { runUploadTest } from "@/lib/uploadTest";

const PulseSpeed = () => {
  const [ping, setPing] = useState<number | null>(null);
  const [download, setDownload] = useState<number | null>(null);
  const [upload, setUpload] = useState<number | null>(null);
  const [jitter, setJitter] = useState<number | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleSpeedTest = async () => {
    try {
      setIsTesting(true);

      const pingValue = await runPingTest();
      setPing(pingValue);

      const jitterValue = await runJitterTest();
      setJitter(jitterValue);

      const downloadValue = await runDownloadTest();
      setDownload(downloadValue);

      const uploadValue = await runUploadTest();
      setUpload(uploadValue);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="max-h-svh">
      <section>
        <Header />
      </section>

      <main className="mx-20 mt-5">
        <section>
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <div className="absolute animate-ping rounded-full bg-[#2bee79] opacity-70 h-3 w-3"></div>
              <div className="relative bg-[#2bee79] rounded-full h-3 w-3"></div>
            </div>

            <span className="text-[#2bee79] font-medium text-sm tracking-wide uppercase">
              Real-Time Download
            </span>
          </div>

          <div className="flex justify-between">
            <div>
              <h1 className="text-6xl font-semibold">
                {download ?? "--"}
                <span className="text-lg font-medium text-slate-400"> Mbps</span>
              </h1>
            </div>

            <div>
              <p>Ping</p>
              <h1>
                {ping ?? "--"}
                <span className="text-lg font-medium text-slate-400"> ms</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <GraphVisualization />
        </section>

        <div className="flex items-center justify-center mt-5 flex-col gap-4">
          <button
            className="flex items-center gap-2 bg-[#2bee79] text-black p-4 rounded-xl font-medium disabled:opacity-50"
            onClick={handleSpeedTest}
            disabled={isTesting}
          >
            <Play className="w-5 h-5" />
            <h1>{isTesting ? "Testing..." : "Check Pulse"}</h1>
          </button>

          <Link href="/statsPage" className="text-[#2bee79] rounded-full">
            Show More Info
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PulseSpeed;
