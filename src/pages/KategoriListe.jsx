import { blue } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KategoriListe() {
  const [urunler, setUrunler] = useState(null);
  const [katId, setKatId] = useState(4);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  function submit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/restoran/kategori", {
        admin_id: localStorage.getItem("admin_id"),
        admin_slug: localStorage.getItem("admin_slug"),
        kategori: e.target[0].value,
      })
      .then((res) => {
        console.log(res);
        toast.success(`'${e.target[0].value}' kategorisi eklendi.`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        e.target[0].value = "";
        setLoading(false);

        axios
          .get("/restoran/kategoriler/" + localStorage.getItem("admin_slug"))
          .then((res) => {
            console.log(res.data);
            setUrunler(res.data);
          });
      });
  }

  function deleteKategori(id) {
    axios.delete("/restoran/kategori/" + id).then((resx) => {
      console.log(resx);
      axios
        .get("/restoran/kategoriler/" + localStorage.getItem("admin_slug"))
        .then((res) => {
          console.log(res.data);
          setUrunler(res.data);
        });
    });
  }

  function guncelle(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .put("/restoran/kategoriler/" + katId, {
        isim: e.target[0].value,
      })
      .then((res) => {
        console.log(res);
        e.target[0].value = "";
        setEditMode(false);
        setLoading(false);
        axios
          .get("/restoran/kategoriler/" + localStorage.getItem("admin_slug"))
          .then((resx) => {
            console.log(resx.data);
            setUrunler(resx.data);
          });
      });
  }
  useEffect(() => {
    axios
      .get("/restoran/kategoriler/" + localStorage.getItem("admin_slug"))
      .then((res) => {
        console.log(res.data);
        setUrunler(res.data);
      });
  }, []);
  return (
    <div className="sayfa">
      <div className="row">
        <div className="col-12 col-lg-6">
        <div className="kutu p-2">
            <h6 className="m-0">Ekle</h6>
            <form className="mt-0" onSubmit={(e) => submit(e)}>
              <div className="form-floating mb-3 mt-3 ">
                <input
                  required
                  type="text"
                  className="form-control w-100"
                  id="floatingInput"
                  placeholder="Kategori İsmi"
                  style={{ width: "250px" }}
                />
                <label htmlFor="floatingInput">Kategori İsmi</label>
              </div>
              <button
                disabled={loading}
                className="text-center btn btn-primary btn-lg w-25"
              >
                {loading ? <i className="gg-spinner mx-auto"></i> : "Ekle"}
              </button>

            </form>
          </div>
          {editMode ? (
            <div className="kutu p-2 my-3">
            <form onSubmit={(e) => guncelle(e)}>
              <div className="form-floating mb-3 ">
                <input
                  required
                  type="text"
                  className="form-control w-100 "
                  id="floatingInput2"
                  placeholder="Yeni İsim"
                  style={{ width: "230px" }}
                />
                <label htmlFor="floatingInput2">Yeni İsim</label>
              </div>
              <button
                onClick={(e) => setEditMode(false)}
                type="button"
                className="btn btn-secondary btn-lg me-2"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="text-center btn btn-primary btn-lg "
              >
                {loading ? <i className="gg-spinner mx-auto"></i> : "Güncelle"}
              </button>
            </form>
            </div>
          ) : (
            ""
          )}

          <div className="kutu p-2 mt-5">
          <h6>Liste</h6>

          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th scope="col">Kategori</th>
                <th scope="col">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {urunler &&
                urunler.map((val) => {
                  return (
                    <tr>
                      <td className="fw-bold">{val.name}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <a
                            href="#"
                            onClick={(e) => {
                              setKatId(val.id);
                              setEditMode(true);
                            }}
                          >
                            <i
                              style={{ color: "#2ecc71" }}
                              className="gg-pen"
                            ></i>
                          </a>
                          <button
                            onDoubleClick={() => {
                              deleteKategori(val.id);
                            }}
                            className="mx-3 linkbtn"
                          >
                            <i
                              style={{ color: "#e74c3c" }}
                              className="gg-trash"
                            ></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          </div>
    
        </div>
        <div className="col-12 col-lg-6">
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
         
        </div>
      </div>
    </div>
  );
}

export default KategoriListe;
