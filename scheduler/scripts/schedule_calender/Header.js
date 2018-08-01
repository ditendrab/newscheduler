import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import minus from '../images/minus.png';
import plus from '../images/plus.png';
import {views, layout} from './utils/constants';
let clickedHeaderId;
class Header extends Component {

    hideOrShowChild(headerList, RefId, isHide){
        let matchedRefId = false;

    if(headerList && headerList.length > 0){
        for(let  index = 0; index < headerList.length; index++){
            if(headerList[index].RefId == RefId){
                headerList[index].childHide = isHide;
                if(headerList[index].childs && headerList[index].childs.length > 0){
                    let childHeaders = headerList[index].childs;
                    for(let  chIndex = 0; chIndex < childHeaders.length; chIndex++){
                        let  childHeader = childHeaders[chIndex];
                        childHeader.hide = isHide;
                    }
                }

                matchedRefId = true;
                break
            }else{
                if(headerList[index].childs && headerList[index].childs.length > 0){
                     matchedRefId = this.hideOrShowChild(headerList[index].childs, RefId, isHide);
                    if(matchedRefId)break;
                }
             }
            }
        }
        return matchedRefId;
    }

    hideOrShowMatchedHeader(RefId, isHide){
        let headerList = this.props.headerList;
       
       if(headerList && headerList.length > 0){
         for(let  index = 0; index < headerList.length; index++){
             if(headerList[index].RefId == RefId){
                if(headerList[index].childs && headerList[index].childs.length > 0){
                    headerList[index].childHide = isHide;
                    let childHeaders = headerList[index].childs;
                    for(let  chIndex = 0; chIndex < childHeaders.length; chIndex++){
                        let  childHeader = childHeaders[chIndex];
                        childHeader.hide = isHide;
                    }
                }
                break;
             }else{
                if(headerList[index].childs && headerList[index].childs.length > 0){
                 let matchedRefId = this.hideOrShowChild(headerList[index].childs, RefId, isHide);
                 if(matchedRefId){
                     break;
                 }
                }
             }
            }
        }
        this.props.changeHeaderState(this.props.headerList);
    }  
     
    renderHeader(headerList){
        let header = [];
        if(headerList && headerList.length > 0)
        for(let  index = 0; index < headerList.length; index++){
            let childheader = this.renderHeader(headerList[index].childs);
            let isHidden = headerList[index].childHide ? false : true;
            clickedHeaderId = headerList[index].RefId;
            
            let img ;
            if(isHidden){
                img = <img  onClick={() => this.hideOrShowMatchedHeader('2-0', true)}  className={classnames('inline')} src={  minus } />
            }else{
                img =<img  onClick={() => this.hideOrShowMatchedHeader('2-0', false)}  className={classnames('inline')} src={  plus  } />
            }
            let widthStyle = { width: '150px' };
            let leafNodeClass = childheader == '' ? 'leafChild' : ''; 
          //  if(!headerList[index].hide){
            header.push(<div className = { headerList[index].hide ? classnames('display-none'):''}>
                <div className={classnames(headerList[index].title? 'mainHeader rowHeight' : 'subHeader rowHeight')}>
                {childheader.length > 0 ? img : ''}
                <div  style={widthStyle}  className={classnames(`rowHeight inline ${leafNodeClass}`)} >
                    {headerList[index].name}
                </div>
                <div  style={widthStyle}  className={classnames(`rowHeight inline cost-col ${leafNodeClass}`)} >
                    {headerList[index].cost}
                </div>
                </div>{childheader}</div>);
           // }
        }
        return header
    }

    render() {
        const { headerList, view } = this.props;
        let leftHeaderStyle = { width: layout.LEFT_TREE_WIDTH+'px' };
        
        
        return (
            <div style={leftHeaderStyle} className={classnames('left inline')}>
                <div className={classnames('rowHeight header1-row')}></div>
                <div className={classnames('rowHeight header2-row')} >
                { view != views.DAY ?  <div ><div  className={classnames('inline channel-header')} >Media/Channel</div><div  className={classnames('inline cost-col-header')}>Total Cost</div> </div>: ''}
                </div>
                { view == views.DAY ?  <div  className={classnames('rowHeight header3-row')} >
                    <div><div className={classnames('inline channel-header')}>Media/Channel</div><div className={classnames('inline cost-col-header')}>Total Cost</div> </div>
                </div>: ''}
                {this.renderHeader(headerList)}
            
            </div>)

    }
}
export default Header;