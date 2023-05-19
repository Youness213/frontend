<template>
  <div style="height: 1200px">
    <v-parallax src="https://i.imgur.com/4Ixkuxb.jpeg">
      <v-container>
        <v-row>
          <v-card class="white black--text pa-4">
            <v-card-title align="center" class="mb-2">
              <h2><b>Bienvenue sur TaskSquad</b></h2>
            </v-card-title>
            <v-card-text>
              TaskSquad est votre site de gestion de tâches ultime ! Nous sommes une équipe passionnée, dévouée et
              prête à vous accompagner dans l'organisation efficace de vos tâches quotidiennes. Avec notre expertise et
              notre engagement envers la productivité, nous vous aiderons à optimiser votre temps et à atteindre vos
              objectifs.<br />

              Inscrivez-vous ou connectez-vous dès maintenant sur TaskSquad pour profiter de notre plateforme conviviale
              et
              puissante. Créez vos listes de tâches, ajouter vos amis, metter en place vos deadline et suivez vos progrès
              en
              un seul endroit pratique. Notre équipe est là pour vous guider et vous soutenir tout au long de votre
              parcours
              vers une gestion des tâches plus efficace.<br />

              Ne laissez plus les tâches s'accumuler et la productivité diminuer. Rejoignez TaskSquad aujourd'hui et
              prenez
              le contrôle de votre emploi du temps. Votre réussite commence ici !<br />
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </v-parallax>
  </div>
  <v-container>
    <v-card>
      <v-card-title>
        Qui nous somme?
      </v-card-title>
      <v-card-text>
        BienvenueBienvenue dans l'univers de TaskSquad ! Nous sommes une équipe passionnée et dévouée à simplifier la
        gestion de vos tâches quotidiennes. Permettez-nous de vous présenter les membres clés de notre équipe :

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
                    <v-card-title>{{ v.name }}</v-card-title>
                  </v-row>
                    <v-card-subtitle>{{ v.grade }}</v-card-subtitle>
                    <v-card-text>{{ v.job }}</v-card-text>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
        En tant qu'équipe, nous croyons en la puissance de la collaboration et de l'innovation. Notre objectif est de vous
        fournir une solution de gestion de tâches complète et personnalisable, adaptée à vos besoins spécifiques. Nous
        nous engageons à améliorer constamment notre plateforme, en tenant compte de vos retours et de vos suggestions,
        pour vous offrir la meilleure expérience possible.

        Chez TaskSquad, notre mission est de vous aider à libérer votre potentiel en optimisant votre productivité et en
        vous permettant de vous concentrer sur ce qui compte vraiment. Rejoignez-nous dès maintenant et découvrez comment
        TaskSquad peut transformer votre façon de gérer vos tâches !

        L'équipe TaskSquad
      </v-card-text>
    </v-card>
    <v-card class="my-5">
      <v-card-title>
        Qui nous somme?
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, omnis. Magnam dolores earum dignissimos
        ratione voluptatem sit voluptas sapiente omnis, ullam, totam rerum. Voluptas cupiditate minus possimus iure ut
        deserunt!
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>
        Qui nous somme?
      </v-card-title>
      <v-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, omnis. Magnam dolores earum dignissimos
        ratione voluptatem sit voluptas sapiente omnis, ullam, totam rerum. Voluptas cupiditate minus possimus iure ut
        deserunt!
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      users: [
        { avatar: 'https://i.imgur.com/he0EDle.png', name: 'Younes Baghli', grade: 'Expert en développement web', job: "Avec une passion pour le développement web et une expertise approfondie dans la création d'interfaces intuitives, Baghli est responsable de la conception et de l'optimisation de notre plateforme TaskSquad. Il s'assure que chaque interaction avec notre site est fluide, agréable et efficace." },
        { avatar: 'https://i.imgur.com/pe3w9XT.png', name: 'Racim Attar', grade: "Spécialiste de l'expérience utilisateur", job: "Attar est un véritable expert de l'expérience utilisateur. Son sens aiguisé du design et sa connaissance approfondie des meilleures pratiques en matière d'ergonomie garantissent que TaskSquad offre une expérience intuitive et conviviale à tous nos utilisateurs. Attar veille à ce que chaque aspect de notre interface soit pensé pour optimiser votre productivité." },
        { avatar: 'https://i.imgur.com/IUjoY4X.png', name: 'Haithem Tahir', grade: 'Gourou de la productivité ', job: "Tahir est notre gourou de la productivité, toujours à la recherche des meilleures techniques et stratégies pour optimiser votre gestion du temps et atteindre vos objectifs. Grâce à ses compétences en gestion de projet et à sa passion pour l'efficacité, Tahir apporte une approche méthodique à TaskSquad, vous aidant à rester concentré, organisé et motivé." },
      ]
    }
  },

}
</script>

