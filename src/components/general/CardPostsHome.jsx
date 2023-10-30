import React from "react";
import { Link } from "react-router-dom";

//import DateID
import DateID from "../../utils/DateID";

export default function CardPostsHome({ post }) {
  return (
    <div className="col-md-6 mb-3">
      <Link to={`/posts/${post.slug}`} className="text-decoration-none">
        <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm">
          <div className="row g-0 mb-0 pb-0">
            <div className="col-md-4">
              <img
                src={post.image}
                className="img-fluid rounded h-100 w-100"
                style={{ objectFit: "cover" }}
                alt={post.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {post.title.length > 50
                    ? `${post.title.substring(0, 50)}...`
                    : post.title}
                </h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="start-0">
                    <i className="fa fa-user"></i> {post.user.name}
                  </div>

                  <div className="end-0">
                    <i className="fa fa-calendar"></i>{" "}
                    {DateID(new Date(post.created_at))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
