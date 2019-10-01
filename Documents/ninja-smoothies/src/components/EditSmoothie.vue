<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2>Edit a smoothie {{ smoothie.title }} Smoothie</h2>
           <form @submit.prevent="EditSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredient">ingredients:</label>
                <!-- we want the ingredients to bind to the index 
                (binding a poision in the ingredients array) -->
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field center-align">
                <!-- will only show if there is no feedback -->
                <p v-if="feedback" class="red   text">{{ feedback }}</p>
                <button class="btn punk">Update Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'editsmoothie',
    data(){
        return{
             smoothie: null,
             another: null,
             feedback: null
        }
    },
    methods: {
        EditSmoothie() {
             if(this.smoothie.title){
                this.feedback = null
                // create a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    // anytime there's a space, its replaced with a hyphen 
                    replacement: '-',
                    // none of these characters are allowed whatsoever (globally)
                    remove: /[$*_+~.()'"\-:@!]/g,
                    lower: true

                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err =>{
                    console.log(err)
                })
            }else{
                this.feedback = "You must enter a smoothie title"
            }
        },
        addIng(){
            // if this is true, its not null
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
            this.feedback = "You must enter a value to add an ingredient."
        }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingrediets => {
                // if ingredient isn't equal its true and will stay
                // if it is equal, it will be false and removed
                return ingrediets != ing
            })
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug','==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot =>{
            snapshot.forEach(doc => {
                // console.log(doc.data())
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            });
        })
    }
}
</script>

<style>
.edit-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.edit-smoothie .field{
    margin: 20px auto;
    position: relative;
}
.edit-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 3.4m;
    cursor: pointer;
}
</style>

