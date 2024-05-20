import axios from "axios";

const refreshExpiredTokenHandler = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if(refreshToken){
            await axios.post("http://127.0.0.1:8000/api/token/refresh/", {"refresh": refreshToken})
            
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh);
            console.log("expired Token refresh successfully!")
        }
    } 
    catch(error) {
        console.log("Refresh failed", error.message)
    }
}

export default refreshExpiredTokenHandler;