import React, { useState, useEffect } from "react";
import axios from "axios";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Any");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios
        .get("http://localhost:8080/api/restaurants")
        .then((res) => {
          setRestaurants(res.data);

          // @TODO: there must be one-liner way of doing this
          let cats = ["Any"];
          res.data.forEach((restaurant) => {
            if (!cats.includes(restaurant.category))
              cats.push(restaurant.category);
          });
          setCategories(cats);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  const handleCategoryClick = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="categories">
        {categories.map((cat) => (
          <label>
            <input
              type="radio"
              value={cat}
              name={cat}
              checked={category === cat}
              onClick={handleCategoryClick}
            />
            {cat}
          </label>
        ))}
      </div>
      <div className="restaurants">
        {restaurants.map((restaurant) => {
          if (restaurant.category === category || category === "Any") {
            return <p>{restaurant.name}</p>;
          }
        })}
      </div>
    </>
  );
};

export default Restaurants;
