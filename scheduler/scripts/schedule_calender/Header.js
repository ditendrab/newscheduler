import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import minus from '../images/minus.png';
class Header extends Component {


    renderHeader(headerList){
        let header = [];
        if(headerList && headerList.length > 0)
        for(let  index = 0; index < headerList.length; index++){
            let childheader = this.renderHeader(headerList[index].childs);
            let img = <img   className={classnames('inline')} src={ minus} />
            
            header.push(<div>
                <div className={classnames(headerList[index].title? 'mainHeader rowHeight' : 'subHeader rowHeight')}>
                {childheader.length > 0 ? img : ''}
                <div className={classnames('rowHeight inline')} >
                    {headerList[index].name}
                </div>
                </div>{childheader}</div>);
        }
        return header
    }

    render() {
        const { header } = this.props;
        return (
            <div className={classnames('left inline')}>
                <div className={classnames('rowHeight header1-row')}></div>
                <div className={classnames('rowHeight header2-row')} ></div>
                <div className={classnames('rowHeight header3-row')} ></div>
                {/* <div>
                    <div className={classnames('rowHeight')} >Social Media</div>
                    <div >
                        <div className={classnames('rowHeight')} >FaceBook</div>
                        <div className={classnames('rowHeight')} class="rowHeight">UAE</div>
                    </div>
                </div>
                <div>
                    <div className={classnames('rowHeight')} >Social Media</div>
                    <div >
                        <div className={classnames('rowHeight')} >FaceBook</div>
                        <div className={classnames('rowHeight')} class="rowHeight">UAE</div>
                    </div>
                </div>
                <div>
                    <div className={classnames('rowHeight')} >Social Media</div>
                    <div >
                        <div className={classnames('rowHeight')} >FaceBook</div>
                        <div className={classnames('rowHeight')} class="rowHeight">UAE</div>
                    </div>
                </div> */}
                {this.renderHeader(header)}
            
            </div>)

    }
}
export default Header;