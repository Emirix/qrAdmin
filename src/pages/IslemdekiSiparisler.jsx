import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import socketIOClient from "socket.io-client";

function IslemdekiSiparisler() {
  const [gorunum, setGorunum] = useState(true);
  const [sekme, setSekme] = useState(0);
  const [siparisler, setSiparisler] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [masalar, setMasalar] = useState(null);

  useEffect(() => {
    getSiparisList();
    getMasaList();

    const socket = socketIOClient("http://192.168.1.80:3050/");
    socket.on("output siparis", (data) => {
      console.log("SERVERR");
      const audio = new Audio("success.mp3");

      audio.play();

      getSiparisList();
    });
  }, []);
  function getMasaList() {
    axios.get("/masalar/" + localStorage.getItem("admin_id")).then((res) => {
      console.log(res.data);
      setMasalar(res.data);
    });
  }
  function getSiparisList() {
    setLoading(true);
    axios
      .get(
        "/restoran/islemdeki-siparisler/" + localStorage.getItem("admin_slug")
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setSiparisler(res.data);
      });
  }

  function durum(id, durum, index) {
    if (siparisler != null) {
      console.log({
        id: id,
        durum: durum,
        index: index,
      });
      axios
        .post("/restoran/durum", {
          id: id,
          durum: durum,
          index: index,
        })
        .then((res) => {
          console.log(res);
          getSiparisList();
        });
    }
  }

  return (
    <div className="sayfa is">
      <div className="flex-wrap d-flex justify-content-between align-items-center">
        <h1>İşlemdeki Siparişler</h1>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={() => setGorunum(true)}
            type="button "
            className={`d-flex align-items-center btn ${
              !gorunum ? "btn-secondary" : "btn-primary"
            }`}
          >
            <i className="gg-list me-2"></i>Liste Görünümü
          </button>
          <button
            onClick={() => setGorunum(false)}
            type="button "
            className={`d-flex align-items-center btn ${
              gorunum ? "btn-secondary" : "btn-primary"
            }`}
          >
            <i className="gg-box me-2"></i>Masa Görünümü
          </button>
        </div>
      </div>
      <p className="text-secondary">
        Bekleyen ve yeni gelen siparişleri burada görüp yönetebilirsiniz
      </p>

      {gorunum ? (
        <div className="siparis-list mt-5">
          <div className="sekme">
            <div
              className={`sekme__item ${sekme == 0 ? "active" : ""}`}
              onClick={() => setSekme(0)}
            >
              Yönetici
            </div>
            <div
              className={`sekme__item ${sekme == 1 ? "active" : ""}`}
              onClick={() => setSekme(1)}
            >
              Mutfak
            </div>
          </div>

          {sekme == 0 ? (
            <>
              {siparisler &&
                siparisler.map((a, i) => {
                  return (
                    <div key={i} className="siparis-list__item">
                      <div className="grid">
                        <img src={a.foto} alt="" />
                        <div className="ms-3 sol">
                          <h4>{a.isim}</h4>
                          <p className="text-secondary">{a.note}</p>
                        </div>

                        <div className="insta text-center">
                          <small>
                            <b>ADET</b>
                          </small>
                          <p className="fs-4 text-secondary mb-2">{a.adet}</p>
                          <small>
                            <b>TUTAR</b>
                          </small>
                          <p className="fs-4 text-primary mb-0">{a.fiyat} TL</p>
                        </div>

                        <div className="insta text-center">
                          <small>
                            <b>ÖDEME</b>
                          </small>
                          <p className="mb-2">
                            {a.odeme == "yapilmadi" ? (
                              <span className="badge rounded-pill bg-warning">
                                Yapılmadı
                              </span>
                            ) : (
                              <span className="badge rounded-pill bg-primary">
                                Ödendi
                              </span>
                            )}
                            <span className="badge rounded-pill bg-primary"></span>
                          </p>
                          <small>
                            <b>MASA</b>
                          </small>
                          <p className="fs-4 text-secondary mb-2">{a.masa}</p>
                        </div>

                        <div className="insta text-center instabtn">
                          <small>
                            <b>DURUM</b>
                          </small>
                          <p className="mb-2">
                            {a.durum == "yeni" ? (
                              <span className="badge rounded-pill bg-warning">
                                Onay Bekliyor
                              </span>
                            ) : (
                              ""
                            )}
                            {a.durum == "Hazırlanıyor" ? (
                              <span className="badge rounded-pill bg-info">
                                Hazırlanıyor
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                          {a.durum == "yeni" ? (
                            <>
                              <button
                                onClick={(e) =>
                                  durum(a.id, "Hazırlanıyor", a.key)
                                }
                                type="button"
                                className="d-block mx-auto w-50 mb-2 btn btn-light btn-sm"
                              >
                                Hazırlanıyor
                              </button>
                              <button
                                onClick={(e) => durum(a.id, "Mutfak", a.key)}
                                type="button"
                                className="d-block mx-auto w-50 mb-2 btn btn-light btn-sm"
                              >
                                Mutfak
                              </button>
                              <button
                                onClick={(e) => durum(a.id, "iptal", a.key)}
                                type="button"
                                className="d-block mx-auto w-50 btn  btn-light btn-sm"
                              >
                                İptal
                              </button>
                            </>
                          ) : (
                            ""
                          )}

                          {a.durum == "Hazırlanıyor" ? (
                            <>
                              <button
                                onClick={(e) => durum(a.id, "tamam", a.key)}
                                type="button"
                                className="d-block mx-auto w-50 mb-2 btn  btn-light btn-sm"
                              >
                                Tamamla
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div>
                        {a.paket == "masa" ? (
                          <div class="alert alert-info mt-2" role="alert">
                            Bu sipariş masaya paket halinde verilecek
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
            </>
          ) : (
            ""
          )}

          {sekme == 1 ? (
            <>
              <div className="siparis-list__item">
                <div className="grid">
                  <img
                    src="https://cdn.yemek.com/mncrop/940/625/uploads/2017/01/ev-usulu-pizza-yeni.jpg"
                    alt=""
                  />
                  <div className="ms-3 sol">
                    <h4>Pizza</h4>
                    <p className="text-secondary">
                      {" "}
                      consectetur adipisicing elit{" "}
                    </p>
                  </div>

                  <div className="insta text-center">
                    <small>
                      <b>ADET</b>
                    </small>
                    <p className="fs-4 text-secondary mb-2">2</p>
                    <small>
                      <b>TUTAR</b>
                    </small>
                    <p className="fs-4 text-primary mb-0">331 TL</p>
                  </div>

                  <div className="insta text-center">
                    <small>
                      <b>ÖDEME</b>
                    </small>
                    <p className="mb-2">
                      <span className="badge rounded-pill bg-warning">
                        Bekleniyor
                      </span>
                    </p>
                    <small>
                      <b>MASA</b>
                    </small>
                    <p className="fs-4 text-secondary mb-2">2</p>
                  </div>

                  <div className="insta text-center">
                    <small>
                      <b>DURUM</b>
                    </small>
                    <p className="mb-2">
                      <span className="badge rounded-pill bg-warning">
                        Mutfak
                      </span>
                    </p>
                    <button
                      type="button"
                      className="d-block mx-auto w-50 mb-2 btn btn-success btn-sm"
                    >
                      Hazırlanıyor
                    </button>
                    <button
                      type="button"
                      className="d-block mx-auto w-50 btn btn-danger btn-sm"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="masa-list ">
          {masalar &&
           masalar.map((val) => {
              return (
                <div key={val.id} className="masa shadow-sm flex-column d-flex">
                  <div className="text-center number">
                    <b>MASA</b>
                    <div className="fs-4">{val.masa_no}</div>
                  </div>
                  <div className="fiyat text-primary mt-3 fs-5">
                    <b>{val.fiyat} TL</b>
                  </div>
                  <button onClick={(e) => {
                    axios.post("/masalar/hesap/"+val.id,{
                      fiyat:0
                    }).then(res=>{
                      getMasaList();
                          })
                      }} className="mt-3 btn btn-danger">
                      Hesabı Kapat
                  </button>
                </div> 
              );
            })}
        </div>
      )}
    </div>
  );
}

export default IslemdekiSiparisler;

