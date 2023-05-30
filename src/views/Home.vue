<template>
  <div>
    <v-parallax src="https://i.imgur.com/4Ixkuxb.jpeg">
      <v-container>
        <v-row>
          <v-card class="pa-4 mt-5" color="transparent" elevation="10">
            <v-card-title align="center" class="text-h4 white--text">
              Bienvenue <br />sur<br />
            </v-card-title>
            <v-card-title align="center" class="pb-2 mb-5 text-h2 white--text">
              TaskSquad
            </v-card-title>
            <v-card-text align="center" class="text-subtitle-1">
              <b class="white--text">TaskSquad est votre site de gestion de tâches ultime ! Nous sommes une équipe
                passionnée, dévouée et
                prête à vous accompagner dans l'organisation efficace de vos tâches quotidiennes. Avec notre expertise et
                notre engagement envers la productivité, nous vous aiderons à optimiser votre temps et à atteindre vos
                objectifs.<br />

                Inscrivez-vous ou connectez-vous dès maintenant sur TaskSquad pour profiter de notre plateforme conviviale
                et
                puissante. Créez vos listes de tâches, ajouter vos amis, metter en place vos deadline et suivez vos
                progrès
                en
                un seul endroit pratique. Notre équipe est là pour vous guider et vous soutenir tout au long de votre
                parcours
                vers une gestion des tâches plus efficace.<br />

                Ne laissez plus les tâches s'accumuler et la productivité diminuer. Rejoignez TaskSquad aujourd'hui et
                prenez
                le contrôle de votre emploi du temps. Votre réussite commence ici !<br /></b>
            </v-card-text>
          </v-card>
        </v-row>
        <v-container class="pa-16">
          <v-container class="px-14">
            <v-card>
              <v-card-title class="text-h5">
                Qui sommes nous?
                <v-btn :icon="show1 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show1 = !show1" flat></v-btn>
              </v-card-title>
              <v-expand-transition>
                <div v-show="show1">
                  <v-divider></v-divider>
                  <v-card-text class="text-subtitle-1">
                    Bienvenue dans l'univers de TaskSquad ! Nous sommes une équipe passionnée et dévouée à
                    simplifier la
                    gestion de vos tâches quotidiennes. Permettez-nous de vous présenter les membres clés de notre équipe:

                    <v-row justify="center" class="my-4">
                      <v-col cols="12" xs="12" lg="4" v-for="(    v    ) in     users    " :key="v.name">
                        <v-hover>
                          <template v-slot:default="{ isHovering, props }">
                            <v-card width="500" v-bind="props" :elevation="isHovering ? 20 : 5">
                              <v-row justify="center" class="mt-2 mb-1">
                                <v-avatar size="64">
                                  <v-img :src="v.avatar"></v-img>
                                </v-avatar>
                              </v-row>
                              <v-row justify="center" class="mt-2 mb-1">
                                <v-card-title class="text-h5">{{ v.name }}</v-card-title>
                              </v-row>
                              <v-card-subtitle class="text-h6">{{ v.grade }}</v-card-subtitle>
                              <v-card-text class="text-subtitle-1">{{ v.job }}</v-card-text>
                            </v-card>
                          </template>
                        </v-hover>
                      </v-col>
                    </v-row>
                    En tant qu'équipe, nous croyons en la puissance de la collaboration et de l'innovation. Notre objectif
                    est
                    de vous
                    fournir une solution de gestion de tâches complète et personnalisable, adaptée à vos besoins
                    spécifiques.
                    Nous
                    nous engageons à améliorer constamment notre plateforme, en tenant compte de vos retours et de vos
                    suggestions,
                    pour vous offrir la meilleure expérience possible.

                    Chez TaskSquad, notre mission est de vous aider à libérer votre potentiel en optimisant votre
                    productivité
                    et en
                    vous permettant de vous concentrer sur ce qui compte vraiment. Rejoignez-nous dès maintenant et
                    découvrez
                    comment
                    TaskSquad peut transformer votre façon de gérer vos tâches !

                    L'équipe TaskSquad
                  </v-card-text>
                </div>
              </v-expand-transition>

            </v-card>
            <v-card class="my-5  ">
              <v-card-title class="text-h5">
                Pourquoi TaskSquad et pas un autre?
                <v-btn :icon="show2 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show2 = !show2" flat></v-btn>
              </v-card-title>
              <v-expand-transition>
                <div v-show="show2">
                  <v-divider></v-divider>

                  <v-card-text class="text-subtitle-1">
                    <h4>Pourquoi choisir TaskSquad parmi les autres solutions de gestion de tâches ? Voici quelques
                      raisons qui font de TaskSquad l'option idéale pour optimiser votre productivité :</h4>
                    <br />
                    <p>1. Simplicité et facilité d'utilisation : TaskSquad a été conçu avec une interface conviviale et
                      intuitive, afin que vous puissiez commencer à gérer vos tâches rapidement et sans effort. Notre
                      plateforme simplifiée vous permet de vous concentrer sur l'essentiel sans vous perdre dans des
                      fonctionnalités
                      complexes.</p>
                    <br />
                    <p>2. Personnalisation selon vos besoins : TaskSquad offre une flexibilité maximale pour répondre à
                      vos
                      préférences
                      et à vos méthodes de travail. Vous pouvez personnaliser les listes de tâches, définir des rappels,
                      attribuer
                      des
                      priorités et même adapter l'apparence de l'interface pour qu'elle corresponde à votre style.</p>
                    <br />
                    <p>3. Collaboration efficace : Que vous travailliez en équipe ou que vous souhaitiez partager des
                      listes de
                      tâches
                      avec vos proches, TaskSquad facilite la collaboration. Vous pouvez inviter des membres à rejoindre
                      vos
                      projets,
                      attribuer des tâches, partager des commentaires et suivre les progrès de manière transparente.</p>
                    <br />
                    <p>4. Suivi visuel et rappels : TaskSquad vous aide à garder une vision claire de l'avancement de vos
                      tâches
                      grâce à
                      des indicateurs visuels tels que les barres de progression et les étiquettes de priorité. Les
                      rappels
                      personnalisables vous assurent de ne jamais oublier une échéance importante.</p>
                    <br />
                    <p>5. Accessibilité multiplateforme : TaskSquad est disponible sur divers appareils, y compris les
                      ordinateurs
                      de
                      bureau, les smartphones et les tablettes. Vous pouvez ainsi accéder à vos tâches et les mettre à
                      jour où
                      que
                      vous
                      soyez, en gardant votre productivité sous contrôle, même en déplacement.</p>
                    <br />
                    <p>6. Sécurité et confidentialité : Nous comprenons l'importance de la sécurité de vos données.
                      TaskSquad met
                      en
                      place des mesures de sécurité robustes pour protéger vos informations personnelles et vos tâches
                      confidentielles.
                      Votre vie privée est notre priorité absolue.</p>
                    <br />
                    <p>7. Support client dévoué : Notre équipe de support client est là pour répondre à vos questions,
                      résoudre
                      les
                      problèmes et vous offrir une assistance de première classe. Nous sommes engagés à vous fournir une
                      expérience
                      utilisateur exceptionnelle et à vous accompagner tout au long de votre parcours avec TaskSquad.</p>
                    <br />
                    <p>Choisir TaskSquad, c'est opter pour une solution de gestion de tâches complète, personnalisable et
                      conviviale, qui
                      vous permettra de libérer votre potentiel et d'atteindre vos objectifs avec facilité. Rejoignez la
                      communauté
                      TaskSquad dès aujourd'hui et découvrez la différence que cela peut faire dans votre productivité
                      quotidienne.</p>
                    <br />
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
            <v-card class="my-5  ">
              <v-card-title class="text-h5">
                Nous contacter
                <v-btn :icon="show3 ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show3 = !show3" flat></v-btn>
              </v-card-title>
              <v-expand-transition>
                <div v-show="show3" align="center">
                  <v-divider></v-divider>

                  <v-card width="80%" class="my-5" elevation="12">
                    <v-form @submit.prevent ref="form">
                      <v-container>
                        <v-text-field :rules="[required]" color="primary" label="Nom"
                          variant="outlined"></v-text-field>

                        <v-text-field :rules="[required]" color="primary" label="Email"
                          variant="outlined"></v-text-field>

                        <v-textarea :rules="[required]"
                          color="primary" label="Votre message"
                          variant="outlined"></v-textarea>
                      </v-container>

                      <v-divider></v-divider>

                      <v-card-actions>

                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>

                        <v-btn color="success" @click="onSubmit();" type="submit" :loading="loading">
                          envoyer le message

                          <v-icon icon="mdi-chevron-right" end></v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </div>
              </v-expand-transition>
            </v-card>
          </v-container>
        </v-container>
      </v-container>
    </v-parallax>
  </div>
  <v-container>

  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "App",
  data: function () {
    return {
      users: [
        { avatar: 'https://i.imgur.com/he0EDle.png', name: 'Younes Baghli', grade: 'Expert en développement web', job: "Avec une passion pour le développement web et une expertise approfondie dans la création d'interfaces intuitives, Baghli est responsable de la conception et de l'optimisation de notre plateforme TaskSquad. Il s'assure que chaque interaction avec notre site est fluide, agréable et efficace." },
        { avatar: 'https://i.imgur.com/pe3w9XT.png', name: 'Racim Attar', grade: "Spécialiste de l'expérience utilisateur", job: "Attar est un véritable expert de l'expérience utilisateur. Son sens aiguisé du design et sa connaissance approfondie des meilleures pratiques en matière d'ergonomie garantissent que TaskSquad offre une expérience intuitive et conviviale à tous nos utilisateurs. Attar veille à ce que chaque aspect de notre interface soit pensé pour optimiser votre productivité." },
        { avatar: 'https://i.imgur.com/IUjoY4X.png', name: 'Haithem Tahir', grade: 'Gourou de la productivité ', job: "Tahir est notre gourou de la productivité, toujours à la recherche des meilleures techniques et stratégies pour optimiser votre gestion du temps et atteindre vos objectifs. Grâce à ses compétences en gestion de projet et à sa passion pour l'efficacité, Tahir apporte une approche méthodique à TaskSquad, vous aidant à rester concentré, organisé et motivé." },
      ],
      show1: false,
      show2: false,
      show3: false,
      name:'',
      message:'',
      email:''
    }
  },
  mounted() {
    if (this.$store.state.auth.user !== null) {
      this.$router.push('/dashboard')
    }
  },
  methods:{
    async onSubmit(){
      await axios.post('http://localhost:4000/email/send',{
        email:"Baghliyounes@gmail.com",subject: "Message de TaskSquad",
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
                <a style="text-decoration:none;"><img src="https://i.imgur.com/FlG1OPq.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
              </td>
            </tr>
            <tr>
                <td style="padding:30px;background-color:#ffffff;">
                    <h1 style="margin-top:0;margin-bottom:30px;font-size:40px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;text-align:center;font-family: 'Playfair Display', serif;color:#000032">Nouveau message de TaskSquad!</h1>
                    <p style="margin:0;font-family: 'Roboto', sans-serif;">
                        Cher(e) Younes,
                        <br>
                        un message vous a êtait transmit de la part de ${this.name} qui vous dis :</p>
                        <p style="margin:0;"><a style="background: #234e9d; text-decoration: none; padding: 10px 25px; margin-top: 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#ff3884;  "><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]--><span style="mso-text-raise:10pt;font-weight:bold;">${this.message}</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a></p>
                        
                </td>
                
            </tr>
            <tr>
                <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a style="text-decoration:none;"><img src="https://i.imgur.com/4Ixkuxb.jpeg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                </td>
            </tr>
            <tr>
                <td style="padding:30px;background-color:#ffffff;">
                    <p style="margin:0;font-family:'Roboto', sans-serif;">
                    ${this.name} reste joignable sur cette email : ${this.email}
                    <br>    
                    Cordialement,
                    <br>    
                    L'équipe de Tasksquad    
                    </p>                        
                </td>
            </tr>
            <!-- <tr>
              <td style="padding:30px;font-size:24px;line-height:28px;font-weight:bold;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
                <a style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="540" alt="" style="width:100%;height:auto;border:none;text-decoration:none;color:#363636;"></a>
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
                    <!-- <a class="unsub" style="color:#cccccc;text-decoration:underline;">Unsubscribe instantly</a> -->
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
    },
    required(v) {
      return !!v || 'Champ requis'
    },
  }

}
</script>
<style>
.white--text {
  color: white;
}
</style>
