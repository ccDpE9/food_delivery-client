import { useState } from "react";

const useCart = () => {
    const [cartVisibility, setCartVisibility] = useState(false);

    const toggle = () => {
        setCartVisibility(!cartVisibility);
    }

    return {
        cartVisibility,
        toggle
    };
}

export default useCart;