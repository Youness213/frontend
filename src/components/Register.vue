<template>
  <div class="fill-height ">
    <v-snackbar v-model="snackbar" top color="warning" flat>
      <span>Cette adresse email est déjà utiliser</span>
    </v-snackbar>
      <v-img class="align-center ml-16 mr-n16 px-15"
      cover
      width="1710"
        src="@/assets/3725.jpg"
      >
      <v-card
          class="mx-auto"
          max-width="400"
          title="Création d'un compte"
        >
        <v-form @submit.prevent ref="form">
          <v-container>
            <v-text-field
              v-model="user.first"
              :rules="[required]"
              color="primary"
              label="Nom"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="user.last"
              :rules="[required]"
              color="primary"
              label="Prénom"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              :rules="[required]"
              color="primary"
              label="Email"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="user.password"
              :rules="[required]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              color="primary"
              label="Mot de passe"
              variant="underlined"
            ></v-text-field>

            <v-checkbox
              v-model="terms"
              :rules="[required]"
              color="success"
              label="I agree to site terms and conditions"
            ></v-checkbox>
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
      user  :{
      first:'',
      last:'',
      email: '',
      password: '',
      status:false
      },
      loading: false,
      snackbar:false,
      show: false,
      terms:false
    }),

    methods: {
      async onSubmit () {
        try {
          var valid =(await this.$refs.form.validate()).valid
          await axios.get('https://backendfortasksquad13.onrender.com/api/getuser').then(r => {
            r.data.forEach(element => {
              if(element.email == this.email){
                valid = false
                this.snackbar = true
              }
            });
          })
          if (valid) {
            axios.post('https://backendfortasksquad13.onrender.com/api/create-users',this.user)
            .then(async (res) => {
              if(res.status ==200){
                
                await this.Sendit()
                this.$router.push('/login')
                this.user = {
                  first:'',
                  last:'',
                  email: '',
                  password: '',
                  status:false
                }
              }
            })

          }
        }
        catch{
          console.log('nope')
        }
      },
      required (v) {
        return !!v || 'Champ requis'
      },
      async Sendit() {
        /*await Email.send({
          Host: "smtp.elasticemail.com",
          Port: '2525',
          Username: "tasksquad13000@gmail.com",
          Password: "8AC08D1583A27406869865CBDB55A9209811",
          To: this.user.email,
          From: "tasksquad13000@gmail.com",
          Subject: "Email d'activation",
          Body: "Votre compte viens d'être activer",
        });*/
      },
    },
  }
</script>
