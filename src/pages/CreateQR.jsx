import axios from "axios";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

export default function CreateQR() {
  const [masalar, setMasalar] = useState(null);
  const [masaNo, setMasaNo] = useState("sec_baba");
  const [resim, setResim] = useState(null);

  useEffect(() => {
    getMasaList();
  }, []);

  useEffect(() => {
    if (masaNo != "sec_baba") {
      setResim(
        `https://chart.googleapis.com/chart?chl=http://localhost:3001/start/${localStorage.getItem(
          "admin_slug"
        )}/${masaNo}&cht=qr&chs=200x200`
      );
    } else {
      setResim(null);
    }
  }, [masaNo]);

  function getMasaList() {
    axios.get("/masalar/" + localStorage.getItem("admin_id")).then((res) => {
      console.log(res.data);
      setMasalar(res.data);
    });
  }
  return (
    <div className="sayfa">
      <h1>QR Oluştur</h1>
      {resim == null ? (
        <div
          style={{ width: 300, height: 300 }}
          className="text-center bg-white text-secondary my-5 border d-flex justify-content-center align-items-center"
        >
          Oluşturulan Kod Burada Gösterilecek
        </div>
      ) : (
        <img src={resim} className="my-5 border" width="300" height={300} />
      )}

      {masalar == null ? (
        <div className="skeleton-box" style={{ width: 300 }}></div>
      ) : (
        <select
          style={{ width: 300 }}
          value={masaNo}
          onChange={(e) => setMasaNo(e.target.value)}
          className="form-select"
        >
          <option value={"sec_baba"} selected>
            Masa Numarası Seçiniz
          </option>
          {masalar.map((val) => {
            return (
              <option key={val.id} value={val.masa_no}>
                {val.masa_no}
              </option>
            );
          })}
        </select>
      )}

      {masaNo != "sec_baba" ? (
        <button
          className="btn btn-primary btn-lg mt-3"
          onClick={() => {
            saveAs(resim, `masa-${masaNo}.png`);
          }}
        >
          İndir
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
