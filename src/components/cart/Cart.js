import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Cart = ({ cartVisibility, toggle }) => {
    const order = () => {
        axios
            .post(
                "http://localhost:8080/api/order",
                {
                    items: JSON.parse(localStorage.getItem("cart")),
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return cartVisibility
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="cart">
                    <p>Cart</p>
                    {JSON.parse(localStorage.getItem("cart")).map((item) => (
                        <p key={item.meal.slug.toString()}>{item.meal.name}</p>
                    ))}
                    <a href="/#" onClick={toggle}>
                        X
            </a>
                    <input type="button" value="Submit" onClick={order} />
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};

export default Cart;