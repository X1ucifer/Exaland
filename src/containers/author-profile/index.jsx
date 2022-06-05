import PropTypes from "prop-types";
import clsx from "clsx";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import Product from "@components/product/layout-01";
import ProductMynft from "@components/product/layout-02";
import { ProductType } from "@utils/types";
import { shuffleArray } from "@utils/methods";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router'

import {
    marketplaceAddress
} from '../../../config'

import NFTMarketplace from '../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

const AuthorProfileArea = ({ className, data }) => {
    const onSaleProducts = shuffleArray(data.products).slice(0, 10);
    const ownedProducts = shuffleArray(data.products).slice(0, 10);
    const createdProducts = shuffleArray(data.products).slice(0, 10);
    const likedProducts = shuffleArray(data.products).slice(0, 10);

    const [nfts, setNfts] = useState([])
    const [listednfts, setListedNfts] = useState([])
    const [onsalenfts, setSaleNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const router = useRouter()

    async function loadNFTs() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        const data = await marketplaceContract.fetchMyNFTs()

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenURI)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                tokenURI
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')
        console.log("mynft", nfts)
    }
    // function listNFT(nft) {
    //     console.log('nft:', nft)
    //     router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
    // }

    useEffect(() => {
        loadNFTs()
    }, [nfts.length > 0])

    async function onSaleNFTs() {
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
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            }
            return item
        }))
        setSaleNfts(items)
        setLoadingState('loaded')
    }

    useEffect(() => {
        onSaleNFTs()
    }, [])

    async function createdNFTs() {
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        const data = await contract.fetchItemsListed()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
            }
            return item
        }))

        setListedNfts(items)
        setLoadingState('loaded')
    }

    useEffect(() => {
        createdNFTs()
    }, [])


    return (
        <div className={clsx("rn-authore-profile-area", className)}>
            <TabContainer defaultActiveKey="nav-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-wrapper-one">
                                <nav className="tab-button-one">
                                    <Nav
                                        className="nav nav-tabs"
                                        id="nav-tab"
                                        role="tablist"
                                    >
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-home"
                                        >
                                            On Sale
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-profile"
                                        >
                                            Owned
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-contact"
                                        >
                                            Created
                                        </Nav.Link>
                                        <Nav.Link
                                            as="button"
                                            eventKey="nav-liked"
                                        >
                                            Liked
                                        </Nav.Link>
                                    </Nav>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <TabContent className="tab-content rn-bid-content">
                        <TabPane className="row d-flex g-5" eventKey="nav-home">
                            {onsalenfts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    {loadingState === 'loaded' && !nfts.length ?
                                        <p>No NFTs listed</p> :
                                        <Product
                                            overlay
                                            placeBid="ssa"
                                            title={prod.name}
                                            id={prod.tokenId}
                                            auction_date="12 June"
                                            latestBid="sdsd"
                                            price={prod.price}
                                            likeCount="1"
                                            tokenURI={prod.tokenURI}
                                            image={prod.image}
                                            authors={prod.seller}
                                            bitCount="0"
                                        />
                                    }

                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-profile"
                        >
                            {nfts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    {loadingState === 'loaded' && !nfts.length ?
                                        <p>No NFTs owned</p> :
                                        <ProductMynft
                                            overlay
                                            placeBid="ssa"
                                            title={prod.name}
                                            id={prod.tokenId}
                                            auction_date="12 June"
                                            latestBid="sdsd"
                                            price={prod.price}
                                            likeCount="1"
                                            tokenURI={prod.tokenURI}
                                            image={prod.image}
                                            authors={prod.seller}
                                            bitCount="0"
                                        />

                                    }

                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-contact"
                        >
                            {listednfts?.map((prod) => (
                                <div
                                    key={prod.id}
                                    className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
                                >
                                    {loadingState === 'loaded' && !nfts.length ?
                                        <p>No NFTs listed</p> :
                                        <Product
                                            overlay
                                            placeBid="ssa"
                                            title={prod.name}
                                            id={prod.tokenId}
                                            auction_date="12 June"
                                            latestBid="sdsd"
                                            price={prod.price}
                                            likeCount="1"
                                            tokenURI={prod.tokenURI}
                                            image={prod.image}
                                            authors={prod.seller}
                                            bitCount="0"
                                        />
                                    }
                                </div>
                            ))}
                        </TabPane>
                        <TabPane
                            className="row g-5 d-flex"
                            eventKey="nav-liked"
                        >
                            <p className="text-center">Currently Unavailable</p>
                        </TabPane>
                    </TabContent>
                </div>
            </TabContainer>
        </div>
    );
};

AuthorProfileArea.propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
        products: PropTypes.arrayOf(ProductType),
    }),
};
export default AuthorProfileArea;
