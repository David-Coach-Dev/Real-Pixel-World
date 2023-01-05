import { instance } from "../base";
const endPoint = 'character';
export const characters = {
  getAll:function({page = 1}:{page:number}) {
    return instance.get(endPoint, {
        params: {
          page
        }
      });
  },
  getById:function({id}:{id:number}) {
    return instance.get(`${endPoint}/${id}`);
  }
}