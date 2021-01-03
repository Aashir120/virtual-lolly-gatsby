import React from "react"
import Lolly from "./Lolly"
import { graphql } from "gatsby"
import Header from "./Header"

export const query = graphql`
  query MyQuery($lollyPath: String!) {
    Lollies {
      getLollyByPath(lollyPath: $lollyPath) {
        flavourBottom
        flavourMiddle
        flavourTop
        lollyPath
        message
        recipientName
        senderName
      }
    }
  }
`

export default function DynamicLollyPage({ data }) {

  return (
    <div>
      <Header/>
      <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
      <span className="sharableLink">
        {" "}
        {`http://localhost:8888/lollies/${data.Lollies.getLollyByPath.lollyPath}`}
      </span>
      <div className="recievedContentContainer">
        <Lolly
          fillLollyTop={data.Lollies.getLollyByPath.flavourTop}
          fillLollyMiddle={data.Lollies.getLollyByPath.flavourMiddle}
          fillLollyBottom={data.Lollies.getLollyByPath.flavourBottom}
        />

        <div className="recievedTextContainer">
          <h3>HI {data.Lollies.getLollyByPath.recipientName.toUpperCase()}</h3>
          <p>{data.Lollies.getLollyByPath.message}</p>
          <h4>From: {data.Lollies.getLollyByPath.sendersName}</h4>
        </div>
      </div>
    </div>
  )
}