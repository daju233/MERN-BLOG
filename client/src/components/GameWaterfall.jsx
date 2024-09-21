import React, { useEffect, useState } from "react";

const getdata = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const newdata = data.response.games.map((item) => {
      return `http://media.steampowered.com/steamcommunity/public/images/apps/${item.appid}/${item.img_icon_url}.jpg`;
    });
    return newdata;
  } catch (error) {
    console.log(error);
    return;
  }
};

//http://media.steampowered.com/steamcommunity/public/images/apps/ 4000 /4a6f25cfa2426445d0d9d6e233408de4d371ce8b .jpg

export default function GameWaterfall(getData) {
  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getdata("http://localhost:3000/api/game/gamedata");
        // console.log(data);
        setImgArr(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  //   console.log(imgArr);
  return (
    <div className=" whitespace-nowrap overflow-scroll">
      {imgArr.map((item, index) => {
        return (
          <div className=" inline-block" key={index}>
            <img className=" h-40 w-20" src={item} />
          </div>
        );
      })}
    </div>
  );
}
