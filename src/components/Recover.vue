<template>
    <div class="fill-height ">
        <v-snackbar v-model="snackbar" top color="warning" flat>
            <span>Votre email n'est pas associer à un compte</span>
        </v-snackbar>
        <v-snackbar v-model="snackbar1" top color="primary" flat>
            <span>Un email contenant votre mot de passe viens d'être envoyer</span>
        </v-snackbar>
        <v-img class="align-center ml-16 mr-n16 px-15" cover width="1710" src="@/assets/3725.jpg">
            <v-card class="mx-auto px-6 py-8 align-center text-center" elevation="15" max-width="400"
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
    data: () => ({
        email: null,
        loading: false,
        snackbar: false,
        snackbar1: false,
        send: true
    }),

    methods: {
        async onSubmit() {
            this.loading = true
            await axios.get('https://backendfortasksquad13.onrender.com/api/getuser').then(async (r) => {
                await r.data.forEach(async (element) => {
                    if (element.email == this.email) {
                        this.send = false
                        this.snackbar1 = true
                        this.loading = false
                        /*await Email.send({
                            Host: "smtp.elasticemail.com",
                            Port: '2525',
                            Username: "tasksquad13000@gmail.com",
                            Password: "8AC08D1583A27406869865CBDB55A9209811",
                            To: element.email,
                            From: "tasksquad13000@gmail.com",
                            Subject: "Email de recupération",
                            Body: "Votre mot de passe est : " + element.password,
                        })*/
                    }
                });
                if (this.send) {
                    this.snackbar = true
                    this.loading = false
                }
            })
        },
    },
}
</script>