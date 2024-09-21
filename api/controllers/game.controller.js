import axios from "axios";

export const getPlayerdata = async (req, res, next) => {
  try {
    const gamedata = await axios.get(
      "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=59808D845F65E0DA823A66B9BED4CC25&format=json&steamids=76561198157051004"
    );

    res.json(gamedata.data);
  } catch (error) {
    console.log(error);
  }
};
export const getGamedata = async (req, res, next) => {
  try {
    const gamedata = await axios.get(
      "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=59808D845F65E0DA823A66B9BED4CC25&include_appinfo=true&steamid=76561198157051004&format=json"
    );

    res.json(gamedata.data);
  } catch (error) {
    console.log(error);
  }
};
