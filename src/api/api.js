import axios from "axios";

// 建立一個 axios 實例, 並設定基礎路徑與預設標頭
const api = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
});

// 請求攔截器
api.interceptors.request.use(
    function (config) {
        // 在每個 request 前自動加上 Token (如果有登入)
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 回應攔截器
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // 可以統一處理錯誤，例如 401 重新導向登入
        if (error.response?.status === 401) {
            console.warn("未授權，請重新登入");
        }
        return Promise.reject(error);
    }
);

export default api;
