import axios from "axios";
import {getTodayTopics} from "./urls"

export const todayTopics: any = async(token: string) => {
    let config: any = {
        method: 'get',
        maxBodyLength: Infinity,
        url: getTodayTopics,
        headers: {
            'Authorization': `Bearer ${token}`,
        }

    };

    const response : any = await axios.request(config);
    
    return response.data;
}