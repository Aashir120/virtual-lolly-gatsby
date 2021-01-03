import { navigate } from 'gatsby';
import React from 'react'
import Header from '../components/Header';
import Lolly from '../components/Lolly';

export default function index() {
    return (
        <div className="container">
            <Header/>
            <div className="listLollies">            
            <div>
                <Lolly fillLollyTop="#d52358" fillLollyBottom="#e95946" fillLollyMiddle="#deaa43" />
            </div>
            <div>
                <Lolly fillLollyTop="green" fillLollyBottom="blue" fillLollyMiddle="red" />
            </div>
            </div>
            <input type="button" value="Create new lolly" onClick={()=>{
                navigate('/createNew')
            }}/>
        </div>
    )
}
