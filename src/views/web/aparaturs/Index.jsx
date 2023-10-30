import React, { useEffect, useState } from "react";

import LayoutWeb from "../../../layouts/Web";
import CardAparaturs from "../../../components/general/CardAparaturs";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

export default function Index() {
  // initital title
  document.title = "Desa Digital - Aparaturs";

  //   initial state
  const [aparaturs, setAparaturs] = useState([]);
  const [loadingAparaturs, setLoadingAparaturs] = useState(true);

  //   fetch data aparaturs
  const fetchDataAparaturs = async () => {
    setLoadingAparaturs(true);
    await Api.get("/api/public/aparaturs").then((response) => {
      setAparaturs(response.data.data);
      setLoadingAparaturs(false);
    });
  };

  //   use Effect
  useEffect(() => {
    fetchDataAparaturs();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-user-circle"></i> Aparatur DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingAparaturs ? (
            <Loading />
          ) : aparaturs.length > 0 ? (
            aparaturs.map((aparatur, index) => (
              <CardAparaturs key={index} aparatur={aparatur} />
            ))
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
