import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Categories from "../categories/Categories";

const Restaurant = ({ slug }) => {
  const [restaurant, setRestaurant] = useState({});
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState(["Any"]);
  const [category, setCategory] = useState("Any");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `http://localhost:8080/api/restaurant?name=${slug.match.params.slug}`
        )
        .then((res) => {
          setMeals(res.data.meals);
          setRestaurant(delete res.data.meals);

          // @TODO: there must be one-liner way of doing this
          let cats = ["Any"];
          meals.forEach((meal) => {
            if (!cats.includes(meal.category)) cats.push(meal.category);
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
    <div className="restaurant">
      <div className="restaurant__info">
        <p>{restaurant.name}</p>
        <p>{restaurant.description}</p>
        <p>{restaurant.category}</p>
        <p>{restaurant.deliveryTime}</p>
        <p>{restaurant.minimalDelivery}</p>
        <p>{restaurant.deliveryPrice}</p>
      </div>
      <Categories
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      <div className="meals">
        {meals.map((meal) => {
          if (meal.category === category || category === "Any") {
            let slug = meal.slug;
            return (
              <div className="meals__element">
                <p>
                  <Link to="/meal/slug">{meal.name}</Link>
                </p>
                <p>{meal.description}</p>
                <p>{meal.price}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Restaurant;
