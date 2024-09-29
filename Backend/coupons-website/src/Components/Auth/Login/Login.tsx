import './Login.css';
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LoginRequestModel } from '../../../Models/LoginRequestModel';
import { loginApi } from '../../../Services/LoginApiService';
import notificationService from '../../../Services/NotificationService';

function Login() {
    const navigate = useNavigate();

    const schema = zod.object({
        email: zod.string().email("אימייל לא תקין, לדוגמה: name@example.com"),
        password: zod.string().min(4, "סיסמה לא תקינה, מינימום 4 תווים"),
        clientType: zod.string(),
    });

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<LoginRequestModel>({ mode: "all", resolver: zodResolver(schema) });

    const loginFormSubmit: SubmitHandler<LoginRequestModel> = (data) => {
        return loginApi(data)
            .then(res => {
                notificationService.successPlainText("התחברת בהצלחה");
                navigate("/home");
            })
            .catch(err => {
                notificationService.errorAxiosApiCall(err);
            });
    };

    return (
        <div className="login-container">
            <h1 className="login-title">התחברות משתשמש</h1>
            <form className='login-form' onSubmit={handleSubmit(loginFormSubmit)}>
                <div className="form-group">
                    <label htmlFor="email">אימייל</label>
                    <input {...register("email")} name="email" type="email" placeholder="אימייל..." />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">סיסמה</label>
                    <input {...register("password")} name="password" type="password" placeholder="סיסמה..." />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="clientType">סוג לקוח</label>
                    <select {...register("clientType")} defaultValue="">
                        <option value="" disabled>בחר סוג לקוח</option>
                        <option value="ADMIN">מנהל</option>
                        <option value="COMPANY">חברה</option>
                        <option value="CUSTOMER">לקוח</option>
                    </select>
                </div>

                <button className="login-button" disabled={!isValid || isSubmitting}>
                    {isSubmitting ? 'מתבצע כניסה...' : 'כניסה'}
                </button>
            </form>
        </div>
    );
}

export default Login;