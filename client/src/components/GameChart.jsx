import React, { memo, useState, useEffect, useCallback } from "react";
import ReactECharts from "echarts-for-react";

const getdata = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.response;
  } catch (error) {
    console.log(error);
    return;
  }
};

// TODO 用usecallback包装getdata函数提高性能?
const gameArr = [];
const timeArr = [];

export default memo(function GameChart() {
  const [options, setOptions] = useState({});
  useEffect(() => {
    getdata("http://localhost:3000/api/game/gamedata").then((res) => {
      console.log(res.games);
      res.games
        .filter((item) => {
          return item.playtime_forever / 60 > 30 ? item : null;
        })
        .sort((a, b) => {
          return b.playtime_forever - a.playtime_forever;
        })
        .map((item) => {
          gameArr.push(item.name);
          timeArr.push((item.playtime_forever / 60).toFixed(0));
        });
      setOptions({
        grid: {},
        xAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} h",
          },
        },
        yAxis: {
          type: "category",
          data: gameArr,
        },
        series: [
          {
            name: "Play Time",
            type: "bar",
            data: timeArr,
            label: {
              show: true,
              position: "right",
              formatter: "{c} h",
            },
          },
        ],
      });
    });
    return () => {
      gameArr.splice(0, gameArr.length);
      timeArr.splice(0, timeArr.length);
    };
  }, []);

  return (
    <ReactECharts
      style={{
        height: "45rem",
      }}
      option={options}
    />
  );
});
