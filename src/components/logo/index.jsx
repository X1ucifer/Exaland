import Image from "next/image";
import Anchor from "@ui/anchor";
import PropTypes from "prop-types";
import clsx from "clsx";

const Logo = ({ className, logo }) => (
    <div style={{display:"flex",alignItems:"center"}} className={clsx("logo-thumbnail logo-custom-css", className)}>
        {logo?.[0]?.src && (
            <Anchor className="logo-light" path="/">
                <Image
                    src={logo[0].src}
                    alt={logo[0]?.alt || "ExaLand"}
                    width={106}
                    height={35}
                />
                
            </Anchor>
           
        )}
        {logo?.[1]?.src && (
            <Anchor className="logo-dark" path="/">
                <Image
                    src={logo[1].src}
                    alt={logo[1]?.alt || "ExaLand"}
                    width={106}
                    height={35}
                />
                  
            </Anchor>
        )}
        <p>E<span style={{color:"#f21d80fb",fontWeight:"bold"}}>X</span>ALAND</p>
    </div>

);

Logo.propTypes = {
    className: PropTypes.string,
    logo: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string,
        })
    ),
};

export default Logo;
