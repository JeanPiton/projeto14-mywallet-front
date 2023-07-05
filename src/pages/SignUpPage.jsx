import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"

export default function SignUpPage() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [confirm,setConfirm] = useState("")

  function submit(event){
    event.preventDefault()
    if(password!=confirm){
      return alert("Senhas não são iguais")
    }
    const data = {name, email, password}
    axios.post(`${import.meta.env.VITE_API_URL}/users`,data)
    .then(()=>alert("Cadastro realizado com sucesso"))
    .catch(e=>alert(e.response.data))
  }

  return (
    <SingUpContainer>
      <form onSubmit={submit}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required value={name} onChange={e=>setName(e.target.value)}/>
        <input placeholder="E-mail" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" required value={password} onChange={e=>setPassword(e.target.value)}/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)}/>
        <button>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
