import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function KategoriEkle() {

    const [loading,setLoading] = useState(false)
    function submit(e){
      e.preventDefault();
      setLoading(true)
      axios.post("/restoran/kategori",{
        admin_id: localStorage.getItem("admin_id"),
        admin_slug: localStorage.getItem("admin_slug"),
        kategori:e.target[0].value,


      }).then(res=>{
          console.log(res)
          toast.success(`'${e.target[0].value}' kategorisi eklendi.`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            e.target[0].value = ""
            setLoading(false)

      })
    }  

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

      <h1>Kategori Ekle</h1>
      <form className="mt-5" onSubmit={e=>submit(e)}>
        <div className="form-floating mb-3">
          <input
            required
            type="text"
            className="form-control w-100"
            id="floatingInput"
            placeholder="Kategori İsmi"
          />
          <label htmlFor="floatingInput">Kategori İsmi</label>
        </div>
        <button disabled={loading} className="text-center btn btn-primary btn-lg w-25">
            {loading ? <i className="gg-spinner mx-auto" ></i> : "Ekle"}
        </button>
      </form>
    </div>
  );
}

export default KategoriEkle;
