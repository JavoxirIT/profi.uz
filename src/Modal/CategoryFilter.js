import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Drawer, Form, Radio, Space, Typography} from 'antd';
import css from "../styles/Index.module.css";
import {postFetch} from "../request/Fetch";
import axios from "axios";
import {TbCategory} from "react-icons/tb";

const {Text, Title} = Typography;
const apiUrl = process.env.NEXT_PUBLIC_API_URL

function CategoryFilter({setUser, vil, isSpesial, onFinish}) {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        form.submit()
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" size="large" onClick={showDrawer}>
                <TbCategory style={{fontSize: 20}}/>
            </Button>
            <Drawer
                title="Saralash"
                placement={"top"}
                height={"100%"}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Qaytish</Button>
                        <Button type="primary" onClick={onClose}>
                           Saralash
                        </Button>
                    </Space>
                }
            >
                <Form form={form} onFinish={onFinish} initialValues={{
                    region: [1]
                }}>
                    <div className={css.indexCheckBox1}>
                        <Text className={css.indexCheckTitle}>VILOYATLAR</Text>
                        <Form.Item name="region">
                            <Checkbox.Group options={vil}/>
                        </Form.Item>
                    </div>
                    <div className={css.indexCheckBox2}>
                        <Text className={css.indexCheckTitle}>MUTTAXASISLIKLAR</Text>
                        <Form.Item name="special">
                            <Checkbox.Group options={isSpesial}/>
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        </>
    );
}

export default CategoryFilter;