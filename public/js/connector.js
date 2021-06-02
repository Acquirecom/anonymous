const socket=io('/connecting')
window.addEventListener('load',()=>{
    document.body.style.backgroundColor='black'
    socket.emit('connector')})
socket.on('auth-clear',function(){

    localStorage.clear()
})
const main_video=document.createElement('video');
const grid=document.getElementById('grid');
const constraints={
    video:true,
    audio:true
}
main_video.muted=true;
main_video.setAttribute('id','video')
main_video.controls=false;
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{addtobox(main_video,stream)
 
   
   });
   function addtobox(video,stream){
       video.srcObject=stream
       video.addEventListener('loadedmetadata',()=>{
         video.play()  
         
   })
   
   
   grid.append(video)

   
   
   }


    




socket.on('data-transfer',(id,id2)=>{
localStorage.setItem(`auth${id}${id2}`,true)
localStorage.setItem(`load${id}${id2}`,true)




window.location=`/call/${id}${id2}`})
















    












