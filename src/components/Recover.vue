<template>
    <div class="fill-height ">
        <v-snackbar v-model="snackbar" top color="warning" flat>
            <span>Votre email n'est pas associer à un compte</span>
        </v-snackbar>
        <v-snackbar v-model="snackbar2" top color="success" flat>
            <span>Votre compte à bien était mis à jour</span>
        </v-snackbar>
        <v-snackbar v-model="snackbar1" top color="primary" flat>
            <span>Un email contenant votre mot de passe viens d'être envoyer</span>
        </v-snackbar>
        <v-img class="align-center ml-16 mr-n16 px-15" cover width="1710" src="@/assets/3725.jpg">
            <v-card v-if="Recover" class="mx-auto px-6 py-8 align-center text-center" elevation="15" max-width="400"
                title="Recupérer mon compte"><v-form v-model="form" @submit.prevent="onSubmit">
                    <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'" @click:append="show = !show" :readonly="loading"
                        :rules="[required]" clearable label="Mot de passe"></v-text-field>

                    <v-text-field v-model="password1" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :readonly="loading"
                        :rules="[required]" clearable label="Confirmer mot de passe"></v-text-field>
                    <br>


                    <v-btn :disabled="!form" :loading="loading" block color="success" size="large"
                        variant="elevated" @click="ChangePass()">
                        Changer mon mot de passe
                    </v-btn>
                </v-form>
            </v-card>
            <v-card class="mx-auto px-6 py-8 align-center text-center" elevation="15" max-width="400" v-else
                title="Recupérer mon compte">

                <v-text-field v-model="email" class="mb-2" clearable label="Email"></v-text-field>

                <br>

                <v-btn :loading="loading" block @click="onSubmit()" color="success" size="large" variant="elevated">
                    M'envoyer par email
                </v-btn>
            </v-card>
        </v-img>
    </div>
</template>
  
<script>
import axios from 'axios'

export default {
    name: 'Recover_Component',
    props: {
        Recover: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        email: null,
        password: '',
        password1: '',
        loading: false,
        snackbar: false,
        snackbar1: false,
        snackbar2: false,
        send: true,
        show: false,
        show1: false,
    }),

    methods: {
        async onSubmit() {
            this.loading = true
            await axios.get('https://backendfortasksquad13.onrender.com/api/getuser').then(async (r) => {
                await Array.prototype.forEach.call(r.data, async (element) => {
                    if (element.email == this.email) {
                        this.send = false
                        this.snackbar1 = true
                        this.loading = false
                        await axios.post('https://backendfortasksquad13.onrender.com/email/send', {
                            email: this.email,
                            subject: "Email de recupération",
                            text: "Bonjour sur TaskSquad il semblerait que vous aillez oublier votre mot de passe sur TaskSquad Pas de soucis nous somme là pour vous aider clicker ici pour recuperer votre mot de passe Si vous n'êtes pas à l'origine de cette demande veuillez ignorez ce mail",
                            html: `<h1>Bonjour sur TaskSquad</h1><br/><h4>il semblerait que vous aillez oublier votre mot de passe sur <b>TaskSquad</b> <br/>Pas de soucis nous somme là pour vous aider <a href="https://tasksquad13-d0q0.onrender.com/getback/${element._id}">clicker ici</a> pour recuperer votre mot de passe <br/>Si vous n'êtes pas à l'origine de cette demande veuillez ignorez ce mail</h4>`

                        })
                            .then(r => { console.log(r) })
                    }
                });
                if (this.send) {
                    this.snackbar = true
                    this.loading = false
                }
            })
        },
        async ChangePass() {
            if (!this.loading) {
                this.loading = true
                if (this.password === this.password1) {
                    await axios.get('https://backendfortasksquad13.onrender.com/api/edit-users/' + this.$store.state.auth.userrecoved).then(async (r) => {
                        console.log(r.data)
                        r.data.password = this.password
                        this.snackbar2 = true
                        await axios.post("https://backendfortasksquad13.onrender.com/api/update-users/" + r.data._id, r.data).then(async (r) => {
                            this.$store.state.auth.user = r.data._id
                            this.$store.state.auth.username = r.data.first + ' ' + r.data.last
                            this.$store.state.auth.useremail = r.data.email
                            this.$store.state.auth.avatarlink = r.data.avatar
                            setTimeout(function () {}, 10000);
                            this.$router.push('/DashBoard')
                        })
                    })
                }
            }
        }
    },
}
</script>