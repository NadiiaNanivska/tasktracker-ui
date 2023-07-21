import React from "react";
import { ConfigProvider, theme, Modal, Col, Row, Select, TimePicker, DatePicker, Input, Button, Popconfirm, Form } from "antd";
import {addEvent} from "../utils/eventsRequests";

const { Option } = Select;

const AddEvent = ({ newEvent, setNewEvent, isModalVisible, setIsModalVisible, handleCreateEvent, isDarkMode }) => {
    const format = 'HH:mm';

    const handleSave = () => {
        form.validateFields().then(values => {
            const { time, date, content, type } = newEvent;
            const formattedTime = time.format("HH:mm:ss");
            const formattedDate = date.format("YYYY-MM-DD");

            addEvent(type, formattedTime, formattedDate, content);
            handleCreateEvent();
            form.resetFields();
        }).catch(error => {
        });
    };

    const [form] = Form.useForm();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'forestgreen',
                    colorBgContainer: isDarkMode ? '#444' : '#fff',
                    colorText: isDarkMode ? '#cccccc' : 'black',
                    controlItemBgActive: '#00410075',
                    controlItemBgHover: '#0041003c',
                    colorLink: 'forestgreen',
                    colorLinkHover: '#00410075',
                    colorLinkActive: '#00410075'
                },
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            <Modal
                title="Add Event"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSave}
                footer={[
                    <Popconfirm
                        title="Cancel changes"
                        description="Are you sure you want to cancel changes?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => { setIsModalVisible(false); form.resetFields(); }}
                    >
                        <Button key="cancel">
                            Cancel
                        </Button>
                    </Popconfirm>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                <Form form={form}>
                    <Row>
                        <Col span={10}>
                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a type",
                                    },
                                ]}
                            >
                                <Select
                                    className=''
                                    value={newEvent?.type}
                                    onChange={(value) => setNewEvent({ ...newEvent, type: value })}
                                    placeholder="Select Type"
                                >
                                    <Option value="warning">Minor</Option>
                                    <Option value="success">Important</Option>
                                    <Option value="error">Urgent</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Time"
                                name="time"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a time",
                                    },
                                ]}
                            >
                                <TimePicker format={format}
                                    value={newEvent?.time}
                                    onChange={(time) => setNewEvent({ ...newEvent, time })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Date"
                                name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a date",
                                    },
                                ]}
                            >
                                <DatePicker
                                    value={newEvent?.date}
                                    onChange={(date) => setNewEvent({ ...newEvent, date })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Content"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the event content",
                                    },
                                ]}
                            >
                                <Input
                                    value={newEvent?.content}
                                    onChange={(e) => setNewEvent({ ...newEvent, content: e.target.value })}
                                    placeholder="Event Content"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default AddEvent;
