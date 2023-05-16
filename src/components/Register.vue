<template>
  <div class="fill-height ">
    <v-snackbar v-model="snackbar" top color="warning" flat>
      <span>Cette adresse email est déjà utiliser</span>
    </v-snackbar>
    <v-snackbar v-model="snackbar1" top color="warning" flat>
      <span>Votre compte a bien était créé</span>
    </v-snackbar>
    <v-img class="align-center ml-16 mr-n16 px-15" cover width="1710" src="@/assets/3725.jpg">
      <v-card class="mx-auto" max-width="400" title="Création d'un compte">
        <v-form @submit.prevent ref="form">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" sm="9">

                <v-text-field v-model="user.avatar" color="primary" label="Photo de profile"
                  hint="Placez un lien d'une image/photo" variant="underlined"></v-text-field>
              </v-col>
              <v-col cols="12" sm="3">

                <v-avatar size="50">
                  <v-img :src="user.avatar"></v-img>
                </v-avatar>
              </v-col>
            </v-row>
            <v-text-field v-model="user.first" :rules="[required]" color="primary" label="Nom"
              variant="underlined"></v-text-field>

            <v-text-field v-model="user.last" :rules="[required]" color="primary" label="Surnom"
              variant="underlined"></v-text-field>

            <v-text-field v-model="user.email" :rules="[required]" color="primary" label="Email"
              variant="underlined"></v-text-field>

            <v-text-field v-model="user.password" :rules="[required]" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'" @click:append="show = !show" color="primary" label="Mot de passe"
              variant="underlined"></v-text-field>

            <v-checkbox v-model="terms" :rules="[required]" color="success"
              label="I agree to site terms and conditions"></v-checkbox>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="success" @click="$router.push('/LogIn')">
              <v-icon icon="mdi-chevron-left" start></v-icon>
              Se Connecter

            </v-btn>

            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-divider vertical></v-divider>
            <v-divider vertical></v-divider>
            <v-spacer></v-spacer>

            <v-btn color="success" @click="onSubmit();" type="submit" :loading="loading">
              S'enregistrer

              <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-img>
  </div>
</template>
  
<script>
import axios from 'axios'
export default {
  data: () => ({
    form: true,
    user: {
      avatar: 'https://randomuser.me/api/portraits/lego/0.jpg',
      first: '',
      last: '',
      email: '',
      password: '',
      status: false
    },
    loading: false,
    snackbar: false,
    snackbar1: false,
    show: false,
    terms: false
  }),

  methods: {
    async onSubmit() {
      if (!this.loading) {
        this.loading = true
        try {
          var valid = (await this.$refs.form.validate()).valid
          await axios.get('https://backendfortasksquad13.onrender.com/api/getuser').then(async (r) => {
            await Array.prototype.forEach.call(r.data, element => {
              if (element.email == this.user.email) {
                valid = false
                this.snackbar = true
              }
            })
          })
          if (valid) {
            await axios.post('https://backendfortasksquad13.onrender.com/api/create-users', this.user)
              .then(async (res) => {
                console.log(res)
                if (res.status == 200) {
                  await this.Sendit(res.data._id)
                  this.$router.push('/login')
                  this.user = {
                    avatar: 'https://randomuser.me/api/portraits/lego/0.jpg',
                    first: '',
                    last: '',
                    email: '',
                    password: '',
                    status: false
                  }
                }
              })
          }
        }
        catch {
          console.log('nope')
        }
        this.loading = false
      }

    },
    required(v) {
      return !!v || 'Champ requis'
    },
    async Sendit(id) {
      await axios.post('https://backendfortasksquad13.onrender.com/email/send', { 
        email: this.user.email, 
        subject: "Email d'activation", 
        text: "Bonjour et bienvenue sur TaskSquad Merci de vous être enregister sur notre site et d'avoir rejoint l'équipe de TaskSquad Pour Activer Votre compte veuillez clicker ici Si vous n'êtes pas à l'origine de cette demande veuillez ignorez ce mail",
        html:`<h1>Bonjour et bienvenue sur TaskSquad</h1><br/><h4>Merci de vous être enregister sur notre site et d'avoir rejoint l'équipe de <b>TaskSquad</b> <br/>Pour Activer Votre compte veuillez <a href="https://youness213.github.io/Active/${id}">clicker ici</a> <br/>Si vous n'êtes pas à l'origine de cette demande veuillez ignorez ce mail</h4>`
      }).then(r => { console.log(r) })
    },
  },
}
</script>
