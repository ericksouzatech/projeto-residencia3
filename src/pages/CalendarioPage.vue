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
          @click:row="editarEvento">
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
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../config';

  export default {
    data() {
      return {
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        menu1: false,
        dialog: false,
        dialogEditar: false,
        indexEditado: -1,
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
      this.getEventos();
    },
    methods: {
      async adicionarEvento() {
      try {
          await this.$store.dispatch('sendEvent', {
            index: this.eventos.length + 1,
            name: this.novoEvento.name,
            date: this.novoEvento.date,
            inicio: this.novoEvento.inicio,
            fim: this.novoEvento.fim,
            desc: this.novoEvento.desc
          });

          await this.getEventos();

          this.novoEvento = { name: '', date: null, inicio: '', fim: '', desc: '' };
          this.dialog = false;
        } catch(error) {
          console.log("Erro ao adcionar evento", error);
        }
      },
      async getEventos() {
        try {
          const querySnapshot = await getDocs(collection(db, "eventos"));
          this.eventos = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
        } catch(error) {
          console.error("Erro ao obter eventos", error);
        }
      },
      excluirEvento() {
        if (confirm("Tem certeza que deseja excluir este evento?")) {
          const eventoParaExcluir = this.eventos[this.indexEditado];
          this.$store.dispatch('deleteEvent', eventoParaExcluir);
          this.dialogEditar = false;
          this.eventoEditando = { name: '', date: null, inicio: '', fim: '', desc: '' };
          this.indexEditado = -1;
          this.getEventos();
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
      salvarEdicao() {
        this.$store.dispatch('updateEvent', { ...this.eventoEditando, id: this.eventoId });
        this.getEventos();
        this.dialogEditar = false;
        this.eventoEditando = { name: '', date: null, inicio: '', fim: '', desc: '' };
        this.eventoId = -1;
      },
      cancelarEdicao() {
        this.dialogEditar = false; 
        this.eventoEditando = { name: '', date: null, inicio: '', fim: '', desc: '' }; 
      },
      goTo(path) {
        this.$router.push(path)
      },
      created() {
        this.getEventos();
      }
    }
  }
  </script>
  