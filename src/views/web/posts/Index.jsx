import React, { useEffect, useState } from "react";

// import layout web
import LayoutWeb from "../../../layouts/Web";
import Api from "../../../services/Api";
import Pagination from "../../../components/general/Pagination";
import Loading from "../../../components/general/Loading";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";
import CardPosts from "../../../components/general/CardPosts";

export default function WebPostsIndex() {
  // initial title
  document.title = "Desa digital - Berita";

  //   initial state
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //   fetch data posts
  const fetchDataPosts = async (pageNumber = 1) => {
    setLoadingPosts(true);
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/public/posts?page=${page}`).then((response) => {
      //   pass data to posts
      setPosts(response.data.data.data);

      //   pass data to pagination
      setPagination({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      });

      //   convert to false
      setLoadingPosts(false);
    });
  };

  //   useEffect
  useEffect(() => {
    fetchDataPosts(), [];
  }, []);
  console.log("response :", posts);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-uppercase">
              <i className="fa fa-book"></i> BERITA DESA
            </h5>
            <hr />
          </div>
        </div>
        <div className="row mt-4">
          {loadingPosts ? (
            <Loading />
          ) : posts.length > 0 ? (
            posts.map((post, index) => <CardPosts key={index} post={post} />)
          ) : (
            <AlertDataEmpty />
          )}

          <Pagination
            currentPage={pagination.currentPage}
            perPage={pagination.perPage}
            total={pagination.total}
            onChange={(pageNumber) => fetchDataPosts(pageNumber)}
            position="center"
          />
        </div>
      </div>
    </LayoutWeb>
  );
}
