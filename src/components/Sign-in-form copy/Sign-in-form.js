import { useState } from "react";
import FormInput from "../Form-input/Form-input";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword  } from "../../utils/firebase/firebase";
import Button from "../Button/Button";
import "./Sign-in-form.scss";
import { ReactComponent as GoogleLogo } from "../../assets/google.svg";

//initial state for all the form fields
const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // console.log(formFields);

    const handleChange = (e) => {
        const { name, value } = e.target;
        //Update one input, other fields previously on state will be spread
        //Apply value from variable of name
        setFormFields({...formFields, [name]: value})
    };

    //reset form fields upon successful creation
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            
            resetFormFields();

        } catch (error) {
            
        }
    }
 
    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" name="email" value={email} onChange={handleChange} required/>

                <FormInput label="Password" type="password" minLength="8" name="password" value={password} onChange={handleChange} required/>

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle}> 
                    <GoogleLogo/> Google
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;