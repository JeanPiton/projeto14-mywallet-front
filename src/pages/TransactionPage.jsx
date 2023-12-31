import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext"

export default function TransactionsPage() {
  const nav = useNavigate()
  const {user} = useContext(UserContext)
  const { tipo } = useParams()
  const [tValue,setTValue] = useState("")
  const [tDesc,setTDesc] = useState("")

  function submit(event){
    event.preventDefault()
    const data = {value:parseFloat(parseFloat(tValue).toFixed(2)),desc:tDesc,type:tipo,email:user.email}
    const config = {headers:{authorization:`Bearer ${user.token}`}}
    axios.post(`${import.meta.env.VITE_API_URL}/transaction`,data,config)
    .then(()=>nav("/home"))
    .catch(e=>alert(e.response.data.message))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={submit}>
        <input placeholder="Valor" type="number" step="0.01" min={0} required value={tValue} onChange={e=>setTValue(e.target.value)} data-test="registry-amount-input"/>
        <input placeholder="Descrição" type="text" required value={tDesc} onChange={e=>setTDesc(e.target.value)} data-test="registry-name-input"/>
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
