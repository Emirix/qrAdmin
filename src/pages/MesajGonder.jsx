import axios from 'axios'
import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";

function MesajGonder() {

    const [masalar, setMasalar] = useState(null)

  function submit(e){
      e.preventDefault()
      console.log("sa")
      const socket = socketIOClient("http://192.168.1.80:3050/");
      socket.emit("input mesaj",{
         masa:e.target[0].value,
         mesaj:e.target[1].value,
     })
     e.target[1].value = ""
  }

  useEffect(()=>{
    axios.get("/masalar/"+localStorage.getItem("admin_id")).then(res=>{
        console.log(res.data)
        setMasalar(res.data)
        
        
    })
  },[])
  return (
    <div className='sayfa'>
        <h1>Mesaj Gönder</h1>
        <p className="text-secondary">Sistemi kullanan müşterilere mesaj gönderebilirsiniz</p>


       <div className="col-md-6">
       <form onSubmit={e=> e.target[1].value != "" ? submit(e) : e.preventDefault()}>
           
        <select class="mb-3  form-select form-select-sm" aria-label=".form-select-sm example">
        <option selected value="all">Tüm masalara gönder</option>
        {masalar && masalar.map(val=>{
            return(
                <option value={val.masa_no} key={val.id}>{val.masa_no}</option>
            )
        })}

            </select>
            <input placeholder='Mesaj giriniz' type="text" className='form-control my-3' />
            <button type="submit" className='btn btn-primary'>Gönder</button>
        </form>
       </div>
    
    </div>
  )
}

export default MesajGonder