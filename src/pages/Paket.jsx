import axios from 'axios'
import React,{useEffect,useState} from 'react'
import socketIOClient from "socket.io-client";

function Paket() {
    const [siparisler,setSiparisler] = useState(null)
  
    useEffect(()=>{
      getSiparisList()

      const socket = socketIOClient("http://192.168.1.80:3050/");
      socket.on("output paket", data => {
         console.log("SERVERR")
         const audio = new Audio('success.mp3');

         audio.play();

         getSiparisList()
       });
    },[])

    function getSiparisList(){
        axios.get("/siparis/paket").then(res=>{
            console.log(res.data)
            setSiparisler(res.data)
        })
    }

    function durum(id,durum,index){
        if(siparisler != null) {
        console.log({
          id:id,
          durum:durum,
          index:index
        })
        axios.post("/siparis/durum",{
              id:id,
              durum:durum,
              index:index
        }).then(res=>{
            console.log(res)
            getSiparisList()
          })
      }
    }
  
    return (
    <div className='sayfa '>
        <h1>Paket Siparişler</h1>

        <div className="siparis-list">
        {siparisler && siparisler.map((val,i)=>{
            var data = JSON.parse(val.data)
            console.log(data)
            
            return(
                data.map(a=>{
                    return(
                        <div key={val.id} className="siparis-list__item">
                            <div className="grid">
                            <img src={a.foto} alt="" />
                 <div className="ms-3 sol">
                      <h4>{a.isim}</h4>
                      <p className="text-secondary">{a.note}</p>   
                  </div>
         
                  <div className="insta text-center">
                      <small><b>ADET</b></small>
                      <p className="fs-4 text-secondary mb-2">{a.adet}</p>
                      <small><b>TUTAR</b></small>
                      <p className="fs-4 text-primary mb-0">{a.fiyat} TL</p>
                  </div>

                  <div className="insta text-center">
                      <small><b>AD SOYAD</b></small>
                      <p className="fs-4 text-secondary mb-2">{val.ad_soyad}</p>
                      <small><b>TELEFON</b></small>
                      <p className="fs-4 text-primary mb-0">{val.telefon}</p>
                  </div>

                  <div className="insta text-center">
                      <small><b>ADRES</b></small>
                      <p className="fs-4 text-secondary mb-2">{val.adres}</p>
                  </div>
    
                  <div className="insta text-center instabtn">
                      <small><b>DURUM</b></small>
                      <p className="mb-2">
                      {val.durum == "yeni" ? 
                        <span className="badge rounded-pill bg-success">Yeni</span>
                      : ""}
                       {val.durum == "Hazırlanıyor" ? 
                        <span className="badge rounded-pill bg-info">Hazırlanıyor</span>
                      : ""}

{val.durum == "Yolda" ? 
                        <span className="badge rounded-pill bg-warning">Yolda</span>
                      : ""}
                      </p>
                      {val.durum == "yeni"? <>
                        <button onClick={e=>durum(val.id,"Hazırlanıyor",a.key)}  type="button" className="d-block mx-auto w-50 mb-2 btn btn-light btn-sm">Hazırlanıyor</button>


                      </> : ""}

                      {val.durum == "Hazırlanıyor"? <>
                        <button onClick={e=>durum(val.id,"Yolda",a.key)} type="button" className="d-block mx-auto w-50 mb-2 btn  btn-light btn-sm">Yolda</button>

                      </> : ""}

                      {val.durum == "Yolda" ? <>
                        <button onClick={e=>durum(val.id,"tamam",a.key)} type="button" className="d-block mx-auto w-50 mb-2 btn  btn-light btn-sm">Bitir</button>

                      </> : ""}


                  </div>
                            </div>
                        </div>
                    )
                })
             
            )
          
        })}
    </div>
    </div>
  )
}

export default Paket