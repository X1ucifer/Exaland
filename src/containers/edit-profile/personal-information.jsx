import Button from "@ui/button";
import NiceSelect from "@ui/nice-select";

const PersonalInformation = ({ name, setName, email, setEmail, bio, setBio, ph_no, setPhone, gender, setGender, location, setLocation, role, setRole, handleProfile }) => {

    return (
        <div className="nuron-information">
            <div className="profile-form-wrapper">
                <div className=" mb--15">
                    <div className="first-name half-wid">
                        <label htmlFor="contact-name" className="form-label">
                            Name
                        </label>
                        <input
                            name="contact-name"
                            id="contact-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                </div>
                <div className="email-area">
                    <label htmlFor="Email" className="form-label">
                        Edit Your Email
                    </label>
                    <input
                        name="email"
                        id="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="edit-bio-area mt--30">
                <label htmlFor="Discription" className="form-label">
                    Edit Your Bio
                </label>
                <textarea
                    id="Discription"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                >
                    Hello, I am Alamin, A Front-end Developer...
                </textarea>
            </div>

            <div className="input-two-wrapper mt--15">
                <div className="half-wid role-area">
                    <label htmlFor="Role" className="form-label mb--10">
                        Your Role
                    </label>
                    <input
                        name="Role"
                        id="Role"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <div className="half-wid gender">

                    <label htmlFor="Role" className="form-label mb--10">
                        Your Gender
                    </label>
                    <input
                        name="Role"
                        id="Role"
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />

                </div>
            </div>


            <div className="input-two-wrapper mt--15">
                <div className="half-wid currency">

                    <label htmlFor="Role" className="form-label mb--10">
                        Your Location
                    </label>
                    <input
                        name="Role"
                        id="Role"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                </div>
                <div className="half-wid phone-number">
                    <label htmlFor="PhoneNumber" className="form-label mb--10">
                        Phone Number
                    </label>
                    <input
                        name="contact-name"
                        id="PhoneNumber"
                        type="text"
                        value={ph_no}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="button-area save-btn-edit">
                <Button className="mr--15" color="primary-alta" size="medium">
                    Cancel
                </Button>
                <Button size="medium" onClick={handleProfile}>Save</Button>
            </div>
        </div>
    )
}

export default PersonalInformation;
