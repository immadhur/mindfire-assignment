import React, { useState } from 'react';
import Login from './login';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Spinner from '../UI/Spinner/Spinner';

const AuthMain = (props) => {

    let [isLoginSucess, setIsLoginSuccess] = useState(false);
    let [loading, setLoading] = useState(false);

    const loginButtonClickHandler = async (event, username, password) => {
        event.preventDefault();
        try{
            setLoading(true);
            let res=await axios.post('/login', {email:username, password})
            localStorage.setItem('token', res.data.token);
            setIsLoginSuccess(true);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const secondButtonHandler = (e) => {
        e.preventDefault();
        // setIsLogin(!isLogin);
    }

    return (
        <>
            {loading ?
                <Spinner /> :
                <div className="App">
                    {isLoginSucess ?
                        <Redirect to='/' /> :
                        <Login click={loginButtonClickHandler} errorText secondButtonClick={secondButtonHandler} errorTxt={props.errorText} />
                    }
                </div>
            }
        </>
    );
}

export default AuthMain;