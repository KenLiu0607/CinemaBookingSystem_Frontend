<template>
    <div class="title">
        <el-icon><Timer /></el-icon>
        即將上映
    </div>
    <el-carousel :interval="5000" type="card" trigger="click" height="500PX" :autoplay="false">
        <el-carousel-item v-for="item in movies" :key="item.id">
            <h3>
                {{ item.startDate }}
            </h3>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import api from "@/api/api.js";

    const movies = ref([]);
    async function fetchMovies() {
        try {
            const response = await api.get(`/Home`);
            console.log("response", response);
            const { data } = response;
            movies.value = data.map((item) => ({
                ...item,
                path: "/movies/" + item.fileName,
            }));
        } catch (error) {
            if (error.response) {
                // 後端有回應，但狀態碼非 2xx
                console.error("Server error:", error.response.status, error.response.data);
            } else if (error.request) {
                // 請求有發出去，但沒回應（可能是網路問題）
                console.error("No response from server:", error.request);
            } else {
                // 其他錯誤（例如程式碼錯誤）
                console.error("Axios error:", error.message);
            }
        }
    }

    onMounted(async () => {
        await Promise.all([fetchMovies()]);
        console.log("全部載入完成");
    });
</script>

<style scoped>
    .title {
        text-align: center;
    }
    .el-carousel__item h3 {
        line-height: 500px;
        margin: 0;
        text-align: center;
    }
</style>
