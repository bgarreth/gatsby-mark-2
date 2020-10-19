import React from "react";
import { Link } from "gatsby";
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Layout from "../components/layout";
import SEO from "../components/seo";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'


const Live = () => (
    <>
    
            <Layout>
               <AmplifyAuthenticator>
                <h1>Live Page</h1>
                
                <Link to="/">Go back  homepage</Link>
                </AmplifyAuthenticator>
              </Layout>
     
        </>
)

export default Live;
