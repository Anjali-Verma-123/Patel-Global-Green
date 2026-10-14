import Cart from "../models/Cart.js";


export const addToCart = async(req,res)=>{

try{

const {productId} = req.body;

let cart = await Cart.findOne({
    user:req.user.id
});


if(!cart){

cart = await Cart.create({
    user:req.user.id,
    products:[
        {
            product:productId,
            quantity:1
        }
    ]
});

}
else {

  const existingProduct = cart.products.find(
    (item) => item.product.toString() === productId
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({
      product: productId,
      quantity: 1,
    });
  }

  await cart.save();
}


res.status(200).json({
    success:true,
    message:"Product Added To Cart",
    cart
});


}
catch(error){

res.status(500).json({
    success:false,
    message:error.message
});

}

}

export const getCart = async(req,res)=>{
  try{

    const cart = await Cart.findOne({
  user: req.user.id
}).populate("products.product");

if (cart) {
  cart.products = cart.products.filter(
    item => item.product !== null
  );
}

   
    if (!cart) {
  return res.status(200).json({
    success: true,
    cart: {
      products: [],
    },
  });
}


    res.status(200).json({
      success:true,
      cart
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

export const removeFromCart = async(req,res)=>{
  try{

    const {productId}=req.params;


    const cart = await Cart.findOne({
      user:req.user.id
    });


    cart.products = cart.products.filter(
      item => item.product.toString() !== productId
    );


    await cart.save();


    res.status(200).json({
      success:true,
      message:"Product Removed From Cart",
      cart
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const cartProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!cartProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cartProduct.quantity = Number(quantity);

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user.id,
    }).populate("products.product");

    res.status(200).json({
      success: true,
      message: "Quantity Updated",
      cart: updatedCart,
    });
  } catch (error) {
    console.log("UPDATE QUANTITY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};