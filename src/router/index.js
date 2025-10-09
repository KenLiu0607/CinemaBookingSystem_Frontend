import { createWebHistory, createRouter } from "vue-router";

import Home from "@/components/Home.vue";
import Booking from "@/components/Booking.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/Booking", component: Booking },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
