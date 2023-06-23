import axios from 'axios';

export interface IApiRes {
  id?: string;
  done_at?: string;
  status: 'IN_PROGRESS' | 'DONE';
}

export class Api {
  private static get = async (endpoint: string, params?: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
    return axios.get(url + `${params || ''}`);
  };

  private static post = async (endpoint: string, data: object) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;
    return axios.post(url, data);
  };

  static saveCsvSheet = async (csv: string) => {
    const res = await Api.post('save', {
      data: csv,
    });
    return res.data as IApiRes;
  };

  static getStaus = async (serverId: string) => {
    const res = await Api.get('get-status', `?id=${serverId}`);
    return res.data as IApiRes;
  };
}
