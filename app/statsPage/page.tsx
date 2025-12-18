import React from "react";
import ProgressBar from "../components/ProgressBar";
import { AudioLines, Globe } from "lucide-react";
import { Download } from "lucide-react";
import { Upload } from "lucide-react";
import Header from "../components/Header/page";

const statsPage = () => {
  return (
    <div>
        <div>
            <Header />
        </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mx-20 mt-10">
        <div className="p-4 bg-[#183223] rounded-lg">
          <div className="flex justify-between mb-10">
            <span className="text-slate-500 font-bold">Ping</span>
            <span className="material-symbols-outlined text-slate-500 text-3xl">
              network_check
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              12<span className="text-slate-500 text-xl font-light">ms</span>
            </h1>
            <ProgressBar value={50} />
          </div>
        </div>
        <div className="p-4 bg-[#183223] rounded-lg">
          <div className="flex justify-between mb-10">
            <span className="text-slate-500 font-bold">JITTER</span>
            <AudioLines className="text-slate-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              2<span className="text-slate-500 text-xl font-light">ms</span>
            </h1>
            <ProgressBar value={50} />
          </div>
        </div>
        <div className="p-4 bg-[#183223] rounded-lg">
          <div className="flex justify-between mb-10">
            <span className="text-slate-500 font-bold">DOWNLOADED AVG</span>
            <Download className="text-green-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              850.5<span className="text-slate-500 text-xl font-light">ms</span>
            </h1>
            <ProgressBar value={50} />
          </div>
        </div>
        <div className="p-4 bg-[#183223] rounded-lg">
          <div className="flex justify-between mb-10">
            <span className="text-slate-500 font-bold">UPLOAD AVG</span>
            <Upload className="text-purple-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              42.1<span className="text-slate-500 text-xl font-light">ms</span>
            </h1>
            <ProgressBar value={50} barClassName="bg-purple-500" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 bg-[#234832] w-fit p-2 rounded-md justify-centeritems-center mx-auto mt-10 text-slate-300">
        <Globe />
        <p>
          Testing Server: <span>San Francisco, CA(US)</span>
        </p>
      </div>
    </div>
  );
};

export default statsPage;
