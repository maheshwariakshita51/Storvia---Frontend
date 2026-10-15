"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryResponse, productResponse] =
                    await Promise.all([
                        axios.get(
                            "http://localhost:8100/api/category/public"
                        ),

                        axios.get(
                            "http://localhost:8100/api/product/public"
                        ),
                    ]);

                setCategories(
                    categoryResponse.data.categories || []
                );

                setProducts(
                    productResponse.data.products || []
                );

            } catch (error) {
                console.error("Error loading store:", error);

                setError(
                    "Unable to load products. Please try again."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    /*
     * FILTER PRODUCTS BY CATEGORY
     */

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                (product) =>
                    product.category?._id === selectedCategory
            );


    return (
        <div className={styles.store}>

            {/* ================= HEADER ================= */}

            <header className={styles.header}>

                <div className={styles.logo}>
                    PROJECT
                </div>

                <div className={styles.headerActions}>

                    <button
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => router.push("/signup")}
                    >
                        Signup
                    </button>

                </div>

            </header>


            {/* ================= CATEGORY SUB HEADER ================= */}

            <nav className={styles.categoryBar}>

                <button
                    className={
                        selectedCategory === "All"
                            ? `${styles.categoryItem} ${styles.active}`
                            : styles.categoryItem
                    }
                    onClick={() => setSelectedCategory("All")}
                >
                    All
                </button>


                {categories.map((category) => (

                    <button
                        key={category._id}

                        className={
                            selectedCategory === category._id
                                ? `${styles.categoryItem} ${styles.active}`
                                : styles.categoryItem
                        }

                        onClick={() =>
                            setSelectedCategory(category._id)
                        }
                    >
                        {category.name}
                    </button>

                ))}

            </nav>


            {/* ================= PRODUCTS ================= */}

            <main className={styles.productsContainer}>

                <div className={styles.productsHeading}>

                    <h1>
                        {selectedCategory === "All"
                            ? "Our Products"
                            : categories.find(
                                (category) =>
                                    category._id === selectedCategory
                            )?.name
                        }
                    </h1>

                    <p>
                        Explore our latest products
                    </p>

                </div>


                {/* LOADING */}

                {loading && (
                    <div className={styles.message}>
                        Loading products...
                    </div>
                )}


                {/* ERROR */}

                {!loading && error && (
                    <div
                        className={`${styles.message} ${styles.error}`}
                    >
                        {error}
                    </div>
                )}


                {/* NO PRODUCTS */}

                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (

                        <div className={styles.message}>
                            No products available in this category.
                        </div>

                    )}


                {/* PRODUCT GRID */}

                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (

                        <div className={styles.productGrid}>

                            {filteredProducts.map((product) => (

                                <div
                                    className={styles.productCard}
                                    key={product._id}
                                >

                                    {/* PRODUCT IMAGE */}

                                    <div
                                        className={
                                            styles.productImage
                                        }
                                    >

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                            />

                                        ) : (

                                            <div
                                                className={
                                                    styles.noImage
                                                }
                                            >
                                                No Image
                                            </div>

                                        )}

                                    </div>


                                    {/* PRODUCT DETAILS */}

                                    <div
                                        className={
                                            styles.productInfo
                                        }
                                    >

                                        <span
                                            className={
                                                styles.categoryName
                                            }
                                        >
                                            {product.category?.name}
                                        </span>


                                        <h2>
                                            {product.name}
                                        </h2>


                                        <p
                                            className={
                                                styles.description
                                            }
                                        >
                                            {product.description ||
                                                "No description available."}
                                        </p>


                                        <div
                                            className={
                                                styles.productBottom
                                            }
                                        >

                                            <span
                                                className={
                                                    styles.price
                                                }
                                            >
                                                ₹{product.price}
                                            </span>


                                            <button
                                                onClick={() =>
                                                    alert(
                                                        "Product details coming soon"
                                                    )
                                                }
                                            >
                                                View Product
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

            </main>

        </div>
    );
}