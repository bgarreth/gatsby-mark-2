import React,{  useEffect,useState }  from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import  { API,Auth,Hub,Logger } from 'aws-amplify';



    function Projects (){
        
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
     
      const logger = new Logger('My-Logger');

     
     const listener = (data) => {

    switch (data.payload.event) {

        case 'signIn':
            logger.error('user signed in'); //[ERROR] My-Logger - user signed in
            getUser();
            break;
        case 'signUp':
            logger.error('user signed up');
            break;
        case 'signOut':
            logger.error('user signed out');
            //if the admin signs in and another non-admin signs in reset the state
            setAdmin(false)
            break;
        case 'signIn_failure':
            logger.error('user sign in failed');
            break;
        case 'configured':
            logger.error('the Auth module is configured');

    }
}
     
     
     
      useEffect(() => {

    getUser();
    Hub.listen('auth', listener)
  }, []);

        
        async function getUser(){
          await Auth.currentAuthenticatedUser({
                bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
            }).then(user => {
              console.log(user);
              setUser(user);
              let attributes = user.attributes;
              console.log(attributes)
              let phoneNumber = attributes['phone_number'];
              console.log(phoneNumber);
              let groups = user.signInUserSession.accessToken.payload["cognito:groups"]
              console.log(groups);
              if (typeof groups !== 'undefined'){
                   
              if(groups.includes("admin") ){
                setAdmin(true);
              }
              }
              
             
            })
            .catch(err => console.log(err));
            }

        
        
        return (
             
    
            <Layout>
       
                
                  <h1>Projects Public Page</h1>
                
                <Link to="/">Go back  homepage</Link>
                
                   {admin &&
                     <div>
                   <h2>Welcome to the admin section</h2>
                   <p>Hi {user.username} you are an admin</p>
                     <button  >Admin button</button>
                   </div>
                  }
            
              </Layout>
            
            );
        }
        



export default Projects;

