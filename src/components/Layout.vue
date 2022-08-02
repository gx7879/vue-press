<template>
  <div class="flex min-h-screen flex-col sm:flex-row">
    <!-- 左側選單 -->
    <div
      class="flex w-full flex-shrink-0 flex-col justify-between bg-violet-600 text-white sm:w-64"
    >
      <!-- logo -->
      <div
        class="flex h-16 items-center justify-between px-4 sm:justify-center"
      >
        <div class="flex items-center justify-center">
          <heroicons-outline-book-open class="mr-2 h-10 w-10" />
          <span class="text-xl font-medium">WilsonPress</span>
        </div>
        <button
          class="flex h-8 w-8 items-center justify-center sm:hidden"
          @click="toggleMenu"
        >
          <heroicons-outline-menu class="h-5 w-5" />
        </button>
      </div>
      <div
        class="flex-1 sm:flex sm:flex-col sm:justify-between"
        :class="{ hidden: !showMenu }"
      >
        <!-- 選單 -->
        <ul>
          <li v-for="item of menuItems" :key="item.to">
            <!-- <RouterLink
              v-slot="{ href, isActive }"
              custom
              :to="item.to"
            > -->
            <RouterLink
              :to="item.to"
              class="flex items-center px-4 py-3 hover:text-white sm:px-5"
              :class="{
                'text-white': isActive(item.to),
                'text-violet-400': !isActive(item.to),
              }"
            >
              <!-- <a
                :href="href"
                class="flex items-center px-4 sm:px-5 py-3 hover:text-white"
                :class="{ 'text-white': isActive(item.to), 'text-violet-400': !isActive(item.to) }"
              > -->
              <component :is="item.icon" class="mr-2 h-5 w-5" />
              {{ item.text }}
              <!-- </a> -->
            </RouterLink>
          </li>
        </ul>
        <!-- 用戶名稱 - m -->
        <div class="mt-2 border-t border-violet-400 py-1 sm:hidden">
          <div class="flex items-center px-4 py-3">
            <img
              class="mr-2 h-8 w-8 rounded-full"
              src="https://image.shutterstock.com/image-vector/hand-drawn-vintage-cute-cat-600w-1701332881.jpg"
              alt=""
            />
            <div class="font-medium tracking-wide">Wilson</div>
          </div>

          <ul>
            <template v-for="(item, index) of userMenuItems" :key="index">
              <li v-if="item.mobile">
                <component
                  :is="item.tag"
                  :to="item.to"
                  class="flex w-full items-center px-4 py-3 text-violet-400 hover:text-white"
                  @click="item.onClick"
                >
                  {{ item.text }}
                </component>
              </li>
            </template>
          </ul>
        </div>

        <!-- 用戶名稱 - pc -->
        <div
          class="hidden border-t border-violet-400 px-5 py-4 sm:flex sm:items-center sm:justify-between"
        >
          <div class="flex items-center">
            <img
              class="mr-2 h-8 w-8 rounded-full"
              src="https://image.shutterstock.com/image-vector/hand-drawn-vintage-cute-cat-600w-1701332881.jpg"
              alt=""
            />
            <div class="font-medium tracking-wide">Wilson</div>
          </div>
          <Menu as="div" class="relative">
            <!-- <MenuButton>More</MenuButton> -->
            <MenuButton
              class="flex h-7 w-7 items-center justify-center rounded transition-colors duration-100 hover:bg-violet-500"
            >
              <heroicons-outline-dots-vertical class="h-4 w-4" />
            </MenuButton>
            <Transition>
              <MenuItems
                class="absolute left-full bottom-0 ml-2 flex w-32 origin-bottom-left flex-col overflow-hidden rounded-md bg-white shadow-lg"
              >
                <MenuItem
                  v-for="(item, index) of userMenuItems"
                  :key="index"
                  v-slot="{ active }"
                >
                  <component
                    :is="item.tag"
                    :to="item.to"
                    class="px-3 py-2 text-left text-base font-normal text-gray-700"
                    :class="{ 'bg-gray-100': active }"
                    @click="item.onClick"
                  >
                    {{ item.text }}
                  </component>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
    <!-- 右側內容 -->
    <div class="min-w-0 flex-1">
      <slot />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import heroiconsOutlineHome from "~icons/heroicons-outline/home";
import heroiconsOutlineDocumentText from "~icons/heroicons-outline/document-text";
import heroiconsOutlineUser from "~icons/heroicons-outline/user";

export default {
  components: {
    heroiconsOutlineHome,
    heroiconsOutlineDocumentText,
    heroiconsOutlineUser,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const showMenu = ref(false);

    const toggleMenu = () => (showMenu.value = !showMenu.value);
    const menuItems = [
      { to: "/", text: "首頁", icon: "heroicons-outline-home" },
      { to: "/post", text: "文章", icon: "heroicons-outline-document-text" },
      { to: "/setting", text: "個人資料", icon: "heroicons-outline-user" },
    ];

    const userMenuItems = [
      { tag: "RouterLink", to: "/setting", text: "個人資料" },
      {
        tag: "button",
        text: "登出",
        onClick: () => {
          router.push("/login");
        },
        mobile: true,
      },
    ];

    const activeItem = computed(() =>
      [...menuItems].reverse().find((item) => route.path.startsWith(item.to))
    );
    const isActive = (to) => to === activeItem.value.to;

    return {
      showMenu,
      toggleMenu,
      menuItems,
      isActive,
      userMenuItems,
    };
  },
};
</script>

<style></style>
