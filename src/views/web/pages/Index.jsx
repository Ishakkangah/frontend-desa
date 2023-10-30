import React, { useEffect, useState } from "react";

// import layout web
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import CardPages from "../../../components/general/CardPages";

export default function Index() {
  // initial title
  document.title = "Desa digital - Tentang desa";

  //   initial state
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);

  const fetchDataPages = async () => {
    setLoadingPages(true);
    await Api.get("/api/public/pages").then((response) => {
      setPages(response.data.data.data);
      setLoadingPages(false);
    });
  };

  console.log("loadingPages :", loadingPages);
  useEffect(() => {
    fetchDataPages();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div classname="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-info-circle"></i> TENTANG DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPages ? (
            <Loading />
          ) : pages.length > 0 ? (
            pages.map((page, index) => <CardPages key={index} page={page} />)
          ) : (
            <AlertDataEmpty />
          )}
        </div>
      </div>
    </LayoutWeb>
  );
}
