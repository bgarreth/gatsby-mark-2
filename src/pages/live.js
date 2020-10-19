import React from "react";
import { Link } from "gatsby";
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Layout from "../components/layout";
import SEO from "../components/seo";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Auth from "@aws-amplify/auth";

async function getUser(){
      await Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => {
  console.log(user);
 // setUser(user);
 console.log(user.signInUserSession.accessToken.payload["cognito:groups"]);
})
.catch(err => console.log(err));
}
    
    const Live = () => (
        
    <>
    
            <Layout>
               <AmplifyAuthenticator>
                <h1>Live Protected Page</h1>
                
                <Link to="/">Go back  homepage</Link>
                  <AmplifySignOut />
                   <button  onClick={getUser}>getUser</button>
                </AmplifyAuthenticator>
              </Layout>
     
        </>
)

export default Live;
