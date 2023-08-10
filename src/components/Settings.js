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
import {deletePhotoRequest, getUserRequest, updateUserData, uploadPhotoRequest} from "../utils/userRequests";


const Settings = () => {
    const contextData = useContext(SidebarContext);
    const [sidebarWidth, setSidebarWidth] = useState(contextData);
    const contentWidth = `calc(100% - ${sidebarWidth}em)`;
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const history = useNavigate();
    const [formData, setFormData] = useState({});
    const [form] = Form.useForm();

    const dataToUpdateUser = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        repeatPassword: formData.repeatPassword,
        phone: formData.phone,
        role: formData.role
    }

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
            reader.onload = async function (e) {
                const photoURL = e.target.result;
                setSelectedPhoto(photoURL);

                try {
                    await uploadPhotoRequest(photoURL);
                    message.success('Photo uploaded successfully');
                } catch (error) {
                    message.error('Failed to upload photo');
                }
            };

            reader.readAsDataURL(file);
        } else if (file && !file.type.startsWith('image/')) {
            alert('Please choose an image');
        }
    }

    async function handleDeletePhoto() {
        await deletePhotoRequest();
        setSelectedPhoto(null);
    }

    useEffect( () => {
        const fetchUserData = async () => {
            const userData = await getUserRequest();
            if (userData) {
                setFormData(userData);
                if (userData.photo) {
                    setSelectedPhoto(userData.photo);
                }
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
                    onBlur={(e) => setFormData(prevData => ({ ...prevData, [field.name]: e.target.value }))}
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
            await updateUserData(userId, dataToUpdateUser);
            message.success("You successfully updated your profile!")
        } catch (error) {
            message.error("Please enter correct data!")
        }
    };

    function handleReset() {
        form.resetFields();
        form.setFieldsValue({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
        });
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
                    <Form className="settings-form" form={form} onFinish={handleSubmit} onReset={handleReset}>
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
                    <PasswordCollapse handleChangePassword={handleSubmit} isDarkMode={isDarkMode}/>
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