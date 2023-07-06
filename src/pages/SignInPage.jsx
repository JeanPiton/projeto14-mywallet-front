import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignInPage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const nav = useNavigate()

  function submit(event){
    event.preventDefault()
    const data = {email, password}
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`,data)
    .then(()=>nav("/home"))
    .catch(e=>alert(e.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={submit}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} required onChange={e=>setEmail(e.target.value)}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} required onChange={e=>setPassword(e.target.value)}/>
        <button>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
