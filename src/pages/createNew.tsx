import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react'
import Header from '../components/Header'
import {navigate} from 'gatsby';
import Lolly from '../components/Lolly'
import { useFormik } from "formik"
import * as Yup from "yup"
import shortid from "shortid"

const createLollyMutation = gql `
    mutation createLolly(
        $recipientName: String!
        $message: String!
        $senderName: String!
        $flavourTop: String!
        $flavourMiddle: String!
        $flavourBottom: String!
        $lollyPath: String!){
            createLolly(
                recipientName: $recipientName
                message: $message 
                senderName: $senderName 
                flavourTop: $flavourTop 
                flavourMiddle: $flavourMiddle 
                flavourBottom: $flavourBottom 
                lollyPath: $lollyPath
                ){
                    message
                    lollyPath
                }
        }
`

export default function createNew() {

    const[color1,setColor1] = useState("#d52358");
    const[color2,setColor2] = useState("#e95946");
    const[color3,setColor3] = useState("#deaa43");

    const formik = useFormik({
        initialValues: {
          recipientName: "",
          senderName: "",
          message: "",
        },
        validationSchema: Yup.object({
            recipientName: Yup.string()
            .required("Required")
            .max(15, "Must be 15 characters or less"),
          senderName: Yup.string()
            .required("Required")
            .max(15, "Must be 15 characters or less"),
          message: Yup.string().required("Required"),
        }),
        onSubmit: values => {
          const id = shortid.generate()
    
          const submitLollyForm = async () => {
            const result = await createLolly({
              variables: {
                recipientName: values.recipientName,
                senderName: values.senderName,
                message: values.message,
                flavourTop: color1,
                flavourMiddle: color3,
                flavourBottom: color2,
                lollyPath: id,
              },
            })
          }
          submitLollyForm()
    
          navigate(`/lollies/${id}`)
        },
      })

    const [createLolly] = useMutation(createLollyMutation); 
    
    return (
        <div className="container">
          <Header/>
          <div className="editorRoot">
        <div className="LollyCreaterColorContainer">
          <Lolly
            style="lollipopEditor"
            fillLollyTop={color1}
            fillLollyBottom={color2}
            fillLollyMiddle={color3}
          />

          <div className="colorSelectorContainer">
            <label htmlFor="topFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={color1}
                type="color"
                name="topFlavor"
                id="topFlavor"
                onChange={e => {
                  setColor1(e.target.value)
                }}
              ></input>
            </label>

            <label htmlFor="midFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={color3}
                type="color"
                name="midFlavor"
                id="midFlavor"
                onChange={e => {
                  setColor3(e.target.value)
                }}
              ></input>
            </label>

            <label htmlFor="botFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={color2}
                type="color"
                name="botFlavor"
                id="botFlavor"
                onChange={e => {
                  setColor2(e.target.value)
                }}
              ></input>
            </label>
          </div>
        </div>

        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <label className="formLabel" htmlFor="sendName">
            To:
          </label>
          <div className="formErrors">
            {formik.errors.recipientName && formik.touched.recipientName
              ? formik.errors.recipientName
              : null}
          </div>
          <input
            className="inputText"
            type="text"
            name="recipientName"
            id="recName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <label className="formLabel" htmlFor="msg">
            Message:{" "}
          </label>
          <div className="formErrors">
            {formik.errors.message && formik.touched.message
              ? formik.errors.message
              : null}
          </div>
          <textarea
            id="message"
            name="message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="inputTextBox"
            cols={30}
            rows={15}
          />

          <label className="formLabel" htmlFor="Recname">
            {" "}
            From:{" "}
          </label>
          <div className="formErrors">
            {formik.errors.senderName && formik.touched.senderName
              ? formik.errors.senderName
              : null}
          </div>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="inputText"
            type="text"
            name="senderName"
            id="sendersName"
          />

          <button className="submitButton" type="submit">
            Send
          </button>
        </form>
      </div>
        </div>
    )
}
