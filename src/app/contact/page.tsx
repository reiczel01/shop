"use client";
import React from "react";
import ContactForm from "./contactForm";

export default function Contact() {
  const openModal = () => {
const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
modal.showModal();
  };
  return (
    <div className="">
      <div className="flex flex-row">
        <div className="m-4 basis-1/4">
          <div className="card w-full bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Biuro:</h2>
              <p>Shopla SC.Linited</p>
              <address>
                <strong>ul.</strong>Brzezińska 5, 92-103 Łódź
              </address>
              <abbr title="Email">
                <strong>Email:</strong>&nbsp;biuro@shopla.pl
              </abbr>
              <abbr title="Phone">
                <strong>Tel:</strong>&nbsp;+48 692 406 692
              </abbr>
              <abbr title="Nip">
                <strong>Nip:</strong>&nbsp;725 111 56 59
              </abbr>
              <abbr title="Regon">
                <strong>Regon:</strong>&nbsp;584 58 00 85
              </abbr>
              <div className="card-actions justify-center">
                <button className="btn" onClick={openModal}>
                  Napisz do nas
                </button>
              </div>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 text-white">
                      ✕
                    </button>
                  </form>
                  <ContactForm />
                </div>
              </dialog>
            </div>
          </div>
        </div>
        <div className="m-4 basis-10/12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2467.722622442934!2d19.503098877817497!3d51.79295557187951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bcb0c5a2de277%3A0x698ce67269a6f08!2zQnJ6ZXppxYRza2EgNSwgOTItMTAzIMWBw7Nkxbo!5e0!3m2!1spl!2spl!4v1701511380649!5m2!1spl!2spl"
            loading="lazy"
            className="h-full w-full rounded-xl"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="stats m-3 w-full bg-neutral shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Zadowolonych klientów</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">Od początku 2023</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Śr. ilość wysyłek</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">
              Wzrost dzienny ↗︎ 40 (2%)
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Nowi urzytkownicy</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">Przyrost dzienny ↗︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="m-4 basis-10/12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78967.17438916878!2d19.42327479762269!3d51.79292674749495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471a3311949620db%3A0x4db586995bcb320!2sCentral%20European%20Logistics%20Hub!5e0!3m2!1spl!2spl!4v1701514187149!5m2!1spl!2spl"
            loading="lazy"
            className="h-full w-full rounded-xl"
          ></iframe>
        </div>
        <div className="m-4 basis-1/3">
          <div className="card w-full bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="card-title">Magazyn główny:</h2>
              <p>Shopla split</p>
              <address>
                <strong>ul.</strong>Tomaszowska/Jędrzejowska, 93-235 Łódź
              </address>
              <abbr title="Email">
                <strong>Email:</strong>&nbsp;magazyn@shopla.pl
              </abbr>
              <abbr title="Phone">
                <strong>Tel. logistyka:</strong>&nbsp;+48 692 406 692
              </abbr>
              <abbr title="Nip">
                <strong>Tel. odbiory:</strong>&nbsp;+48 725 111 56 59
              </abbr>
              <abbr title="Regon">
                <strong>Tel. zarządzanie:</strong>&nbsp;+48 584 58 00 85
              </abbr>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
