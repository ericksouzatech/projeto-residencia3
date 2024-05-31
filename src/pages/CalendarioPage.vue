<template>
    <v-app>
      <v-main>
        <v-app-bar dark>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title>Cronograma</v-app-bar-title>
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
              <div class="botaoLogoff">
                <v-btn dark @click="logout()">Logout</v-btn>
              </div>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar>
          <v-toolbar-title>Eventos</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
            >
              Novo Evento
            </v-btn>
          </template>
  
          <v-card>
            <v-card-title>
              Novo Evento
            </v-card-title>
  
            <v-card-text>
                <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="novoEvento.name" label="Título do evento"></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="novoEvento.date"
                              label="Data do evento"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="novoEvento.date"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              Cancelar
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="novoEvento.inicio" label="Hora de início"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="novoEvento.fim" label="Hora de término"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="novoEvento.desc" label="Descrição do evento"></v-text-field>
                      </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
  
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" text @click="adicionarEvento()">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </div>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="eventos"
          :items-per-page="5"
          class="elevation-1"
          @click:row="editarEvento"
          :loading="loading">
        </v-data-table>
        <v-dialog v-model="dialogEditar" max-width="500px">
          <v-card>
            <v-card-title>Editar Evento</v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="eventoEditando.name" label="Novo Título"></v-text-field>
                  </v-col>
                  <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="menu"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="eventoEditando.date"
                              label="Nova Data"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              required
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="eventoEditando.date"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="menu1 = false"
                            >
                              Cancelar
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="eventoEditando.inicio" label="Novo Horário de início" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="eventoEditando.fim" label="Novo Horário de término" required></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="eventoEditando.desc" label="Nova Descrição" required></v-text-field>
                      </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="excluirEvento">Excluir evento</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="cancelarEdicao">Cancelar</v-btn>
              <v-btn color="primary" text @click="salvarEdicao">Salvar</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
      </v-main>
    </v-app>
  </template>
  
  <script>
  // import { collection, getDocs } from 'firebase/firestore';
  // import { db } from '../config';
  import api from '../axiosConfig.js';

  export default {
    data() {
      return {
        loading: false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        menu1: false,
        dialog: false,
        dialogEditar: false,
        eventoId: -1,
        drawer: false,
        group: null,
        headers: [
          {
            text: 'Evento',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Dia do evento', value: 'date', sortable: true },
          { text: 'Horário de Início', value: 'inicio', sortable: false },
          { text: 'Horário de Término', value: 'fim', sortable: false },
          { text: 'Descrição', value: 'desc', sortable: false },
        ],
        eventos: [],
        novoEvento: { 
          name: '', 
          date: null, 
          inicio: '', 
          fim: '', 
          desc: '' 
        },
        eventoEditando: {
          name: '', 
          date: null, 
          inicio: '', 
          fim: '', 
          desc: '' 
        }
      }
    },
    watch: {
        group () {
          this.drawer = false
        },
      },
    mounted() {
      this.fetchEventos();
    },
    methods: {
      async adicionarEvento() {
        try {
          await api.post('/eventos', this.novoEvento);
          this.fetchEventos();
          this.novoEvento = { name: '', date: null, inicio: '', fim: '', desc: '' };
          this.dialog = false;
        } catch (error) {
          console.error('Erro ao adicionar evento', error);
        }
        this.novoEvento = { name: '', date: null, inicio: '', fim: '', desc: '' };
        this.dialog = false;
      },
      async fetchEventos() {
        this.loading = true;
        try {
          const response = await api.get('/eventos');
          this.eventos = response.data;
          this.loading = false;
        } catch (error) {
          console.error("Erro ao buscar eventos:", error);
        }
      },
      async excluirEvento() {
        if (confirm("Tem certeza que deseja excluir este evento?")) {
          try{
          await api.delete('/eventos', { data: { id: this.eventoId } });
          this.fetchEventos();
          this.dialogEditar = false;
          this.eventoEditando = { name: '', date: null, inicio: '', fim: '', desc: '' };
          } catch (error) {
            console.error("Erro ao excluir evento: ", error);
          }
        }
        else {
          this.dialogEditar = false;
          this.eventoEditando = { name: '', date: null, inicio: '', fim: '', desc: '' };
          this.indexEditado = -1;
        }
      },  
      editarEvento(evento) {
        this.eventoEditando = { ...evento };
        this.dialogEditar = true;
        this.indexEditado = this.eventos.indexOf(evento);
        this.eventoId = evento.id;
      },
      async salvarEdicao() {
        try{
          await api.put('/eventos', { ...this.eventoEditando, id: this.eventoId });
          this.fetchEventos();
          this.dialogEditar = false;
          this.eventoEditando = { name: '', date: null, inicio: '', fim: '', desc: '' };
        }catch(error){
          console.error("Erro ao salvar o evento: ", error);
        }
      },
      cancelarEdicao() {
        this.dialogEditar = false; 
        this.eventoEditando = { name: '', date: null, inicio: '', fim: '', desc: '' }; 
      },
      logout(){
        if(confirm("Tem certeza que deseja sair?")){
          this.$store.dispatch('logout');
        }
      },
      goTo(path) {
        this.$router.push(path)
      },
      created() {
        this.fetchEventos();
      }
    }
  }
  </script>

  <style>
  .botaoLogoff {
    margin-top: 600px;
  }
  </style>
  