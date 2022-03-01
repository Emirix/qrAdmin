import axios from "axios";
import React, { useEffect, useState } from "react";

function Ayarlar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  function getInfo() {
    axios.get("/restoran/" + localStorage.getItem("admin_slug")).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }

  function submit(e) {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    axios
      .put("/restoran/" + localStorage.getItem("admin_slug"), {
        ad: e.target[0].value,
        aciklama: e.target[1].value,
        telefon: e.target[2].value,
      })
      .then((res) => {
        console.log(res.data);
        alert("Kaydedildi");
      });
  }

  function check(e, col) {
    axios
      .put("/restoran/check/" + localStorage.getItem("admin_slug"), {
        col: col,
        val: e.target.checked,
      })
      .then((res) => {
        console.log(res);
        console.log(e.target.checked);
      });
  }
  return (
    <div className="container sayfa ">
      {data ? (
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="img-fluid"
                src={data && axios.defaults.baseURL + "/logo/" + data[0].logo}
                alt=""
              />
              <span className="font-weight-bold">{data[0].restoran_adi}</span>
              <span className="text-black-50">{data[0].aciklama}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <form onSubmit={(e) => submit(e)}>
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Bilgiler</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">İşletme Adı</label>
                    <input
                      type="text"
                      defaultValue={data[0].restoran_adi}
                      className="form-control"
                      placeholder="İşletme Adı"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Paragraf</label>
                    <input
                      type="text"
                      defaultValue={data[0].aciklama}
                      className="form-control"
                      placeholder="Paragraf"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Telefon</label>
                    <input
                      type="text"
                      defaultValue={data[0].telefon}
                      className="form-control"
                      placeholder="Telefon"
                    />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <input
                    className="btn btn-primary profile-button"
                    type="submit"
                    value="Kaydet"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <h5>Genel Ayarlar</h5>
              </div>
              <div
                className="form-check"
                onChange={(e) => check(e, "ayar_yorum")}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="yorum"
                  defaultChecked={data[0].ayar_yorum == "true" ? true : false}
                />
                <label className="form-check-label" htmlFor="yorum">
                  Yorum yapmaya izin ver
                </label>
              </div>

              <div
                className="form-check"
                onChange={(e) => check(e, "istek_ayar")}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="istek"
                  defaultChecked={data[0].istek_ayar == "true" ? true : false}
                />
                <label className="form-check-label" htmlFor="istek">
                  İstek Sayfası
                </label>
              </div>

              <div
                className="form-check"
                onChange={(e) => check(e, "siparis_ayar")}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="siparis"
                  defaultChecked={data[0].siparis_ayar == "true" ? true : false}
                />
                <label className="form-check-label" htmlFor="siparis">
                  Sipariş alınabilsin mi?
                </label>
              </div>
              <h6 className="mt-5">Ödeme yöntemi</h6>
              <div
                onChange={(e) => {
                  axios.put("/restoran/odeme/"+localStorage.getItem("admin_slug"),{
                    val:e.target.value
                  }).then(res=>{

                  })
                  console.log(e.target.value);
                }}
              >
                <div class="form-check ">
                  <input
                    class="form-check-input"
                    value={"once"}
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    defaultChecked
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Yemek Öncesi Ödeme
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2" value={"sonra"}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Yemek Sonrası Ödeme
                  </label>
                </div>

                <div  class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"value={"hepsi"}
                  />
                  <label class="form-check-label" for="flexRadioDefault3">
                    Hepsi
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default Ayarlar;
