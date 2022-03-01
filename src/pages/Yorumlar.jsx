import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Yorum from "../components/Yorum"


function Yorumlar() {
  const [yorumlar, setYorumlar] = useState(null)
  const [update,setUpdate] = useState(0)
  useEffect(()=>{
    axios.get("/restoran/yorumlar/all/"+localStorage.getItem("admin_id")).then(res=>{
      console.log(res.data)
      setYorumlar(res.data)
    })
  },[update])
  return (
    <div className='sayfa'>
        <h1>Yorum Yöneticisi</h1>
        <p className="text-secondary">
      {
        yorumlar && yorumlar.length == 0 ? 
        <p>Bekleyen bir yorum bulunmamaktadır</p> : ""
      }
        {
          yorumlar && yorumlar.map(val=>{
            return(
              <Yorum up={()=>setUpdate(update + 1) } id={val.id} yorum={val.yorum} key={val.id} yildiz={val.star} />
            )
          })
        }


     
      </p>
    </div>
  )
}

export default Yorumlar