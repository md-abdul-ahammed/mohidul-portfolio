"use client";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../AnimatedButtons";
import AnimatedDropdown from "../AnimatedDropdown";
import Lottie from "lottie-react";
import animationData from "/public/contact.json";
import { API_ENDPOINTS } from "@/config/api";

const LetsTalk = ({ defaultTabValue }) => {
  const [dropdownData, setDropdownData] = useState({
    projects: [],
    budgets: []
  });
  const [loading, setLoading] = useState(true);

  // Fetch dropdown data from API
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FORM_DROPDOWN);
        const data = await response.json();

        if (data.success) {
          setDropdownData({
            projects: data.projects,
            budgets: data.budgets
          });
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
  }, []);
  // Convert API data to AnimatedDropdown format
  const projectOptions = dropdownData.projects.map(project => ({
    value: project.id.toString(),
    label: project.project_name
  }));

  const budgetOptions = dropdownData.budgets.map(budget => ({
    value: budget.id.toString(),
    label: budget.amount
  }));
  const [value, setValue] = useState();
  const [activeTab, setActiveTab] = useState(defaultTabValue || "project");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    project: "",
    budget: "",
    details: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fade up animation variants
  const fadeUpVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle dropdown changes
  const handleDropdownChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle phone number change
  const handlePhoneChange = (phoneValue) => {
    setValue(phoneValue);
    setFormData(prev => ({
      ...prev,
      phone: phoneValue || ""
    }));
  };

  // Handle form submission - CORS FIXED VERSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkbox = document.getElementById("helper-checkbox");
    if (!checkbox.checked) {
      setMessage("Please agree before submitting.");
      return;
    }

    // Basic validation
    if (!formData.full_name || !formData.email || !formData.phone) {
      setMessage("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // CORS fix: Try without Content-Type header first
      const response = await fetch(API_ENDPOINTS.SUBMIT_FORM, {
        method: "POST",
        // Remove Content-Type header to avoid CORS preflight
        headers: {
          "Accept": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Form submitted successfully!");
        // Reset form
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          company: "",
          project: "",
          budget: "",
          details: ""
        });
        setValue("");
      } else {
        setMessage("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      // Cleanup timer on component unmount or when message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="md:mx-2">
      <div className="px-4 pt-12 md:px-4 lg:px-6 md:pt-16 lg:pt-32 md:max-w-[1444px] mx-auto md:border-x border-b border-[#D3D8DF]">
        <div className="md:flex mb-8 w-full">
          <div className="pb-0">
            <motion.h1
              className="text-[#66656A] text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-2"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Have an <span className="text-[#1D1C1F]">MVP</span> Idea?
            </motion.h1>

            <motion.h1
              className="text-[28px] md:text-3xl lg:text-4xl xl:text-5xl font-medium"
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Schedule a Google Meet or <br /> Zoom Call
            </motion.h1>
          </div>

          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '300px', height: 'auto' }}
            className="hidden md:flex relative md:left-[10%] lg:left-[20%] xl:left-[30%] 2xl:left-[37%] md:top-[30px] lg:top-[50px] md:w-[220px] lg:w-[250px] xl:w-[280px] 2xl:w-[300px]"
          />
        </div>

        {/* Mobile Lottie - below text, pointing to Book a Meeting button */}
        <motion.div
          className="md:hidden mb-4 flex items-start justify-start"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: '250px', height: 'auto' }}
            className="transform scale-x-[-1]"
          />
        </motion.div>

        {/* Message Display */}
        {message && (
          <div className={`mb-4 p-4 rounded ${message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message}
          </div>
        )}

        {/* -------- Mobile (stacked) -------- */}
        <motion.div
          className="md:hidden w-full mx-auto"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {/* Header (two columns) */}
          <div className="grid grid-cols-2 text-center">
            <div
              className={`py-4 md:py-5 border border-[#D3D8DF] text-lg md:text-2xl font-medium cursor-pointer transition-all duration-300 ${activeTab === "project"
                ? "bg-[#34C779]"
                : "bg-white hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab("project")}
            >
              Project Request
            </div>
            <div
              className={`py-4 md:py-5 border border-[#D3D8DF] text-lg md:text-2xl font-medium cursor-pointer transition-all duration-300 ${activeTab === "meeting"
                ? "bg-[#34C779]"
                : "bg-white hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab("meeting")}
            >
              Book a Meeting
            </div>
          </div>

          {/* Body */}
          <div className="border border-[#D3D8DF] border-t-0">
            {activeTab === "project" ? (
              /* Project Request Form */
              <form onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="border-b border-[#D3D8DF]">
                  <div className="py-4 px-6 md:py-8 md:px-10 border-b border-[#D3D8DF]">
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Full name*"
                      className="w-full outline-none"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="py-4 px-6 md:py-8 md:px-10">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address*"
                      className="w-full outline-none"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="border-b border-[#D3D8DF]">
                  <div className="py-4 px-6">
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      defaultCountry="BD"
                      value={value}
                      onChange={handlePhoneChange}
                      placeholder="Enter phone number"
                      className="w-full outline-none"
                    />
                  </div>
                  <div className="py-4 px-6">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company name"
                      className="w-full outline-none"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="border-b border-[#D3D8DF]">
                  <div className="py-4 px-6 md:py-8 md:px-10 border-b border-[#D3D8DF]">
                    <AnimatedDropdown
                      label="Service required*"
                      options={projectOptions}
                      required={true}
                      onSelect={(value) => handleDropdownChange("project", value)}
                    />
                  </div>
                  <div className="py-4 px-6 md:py-8 md:px-10">
                    <AnimatedDropdown
                      label="Project budget"
                      options={budgetOptions}
                      onSelect={(value) => handleDropdownChange("budget", value)}
                    />
                  </div>
                </div>

                {/* Row 5 */}
                <div className="h-[100px] border-[#D3D8DF] p-4">
                  <textarea
                    placeholder="Project details*"
                    className="w-full h-full resize-none outline-none"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Row 6 */}
                <div className="p-4 md:py-6 md:px-10 border-t border-[#D3D8DF]">
                  <div className="flex flex-col justify-between items-start gap-4">
                    <label
                      htmlFor="helper-checkbox-m"
                      className="flex gap-2 cursor-pointer"
                    >
                      <input
                        id="helper-checkbox-m"
                        type="checkbox"
                        className="w-5 h-5 text-[#66656A] bg-white border-[#66656A] focus:ring-[#66656A]"
                        required
                      />
                      <span className="text-base md:text-lg font-medium">
                        Your email address is kept strictly confidential and
                        will never be shared with third-party websites.
                      </span>
                    </label>
                    <button className="w-full md:w-auto" type="submit" disabled={isLoading}>
                      <AnimatedButton
                        textColor="white"
                        label={isLoading ? "Submitting..." : "Submit the Request"}
                        className="py-4 px-6 w-full bg-[#34C779] text-[15px] md:text-lg font-medium cursor-pointer disabled:opacity-50"
                      />
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div 
                className="w-full h-screen bg-white"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  colorScheme: 'light'
                }}
              >
                <iframe
                  src="https://cal.com/thisismohidul/30min?theme=light&embed=true&overlayCalendar=true&brandColor=%23000000&lightMode=%23FFFFFF"
                  className="w-full h-screen border-0"
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    colorScheme: 'light',
                    background: '#FFFFFF'
                  }}
                  title="Book a meeting"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* -------- Desktop / Tablet (table layout) -------- */}
        <motion.div
          className="hidden md:block w-full mx-auto"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <table className="w-full border border-gray-300">
            <thead className="text-center">
              <tr>
                <th
                  className={`w-1/2 md:py-4 lg:py-5 border border-[#D3D8DF] md:text-xl lg:text-2xl font-medium cursor-pointer transition-all duration-300 ${activeTab === "project"
                    ? "bg-[#34C779]"
                    : "bg-white hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("project")}
                >
                  Project Request
                </th>
                <th
                  className={`w-1/2 md:py-4 lg:py-5 border border-[#D3D8DF] md:text-xl lg:text-2xl font-medium cursor-pointer transition-all duration-300 ${activeTab === "meeting"
                    ? "bg-[#34C779]"
                    : "bg-white hover:bg-gray-50"
                    }`}
                  onClick={() => setActiveTab("meeting")}
                >
                  Book a Meeting
                </th>
              </tr>
            </thead>
            <tbody>
              {activeTab === "project" ? (
                /* Project Request Form - WITHOUT FORM TAG INSIDE TABLE */
                <>
                  {/* Row 1 */}
                  <tr>
                    <td className="md:py-5 lg:py-8 md:px-5 lg:px-10 border border-[#D3D8DF]">
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Full name*"
                        className="outline-none w-full"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                    <td className="md:py-5 lg:py-8 md:px-5 lg:px-10 border border-[#D3D8DF]">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address*"
                        className="outline-none w-full"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td className="md:py-5 lg:py-8 md:px-5 lg:px-10 border border-[#D3D8DF]">
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        defaultCountry="BD"
                        value={value}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        className="outline-none w-full"
                      />
                    </td>
                    <td className="md:py-5 lg:py-8 md:px-5 lg:px-10 border border-[#D3D8DF]">
                      <input
                        type="text"
                        name="company"
                        placeholder="Company name"
                        className="outline-none w-full"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td className="md:py-5 lg:py-8 md:px-5 lg:px-10 border border-[#D3D8DF]">
                      <AnimatedDropdown
                        label="Service required*"
                        options={projectOptions}
                        required={true}
                        onSelect={(value) => handleDropdownChange("project", value)}
                      />
                    </td>

                    <td className="md:py-5 lg:py-8 md:px-5 lg:px-10 border border-[#D3D8DF]">
                      <AnimatedDropdown
                        label="Project budget"
                        options={budgetOptions}
                        onSelect={(value) => handleDropdownChange("budget", value)}
                      />
                    </td>
                  </tr>

                  {/* Row 5 */}
                  <tr>
                    <td
                      colSpan="2"
                      className="align-top md:h-[120px] lg:h-[150px] md:py-5 lg:py-8 md:px-5 lg:px-10 py border border-[#D3D8DF]"
                    >
                      <textarea
                        placeholder="Project details*"
                        className="w-full h-full resize-none outline-none"
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>

                  {/* Row 6 */}
                  <tr>
                    <td
                      colSpan="2"
                      className="md:py-4 lg:py-6 md:px-5 lg:px-10 border border-[#D3D8DF]"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <label
                          htmlFor="helper-checkbox"
                          className="flex items-start gap-2 cursor-pointer"
                        >
                          <input
                            id="helper-checkbox"
                            type="checkbox"
                            className="mt-1.5 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                            required
                          />
                          <span className="md:text-base lg:text-lg font-medium md:w-[280px] lg:w-[434px]">
                            Your email address is kept strictly confidential and
                            will never be shared with third-party websites.
                          </span>
                        </label>
                        <button type="button" onClick={handleSubmit} disabled={isLoading}>
                          <AnimatedButton
                            textColor="white"
                            label={isLoading ? "Submitting..." : "Submit the Request"}
                            className="py-4 px-6 bg-[#34C779] md:text-base lg:text-lg font-medium cursor-pointer disabled:opacity-50"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ) : (
                /* Cal.com Meeting Booking - Full width */
                <tr>
                  <td colSpan="2" className="border border-[#D3D8DF]">
                    <div 
                      className="w-full h-screen bg-white"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        colorScheme: 'light'
                      }}
                    >
                      <iframe
                        src="https://cal.com/thisismohidul/30min?theme=light&embed=true&overlayCalendar=true&brandColor=%23000000&lightMode=%23FFFFFF"
                        className="w-full h-screen border-0"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          colorScheme: 'light',
                          background: '#FFFFFF'
                        }}
                        title="Book a meeting"
                        loading="lazy"
                      />
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default LetsTalk;