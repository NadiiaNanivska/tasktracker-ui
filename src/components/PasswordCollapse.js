import React, {useEffect, useState} from "react";
import "../styles/Settings.css";
import {Button, Form, Input, Collapse, ConfigProvider, message} from "antd";
import { passwordValidator} from "../utils/validation";
import {changePasswordRequest} from "../utils/userRequests";

const PasswordCollapse = ({isDarkMode}) => {
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

    function repeatPasswordMatchValidator(rule, value, callback) {
        if (value && value !== passwordForm.getFieldValue('password')) {
            callback("Passwords don't match");
        } else {
            callback();
        }
    }

    const handleChangePassword = async (values) => {
        try {
            const { password, 'new-password': newPassword } = values;
            await changePasswordRequest({
                password,
                newPassword,
            });

            message.success("You successfully updated your password!");
        } catch (error) {
            message.error("Please enter correct data!");
        }
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: isDarkMode ? '#444' : '#fff',
                    colorText: isDarkMode ? '#fff' : 'black',
                },
            }}>
            <Collapse className="settings-collapse" activeKey={isPanelOpen ? '1' : null} onChange={isPanelOpen ? handlePanelClose : handlePanelOpen}>
                <Panel className="settings-password-panel" header="Change Password" key="1">
                    <Form form={passwordForm} onFinish={handleChangePassword}>
                        <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>Password</span>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please enter your password' },
                                { validator: passwordValidator },
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
                        <span className={`settings-input-text ${isDarkMode ? 'dark' : ''}`}>New Password</span>
                        <Form.Item
                            name="new-password"
                            rules={[
                                { required: true, message: 'Please enter new password' },
                                { validator: passwordValidator },
                            ]}
                        >
                            <Input  size="large"
                                    className={`settings-input-panel ${isDarkMode ? 'dark' : ''}`} placeholder="New password" />
                        </Form.Item>
                        <div className="settings-button-wrapper-panel">
                            <Button type="primary" htmlType="submit" className={`settings-btn-panel ${isDarkMode ? 'dark' : ''}`}>
                                Change Password
                            </Button>
                            <Button type="primary" htmlType="reset" className={`settings-btn-panel ${isDarkMode ? 'dark' : ''}`}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Panel>
            </Collapse>
        </ConfigProvider>
    );
};

export default PasswordCollapse;