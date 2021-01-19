import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { TiTicket } from 'react-icons/ti';
import { calcTime, convertMoney } from '../../../src/Helper';
import './MovieInfoBar.css';


const  MovieInfoBar = (props) => {
    return (
        <div className="rmdb-movieinfobar">
            <div className="rmdb-movieinfobar-content">
                <div className="rmdb-movieinfobar-content-col">
                    <AiOutlineClockCircle className="fa-time" size="2.5rem" color="white" />
                    <span className="rmdb-movieinfobar-info">Running time: {calcTime(props.time)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <FaRegMoneyBillAlt className="fa-budget" size="2.5rem" color="white" />
                    <span className="rmdb-movieinfobar-info">Budget: {convertMoney(props.budget)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col">
                    <TiTicket className="fa-revenue" size="2.5rem" color="white" />
                    <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(props.revenue)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieInfoBar;