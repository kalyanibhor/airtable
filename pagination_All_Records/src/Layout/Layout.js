import React, { Component } from 'react'
import Sidebar from './sidebar'
import InfiniteScroll from '../components/customer/infiniteScroll';

class Layout extends Component {
   
    render() {
        return (
            <div>
                <InfiniteScroll/>
            </div>
        )
    }
}
export default Layout;