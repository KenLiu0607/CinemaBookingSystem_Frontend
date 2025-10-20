<template>
    <div class="booking">
        <el-row :gutter="20">
            <el-col :xs="24" :lg="10">
                <el-card class="booking-card" shadow="hover">
                    <div class="movie-header">
                        <el-image :src="activeMovie.path" fit="cover" class="movie-poster" lazy>
                            <template #error>
                                <div class="poster-fallback">No Image</div>
                            </template>
                        </el-image>
                        <div class="movie-meta">
                            <h2 class="movie-title">{{ activeMovie.title }}</h2>
                            <div class="movie-tags">
                                <el-tag size="small" type="success">{{ activeMovie.rating }}</el-tag>
                                <el-tag size="small">{{ activeMovie.genre }}</el-tag>
                            </div>
                            <p class="movie-info"> {{ activeMovie.startDate }} </p>
                        </div>
                    </div>

                    <el-divider />

                    <el-form class="booking-form">
                        <el-form-item label="選擇電影">
                            <el-select v-model="movie">
                                <el-option v-for="b in booking" :key="b.movieId" :label="b.title" :value="b.movieId" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="選擇大廳">
                            <el-select v-model="hall">
                                <el-option v-for="h in activeMovie.halls" :key="h.id" :label="h.name" :value="h.id" />
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <!-- <el-form label-position="top" :model="formState" class="booking-form"> -->
                    <!-- <el-date-picker v-model="showDate" type="date" :default-value="new Date()" placeholder="Select a date" :disabled-date="disabledDate" :clearable="false" /> -->
                    <!-- 
                        <el-form-item label="Showtime">D
                            <el-radio-group v-model="formState.showtime" class="showtime-group">
                                <el-radio-button v-for="time in availableShowtimes" :key="time" :label="time">
                                    {{ time }}
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item> -->
                    <!-- </el-form> -->
                </el-card>
            </el-col>

            <!-- <el-col :xs="24" :lg="14">
                <el-card class="booking-card" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <span>座位選擇</span>
                        </div>
                    </template>

                    <div class="screen">銀幕</div>

                    <div class="seat-grid">
                        <div v-for="row in seatRows" :key="row.label" class="seat-row">
                            <span class="row-label">{{ row.label }}</span>
                            <div class="row-seats">
                                <el-button
                                    v-for="seat in row.seats"
                                    :key="seat.id"
                                    class="seat-button"
                                    :type="isSeatSelected(seat.id) ? 'primary' : 'info'"
                                    :plain="!isSeatSelected(seat.id)"
                                    size="small"
                                    :disabled="seat.reserved"
                                    @click="toggleSeat(seat.id)"
                                >
                                    {{ seat.label }}
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <div class="seat-legend">
                        <el-tag type="primary" effect="dark" size="small">Selected</el-tag>
                        <el-tag type="info" size="small">Available</el-tag>
                        <el-tag type="danger" effect="plain" size="small">Sold</el-tag>
                    </div>

                    <el-divider />

                    <el-descriptions :column="1" size="small" border>
                        <el-descriptions-item label="Movie">
                            {{ activeMovie.title }}
                        </el-descriptions-item>
                        <el-descriptions-item label="Date">
                            {{ formattedDate }}
                        </el-descriptions-item>
                        <el-descriptions-item label="Showtime">
                            {{ formState.showtime || "Select a showtime" }}
                        </el-descriptions-item>
                        <el-descriptions-item label="Seats">
                            <span v-if="selectedSeatsArray.length">
                                {{ selectedSeatsArray.join(", ") }}
                            </span>
                            <span v-else>No seats selected</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="Total">
                            <strong>{{ formattedTotal }}</strong>
                        </el-descriptions-item>
                    </el-descriptions>

                    <div class="action-bar">
                        <el-button type="primary" :disabled="!canSubmit" @click="handleBooking"> Confirm Booking </el-button>
                        <span class="available-info"> Seats left: {{ availableSeatCount }} </span>
                    </div>
                </el-card>
            </el-col> -->
        </el-row>
    </div>
</template>

<script setup>
    import { computed, reactive, ref, watch, onMounted, toRef } from "vue";
    import { ElMessage } from "element-plus";
    import api from "@/api/api.js";

    async function fetchBooking() {
        try {
            const response = await api.get(`/Booking`);
            const { data } = response;
            return data.map((item) => ({
                ...item,
                path: `/movies/${item.fileName}`,
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
            return []; // 失敗時至少回傳空陣列
        }
    }
    // **從後端取得電影資料 fetchBooking** //
    const response = await fetchBooking();
    // 將資料轉成響應式
    const booking = reactive(
        response.map((item) => ({
            ...item,
            path: `/movies/${item.fileName}`,
        }))
    );
    // 預設選取第一部電影
    const movie = ref(booking[0]?.movieId ?? null);
    // 依照表單選擇取得當前顯示的電影
    const activeMovie = computed(() => booking.find((b) => b.movieId === movie.value) ?? booking[0]);
    const hall = ref(null);
    watch(
        () => activeMovie.value,
        (movie) => {
            hall.value = movie?.halls?.[0]?.id ?? null;
        },
        { immediate: true }
    );

    // const disabledDate = (time) => {
    //     const start = new Date("2024-10-10");
    //     const end = new Date("2024-10-21");
    //     return time >= start && time <= end; // 禁用這段期間
    // };
    // const showDate = ref(new Date());
    // console.log(disabledDate("2024-10-20"));

    // // 座位藍圖：定義每排可售座位數與已預訂的座位
    // const seatBlueprint = [
    //     { label: "A", count: 8, reserved: ["A3", "A4"] },
    //     { label: "B", count: 8, reserved: ["B2", "B6"] },
    //     { label: "C", count: 10, reserved: ["C5", "C6", "C7"] },
    //     { label: "D", count: 10, reserved: [] },
    //     { label: "E", count: 12, reserved: ["E10", "E11", "E12"] },
    // ];

    // // 使用者目前勾選的座位清單
    // const selectedSeats = ref([]);

    // // 將座位藍圖轉換為畫面使用的座位列資料
    // const seatRows = computed(() =>
    //     seatBlueprint.map((row) => ({
    //         label: row.label,
    //         seats: Array.from({ length: row.count }, (_, index) => {
    //             const seatId = `${row.label}${index + 1}`;
    //             return {
    //                 id: seatId,
    //                 label: seatId,
    //                 reserved: row.reserved.includes(seatId),
    //             };
    //         }),
    //     }))
    // );

    // // 目前電影可供選擇的放映場次
    // const availableShowtimes = computed(() => activeMovie.value?.showtimes ?? []);

    // // 以陣列形式回傳選取座位，方便模板綁定與訊息顯示
    // const selectedSeatsArray = computed(() => [...selectedSeats.value]);

    // // 計算剩餘可售座位數，避免重複計算
    // const availableSeatCount = computed(() => {
    //     const total = seatBlueprint.reduce((sum, row) => sum + row.count, 0);
    //     const reserved = seatBlueprint.reduce((sum, row) => sum + row.reserved.length, 0);
    //     return Math.max(0, total - reserved - selectedSeats.value.length);
    // });

    // // 依目前票價與選取座位數量計算總金額
    // const totalPrice = computed(() => (activeMovie.value ? activeMovie.value.price * selectedSeats.value.length : 0));

    // // 將總金額格式化為新台幣字串
    // const formattedTotal = computed(() =>
    //     totalPrice.value
    //         ? totalPrice.value.toLocaleString("zh-TW", {
    //               style: "currency",
    //               currency: "TWD",
    //               maximumFractionDigits: 0,
    //           })
    //         : "TWD 0"
    // );

    // // 將選擇的日期格式化為易讀字串
    // const formattedDate = computed(() =>
    //     formState.date
    //         ? new Intl.DateTimeFormat("en-US", {
    //               year: "numeric",
    //               month: "2-digit",
    //               day: "2-digit",
    //               weekday: "short",
    //           }).format(formState.date)
    //         : "Select a date"
    // );

    // // 檢查表單是否完整且至少選擇一個座位
    // const canSubmit = computed(() => !!formState.movieId && !!formState.showtime && selectedSeats.value.length > 0);

    // // 切換電影時重設場次與座位選擇
    // watch(
    //     () => formState.movieId,
    //     () => {
    //         if (!availableShowtimes.value.includes(formState.showtime)) {
    //             formState.showtime = availableShowtimes.value[0] ?? "";
    //         }
    //         selectedSeats.value = [];
    //     }
    // );

    // // 變更日期時清空座位選擇
    // watch(
    //     () => formState.date,
    //     () => {
    //         selectedSeats.value = [];
    //     }
    // );

    //     const maxDate = new Date(today);
    //     maxDate.setDate(maxDate.getDate() + 14);

    //     return compare < today || compare > maxDate;
    // };

    // // 點擊座位按鈕時切換選取狀態，忽略已預訂座位
    // const toggleSeat = (seatId) => {
    //     const seat = findSeat(seatId);
    //     if (!seat || seat.reserved) {
    //         return;
    //     }
    //     if (isSeatSelected(seatId)) {
    //         selectedSeats.value = selectedSeats.value.filter((id) => id !== seatId);
    //         return;
    //     }

    //     selectedSeats.value = [...selectedSeats.value, seatId];
    // };

    // // 在座位資料中尋找指定座位物件
    // const findSeat = (seatId) => {
    //     for (const row of seatRows.value) {
    //         const seat = row.seats.find((item) => item.id === seatId);
    //         if (seat) {
    //             return seat;
    //         }
    //     }
    //     return null;
    // };

    // // 判斷座位是否已被選取
    // const isSeatSelected = (seatId) => selectedSeats.value.includes(seatId);

    // // 送出預約時進行驗證並顯示提示訊息
    // const handleBooking = () => {
    //     if (!canSubmit.value) {
    //         ElMessage.warning("Please select a movie, date, showtime, and at least one seat.");
    //         return;
    //     }

    //     ElMessage.success(`Booking confirmed: ${activeMovie.value.title} on ${formattedDate.value} at ${formState.showtime}. Seats: ${selectedSeatsArray.value.join(", ")}`);
    // };
</script>

<style scoped>
    .booking {
        padding: 16px;
    }

    .booking-card {
        min-height: 100%;
    }

    .movie-header {
        display: flex;
        gap: 16px;
        align-items: center;
    }

    .movie-poster {
        width: 110px;
        height: 160px;
        border-radius: 8px;
        overflow: hidden;
    }

    .poster-fallback {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: var(--el-color-info-light-7);
        color: var(--el-color-info-dark-2);
        font-size: 14px;
    }

    .movie-meta {
        flex: 1;
    }

    .movie-title {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
    }

    .movie-tags {
        display: flex;
        gap: 8px;
        margin: 8px 0;
    }

    .movie-info {
        margin: 0;
        color: var(--el-text-color-secondary);
        font-size: 14px;
    }

    .showtime-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
    }

    .screen {
        margin: 0 auto 16px;
        padding: 12px 24px;
        border-radius: 4px;
        background: linear-gradient(to bottom, var(--el-color-primary-light-9), var(--el-color-primary-light-7));
        color: var(--el-color-primary-dark-2);
        font-weight: 600;
        text-align: center;
        width: 70%;
    }

    .seat-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;
    }

    .seat-row {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .row-label {
        width: 28px;
        text-align: right;
        font-weight: 600;
        color: var(--el-text-color-secondary);
    }

    .row-seats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
        gap: 8px;
        flex: 1;
    }

    .seat-button {
        width: 100%;
    }

    .seat-legend {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
    }

    .action-bar {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
    }

    .available-info {
        color: var(--el-text-color-regular);
        font-size: 14px;
    }

    @media screen and (max-width: 768px) {
        .movie-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .movie-poster {
            width: 100%;
            height: auto;
        }

        .row-seats {
            grid-template-columns: repeat(4, 1fr);
        }
    }
</style>
