import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import minus from '../images/minus.png';
import {views} from './utils/constants';
class Header extends Component {


    renderHeader(headerList){
        let header = [];
        if(headerList && headerList.length > 0)
        for(let  index = 0; index < headerList.length; index++){
            let childheader = this.renderHeader(headerList[index].childs);
            let img = <img   className={classnames('inline')} src={ minus} />
            let widthStyle = { width: '150px' };
            let leafNodeClass = childheader == '' ? 'leafChild' : ''; 
            header.push(<div>
                <div className={classnames(headerList[index].title? 'mainHeader rowHeight' : 'subHeader rowHeight')}>
                {childheader.length > 0 ? img : ''}
                <div  style={widthStyle}  className={classnames(`rowHeight inline ${leafNodeClass}`)} >
                    {headerList[index].name}
                </div>
                <div  style={widthStyle}  className={classnames(`rowHeight inline cost-col ${leafNodeClass}`)} >
                    {headerList[index].cost}
                </div>
                </div>{childheader}</div>);
        }
        return header
    }

    render() {
        const { header, view } = this.props;
        console.log("@@@@@@@@@",view);
        let leftHeaderStyle = { width: '150px' };
        return (
            <div className={classnames('left inline')}>
                <div className={classnames('rowHeight header1-row')}></div>
                <div className={classnames('rowHeight header2-row')} >
                { view != views.DAY ?  <div ><div  className={classnames('inline channel-header')} >Media/Channel</div><div  className={classnames('inline cost-col-header')}>Total Cost</div> </div>: ''}
                </div>
                { view == views.DAY ?  <div  className={classnames('rowHeight header3-row')} >
                    <div><div className={classnames('inline channel-header')}>Media/Channel</div><div className={classnames('inline cost-col-header')}>Total Cost</div> </div>
                </div>: ''}
                {this.renderHeader(header)}
            
            </div>)

    }
}
export default Header;