import Anchor from "@ui/anchor";
import Sticky from "@ui/sticky";
import TabContent from "react-bootstrap/TabContent";
import TabContainer from "react-bootstrap/TabContainer";
import TabPane from "react-bootstrap/TabPane";
import Nav from "react-bootstrap/Nav";
import EditProfileImage from "./edit-profile-image";
import PersonalInformation from "./personal-information";
import ChangePassword from "./change-password";
import NotificationSetting from "./notification-setting";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";



const EditProfile = () => {

    const { authenticate, isAuthenticated, user } = useMoralis();

    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            setWallet(user.get("ethAddress"));
            console.log("iuiu", user.get("ethAddress"))
        }
    }, [isAuthenticated]);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [wallet_add, setWallet] = useState("");
    const [bio, setBio] = useState("");
    const [ph_no, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [cover_image, setCoverImg] = useState({});
    const [profile_image, setProfileImg] = useState({});

    const [profiledisplay, setDisplayProfile] = useState("");
    const [coverdisplay, setDisplayCover] = useState("");


    const handleProfile = async (e) => {
        e.preventDefault();
        console.table({
            name,
            email,
            bio,
            gender,
            location,
            role,
            cover_image,
            profile_image,
            wallet_add,
            ph_no
        });
        try {
            const { data } = await axios.post(
                `/api/v1/profile`, {

                name,
                email,
                bio,
                gender,
                location,
                role,
                cover_image,
                profile_image,
                wallet_add,
                ph_no

            }


            );

            router.push("/author");
            // console.log(data)
            // setValues({ ...values, title: "", content: "", video: {}, time: "" });
            setName("");
            setEmail("");
            // setTitle("");
            // setBgvideo({});
            // setWatchnow({});
            // setProgress(0);
            // setProgress1(0);
            // setUploadButtonText1("Upload video");
            // setUploadButtonText("Upload AMV video");
            // setSeries(data);
            // toast.success("Series added");
        } catch (err) {
            console.log(err);
            toast.success("Profile added ");
        }
    };


    return (
        <div className="edit-profile-area rn-section-gapTop">
            <div className="container">
                <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
                    <div className="col-12 d-flex justify-content-between mb--30 align-items-center">
                        <h4 className="title-left">Edit Your Profile</h4>
                        <Anchor path="/author" className="btn btn-primary ml--10">
                            <i className="feather-eye mr--5" /> Preview
                        </Anchor>
                    </div>
                </div>
                <TabContainer defaultActiveKey="nav-home">
                    <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <Sticky>
                                <nav className="left-nav rbt-sticky-top-adjust-five">
                                    <Nav className="nav nav-tabs">
                                        <Nav.Link eventKey="nav-home" as="button">
                                            <i className="feather-edit" />
                                            Edit Profile Image
                                        </Nav.Link>
                                        <Nav.Link eventKey="nav-homes" as="button">
                                            <i className="feather-user" />
                                            Personal Information
                                        </Nav.Link>

                                    </Nav>
                                </nav>
                            </Sticky>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12 mt_sm--30">
                            <TabContent className="tab-content-edit-wrapepr">
                                <TabPane eventKey="nav-home">
                                    <EditProfileImage setProfileImg={setProfileImg} profile_image={profile_image} setCoverImg={setCoverImg} cover_image={cover_image} profiledisplay={profiledisplay} setDisplayProfile={setDisplayProfile} coverdisplay={coverdisplay} setDisplayCover={setDisplayCover} />
                                </TabPane>
                                <TabPane eventKey="nav-homes">
                                    <PersonalInformation name={name} setName={setName} email={email} setEmail={setEmail} bio={bio} setBio={setBio} ph_no={ph_no} setPhone={setPhone} gender={gender} setGender={setGender} location={location} setLocation={setLocation} role={role} setRole={setRole} handleProfile={handleProfile} />
                                </TabPane>

                            </TabContent>
                        </div>
                    </div>
                </TabContainer>
            </div>
        </div>
    )
};

export default EditProfile;
