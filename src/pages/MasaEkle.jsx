import axios from "axios";
import React, { useEffect, useState } from "react";

function MasaEkle() {
  const [masalar, setMasalar] = useState(null);
  function submit(e) {
    e.preventDefault();
    axios
      .post("/masalar/", {
        masa: e.target[0].value,
        id: localStorage.getItem("admin_id"),
      })
      .then((res) => {
        console.log(res);
        e.target[0].value = "";
        getMasaList();
      });
  }
  useEffect(() => {
    getMasaList();
  }, []);

  function getMasaList() {
    axios.get("/masalar/" + localStorage.getItem("admin_id")).then((res) => {
      console.log(res.data);
      setMasalar(res.data);
    });
  }
  return (
    <div className="sayfa">
      <div className="row gy-5">
        <div className="col-12 col-lg-6">
          <div className="kutu p-2">
            <h4>Masa Ekle</h4>
            <form
              onSubmit={(e) => {
                submit(e);
              }}
            >
              <input
                placeholder="Masa Numarası Giriniz"
                type="text"
                className="form-control"
              />
              <button className="btn btn-primary btn-lg mt-3">Ekle</button>
            </form>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="kutu p-2">
            <h4>Masa Listesi</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Masa Numarası</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {masalar &&
                  masalar.map((val) => {
                    return (
                      <tr key={val.id}>
                        <td>{val.masa_no}</td>
                        <td>
                          <button
                            onDoubleClick={() => {
                              axios.delete("/masalar/" + val.id).then((res) => {
                                getMasaList();
                              });
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

export default MasaEkle;
