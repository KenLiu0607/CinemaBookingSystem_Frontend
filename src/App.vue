<template>
    <el-container>
        <el-header class="header">
            <div class="logo">🎬 Cinema Booking System</div>
            <div class="actions">
                <el-tooltip content="訂票" placement="bottom-start" effect="light">
                    <el-dropdown placement="bottom-end" trigger="click">
                        <el-button>
                            <el-icon class="icon-clickable" size="20px"><Ticket /></el-icon>
                            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>線上預訂</el-dropdown-item>
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
        </el-header>
        <el-main>
            <RouterView></RouterView>
        </el-main>
        <el-footer class="footer">© 2024 Cinema Booking System</el-footer>
    </el-container>
</template>

<script setup>
    import { onMounted, ref, watchEffect } from "vue";
    import { Moon, Sunny } from "@element-plus/icons-vue";

    // 建立媒體查詢監聽
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = ref(mediaQuery.matches);
    function applyTheme() {
        // 根據狀態設定 HTML 類別
        document.documentElement.classList.toggle("dark", isDark.value);
    }
    onMounted(async () => {
        await Promise.all([applyTheme()]);
    });
</script>

<style scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background: var(--el-bg-color-overlay);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .logo {
        font-weight: 600;
        font-size: 1.2rem;
    }
    .actions {
        display: flex;
        align-items: center;
    }
    .footer {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-top: 1px solid var(--el-border-color-light);
        color: var(--el-text-color-regular);
    }
    .el-dropdown {
        margin-right: 10px;
    }
    .user-button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }
</style>
