import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import Button from "@ui/button";
import ShareDropdown from "@components/share-dropdown";
import PlaceBidModal from "@components/modals/placebid-modal";
import { ImageType } from "@utils/types";

const ProductMynft = ({
    id,
    title,
    slug,
    price,
    latestBid,
    image,
    authors,
    bitCount,
    likeCount,
    className,
    placeBid,
    overlay,
    tokenURI
}) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <div
                className={clsx(
                    "product-style-one",
                    !overlay && "no-overlay",
                    placeBid && "with-placeBid"
                )}
            >
                <div className="card-thumbnail">
                    {image && (
                        <Anchor path={`/resale/${id}`}>
                            <video
                                muted
                                loop
                                autoPlay
                                src={image}
                                // alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                    {/* {auction_date && <CountdownTimer date={auction_date} />} */}
                    {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )}
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">

                        <Anchor
                            className="more-author-text"
                            path={`/resell-nft?id=${id}&tokenURI=${tokenURI}`}
                        >
                            {bitCount}+ Place Bit.
                        </Anchor>
                    </div>
                    {/* {!disableShareDropdown && <ShareDropdown />} */}
                </div>
                <Anchor path={`/resell-nft?id=${id}&tokenURI=${tokenURI}`}>
                    <span className="product-name">Watch Now</span>
                </Anchor>

            </div>
            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

ProductMynft.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }),
    latestBid: PropTypes.string.isRequired,
    image: ImageType.isRequired,

    placeBid: PropTypes.bool,
    bitCount: PropTypes.number,
    likeCount: PropTypes.number,
};

ProductMynft.defaultProps = {
    likeCount: 0,
    overlay: false,
};

export default ProductMynft;
