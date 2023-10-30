import React, { useEffect, useState } from "react";

// import layout web
import LayoutWeb from "../../../layouts/Web";
import { useParams } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";

export default function WebPagesShow() {
  // initial state
  const [page, setPage] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);

  //   useparams
  const { slug } = useParams();

  //   fetch detail page show
  const fetchDetailPageShow = async () => {
    setLoadingPage(true);
    await Api.get(`/api/public/pages/${slug}`).then((response) => {
      setPage(response.data.data);
      setLoadingPage(false);
      document.title = `Desa digital - ${response.data.data.title}`;
    });
  };

  //   useEffect
  useEffect(() => {
    fetchDetailPageShow();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        {loadingPage ? (
          <Loading />
        ) : (
          <div className="row">
            <div className="col-md-12">
              <h4 className="text-uppercase">
                <i className="fa fa-info-circle mx-2"></i>
                {page.title}
              </h4>
              <hr />
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body post-content">
                  <p dangerouslySetInnerHTML={{ __html: page.content }}></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWeb>
  );
}
