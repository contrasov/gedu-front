<script setup lang="ts">
import { University, LayoutPanelLeft, BookCopy, UsersRound, Settings, LogOut, GraduationCap } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { logout } from "@/services/AuthService";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "#",
    icon: LayoutPanelLeft,
  },
  {
    title: "Turmas",
    url: "#",
    icon: BookCopy,
  },
  {
    title: "Cursos",
    url: "#",
    icon: University,
  },
  {
    title: "Alunos",
    url: "#",
    icon: UsersRound,
  },
  {
    title: "Professores",
    url: "#",
    icon: GraduationCap,
  },
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
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <a :href="item.url">
                      <component :is="item.icon" class="text-stroke-1" />
                      <span>{{item.title}}</span>
                    </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu class="mb-3">
        <SidebarMenuItem v-for="item in footerItems" :key="item.title" :url="item.url">
          <SidebarMenuButton asChild>
            <a :href="item.url">
              <component :is="item.icon" />
              <span>{{ item.title }}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <button class="logout" @click="logoutGedu()">
          <LogOut class="h-4" /> Sair
        </button>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>