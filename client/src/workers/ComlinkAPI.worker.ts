import { expose } from "comlink";
export default {} as typeof Worker & { new (): Worker };

importScripts(process.env.PUBLIC_URL + "/static/js/api.js");

export const api = {
  calculateEquity: async (hero: string, villain: string) => {
    //@ts-ignore
    const result = await Module.ccall(
      "GameSimulator",
      "number",
      ["string", "string"],
      [hero, villain],
      { async: true }
    );
    return result;
  },
};

expose(api);
