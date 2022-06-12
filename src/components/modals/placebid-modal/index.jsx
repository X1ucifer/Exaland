import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "@ui/button";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import {
    marketplaceAddress
} from '../../../../config'
import NFTMarketplace from '../../../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import { useRouter } from "next/router";

const PlaceBidModal = ({ show, handleModal, data }) => {

    const router = useRouter();

    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNFTs()
    }, [nfts.length > 0])
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

    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)

        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
        const transaction = await contract.createMarketSale(nft.tokenId, {
            value: price
        })
        await transaction.wait()
        loadNFTs()
        handleModal(false)
        router.push("/author")
        console.log("place", nft)
    }

    return (
        <Modal
            className="rn-popup-modal placebid-modal-wrapper"
            show={show}
            onHide={handleModal}
            centered
        >
            {show && (
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleModal}
                >
                    <i className="feather-x" />
                </button>
            )}
            <Modal.Header>
                <h3 className="modal-title">Place a bid</h3>
            </Modal.Header>
            <Modal.Body>
                <p>You are about to purchase This Product Form ExaLand</p>
                <div className="placebid-form-box">
                    <h5 className="title">Your bid</h5>
                    <div className="bid-content">
                        <div className="bid-content-top">
                            {data &&
                                <div className="bid-content-left">

                                    <input id="value" type="text" name="value" defaultValue={data.price} disabled />
                                    <span>ETH</span>

                                </div>
                            }
                        </div>

                        <div className="bid-content-mid">
                            <div className="bid-content-left">
                                <span>Your Balance</span>
                                <span>Service fee</span>
                                <span>Total bid amount</span>
                            </div>
                            <div className="bid-content-right">
                                <span>9578 wETH</span>
                                <span>10 wETH</span>
                                <span>9588 wETH</span>
                            </div>
                        </div>
                    </div>
                    <div className="bit-continue-button">
                        <Button size="medium" fullwidth onClick={() => buyNft(data)}>
                            Place a bid
                        </Button>
                        <Button
                            color="primary-alta"
                            size="medium"
                            className="mt--10"
                            onClick={handleModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
};

PlaceBidModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired,
};
export default PlaceBidModal;
