import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function UrunEkle() {
  const [kategori, setKategori] = useState(null);
  const [foto, setFoto] = useState(null);
  const [loading,setLoading] = useState(false)

  

  function submit(e){
      e.preventDefault();
  //    const fd = new FormData();
      //fd.append("image",foto,foto.name)
      console.log(e.target[3].value)
    axios.post("/restoran/urunler",{
        isim:e.target[0].value,
        kategori:e.target[1].value.split("|")[0],
        kategori_id:e.target[1].value.split("|")[1],
        fiyat:e.target[2].value,
        kucuk:e.target[3].value,
        sure:e.target[4].value,
        malzemeler:e.target[5].value,
        aciklama:e.target[6].value,
        slug:localStorage.getItem("admin_slug"),
       // foto:foto
    }).then(res=>{
        console.log(foto)
        console.log(res)
        toast.success(`Ürün eklendi.`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setLoading(false)
          for(var i = 0;i < e.target.length; i++){
            e.target[i].value = ""
          }
    })
    
}

  useEffect(() => {
    


    axios
      .get("/restoran/kategoriler/" + localStorage.getItem("admin_slug"))
      .then((res) => {
        console.log(res);
        setKategori(res.data);

      });
  }, []);

  if (!localStorage.getItem("admin_id")) {
    return <Redirect to="login" />;
  } else {
    return (
      <div className="sayfa">
                <ToastContainer position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover />
        <h1>Ürün Ekle</h1>
        {kategori ? (
          <form encType='multipart/form-data' className="mt-5" onSubmit={(e)=>{submit(e)}}>
            <div className="row">
              <div className="col-lg-6 col-12">
                <div className="form-floating mb-3">
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Ürün İsmi"
                  />
                  <label htmlFor="floatingInput">Ürün İsmi</label>
                </div>

                <div className="d-flex">
                  <div className="form-floating flex-fill me-4">
                    <select
                      required
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      {kategori.map((val) => {
                        return (
                          <option value={val.name + "|"+val.id} key={val.id}>
                            {val.name}
                          </option>
                        );
                      })}
                    </select>
                    <label htmlFor="floatingSelect">Kategori</label>
                  </div>

                  <div className="form-floating mb-3 flex-fill ">
                    <input
                     required
                      min="0"
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Ürün İsmi"
                    />
                    <label htmlFor="floatingInput">Fiyat</label>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="form-floating flex-fill me-4">
                    <select required
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                    >
                      <option value="0" selected>Hayır</option>
                      <option value="1">Evet</option>
                    </select>
                    <label htmlFor="floatingSelect">Küçük Ürün</label>
                  </div>

                  <div className="form-floating mb-3 flex-fill ">
                    <input
                      min="1"
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Hazırlanma Süresü (Dakika)"
                    />
                    <label htmlFor="floatingInput">
                      Hazırlanma Süresi (Dakika)
                    </label>
                  </div>
                </div>

                <div className="form-floating mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Malzemeler"
                  />
                  <label htmlFor="floatingInput">Malzemeler</label>
                </div>

                <div className="form-floating mb-3 ">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Malzemeler"
                  />
                  <label htmlFor="floatingInput">Açıklama</label>
                </div>
              </div>

              <div className="col-lg-6 col-12">
                <input onChange={e=>{
                     console.log(e.target.files[0])
                     setFoto(e.target.files[0])

                }}  type="file" id="dosya" name="dosya" className="d-none" />
                <label htmlFor="dosya" className="file-select">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="90"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                  </svg>
                  Resim Yükleyin
                </label>

                <div className="d-flex mt-3">
                  <button className="btn btn-primary btn-secondary ms-auto">
                    İptal
                  </button>
                  <button className="text-center btn btn-primary btn-lg ms-2" disabled={loading}>{loading ? <i className="gg-spinner mx-auto" ></i> : "Ekle"}
</button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default UrunEkle;
