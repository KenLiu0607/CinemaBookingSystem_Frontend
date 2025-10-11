import { createWebHistory, createRouter } from "vue-router";

import Home from "@/components/Home.vue";
import Booking from "@/components/Booking.vue";

const routes = [
    { path: "/", component: Home, meta: { breadcrumb: "首頁" } },
    { path: "/Booking", component: Booking, meta: { breadcrumb: "線上預訂" } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
