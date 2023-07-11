import React, {useContext, useEffect, useRef, useState} from "react";
import Sidebar from "./Sidebar";
import "../styles/Settings.css";
import {Button, Form, Input, Collapse, theme, ConfigProvider} from "antd";
import {
    countryValidator,
    emailValidator,
    firstNameValidator,
    lastNameValidator,
    passwordValidator,
} from "../utils/validation";
import DarkModeItem from "../images/dark-mode.svg";
import SidebarContext from "../contexts/SidebarContext";


const Settings = () => {
    const contextData = useContext(SidebarContext);
    const [sidebarWidth, setSidebarWidth] = useState(contextData);
    const contentWidth = `calc(100% - ${sidebarWidth}em)`;
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');
    const [passwordForm] = Form.useForm();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const { Panel } = Collapse;

    const handlePanelClose = () => {
        setIsPanelOpen(false);
        passwordForm.resetFields();
    };

    const handlePanelOpen = () => {
        setIsPanelOpen(true);
    };

    useEffect(() => {
        localStorage.setItem('isDarkMode', String(isDarkMode));
    }, [isDarkMode]);

    const updateSidebarWidth = (newWidth) => {
        setSidebarWidth(newWidth);
    };

    function passwordMatchValidator(rule, value, callback) {
        if (value && value !== passwordForm.getFieldValue('repeat-password')) {
            callback("Passwords don't match");
        } else {
            callback();
        }
    }

    function repeatPasswordMatchValidator(rule, value, callback) {
        if (value && value !== passwordForm.getFieldValue('password')) {
            callback("Passwords don't match");
        } else {
            callback();
        }
    }

    return (
        <div className={`settings ${isDarkMode ? 'dark' : ''}`}>
            <Sidebar isDarkMode={isDarkMode} updateSidebarWidth={updateSidebarWidth}/>
            <div className="settings-content" style={{ width: contentWidth, paddingLeft: `${sidebarWidth + 1}em` }}>
                <div className={`settings-header ${isDarkMode ? 'dark' : ''}`}>
                    Account Settings
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
                    <ConfigProvider
                        theme={{
                            token: {
                                colorBgContainer: isDarkMode ? '#444' : '#fff',
                                colorText: isDarkMode ? '#fff' : 'black',
                            },
                        }}>
                    <Collapse className="settings-collapse" activeKey={isPanelOpen ? '1' : null} onChange={isPanelOpen ? handlePanelClose : handlePanelOpen}>
                        <Panel className="settings-password-panel" header="Change Password" key="1">
                            <Form form={passwordForm}>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Password</span>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Please enter your password' },
                                    { validator: passwordValidator },
                                    { validator: passwordMatchValidator },
                                ]}
                            >
                                <Input size="large"
                                       className={`settings-input-panel ${isDarkMode ? 'dark' : ''}`} placeholder="Password" />
                            </Form.Item>
                            <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Repeat Password</span>
                            <Form.Item
                                name="repeat-password"
                                rules={[
                                    { required: true, message: 'Please repeat your password' },
                                    { validator: repeatPasswordMatchValidator },
                                ]}
                            >
                                <Input  size="large"
                                       className={`settings-input-panel ${isDarkMode ? 'dark' : ''}`} placeholder="Repeat password" />
                            </Form.Item>
                            <div className="settings-button-wrapper-panel">
                                <Button type="primary" htmlType="submit" className={`card-add-btn settings-btn-panel ${isDarkMode ? 'dark' : ''}`}>
                                    Change Password
                                </Button>
                                <Button type="primary" htmlType="reset" className={`card-add-btn settings-btn-panel ${isDarkMode ? 'dark' : ''}`}>
                                    Cancel
                                </Button>
                            </div>
                            </Form>
                        </Panel>
                    </Collapse>
                    </ConfigProvider>
                </div>
            </div>
            <img src={DarkModeItem} onClick={() => setIsDarkMode(prevState => !prevState)}
                 alt="dark-mode" className="home-page-icon-mode" />
        </div>
    );
};

export default Settings;