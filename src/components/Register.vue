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
          await axios.get('http://localhost:4000/api/getuser').then(async (r) => {
            await Array.prototype.forEach.call(r.data, element => {
              if (element.email == this.user.email) {
                valid = false
                this.snackbar = true
              }
            })
          })
          if (valid) {
            await axios.post('http://localhost:4000/api/create-users', this.user)
              .then(async (res) => {
                console.log(res)
                if (res.status == 200) {
                  await this.Sendit(res.data._id)
                  this.user = {
                    avatar: 'https://randomuser.me/api/portraits/lego/0.jpg',
                    first: '',
                    last: '',
                    email: '',
                    password: '',
                    status: false
                  }
                  this.snackbar1 = true
                  setTimeout(() => {}, 10000);
                  this.$router.push('/login')
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
      await axios.post('http://localhost:4000/email/send', {
        email: this.user.email,
        subject: "Email d'activation",
        text: "Bonjour et bienvenue sur TaskSquad Merci de vous être enregister sur notre site et d'avoir rejoint l'équipe de TaskSquad Pour Activer Votre compte veuillez clicker ici Si vous n'êtes pas à l'origine de cette demande veuillez ignorez ce mail",
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
                <a href="http://localhost:8080/Active/${id}" style="text-decoration:none;"><img src="https://i.imgur.com/FlG1OPq.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
              </td>
            </tr>
            <tr>
                <td style="padding:30px;background-color:#ffffff;">
                    <h1 style="margin-top:0;margin-bottom:30px;font-size:40px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;text-align:center;font-family: 'Playfair Display', serif;color:#000032">Activation de votre compte!</h1>
                    <p style="margin:0;font-family: 'Roboto', sans-serif;">
                        Cher(e) ${this.user.first},
                        <br>
                        Nous sommes ravis de vous accueillir sur notre plateforme ! Afin de profiter pleinement de nos services, veuillez activer votre compte en cliquant sur le boutton ci-dessous :</p>
                        <p style="margin:0;"><a href="http://localhost:8080/Active/${id}" style="background: #234e9d; text-decoration: none; padding: 10px 25px; margin-top: 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#ff3884;  "><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]--><span style="mso-text-raise:10pt;font-weight:bold;">Activer votre compte</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a></p>
                        
                </td>
                
            </tr>
            <tr>
                <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a href="http://localhost:8080/Active/${id}" style="text-decoration:none;"><img src="https://i.imgur.com/4Ixkuxb.jpeg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
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
                <a href="http://localhost:8080/Active/${id}" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="540" alt="" style="width:100%;height:auto;border:none;text-decoration:none;color:#363636;"></a>
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
                    <!-- <a class="unsub" href="http://localhost:8080/Active/${id}" style="color:#cccccc;text-decoration:underline;">Unsubscribe instantly</a> -->
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
      }).then(r => { console.log(r) })
    },
  },
}
</script>
