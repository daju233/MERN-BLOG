import { Button } from "flowbite-react";
import React, { useState, memo, useRef, useEffect, useCallback } from "react";
import { TfiLayoutColumn3 } from "react-icons/tfi";
import { TfiBarChartAlt } from "react-icons/tfi";
import GameChart from "../components/GameChart";
import GameWaterfall from "../components/GameWaterfall";

export default memo(function Games() {
  const [Chartstate, setChartstate] = useState("waterfall");
  //   const cbFn = useCallback(async (url) => {
  //     try {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       return data.response;
  //     } catch (error) {
  //       console.log(error);
  //       return;
  //     }
  //   });
  return (
    <div className="flex h-screen flex-col translate-y-20 gap-5 ">
      <div className=" text-3xl font-extrabold mx-auto">
        那些年，我玩过的游戏……
      </div>
      <div className="flex gap-5 ml-auto mr-10">
        <Button
          onClick={() => {
            setChartstate("waterfall");
          }}
          className=" hover:opacity-80 "
        >
          <TfiLayoutColumn3 />
        </Button>
        <Button
          onClick={() => {
            setChartstate("chart");
          }}
          className=" hover:opacity-80"
        >
          <TfiBarChartAlt />
        </Button>
      </div>
      {Chartstate == "chart" ? (
        <GameChart></GameChart>
      ) : (
        <div className="flex justify-center">
          <GameWaterfall></GameWaterfall>
        </div>
      )}
    </div>
  );
});
