import React, { useEffect, useState } from "react";

// import layout web
import LayoutWeb from "../../..//layouts/Web";
import { Link, useParams } from "react-router-dom";
import Api from "../../../services/Api";
import Loading from "../../../components/general/Loading";
import DateID from "../../../utils/DateID";
import AlertDataEmpty from "../../../components/general/AlertDataEmpty";

export default function WebPostsShow() {
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);

  const { slug } = useParams();

  //   fetch data detail post
  const fetchDetailDataPost = async () => {
    setLoadingPost(true);
    await Api.get(`/api/public/posts/${slug}`).then((response) => {
      setPost(response.data.data);
      setLoadingPost(false);

      // initial title
      document.title = `Desa digital - ${response.data.data.title}`;
    });
  };

  //   feth data home post
  const fetchAllPost = async () => {
    await Api.get("/api/public/posts_home").then((response) => {
      setPosts(response.data.data);
    });
  };

  //   useEffect
  useEffect(() => {
    fetchDetailDataPost();
    fetchAllPost();
  }, [slug]);

  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-8 mb-4">
            {loadingPost ? (
              <Loading />
            ) : (
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body post-content">
                  <h4 className="text-normal">{post.title}</h4>
                  <div className="author mt-3">
                    <span>
                      <i className="fa fa-user"></i> {post.user.name}
                    </span>
                    <span>
                      <i className="fa fa-folder ms-4 ml-4"></i>{" "}
                      {post.category.name}
                    </span>
                    <span>
                      <i className="fa fa-calendar ms-4 ml-4"></i>{" "}
                      {DateID(new Date(post.created_at))}
                    </span>
                  </div>
                  <hr />
                  <img
                    src={post.image}
                    className="rounded-3 w-100 mb-3"
                    alt={post.title}
                  />
                  <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-4">
            <h5 className="text-uppercase">
              <i className="fa fa-book"></i> BERITA TERBARU
            </h5>
            <hr />
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Link
                  to={`/posts/${post.slug}`}
                  className="text-decoration-none"
                  key={index}
                >
                  <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm">
                    <div className="row g-0 mb-0 pb-0">
                      <div className="col-md-5">
                        <img
                          src={post.image}
                          className="img-fluid h-100 w-100 object-fit-cover rounded-start"
                          alt="image"
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <span className="card-title">
                            {post.title.length > 40
                              ? `${post.title.substring(0, 40)}`
                              : `${post.title}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <AlertDataEmpty />
            )}
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
