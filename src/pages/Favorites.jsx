import React from "react";

import { Link } from "react-router-dom";
import Card from "../components/Card";
import AppContext from "../context";


function Favorites() {
  const {favorites, onAddToFavorite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      {favorites.length > 0 ? (
        <div>
          <div className="d-flex align-center justify-between mb-50">
            <h1 className="myFavorites">My bookmarks</h1>
          </div>
          <div className="d-flex flex-wrap justify-center">
            {favorites.map((item, index) => (
              <Card
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-bookmarks d-flex flex-column align-center justify-center">
          <img className="emoji" src="/img/going-to-cry-emoji.jpg" alt="Empty" />
          <h2 className="myFavorites">No Bookmarks :(</h2>
          <span className="text-center">You have not bookmarked anything</span>
          <Link to="/">
            <button className="greenButton mt-20">
              <img src="/img/arrow-left.svg" alt="Arrow" />
              Go Back
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Favorites;
