<template>
    <v-app>
        <v-main>
            <v-app-bar dark>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-app-bar-title>Beyond</v-app-bar-title>
            </v-app-bar>
            <div class="loginCard">
                <v-card class="mx-auto" max-width="500">
                    <v-card-title>Login</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email" label="Email" required></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Senha"
                                type="password"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue" @click="createAcc">Cadastrar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="blue" @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
        </div>
        </v-main>
    </v-app>    
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            this.$store.dispatch("login", {
                email: this.email,
                password: this.password,
            }).then(() => {
                this.$router.push('/');
            }).catch(error => {
                console.error("Erro ao fazer login:", error);
                alert("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
            });
        },
        createAcc() {
            this.$store.dispatch("create", {
                email: this.email,
                password: this.password,
            }).then(() => {
                // alert("Conta criada com sucesso!");
            }).catch(error => {
                console.error("Erro ao criar conta:", error);
            });
        },
    },
};
</script>

<style>

.loginCard {
    margin-top: 300px;
}

</style>