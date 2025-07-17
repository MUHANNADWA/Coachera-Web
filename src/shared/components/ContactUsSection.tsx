import React, { useState } from "react";
import Input from "./Input";
import { Button } from "./Button";

const ContactUsSection: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle sending the form data to your backend or email service
  };

  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-hidden">
      {/* Decorative background accent */}
      <div>
        <div className="py-20 px-6 md:px-20 relative z-10">
          <div className="consect max-w-4xl mx-auto p-8 md:p-14 flex flex-col md:flex-row gap-12">
            <div className="flex-1 flex flex-col justify-center">
              <h2
                id="contact-heading"
                className="text-4xl md:text-5xl font-extrabold mb-4 text-primary-lg tracking-tight">
                Contact Us
              </h2>
              <p className="mb-8 text-lg text-gray-700 font-medium">
                Have questions or feedback? Fill out the form and our team will
                get back to you soon.
              </p>
              {submitted ? (
                <div className="text-green-600 font-semibold text-lg animate-fade-in">
                  Thank you for reaching out! We'll be in touch soon.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-label="Contact form">
                  <Input
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Your Name"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="block w-full rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary focus:bg-primary-lightest/40 outline-none p-3 text-base transition resize-none min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" variant="primary" full>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
