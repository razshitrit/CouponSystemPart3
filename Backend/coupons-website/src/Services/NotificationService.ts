import { AxiosError } from "axios";
import { toast } from "react-toastify";



class NotificationService {
    public successPlainText(message: string): void {
        toast.success(message);
    }

    public warningPlainText(message: string): void {
        toast.warning(message);
    }

    public errorPlainText(message: string): void {
        toast.error(message);
    }

    public errorAxiosApiCall(error: any): void {

        if (error?.response?.data?.detail) {
            const errorDetails: string = error?.response?.data?.detail;
            this.errorPlainText(errorDetails);
        } else {
            this.errorPlainText("An error occurred during the API call.");
        }
    }
}

const notificationService = new NotificationService();
export default notificationService;
