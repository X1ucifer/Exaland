import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductDetailsArea from "@containers/product-details";
import ProductArea from "@containers/product/layout-03";
import { shuffleArray } from "@utils/methods";
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import {
    marketplaceAddress
} from '../../../config'
import NFTMarketplace from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import { useRouter } from 'next/router'


// demo data
import productData from "../../data/products.json";

const ProductDetails = () => {

    const router = useRouter();

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const [update, setUpdate] = useState([]);



    async function loadNFTs() {
        /* create a generic provider and query for unsold market items */
        const provider = new ethers.providers.JsonRpcProvider()
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, provider)
        const data = await contract.fetchMarketItems()

        /*
        *  map over items returned from smart contract and format 
        *  them as well as fetch their token metadata
        */
        const items = await Promise.all(data.map(async i => {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                Image_cover: meta.data.Image_cover,
                date: meta.data.date,
                author_name: meta.data.author_name,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
    }

    useEffect(() => {
        loadNFTs()
    }, [])

    const find = () => {
        setUpdate(nfts.find((value) => value.tokenId === Number(router.query.id)))
    }

    useEffect(() => {
        find();


    }, [loadNFTs])

    console.log("768", update)
    console.log("nft", nfts)

    return (
        <Wrapper>
            <SEO pageTitle="Product Details" />
            <Header />
            <main id="main-content">
                {/* <Breadcrumb
                pageTitle="Product Details"
                currentPage="Product Details"
            /> */}
                {update &&
                    <ProductDetailsArea data={update && update} />
                }
                {/* <ProductArea
                    products={update}
                />
                <ProductArea
                    products={update}
                /> */}
            </main>
            <Footer />
        </Wrapper>
    )
};





export default ProductDetails;
