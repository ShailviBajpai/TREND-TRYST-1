import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Home from "./components/content page/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Men from "./components/content page/Men";
import Women from "./components/content page/Women";
import Cart from "./components/content page/Cart";
import Wishlist from "./components/content page/Wishlist";

export const allItemsContext = React.createContext(null);
export const cartItemsContext = React.createContext(null);

import {
	createBrowserRouter,
	Navigate,
	createRoutesFromElements,
	Route,
	Outlet,
	BrowserRouter as Router,
	RouterProvider,
    Routes
} from "react-router-dom";

export default function App() {
	const [menItems, setMenItems] = useState([]);
	const [womenItems, setWomenItems] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const allItems = { menItems, womenItems, wishlist, cartItems };
	// fetch data on mount
	useEffect(() => {
		fetchMenItems();
		fetchWomenItems();
	}, []);
	// update wishlist based on men and women items updates
	useEffect(() => {
		const menWishlist = menItems.filter((item) => item.inWishlist);
		const womenWishlist = womenItems.filter((item) => item.inWishlist);
		const currentWishlist = menWishlist.concat(womenWishlist);
		setWishlist(currentWishlist);
	}, [menItems, womenItems]);

	const toggleWishlist = (id, category) => {
		if (category === "men's clothing") {
			const updatedItems = menItems.map((item) => {
				if (item.id === id) {
					return { ...item, inWishlist: !item.inWishlist };
				}
				return item;
			});
			setMenItems(updatedItems);
		} else {
			const updatedItems = womenItems.map((item) => {
				if (item.id === id) {
					return { ...item, inWishlist: !item.inWishlist };
				}
				return item;
			});
			setWomenItems(updatedItems);
		}
	};

	const addToCart = (id) => {
		const allItemsArray = menItems.concat(womenItems);
		const targetItem = allItemsArray.filter((item) => item.id === id)[0];
		const existingItem = cartItems.filter((item) => item.info.id === id);

		if (existingItem.length === 0) {
			const newItem = { info: targetItem, quantity: 1 };
			setCartItems((prevState) => [...prevState, newItem]);
		} else {
			let updatedItems = cartItems.map((item) => {
				if (item.info.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			setCartItems(updatedItems);
		}
	};

	const clearCart = () => {
		alert("Thank you for shopping at Trend Tryst. Happy Coding!");
		setCartItems([]);
	};

	const incrementQuantity = (id) => {
		let updatedItems = cartItems.map((item) => {
			if (item.info.id === id) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCartItems(updatedItems);
	};

	const decrementQuantity = (id) => {
		const updatedItems = cartItems.map((item) => {
			if (item.info.id === id) {
				if (item.quantity === 0) {
					return item;
				} else {
					return { ...item, quantity: item.quantity - 1 };
				}
			}
			return item;
		});
		const filteredItems = updatedItems.filter((item) => item.quantity > 0);
		setCartItems(filteredItems);
	};

	const removeFromCart = (id) => {
		let updatedItems = cartItems.filter((item) => item.info.id !== id);
		setCartItems(updatedItems);
	};

	const fetchMenItems = async () => {
		const data = await fetch(
			"https://fakestoreapi.com/products/category/men's%20clothing"
		);
		const formattedData = await data.json();
		const updatedData = formattedData.map((item) => {
			return { ...item, inWishlist: false };
		});
		setMenItems(updatedData);
	};

	const fetchWomenItems = async () => {
		const data = await fetch(
			"https://fakestoreapi.com/products/category/women's%20clothing"
		);
		const formattedData = await data.json();
		const updatedData = formattedData.map((item) => {
			return { ...item, inWishlist: false };
		});
		setWomenItems(updatedData);
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route
					path="/"
					element={<Outlet />}
					errorElement={<h1>Something went wrong</h1>}>
					<Route
						index
						element={
							<Navigate
								to="/shopping-cart/login"
								replace={true}
							/>
						}
					/>
				</Route>
				<Route path="/shopping-cart">
					<Route
						index
						element={<Outlet />}
					/>
					<Route
						index
						element={
							<>
								<Header />
								<Home />
							</>
						}
					/>
					<Route
						path="login"
						element={
							<>
								<Header />
								<Login />
							</>
						}
					/>
					<Route
						path="signup"
						element={
							<>
								<Header />
								<SignUp />
							</>
						}
					/>
					<Route
						path="men"
						element={
							<>
								<Header />
								<Men
									addToCart={addToCart}
									toggleWishlist={toggleWishlist}
								/>
							</>
						}
					/>
					<Route
						path="women"
						element={
							<>
								<Header />
								<Women
									addToCart={addToCart}
									toggleWishlist={toggleWishlist}
								/>
							</>
						}
					/>
					<Route
						path="checkout"
						element={
							<>
								<Header />
								<Cart
									incrementQuantity={incrementQuantity}
									decrementQuantity={decrementQuantity}
									removeFromCart={removeFromCart}
									clearCart={clearCart}
								/>
							</>
						}
					/>
					<Route
						path="wishlist"
						element={
							<>
								<Header />
								<Wishlist
									addToCart={addToCart}
									toggleWishlist={toggleWishlist}
								/>
							</>
						}
					/>
				</Route>
			</>
		)
	);

	return (
		<allItemsContext.Provider value={allItems}>
			<RouterProvider router={router} />
		</allItemsContext.Provider>
	);
}
