import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import store from "../../../redux/store";
import {fetchProductById} from "./SellerProductSlice";
import SellerProductDetailUnReleased from "./SellerProductDetailUnReleased";
import SellerProductDetailReleasedRunning from "./SellerProductDetailReleasedRunning";
import SellerProductDetailReleasedEnded from "./SellerProductDetailReleasedEnded";
import {compareDates} from "../../../utils/utilFunctions";

export default function SellerProductDetail() {
    const {id} = useParams();

    console.log(`SellerProductDetail: ${id}`);
    let [product, setProduct] = useState();

    useEffect(() => {
        store.dispatch(fetchProductById({id}))
            .then((value) => {
                console.log("fetchProductById 222 ", value);
                setProduct(value.payload.data)
                console.log("fetchProductById 333 ", product);
            })
            .catch(() => {
            });
    }, []);

    const checkBody = () => {
        if (product) {
            if (product.released) {
                const res = compareDates(new Date(), new Date(product.auction.bidDueDateTime));
                if (res) {
                    return <SellerProductDetailReleasedEnded product={product}/>;
                } else {
                    return <SellerProductDetailReleasedRunning product={product}/>;
                }
            } else {
                return <SellerProductDetailUnReleased product={product}/>;
            }
        } else {
            return <></>;
        }
    }

    return (
        <>
            {checkBody()}
        </>
    );

}