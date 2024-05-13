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
                                label="Password"
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
            });
            this.$router.push('/');
        },
        createAcc() {
            this.$store.dispatch("create", {
                email: this.email,
                password: this.password,
            });
            alert("Conta criada com sucesso!");
        },
    },
};
</script>

<style>

.loginCard {
    margin-top: 300px;
}

</style>