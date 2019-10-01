<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <!-- auto fills but prevents it from refreshing -->
        <form @submit.prevent="AddSmoothie">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">ingredients:</label>
                <!-- we want the ingredients to bind to the index 
                (binding a poision in the ingredients array) -->
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field center-align">
                <!-- will only show if there is no feedback -->
                <p v-if="feedback" class="red   text">{{ feedback }}</p>
                <button class="btn punk">Add Smoothie</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddSmoothie(){
            if(this.title){
                this.feedback = null
                // create a slug
                this.slug = slugify(this.title, {
                    // anytime there's a space, its replaced with a hyphen 
                    replacement: '-',
                    // none of these characters are allowed whatsoever (globally)
                    remove: /[$*_+~.()'"\-:@!]/g,
                    lower: true

                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
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
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
            this.feedback = "You must enter a value to add an ingredient."
        }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingrediets => {
                // if ingredient isn't equal its true and will stay
                // if it is equal, it will be false and removed
                return ingrediets != ing
            })
        }
    }
}
</script>

<style>
.add-smoothie{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}
.add-smoothie .field{
    margin: 20px auto;
    position: relative;
}
.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 3.4m;
    cursor: pointer;
}
</style>

