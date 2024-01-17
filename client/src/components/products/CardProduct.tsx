import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Product } from "../../interface/Product"
import { formaterDinero } from "../../helpers"
import { Order } from "../../types/cart/Order"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createOrderThunk, deleteOrderByIdThunk } from "../../redux/thunks/CartThunks";
import Alert from "../Success/Alert"

const CardProduct: React.FC<Product> = ({ product }) => {
  const [successOrder, setSuccessOrder] = useState<boolean>(false)
  const [removeOrder, setRemoveOrder] = useState<boolean>(false);
  const [productInCart, setProductInCart] = useState<boolean>(false);



  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart)
  const purchase: Order = {
    image: '',
    name: '',
    paid: false,
    quantity: 0,
    price: 0,
    unitPrice: 0,
    category: '',
    mark: '',
    ProductId: '',
    discount: 0,

  }

  useEffect(() => {

    const productFind = cart.find(p => p.ProductId === product.id);
    if (productFind) {
      setProductInCart(true);
      return
    }
    setProductInCart(false);
  }, [cart,])


  const handleAddToCart = () => {
    const priceTotal = product.discount > 0 ? (product.price - (product.price * (product.discount / 100))) * 1 : product.price * 1  //product.price * quantity;
    purchase.quantity = 1
    purchase.price = product.price
    purchase.unitPrice = product.price
    purchase.image = product.image
    purchase.name = product.name
    purchase.mark = product.mark
    purchase.ProductId = product.id
    purchase.discount = product.discount

    // Verificar si el producto ya existe
    const productFind = cart.find(p => p.ProductId === product.id);
    if (productFind) {
     
      dispatch(deleteOrderByIdThunk(productFind.id!))
        .then(() => {
          setRemoveOrder(true)

          setTimeout(() => {
            setRemoveOrder(false)
          }, 2000)
        })
        .catch(error => {
          setSuccessOrder(false)
          throw new Error(error)

        })
      return
    }
    // Si no existe, agregarlo
    
    dispatch(createOrderThunk({ ...purchase, price: priceTotal }))
      .then(() => {
        setSuccessOrder(true)

        setTimeout(() => {
          setSuccessOrder(false)
        }, 2000)
      })
      .catch(error => {
        setSuccessOrder(false)
        throw new Error(error)

      })
  }

  const Navigate = useNavigate();
  return (
    <div
      className="mx-auto w-full  shadow-md border border-gray-300  p-2 rounded-sm grid grid-cols-4 mt-4 gap-4 ">
      {successOrder && (
        <Alert message="Product added to cart" />
      )}
      {removeOrder && (
        <Alert message="Product removed from cart" />
      )}
      <div className=" mx-auto col-span-1 cursor-pointer" onClick={() => Navigate(`/detail/${product?.id}`)}>
        <img className='w-full md:w-[150px] object-contain h-auto md:h-[150px]' src={`${product.image}`} alt="img-product" />
      </div>
      <div className="col-span-3 flex  justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="">{product.name}</h2>
          <p className={`text-2xl ${product.discount > 0 ? 'line-through text-red-600' : ''} `}>{product.price && formaterDinero(product.price)}</p>
          {product.discount > 0 && (
            <div className="flex items-center">
              On offer: {product.discount > 0 && <span className="text-blue-500 font-bold">{formaterDinero(product.price - (product.price * (product.discount / 100)))}</span>}
              <span className="bg-lime-600 text-white p-1 ml-1 rounded-md text-[12px]">Discount{' '}{product.discount}%</span></div>)}
          <div className="flex items-center gap-2 ">
            <img className="w-[20px] h-[20px] object-contain"
              src="/icons/shipping.png" alt="icon-shipping" />
            <p className=" p-1 rounded-md text-[14px] ">Free Shipping in 14 days</p>
          </div>
        </div>

        <div className="flex items-center flex-col justify-center">
          {product.stock! > 0 ? (
            <p className="text-blue-800 font-bold">Available</p>
          ) : <p className="text-red-500">Out of Stock</p>}
          {product.discount > 0 && (
            <p className="bg-blue-800 text-white py-1 px-4 rounded-sm">Save {formaterDinero(product.price - (product.price - (product.price * (product.discount / 100))))}</p>
          )}
          <div className="bg-orange-500 p-2 flex rounded-sm mt-4 cursor-pointer"
            onClick={handleAddToCart}>
            <img className="w-[20px] h-[20px]" src="/images/cart.svg" alt="" />
            <p className="text-white font-bold">{productInCart ? 'Remove to cart' : 'Add to cart'}</p>
          </div>
        </div>
      </div>


    </div>
  )
}

export default CardProduct