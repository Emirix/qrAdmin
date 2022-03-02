import axios from 'axios';
import React,{useEffect,useState} from 'react'
import socketIOClient from "socket.io-client";

function Istek() {

    const [kisayollar, setKisayollar] = useState(null)
    const [istekler, setIstekler] = useState(null)
    useEffect(()=>{
        getKisayol()
        getTalepler()

        
      const socket = socketIOClient("http://192.168.1.80:3050/");

      socket.on("output istek", data => {
         getTalepler()
       });
    },[])
  function addKisayol(e){
    e.preventDefault();
    axios.post("/istek/kisayol",{
        text:e.target[0].value,
        slug:localStorage.getItem("admin_slug")
    }).then(res=>{
        getKisayol()
        console.log(res)
        e.target[0].value = ""        
    })
  }

  function getKisayol(){
      axios.get("/istek/list/"+localStorage.getItem("admin_slug")).then(res=>{
          setKisayollar(res.data)
          console.log(res.data)
      })
  }

  function getTalepler(){
      axios.get("/istek/talepler/"+localStorage.getItem("admin_slug")).then(res=>{
          console.log(res.data)
          setIstekler(res.data)
          
      })
  }

  function okundu(id,durum){
      axios.put("/istek/guncelle/"+id,{
        durum:durum
      }).then(res=>{
        console.log(res)
        getTalepler()
      })
  }

  
  function deleteİstel(id){
    axios.delete("/istek/sil/"+id).then(resx=>{
      console.log(resx)
      getKisayol()
    })
  }
    
  return (
    <div className='sayfa'>
        <div className="row">
            <div className="col-lg-6">
            <h4 className="mb-3">Aktif İstekler</h4>
                    <div className="istek-list">
                        {
                            istekler != null && istekler.length == 0 ?
                            <div className='alert alert-warning'>Aktif bir istek bulunmamaktadır</div>
                            : ""
                        }
                        {
                            istekler && istekler.map(val=>{
                                return(
                                    <div className="istek " key={val.id} id={`istekid${val.id}`}>
                                    <div className="sol">
                                        {val.masa}
                                    </div>
                                    <div className="sag">
                                        <div className="istiyor">{val.istek}</div>    
                                        <div className="sunu">Talep Etti</div>    
                                    </div>
                                    <div className="islem">
                                        <button onDoubleClick={(e)=>{
                                            document.querySelector(`#istekid${val.id}`).classList.add("disabled-istek")
                                            okundu(val.id,"tamam")
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/></svg>
                                        </button>
                                    </div>
        
                                </div>  
                                )
                            })
                        }
  

                      

                        

                      
                    </div>    

            </div>
            <div className="col-lg-6">
                <div className="kutu p-2">
                <h5 className='mt-0'>İstek Kısayolu Ekle</h5>
                <form className='' onSubmit={e=>addKisayol(e)}>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Başlık</label>
                </div>
                <button className="btn btn-lg mt-3 btn-primary">Ekle</button>
                </form>
                </div>
                <div className="kutu p-2 mt-3">
                <h4 className='mt-0'>İstek Kısayolları</h4>
                <table className='table mt-3 emir-table'>
                    <thead>
                        <tr>
                        <th  scope='col'>İsİm</th>
                        <th scope='col'>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            kisayollar && kisayollar.map(val=>{
                                return(
                                    <tr key={val.id}>
                                    <td className='datatable-td'>{val.text}</td>
                                    <td > <button onDoubleClick={()=>{
                deleteİstel(val.id)
              }} className="mx-3 linkbtn" ><i style={{color:"#e74c3c"}} className="gg-trash"></i></button>
                                    </td>
                                </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Istek