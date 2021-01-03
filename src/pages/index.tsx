import { navigate } from 'gatsby';
import React from 'react'
import Header from '../components/Header';
import Lolly from '../components/Lolly';

export default function index() {
    return (
        <div>
            <Header/>         
            <div className="lolliesContainer">
        <Lolly style="lollipop" />
        <Lolly
          style="lollipop"
          fillLollyTop="#6b6bde"
          fillLollyBottom="#4ac383"
          fillLollyMiddle="#d2ec27"
        />
        <Lolly
          style="lollipop"
          fillLollyTop="#b71616"
          fillLollyBottom="#bf10f1"
          fillLollyMiddle="#10adf1"
        />
        <Lolly
          style="lollipop"
          fillLollyTop="#ffc107"
          fillLollyBottom="#00a97e"
          fillLollyMiddle="#ec398f"
        />
            </div>
            <button
        className="createLollyButton"
        onClick={() => {
          navigate("/createNew")
        }}
      >
        Send a customized lolly to a friend
      </button>
        </div>
    )
}
