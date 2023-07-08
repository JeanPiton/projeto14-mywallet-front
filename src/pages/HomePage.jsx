import styled from "styled-components"
import axios from "axios"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai" 
import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const {user} = useContext(UserContext)
  const [name, setName] = useState(user.name)
  const [list, setList] = useState([])
  const [total, setTotal] = useState({type:"positivo",value:0})
  const nav = useNavigate()

  useEffect(()=>{
    if(list.length == 0){
      const config = {headers:{authorization:`Bearer ${user.token}`}}
      axios.get(`${import.meta.env.VITE_API_URL}/transaction`,config)
      .then(res=>{setList(res.data.reverse())})
      .catch(err=>alert(err.response.data))
    }
    console.log(list)
    getTotal()
    console.log(total)
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

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {list.map(e=>(
            <ListItemContainer key={e._id}>
              <div>
                <span>{e.day}</span>
                <strong>{e.desc}</strong>
              </div>
              <Value color={e.type=="entrada"?"positivo":"negativo"}>{parseFloat(e.value).toFixed(2)}</Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={total.type}>{total.value.toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={()=>nav("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={()=>nav("/nova-transacao/saida")}>
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