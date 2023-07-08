import { useContext, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export default function SignInPage() {
  const {setUser} = useContext(UserContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const nav = useNavigate()

  function submit(event){
    event.preventDefault()
    const data = {email, password}
    axios.post(`${import.meta.env.VITE_API_URL}/sign-in`,data)
    .then(re=>{
      const data = re.data
      localStorage.setItem("user",JSON.stringify(data))
      setUser(data)
      nav("/home")})
    .catch(e=>alert(e.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={submit}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={email} required onChange={e=>setEmail(e.target.value)} data-test="email"/>
        <input placeholder="Senha" type="password" autocomplete="new-password" value={password} required onChange={e=>setPassword(e.target.value)} data-test="password"/>
        <button data-test="sign-in-submit">Entrar</button>
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
