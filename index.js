
const express = require("express")
const uuid = require("uuid")
const port = 3001
const app = express()
app.use(express.json())

const orde = []


const checkUserId = (request, response, next) =>{
    const { id } = request.params

    const index = orde.findIndex(user => user.id === id)

    if (index < 0){
        return response.status(404).json({mensage: "Pedido não encontrado. "})
    }

    request.userIndex = index
    request.userId = id

    next()

}

app.post("/order",(request,response) => {
    const {order,clientName,price} =request.body

    const ordem = {id:uuid.v4(), order,clientName,price,status:"Em Preparação"}

    orde.push(ordem)
    
    return response.status(202).json(ordem)
})

app.get("/order",(request,response) => {
    return response.json(orde)
})

app.put("/order/:id",checkUserId,(request,response) => {

    const {order,clientName,price,}= request.body
    const id = request.userId
    const index = request.userIndex
    const changeOrder = {id, order, clientName, price }
    orde[index] = changeOrder
   

    return response.json(changeOrder)
})

app.delete("/order/:id",checkUserId,(request,response) => {
    const {id} = request.params
    const index = orde.findIndex(order => order.id === id)
    if (index < 0 ){
        return response.status(404).json({message: "Pedido não enontrado"})
    }

    orde.splice(index,1)
    return response.status(204).json(orde)
})
app.get("/order/:id",checkUserId,(request,response) => {
    const index = request.userIndex

    const consult = orde[index]

    return response.json(consult)
})
app.patch('/order/:id', checkUserId, (request, response) => {
   
    const index = request.userIndex

    const changeStatus = orde[index]
    changeStatus.status = "Pronto"
    orde[index]=changeStatus

    return response.json(changeStatus)
})

app.listen(port,() =>{
    console.log(`Server started on port ${port}😎`)
})