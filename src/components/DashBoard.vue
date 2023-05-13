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
      <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="mx-1">
            <v-icon color="primary">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <h2>Ajouter un nouveau Project</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Titre" v-model="title" prepend-icon="mdi-pencil"></v-text-field>
            <!-- Date Picker -->
            <v-text-field type="date" label="Délai" :rules="dateRules" v-model="due"
              prepend-icon="mdi-calendar-range"></v-text-field>
            <v-textarea label="Détails" prepend-icon="mdi-note-edit" v-model="content"></v-textarea>
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
      <v-col cols="12" xs="12" sm="4" md="3" lg="2" v-for="(    v, i    ) in     projects    " :key="v.ID">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card :title="v.title" :subtitle="'Dernier délai : ' + v.due" max-height="200" max-width="400"
              v-bind="props" :elevation="isHovering ? 20 : 5">
              <v-card-actions>
                <v-btn icon @click=" editFrom(v); dialog = true" class="pa-0 ma-0"><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn icon @click=" snackbar = true; editItem = v"
                  class="pa-0 ma-0"><v-icon>mdi-trash-can</v-icon></v-btn>
                <v-spacer></v-spacer>
                <v-btn rounded="20" @click="changeStatus(v, i);"
                  :color="(v.status == 'ongoing') ? 'warning' : (v.status == 'complete') ? 'success' : 'error'">{{ v.status
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
      show: false,
      alerta: false,
      dateRules: [
        v => (v.length >= 4) || 'Format invalide'
      ],
      loading: false,
      id: null
    }
  },
  async mounted() {
    if (this.$store.state.auth.user === null) {
      this.$router.push('/login')
    }
    await this.saveOrder();
  },

  methods: {
    async submit() {

      if (this.title.length > 0 && this.due.length >= 4 && this.new) {
        this.loading = true;

        const project = {
          user: this.$store.state.auth.user,
          title: this.title,
          content: this.content,
          due: this.due,// format(this.due, 'Do MMM YYYY'),
          status: 'ongoing',
          priority: 100,
        }
        axios.post('https://backendfortasksquad13.onrender.com/api/create-project', project)
        await this.saveOrder()
        //collectionRef.add(project).then(() => {
        this.formReset();
        //EventBus.$emit('project-added');
        //});
          this.snackbar3 = true
        this.alerta = false;

      }
      else if (!this.new) {
        await axios.get('https://backendfortasksquad13.onrender.com/api/edit-project/' + this.id).then(async (r) => {
          
          r.data.title = this.title
          r.data.content = this.content
          r.data.due = this.due
          await axios.post('https://backendfortasksquad13.onrender.com/api/update-project/' + this.id, r.data)
        }).then(()=>{
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
    },
    editFrom(item) {
      this.title = item.title;
      this.content = item.content;
      this.due = item.due;
      this.id = item._id
      this.new = false
    },


    async filterProjects(status) {
      await axios.get('https://backendfortasksquad13.onrender.com/api/getproject').then(r => {
        this.projects = r.data
        var user = this.$store.state.auth.user
        console.log(r.data, user)
        this.projects = this.projects.filter(function (item) {
          return item.user === user
        })
      })

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
          break;

        case 'complete':
          newStatus = 'overdue'
          break;

        case 'overdue':
          newStatus = 'ongoing'
          break;

        default:
          break;
      }

      currentProject.status = newStatus
      // UPDATE DATABASE
      axios.post('https://backendfortasksquad13.onrender.com/api/update-project/' + value._id, currentProject)
      // UPDATE LOCAL DATA

    },

    async deleteProject() {
      await axios.delete('https://backendfortasksquad13.onrender.com/api/delete-project/' + this.editItem._id)
        .then(this.saveOrder()).then(this.snackbar1 = true)

    },

    async saveOrder() {
      await axios.get('https://backendfortasksquad13.onrender.com/api/getproject').then(r => {
        this.projects = r.data
        var user = this.$store.state.auth.user
        this.projects = this.projects.filter(function (item) {
          return item.user === user
        })
      })
      this.projectsCopy = this.projects
      this.filterProjects('All')
    },

  }

}
</script> 