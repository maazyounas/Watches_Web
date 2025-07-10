import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page components
import Home from "./assets/Home/Home";
import ReviewsSection from "./assets/ReviewsSection/ReviewsSections";
import About from "./assets/About/About";
import Support from "./assets/Support/Support";
import BestSeller from "./assets/BestSeller/BestSeller";
import ForHer from "./assets/ForHer/Forher";
import ForHim from "./assets/ForHim/ForHim";
import Watches from "./assets/Watches/Watches";
import Jewellery from "./assets/Jewellery/Jewellery";
import ProductDetail from "./assets/ProductDetail/ProductDetail";
import CategoryProductLayout from "./assets/CategoryProductLayout/CategoryProductLayout";
import CheckoutPage from "./assets/CheckOut/CheckoutPage";
import ComplaintForm from "./assets/ComplaintForm/ComplaintForm";
import Admin from "./assets/Admin/Admin";
import TrackOrder from "./assets/TrackOrder/TrackOrder";
import TermsAndConditions from "./assets/TermsAndConditions/TermsAndConditions";
import BulkOrder from "./assets/BulkOrder/BulkOrder";
import ScrollToTop from "./assets/Scroll/ScrollToTop";


// Common components
import Navbar from "./assets/Navbar/Navbar";
import Footer from "./assets/Footer/Footer";
import CartPage from "./assets/Cart/CartPage";

// Context
import { CartProvider } from "./assets/Context/CartContext";

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <CartPage /> {/* Always available; visibility controlled by context */}
         <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/review" element={<ReviewsSection />} />
          <Route path="/complaintform" element={<ComplaintForm />} />
          <Route path="/trackorder" element={<TrackOrder />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/support" element={<Support />} />
          <Route path="/bulkorder" element={<BulkOrder />} />
          <Route path="/bestseller" element={<BestSeller />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/forher" element={<ForHer />} />
          <Route path="/forhim" element={<ForHim />} />
          <Route path="/watches" element={<Watches />} />
          <Route path="/jewellery" element={<Jewellery />} />
          <Route path="/product-details" element={<ProductDetail />} />
          <Route path="/categoryproductlayout" element={<CategoryProductLayout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
      </CartProvider>
    </Router>
  );
};

export default App;
