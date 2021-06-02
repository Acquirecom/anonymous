const express=require('express');
const {instrument}=require('@socket.io/admin-ui')


const app=express();



const server=require('http').Server(app)
const io=require('socket.io')(server,{
    cors:{
        origin:['https://admin.socket.io'],
    },
})
const call={
    single:[]
}
const connecting=io.of('/connecting')
const projector=io.of('/project')


connecting.on('connect',socket=>{
    socket.join('new'+socket.id)

socket.on('connector',()=>{
    
    socket.emit('auth-clear')
    

    
    function retry(){
    console.log({userid:socket.id},{rooms:socket.rooms});
    if(call.single.length < 1){
        call.single.push({userId:socket.id})
        console.log(call);
    }
    else{
        
        call.single.push({userId:socket.id})

        console.log(call);
      



    if(call.single[1].userId==socket.id ){
            
                
        call.single.length=2;
        const room=call.single[0].userId
        
           socket.join('new'+room)
        
       
          io.of('/connecting').to('new'+room).emit('data-transfer',socket.id,room)
      
           call.single.length=0
           

           console.log(call,socket.rooms);

       



     
   }
   else{
       call.single.length=2;
       retry()



   
      
       
      

   }
    

    
        
        
    }
   

    

        
    }
    retry()
    socket.on('disconnect',()=>{

        call.single.length=2;
       
            call.single=call.single.filter((value)=>{
                console.log(value);
                return value.userId!==socket.id
                
            

            })
            console.log(call);
            
          

     
  

    
        
    })
    
  
  
   
  
    


})    
})
projector.on('connection',socket=>{
    socket.on('start',(id,room)=>{
        socket.join(room)
        socket.broadcast.to(room).emit('connector',id)
        socket.on('disconnect',()=>{
            console.log(id);
            socket.broadcast.to(room).emit('disconnected',id)
        })
        socket.on('msg-send',msg=>{
            socket.broadcast.to(room).emit('msg-recieve',msg)
        })
        
    })
    
    
})

const port=9900;
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{

    
    res.render('homepage')
})
app.get('/call/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})
app.get('/connecting',(req,res)=>{
    res.render('connecting')

}) 
























instrument(io,{auth:false})





server.listen(port || process.env.PORT);
console.log(`http://localhost:${port}/`);
