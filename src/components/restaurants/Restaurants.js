import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Categories from "../categories/Categories";

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

  return (
    <>
      <Categories
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <div className="restaurants">
        {restaurants.map((restaurant) => {
          if (restaurant.category === category || category === "Any") {
            let link = `/restaurant/${restaurant.slug}`;
            return (
              <div className="restaurants__element">
                <Link to={link}>{restaurant.name}</Link>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Restaurants;
