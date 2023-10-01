import {axios} from "../../core";


export default {
  translate: async ({text,lang})=>{
    const options = {
      method: 'POST',
      url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
      params: {
        'to[0]': lang,
        'api-version': '3.0',
        profanityAction: 'NoAction',
        textType: 'plain'
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '331cc754b7mshb3be9a3c693b299p1db70ajsn59fcdc5f007f',
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      data: [
        {
          Text: text
        }
      ]
    };
    
    try {
      const response = await axios.request(options);
      return response.data
    } catch (error) {
      console.error(error);
    }


  }
 
}  