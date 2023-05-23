<template>
  <v-snackbar v-model="snackbar" top color="warning" flat>
    <span>Voulez vous supprimer cette ami?</span>
    <v-btn flat color="warning" @click="snackbar = false; deleteFriend()" class="ml-5">oui</v-btn>
    <v-btn flat color="warning" @click=" snackbar = false;">non</v-btn>
  </v-snackbar>
  <v-container class="my-2">

    <v-layout row class="ma-3 py-2" wrap>

      <v-spacer></v-spacer>
      <v-btn icon @click=" filterTeams('All')">
        <v-icon color="primary">mdi-select-all</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" @click=" filterTeams('Amis');">
        <v-icon color="success">mdi-account-multiple-check</v-icon>
      </v-btn>

      <v-btn icon @click=" filterTeams('Demande');">
        <v-icon color="warning">mdi-account-multiple-plus</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" @click=" filterTeams('Ajouter');">
        <v-icon color="info">mdi-account-multiple</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
    </v-layout>
    <div justify-center v-if="this.Teams.length == 0">
      <center>
        <p>Rien pour l'instant 😔</p>
      </center>
    </div>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="4" md="3" lg="2" v-for="( v ) in     Teams    " :key="v.ID">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card max-height="200" max-width="200" v-bind="props" :elevation="isHovering ? 20 : 5" :loading="loading">
              <v-row justify="center" class="mt-2 mb-1">
                <v-avatar size="64">
                  <v-img :src="v.avatar"></v-img>
                </v-avatar>
              </v-row>
              <v-card-title>{{ v.first + ' ' + v.last }}</v-card-title>
              <v-card-subtitle>{{ v.email }}</v-card-subtitle>
              <v-card-actions>
                <v-btn v-if="v.status == 'Amis'" icon @click=" snackbar = true; indexToEdit = v._id;"
                  class="pa-0 ma-0"><v-icon>mdi-account-off</v-icon></v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded="20" @click="changeStatus(v.status, v)"
                  :color="(v.status == 'Ajouter') ? 'primary' : (v.status == 'Amis') ? 'success' : 'warning'">{{
                    v.status
                  }}</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Teams_Component',
  data() {
    return {
      Teams: [],
      Team: {},
      Users: [],
      TeamsCopy: [],
      userId: '',
      snackbar: false,
      editMode: false,
      indexToEdit: "",
      loading: false,
    }
  },
  mounted() {
    if (this.$store.state.auth.user === null) {
      this.$router.push('/login')
    }
    else { this.saveOrder(); }
  },

  methods: {
    filterTeams(status) {
      this.Teams = this.TeamsCopy
      if (status === "Amis") {
        this.Teams = this.Teams.filter(function (item) {
          return item.status === "Amis";
        });

      } else if (status === "Demande") {
        this.Teams = this.Teams.filter(function (item) {
          return item.status === "Demande";
        });

      } else if (status === "Ajouter") {
        this.Teams = this.Teams.filter(function (item) {
          return item.status === "Ajouter";
        });
      } else if (status === "All") {
        this.Teams = this.TeamsCopy
      }
    },
    async changeStatus(status, value) {
      if (!this.loading) {
        this.loading = true
        if (status !== 'Amis') {
          let currentuser = this.Team
          let senconduser = await axios.get('http://localhost:4000/api/getTeam').then(async (r) => {
            return r.data.filter(function (item) {
              return item.user === value._id
            })
          })
          if(senconduser.length === 0){
            senconduser = { user: value._id, friends: [] }
          }
          else{
          senconduser = senconduser[0]
          }
          let user = this.$store.state.auth.user
          switch (status) {
            case 'En Attente':
              currentuser.friends = currentuser.friends.filter(function (item) {
                return item.user !== value._id
              })
              senconduser.friends = senconduser.friends.filter(function (item) {
                return item.user !== user
              })
              break;

            case 'Ajouter':
              var newfriend = { user: value._id, status: 'En Attente' }
              var newask = { user: user, status: 'Demande' }
              if (currentuser.friends === null) {
                currentuser = {
                  user: currentuser.user,
                  friends: [],
                  _id: currentuser._id
                }
              }
              if (senconduser.friends === null) {
                senconduser = {
                  user: senconduser.user,
                  friends: [],
                  _id: senconduser._id
                }
              }
              currentuser.friends.push(newfriend)
              senconduser.friends.push(newask)
              break;

            case 'Demande':
              try {
                Array.prototype.forEach.call(currentuser.friends, item => {
                  if (item.user === value._id) {
                    item.status = 'Amis'
                  }
                })
                Array.prototype.forEach.call(senconduser.friends, item => {
                  if (item.user === user) {
                    item.status = 'Amis'
                  }
                })
              } catch (e) {
                console.log(e)
              }
              break;
            default:
              break;
          }
          await axios.post('http://localhost:4000/api/update-Team/' + currentuser._id, currentuser)
          await axios.post('http://localhost:4000/api/update-Team/' + senconduser._id, senconduser)
        }
        this.loading = false
        this.saveOrder();
      }

    },
    async deleteFriend() {
      if (!this.loading) {
        this.loading = true
        let currentuser = this.Team
        let senconduserid = this.indexToEdit
        let senconduser = await axios.get('http://localhost:4000/api/getTeam').then(async (r) => {
          return r.data.filter(function (item) {
            return item.user === senconduserid
          })
        })
        senconduser = senconduser[0]
        let user = this.$store.state.auth.user
        currentuser.friends = currentuser.friends.filter(function (item) {
          return item.user !== senconduserid
        })
        senconduser.friends = senconduser.friends.filter(function (item) {
          return item.user !== user
        })
        await axios.post('http://localhost:4000/api/update-Team/' + currentuser._id, currentuser)
        await axios.post('http://localhost:4000/api/update-Team/' + senconduser._id, senconduser)
        this.loading = false
      }
      this.saveOrder();
    },
    async saveOrder() {
      if (!this.loading) {
        this.loading = true
        var user = this.$store.state.auth.user
        await axios.get('http://localhost:4000/api/getuser').then(r => {
          this.Users = r.data
          this.Teams = this.Users.filter(function (item) {
            return item._id !== user
          })
        })
        await axios.get('http://localhost:4000/api/getTeam').then(async (r) => {
          this.Team = r.data.filter(function (item) {
            return item.user === user
          })

          if (this.Team.length === 0) {
            await axios.post('http://localhost:4000/api/create-Team', { user: user, friends: [] }).then((r) => {
              this.Team = r.data
            })
          }
          this.Team = this.Team[0]
        })
          .then(() => {
            var adding = true
            Array.prototype.forEach.call(this.Teams, User => {
              try {
                Array.prototype.forEach.call(this.Team.friends, item => {
                  if (item.user === User._id) {
                    User.status = item.status
                    adding = false
                  }
                })
              }
              catch {
                User.status = 'Ajouter'
              }
              if (adding) {
                User.status = 'Ajouter'
              }
              adding = true
            })
          })
        this.TeamsCopy = this.Teams
        this.loading = false
      }
    },
  }
}
</script> 