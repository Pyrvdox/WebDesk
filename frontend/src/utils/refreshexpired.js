import axios from "axios";

const refreshExpiredTokenHandler = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if(refreshToken){
            const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {"refresh": refreshToken})
            console.log('response: ', response.data)
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            console.log("expired Token refresh successfully!");
        }
    } 
    catch(error) {
        console.log("Refresh failed", error.message,);
    }
};

export default refreshExpiredTokenHandler;