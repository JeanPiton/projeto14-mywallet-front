import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  const nav = useNavigate()
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
    axios.post(`${import.meta.env.VITE_API_URL}/sign-up`,data)
    .then(()=>nav("/"))
    .catch(e=>alert(e.response.data.message))
  }

  return (
    <SingUpContainer>
      <form onSubmit={submit}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required value={name} onChange={e=>setName(e.target.value)} data-test="name"/>
        <input placeholder="E-mail" type="email" required value={email} onChange={e=>setEmail(e.target.value)} data-test="email"/>
        <input placeholder="Senha" type="password" autocomplete="new-password" required value={password} onChange={e=>setPassword(e.target.value)} data-test="password"/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" required value={confirm} onChange={e=>setConfirm(e.target.value)} data-test="conf-password"/>
        <button data-test="sign-up-submit">Cadastrar</button>
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
