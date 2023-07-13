import "../styles/Settings.css";
import {Button, Space, Popover, ConfigProvider, theme} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


const ChangePhotoPopover = ({handleDeletePhoto, isDarkMode}) => {

    const content = (
        <Space direction="vertical">
            <Button type="text" onClick={() => document.querySelector('.file-input-wrapper input[type="file"]').click()}>
                <Space>
                    <EditOutlined />
                    <span>Change</span>
                </Space>
            </Button>
            <Button type="text" onClick={handleDeletePhoto}>
                <Space>
                    <DeleteOutlined />
                    <span>Delete</span>
                </Space>
            </Button>
        </Space>
    );

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: isDarkMode ? '#555' : '#fff',
                    colorText: isDarkMode ? '#fff' : 'black',
                },
                algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}>
        <Popover content={content} trigger="click">
            <Button>Change</Button>
        </Popover>
        </ConfigProvider>
    );
};

export default ChangePhotoPopover;