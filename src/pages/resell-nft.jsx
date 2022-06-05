import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import axios from 'axios'
import Web3Modal from 'web3modal'
import clsx from "clsx";
import {
    marketplaceAddress
} from '../../config'

import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import Button from "@ui/button";
import Header from '@layout/header/header-01'
import Footer from '@layout/footer/footer-01'


export default function ResellNFT() {
    const [formInput, updateFormInput] = useState({ price: '', image: '' })
    const router = useRouter()
    const { id, tokenURI } = router.query
    const { image, price } = formInput

    useEffect(() => {
        fetchNFT()
    }, [id])

    async function fetchNFT() {
        if (!tokenURI) return
        const meta = await axios.get(tokenURI)
        updateFormInput(state => ({ ...state, image: meta.data.image }))
        console.log("meta", meta)
    }

    async function listNFTForSale() {
        if (!price) return
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        let listingPrice = await contract.getListingPrice()

        listingPrice = listingPrice.toString()
        let transaction = await contract.resellToken(id, priceFormatted, { value: listingPrice })
        await transaction.wait()

        router.push('/')
    }

    return (


        <>
            <Header />

            {/* <div className="flex justify-center">
                <div className="w-1/2 flex flex-col pb-12">
                    <input
                        placeholder="Asset Price in Eth"
                        className="mt-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    {
                        image && (
                            <video
                                muted
                                loop
                                autoPlay
                                src={image}
                                // alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        )
                    }
                    <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                        List NFT
                    </button>
                </div>
            </div> */}
            <div
                className={clsx(
                    "create-area",
                    // space === 1 && "rn-section-gapTop",

                )}
            >
                <form action="#">
                    <div className="container">
                        <div className="row mt--100">
                            {/* <div className="col-lg-1 offset-1 ml_md--0 ml_sm--0">

                                <div className="mt--100 ">
                                    {
                                        image && (
                                            <video
                                                muted
                                                loop
                                                autoPlay
                                                src={image}
                                                // alt={image?.alt || "NFT_portfolio"}
                                                width={533}
                                                height={533}
                                            />
                                        )
                                    }
                                </div>
                            </div> */}
                            <div className="col-lg-6">
                                <div className="form-wrapper-one">
                                    <div className="row">




                                        <div className="col-md-12">
                                            {
                                                image && (
                                                    <video
                                                        muted
                                                        loop
                                                        autoPlay
                                                        controls
                                                        src={image}
                                                        // alt={image?.alt || "NFT_portfolio"}
                                                        width={533}
                                                    // height={533}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mt--50 ml_md--0 ml_sm--0">
                                <div className="form-wrapper-one">
                                    <div className="row">




                                        <div className="col-md-12">
                                            <div className="input-box pb--20">
                                                <label
                                                    htmlFor="price"
                                                    className="form-label"
                                                >
                                                    Item Price in ETH
                                                </label>
                                                <input
                                                    onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                                                    id="price"
                                                    placeholder="e. g. `20ETH`"

                                                />
                                                {/* {errors.price && (
                                                    <ErrorText>
                                                        {errors.price?.message}
                                                    </ErrorText>
                                                )} */}
                                            </div>
                                        </div>






                                        <div className="col-md-12">
                                            <div className="input-box">
                                                <Button onClick={listNFTForSale} fullwidth>
                                                    RESALE | LIST ITEM
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )

}