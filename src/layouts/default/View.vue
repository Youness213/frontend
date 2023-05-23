<template>
  <div>
    <v-toolbar dark prominent image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-toolbar-title>
        <v-container @click="$router.push('/home')">
          <v-row justify="start">
            <v-col cols="12" sm="2">
              <v-img src="https://i.imgur.com/FlG1OPq.png" width="400" />
            </v-col>
            <v-col cols="12" sm="8" class="mt-2 ml-n5">
              <span >Task Squad</span>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-row v-if="$store.state.auth.user !== null" justify="end" >
        <v-btn icon  @click="$router.push('/login'); $store.state.auth.user = null" class="mr-10">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      </v-row>
      <v-row v-else justify="end">
        <v-btn @click="$router.push('/login');">
          <b>Se connecter</b>
        </v-btn>
        <v-btn @click="$router.push('/register');" class="mr-5">
          <b>S'inscrire</b>
        </v-btn>
      </v-row>
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
  name: 'default_Component',
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
