import React, {useEffect, useState} from 'react';
import insLogo from "../images/ins_logo.png";
import Button from "@mui/material/Button";
import Divider from "../Divider/Divider";
import {AiFillFacebook} from "react-icons/ai";
import appleStore from "../images/appleStore.png";
import googlePlay from "../images/googlePlay.png";
import {Navigate, Redirect, useNavigate} from "react-router-dom";
import "./SignUp.css"

import {signUp} from "../../../api";
import CustomInput from "../CustomInput/CustomInput";
import {BsCheckCircle} from "react-icons/bs";
import Footer from "../Footer/Footer";


const SignUp = () => {


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token !== null) navigate("/")
    })


    const [signUpInfo, setSignUpInfo] = useState({
        email:'',
        fullName:'',
        userName:'',
        password:''
    });

    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [redirectNow, setRedirectNow] = useState(false)

    const canSubmit = signUpInfo.email !== '' &&
            signUpInfo.fullName !== '' &&
            signUpInfo.userName !== '' &&
            signUpInfo.password !== ''


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await signUp(signUpInfo)
            if(response.data) {
                setSignUpSuccess(true)
                // localStorage.setItem('token', response.data);

                setTimeout(()=>{
                    console.log("this is timeout")
                    navigate("../../")
                },6000)

            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="signUpPage_main">
                <div className="cardMain">
                    {!signUpSuccess ?
                        <form className="upperCardSignUp" onSubmit={handleSubmit}>
                            <img src={insLogo} className="insLogo"/>

                            <div className="des">Sign up to see photos and videos from your friends.</div>

                            <Button variant="contained" id="loginButton" size="small"><AiFillFacebook fontSize="1.3rem"/>&nbsp;Log in with Facebook</Button>

                            <div style={{marginBottom:"0.7rem", fontSize:"0.9rem"}}>
                                <Divider text="OR"/>
                            </div>


                            <CustomInput
                                placeholder={"Email"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"email"}
                                signUpValidate={null}


                            />
                            <CustomInput
                                placeholder={"Full Name"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"fullName"}
                                signUpValidate={null}
                            />
                            <CustomInput
                                placeholder={"Username"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"userName"}
                                signUpValidate={null}
                            />
                            <CustomInput
                                placeholder={"Password"}
                                confidential={true}
                                signUpInfo={signUpInfo}
                                setSignUpInfo={setSignUpInfo}
                                SignUpKey={"password"}
                                signUpValidate={null}
                            />

                            <div className="des2">People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628" target="_blank">Learn More</a></div>

                            <div className="des2">By signing up, you agree to our <a href="https://www.facebook.com/privacy/policy" target="_blank">Terms , Privacy Policy</a>  and <a href="https://help.instagram.com/1896641480634370?ref=ig">Cookies Policy</a> .</div>

                            <Button variant="contained" id="loginButton" size="small" disabled={!canSubmit}
                                    type="submit">Sign Up</Button>

                        </form>:

                        <div className="upperCardSignUp">
                            <img src={insLogo} className="insLogo"/>
                            <div style={{fontSize:"5rem"}}>
                                <BsCheckCircle/>
                            </div>
                            {/*{redirectNow? <Navigate to={"../../" } /> : <div style={{margin:"1rem"}}>Success</div>}*/}
                            <div style={{margin:"1rem"}}>Success</div>
                        </div>
                    }
                    <div className="bottomCardSignUp">
                        <div>Have an account? <a style={{color:"rgb(119,178,242)"}} href="/">Log in</a></div>
                    </div>
                    <div className="appDownload">
                        <div className="getTheApp">Get the app.</div>
                        <div className="downloadImages">
                            <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank"><img src={appleStore} className="downloadImageApple"/></a>
                            <a href="https://play.google.com/store/apps/details?id=com.instagram.android" target="_blank"><img src={googlePlay} className="downloadImageGoogle"/></a>
                        </div>
                    </div>
                </div>

            </div>
            <div className="footer">
                <Footer/>
            </div>

        </div>

    );
};

export default SignUp;
