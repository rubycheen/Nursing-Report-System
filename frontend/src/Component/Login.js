import Login from 'ant-design-pro/lib/Login';
import { Alert } from 'antd';
import "antd/dist/antd.css";
import { useState } from 'react';
import './App.css'

const { Tab, UserName, Password, Submit } = Login;

const LoginPage = ({setPage}) => {
    // const [state, setState] = useState({notice: ''})
    const [notice, setNotice] = useState('')

    const onSubmit = (err, values) => {
        console.log('value collected ->', {
        ...values,
        });
        setNotice(
        () => {
            if (!err && (values.username !== 'admin' || values.password !== '888888')) {
                return('The combination of username and password is incorrect!');
            }
            else{
                setPage(1)
            }
        }
        );
    };

    return (
      <div className="login-warp">
        <Login
          defaultActiveKey='login'
          onSubmit={onSubmit}
        >
            <Tab key="login" tab="Account">
            {notice && (
                <Alert
                style={{ marginBottom: 24 }}
                message={notice}
                type="error"
                showIcon
                closable
                />
            )}
            <UserName name="username" />
            <Password name="password" />
            </Tab>
            <Submit>Login</Submit>

        </Login>
      </div>
    );
}

export default LoginPage