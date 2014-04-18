console.log(me)
if(this.isPublic == 'false'){
    console.log(me);
    if(!me || me.eventId !== this.id){
        cancel();        
    }
}