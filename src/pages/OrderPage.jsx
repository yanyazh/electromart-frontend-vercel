import Banner from "../components/Banner";
import OrderForm from "../components/OrderForm";
import './OrderPage.css'

const OrderPage = () => {
    return (
        <div className="order-page">
            <Banner />
            <OrderForm />
        </div>
    );
}

export default OrderPage;
