"use client";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";

const navigation = [
  { name: "Centro MiPyme", href: "https://centromipyme.com/" },
  { name: "Formadora de héroes", href: "https://formadoradeheroes.org/" },
  { name: "iViewer", href: "http://ascg.uberprototech.com/login" },
  { name: "Contacto", href: "https://www.ascg.mx/contacto/" },
];

const posts = [
  {
    id: 1,
    title: "Potente solución de contabilidad en la nube",
    description:
      "Zoho Books le ofrece cumplimiento fiscal, operaciones bancarias locales, integración con pasarela de pagos y mucho más. Todo lo que necesita para optimizar sus operaciones comerciales y financieras en una sola solución.",
    imageUrl: "/zoho/Icons/cloud-accounting.png",
    color: "#b8d4fb",
  },
  {
    id: 2,
    title: "Colaboración fácil",
    description:
      "Colabore en 360º con sus pares, proveedores, clientes y contadores, en cualquier momento y lugar. Las funciones como el cuadro de chat incorporado y los portales interactivos de clientes y proveedores le ofrecen la máxima eficiencia en la colaboración interdepartamental.",
    imageUrl: "/zoho/Icons/collaboration.png",
    color: "#fbe8ba",
  },
  {
    id: 3,
    title: "Más allá de la contabilidad",
    description:
      "Independientemente de si se trata de la contabilidad principal o del inventario y los impuestos, puede hacerlo todo y mucho más con Zoho Books. Impulse la evolución de las actividades de su empresa con la personalización avanzada, la automatización y las integraciones contextuales, y garantice su cumplimiento en todo momento.",
    imageUrl: "/zoho/Icons/beyond-accounting.png",
    color: "#f7cccc",
  },
  {
    id: 4,
    title: "Interfaz fácil de usar",
    description:
      "Gracias a que se diseñó teniendo en cuenta la experiencia de nuestros usuarios, Zoho Books no requiere de ninguna capacitación. Sumérjase sin ayuda y alterne entre las interfaces de usuario en inglés y español cuando lo desee.",
    imageUrl: "/zoho/Icons/user-friendly.png",
    color: "#c8f0df",
  },
];

const navigationFooter = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/ASConsultingGlobal/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ascgmx/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/ASCGMX",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/asconsultores",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 30 30" {...props}>
          <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCvT3RN0VFM7eAQA3mgrEcjw",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const OPTIONS: EmblaOptionsType = { align: "start" };
const SLIDE_COUNT = 6;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
const SLIDES = [
  {
    title: "Facturación 4.0",
    description:
      "Cree y personalice facturas con CFDI 4.0 y envíelas a sus clientes, en minutos, con Zoh Books.",
    imageUrl: "/zoho/Icons/Iconos-01.png",
    color: "#1D3971",
  },
  {
    title: "Gestión de inventarios",
    description:
      "Cada vez que realiza una venta o compra, Zoho Books actualiza automáticamente su inventario.",
    imageUrl: "/zoho/Icons/Iconos-02.png",
    color: "#FBE8BA",
  },
  {
    title: "Cargar XML",
    description:
      "Descargar CFDI XML desde el SAT e importarlo a Zoho Books fácilmente.",
    imageUrl: "/zoho/Icons/Iconos-03.png",
    color: "#F7CCCC",
  },
  {
    title: "Pagos en línea",
    description:
      "Proporcione un proceso de pago sin complicaciones a sus clientes. Zoho Books se integra con varias pasarelas de pago para garantizar pagos seguros y privados.",
    imageUrl: "/zoho/Icons/Iconos-04.png",
    color: "#F3AD64",
  },
  {
    title: "Banca",
    description:
      "Tenga una experiencia bancaria perfecta con Zoho Books. Administre, correlacione y categorice las transacciones automáticamente.",
    imageUrl: "/zoho/Icons/Iconos-05.png",
    color: "#B8D4FB",
  },
  {
    title: "Generación de informes",
    description:
      "Informes en cada categoría, desde ventas, inventario y compras hasta proyectos y actividades.",
    imageUrl: "/zoho/Icons/Iconos-06.png",
    color: "#C8F0DF",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-blue-900 min-h-screen">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a
              href="#"
              className="-m-1.5 p-1.5 text-white text-xs flex items-center space-x-2"
            >
              <span className="sr-only">ASCG</span>
              <img
                alt=""
                src="/zoho/Logo/logo_as_white.png"
                className="h-8 w-auto"
              />
              <span>Miembro</span>
              <img
                alt=""
                src="/zoho/Logo/logo-SMS-blanco.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-100"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="https://www.ascg.mx"
              className="text-sm font-semibold leading-6 text-gray-100"
            >
              Volver a ASCG <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="/zoho/Logo/logo_as_white.png"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-blue-400/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-50"
                  >
                    Volver a ASCG
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <div className="relative isolate h-screen overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-blue-900 shadow-xl shadow-blue-600/10 ring-1 ring-blue-800 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:gap-x-16 lg:gap-y-6 flex flex-row items-end">
            <img
              alt=""
              src="/zoho/Images/Zoho-books-home_hero.png"
              className="w-full max-w-2xl object-cover absolute left-0 bottom-0"
            />
            <div className="relative w-full flex flex-col items-end basis-full">
              <div className="max-w-2xl lg:space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-100 text-right sm:text-5xl">
                  El software contable perfecto para su empresa
                </h1>
                <h2 className="text-4xl font-bold tracking-tight text-gray-100 text-right sm:text-6xl">
                  Zoho Books
                </h2>
              </div>
              <div className="mt-2 max-w-xl lg:mt-0">
                <div className="mt-4 lg:mt-10 flex justify-end items-center gap-x-6">
                  <img
                    alt=""
                    src="/zoho/Logo/Zoho+ASCG.png"
                    className="w-2/3 lg:w-full max-w-sm object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-blue-900 sm:h-32" />
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
              ¿Por qué hacer de Zoho Books su software contable preferido?
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-4 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className={clsx(
                  "flex flex-col items-start justify-between rounded-lg px-4 py-2"
                )}
                style={{ backgroundColor: post.color }}
              >
                <div className="max-w-xl">
                  <div className="group relative">
                    <h3 className="mt-3 text-base font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0" />
                      {post.title}
                    </h3>
                    <p className="mt-5 text-xs leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                </div>
                <div className="relative w-full">
                  <img
                    alt=""
                    src={post.imageUrl}
                    className="w-2/3 rounded-2xl object-contain ml-auto -mb-2 -mr-2"
                  />
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="mt-6 text-base leading-8 text-gray-600">
              Zoho Books está listo y equipado para apoyar a las empresas
              mexicanas en el cumplimiento de las leyes fiscales locales y
              cumple con las normas de facturación electrónica.
            </p>
            <div className="relative w-full mt-4">
              <img
                alt=""
                src="/zoho/Logo/ISOs.png"
                className="w-2/3 rounded-2xl object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl">
              ¿Sabía que Zoho Books está listo para la Facturación Electrónica
              4.0 y la DIOT?
            </h2>
            <p className="mt-3 text-base leading-8 text-gray-50">
              Zoho Books está listo y equipado para apoyar a las empresas
              mexicanas en el cumplimiento de las leyes fiscales locales y
              cumple con las normas de facturación electrónica.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-full bg-green-600 px-6 py-3 text-xl font-semibold text-green-50 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Contáctenos
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 " />
        <div className="mx-auto">
          <div className="relative shadow-xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                alt="People working on laptops"
                src="/zoho/Images/woman-as-consulting-group.jpg"
                className="h-full w-full object-cover"
              />
              {/* <div className="absolute inset-0 bg-blue-900 mix-blend-multiply" /> */}
            </div>
            <div className="relative px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">
                  Está a solo un clic de encontrar el software
                </span>
                <span className="block text-blue-200">
                  contable perfecto para su empresa.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-blue-100 sm:max-w-3xl">
                Obtén una asesoría sin costo y una prueba gratuita de 15 días
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto">
                  <a
                    href="https://www.zoho.com/es-mx/books"
                    className="flex items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                  >
                    COMIENCE A USAR ZHOHO BOOKS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer aria-labelledby="footer-heading" className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-6">
              <a
                href="#"
                className="text-white text-xs flex items-center space-x-2 -ml-2"
              >
                <span className="sr-only">ASCG</span>
                <img
                  alt=""
                  src="/zoho/Logo/logo_as_white.png"
                  className="h-8 w-auto"
                />
                <span>Miembro</span>
                <img
                  alt=""
                  src="/zoho/Logo/logo-SMS-blanco.png"
                  className="h-8 w-auto"
                />
              </a>
              <img
                alt="Red SMS Latinoamérica"
                src="/zoho/Logo/sms_latam.png"
                className="h-16 w-auto -ml-4"
              />
              <p className="text-sm leading-6 text-slate-300">
                Estamos en 21 países y estamos cerca.
              </p>
              <div className="flex space-x-6">
                {navigationFooter.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-500 hover:text-slate-400"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon aria-hidden="true" className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Dirección
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li className="text-sm leading-6 text-slate-300">
                      Obrero Mundial 644, Col. Atenor Salas, CDMX, 03010 México
                    </li>
                    <li className="text-sm leading-6 text-slate-300">
                      Calzada del Valle 255, Piso 2 Col. del Valle, San Pedro
                      Garza García, Monterrey, N.L. 66220 México
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Teléfonos
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href={"tel:+52 55 5859 4873"}
                        className="text-sm leading-6 text-slate-300 hover:text-white"
                      >
                        +52 55 5859 4873
                      </a>
                    </li>
                    <li>
                      <a
                        href={"tel:+52 55 5840 4611"}
                        className="text-sm leading-6 text-slate-300 hover:text-white"
                      >
                        +52 55 5840 4611
                      </a>
                    </li>
                    <li>
                      <a
                        href={"tel:+52 55 5859 9296"}
                        className="text-sm leading-6 text-slate-300 hover:text-white"
                      >
                        +52 55 5859 9296
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">
                    Email
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    <li>
                      <a
                        href={"contacto@ascg.mx"}
                        className="text-sm leading-6 text-slate-300 hover:text-white"
                      >
                        contacto@ascg.mx
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
            <p className="text-xs leading-5 text-slate-400">
              COPYRIGHT &copy; 2018-{new Date().getFullYear()} AS Consulting
              Goup -{" "}
              <a
                className="text-blue-500"
                href="https://www.ascg.mx/aviso-de-privacidad/"
              >
                Aviso de privacidad
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
