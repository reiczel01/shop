"use client";
import React, { useEffect, useState } from "react";

export default function ContactForm() {
  const [emailUser, setEmailUser] = useState(""); // Stan przechowujący wprowadzony adres e-mail użytkownika
  const [subject, setSubject] = useState(""); // Stan przechowujący wprowadzony temat wiadomości
  const [message, setMessage] = useState(""); // Stan przechowujący wprowadzoną treść zapytania

  const handleEmailClick = () => {
    const email = "biuro@shopla.pl"; // Adres e-mail, na który chcesz wysłać zapytanie
    const body = `Treść zapytania:\n${message}\n\nDane kontaktowe użytkownika:\nEmail: ${emailUser}\nTemat: ${subject}`; // Treść wiadomości e-mail z dodanymi danymi użytkownika

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink);
  };

  return (
    <div>
      <form className="my-3 flex flex-col items-center text-white">
        <div className="mb-3 text-xl font-medium">Formularz kontaktowy</div>
        {/* Pole tekstowe dla adresu e-mail */}
        <input
          type="email"
          placeholder="Email"
          required
          className="input input-bordered m-3 w-full max-w-xs"
          value={emailUser}
          onChange={(e) => setEmailUser(e.target.value)}
        />
        {/* Pole tekstowe dla tematu wiadomości */}
        <input
          type="text"
          placeholder="Temat"
          required
          className="input input-bordered m-3 w-full max-w-xs"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        {/* Pole tekstowe wielowierszowe dla treści zapytania */}
        <textarea
          placeholder="Treść zapytania..."
          required
          className="textarea textarea-bordered m-3 w-full max-w-xs"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        {/* Przycisk do wysyłania e-maila */}
        <button type="button" className="btn" onClick={handleEmailClick}>
          Napisz do nas
        </button>
        <p className="pt-4 text-xs">
          Naciśnij ESC albo guzik nad, by zamknąć okno.
        </p>
      </form>
    </div>
  );
}
