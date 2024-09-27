import axios from "axios";
import {userLoginUrl,userUpdate,changePWD,verifyToken,regStudent,OTP,forgetPWD} from "./urls";


export const userLogin: any = async(username: string, password: string) => {
    let data : string = JSON.stringify({
        "username": username,
        "password": password
    })

    let config: any = {
        method: 'post',
        maxBodyLength: Infinity,
        url: userLoginUrl,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data,
    }

    const response : any = await axios.request(config);
    return response.data;
}

export const updateDetails :any = async(token: string,firstname: string, lastname: string, email: string, mobile: string) => {
    let number : number = parseInt(mobile);
    let data : string = JSON.stringify({
        "f_name": firstname,
        "l_name": lastname,
        "email": email,
        "mobile": number
    })

    let config :any = {
        method: 'put',
        maxBodyLength: Infinity,
        url : userUpdate,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data,
    }

    const response: any = await axios.request(config);
    return response.data;
}

export const changePassword:any = async(token: string, password: string) =>{
    let data : string = JSON.stringify({"password": password});
    

    let config :any = {
        method: 'post',
        maxBodyLength: Infinity,
        url: changePWD,
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        data: data,
    }

    const response: any = await axios.request(config);
    return response.data;
}

export const VerifyUserToken = async(token:string) => {
    let config: any = {
        method: 'get',
        maxBodyLength: Infinity,
        url: verifyToken,
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    }

    const response: any = await axios.request(config);
    return response.data;
}

export const registerStudent = async(firstname:string, lastname:string, email:string, mobile:string) => {
    let number : number = parseInt(mobile);
    let data : string = JSON.stringify({"f_name": firstname, "l_name": lastname, "email":email, "mobile": number})

    let config:any = {
        method: 'post',
        maxBodyLength: Infinity,
        url: regStudent,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    const response:any = await axios.request(config);
    return response.data;
}

export const forgetPassword = async(username:string,email:string) =>{
    let data : string = JSON.stringify({"username": username, "email": email});

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: forgetPWD,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    const response = await axios.request(config);
    return response.data;
}

export const sendOTP = async (email:string, otp:string) => {
    let otp_code :number = parseInt(otp);
    let data : string = JSON.stringify({"email": email, "otp_code": otp_code});

    let config:any = {
        method: 'post',
        maxBodyLength: Infinity,
        url: OTP,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    }

    const response:any = await axios.request(config);
    return response.data;
}
