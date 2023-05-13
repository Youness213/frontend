<template>
  <div class="fill-height ">
    <v-snackbar v-model="snackbar" top color="error" flat>
      <span>Adresse email ou mot de passe incorrecte</span>
    </v-snackbar>
      <v-img class="align-center ml-16 mr-n16 px-15"
      cover
      width="1710"
        src="@/assets/3725.jpg"
      >
        <v-card class="mx-auto px-6 py-8 align-center text-center" elevation="15" max-width="400"  title="Connexion">
          <v-form
            v-model="form"
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="email"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              clearable
              label="Email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              :readonly="loading"
              :rules="[required]"
              clearable
              label="Mot de passe"
              placeholder="Enter your password"
            ></v-text-field>
            <span color="primary"><a @click="$router.push('Recover')">Mot de passe oublié?</a></span>
            <br>
            

            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              color="success"
              size="large"
              type="submit"
              variant="elevated"
            >
              Se Connecter
            </v-btn>
            <br>

            <v-btn
              block
              color="success"
              size="large"
              @click="$router.push('/Register')"
              variant="elevated"
            >
              S'inscrire
            </v-btn>
          </v-form>
        </v-card>
      </v-img>
  </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
export default {
    name:'Connexion_Component',
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
      show:false,
      fail:true,
      snackbar:false
    }),

    methods: {
      async onSubmit () {
        if (!this.form) return
        try{
          this.loading = true
        await axios.get('https://backendfortasksquad13.onrender.com/api/getuser').then(r => {
          r.data.forEach(element => {
            if(element.email == this.email && element.password == this.password){
              this.loading = false
              this.$store.state.auth.user = element._id
              this.$store.state.auth.username = element.first + ' ' + element.last
              this.$store.state.auth.useremail = element.email
              this.fail = false
            }
          });
          
        router.push('/DashBoard')
        })
        }catch{
          this.loading = false
          this.snackbar = true
        }
      },
      required (v) {
        return !!v || 'Champ requis'
      }

    },
  }
</script>
