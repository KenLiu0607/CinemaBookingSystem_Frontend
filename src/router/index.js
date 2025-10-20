import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: "/", component: () => import("@/components/Home.vue"), meta: { breadcrumb: "首頁" } },
    { path: "/Booking", component: () => import("@/components/Booking.vue"), meta: { breadcrumb: "線上預訂" } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
