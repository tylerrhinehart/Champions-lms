<template>
  <v-app light>
    <v-navigation-drawer temporary :mini-variant="miniVariant" :clipped="clipped" :right="right" v-model="drawer" enable-resize-watcher>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" value="true" @click="item.function">
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-title v-text="title" @click="dashboard"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-show="!loggedIn" @click="form('Login')">Login</v-btn>
      <v-btn v-show="!loggedIn" @click="form('Register')">Register</v-btn>
      <v-btn v-show="loggedIn" icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <main id="main">
      <router-view></router-view>
    </main>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent width="50%">
        <v-card>
          <v-card-title>
            <span class="headline">{{authType}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex v-show="authType == 'Register'" xs12 sm6 md6>
                  <v-text-field label="Legal first name" required v-model="formInput.firstName"></v-text-field>
                </v-flex>
                <!-- <v-flex xs12 sm6 md4>
                  <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                </v-flex> -->
                <v-flex v-show="authType == 'Register'" xs12 sm6 md6>
                  <v-text-field label="Legal last name" required v-model="formInput.lastName"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email" required v-model="formInput.email"></v-text-field>
                </v-flex>
                <v-flex v-show="authType == 'Register'" xs12>
                  <v-text-field label="Username" required v-model="formInput.username"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" required v-model="formInput.password"></v-text-field>
                </v-flex>
                <v-flex v-show="authType == 'Register'" xs12>
                  <v-text-field label="Confirm Password" type="password" required v-model="formInput.confirmPassword"></v-text-field>
                </v-flex>
                <!-- <v-flex xs12 sm6>
                  <v-select label="Age" required :items="['0-17', '18-29', '30-54', '54+']"></v-select>
                </v-flex> -->
                <v-flex xs12 sm6 v-show="authType == 'Register'">
                  <v-select v-model="type" required label="Who Are You" :items="['Student', 'Teacher', 'Admin', 'Parent']"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="blue--text darken-1" flat @click="closeDialog">Cancel</v-btn>
            <v-btn class="blue--text darken-1" flat @click="handleForm">{{authType}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-footer id="footer" :fixed="fixed">
      <span>Champions College &copy; 2017</span>
    </v-footer>
    <BottomVaultsBar></BottomVaultsBar>
  </v-app>
</template>

<script>
  import router from "./router"
  import BottomVaultsBar from './components/BottomVaultsBar'
  export default {
    name: 'app',
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: true,
        items: [
          { icon: 'home', title: 'Dashboard', function: this.dashboard },
          { icon: 'account_circle', title: 'My Account', function: this.account },
          { icon: 'web', title: 'My Courses', function: this.myVaults },
          { icon: 'remove_circle', title: 'Logout', function: this.logout }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Champions Learning Center',
        dialog: false,
        authType: '',
        type: '',
        formInput: {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      dashboard() {
        router.push("/dashboard")
        this.drawer = false
      },
      account() {
        console.log("account")
      },
      logout() {
        this.$store.dispatch('logout')
        this.drawer = false
      },
      form(authType) {
        this.authType = authType
        this.dialog = true
      },
      closeDialog() {
        this.dialog = false
        this.formInput.firstName = ''
        this.formInput.lastName = ''
        this.formInput.username = ''
        this.formInput.password = ''
        this.formInput.confirmPassword = ''
        this.formInput.email = ''
        this.type = ''
      },
      handleForm() {
        if (this.authType == 'Login') {
          this.login()
        }
        else {
          if (this.formInput.password == this.formInput.confirmPassword) {
            this.signup()
          }
          else return
        }
      },
      login() {
        var loginForm = {
          email: this.formInput.email,
          password: this.formInput.password
        }
        this.$store.dispatch('login', loginForm)
        this.closeDialog()
      },
      signup() {
        var signupForm = {
          name: this.formInput.firstName + ' ' + this.formInput.lastName,
          username: this.formInput.username,
          password: this.formInput.password,
          email: this.formInput.email,
          type: this.type
        }
        this.$store.dispatch('signup', signupForm)
        this.closeDialog()
      },
      myVaults() {
        router.push('/vaults')
        this.drawer = false
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.loggedIn
      }
    },
    components: {
      BottomVaultsBar
    },
    mounted() {
      this.$store.dispatch('getAuth')
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 2vh;
  }

  #main {
    margin-bottom: 10vh;
  }
</style>