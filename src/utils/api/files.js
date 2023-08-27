import {axios} from "../../core";
import { translit } from "../helpers";

export default {
  upload: (file, folder='file')=>{
    const formData = new FormData();
    formData.append("file", file);
    return axios.post('/files/media',formData,{
      headers:{
        "Content-Type":'multipart/form-data;charset=windows-1251',
        "Content-Encoding":'compress',
        folder: folder,
      }
    })
  },
  removeById: id =>axios.delete("/files/media?id="+id),
} 
// TODO: сделать что при загрузки фото,видео и аудио и других файлов , чтобы они разгуржались в соотвествующие  папки