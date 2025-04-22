import express, { response } from 'express'
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const app = express()
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json())



app.get('/usuarios', async (req, res) =>{
    console.log(req.query)

    let users = []

    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })


    }else{
        users = await prisma.user.findMany()
    }
       
    
    res.status(200).json(users)

})


app.post('/usuarios', async (req, res)=>{

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age

        }
    })
    res.status(201).json(req.body)
})




app.put ('/usuarios/:id', async (req,res)=>{
    await prisma.user({
        where:{
            name: req.body.name,
            email: req.body.email,
            age: req.body.name
        }
    })
    res.status(201).json(req.body)
    
})


app.delete('/usuarios/:id', async (req, res)=>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({message: " Usuário foi deletado com Sucesso!"})

})


app.listen(3000)





//nome no banco: maycon
//senha: 

