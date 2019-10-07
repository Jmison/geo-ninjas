<template>
  <div class="signup container">
      <form @submit.prevent="signup" class="card panel">
          <h2 class="center deep-purple-text"> Signup </h2>
          <div class="field">
              <label for="email"> Email: </label>
              <input type="email" name="email" v-model="email">
          </div>

          <div class="field">
              <label for="password"> Password: </label>
              <input type="password" name="password" v-model="password">
          </div>

          <div class="field">
              <label for="alias"> Alias: </label>
              <input type="text" name="alias" v-model="alias">
          </div>
          <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Signup</button>
            </div>
      </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'Signup',
    data() {
        return {
            email: null,
            password: null,
            alias: null,
            feedback: null,
            slug: null
        }
    },
    methods: {
        signup(){
            // HERM: this if checks that you have alias, email, password
             if(this.alias && this.email && this.password) {
                 this.slug = slugify(this.alias, {
                     replacement: '-',
                     remove: /[$*_+~.()'"!\-:@]/g,
                     lower: true
                 })
                //  checks and sees if there is an alias on record
                 let ref = db.collection('users').doc(this.slug)
                 ref.get().then( doc => {
                     if(doc.exists){
                         // H: We complain that the alias already exists and do nothing
                         this.feedback = 'This alias already exists'
                     } else {
                         // H: Here we know that alias, email, and password exist
                         // H: We also know that the slug is good
                         // H: We also know that the alias is free to use
                         // H: THIS is a good place to put the auth() code. 
                         this.feedback = 'This alias is free to use'

                         firebase.auth().createUserWithEmailAndPassword(this.email , this.password)
                        .catch(error => {
                            console.log(err)
                            this.feedback = err.message
                        })
                     }
                 })
                 console.log(this.slug)
            // HERM: this is the else to the alias, email, password check
             } else {
                 // H: anything in this else will ONLY run when:
                 // H: alias or email or password is missing

                 // H: This auth() call needs to happen IF (alias, email password) exists
                 // H: So this auth() block of code is in the wrong place. 
                //  firebase.auth().createUserWithEmailAndPassword(this.email , this.password)
                //  .catch(error => {
                //      console.log(err)
                //      this.feedback = err.message
                //  })

                 // if alias or email or password are missing, you provide feedback to user
                 this.feedback = "You must enter all fields"
             }
        }
    }
}
</script>

<style>
.signup{
    max-width: 400px;
    margin-top: 60px;
}
.signup h2{
    font-size: 2.4em;
}
.signup .field{
    margin-bottom: 16px;
}
</style>