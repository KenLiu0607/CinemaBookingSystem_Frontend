<template>
    <el-container>
        <el-header class="header">
            <el-row justify="space-between">
                <el-col :span="12">
                    <div class="logo" @click="goHome">🎬 一個人影院</div>
                </el-col>
                <el-col :span="12" class="actions-col">
                    <div class="actions">
                        <el-tooltip content="訂票" placement="bottom-start" effect="light">
                            <el-dropdown placement="bottom-end" trigger="click">
                                <el-button>
                                    <el-icon class="icon-clickable" size="20px"><Ticket /></el-icon>
                                    <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="goBooking">線上預訂</el-dropdown-item>
                                        <el-dropdown-item :divided="true">查詢紀錄</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-tooltip>
                        <el-dropdown placement="bottom-start" trigger="click">
                            <el-button class="user-button">
                                <el-image src="/members/ken460X460.png" fit="fill" style="width: 32px; height: 32px; border-radius: 50%" />
                                <!-- <el-icon class="icon-clickable"><UserFilled /></el-icon> -->
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>登入</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <el-switch v-model="isDark" :active-icon="Moon" :inactive-icon="Sunny" @change="applyTheme" />
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main class="main">
            <el-row>
                <el-col>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item v-for="b in breadcrumbs" :key="b.path" :to="{ path: b.path }">{{ b.breadcrumb }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <RouterView></RouterView>
                </el-col>
            </el-row>
        </el-main>
        <el-footer class="footer">
            <el-row>
                <el-col> © 2024 Cinema Booking System </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { Moon, Sunny, ArrowRight } from "@element-plus/icons-vue";
    import { useRouter } from "vue-router";

    // 建立媒體查詢監聽
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = ref(mediaQuery.matches);
    function applyTheme() {
        document.documentElement.classList.toggle("dark", isDark.value);
    }
    onMounted(async () => {
        await Promise.all([applyTheme()]);
    });

    // 路由
    const route = useRouter();
    const goBooking = () => route.push("/Booking");
    const goHome = () => route.push("/");
    let breadcrumbs = ref([]);
    route.beforeEach((to, from) => {
        breadcrumbs.value = to.matched.filter((r) => r.meta?.breadcrumb).map((r) => ({ path: r.path, breadcrumb: r.meta.breadcrumb }));
        breadcrumbs.value.unshift({ path: "/", breadcrumb: "首頁" });
        if (to.path === "/") {
            breadcrumbs.value = [];
        }
    });
</script>

<style>
    .title {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .header .logo {
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .header .actions-col {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .header .el-dropdown {
        margin-right: 10px;
    }
    .header .user-button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-top: 1px solid var(--el-border-color-light);
        color: var(--el-text-color-regular);
    }
</style>
