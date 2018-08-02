import React, { Component, PropTypes } from 'react';
import helper from './utils/helper';
import { month } from './utils/constants'
import classnames from 'classnames';


class AgendaDetail extends Component {

    constructor() {
        super();
        this.state = { hoverLeftPostion: 0 };
    }

    onHover(e) {
        let m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0;
        if (e.pageX || e.pageY) {
            m_posx = e.pageX + document.getElementById('right').scrollLeft;
        }
        let obj = e.target;
        e_posx += obj.offsetLeft;
        if (obj.offsetParent) {
            do {
                e_posx += obj.offsetLeft;
                e_posy += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        this.setState({ hoverLeftPostion: m_posx - e_posx - 110 });
    }

    render() {
        const { connectDragSource, id, top, height, width, left, agenda, level } = this.props;

        let startDate = new Date(agenda.StartDate);
        let EndDate = new Date(agenda.EndDate);
        let startDateFormated = month[startDate.getMonth()] + " " + startDate.getDate() + ", " + startDate.getFullYear();
        let endDateFormated = month[EndDate.getMonth()] + " " + EndDate.getDate() + ", " + EndDate.getFullYear();

        return (
            <div id={id}
                draggable="true"
                className={classnames(`agenda-container-cell level_${level}`)}
                style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    width: `${width}px`,
                    left: `${left}px`
                }}>
                <div onMouseMoveCapture={(e) => this.onHover(e)} className={classnames('sc-agenda-details cost-label tooltip-container')}>{agenda.cost}
                    <div
                        style={{
                            left: `${this.state.hoverLeftPostion}px`
                        }}
                        className={classnames('tooltiptext')}>
                        <div>{startDateFormated}- {endDateFormated} </div>
                        <div style={{ paddingTop: `5px` }}>{agenda.cost}</div>
                    </div></div>

            </div>
        );
    }
}

export default AgendaDetail;
