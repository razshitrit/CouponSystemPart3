import { Category } from "./Category";

export interface CouponModel {
    id: number;
    companyId: number;
    category: Category;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    amount: number;
    price: number;
    image: string;
}
