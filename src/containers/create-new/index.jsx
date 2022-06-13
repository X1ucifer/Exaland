/* eslint-disable @next/next/no-img-element */
import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import Button from "@ui/button";
import ProductModal from "@components/modals/product-modal";
import ErrorText from "@ui/error-text";
import { toast } from "react-toastify";
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {
    marketplaceAddress
} from '../../../config'

import NFTMarketplace from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const CreateNewArea = ({ className, space }) => {


    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [Image_cover, setImageCover] = useState("");
    const [hasImageError, setHasImageError] = useState(false);
    const [previewData, setPreviewData] = useState({});
    const [nfts, setNfts] = useState([])

    const [fileUrl, setFileUrl] = useState(null)
    const [date, setDate] = useState("")
    const [author_name, setAuthorName] = useState("")
    const [loading, setLoading] = useState(false);

    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    const handleImage = (e) => {
        let file1 = e.target.files[0];
        console.log("4sdsd54", e.target.files[0])
        setSelectedImage(e.target.files[0]);

        setLoading(true);



        // resize
        Resizer.imageFileResizer(file1, 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post(`/api/image_upload`, {
                    image: uri,
                });
                console.log("IMAGE UPLOADED", data.Location);

                setImageCover(data.Location)

                // setEditPage(false)
                setLoading(false);

            } catch (err) {
                console.log(err);

                toast("Image uploaded");
            }
        });

    };

    console.log("image", Image_cover)

    async function onChange(e) {

        // setSelectedImage(e.target.files[0]);
        setSelectedVideo(e.target.files[0]);

        //aws


        //aws

        const file = e.target.files[0]
        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }
    async function uploadToIPFS() {
        const { name, description, price } = formInput

        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, image: fileUrl, Image_cover, date, author_name
        })
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            /* after file is uploaded to IPFS, return the URL to use it in the transaction */
            console.log("ipppp", url)
            return url
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    async function listNFTForSale() {
        const url = await uploadToIPFS() //input data's
        const web3Modal = new Web3Modal()//metamask open
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        /* next, create the item */
        const price = ethers.utils.parseUnits(formInput.price, 'ether')
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        let transaction = await contract.createToken(url, price, { value: listingPrice })
        await transaction.wait()


        //list



        router.push('/')
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const notify = () => toast("Your product has submitted");
    const handleProductModal = () => {
        setShowProductModal(false);
    };

    // This function will be triggered when the file field change


    const onSubmit = (data, e) => {
        const { target } = e;
        const submitBtn =
            target.localName === "span" ? target.parentElement : target;
        const isPreviewBtn = submitBtn.dataset?.btn;
        setHasImageError(!selectedImage);
        if (isPreviewBtn && selectedImage) {
            setPreviewData({ ...data, image: Image_cover });
            setShowProductModal(true);
        }
        if (!isPreviewBtn) {
            notify();
            reset();
            setSelectedImage();
        }
    };





    return (
        <>
            <div
                className={clsx(
                    "create-area",
                    space === 1 && "rn-section-gapTop",
                    className
                )}
            >
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                                <div className="upload-area mt--30">


                                    <div className="brows-file-wrapper">
                                        <input
                                            name="file"
                                            id="file"
                                            type="file"
                                            className="inputfile"
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                            onChange={onChange}
                                        />

                                        {selectedVideo && (
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedVideo
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}


                                        <label
                                            htmlFor="file"
                                            title="No File Choosen"
                                        >
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Choose a File
                                            </span>
                                            <p className="text-center mt--10">
                                                MP4 or MP3.{" "}
                                                <br /> Max 1Gb.
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedImage && (
                                        <ErrorText>Video is required</ErrorText>
                                    )}
                                </div>

                                <div className="upload-area mt--30">


                                    <div className="brows-file-wrapper">



                                        {selectedImage && (
                                            <img
                                                id="createfileImage"
                                                src={URL.createObjectURL(
                                                    selectedImage
                                                )}
                                                alt=""
                                                data-black-overlay="6"
                                            />
                                        )}



                                        <label

                                        >
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={handleImage}
                                                accept="image/*"
                                                hidden
                                            />
                                            <i className="feather-upload" />
                                            <span className="text-center">
                                                Choose a File
                                            </span>
                                            <p className="text-center mt--10">
                                                PNG, GIF, WEBP, JPEG.{" "}
                                                <br /> Cover Photo.
                                            </p>
                                        </label>
                                    </div>
                                    {hasImageError && !selectedImage && (
                                        <ErrorText>Video is required</ErrorText>
                                    )}
                                </div>

                                <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
                                    <h5> Note: </h5>
                                    <span>
                                        {" "}
                                        Service fee : <strong>2.5%</strong>{" "}
                                    </span>{" "}
                                    <br />
                                    <span>
                                        {" "}
                                        You will receive :{" "}
                                        <strong>25.00 ETH $50,000</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="form-wrapper-one">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label"
                                                >
                                                    Product Name
                                                </label>
                                                <input
                                                    id="name"
                                                    placeholder="e. g. `Digital Awesome Game`"
                                                    {...register("name", {
                                                        required:
                                                            "Name is required",
                                                    })}
                                                    onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                                                />
                                                {errors.name && (
                                                    <ErrorText>
                                                        {errors.name?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label"
                                                >
                                                    Author Name
                                                </label>
                                                <input
                                                    id="name"
                                                    placeholder="e. g. `John Doe`"
                                                    value={author_name}
                                                    onChange={e => setAuthorName(e.target.value)}
                                                />
                                                {errors.name && (
                                                    <ErrorText>
                                                        {errors.name?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Discription"
                                                    className="form-label"
                                                >
                                                    Discription
                                                </label>
                                                <textarea
                                                    id="discription"

                                                    rows="3"
                                                    placeholder="e. g. “After purchasing the product you can get item...”"
                                                    {...register(
                                                        "discription",
                                                        {
                                                            required:
                                                                "Discription is required",
                                                        }
                                                    )}
                                                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                                                />
                                                {errors.discription && (
                                                    <ErrorText>
                                                        {
                                                            errors.discription
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Discription"
                                                    className="form-label"
                                                >
                                                    Sale Date
                                                </label>
                                                <input
                                                    id="name"
                                                    placeholder="e. g. `22 June 2022`"
                                                    value={date}
                                                    onChange={e => setDate(e.target.value)}
                                                />


                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="price"
                                                    className="form-label"
                                                >
                                                    Item Price in $
                                                </label>
                                                <input
                                                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                                                    id="price"
                                                    placeholder="e. g. `20$`"

                                                />
                                                {errors.price && (
                                                    <ErrorText>
                                                        {errors.price?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        {/* <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Size"
                                                    className="form-label"
                                                >
                                                    Size
                                                </label>
                                                <input
                                                    id="size"
                                                    placeholder="e. g. `Size`"
                                                    {...register("size", {
                                                        required:
                                                            "Size is required",
                                                    })}
                                                />
                                                {errors.size && (
                                                    <ErrorText>
                                                        {errors.size?.message}
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Propertie"
                                                    className="form-label"
                                                >
                                                    Properties
                                                </label>
                                                <input
                                                    id="propertiy"
                                                    placeholder="e. g. `Propertie`"
                                                    {...register("propertiy", {
                                                        required:
                                                            "Propertiy is required",
                                                    })}
                                                />
                                                {errors.propertiy && (
                                                    <ErrorText>
                                                        {
                                                            errors.propertiy
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="Royality"
                                                    className="form-label"
                                                >
                                                    Royality
                                                </label>
                                                <input
                                                    id="royality"
                                                    placeholder="e. g. `20%`"
                                                    {...register("royality", {
                                                        required:
                                                            "Royality is required",
                                                    })}
                                                />
                                                {errors.royality && (
                                                    <ErrorText>
                                                        {
                                                            errors.royality
                                                                ?.message
                                                        }
                                                    </ErrorText>
                                                )}
                                            </div>
                                        </div> */}



                                        <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                                            {/* <div className="col-md-12 col-xl-4"> */}
                                            <div className="input-box mb--10 mt--10">
                                                <Button
                                                    color="primary-alta"
                                                    fullwidth
                                                    type="submit"
                                                    data-btn="preview"
                                                    onClick={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    Preview
                                                </Button>
                                            </div>
                                            {/* </div> */}

                                            <div className="input-box">
                                                <Button type="submit" onClick={listNFTForSale} fullwidth>
                                                    Submit Item
                                                </Button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt--100 mt_sm--30 mt_md--30 d-block d-lg-none">
                                <h5> Note: </h5>
                                <span>
                                    {" "}
                                    Service fee : <strong>2.5%</strong>{" "}
                                </span>{" "}
                                <br />
                                <span>
                                    {" "}
                                    You will receive :{" "}
                                    <strong>25.00 ETH $50,000</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showProductModal && (
                <ProductModal
                    show={showProductModal}
                    handleModal={handleProductModal}
                    data={previewData}
                />
            )}
        </>
    );
};

CreateNewArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1]),
};

CreateNewArea.defaultProps = {
    space: 1,
};

export default CreateNewArea;
