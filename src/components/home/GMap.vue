<template>
  <div class="map">
      <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name:'GMap',
    data(){
        return {
            lat: 53,
            lng: -2
        }
    },
    methods: {
        renderMap(){
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.lat, lng: this.lng},
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            })
        }
    },
    mounted(){
        // get current user
           let user = firebase.auth().currentUser                 
        //   console.log(user)

        // get user geolocation

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos =>{
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude

                // find the user record and then update geocoords

                db.collection('users').where('user_id', '==', user.uid).get()
                .then(snapshot => {
                    snapshot.forEach((doc) => {
                        //slug of the alias
                        db.collection('users').doc(doc.id).update({
                            geolocation: {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude
                            }
                        })
                    })
                }).then(() => {
                    this.renderMap()
                })

                // console.log(this.lat, this.lng)
            }, (err) => {
                console.log(err)
                this.renderMap()
                //geo location of last house, we timeout if we can't find within 10 seconds
            }, { maximumAge: 60000, timeout: 6000 })    
        } else {
            // position center by default values
            this.renderMap()
        }
    }
}

</script>

<style>
.google-map{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
</style>