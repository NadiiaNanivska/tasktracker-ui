import React, {useContext, useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import "../styles/Settings.css";
import {Button, Form, Input, message} from "antd";
import DarkModeItem from "../images/dark-mode.svg";
import SidebarContext from "../contexts/SidebarContext";
import PasswordCollapse from "./PasswordCollapse";
import ChangePhotoPopover from "./ChangePhotoPopover";
import fieldConfig from '../data/fieldConfig.json';
import {useNavigate} from "react-router-dom";
import {checkTokenValidity} from "../utils/validation";
import {getUserRequest, updateUserData} from "../utils/userRequests";


const Settings = () => {
    const contextData = useContext(SidebarContext);
    const [sidebarWidth, setSidebarWidth] = useState(contextData);
    const contentWidth = `calc(100% - ${sidebarWidth}em)`;
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const history = useNavigate();
    const [formData, setFormData] = useState({});
    const [form] = Form.useForm();

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
            alert('Please choose an image');
        }
    }

    function handleDeletePhoto() {
        setSelectedPhoto(null);
    }

    useEffect( () => {
        const fetchUserData = async () => {
            const userData = await getUserRequest();
            if (userData) {
                setFormData(userData);
            }
        };

        fetchUserData();
    }, []);

    const formFields = fieldConfig.map(field => (
        <div key={field.name}>
            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>{field.label}</span>
            <Form.Item
                name={field.name}
                rules={field.rules}
            >
                <Input
                    size="large"
                    className={`settings-input ${isDarkMode ? 'dark' : ''}`}
                    placeholder={field.label}
                />
            </Form.Item>
        </div>
    ));

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
        });
    }, [formData]);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        checkTokenValidity(storedToken, history);
    }, []);

    const handleSubmit = async () => {
        try {
            const userId = localStorage.getItem('userId');
            await updateUserData(userId, formData);
            message.success("You successfully updated yor profile!")
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

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
                    <Form className="settings-form" form={form} onFinish={handleSubmit}>
                        <div className="settings-form-parts">
                            {formFields}
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