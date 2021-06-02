


const peer=new Peer(undefined,{
    host:'/',
    port:'1001'
})
const socket=io('/project')


window.addEventListener('load',()=>{
    if(JSON.parse(  localStorage.getItem(`auth${room}`))){
     document.body.style.backgroundColor='black'


    }
    else{
        localStorage.clear()
        window.location='/connecting'

    }























   

const peers={}
console.log(room);
socket.on('disconnected',id=>{
    window.location='/connecting'
    if(peers[id]) peers[id].close()

})




const grid=document.getElementById("grid")
const grid2=document.getElementById("grid2")


const myvideo=document.createElement('video')
myvideo.muted=true
myvideo.setAttribute('id','video')
myvideo.controls=false;
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then((stream)=>{
    addtobox(myvideo,stream,grid)
    peer.on("call",call=>{
        call.answer(stream)

        const vdo=document.createElement('video')
        call.on('stream',user_stream=>{
            addtobox(vdo,user_stream,grid2)
        })
  

      

        
    })
    socket.on('connector',id=>{
        
        setTimeout( connect,1000,id,stream)

            
        
    })
   

 
   
});

function addtobox(video,stream,box){
    video.srcObject=stream
    video.addEventListener('loadedmetadata',function(){
      video.play()  
      
})


box.append(video)



}


    
function connect(id,stream){
    const call=peer.call(id,stream)
    const vdo=document.createElement('video')
    call.on('stream',user_stream=>{
        addtobox(vdo,user_stream,grid2)
    })
    call.on('close',()=>{
        vdo.remove()
    })
    peers[id]=call
}

















        
   
    
 
    



    







})
    

peer.on('open',id=>{
    setTimeout(() => {
    socket.emit('start',id,room)

        
    }, 2000);
   
  
    
   

    
})


if(localStorage.getItem(`load${room}`)){
    window.location.reload()
    localStorage.removeItem(`load${room}`)

}





const txt=document.getElementById('txt')
const txt_box=document.getElementById('txt_box')

const boxs=document.getElementById('ending')
txt.addEventListener('focusin',()=>{
    boxs.style.bottom=0

})
txt.addEventListener('focusout',()=>{
    boxs.style.bottom='-32rem'
})
const form=document.getElementById('form')
form.addEventListener('submit',e=>{
    e.preventDefault()
    socket.emit('msg-send',txt.value)
    txt_box.innerHTML+=`
    <div class="box12">
    <span class="red"> you:</span> ${txt.value}

    </div>

</div>`

    /*
    <div class="box12">
                   <span class="red"> hello:</span> sdasadsa

                   </div>
      
               </div>*/

})
socket.on('msg-recieve',msg=>{
    txt_box.innerHTML+=`
    <div class="box12">
    <span class="orange"> stranger:</span> ${msg}

    </div>

</div>`


})




