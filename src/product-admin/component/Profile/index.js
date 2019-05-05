import React, { Component } from 'react';
import {
    Button,
    Icon,
    Row,
    Col,
    Card,
    Tooltip,
    Divider,
    Radio,
} from 'antd/lib/index';
import classNames from 'classnames';
import DescriptionList from '../DescriptionList/index';
import PageHeaderWrapper from '../PageHeaderWrapper';
import styles from './style/index.less';
import inter from "../../net/inter/product";

const { Description } = DescriptionList;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}

const Extra = props => {
    const { detail } = props;

    return (
        detail.specif_keyword ?
        <Row style={{marginTop:'20px'}}>
            <div style={{marginBottom:'10px'}}>产品规格：</div>
            <RadioGroup onChange={onChange} defaultValue={detail.specif_keyword[0].id}>
                {detail.specif_keyword.map((item) => {
                    console.log(item.id)
                    return <RadioButton value={item.id} key={item.id}>{item.keyword}</RadioButton>
                })}
            </RadioGroup>
        </Row>
            : <div />
)};

const Desc = props => {
    const { detail } = props;

    return (
    <div>
        {detail.detail.market_price && (
            <div>
                <span>市场价格:</span>
                <span style={{marginLeft:'30px', fontSize:16}}>{detail.detail.market_price}</span>
            </div>
        )}

        <div>
            <span>价格:</span>
            <span style={{marginLeft:'30px', fontSize:16}}>{detail.price}</span>
        </div>


        <div>
            <span>库存:</span>
            <span style={{marginLeft:'30px', fontSize:16}}>{detail.detail.stock || 0}</span>
        </div>

        {detail.detail.reward && (
            <div>
                <span>奖励积分:</span>
                <span style={{marginLeft:'30px', fontSize:16}}>{detail.detail.reward}</span>
            </div>
        )}

        <div>
            <span>产品描述:</span>
            <span style={{marginLeft:'30px', fontSize:16}}>{detail.desc}</span>
        </div>
    </div>
)};

const operationTabList = [
    {
        key: 'attr',
        tab: '产品属性',
    },{
        key: 'tab2',
        tab: '产品test',
    },
];


class AdvancedProfile extends Component {
    state = {
        operationkey: 'attr',
        stepDirection: 'horizontal',
        detail: null,
        guid:'',
    };


    componentDidMount() {
        const { guid } = this.props;
        this.setState({
            guid,
        });

        let param = {
            guid,
        };

        inter.detail(param).then((res) => {
            if (res.success) {
                this.setState({
                    detail: res.result.detail
                });
            }
        });

    }


    onOperationTabChange = key => {
        this.setState({ operationkey: key });
    };


    render() {
        const { detail,operationkey } = this.state;

        // console.log(detail.attribute)

        const contentList = {
            attr:
                detail ?
                <div>
                    {!detail.attribute &&
                        <div>
                            <div>
                                <span>dsahdhasdha</span>
                                <span>dsahdhasdha</span>
                            </div>
                            <div>
                                <span>dsahdhasdha</span>
                                <span>dsahdhasdha</span>
                            </div>
                        </div>
                    }
                </div>
                    : <div>暂无数据</div> ,
            tab2: <p>app content</p>,
            project: <p>project content</p>,
        };


        return (

            detail ?

            <PageHeaderWrapper
                title={detail.title}
                logo={
                    <img alt="" src={detail.thumb} width={500} height={300} />
                }
                content={<Desc detail={detail}/>}
                extraContent={<Extra detail={detail}/>}
            >

                <Card
                    className={styles.tabsCard}
                    bordered={false}
                    tabList={operationTabList}
                    onTabChange={this.onOperationTabChange}
                    activeTabKey={operationkey}
                >
                    {contentList[operationkey]}
                </Card>

                <Card title="评论" style={{ marginBottom: 24 }} bordered={false}>
                    <div className={styles.noData}>
                        <Icon type="frown-o" />
                        暂无数据
                    </div>
                </Card>

            </PageHeaderWrapper>

                : <div>暂无数据</div>
        );
    }
}

export default AdvancedProfile;
