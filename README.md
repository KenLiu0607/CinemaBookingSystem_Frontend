# 🎬 Cinema Booking System Frontend (Vue 3 + Vite + Element Plus)

> 本專案是 **影院訂票系統 (Cinema Booking System)** 的前端介面，  
> 採用 **Vue 3 + Vite** 作為開發框架，  
> 透過 **Axios** 串接後端 .NET 8 Web API，  
> 實現電影查詢、場次預約、座位選擇與會員登入等功能。

---

## 🧩 專案簡介

本專案為前後端分離架構的前端部分，  
專注於提供直覺、快速、響應式的使用者體驗。

主要功能包括：

-   🎞️ 電影列表與詳細資訊查詢
-   🕐 場次選擇與即時座位顯示
-   🎟️ 訂票與付款流程
-   👤 會員登入 / 註冊 / 訂單查詢
-   📱 響應式 UI，支援桌面與手機端

---

## 🏗️ 專案架構

```
cinema-booking-frontend/
├── src/
│   ├── api/              # Axios 封裝與 API 呼叫
│   │   └── movie.js
│   ├── assets/           # 靜態資源 (圖片 / CSS)
│   ├── components/       # 共用元件
│   │   ├── Navbar.vue
│   │   ├── Footer.vue
│   │   └── SeatSelector.vue
│   ├── router/           # Vue Router 路由設定
│   │   └── index.js
│   ├── store/            # 狀態管理 (Pinia / Vuex)
│   ├── views/            # 頁面元件
│   │   ├── HomeView.vue
│   │   ├── BookingView.vue
│   │   ├── MovieDetailView.vue
│   │   ├── MemberView.vue
│   │   └── LoginView.vue
│   ├── App.vue           # 主框架 (Header / Main / Footer)
│   └── main.js           # 入口檔 (載入插件與掛載應用)
│
├── public/               # 靜態公開資源 (favicon, logo)
├── index.html
├── package.json
└── vite.config.js        # Vite 設定檔
```

---

## ⚙️ 技術棧

| 類別      | 使用技術                   |
| --------- | -------------------------- |
| 框架      | Vue 3 (Composition API)    |
| 打包工具  | Vite                       |
| UI 元件庫 | Element Plus               |
| 狀態管理  | Pinia                      |
| HTTP 通訊 | Axios                      |
| 路由系統  | Vue Router 4               |
| 圖片處理  | image-set / background-fit |
| 開發語言  | JavaScript / ESNext        |

---

## 🚀 專案啟動方式

### 1️⃣ 安裝依賴

```bash
npm install
```

### 2️⃣ 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器 → [http://localhost:5173](http://localhost:5173)

---

## 🔗 與後端連線設定

在 `vite.config.js` 設定 Proxy：

```js
server: {
  proxy: {
    '/api': {
      target: 'https://localhost:7244', // 後端 .NET API
      changeOrigin: true,
      secure: false
    }
  }
}
```

這樣在前端呼叫 `/api/Movie` 時，
會自動轉發到 `.NET 8 Web API`。

---

## 📡 API 呼叫範例

```js
// src/api/movie.js
import axios from "axios";

export async function getMovies() {
    const response = await axios.get("/api/Movie");
    return response.data;
}
```

---

## 🧱 組件範例

### 🎟 BookingView.vue

```vue
<template>
    <div class="booking">
        <h2>電影訂票</h2>
        <SeatSelector :showtime-id="selectedShowtime" />
        <el-button type="primary" @click="confirmBooking">確認訂票</el-button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import SeatSelector from "@/components/SeatSelector.vue";
import { createBooking } from "@/api/booking";

const selectedShowtime = ref(3);

async function confirmBooking() {
    const result = await createBooking({
        memberId: 1,
        showtimeId: selectedShowtime.value,
        seatIds: [12, 13],
    });
    console.log("✅ 訂票成功", result);
}
</script>
```

---

## 🧠 專案重點

-   採用 **Vue 3 Composition API** 與模組化設計
-   **Element Plus** 提供高可用 UI 元件
-   **Axios** 封裝統一 API 呼叫介面
-   **Router View** 控制主頁內容區換頁
-   支援 **跨域請求 (CORS)**
-   清晰的前後端分離結構

---

## 🧰 可擴充方向

-   [ ] 整合會員 JWT 登入與自動刷新 Token
-   [ ] 加入多語系 (i18n)
-   [ ] 訂票成功頁面產生 QR Code
-   [ ] UI 主題切換（深色 / 淺色）
-   [ ] PWA 支援行動裝置離線模式

---

## 🧑‍💻 作者資訊

**開發者：** Ken Liu  
**角色：** 前端工程師 / 系統設計者  
**技術棧：**

-   Vue 3 + Vite
-   Element Plus
-   Axios + Pinia
-   .NET 8 Web API (後端)
-   PostgreSQL

---

## 🧷 License

本專案採用 MIT 授權條款。  
可自由用於學習、研究與延伸開發。
