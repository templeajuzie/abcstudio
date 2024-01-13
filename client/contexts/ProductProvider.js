"use client";
import React from "react";
import { ProductContext } from "./productContext";
import { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client"
import { BiSolidRocket } from "react-icons/bi";
import { UseUserContext } from "./UserContext";


const ProductProvider = ({ children }) => {
  const { UserData } = UseUserContext();
  const socket = io.connect(`${process.env.NEXT_PUBLIC_SOCKET_URL}`);
  const router = useRouter();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState(null);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  });
  const [clickState, setClickState] = useState(false);
  const [screen, setScreen] = useState(!isTabletOrMobile);
  const [category, setCategory] = useState([]);


  console.log(UserData)

  const handleUser = () => {
    setClickState(true);
    // Open the modal when the link is clicked on mobile
    if (isTabletOrMobile) {
      // e.preventDefault(); // Prevent default navigation
      setScreen((prev) => !prev);
    }
  };

  const handleLinkClick = () => setUserNav(!isTabletOrMobile);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    router.push("/productDetails");
  };

  // add to cart socket
  const handleAddToCart = (productId, userId) => {
    console.log("emmiting value to add to cart")
    const cartdata = {
      productId: productId,
      userId: userId,
    };

    console.log("cartdata", cartdata)
    socket.emit("cartadd", cartdata);
  };

  // remove item from cart
  const handleRemoveFromCart = (productId, userId) => {
    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit("cartremove", cartdata);
  };

  // minus cart quantity
  const handleCartDecrease = (productId, userId) => {
    const cartdata = {
      productId: productId,
      userId: userId,
    };

    socket.emit("cartminus", cartdata);
  };

  // get the cart products back from the server

 
    socket.on("cart", (cartItems) => {
      console.log("cart sent back");
      setCartProducts(cartItems);
    });
  
 
 
    console.log("cart products from socket", cartProducts);


  useEffect(() => {
    const fetchWishlistFromServer = async () => {
      try {
        // Map through the wishlist IDs and fetch product details
        const productsPromises = UserData.wishlist.map(async (productId) => {
          const productResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products/${productId}`
          );
          return productResponse.data; // Adjust to your server's response structure
        });

        const products = await Promise.all(productsPromises);

        setWishlist(products);
      } catch (error) {
        console.error("Error fetching wishlist from the server:", error);
      }
    };

    // Fetch wishlist from the server when the component mounts
    fetchWishlistFromServer();
  }, []);

//  const fetchCartWithProductDetails = async (cart) => {
//    try {
//      const cartWithProductDetails = await Promise.all(
//        cart.map(async (cartItem) => {
//          try {
//            const response = await axios.get(
//              `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products/${cartItem.product}`
//            );
//            const product = response.data;

//            return {
//              product:{...product},
//              quantity: cartItem.quantity,
//              _id: cartItem._id,
//            };
//          } catch (error) {
//            console.error("Error fetching product details:", error);
//            return null;
//          }
//        })
//      );

//      return cartWithProductDetails.filter(Boolean); // Remove any null entries
//    } catch (error) {
//      console.error("Error fetching cart with product details:", error);
//      return [];
//    }
//  };

//   useEffect(() => {
//     const fetchInitialCart = async () => {
//       try {
      
//         const cartWithProductDetails = await fetchCartWithProductDetails();
//         setCartProducts(cartWithProductDetails);
//       } catch (error) {
//         console.error("Error fetching initial cart:", error);
//       }
//     };
   

//     fetchInitialCart();
//     console.log(cartProducts)
//   },[])
 

 

  // emit signals to add to wish list
  const handleWishAdd = (productId, userId) => {
    const wishdata = {
      productId: productId,
      userId: userId,
    };
    socket.emit("wishadd", wishdata);
    
  };

  //reevie the response from the server
  socket.on("wishlist", (userwishlist) => {
    // Update the local state with the updated
    console.log(userwishlist);
    setWishlist(userwishlist);
    console.log("returning wishlist", wishlist);
  });

  

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}admin/commerce/products`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }

      const products = response.data;
      setAllProducts(products);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    console.log("hit", searchTerm);
    // Filter products based on the search term
    const filteredProducts = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredProducts);
    console.log("filtered", filteredProducts);
    console.log("allProduct in provider", allProducts);
  };

  console.log("provider search results", searchResults);

  const handleResultClick = (searchTerm, e) => {
    e.preventDefault();
    // Redirect to the results page with the search term
    router.push(`/searchResults?term=${searchTerm}`);
  };

  return (
    <ProductContext.Provider
      value={{
        cartProducts,
        selectedProduct,
        isModalOpen,
        handleProductClick,
        openModal,
        closeModal,
        handleAddToWishlist,
        wishlist,

        setSearchResults,

        handleRemoveFromCart,
        handleLinkClick,
        isDesktop,
        isTabletOrMobile,
        screen,
        handleUser,
        clickState,

        category,
        allProducts,
        handleSearch,
        handleResultClick,
        searchResults,
        setSearchResults,
        fetchData,
        setAllProducts,
        handleWishAdd,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartDecrease,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

/**
 * Returns the product provider from the React context.
 * @returns {Object} The product provider.
 */
export function UseProductProvider() {
  return useContext(ProductContext);
}