import React, { useState, useEffect } from "react";
import axios from "axios";

const Meal = ({ slug }) => {
    const [meal, setMeal] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [requirements, setRequirements] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`http://localhost:8080/api/meals?slug=${slug.match.params.slug}`)
                .then((res) => {
                    setMeal(res.data);
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        fetchData();
    }, [slug.match.params.slug]);

    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const addToCart = (target) => {
        let item = {
            quantity: quantity,
            requirements: requirements,
            meal: meal
        };
        if (!localStorage.getItem("cart")) {
            let cart = [item];
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            // @TODO: if there are items in the cart that don't belong to the current restaurant, clear the cart
            let cart = JSON.parse(localStorage.getItem("cart"));
            let newCart = [...cart, item];
            localStorage.setItem("cart", JSON.stringify(newCart));
        }
    };

    return (
        <div className="meal">
            <p>{meal.name}</p>
            <p>{meal.description}</p>
            <p>{meal.price}</p>
            <label>Requirements: </label>
            <input type="text" name="requirements" onChange={e => setRequirements(e.target.value)} />
            <label>Quantity: </label>
            <button onClick={decrement}>-</button>
            <label>{quantity}</label>
            <button onClick={increment}>+</button>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default Meal;