import React, { useEffect, useState } from "react";
import axios from "axios";

function Kampanya() {
  const [kampanyalilar, setKampanyalilar] = useState(null);
  const [urunler, setUrunler] = useState(null)

  useEffect(() => {
    axios
      .get("/restoran/kampanya/" + localStorage.getItem("admin_slug"))
      .then((res) => {
        console.log(res);
        setKampanyalilar(res.data);
      });

      axios.get("/restoran/urunler/"+localStorage.getItem("admin_slug")).then(res=>{
        console.log(res)
        setUrunler(res.data)
      })
  }, []);

  return (
    <div className="sayfa">

     
    
      <div className="row">
      <h5>Kampanya Yöneticisi</h5>
        <div className="col-12 col-lg-6">
          <div className="kutu mt-4 p-2">
            <h6 className="m-0">Ekle</h6>
            <p className="text-secondary">Kampanyalı ürünlere ekleme yap.</p>
            <form onSubmit={e=>{
              e.preventDefault()
              axios.post("/restoran/kampanya",{
                slug:localStorage.getItem("admin_slug"),
                id:e.target[0].value
              }).then(res=>{
                axios
                .get("/restoran/kampanya/" + localStorage.getItem("admin_slug"))
                .then((res) => {
                  console.log(res);
                  setKampanyalilar(res.data);
                });
              })
            }}>
            <select class="form-select mt-4">
            {
              urunler && urunler.map(val=>{
                return(
                  <option key={val.id} value={val.id}>{val.isim}</option>
                )
              })
            }
          </select>
          <button className="btn btn-primary mt-2">Ekle</button>
          </form>
          </div>
          
          
        </div>

        <div className="col-12 col-lg-6">
        <div className="mt-5 kutu p-2">
            <h6>Kampanyalı Ürünler</h6>
          <table className="mt-3 table table-striped">
            <thead>
              <tr>
                <th>Ürün İsmi</th>
                <th>Fiyat</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {kampanyalilar &&
                kampanyalilar.map((val) => {
                  return (
                    <tr>
                      <td>{val.isim}</td>
                      <td>
                        <b>{val.fiyat} TL</b>
                      </td>
                      <td>
                        <button
                          onDoubleClick={() => {
                            axios.delete("/restoran/kampanya/"+val.id).then(res=>{
                              axios
                              .get("/restoran/kampanya/" + localStorage.getItem("admin_slug"))
                              .then((res) => {
                                console.log(res);
                                setKampanyalilar(res.data);
                              });
                            })
                          }}
                          className="mx-3 linkbtn"
                        >
                          <i
                            style={{ color: "#e74c3c" }}
                            className="gg-trash"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default Kampanya;
