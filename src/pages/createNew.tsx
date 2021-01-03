import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import {navigate} from 'gatsby';
import Lolly from '../components/Lolly'
import shortid from "shortid"

const createLollyMutation = gql `
    mutation createLolly($recipientName: String!,
        $message: String!,
        $senderName: String!,
        $flavourTop: String!,
        $flavourMiddle: String!,
        $flavourBottom: String!){
            createLolly(recipientName: $recipientName,
                message: $message ,
                senderName: $senderName ,
                flavourTop: $flavourTop ,
                flavourMiddle: $flavourMiddle ,
                flavourBottom: $flavourBottom ){
                    message
                    lollyPath
                }
        }
`

export default function createNew() {

    const[color1,setColor1] = useState("#d52358");
    const[color2,setColor2] = useState("#e95946");
    const[color3,setColor3] = useState("#deaa43");
    const recipientNameRef = useRef();
    const messageRef = useRef();
    const senderRef = useRef();

    const submitLollyForm= async ()=>{
        const id = shortid.generate()
        console.log('click ')
        console.log('color1',color1);
        console.log('sernder',senderRef.current.value);
        try {
            const result = await createLolly({
                variables:{
                    recipientName:recipientNameRef.current.value,
                    message:messageRef.current.value,
                    senderName:senderRef.current.value,
                    flavourTop:color1,
                    flavourMiddle:color3,
                    flavourBottom:color2
                }
            })
            console.log('result',result);
            
        } catch (error) {
            console.log('error',error)
            
        }
        navigate(`/lollies/${id}`)   
    }

    const [createLolly] = useMutation(createLollyMutation); 
    
    return (
        <div className="container">
          <Header/>
          <div className="lollyFormDiv">
              <div><Lolly fillLollyTop={color1} fillLollyBottom={color2} fillLollyMiddle={color3} /></div>
              <div className="lollyFlavourDiv">
                  <label htmlFor="flavourTop" className="colorPickerLabel">
                    <input type="color" value={color1} className="colorPicker" name="flavourTop" id="flavourTop"
                    onChange={(e)=>{setColor1(e.target.value)}} />
                  </label>
                  <label htmlFor="flavourTop" className="colorPickerLabel">
                  <input type="color" value={color3} className="colorPicker" name="flavourTop" id="flavourTop"
                  onChange={(e)=>{setColor3(e.target.value)}} />
                  </label>
                  <label htmlFor="flavourTop" className="colorPickerLabel">
                  <input type="color" value={color2} className="colorPicker" name="flavourTop" id="flavourTop" 
                  onChange={(e)=>{setColor2(e.target.value)}}/>
                  </label>
              </div>
              <div>
                  <div className="lollyFrom">
                      <label htmlFor="recipientName">To</label>
                      <input type="text" ref={recipientNameRef} name="recipientName" id="recipientName" />
                      <label htmlFor="recipientName">Message</label>
                      <textarea ref={messageRef} rows="15" column="30"/>
                      <label htmlFor="recipientName">From</label>
                      <input type="text" ref={senderRef} name="recipientName" id="recipientName" />
                  </div>
                  <input type="button" onClick={submitLollyForm} value="Create" />
              </div>
          </div>
        </div>
    )
}
