const REACT_APP_API_URL: string= 'http://159.223.61.88/api/v1'

const getTodayTopics: any = `${REACT_APP_API_URL}/user/logged/todayTopics`;
const userLoginUrl: any = `${REACT_APP_API_URL}/user/studentLogin`;
const userUpdate: any = `${REACT_APP_API_URL}/user/logged/updateStudent`;

const changePWD: any = `${REACT_APP_API_URL}/user/changePassword`;
const verifyToken: any = `${REACT_APP_API_URL}/user/verifyStudentToken`;
const regStudent: any = `${REACT_APP_API_URL}/user/registerStudent`
const forgetPWD: any = `${REACT_APP_API_URL}/user/forgetPassword`;
const OTP:any = `${REACT_APP_API_URL}/user/otp`;

export {getTodayTopics, userLoginUrl,userUpdate,changePWD,verifyToken,regStudent,OTP,forgetPWD}