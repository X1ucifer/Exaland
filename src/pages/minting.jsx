import { useState, useContext, useEffect } from "react";
import { Context } from "../context";
import { toast } from "react-toastify";
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {
    marketplaceAddress
} from '../../config'

import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'



function Minting() {

    const router = useRouter();

    const {
        state: { image },
    } = useContext(Context);

    useEffect(() => {
        if (image !== null);

        console.log("image", image)
    }, [image]);

    const [loading, setLoading] = useState(false);
    const [nfts, setNfts] = useState([])


    useEffect(() => {
        loadNFTs()
    }, [])


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
        // setLoadingState('loaded')

        console.log("mint", nfts)


    }


    const db = async () => {

        const items = await Promise.all(nfts.map(async i => {

            try {

                const { data } = await axios.post(
                    `/api/add`, {
                    tokenId: i.tokenId,
                    price: i.price.toString(),
                    description: i.description.toString(),
                    name: i.name.toString(),
                    image: i.image,
                    Image_cover: image,
                    date: "22 june 2022",
                    author_name: "akhil",
                    owner: i.owner,
                    seller: i.seller,
                    walletaddress: i.seller
                },


                );

            } catch (err) {
                console.log(err);
                toast.dark("Minted")

            }


            return i.price.toString()
        }))

        console.log("db", items)
        router.push("/")


    }





    return (
        <>

            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "100px"
            }} className="mt--100 ">

                <div className="spinner-border"></div>
                {/* <div className="">Minting...</div> */}

                <button onClick={db}>Mint NFT</button>
            </div>

        </>
    )
}

export default Minting