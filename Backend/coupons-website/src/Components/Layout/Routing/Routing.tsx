import { Routes, Route } from "react-router";
import App from "../../../App";
import Login from "../../Auth/Login/Login";
import Home from "../../General/Home/Home";
import NotFound from "../../General/NotFound/NotFound";
import Logout from "../../Auth/Logout/Logout";
import AllCompanies from "../../AdminArea/AllCompanies/AllCompanies";
import AllCustomers from "../../AdminArea/AllCustomers/AllCustomers";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import DeleteCompany from "../../AdminArea/DeleteCompany/DeleteCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import DeleteCustomer from "../../AdminArea/DeleteCustomer/DeleteCustomer";
import AllCoupons from "../../CompanyArea/AllCoupons/AllCoupons";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../CompanyArea/DeleteCoupon/DeleteCoupon";
import AllAvailableCoupons from "../../CustomerArea/AllAvailableCoupons/AllAvailableCoupons";
import MyCoupons from "../../CustomerArea/MyCoupons/MyCoupons";



function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/admin/companies" element={<AllCompanies />} />
                <Route path="/admin/company/add" element={<AddCompany />} />
                <Route path="/admin/company/update/:id" element={<UpdateCompany />} />
                <Route path="/admin/company/delete/:id" element={<DeleteCompany />} />

                {/* Admin Route  */}
                <Route path="/admin/customers" element={<AllCustomers />} />
                <Route path="/admin/customer/add" element={<AddCustomer />} />
                <Route path="/admin/customer/update/:id" element={<UpdateCustomer />} />
                <Route path="/admin/customer/delete/:id" element={<DeleteCustomer />} />
        
                {/* Company Route  */}
                <Route path="/company/coupons" element={<AllCoupons />} />
                <Route path="/company/coupon/add" element={<AddCoupon />} />
                <Route path="/company/coupon/update/:id" element={<UpdateCoupon />} />
                <Route path="/company/coupon/delete/:id" element={<DeleteCoupon />} />

                <Route path="/customer/all-coupons" element={<AllAvailableCoupons />} /> 
                <Route path="/customer/my-coupons" element={<MyCoupons />} /> 
                

                <Route path="*" element={<NotFound />} />
            </Routes>

        </div>
    );
}

export default Routing;
