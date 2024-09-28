document.addEventListener("DOMContentLoaded",async ()=>{
    const productList = document.querySelector('.product-list')
    const cartList = document.querySelector('.cart-items')
    const totalPrice = document.querySelector('.total-price')
    const cartMessage = document.querySelector('.empty-cart-msg')
    const productsMessage = document.querySelector('.products-msg')

    const API = 'https://dummyjson.com/products?limit=10'

    let cartItems = []

    let productsItems = []
    
    try {
        const resposne = await fetchAllProducts(API)
        displayAllProducts(resposne)
        insertProductsToCart(resposne)
    } catch (error) {
        callError()
    }

    // fetch all products 

    async function fetchAllProducts(API){
        const result = await fetch(API,{
            method:'GET'
        })

        // if the products not fetch 
        if(!result.ok){
            throw new Error("Failed To Load Products")
        }

        // if all ok 
        const data = await result.json()
        
        return data
    }


    // display all products on the list 

    function displayAllProducts(productsData){
        productList.innerHTML = productsData.products.map((product)=>{
           return  `
            <div class="product" id=${product.id}>
                <h2>${product.title}</h2>
                <p>Price: $${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
            `
        }).join('')
    }


    function callError(){
        productsMessage.classList.add('active')
        productList.classList.remove('active')
    }


    // function for inserting the cart item into the cart array

    function insertProductsToCart(prodcutsData){

        prodcutsData.products.forEach(prod => {     
            const item = {
                id:prod.id,
                title:prod.title,
                price:prod.price
            }
    
            productsItems.push(item)
        });

        
        
    }


    // adding the click event to the cart items using the event delegation and event bubling 

    productList.addEventListener('click',(event)=>{
        const cartItemId = Number(event.target.parentNode.id)

        
        
        // find the product correspoding to that id in the products array 

        const product = productsItems.find(prod => prod.id === cartItemId)

        
        // if the product found 

        if(product){
            // add it to the cart item 
            addProdtoCart(product)

            // display cart items 
            displayCartItems()
        }


        // updating the total price in the cart items section 
        upadteTotalPrice()

        // handle the cart message 

        handleCartMessage()
    })


    // add product to the cart 

    function addProdtoCart(product){
        cartItems.push({
            id:product.id,
            title:product.title,
            price:product.price
        })
    }


    //function to display all items available in the cart 

    function displayCartItems(){
        // reset the previous html 
        cartList.innerHTML=''

        cartList.innerHTML = cartItems.map((prod)=>{
           
            
            return `
           <li class="cart-item" id="${prod.id}"> 
                <span class="cart-item-title">${prod.title}</span>  
                <span class="cart-item-price">Price: $${prod.price}</span>
            </li>
            `
        }).join('')

    }
    

    // function for updating the total cart items price 

    function upadteTotalPrice(){
        // reset the previous total 

        totalPrice.textContent = ''

        let totalPriceCalculated = 0

        //iterate over the cart items list t calculate total price 

        cartItems.forEach((item)=>{
            totalPriceCalculated+= item.price
        })

        totalPrice.textContent= `Total Price : $${Math.round(totalPriceCalculated,2)}`
    }


    // handle the not cart items messgae 
    function handleCartMessage(){
        if(cartItems.length>0){
            cartMessage.classList.remove('active')
        }

        else{
            cartMessage.classList.add('active')
        }
    }
})
