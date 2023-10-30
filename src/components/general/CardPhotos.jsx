import React from "react";

export default function CardPhotos({ photo }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card border-0 shadow-sm rounded-3 text-center">
        <div className="card-body mt-2">
          <div className="text-center mb-3">
            <img src={photo.image} className="w-100 rounded" alt="photo" />
          </div>
          <hr />
          <h6>
            <i>{photo.caption}</i>
          </h6>
        </div>
      </div>
    </div>
  );
}
