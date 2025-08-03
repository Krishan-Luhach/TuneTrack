"use client";
import { Price, ProductWithPrices } from "@/types";
import Modal from "./Modal";
import Button from "./Button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface SubscribeModalProps {
  products: ProductWithPrices[];
}
export const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  let content = <div className="text-center">No products available.</div>;
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const subscribeModal = useSubscribeModal()

  const {user,isLoading, subscription} = useUser();
  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if(!user){
        setPriceIdLoading(undefined);
        return toast.error('Must be logged in ');
    }
    if(subscription){
        setPriceIdLoading(undefined);
        return toast('Already subscribed')
    }

    try{
        const {sessionId} = await postData({
            url: '/api/create-checkout-session',
            data:{price}
        });
        const stripe = await getStripe();
        stripe?.redirectToCheckout({sessionId});
    }
    catch(error){
        toast.error((error as Error)?.message);
    }
    finally{
        setPriceIdLoading(undefined);
    }
  };
  const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);
    return priceString;
  };
  if (products?.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }
          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
            >
              {`Subscribe for ${formatPrice(price)} for ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  if(subscription){
    content = (
        <div className="text-center">
            Already Subscribed
        </div>
    )
  }

  const onChange = (open:boolean)=>{
    if(!open){
        subscribeModal.onClose()
    }
  }
  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with TuneTrack Premium "
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};
