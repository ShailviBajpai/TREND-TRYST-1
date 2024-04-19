import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { allItemsContext } from "../App";
import { MdFavorite, MdHome, MdLogin } from "react-icons/md";
export default function Header() {
    const cartItems = useContext(allItemsContext).cartItems;
    const totalItems = getTotalQuantities(cartItems);
    return (
        <header>
            <div className="upper-nav">
                <div className="logo">TREND TRYST</div>
                <div className="upper-nav-links">
                    <Link to="/">
                        <MdHome /> Home
                    </Link>
                    <Link to="/shopping-cart/login">
                        <MdLogin /> User
                    </Link>
                    <Link to="/shopping-cart/wishlist">
                        <MdFavorite /> WishList
                    </Link>
                    <Link to="/shopping-cart/checkout">
                        <MdShoppingCart color="white" /> Cart{`(${totalItems})`}
                    </Link>
                </div>
            </div>
            <nav className="lower-nav">
                <Link to="/shopping-cart/men">Men</Link>
                <Link to="/shopping-cart/women">Women</Link>
            </nav>
        </header>
    );
}

function getTotalQuantities(items) {
    const total = items.reduce((sum, item) => {
        return (sum += item.quantity);
    }, 0);
    return total;
}
