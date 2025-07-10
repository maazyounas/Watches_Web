import { useState, useEffect, useRef } from "react";
import {
  FaTruck,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
  FaTools,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

const quickLinks = [
  { title: "FAQs", icon: FaQuestionCircle, path: "/support" },
  { title: "Track Your Order", icon: FaTruck, path: "/trackorder" },
  { title: "Terms & Conditions", icon: FaFileContract, path: "/termsandconditions" },
  { title: "Register Complaint", icon: FaTools, path: "/complaintform" },
];

const sections = [
  {
    id: "order",
    title: "Order Management",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Order Placement</h2>
        <p className="mb-4">
          You can visit our website{" "}
          <a
            href="https://zerolifestyle.co"
            className="text-blue-600 underline"
          >
            zerolifestyle.co
          </a>{" "}
          and order your desired product anytime. Enjoy ongoing discount offers
          of more than 50% before they end. To place an order:
          <br />
          1. Go to the product you want to order.
          <br />
          2. Click on 'Add to Cart' and provide shipping and payment details.
          <br />
          3. Click 'Place the Order' to confirm.
        </p>

        <h2 className="text-xl font-semibold mb-2">Order Confirmation</h2>
        <p className="mb-4">
          Once you place an order, you will receive an order confirmation email
          and SMS with your order ID and estimated delivery details.
        </p>

        <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
        <p className="mb-4">
          You can track your order status via the tracking link sent in the
          confirmation email or by visiting our "Track Order" page.
        </p>

        <h2 className="text-xl font-semibold mb-2">Order Details Changes</h2>
        <p className="mb-4">
          You can modify your order details before it is shipped. Please contact
          our support team immediately with your order ID.
        </p>

        <h2 className="text-xl font-semibold mb-2">Order Cancellation</h2>
        <p>
          You can cancel your order before dispatch. Contact our support team
          with your order ID as soon as possible for cancellation assistance.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment Management",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Payment Options</h2>
        <p className="mb-4">
          We offer <strong>Cash on Delivery (COD)</strong> and{" "}
          <strong>online payments</strong> via debit/credit card. Choose your
          preferred method during checkout.
        </p>

        <h2 className="text-xl font-semibold mb-2">Other Charges</h2>
        <p>
          We do not apply any hidden charges. The final price displayed at
          checkout is the total amount payable.
        </p>
      </>
    ),
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Delivery Charges</h2>
        <p className="mb-4">
          We offer <strong>free delivery all over Pakistan</strong>. Do not pay
          any amount other than the item price to the rider.
        </p>

        <h2 className="text-xl font-semibold mb-2">Delivery Time</h2>
        <p className="mb-4">
          Orders are delivered within <strong>3 to 5 working days</strong>.
          Remote areas may take slightly longer.
        </p>

        <h2 className="text-xl font-semibold mb-2">Delivery Issue</h2>
        <p>
          If your delivery is delayed or missing, contact our support team at{" "}
          <strong>support@zerolifestyle.co</strong> or call our helpline.
        </p>
      </>
    ),
  },
  {
    id: "complaint",
    title: "Complaint Management",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Raise a Complaint</h2>
        <p className="mb-4">
          You can raise a complaint via our support form or email at{" "}
          <strong>complaints@zerolifestyle.co</strong>. Provide your order ID
          and details of the issue.
        </p>

        <h2 className="text-xl font-semibold mb-2">Track Complaint Status</h2>
        <p className="mb-4">
          After submitting a complaint, you will receive a reference number. Use
          it to track the status with our support team.
        </p>

        <h2 className="text-xl font-semibold mb-2">Resolution Time</h2>
        <p>
          Most complaints are resolved within <strong>2–4 working days</strong>.
          We aim to ensure fair and timely resolutions.
        </p>
      </>
    ),
  },
  {
    title: "Product Management",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Product Availability</h2>
        <p className="mb-4">
          Products listed on the website are updated regularly. If a product is
          out of stock, you may choose to be notified when it becomes available.
        </p>

        <h2 className="text-xl font-semibold mb-2">Product Descriptions</h2>
        <p className="mb-4">
          Each product includes detailed specifications, sizing info, and
          images. For clarification, feel free to contact support.
        </p>

        <h2 className="text-xl font-semibold mb-2">Product Reviews</h2>
        <p>
          Read verified customer reviews before making a purchase. You may also
          leave a review after your order is completed.
        </p>
      </>
    ),
  },
  {
    title: "App Management",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
        <p className="mb-4">
          Manage your account details, password, and addresses under the "My
          Account" section in the app.
        </p>

        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
        <p className="mb-4">
          Enable notifications to receive order updates, promotions, and support
          alerts.
        </p>

        <h2 className="text-xl font-semibold mb-2">Preferences</h2>
        <p>
          You can set language, theme, and display preferences in the app’s
          settings.
        </p>
      </>
    ),
  },
  {
    id: "repair",
    title: "Repairing & Replacement",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Repair Policy</h2>
        <p className="mb-4">
          If your item is defective and under warranty, we will offer a free
          repair. Contact support with photos of the issue and your order ID.
        </p>

        <h2 className="text-xl font-semibold mb-2">Replacement Policy</h2>
        <p>
          Products can be replaced within <strong>7 days</strong> of delivery if
          found faulty or damaged. Ensure original packaging is retained.
        </p>
      </>
    ),
  },
  {
    id: "terms",
    title: "Terms & Policies",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Terms of Service</h2>
        <p className="mb-4">
          By using our website or app, you agree to our terms outlined on the
          Terms & Conditions page.
        </p>

        <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
        <p className="mb-4">
          Your personal information is protected under our Privacy Policy and
          not shared with third parties without consent.
        </p>

        <h2 className="text-xl font-semibold mb-2">Return & Refund Policy</h2>
        <p>
          We allow returns/refunds within <strong>7 days</strong> of delivery.
          For refund requests, contact our support team with your order ID.
        </p>
      </>
    ),
  },
  {
    title: "Miscellaneous",
    content: (
      <>
        <h2 className="text-xl font-semibold mb-2">Gift Cards</h2>
        <p className="mb-4">
          We currently do not support gift card purchases or redemptions. Stay
          tuned for future updates.
        </p>

        <h2 className="text-xl font-semibold mb-2">Promotions</h2>
        <p className="mb-4">
          Active discount offers are displayed on banners and product pages. Use
          available coupon codes during checkout.
        </p>

        <h2 className="text-xl font-semibold mb-2">Still Have Questions?</h2>
        <p>
          Contact us via chat, email, or phone and our team will gladly assist
          you.
        </p>
      </>
    ),
  },
];

const Support = () => {
const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const sectionRefs = useRef({});

  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      
      // Find section index by ID
      const sectionIndex = sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        setOpenSection(sectionIndex);
        
        // Scroll after a small delay to allow the section to open
        setTimeout(() => {
          const element = sectionRefs.current[sectionId];
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            
            // Update URL without refresh
            navigate(location.pathname, { replace: true, state: {} });
          }
        }, 100);
      }
    }
  }, [location.state]);

  // Create refs for each section
  useEffect(() => {
    sections.forEach(section => {
      if (section.id) {
        sectionRefs.current[section.id] = document.getElementById(section.id);
      }
    });
  }, []);


  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="py-10 pt-35 px-6 md:px-20 max-w-5xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-8">Support Center</h1>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 text-center">
          {quickLinks.map(({ title, icon: Icon, path }, index) => (
            <div
              key={index}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center p-6 rounded-lg shadow cursor-pointer
                ${
                  location.pathname === path
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 text-gray-700"
                }
                transition-colors duration-300
              `}
            >
              <Icon className="w-14 h-14 mb-2" />
              <p className="text-lg font-semibold">{title}</p>
            </div>
          ))}
        </div>

        {/* Expandable Sections */}
        <div className="max-w-2xl mx-auto">
          {sections.map((section, index) => (
            <div 
              key={index} 
              id={section.id || `section-${index}`}
              ref={el => {
                if (section.id) sectionRefs.current[section.id] = el;
              }}
            >
              <button
                onClick={() => setOpenSection(openSection === index ? null : index)}
                className="w-full flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md text-lg font-semibold"
              >
                {section.title}
                {openSection === index ? (
                  <IoIosArrowUp className="text-xl" />
                ) : (
                  <IoIosArrowDown className="text-xl" />
                )}
              </button>
              {openSection === index && (
                <div className="bg-gray-100 p-4 rounded-lg mt-2 shadow-inner text-sm leading-relaxed">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Support;
