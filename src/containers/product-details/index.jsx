import PropTypes from "prop-types";
import clsx from "clsx";
import Sticky from "@ui/sticky";
import Button from "@ui/button";
import GalleryTab from "@components/product-details/gallery-tab";
import ProductTitle from "@components/product-details/title";
import ProductCategory from "@components/product-details/category";
import ProductCollection from "@components/product-details/collection";
import BidTab from "@components/product-details/bid-tab";
import PlaceBet from "@components/product-details/place-bet";
import { ImageType } from "@utils/types";
import React from "react";

// Demo Image

const ProductDetailsArea = ({ space, className, data }) => {

    console.log("ddd", data)




    return (
        <div
            className={clsx(
                "product-details-area",
                space === 1 && "rn-section-gapTop",
                className
            )}
        >
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <Sticky>
                            <GalleryTab images="" />
                        </Sticky>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                        <div className="rn-pd-content-area">
                            <ProductTitle
                                title={`#${data.name}`}
                                likeCount="0"
                            />
                            <span className="bid">
                                Height bid{" "}
                                <span className="price">
                                    {parseFloat(data.price)}wETH
                                    {/* {product.price.currency} */}
                                </span>
                            </span>
                            <h6 className="title-name">#22 Portal , Info bellow</h6>
                            <div className="catagory-collection">
                                <ProductCategory owner={data.owner} />
                                {/* <ProductCollection
                                    collection={product.collection}
                                /> */}
                            </div>
                            <Button color="primary-alta" path="#">
                                Unlockable content included
                            </Button>
                            <div className="rn-bid-details">
                                {/* <BidTab
                                    // bids={product?.bids}
                                    owner={product.seller}
                                // properties={product?.properties}
                                // tags={product?.tags}
                                // history={product?.history}
                                /> */}
                                <PlaceBet
                                    // highest_bid={product.highest_bid}
                                    auction_date={"20 June 2022"}
                                    data={data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

ProductDetailsArea.propTypes = {
    space: PropTypes.oneOf([1, 2]),
    className: PropTypes.string,

};

ProductDetailsArea.defaultProps = {
    space: 1,
};

export default ProductDetailsArea;
