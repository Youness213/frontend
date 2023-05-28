<template>
  <v-snackbar v-model="snackbar" top color="warning" flat>
    <span>Voulez vous supprimer de manier définitif?</span>
    <v-btn flat color="warning" @click="snackbar = false; deleteProject()" class="ml-5">oui</v-btn>
    <v-btn flat color="warning" @click=" snackbar = false;">non</v-btn>
  </v-snackbar>
  <v-snackbar v-model="snackbar1" top color="primary" flat>
    <span>Votre projet a bien était supprimer</span>
  </v-snackbar>
  <v-snackbar v-model="snackbar2" top color="primary" flat>
    <span>Votre projet a bien était mis à jour</span>
  </v-snackbar>
  <v-snackbar v-model="snackbar3" top color="primary" flat>
    <span>Un nouveau projet viens d'être ajouter</span>
  </v-snackbar>
  <v-container class="my-2">

    <v-layout row class="ma-3 py-2" wrap>

      <v-spacer></v-spacer>
      <v-btn icon @click=" filterProjects('All')">
        <v-icon color="primary">mdi-select-all</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" @click=" filterProjects('complete');">
        <v-icon color="success">mdi-check-circle-outline</v-icon>
      </v-btn>

      <v-btn icon @click=" filterProjects('ongoing');">
        <v-icon color="warning">mdi-progress-check</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" @click=" filterProjects('overdue');">
        <v-icon color="error">mdi-clock</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-dialog max-width="600px" min-height="600" v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="mx-1">
            <v-icon color="primary">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <h3>{{ (this.new) ? "Ajouter un nouveau Project" : "Modifier ce nouveau Project" }}</h3>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Titre" v-model="title" prepend-icon="mdi-pencil" variant="outlined"></v-text-field>
            <!-- Date Picker -->
            <VueDatePicker v-model="due" range class="mb-5">
            </VueDatePicker>
            <v-row>
              <v-col>
                <v-select label="Priorité" v-model="priority" :items="['Faible', 'Normal', 'Haute']"
                  variant="outlined"></v-select>
              </v-col>
              <v-col>
                <v-select label="Visibilité" v-model="visibility" :items="['Mon équipe', 'Moi uniquement']"
                  variant="outlined"></v-select>
              </v-col>
            </v-row>
            <v-textarea label="Détails" prepend-icon="mdi-note-edit" v-model="content" variant="outlined"></v-textarea>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="success" class=" mx-0 mt-3" @click=" submit()" :loading="loading">Sauvegarder</v-btn>
            <v-btn flat color="error" class=" mx-1 mt-3" @click=" dialog = false; formReset()">Annuler</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <div justify-center v-if="this.projects.length == 0">
      <center>
        <p>Rien pour l'instant 😔</p>
      </center>
    </div>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="4" md="3" lg="3" v-for="(    v, i    ) in     projects    " :key="v.ID">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card :title="v.title" v-bind="props" :elevation="isHovering ? 20 : 5">
              <v-card-subtitle>
                <span>Dernier delai : {{ new Date(v.enddue).toLocaleString('fr-FR', { timeZone: 'UTC' }) }}<br />
                  visible pour {{ v.visibility }}<br />
                  créé par {{ v.creator }}</span><br />
                <span v-if="v.AchivedBy != null">Finis par {{ v.AchivedBy }}</span>

              </v-card-subtitle>
              <v-card-actions>
                <v-btn icon @click=" editFrom(v); dialog = true" class="pa-0 ma-0"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn icon @click=" snackbar = true; editItem = v"
                  class="pa-0 ma-0"><v-icon>mdi-trash-can</v-icon></v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded="20" @click="changeStatus(v, i);"
                  :color="(v.status == 'ongoing') ? 'warning' : (v.status == 'complete') ? 'success' : 'error'">{{
                    (v.status == 'ongoing') ? 'En cours' : (v.status == 'complete') ? 'Finis' : 'Expirer'
                  }}</v-btn>
                <v-btn rounded="20" @click="changePriority(v, i);" v-if="v.status !== 'complete'"
                  :color="(v.priority == 'Normal') ? 'warning' : (v.priority == 'Faible') ? 'success' : 'error'">{{
                    v.priority
                  }}</v-btn>
                <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ v.content }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import VueDatePicker from '@vuepic/vue-datepicker';
export default {
  data() {
    return {
      projects: [],
      projectsCopy: [],
      snackbar: false,
      snackbar1: false,
      snackbar2: false,
      snackbar3: false,
      newStatus: "",
      editItem: null,
      dialog: false,
      title: '',
      content: '',
      new: true,
      due: null,
      visibility: '',
      priority: '',
      show: false,
      alerta: false,
      dateRules: [
        v => (v.length >= 4) || 'Format invalide'
      ],
      loading: false,
      id: null,
      team:null
    }
  },
  components: {
    VueDatePicker
  },
  async mounted() {
    if (this.$store.state.auth.user === null) {
      this.$router.push('/login')
    }
    else {     
        this.saveOrder();
    }

  },

  methods: {
    async submit() {
      if (this.title.length > 0 && this.due !== null && this.new && this.due !== null) {
        this.loading = true;

        const project = {
          user: this.$store.state.auth.user,
          creator: this.$store.state.auth.username,
          title: this.title,
          content: this.content,
          startdue: this.due[0],
          enddue: this.due[1],
          status: 'ongoing',
          priority: this.priority,
          visibility: this.visibility,
          AchivedBy:null
        }
        axios.post('http://localhost:4000/api/create-project', project).then(r => { console.log(r) })
        await this.saveOrder()
        //collectionRef.add(project).then(() => {
        this.formReset();
        //EventBus.$emit('project-added');
        //});
        this.snackbar3 = true
        this.alerta = false;

      }
      else if (!this.new) {
        await axios.get('http://localhost:4000/api/edit-project/' + this.id).then(async (r) => {

          r.data.title = this.title
          r.data.content = this.content
          r.data.due = this.due
          await axios.post('http://localhost:4000/api/update-project/' + this.id, r.data)
        }).then(() => {
          this.saveOrder()
          //collectionRef.add(project).then(() => {
          this.formReset();
          this.alerta = false;
          this.snackbar2 = true
        })
      }
      else {
        this.alerta = true;
      }

    },

    formReset() {
      this.loading = false;
      this.dialog = false;
      this.title = '';
      this.content = '';
      this.due = null;
      this.id = null;
      this.visibility = ''
    },
    editFrom(item) {
      this.title = item.title;
      this.content = item.content;
      this.due = [item.startdue, item.enddue];
      this.id = item._id

      this.visibility = item.visibility
      this.new = false
    },
    async filterProjects(status) {

      this.projects = this.projectsCopy

      if (status === "complete") {
        this.projects = this.projects.filter(function (item) {
          return item.status === "complete";
        });

      } else if (status === "ongoing") {
        this.projects = this.projects.filter(function (item) {
          return item.status === "ongoing";
        });

      } else if (status === "overdue") {
        this.projects = this.projects.filter(function (item) {
          return item.status === "overdue";
        });
      } else if (status === "All") {
        this.projects = this.projects.filter(function (item) {
          return item.status === "ongoing" || item.status === "complete";
        });
      }
    },

    changeStatus(value, index) {

      const currentProject = this.projects[index]
      // LOGIC FOR STATUS UPDATE
      switch (currentProject.status) {
        case 'ongoing':
          var newStatus = 'complete'
          var newpriority = 'Done'
          var newAchivedBy = this.$store.state.auth.username
          break;

        case 'complete':
          newStatus = 'ongoing'
          newpriority = 'Normal'

          newAchivedBy = null
          break;

        default:
          break;
      }
      currentProject.AchivedBy = newAchivedBy
      currentProject.status = newStatus
      currentProject.priority = newpriority
      // UPDATE DATABASE
      axios.post('http://localhost:4000/api/update-project/' + value._id, currentProject)
      // UPDATE LOCAL DATA
      this.saveOrder()
    },
    changePriority(value, index) {

      const currentProject = this.projects[index]
      // LOGIC FOR STATUS UPDATE
      switch (currentProject.priority) {
        case 'Faible':
          var newpriority = 'Normal'
          break;

        case 'Normal':
          newpriority = 'Haute'
          break;


        case 'Haute':
          newpriority = 'Faible'
          break;

        default:
          break;
      }
      currentProject.priority = newpriority
      // UPDATE DATABASE
      axios.post('http://localhost:4000/api/update-project/' + value._id, currentProject)
      // UPDATE LOCAL DATA
      this.saveOrder()
    },

    async deleteProject() {
      await axios.delete('http://localhost:4000/api/delete-project/' + this.editItem._id)
        .then(this.saveOrder()).then(this.snackbar1 = true)

    },

    async saveOrder() {
      await axios.get('http://localhost:4000/api/getproject').then(r => {
        Array.prototype.forEach.call(r.data, async (item) => {
          if (new Date(item.enddue) < new Date) {
            item.status = 'overdue'
            var importance=''
            if(item.priority === 'Haute'){
              importance ='importante'
            }
            await axios.get('http://localhost:4000/api/edit-users/'+item.user).then(r=>{
              this.Sendit(r.data,importance)
            })
            await axios.post('http://localhost:4000/api/update-project/' + item._id, item)
          }
        })
      })
      this.projects.length = 0
      var user = this.$store.state.auth.user
      
      await axios.get('http://localhost:4000/api/getTeam').then(async (r) => {
        this.team = r.data.filter(function (item) {
          return item.user === user
        })
        if (this.team.length === 0) {
          await axios.post('http://localhost:4000/api/create-Team', { user: user, friends: [] }).then((r) => {
            this.team = r.data
          })
        }
      })
      this.team = this.team[0]
      await axios.get('http://localhost:4000/api/getproject').then(r => {
        Array.prototype.forEach.call(r.data, item => {
          if (item.visibility == 'Mon équipe') {
            if (item.user === user) {
              this.projects.push(item)
            }
            Array.prototype.forEach.call(this.team.friends, element => {
              if (element.user === item.user && element.status === 'Amis') {
                this.projects.push(item)
              }
            })
          }
          if (item.visibility == 'Moi uniquement') {
            if (item.user === user) {
              this.projects.push(item)
            }
          }

        })
      })
      this.projectsCopy = this.projects
      this.filterProjects('All')
    },
    async Sendit(user,importance) {
      await axios.post('http://localhost:4000/email/send', {
        email: user.email,
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
                <a href="http://localhost:8080/dashboard" style="text-decoration:none;"><img src="https://i.imgur.com/FlG1OPq.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
              </td>
            </tr>
            <tr>
                <td style="padding:30px;background-color:#ffffff;">
                    <h1 style="margin-top:0;margin-bottom:30px;font-size:40px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;text-align:center;font-family: 'Playfair Display', serif;color:#000032">Notification d'expiration d'une tâche${importance}!</h1>
                    <p style="margin:0;font-family: 'Roboto', sans-serif;">
                        Cher(e) ${user.first},
                        <br>
                        Nous espérons que vous appréciez votre expérience sur notre plateforme ! Nous tenons à vous informer qu'une de vos tâches vient d'expirer. Veuillez prendre note de cette information et effectuer les actions nécessaires en conséquence.vous pouvez accéder au site en cliquant sur le boutton ci-dessous :</p>
                        <p style="margin:0;"><a href="http://localhost:8080/dashboard" style="background: #234e9d; text-decoration: none; padding: 10px 25px; margin-top: 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#ff3884;  "><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]--><span style="mso-text-raise:10pt;font-weight:bold;">Activer votre compte</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a></p>
                        
                </td>
                
            </tr>
            <tr>
                <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                <a href="http://localhost:8080/dashboard" style="text-decoration:none;"><img src="https://i.imgur.com/4Ixkuxb.jpeg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
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
                <a href="http://localhost:8080/dashboard" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/1200x800-1.png" width="540" alt="" style="width:100%;height:auto;border:none;text-decoration:none;color:#363636;"></a>
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
                    <!-- <a class="unsub" href="http://localhost:8080/dashboard" style="color:#cccccc;text-decoration:underline;">Unsubscribe instantly</a> -->
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
  }

}
</script> 