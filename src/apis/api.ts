import axios from 'axios';

export class Api {

  private static get = async (endpoint: string, params?: string) => {
    const url = `${process.env.API_URL}/${endpoint}`;
    return axios.get(url + `${params || ""}`);
  };

  private static post = async (endpoint: string, data: object) => {
    const url = `${process.env.API_URL}/${endpoint}`;
    return axios.post(url, data);
  };

  static saveSheet = async () => {

  }

  static getStaus = async () => {
    const res = await Api.get('get-status', `?id=W4GGjonGpMgG`);
    return res.data;
  }
}
