/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";


const EditProfileImage = ({ profile_image, setProfileImg, cover_image, setCoverImg, profiledisplay, setDisplayProfile, coverdisplay, setDisplayCover }) => {

    const [loading, setLoading] = useState(false);

    const profileChange = async (e) => {


        let file = e.target.files[0];
        setDisplayProfile(URL.createObjectURL(e.target.files[0]));

        const videoData = new FormData();
        videoData.append("videoData", file);
        // resize
        // Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
        try {
            let { data } = await axios.post(`/api/v1/image_upload`,
                videoData,
            );
            console.log("IMAGE UPLOADED", data);
            // set image in the state
            setProfileImg(data);


            toast("Image uploaded");
        } catch (err) {
            console.log(err);

            toast("Image upload failed");
        }



        // if (e.target.files && e.target.files.length > 0) {

        //     console.log("9090", e.target.files[0])
        // }
    };

    const CoverChange = async (e) => {


        let file = e.target.files[0];
        setDisplayCover(URL.createObjectURL(e.target.files[0]));

        const videoData = new FormData();
        videoData.append("videoData", file);
        // resize
        // Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
        try {
            let { data } = await axios.post(`/api/v1/image_upload`,
                videoData,
            );
            console.log("IMAGE UPLOADED", data);
            // set image in the state
            setCoverImg(data);


            toast("Cover Image uploaded");
        } catch (err) {
            console.log(err);

            toast("Image upload failed");
        }
        // if (e.target.files && e.target.files.length > 0) {
        //     setDisplayCover(URL.createObjectURL(e.target.files[0]));
        //     console.log("9090", e.target.files[0])
        // }
    };

    return (
        <div className="nuron-information">
            <div className="profile-change row g-5">
                <div className="profile-left col-lg-4">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Profile Picture</h6>
                        <div className="img-wrap">
                            {profiledisplay ? (
                                <img
                                    src={
                                        profile_image


                                    }
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : (
                                <Image
                                    id="rbtinput1"
                                    src="/images/profile/profile-01.jpg"
                                    alt="Profile-NFT"
                                    layout="fill"
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="profile"
                                id="fatima"
                                type="file"
                                onChange={profileChange}
                            />
                            <label htmlFor="fatima" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Profile
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="profile-left right col-lg-8">
                    <div className="profile-image mb--30">
                        <h6 className="title">Change Your Cover Photo</h6>
                        <div className="img-wrap">
                            {coverdisplay ? (
                                <img
                                    src={
                                        cover_image
                                    }
                                    alt=""
                                    data-black-overlay="6"
                                />
                            ) : (
                                <Image
                                    id="rbtinput2"
                                    src="/images/profile/cover-01.jpg"
                                    alt="Profile-NFT"
                                    layout="fill"
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-area">
                        <div className="brows-file-wrapper">
                            <input
                                name="cover"
                                id="nipa"
                                type="file"
                                onChange={CoverChange}
                            />
                            <label htmlFor="nipa" title="No File Choosen">
                                <span className="text-center color-white">
                                    Upload Cover
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfileImage;
