<template>
  <v-snackbar v-model="snackbar" top color="warning" flat>
    <span>Voulez vous supprimer de manier définitif?</span>
    <v-btn flat color="warning" @click="snackbar = false; deleteProject()" class="ml-5">oui</v-btn>
    <v-btn flat color="warning" @click=" snackbar = false; ">non</v-btn>
  </v-snackbar>
  <v-container class="my-2">

    <v-layout row class="ma-3 py-2" wrap>

      <v-spacer></v-spacer>
      <v-btn icon @click=" filterProjects('All') ">
        <v-icon color="primary">mdi-select-all</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" @click=" filterProjects('complete'); ">
        <v-icon color="success">mdi-check-circle-outline</v-icon>
      </v-btn>

      <v-btn icon @click=" filterProjects('ongoing'); ">
        <v-icon color="warning">mdi-progress-check</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" @click=" filterProjects('overdue'); ">
        <v-icon color="error">mdi-clock</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-dialog max-width="600px" v-model=" dialog ">
        <template v-slot:activator=" { props } ">
          <v-btn icon v-bind=" props " class="mx-1">
            <v-icon color="primary">mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <h2>Ajouter un nouveau Project</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Titre" v-model=" title " prepend-icon="mdi-pencil"></v-text-field>
            <!-- Date Picker -->
            <v-text-field label="Date" type="date" :rules=" dateRules " v-model=" due "
              prepend-icon="mdi-calendar-range"></v-text-field>
            <v-textarea label="Détails" prepend-icon="mdi-note-edit" v-model=" content "></v-textarea>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="success" class=" mx-0 mt-3" @click=" submit() " :loading=" loading ">Sauvegarder</v-btn>
            <v-btn flat color="error" class=" mx-1 mt-3" @click=" dialog = false; formReset() ">Annuler</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <div justify-center v-if=" this.projects.length == 0 ">
      <center>
        <p>Rien pour l'instant 😔</p>
      </center>
    </div>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="4" md="3" lg="2" v-for="(    v, i    ) in     projects    " :key=" v.ID ">
          <v-hover>
            <template v-slot:default=" { isHovering, props } ">
              <v-card :title=" v.title " :subtitle=" 'Dernier délai : ' + v.due " :text=" v.content " max-height="200"
                max-width="200" v-bind=" props " :elevation=" isHovering ? 20 : 5 ">
                <v-card-actions>
                  <v-btn icon @click=" editFrom(v, i); dialog = true "
                    class="pa-0 ma-0"><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-btn icon @click=" snackbar = true; indexToEdit = i; "
                    class="pa-0 ma-0"><v-icon>mdi-trash-can</v-icon></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn rounded="20" @click="changeStatus(i);" :color="btnColor">{{ v.status }}</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name:'Teams_Component',
  data() {
    return {
      projects: [],
      projectsCopy: [],
      todos: true,
      userId: '',
      btnColor: '',
      snackbar: false,
      editMode: false,
      newTitle: "",
      newStatus: "",
      indexToEdit: 0,
      drag: true,
      dialog: false,
      title: '',
      content: '',
      due: null,
      id: null,
      alerta: false,
      dateRules: [
        v => (v.length >= 4) || 'Format invalide'
      ],
      loading: false,
    }
  },
  mounted() {
    if(this.$store.state.auth.user === null){
      this.$router.push('/login')
    }
    this.saveOrder();
  },

  methods: {
    submit() {

      if (this.id !== null) {
        const project = {
          title: this.title,
          content: this.content,
          due: this.due,// format(this.due, 'Do MMM YYYY'),
          status: 'ongoing',
          priority: 100,
        }
        this.projects.splice(this.id - 1, 1)
        this.projects.push(project)
        this.formReset()
      }
      else if (this.title.length > 0 && this.due.length >= 4) {
        this.loading = true;
        //const collectionRef = db.collection('users/'+this.userId+'/projects');

        const project = {
          title: this.title,
          content: this.content,
          due: this.due,// format(this.due, 'Do MMM YYYY'),
          status: 'ongoing',
          priority: 100,
        }
        
        this.btnColor = 'warning'
        console.log(project)
        this.projects.push(project)
        //collectionRef.add(project).then(() => {
        this.formReset();
        //EventBus.$emit('project-added');
        //});

        this.alerta = false;

      } else {
        this.alerta = true;
      }

      this.projectsCopy = this.projects
    },

    formReset() {
      this.loading = false;
      this.dialog = false;
      this.title = '';
      this.content = '';
      this.due = null;
      this.id = null;
    },
    editFrom(item, i) {
      this.title = item.title;
      this.content = item.content;
      this.due = item.due;
      this.id = i
    },


    filterProjects(status) {
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

    changeStatus(index) {

      const currentProject = this.projects[index]
      //var docRef = db.collection("users/"+this.userId+"/projects").doc(currentProject.id);

      // LOGIC FOR STATUS UPDATE
      switch (currentProject.status) {
        case 'ongoing':
          var newStatus = 'complete'
          var btnColor = 'success'
          break;

        case 'complete':
        newStatus = 'overdue'
          btnColor = 'error'
          break;

        case 'overdue':
          newStatus = 'ongoing'
          btnColor = 'warning'
          break;

        default:
          break;
      }

      // UPDATE DATABASE
      //docRef.set({
      //   status: newStatus,

      // }, { merge: true });

      // UPDATE LOCAL DATA
      currentProject.status = newStatus
      this.btnColor = btnColor

    },

    deleteProject() {
      var index = this.indexToEdit;
      //const currentProject = this.projects[index]
      //var docRef = db.collection("users/"+this.userId+"/projects").doc(currentProject.id);

      // DELETE ON DATABASE
      //docRef.delete().then(function() {
      //console.log("Document successfully deleted!");
      //}).catch(function(error) {
      //  alert(error.message);
      //});


      // DELETE ON LOCAL DATA
      if (index > -1) {
        this.projects.splice(index, 1);
        this.projectsCopy.splice(index, 1);
      }

      // UPDATE ORDER ON DATABASE
      this.saveOrder();

    },

    saveOrder() {

      for (let index = 0; index < this.projects.length; index++) {
        //const currentProject = this.projects[index];
        //var docRef = db.collection("users/"+this.userId+"/projects").doc(currentProject.id);

        // UPDATE PRIORITY ON DATABASE
        //docRef.set({
        //  priority: index,

        //}, { merge: true });

      }
    },

    updateTitle(index) {
      const currentProject = this.projects[index]
      //var docRef = db.collection("users/"+this.userId+"/projects").doc(currentProject.id);

      //docRef.set({
      //     title: this.newTitle,
      //
      // }, { merge: true });

      // UPDATE LOCAL DATA
      currentProject.title = this.newTitle

      this.editMode = false;
    },

  }

}
</script> 