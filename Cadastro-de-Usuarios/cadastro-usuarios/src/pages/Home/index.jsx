import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {
  const [users, seTusers] = useState([])
  const inputNAme = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {

    const usersFromApi = await api.get('/usuarios')

    seTusers(usersFromApi.data)
  }

  useEffect(() => {
    getUsers()

  }, [])


  async function createtUsers() {
    const age = inputAge.current.value;

    if (age > 0) {
      console.log('idade não permitida')
      return;

    }

    await api.post('/usuarios', {
      name: inputNAme.current.value,
      age: age,
      email: inputEmail.current.value
    })
    getUsers()

  }


  async function deleteUsers(id) {

    await api.delete(`/usuarios/${id}`)

    
    getUsers()

  }

  useEffect(() => {
    getUsers()

  }, [])


  return (
    <div className='container' >
      <form >
        <h1> Cadastro de Usuários </h1>
        <input placeholder='Nome' name='Nome' type='text' ref={inputNAme} />
        <input placeholder='Idade' name='Idade' type='number' ref={inputAge} />
        <input placeholder='email' name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createtUsers}> Cadastrar </button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p> Nome: <span> {user.name} </span></p>
            <p> Idade: <span> {user.age} </span></p>
            <p> email: <span> {user.email} </span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>

      ))}


    </div>
  )
}

export default Home
