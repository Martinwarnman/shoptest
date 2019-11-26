# shoptest

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Shopping cart</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <link rel='stylesheet prefetch' href='https://cdn.jsdelivr.net/foundation/5.0.2/css/foundation.css'>
    <link rel="stylesheet" href="index.css">
</head>
<body>

    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="index.html">Simple Shop</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
                <ul class="navbar-nav m-auto">
                    <li class="nav-item m-auto">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onclick="store()" href="kassa.html">cart</a>
                </ul>
    
                <form class="form-inline my-2 my-lg-0">
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search...">
                        <div class="input-group-append">
                            <button type="button" class="btn btn-secondary btn-number">
                                <i class="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <a class="btn btn-success btn-sm ml-3" id="cart" onclick="store()" href="kassa.html" >
                        <i class="fa fa-shopping-cart"></i> Cart
                        <span id="cartam"class="badge badge-light"></span>
                    </a>
                </form>
            </div>
        </div>
    </nav>
    <div class="shopping-cart"></div>   
    <div id="products"></div>

    <script>
 /*       
function store(){
var a=JSON.stringify(cart)
if (typeof(Storage) !== "undefined") {// Check browser support
localStorage.setItem("cart", a);  // Store
}
}
*/

        var cart = [];
        let result = getProducts();

        let title="",text=""
                    for(let i = 0 ; i < result.length ; i++){
                        title = result[i].make;
                        text = result[i].model;//"Den bästaste bilen"
                        id =  result[i].id;

                        $("#products").append(product(id,title,text))  
                    }
        function addToCart( id, amount=1){
            console.log("Adding " + id + " :: " + amount)
            if(productInCart(id)){
                //Update amount
                cart[cart.findIndex(x=> x.id===id)].amount++;
                console.log(cart)
            }else{
            //push an object into array
                cart.push({id:id, amount: amount})
                console.log(cart)
            }
            sessionStorage.setItem("cart",JSON.stringify(cart))
            $("#cartam").html(cart.length)
        }
        function productInCart(id){
            //Checks if the product is in cart, if it is just add amount to it.
            if(cart.filter(word => word.id==id).length)
            return true;
            return false;
        }

        function getProducts(){
            let result = [{id: 1, make: "Mersu", model:"Bnez" ,price:26.15},{id: 2, make: "Subaru", model:"Impreza",price:5.15},{id: 3, make:"BMW", model:"1337",price:13.37}]
            sessionStorage.setItem("product",JSON.stringify(result))
            return result;
        }            
        function product(id, title, text, image="https://dummyimage.com/286x180/000/fff"){
            let product = `<div data="${id}" style="float:left;" class="card" style="width: 18rem;">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${text}</p>
                  <a onclick="addToCart(${id},1)" class="btn btn-primary">Lägg i varukorg</a>
                </div>
              </div>`
              return product;
        }
    
         /* $(function() {
                $.getJSON("http://www.optival.fi/products.json", function(result){
                    let title="",text=""
                    for(let i = 0 ; i < result.length ; i++){
                        title=result[i].make;
                        text = "Den bästaste bilen"
                        $("#products").append(product(title,text))  
                        console.log(result[i].make)
                    }
                });
        });*/

        /*
        (function(){
 
 $("#cart").on("click", function() {
   $(".shopping-cart").fadeToggle( "fast");
 });
 
})();
*/
    </script>
</body>
</html>