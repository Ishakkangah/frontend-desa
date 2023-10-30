import React, { useEffect, useState } from "react";

// import layout web
import LayoutWeb from "../../../layouts/Web";

// import api
import Api from "../../../services/Api";

// import pagination
import Pagination from "../../../components/general/Pagination";

// import card product
import CardProduct from "../../../components/general/CardProduct";
import Loading from "../../../components/general/Loading";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

export default function WebProductsIndex() {
  // initial title
  document.title = "Dessa digital - Product desa";

  // inititial state
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //   fetch data products
  const fetchDataProducts = async (pageNumber = 1) => {
    // setLoading to be true
    setLoadingProducts(true);

    const page = pageNumber ? pageNumber : pagination.currentPage;

    // fetch data products
    await Api.get(`/api/public/products?page=${page}`).then((response) => {
      //   pass data to products
      setProducts(response.data.data.data);

      //   pass data to pagination
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });

      //   setLoading to be false
      setLoadingProducts(false);
    });
  };

  //   useEffect
  useEffect(() => {
    fetchDataProducts();
  }, []);

  console.log("this is :", products);
  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-shopping-bag"></i> PRODUK DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingProducts ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <CardProduct key={index} product={product} />
            ))
          ) : (
            <AlertDataEmpty />
          )}
          <Pagination
            currentPage={pagination.currentPage}
            perPage={pagination.perPage}
            total={pagination.total}
            onChange={(pageNumber) => fetchDataProducts(pageNumber)}
            position="center"
          />
        </div>
      </div>
    </LayoutWeb>
  );
}
