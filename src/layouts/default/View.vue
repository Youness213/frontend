<template>
  <div>
    <v-toolbar dark prominent image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-app-bar-nav-icon>
        <v-menu activator="parent" transition="slide-x-transition" v-if="$store.state.auth.user === null">
          <template v-slot:activator="{ props }">
            <v-btn density="comfortable" icon="mdi-format-list-checkbox" v-bind="props" large>

            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>
                <v-btn @click="$router.push(item.route)" elevation="0">

                  {{ item.title }}
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>

        </v-menu>
        <v-img src="@/assets/package.png" v-if="$store.state.auth.user !== null"></v-img>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Task Squad</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="$store.state.auth.user !== null" @click="$router.push('/login');$store.state.auth.user = null">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
  <v-layout v-if="$store.state.auth.user !== null">
    <v-navigation-drawer expand-on-hover rail>

      <v-card>
        <v-list>
          <v-list-item :prepend-avatar="$store.state.auth.avatarlink" :title="$store.state.auth.username"
            :subtitle="$store.state.auth.useremail"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="Ma liste" @click="$router.push('/DashBoard')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Mes amis" @click="$router.push('/Teams')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Mon compte" @click="$router.push('/Account')"></v-list-item>
        </v-list>
      </v-card>
        <v-spacer></v-spacer>
    </v-navigation-drawer>

    <v-main style="height: auto">
      <router-view />
    </v-main>
  </v-layout>
  <v-main v-else>
      <router-view />
    </v-main>
</template>

<script>
export default {
    name:'default_Component',
  data: () => ({
    items: [
      { title: 'Acceuil', route: '/Home' },
      { title: 'Connexion', route: '/LogIn' },
      { title: 'Nouveau Compte', route: '/Register' },
    ],
    state: false,
  }),
}
</script>
