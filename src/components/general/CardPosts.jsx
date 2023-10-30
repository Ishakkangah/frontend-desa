import React from "react";
import { Link } from "react-router-dom";
import DateID from "../../utils/DateID";

export default function CardPosts({ post }) {
  return (
    <div className="col-md-4 mb-3">
      <Link to={`/posts/${post.slug}`} className="text-decoration-none">
        <div className="card mb-3 w-100 rounded-3 border-0 shadow-sm">
          <img src={post.image} className="card-img-top" alt="img" />
          <div className="card-body">
            <h5 className="card-title">
              {post.title.length > 40
                ? `${post.title.substring(0.4)}...`
                : `${post.title}`}
            </h5>
            <p className="card-text mt-3">
              {post.content.length > 50 ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 40) + "...",
                  }}
                ></span>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: post.content,
                  }}
                ></span>
              )}
            </p>
          </div>
          <div className="card-footer">
            <small className="text-body-secondary">
              <i className="fa fa-calendar"></i>{" "}
              {DateID(new Date(post.created_at))}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
}
