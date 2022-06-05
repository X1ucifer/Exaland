import PropTypes from "prop-types";
import Image from "next/image";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import { ImageType } from "@utils/types";

const GalleryTab = ({ images }) => (
    <div className="product-tab-wrapper">
        <TabContainer defaultActiveKey="nav-0">
            <div className="pd-tab-inner">
                <Nav className="rn-pd-nav rn-pd-rt-content nav-pills">
                    {/* {images && images.map((image, index) => ( */}
                    <Nav.Link
                        // key={image.src}
                        as="button"
                    // eventKey={`nav-${index}`}
                    >
                        <span className="rn-pd-sm-thumbnail">
                            <img
                                src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2F1.jpg&w=640&q=75"
                                // alt={image?.alt || "Product"}
                                width={167}
                                height={167}
                            />
                        </span>
                    </Nav.Link>
                    {/* ))} */}
                </Nav>
                <TabContent className="rn-pd-content">
                    {/* {images?.map((image, index) => ( */}
                    <TabPane>
                        <div className="rn-pd-thumbnail">
                            <img
                                src="https://nuron-nextjs.vercel.app/_next/image?url=%2Fimages%2Fportfolio%2Flg%2F1.jpg&w=640&q=75"
                                // alt={image?.alt || "Product"}
                                width={560}
                                height={560}
                            />
                        </div>
                    </TabPane>
                    {/* ))} */}
                </TabContent>
            </div>
        </TabContainer>
    </div>
);

GalleryTab.propTypes = {
    images: PropTypes.arrayOf(ImageType),
};
export default GalleryTab;
