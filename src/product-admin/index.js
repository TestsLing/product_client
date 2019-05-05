import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Popconfirm,
  Divider,
  Radio,
  Spin,
} from 'antd';
import StandardTable from './component/StandardTable';
import PageHeaderWrapper from './component/PageHeaderWrapper';

import styles from './style/index.less';
import inter from "../product/net/inter/product";

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['下架', '上架'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();

      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新建产品"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      okText={'创建'}
      cancelText={'取消'}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片">
        {form.getFieldDecorator('thumb', {
          rules: [{ required: true, message: '必须选择图片！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品名称">
        {form.getFieldDecorator('title', {
          rules: [{ required: true, message: '请填写产品名称！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品价格">
        {form.getFieldDecorator('price', {
          rules: [{ required: true, message: '请填写产品价格！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请填写产品描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上架">
        {form.getFieldDecorator('is_upper', {
          rules: [{ required: true, message: '请选择是否上架！' }],
        })(<Radio.Group>
          <Radio value={0}>下架</Radio>
          <Radio value={1}>上架</Radio>
        </Radio.Group>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="类别">
        {form.getFieldDecorator('cate_id', {
          rules: [{ required: false, message: '无所谓！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>

    </Modal>
  );
});

class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        desc: props.values.desc,
        thumb: props.values.thumb,
        price: props.values.price,
        title: props.values.title,
        is_upper: props.values.is_upper,
      },
    };

  }

  handleOk = () => {
    const { form, handleUpdate, values: {guid} } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };

      let param = {
        guid,
      };

      Object.keys(oldValue).forEach((value, index, array) => {
          console.log(value, index, array);
          if (oldValue[value] !== fieldsValue[value]) {
            param[value] = fieldsValue[value];
          }
      });

      this.setState(
          {
            formVals,
          },
          () => {
              handleUpdate(param);
          }
      );
    });
  };


  renderFooter = () => {
    const { handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={this.handleOk}>
        完成
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values, form } = this.props;

    const { title, price, thumb, desc, is_upper } = this.state.formVals;

    console.log(title, price);

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="修改产品基本信息"
        visible={updateModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品图片">
          {form.getFieldDecorator('thumb', {
            rules: [{ required: true, message: '请输入至少产品图片！' }],
            initialValue: thumb
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品名称">
          {form.getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入至少产品名称！' }],
            initialValue: title
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="价格">
          {form.getFieldDecorator('price', {
            rules: [{ required: true, message: '请输入至少产品价格！' }],
            initialValue: price
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('desc', {
            rules: [{ required: true, message: '请输入至少产品描述！' }],
            initialValue: desc
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上架">
          {form.getFieldDecorator('is_upper', {
            rules: [{ required: true, message: '请选择是否上架！' }],
            initialValue: is_upper
          })(<Radio.Group>
            <Radio value={0}>下架</Radio>
            <Radio value={1}>上架</Radio>
          </Radio.Group>)}
        </FormItem>

      </Modal>
    );
  }
}


class EditProductForm extends PureComponent {
  static defaultProps = {
    handleEdit: () => {},
    handleEditModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);
    console.log(props.values);



    this.state = {
      formVals: {
        desc: props.values.desc,
        thumb: props.values.thumb,
        price: props.values.price,
        title: props.values.title,
        is_upper: props.values.is_upper,
        keyword: props.values.keyword,
      },
      loading: true
    };
  }

  componentDidMount() {
    let param = {
      guid: this.props.values.guid
    };

    //   resource_guid: '8b40214b83ee4050b7b2da630739a30e'
    // };
    inter.detail(param).then((res) => {
      if (res.success) {
        let keys = res.result.detail.specif_keyword.filter((item) => {
          return item.keyword !== null;
        }).map((item) => {
          console.log(item.keyword)
          return item.keyword;
        });

        this.setState({
          formVals: {
            market_price: res.result.detail.detail.market_price,
            reward: res.result.detail.detail.reward,
            img: res.result.detail.detail.img,
            stock: res.result.detail.detail.stock,
            keyword: keys,
          },
          loading: false
        });
      }
    });
  }

  handleOk = () => {
    const { form, handleEdit, values: {guid} } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };

      let param = {
        resource_guid: '8b40214b83ee4050b7b2da630739a30e',
        guid,
      };

      Object.keys(oldValue).forEach((value, index, array) => {
          console.log(value, index, array);
          if (oldValue[value] !== fieldsValue[value]) {
            param[value] = fieldsValue[value];
          }
      });

      console.log(param);

      this.setState(
          {
            formVals,
          },
          () => {
            handleEdit(param);
          }
      );
    });
  };


  renderFooter = () => {
    const { handleEditModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleEditModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={this.handleOk}>
        完成
      </Button>,
    ];
  };

  render() {
    const { detailModalVisible, handleEditModalVisible, values, form } = this.props;

    const { img, market_price, reward, stock, keyword } = this.state.formVals;

    const { loading } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="修改产品信息"
        visible={detailModalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleEditModalVisible(false, values)}
        afterClose={() => handleEditModalVisible()}
      >
        <Spin spinning={loading}>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品图片">
            {form.getFieldDecorator('img', {
              rules: [{ required: false, message: '请输入至少产品图片！' }],
              initialValue: img
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="库存">
            {form.getFieldDecorator('stock', {
              rules: [{ required: false, message: '请输入至少产品名称！' }],
              initialValue: stock
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="市场价格">
            {form.getFieldDecorator('market_price', {
              rules: [{ required: false, message: '请输入至少产品价格！' }],
              initialValue: market_price
            })(<Input placeholder="请输入" />)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品规格">
            {form.getFieldDecorator('keyword', {
              rules: [{ required: false, message: '请输入至少产品价格！' }],
              initialValue: keyword
            })(<Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="请选择产品规格"
            >
            </Select>)}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="消费赠送积分">
            {form.getFieldDecorator('reward', {
              rules: [{ required: false, message: '请输入至少产品描述！' }],
              initialValue: reward
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Spin>

      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
class Index extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    detailModalVisible: false,
    expandForm: false,
    loading: true,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    detailFormValues: {},
    list: []
  };

  columns = [
    {
      title: '产品名称',
      dataIndex: 'title',
      render: text => <a>{text}</a>,
    },
    {
      title: '产品描述',
      dataIndex: 'desc',
    },
    {
      title: '产品点击次数',
      dataIndex: 'click_number',
    },
    {
      title: '状态',
      dataIndex: 'is_upper',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '产品价格',
      dataIndex: 'price',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>修改产品基本信息</a>
          <Divider type="vertical" />
          <Popconfirm title="确定要删除吗?" onConfirm={() => this.confirm(record)} okText="确定" cancelText="取消">
            <a href="#">删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => this.editProductDetail(true, record)}>完善产品信息</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    let param = {
      resource_guid: '8b40214b83ee4050b7b2da630739a30e'
    };
    this.productList(param);
  }

  /**
   * 删除产品
   * @param record
   */
  confirm = (record) => {
    let param = {
        guid: record.guid
    };

    inter.del(param).then((res) => {
      if (res.success) {
        let param = {
          resource_guid: '8b40214b83ee4050b7b2da630739a30e'
        };
        this.productList(param);
        message.success('删除成功');
      }
    });
  };


  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      resource_guid: '8b40214b83ee4050b7b2da630739a30e',
      page: pagination.current,
      limit: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    this.productList(params);
  };

  productList = (param) => {
    this.setState({
      loading: true
    });

    inter.list(param).then((res)=>{
      if (res.success) {
        this.setState({
          list: res.result,
          loading: false
        });
      }
    });
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.productList({resource_guid: '8b40214b83ee4050b7b2da630739a30e'})
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    // const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        console.log(selectedRows);
        // dispatch({
        //   type: 'rule/remove',
        //   payload: {
        //     key: selectedRows.map(row => row.key),
        //   },
        //   callback: () => {
        //     this.setState({
        //       selectedRows: [],
        //     });
        //   },
        // });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const {  form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      // dispatch({
      //   type: 'rule/fetch',
      //   payload: values,
      // });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  editProductDetail = (flag, record) => {
    this.setState({
      detailModalVisible: !!flag,
      detailFormValues: record || {},
    });
  };

  handleAdd = fields => {

    fields.resource_guid = '8b40214b83ee4050b7b2da630739a30e';

    inter.add(fields).then((res) => {
      if (res.success) {
        message.success('添加成功');
        let param = {
          resource_guid: '8b40214b83ee4050b7b2da630739a30e'
        };
        this.productList(param);
      } else {
        message.error('添加失败');
      }
    });
    this.handleModalVisible();
  };

  editProduct = (fields) => {
    inter.editDetail(fields).then((res) => {
      if (res.success) {
        let param = {
          resource_guid: '8b40214b83ee4050b7b2da630739a30e'
        };
        this.productList(param);
        message.success('修改成功');
      }else{
        message.error('修改失败');
      }
      this.handleUpdateModalVisible();
    });
  };

  /**
   * 更新产品
   * @param fields 需要更新的字段
   */
  handleUpdate = fields => {
    inter.update(fields).then((res) => {
        if (res.success) {
          let param = {
            resource_guid: '8b40214b83ee4050b7b2da630739a30e'
          };
          this.productList(param);
          message.success('修改成功');
        }else{
          message.error('修改失败');
        }
      this.handleUpdateModalVisible();
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('date')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    // let {
    //   rule: { data = [] },
    //   loading,
    // } = this.props;

    let { list: {productList:list, pagination},loading } = this.state;

    let data = {
      list,
      pagination
    };


    // let loading = false;

    const {
      selectedRows,
      modalVisible,
      updateModalVisible,
      stepFormValues,
      detailFormValues,
      detailModalVisible,
    } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    const editProductMethods = {
      handleEditModalVisible: this.editProductDetail,
      handleEdit: this.editProduct,
    };

    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建产品
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              rowKey='id'
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}

        {detailFormValues && Object.keys(detailFormValues).length ? (
            <EditProductForm
            values={detailFormValues}
            detailModalVisible={detailModalVisible}
            {...editProductMethods}
            />
        ) : null}

      </PageHeaderWrapper>
    );
  }
}

Index = Form.create()(Index);
UpdateForm = Form.create()(UpdateForm);
EditProductForm = Form.create()(EditProductForm);

export default Index;
