import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { BiExit } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../contexts/UserContext"

export default function HomePage() {
  const {user} = useContext(UserContext)
  const [name, setName] = useState(user.name)
  const [list, setList] = useState()
  const [total, setTotal] = useState({type:"positivo",value:0})
  const config = {headers:{authorization:`Bearer ${user.token}`}}
  const nav = useNavigate()

  useEffect(()=>{
    if(list == undefined){
      axios.get(`${import.meta.env.VITE_API_URL}/transaction`,config)
      .then(res=>{setList(res.data.reverse())})
      .catch(err=>alert(err.response.data.message))
    }else{
      getTotal()
    }
  },[list])

  function getTotal(){
    let sum = 0
    let type = "positivo"
    list.map(e=>{
      if(e.type==="entrada") sum+=parseFloat(e.value)
      if(e.type==="saida") sum-=parseFloat(e.value)
    })
    if(sum<0){
      sum = sum*(-1)
      type = "negativo"
    }
    setTotal({type,value:sum})
  }

  function logOut(){
    axios.delete(`${import.meta.env.VITE_API_URL}/session`,config)
    .catch()
    localStorage.clear()
    nav("/")
  }

  function deleteItem(id){
    if(confirm("Você deseja apagar este item?")){
      axios.delete(`${import.meta.env.VITE_API_URL}/transaction/${id}`,config)
      .catch()
      .then(()=>setList())
    }
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {name}</h1>
        <BiExit onClick={logOut} data-test="logout"/>
      </Header>

      <TransactionsContainer>
        <ul>
          {list==undefined?<></>:list.map(e=>(
            <ListItemContainer key={e._id}>
              <div>
                <span>{e.day}</span>
                <strong onClick={()=>{nav(`/editar-registro/${e.type}/${e._id}`,{state:{value:e.value,desc:e.desc}})}} data-test="registry-name">{e.desc}</strong>
              </div>
              <Value color={e.type=="entrada"?"positivo":"negativo"}><data data-test="registry-amount">{parseFloat(e.value).toFixed(2).replace(".",",")}</data><strong onClick={()=>deleteItem(e._id)} data-test="registry-delete">X</strong></Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={total.type} data-test="total-amount">{total.value.toFixed(2).replace(".",",")}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={()=>nav("/nova-transacao/entrada")} data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={()=>nav("/nova-transacao/saida")} data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
  strong{
    color: #c6c6c6;
    margin-left: 10px;
  }
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`