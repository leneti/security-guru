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

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    type: "Namams",
    name: "",
    city: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone: string) => {
    // Accept +3706XXXXXXXX or 86XXXXXXXX
    const re = /^(\+3706\d{7}|86\d{8})$/;
    return re.test(phone.replace(/\s/g, ""));
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
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="border-t border-sage/20 bg-sage/10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-4xl font-bold text-dark">Susisiekite su mumis</h2>
              <p className="text-lg font-light text-gray-600">
                Esame pasiruošę atsakyti į visus jūsų klausimus apie saugumo sprendimus.
              </p>
            </div>

            <div className="space-y-2 md:space-y-6">
              <div className="flex items-center gap-4 rounded-xl border border-sage/20 bg-white p-4 shadow-sm md:p-6">
                <div className="rounded-lg bg-primary/20 p-3 text-dark">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Telefonai</h4>
                  <span className="mt-1 font-mono text-sm text-gray-600">+370 603 34255</span>
                  <span role="separator" className="font-mono text-sm text-gray-600">
                    {" "}
                    |{" "}
                  </span>
                  <span className="font-mono text-sm text-gray-600">+370 602 83726</span>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-sage/20 bg-white p-4 shadow-sm md:p-6">
                <div className="rounded-lg bg-primary/20 p-3 text-dark">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">El. paštas</h4>
                  <p className="mt-1 font-mono text-sm text-gray-600">info@securityguru.lt</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-sage/20 bg-white p-4 shadow-sm md:p-6">
                <div className="rounded-lg bg-primary/20 p-3 text-dark">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Darbo laikas</h4>
                  <p className="mt-1 text-sm text-gray-600">I-VII: 09:00 - 21:00</p>
                  <p className="mt-1 text-xs font-bold text-sage">DIRBAME SAVAITGALIAIS</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-xl border border-sage/20 bg-white p-4 shadow-sm md:p-6">
                <div className="rounded-lg bg-primary/20 p-3 text-dark">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-dark">Darbo teritorija</h4>
                  <p className="mt-1 text-sm text-gray-600">Vilniuje ir Vilniaus apskrityje</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-sage/20 bg-white p-8 shadow-xl">
            <h3 className="mb-6 text-2xl font-bold text-dark">Užklausos forma</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <fieldset>
                <legend className="mb-2 block text-sm font-bold text-gray-700">Sprendimas</legend>
                <div className="flex gap-4">
                  {["Namams", "Verslui"].map((type) => (
                    <label
                      key={type}
                      className={`flex-1 cursor-pointer rounded-lg border p-3 text-center transition-all ${
                        formData.type === type
                          ? "border-primary bg-primary/10 font-bold text-dark"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            type: e.target.value as "Namams" | "Verslui",
                          }))
                        }
                        className="hidden"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Name and City */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-xs font-bold text-gray-500 uppercase"
                  >
                    Vardas / Įmonė *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none"
                    placeholder="Jūsų vardas"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="mb-1 block text-xs font-bold text-gray-500 uppercase"
                  >
                    Miestas *
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none"
                    placeholder="Vilnius"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-xs font-bold text-gray-500 uppercase"
                  >
                    El. paštas *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none"
                    placeholder="vardas@pastas.lt"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-xs font-bold text-gray-500 uppercase"
                  >
                    Tel. Nr. *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none"
                    placeholder="+370 600 00000"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-xs font-bold text-gray-500 uppercase"
                >
                  Komentaras *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:outline-none"
                  placeholder="Aprašykite savo poreikius..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full rounded-lg py-4 text-lg font-bold transition-all ${
                  status === "loading"
                    ? "cursor-not-allowed bg-gray-400"
                    : status === "success"
                      ? "bg-green-600 text-white"
                      : "hover:bg-opacity-90 bg-midnight text-white"
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
