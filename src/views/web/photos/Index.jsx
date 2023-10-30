import React, { useEffect, useState } from "react";

// import layout web
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import CardPhotos from "../../../components/general/CardPhotos";
import Loading from "../../../components/general/Loading";
import Pagination from "../../../components/general/Pagination";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

export default function WebPhotosIndex() {
  // initial title
  document.title = "Desa digital - Galerry";

  //   initial state
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //   fetch data photos
  const fetchDataPhotos = async (pageNumber = 1) => {
    setLoadingPhotos(true);
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/public/photos?page=${page}`).then((response) => {
      setPhotos(response.data.data.data);
      setLoadingPhotos(false);
      console.log("resposne :", response);

      //   pass data to pagination
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });
    });
  };

  // hook useEffect
  useEffect(() => {
    fetchDataPhotos();
  }, []);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-images"></i> GALERI FOTO
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPhotos ? (
            <Loading />
          ) : photos.length > 0 ? (
            photos.map((photo, index) => (
              <CardPhotos key={index} photo={photo} />
            ))
          ) : (
            <AlertDataEmpty />
          )}
          <div>
            <Pagination
              currentPage={pagination.currentPage}
              perPage={pagination.perPage}
              total={pagination.total}
              onChange={(pageNumber) => fetchDataPhotos(pageNumber)}
              position="center"
            />
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
