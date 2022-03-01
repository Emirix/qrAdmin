import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function UrunListe() {
  const [urunler,setUrunler] = useState(null)
  useEffect(()=>{
    axios.get("/restoran/urunler/"+localStorage.getItem("admin_slug")).then(res=>{
      console.log(res.data)
      setUrunler(res.data)
    })
  },[])
  return (
    <div className='sayfa'>
        
        <div className="kutu p-2">
        <h5>Ürün Listesi</h5>

        <table className="table table-striped mt-3">
  <thead>
    <tr>
      <th scope="col">İsim</th>
      <th scope="col">Kategori</th>
      <th scope="col">Fiyat</th>
      <th scope="col">İşlemler</th>
    </tr>
  </thead>
  <tbody>
    {
      urunler && urunler.map(val=>{
        return(
          <tr key={val.id} >
          <td className='fw-bold'>{val.isim}</td>
          <td>{val.anchor}</td>
          <td className='text-success fw-bold'>{val.fiyat} TL</td>
          <td>
            <div className="d-flex align-items-center">
              
              <Link to={`/urun-ekle?edit=true&id=${val.id}`} ><i style={{color:"#2ecc71"}} className="gg-pen"></i></Link>
              <Link to={`/`} className="mx-3" ><i style={{color:"#e74c3c"}} className="gg-trash"></i></Link>
              <Link to={`/`} className="" ><i style={{color:"#3498db"}} className="gg-eye"></i></Link>
            </div>
          </td>
        </tr>
        )
      })
    }

  
  </tbody>
</table>
</div>
    </div>
  )
}




export default UrunListe

