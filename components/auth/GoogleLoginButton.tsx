import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const clientId = process.env.NEXT_PUBLIC_API_KEY_GOOGLE_OAUTH_CLIENT_ID || "";

function GoogleLoginButton() {
  //   const navigate = useNavigate();

  //   const handleGoogleLogin = async (credentialResponse: any) => {
  //     console.log(credentialResponse);

  //     // if (!credentialResponse.credential) {
  //     //   return console.error("Google Login Failed");
  //     // }

  //     console.log(credentialResponse?.credential);

  //     // const decodedToken: any = jwtDecode(credentialResponse.credential);
  //     // console.log("Google User Info:", decodedToken);

  //     // try {
  //     //   const response = await axios.post("http://localhost:8080/auth/google", {
  //     //     token: credentialResponse.credential,
  //     //   });

  //     //   if (response.data.exists) {
  //     //     console.log("User Exists, Logging in...");
  //     //     document.cookie = `accessToken=${response.data.accessToken}; path=/; Secure; HttpOnly;`;
  //     //     // navigate("/dashboard"); // Redirect to dashboard
  //     //   } else {
  //     //     console.log("User Not Found, Redirecting to Register...");
  //     //     // navigate("/register", { state: { user: response.data.user } });
  //     //   }
  //     // } catch (error) {
  //     //   console.error("Login Failed:", error);
  //     // }
  //   };

  const handleGoogleLogin = async (credentialResponse: any) => {
    console.log("Full Credential Response:", credentialResponse);

    if (!credentialResponse || !credentialResponse.credential) {
      console.error("Google Login Failed: No credential received");
      return;
    }

    console.log("Encoded JWT Token:", credentialResponse.credential);

    try {
      const decodedToken: any = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google User Info:", decodedToken);
    } catch (error) {
      console.error("JWT Decoding Failed:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => console.error("Google Login Error")}
        text="continue_with"
        shape="pill"
        useOneTap
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
