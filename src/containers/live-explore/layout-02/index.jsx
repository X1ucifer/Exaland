import PropTypes from "prop-types";
import clsx from "clsx";
import SectionTitle from "@components/section-title/layout-01";
import Product from "@components/product/layout-01";
import { SectionTitleType, ProductType } from "@utils/types";

const LiveExploreArea = ({ nfts, className, space, gap }) => (
    <div
        className={clsx(
            "rn-live-bidding-area",
            space === 1 && "rn-section-gapTop",
            className
        )}
    >
        <div className="container">
            {nfts?.name && (
                <div className="row mb--50">
                    <div className="col-lg-12">
                        <SectionTitle name={nfts.name} />
                    </div>
                </div>
            )}
            {nfts && (
                <div className={clsx("row", gap && `g-${gap}`)}>
                    {nfts.map((prod) => (
                        <div
                            key={prod.id}
                            className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                            data-sal-delay="150"
                            data-sal="slide-up"
                            data-sal-duration="800"
                        >
                            <Product
                                overlay
                                placeBid="ssa"
                                title={prod.name}
                                id={prod.tokenId}
                                auction_date="12 June"
                                latestBid="sdsd"
                                price={prod.price}
                                likeCount="1"
                                image={prod.image}
                                authors={prod.seller}
                                bitCount="dd"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

LiveExploreArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    data: PropTypes.shape({
        section_title: SectionTitleType,
        products: PropTypes.arrayOf(ProductType).isRequired,
        placeBid: PropTypes.bool,
    }),
    gap: PropTypes.number,
};

LiveExploreArea.defaultProps = {
    space: 1,
};

export default LiveExploreArea;
