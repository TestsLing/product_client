/**
 *  Created By 憧憬
 */

import React,{ Component } from 'react';
import AdvancedProfile from '../Profile';
import inter from '../../net/inter/product';

class ProductDetail extends Component{

    constructor(props){
        super(props);

        this.state = {
            guid: '',
            detail: null,
        };
    }

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

    render() {

        const { detail } = this.state;
        console.log(detail);

        return (
            <div>
                <div>
                    <AdvancedProfile detail={detail} />
                </div>
            </div>
        );
    }

}


export default ProductDetail;