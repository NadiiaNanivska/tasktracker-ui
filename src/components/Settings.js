import React, {useContext, useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import "../styles/Settings.css";
import {Button, Form, Input} from "antd";
import {
    countryValidator,
    emailValidator,
    firstNameValidator,
    lastNameValidator,
} from "../utils/validation";
import DarkModeItem from "../images/dark-mode.svg";
import SidebarContext from "../contexts/SidebarContext";
import PasswordCollapse from "./PasswordCollapse";
import ChangePhotoPopover from "./ChangePhotoPopover";


const Settings = () => {
    const contextData = useContext(SidebarContext);
    const [sidebarWidth, setSidebarWidth] = useState(contextData);
    const contentWidth = `calc(100% - ${sidebarWidth}em)`;
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        localStorage.setItem('isDarkMode', String(isDarkMode));
    }, [isDarkMode]);

    const updateSidebarWidth = (newWidth) => {
        setSidebarWidth(newWidth);
    };

    function handlePhotoChange(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoURL = e.target.result;
                setSelectedPhoto(photoURL);
            };
            reader.readAsDataURL(file);
        } else if(file && !file.type.startsWith('image/')){
            alert('Будь ласка, виберіть зображення');
        }
    }

    function handleDeletePhoto() {
        setSelectedPhoto(null);
    }

    return (
        <div className={`settings ${isDarkMode ? 'dark' : ''}`}>
            <Sidebar isDarkMode={isDarkMode} updateSidebarWidth={updateSidebarWidth}/>
            <div className="settings-content" style={{ width: contentWidth, paddingLeft: `${sidebarWidth + 1}em` }}>
                <div className={`settings-header ${isDarkMode ? 'dark' : ''}`}>
                    Account Settings
                </div>
                <div className="settings-user-img-block">
                <span className={`settings-right-side-text ${isDarkMode ? 'dark' : ''}`}>Your avatar:</span>
                <div className="file-input-wrapper">
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                    {selectedPhoto ? (
                        <img src={selectedPhoto} alt="selected" className="settings-selected-photo" />
                    ) : (
                        <span className={`settings-photo-placeholder-text ${isDarkMode ? 'dark' : ''}`}>Choose photo</span>
                    )}
                </div>
                {selectedPhoto && <ChangePhotoPopover handleDeletePhoto={handleDeletePhoto} isDarkMode={isDarkMode}/>}
                </div>
                <div className="settings-fields">
                    <Form className="settings-form">
                        <div className="settings-form-parts">
                        <div className="settings-form-part">
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>First name</span>
                        <Form.Item
                            name="first-name"
                            rules={[
                                { required: true, message: 'Please enter your first name' },
                                { ...firstNameValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="First Name*" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Last name</span>
                        <Form.Item
                            name="last-name"
                            rules={[
                                { required: true, message: 'Please enter your last name' },
                                { ...lastNameValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Last Name*" />
                        </Form.Item>
                        </div>
                        <div className="settings-form-part">
                          <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Email</span>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { ...emailValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`}  placeholder="Email*" />
                        </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Country</span>
                        <Form.Item
                            name="country"
                            rules={[
                                { required: true, message: 'Please enter your country' },
                                { ...countryValidator },
                            ]}
                        >
                            <Input size="large" className={`settings-input ${isDarkMode ? 'dark' : ''}`} placeholder="Country" />
                        </Form.Item>
                        </div>
                        </div>
                        <div className="settings-button-wrapper">
                            <Button type="primary" htmlType="submit" className={`card-add-btn settings-btn ${isDarkMode ? 'dark' : ''}`}>
                                Save changes
                            </Button>
                            <Button type="primary" htmlType="reset" className={`card-add-btn settings-btn ${isDarkMode ? 'dark' : ''}`}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                    <PasswordCollapse isDarkMode={isDarkMode}/>
                </div>
            </div>
            <div className="settings-right-side">
                <img src={DarkModeItem} onClick={() => setIsDarkMode(prevState => !prevState)}
                     alt="dark-mode" className="home-page-icon-mode" />
            </div>
        </div>
    );
};

export default Settings;