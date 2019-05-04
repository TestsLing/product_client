/**
 *  Created By 憧憬
 */

import inter from './net/inter/product';
import React,{ Component } from 'react';
import { Card, List, Modal } from 'antd';
import Ellipsis from './component/Ellipsis/index';
import 'antd/dist/antd.css';
import AvatarList from './component/AvatarList';
import ProductDetail from './component/Profile';
import styles from './style/Projects.less';



class Index extends Component{

    constructor(props){
        super(props);

        this.state = {
            visible: false,
            list: [],
        };
    }

    componentDidMount() {

        let param = {
            resource_guid: '8b40214b83ee4050b7b2da630739a30e'
        };

        inter.list(param).then((res)=>{
            if (res.success) {
                this.setState({
                    list: res.result.productList
                });
            }
        });
    }

    showModal = (item) => {
        this.setState({
            visible: true,
            guid: item.guid
        });
    }


    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    /**
     * 取消详情
     * @param e
     */
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }



    render() {

        const { list } = this.state;

        return (
            <div>
                <List
                    rowKey="id"
                    loading={false}
                    grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item onClick={() => this.showModal(item)}>
                            <Card
                                className={styles.card}
                                hoverable
                                cover={<img alt={item.title} src={item.thumb} />}
                            >
                                <Card.Meta
                                    style={{marginBottom:'10px'}}
                                    title={
                                            <a>{item.title}</a>
                                    }
                                    description={<Ellipsis lines={2}>{item.desc}</Ellipsis>}
                                />
                                <div className={styles.cardItemContent}>
                                    <span style={{color:'red',fontSize:16}}>{'$'+item.price}</span>
                                    <div className={styles.avatarList}>
                                        <AvatarList size="mini">
                                           <div style={{float:'right'}}>点击次数：{item.click_number || 1}</div>
                                        </AvatarList>
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />

                <Modal
                    title="产品详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose
                    width={1500}
                    height={1000}
                >
                    <ProductDetail guid={this.state.guid}/>
                </Modal>
            </div>
        );
    }

}


export default Index;