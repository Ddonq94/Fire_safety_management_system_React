import { LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppForm from "../components/AppForm";
import AppFrame from "../components/AppFrame";
import GlobalServices from "../services/GlobalServices";
import { Alert } from "@material-ui/lab";

function Profile() {
  const [fields, setFields] = useState<any>();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPWMessage, setErrorPWMessage] = useState("");
  const [user, setUser] = useState<any>();
  const [disableName, setDisableName] = useState<boolean>(true);
  const [disablePW, setDisablePW] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);

  const [handle, setHandle] = useState(false);
  const [type, setType] = useState<any>();
  const [msg, setMsg] = useState("");

  let history = useHistory();

  let fields2 = [
    {
      name: "password",
      value: password,
      required: true,
      label: "Password",
      type: "password",
      placeholder: "********",
      variant: "filled",
      setter: setPassword,
      disabled: false,
      defaultValue: "",
    },
    {
      name: "cpassword",
      value: confirmPassword,
      required: true,
      label: "Confirm Password",
      type: "password",
      placeholder: "********",
      variant: "filled",
      setter: setConfirmPassword,
      disabled: false,
      defaultValue: "",
    },
  ];

  const styles = {
    top: {
      borderBottom: "1px solid #707070",
      marginTop: "30px",
      marginBottom: "10px",
    },
    bottom: {
      borderBottom: "1px solid #707070",
      marginTop: "70px",
      marginBottom: "10px",
    },
  };

  const handleEdit = async () => {
    setLoading(true);

    try {
      const res = await GlobalServices.generic(
        {
          name: fullName,
        },
        "PUT",
        "Users/" + user.id,
        {
          Authorization: "Bearer " + user?.api_token,
        }
      );
      let resJson = await res;
      console.log(resJson);
      setLoading(false);

      if (res.res === "error") {
        setErrorMessage(resJson.json.message);
        if (resJson.json.message === "Unauthenticated.") {
          history.push(`/login`);
          return;
        }
        setHandle(true);
        setType("error");
        setMsg(resJson.json.message);
      }
      if (res.res === "success") {
        let oldUser = JSON.parse(sessionStorage.getItem("user") || "");
        let newUser = Object.assign(oldUser, resJson.json);
        console.log(newUser);

        sessionStorage.setItem("user", JSON.stringify(newUser));
        setErrorMessage("");
        setHandle(true);
        setType("success");
        setMsg("Operation was Successful");
      }
    } catch (err) {
      console.log(err);
      setHandle(true);
      setType("error");
      setMsg("Something Broke, Please try again or contact Admin");
      console.log(err);
      setErrorMessage("Something Broke, Please try again or contact Admin");
    }
    setTimeout(() => window.location.reload(), 3000);
  };

  const handlePasswordChange = async () => {
    setLoading(true);

    try {
      const res = await GlobalServices.generic(
        {
          password,
        },
        "PUT",
        "Users/" + user.id,
        {
          Authorization: "Bearer " + user?.api_token,
        }
      );
      let resJson = await res;
      console.log(resJson);
      setLoading(false);

      if (res.res === "error") {
        setErrorPWMessage(resJson.json.message);
        if (resJson.json.message === "Unauthenticated.") {
          history.push(`/login`);
          return;
        }
        setHandle(true);
        setType("error");
        setMsg(resJson.json.message);
      }
      if (res.res === "success") {
        let oldUser = JSON.parse(sessionStorage.getItem("user") || "");
        let newUser = Object.assign(oldUser, resJson.json);
        console.log(newUser);

        sessionStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser.data);

        setErrorPWMessage("");
        setHandle(true);
        setType("success");
        setMsg("Operation was Successful");
      }
    } catch (err) {
      console.log(err);
      setHandle(true);
      setType("error");
      setMsg("Something Broke, Please try again or contact Admin");
      console.log(err);
      setErrorPWMessage("Something Broke, Please try again or contact Admin");
    }
    setTimeout(() => window.location.reload(), 3000);
  };

  useEffect(() => {
    console.log(fullName);

    setDisableName(fullName.length < 3);
  }, [fullName]);

  useEffect(() => {
    setDisablePW(password !== confirmPassword || password.length < 9);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (user) {
      setFields([
        {
          name: "userName",
          value: userName,
          required: false,
          label: "Username",
          type: "email",
          placeholder: "admin@email.com",
          variant: "filled",
          setter: setUserName,
          disabled: true,
          defaultValue: user.email,
        },
        {
          name: "fullName",
          value: fullName,
          required: true,
          label: "Fullname (Surname first)",
          type: "text",
          placeholder: "Your Full Name",
          variant: "filled",
          setter: setFullName,
          disabled: false,
          defaultValue: user.name,
        },
      ]);
    }
  }, [user]);

  return (
    <AppFrame
      headerText="Manage Your Profile"
      headerTextPosition="center"
      headerTextSize="h4"
      frameTitle="Profile Management"
      userGetter={setUser}
      loading={loading}
    >
      {handle && (
        <Alert
          onClose={() => {
            window.location.reload();
          }}
          severity={type}
          style={styles.bottom}
        >
          {msg}
        </Alert>
      )}
      {loading && <LinearProgress />}
      <br />
      <Typography
        style={styles.top}
        color="primary"
        variant="h5"
        component="h2"
      >
        Basic Information
      </Typography>

      {/* <Typography align="center" color="error">
        {errorMessage}
      </Typography> */}
      {user && (
        <AppForm
          fields={fields}
          submitString="Save"
          submitButtonMethod={handleEdit}
          buttonDisabled={disableName}
        />
      )}

      <Typography
        style={styles.bottom}
        color="primary"
        variant="h5"
        component="h2"
      >
        Change Password
      </Typography>

      <Typography align="center" color="error">
        {errorPWMessage}
      </Typography>
      {user && (
        <AppForm
          fields={fields2}
          submitString="Save"
          submitButtonMethod={handlePasswordChange}
          buttonDisabled={disablePW}
        />
      )}
    </AppFrame>
  );
}

export default Profile;
