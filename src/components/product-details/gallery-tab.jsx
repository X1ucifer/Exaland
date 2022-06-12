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
            <div className="pd-tab-inner mt--30" >
                <TabPane>
                    <div className="rn-pd-thumbnail" >
                        <img style={{ borderRadius: "10px" }} src={images}></img>
                    </div>
                </TabPane>





            </div>
        </TabContainer>
    </div>
);

GalleryTab.propTypes = {
    images: PropTypes.arrayOf(ImageType),
};
export default GalleryTab;
