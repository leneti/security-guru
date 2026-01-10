"use client";

import { useState } from "react";

interface FormData {
  type: "Namams" | "Verslui";
  name: string;
  city: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    type: "Namams",
    name: "",
    city: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone: string) => {
    // Accept +3706XXXXXXXX or 86XXXXXXXX
    const re = /^(\+3706\d{7}|86\d{8})$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!validateEmail(formData.email)) {
      alert("Prašome įvesti teisingą el. pašto adresą.");
      setStatus("idle");
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Prašome įvesti teisingą lietuviško telefono numerį (+3706XXXXXXX arba 86XXXXXXXX).");
      setStatus("idle");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted to info@securityguru.lt:", formData);
      setStatus("success");
      setFormData({
        type: "Namams",
        name: "",
        city: "",
        email: "",
        phone: "",
        message: ""
      });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-sage/10 border-t border-sage/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-dark mb-4">Susisiekite su mumis</h2>
              <p className="text-gray-600 text-lg font-light">
                Esame pasiruošę atsakyti į visus jūsų klausimus apie saugumo sprendimus.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-sage/20">
                <div className="bg-primary/20 p-3 rounded-lg text-dark">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Telefonai</h4>
                  <p className="text-gray-600 font-mono text-sm mt-1">+370 603 34255</p>
                  <p className="text-gray-600 font-mono text-sm">+370 602 83726</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-sage/20">
                <div className="bg-primary/20 p-3 rounded-lg text-dark">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">El. paštas</h4>
                  <p className="text-gray-600 font-mono text-sm mt-1">info@securityguru.lt</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-sage/20">
                <div className="bg-primary/20 p-3 rounded-lg text-dark">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Darbo laikas</h4>
                  <p className="text-gray-600 text-sm mt-1">I-VII: 09:00 - 21:00</p>
                  <p className="text-sage text-xs font-bold mt-1">DIRBAME SAVAITGALIAIS</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-sage/20">
                <div className="bg-primary/20 p-3 rounded-lg text-dark">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Darbo teritorija</h4>
                  <p className="text-gray-600 text-sm mt-1">Vilniuje ir Vilniaus apskrityje</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-sage/20">
            <h3 className="text-2xl font-bold text-dark mb-6">Užklausos forma</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Sprendimas</label>
                <div className="flex gap-4">
                  {["Namams", "Verslui"].map((type) => (
                    <label
                      key={type}
                      className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-all ${
                        formData.type === type
                          ? "border-primary bg-primary/10 text-dark font-bold"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as "Namams" | "Verslui" }))}
                        className="hidden"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Name and City */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Vardas / Įmonė *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Jūsų vardas"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Miestas *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Vilnius"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    El. paštas *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="vardas@pastas.lt"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                    Tel. Nr. *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="+370 600 00000"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Komentaras *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Aprašykite savo poreikius..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  status === "loading"
                    ? "bg-gray-400 cursor-not-allowed"
                    : status === "success"
                    ? "bg-green-600 text-white"
                    : "bg-dark text-white hover:bg-opacity-90"
                }`}
              >
                {status === "loading"
                  ? "Siunčiama..."
                  : status === "success"
                  ? "✓ Išsiųsta sėkmingai!"
                  : "Siųsti užklausą"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}