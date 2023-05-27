<template>
  <div class="fill-height ">
    <v-snackbar v-model="snackbar" top color="warning" flat>
      <span>Votre email n'est pas associer à un compte</span>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" top color="success" flat>
      <span>Votre compte à bien était mis à jour</span>
    </v-snackbar>
    <v-snackbar v-model="snackbar1" top color="primary" flat>
      <span>Un email de récupération vous a était transmit</span>
    </v-snackbar>
    <v-img class="align-center ml-16 mr-n16 px-15" cover width="1710" src="@/assets/3725.jpg">
      <v-card v-if="Recover" class="mx-auto px-6 py-8 align-center text-center" elevation="15" max-width="400"
        title="Recupérer mon compte"><v-form v-model="form" @submit.prevent="onSubmit">
          <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'" @click:append="show = !show" :readonly="loading" :rules="[required]"
            clearable label="Mot de passe"></v-text-field>

          <v-text-field v-model="password1" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" :readonly="loading" :rules="[required]"
            clearable label="Confirmer mot de passe"></v-text-field>
          <br>


          <v-btn :disabled="!form" :loading="loading" block color="success" size="large" variant="elevated"
            @click="ChangePass()">
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
      await axios.get('http://localhost:4000/api/getuser').then(async (r) => {
        console.log(r)
        await Array.prototype.forEach.call(r.data, async (element) => {
          if (element.email == this.email) {
            this.send = false
            await axios.post('http://localhost:4000/email/send', {
              email: this.email,
              subject: "Email de recupération",
              text: "Bonjour sur TaskSquad il semblerait que vous aillez oublier votre mot de passe sur TaskSquad Pas de soucis nous somme là pour vous aider clicker ici pour recuperer votre mot de passe Si vous n'êtes pas à l'origine de cette demande veuillez ignorez ce mail",
              html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto&display=swap" rel="stylesheet">
  
  <!--[if mso]>
  <style>
    table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
    div, td {padding:0;}
    div {margin:0 !important;}
	</style>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    table, td, div, h1, p {
      font-family: Arial, sans-serif;
    }
    @media screen and (max-width: 530px) {
      .unsub {
        display: block;
        padding: 8px;
        margin-top: 14px;
        border-radius: 6px;
        background-color: #555555;
        text-decoration: none !important;
        font-weight: bold;
      }
      .col-lge {
        max-width: 100% !important;
      }
    }
    @media screen and (min-width: 531px) {
      .col-sml {
        max-width: 27% !important;
      }
      .col-lge {
        max-width: 73% !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;word-spacing:normal;background-color:#939297;">
  <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#ff6453;">
    <table role="presentation" style="width:100%;border:none;border-spacing:0;">
      <tr>
        <td align="center" style="padding:0;">
          <!--[if mso]>
          <table role="presentation" align="center" style="width:600px;">
          <tr>
          <td>
          <![endif]-->
          <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left; font-size:16px;line-height:22px;color:#363636;">
            <tr>
              <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                <a href="http://localhost:8080/getback/${element._id}" style="text-decoration:none;"><img src="https://i.imgur.com/FlG1OPq.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
              </td>
            </tr>
            <tr>
                <td style="padding:30px;background-color:#ffffff;">
                    <h1 style="margin-top:0;margin-bottom:30px;font-size:40px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;text-align:center;font-family: 'Playfair Display', serif;color:#000032">Récupération de votre compte!</h1>
                    <p style="margin:0;font-family: 'Roboto', sans-serif;">
                        Cher(e) ${element.first},
                        <br>
                        Nous sommes ravis de vous accueillir sur notre plateforme ! Afin de récupérer votre compte et changer votre mot de passe veuillez cliquer sur le boutton ci-dessous :</p>
                        <p style="margin:0;"><a href="http://localhost:8080/getback/${element._id}" style="background: #234e9d; text-decoration: none; padding: 10px 25px; margin-top: 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#ff3884;  "><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]--><span style="mso-text-raise:10pt;font-weight:bold;">Activer votre compte</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a></p>
                        
                </td>
                
            </tr>
            <tr>
                <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a href="http://localhost:8080/getback/${element._id}" style="text-decoration:none;"><img src="https://i.imgur.com/4Ixkuxb.jpeg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                </td>
            </tr>
            <tr>
                <td style="padding:30px;background-color:#ffffff;">
                    <p style="margin:0;font-family:'Roboto', sans-serif;">
                    Si vous avez des questions ou rencontrez des difficultés lors de l'activation de votre compte, n'hésitez pas à nous contacter à [notre adresse e-mail] et nous serons ravis de vous aider.
                    <br>
                    Nous vous remercions de votre confiance et nous nous réjouissons de vous compter parmi nos utilisateurs.
                    <br>    
                    Cordialement,
                    <br>    
                    L'équipe de Tasksquad    
                    </p>                        
                </td>
            </tr>
            <!-- <tr>
              <td style="padding:30px;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
                <a href="http://localhost:8080/getback/${element._id}" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="540" alt="" style="width:100%;height:auto;border:none;text-decoration:none;color:#363636;"></a>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background-color:#ffffff;">
                <p style="margin:0;">Duis sit amet accumsan nibh, varius tincidunt lectus. Quisque commodo, nulla ac feugiat cursus, arcu orci condimentum tellus, vel placerat libero sapien et libero. Suspendisse auctor vel orci nec finibus.</p>
              </td>
            </tr>    -->
            <tr>
              <td style="padding:30px;text-align:center;font-size:12px;background-color:#000032;color:#cccccc;">
                <p style="margin:0 0 8px 0;"><a href="http://www.facebook.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="http://www.twitter.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                <p style="margin:0;font-size:14px;line-height:20px;">&reg; Tasksquad, Tlemcen 2023<br>
                    <!-- <a class="unsub" href="http://localhost:8080/getback/${element._id}" style="color:#cccccc;text-decoration:underline;">Unsubscribe instantly</a> -->
                </p>
              </td>
            </tr>
          </table>
          <!--[if mso]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </div>
</body>
</html> `

            })
              .then(r => { console.log(r)
              if(r.status === 200){
                
            this.loading = false
            this.snackbar1 = true
              } })
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
          await axios.get('http://localhost:4000/api/edit-users/' + this.$store.state.auth.userrecoved).then(async (r) => {
            console.log(r.data)
            r.data.password = this.password
            this.snackbar2 = true
            await axios.post("http://localhost:4000/api/update-users/" + r.data._id, r.data).then(async (r) => {
              this.$store.state.auth.user = r.data._id
              this.$store.state.auth.username = r.data.first + ' ' + r.data.last
              this.$store.state.auth.useremail = r.data.email
              this.$store.state.auth.avatarlink = r.data.avatar
              setTimeout(function () { }, 10000);
              this.$router.push('/DashBoard')
            })
          })
        }
      }
    }
  },
}
</script>