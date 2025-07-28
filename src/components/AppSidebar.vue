<script setup lang="ts">
import { University, LayoutPanelLeft, BookCopy, UsersRound, Settings, LogOut, GraduationCap } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { logout } from "@/services/AuthService";
import { useRoute } from "vue-router";
import { useAuth } from "@/lib/useAuth";

const route = useRoute();

const { userRole, getUserInfo } = useAuth();
getUserInfo();

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: LayoutPanelLeft,
  },
  {
    title: "Minhas Turmas",
    url: "/classes",
    icon: BookCopy,
  },
  {
    title: "Cursos",
    url: "/courses",
    icon: University,
  },
  ...(userRole.value !== 'Student' ? [
    {
      title: "Professores",
      url: "/teachers",
      icon: GraduationCap,
    },
    ...(userRole.value !== 'Teacher' ? [{
      title: "Alunos",
      url: "/students",
      icon: UsersRound,
    }] : []),
  ] : []),
];

const footerItems = [
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
  },
];

const logoutGedu = async () => {
  await logout();
  location.reload();
};
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <div class="pl-4">
        <img class="h-10 mt-4" src="@/assets/logoWhite.svg" alt="Gedu">
      </div>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title" :url="item.url"
              :class="route.path === item.url ? 'bg-hover-sidebar rounded-md' : ''">
              <SidebarMenuButton asChild>
                <router-link :to="item.url" :class="route.path === item.url ? 'text-white' : ''">
                  <component :is="item.icon" :class="route.path === item.url ? 'text-primary-color' : ''" />
                  <span>{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu class="mb-3">
        <SidebarMenuItem v-for="item in footerItems" :key="item.title" :url="item.url"
          :class="route.path === item.url ? 'bg-hover-sidebar rounded-md' : ''">
          <SidebarMenuButton asChild>
            <router-link :to="item.url" :class="route.path === item.url ? 'text-white' : ''">
              <component :is="item.icon" :class="route.path === item.url ? 'text-primary-color' : ''" />
              <span>{{ item.title }}</span>
            </router-link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <button class="logout" @click="logoutGedu()">
          <LogOut class="h-4" /> Sair
        </button>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>