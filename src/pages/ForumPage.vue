<template>
    <v-app>
        <v-app-bar dark>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title>Fórum de Discussão</v-app-bar-title>
        </v-app-bar>
        <v-navigation-drawer
        v-model="drawer"
        absolute
        bottom
        temporary
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-title @click="goTo('/')">Home</v-list-item-title>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-title @click="goTo('/cursos')">Cursos</v-list-item-title>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-title @click="goTo('/users')">Usuários</v-list-item-title>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-title @click="goTo('/calendario')">Cronograma</v-list-item-title>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-title @click="goTo('/forum')">Fórum De Discussão</v-list-item-title>
              </v-list-item>
  
              <v-list-item>
                <v-list-item-title @click="goTo('/library')">Biblioteca Digital</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
    </v-app>    
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            group: null,
        }
    },
    watch: {
        group () {
          this.drawer = false
        },
      },
    methods: {
        goTo(path) {
            this.$router.push(path)
        }
    }
}
</script>