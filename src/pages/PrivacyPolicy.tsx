import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  TbTargetArrow, TbUsers, TbDatabase, TbFileText, TbShare, TbScale, TbClock, TbShieldCheck, TbCookie, TbUserCheck, TbWorld, TbRobot, TbRefresh, TbList, TbCheck, TbMail
} from "react-icons/tb";

const policySections = [
  {
    id: "objective",
    title: "1. Objective and Scope",
    icon: <TbTargetArrow size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>
          <strong>1.1.</strong> This document aims to detail the CONTRACTOR's commitments regarding the privacy and protection of personal data processed within the provision of services and licensing of the Astenir Platform ("Platform"), in strict compliance with the General Data Protection Law (Law No. 13.709/2018 - "LGPD") and other applicable legislation.
        </p>
        <p>
          <strong>1.2.</strong> This document applies to all personal data processed by the CONTRACTOR, whether as a Processor or as a Controller.
        </p>
        <p className="flex items-center gap-2">
          <strong>1.3.</strong> The Data Protection Officer (DPO) can be contacted via email: <a href="mailto:dpo@astenir.com" className="text-primary hover:underline">dpo@astenir.com</a>.
        </p>
      </div>
    ),
  },
  {
    id: "roles",
    title: "2. Roles in Data Processing",
    icon: <TbUsers size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p><strong>2.1. As defined in the Main Contract:</strong></p>
        <ul className="list-disc pl-5 space-y-2">
          <li>The CONTRACTING PARTY will act as the Controller of personal data of its clients, leads, prospects, and end users.</li>
          <li>The CONTRACTOR will act as Processor regarding this data.</li>
        </ul>
        <p className="mt-2"><strong>2.2. The CONTRACTOR will act as Controller regarding:</strong></p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Registration and contact data for contract management, billing, support, and communication.</li>
          <li>Personal data collected through its own website, contact forms, newsletters, and events.</li>
          <li>Data of its own employees and partners.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "collection",
    title: "3. Data Collection and Types",
    icon: <TbDatabase size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>
          <strong>3.1. As Processor:</strong> The Platform may process end user identification data, message content, location data, interaction metadata, and attendant data.
        </p>
        <div className="overflow-x-auto border rounded-lg border-slate-200 dark:border-darkmode-400 mt-2">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-darkmode-800 font-medium text-slate-700 dark:text-slate-200">
              <tr>
                <th className="p-3 border-b dark:border-darkmode-400">Data Category</th>
                <th className="p-3 border-b dark:border-darkmode-400">Collection Source</th>
                <th className="p-3 border-b dark:border-darkmode-400">Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:border-darkmode-400">
                <td className="p-3">Directly Provided</td>
                <td className="p-3">Registration</td>
                <td className="p-3">Name, email, Tax ID, phone</td>
              </tr>
              <tr className="border-b dark:border-darkmode-400">
                <td className="p-3">Automatically Collected</td>
                <td className="p-3">Website/Platform</td>
                <td className="p-3">Device ID, OS, browser, IP</td>
              </tr>
              <tr>
                <td className="p-3">From Third Parties</td>
                <td className="p-3">Partners</td>
                <td className="p-3">Leads, opportunities</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          <strong>3.3. Sensitive Data:</strong> Only processed if the CONTRACTING PARTY guarantees adequate legal basis and informs about the sensitive nature.
        </p>
      </div>
    ),
  },
  {
    id: "purposes",
    title: "4. Data Processing Purposes",
    icon: <TbFileText size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <div>
          <strong className="block mb-2 text-slate-700 dark:text-slate-200">4.1. As Processor:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Enable Smart Contacts (Chatbots) creation and management</li>
            <li>Enable communication between parties through the Platform</li>
            <li>Store interaction history and configurations</li>
            <li>Provide technical support and maintenance</li>
            <li>Generate usage and performance reports</li>
          </ul>
        </div>
        <div>
          <strong className="block mb-2 text-slate-700 dark:text-slate-200">4.2. As Controller:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Operational:</strong> Registration, payments, access, support</li>
            <li><strong>Marketing:</strong> Newsletters, promotions, events</li>
            <li><strong>Improvement:</strong> Surveys, usage analysis, new products</li>
            <li><strong>Security:</strong> Fraud prevention, audits</li>
            <li><strong>Compliance:</strong> Legal obligations, court orders</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "sharing",
    title: "5. Data Sharing",
    icon: <TbShare size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p><strong>5.1. As Processor:</strong> Data is not shared except with authorized sub-processors (AWS, Google Cloud, DigitalOcean) or by court order.</p>
        <p><strong>5.2. As Controller:</strong> May share with economic group companies, business partners, specialized providers, government authorities, or with specific consent.</p>
      </div>
    )
  },
  {
    id: "legal",
    title: "6. Legal Basis for Processing",
    icon: <TbScale size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>All processing is based on LGPD legal bases:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Contract Execution",
            "Data Subject Consent",
            "Legal Obligation",
            "Legitimate Interest",
            "Regular Exercise of Rights",
            "Protection of Life",
            "Credit Protection",
            "Fraud Prevention"
          ].map((item) => (
            <div key={item} className="bg-slate-50 dark:bg-darkmode-700 p-3 rounded border border-slate-100 dark:border-darkmode-400 text-xs font-medium text-slate-700 dark:text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "retention",
    title: "7. Data Retention Period",
    icon: <TbClock size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p><strong>7.1. As Processor:</strong> Retained while the Main Contract is in effect. After termination, data is deleted or returned except for mandatory legal retention.</p>
        <p><strong>7.2. As Controller:</strong> Retained only for the necessary time, considering limitation periods, legal obligations, and defense interests. Account data may be deleted after 6 months of inactivity.</p>
      </div>
    )
  },
  {
    id: "security",
    title: "8. Information Security",
    icon: <TbShieldCheck size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>Robust technical, physical, and organizational measures:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-md border-slate-100 dark:border-darkmode-400 bg-white dark:bg-darkmode-700">
            <h4 className="font-medium text-primary">Encryption</h4>
            <span className="text-xs text-slate-500">HTTPS/TLS 1.2+ and AES-256</span>
          </div>
          <div className="p-4 border rounded-md border-slate-100 dark:border-darkmode-400 bg-white dark:bg-darkmode-700">
            <h4 className="font-medium text-primary">Access Controls</h4>
            <span className="text-xs text-slate-500">MFA and RBAC</span>
          </div>
          <div className="p-4 border rounded-md border-slate-100 dark:border-darkmode-400 bg-white dark:bg-darkmode-700">
            <h4 className="font-medium text-primary">Monitoring</h4>
            <span className="text-xs text-slate-500">Continuous activity detection</span>
          </div>
          <div className="p-4 border rounded-md border-slate-100 dark:border-darkmode-400 bg-white dark:bg-darkmode-700">
            <h4 className="font-medium text-primary">Network Security</h4>
            <span className="text-xs text-slate-500">Firewalls, IPS/IDS</span>
          </div>
          <div className="p-4 border rounded-md border-slate-100 dark:border-darkmode-400 bg-white dark:bg-darkmode-700">
            <h4 className="font-medium text-primary">Backups</h4>
            <span className="text-xs text-slate-500">Daily incremental backups</span>
          </div>
          <div className="p-4 border rounded-md border-slate-100 dark:border-darkmode-400 bg-white dark:bg-darkmode-700">
            <h4 className="font-medium text-primary">Compliance</h4>
            <span className="text-xs text-slate-500">ISO 27001, 27701, SOC 2</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "cookies",
    title: "9. Cookies and Tracking Technologies",
    icon: <TbCookie size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-slate-700 dark:text-slate-200">Essential:</strong> Necessary for basic operation (login, navigation)</li>
          <li><strong className="text-slate-700 dark:text-slate-200">Performance:</strong> Collect anonymous usage information</li>
          <li><strong className="text-slate-700 dark:text-slate-200">Functionality:</strong> Remember user choices</li>
          <li><strong className="text-slate-700 dark:text-slate-200">Marketing:</strong> Direct relevant advertising</li>
        </ul>
        <p className="mt-2 text-sm">Users can manage preferences through browser settings or cookie consent panel.</p>
      </div>
    )
  },
  {
    id: "rights",
    title: "10. Data Subject Rights",
    icon: <TbUserCheck size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>Data subjects have the following LGPD rights:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[
            "Confirmation of processing",
            "Access to data",
            "Data correction",
            "Anonymization/deletion",
            "Data portability",
            "Consent revocation",
            "Opposition to processing",
            "ANPD complaint"
          ].map((right) => (
            <div key={right} className="border-b py-2 border-slate-100 dark:border-darkmode-400 flex items-center">
              <TbCheck className="w-4 h-4 mr-2 text-primary" />
              {right}
            </div>
          ))}
        </div>
        <p className="mt-2 font-medium">
          Exercise rights by contacting <a href="mailto:dpo@astenir.com" className="text-primary hover:underline">dpo@astenir.com</a>.
        </p>
      </div>
    )
  },
  {
    id: "international",
    title: "12. International Data Transfer",
    icon: <TbWorld size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>Data may be stored on servers in Brazil or abroad (US, EU). Compliance is ensured through:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Transfer to countries with adequate protection levels</li>
          <li>Standard contractual clauses approved by ANPD</li>
          <li>Specific consent from the data subject</li>
        </ul>
      </div>
    )
  },
  {
    id: "ai",
    title: "13. Privacy and Security in AI",
    icon: <TbRobot size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>AI resources are developed with privacy and security "by design" principles.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Data is not shared for training external AI models without consent</li>
          <li>Generative AI (e.g., OpenAI) operates with input data deletion after response</li>
          <li>ML models can be account-specific or generic (anonymized)</li>
        </ul>
      </div>
    )
  },
  {
    id: "updates",
    title: "14. Policy Updates",
    icon: <TbRefresh size={24} />,
    content: (
      <div className="flex flex-col gap-4 text-slate-600 dark:text-slate-400">
        <p>This document may be updated periodically. Relevant changes will be communicated via email, Platform notice, or Document Center.</p>
        <p>Material changes requiring new consent will be requested.</p>
      </div>
    )
  }
];

function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(policySections[0].id);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of policySections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full py-12 background relative min-h-screen before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed after:content-[''] after:h-[370px] after:ease-in-out after:duration-300 after:top-0">
      <div className="max-w-7xl mx-auto mb-10 relative z-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-y-10 gap-x-10 items-start">
        <div className="col-span-12 xl:col-span-3 order-2 xl:order-1 relative">
          <div className="sticky top-24">
            <div className="p-4 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm fixed">
              <div className="pb-4 mb-2 border-b border-slate-100 dark:border-darkmode-400">
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <TbList className="w-5 h-5 text-primary" />
                  Quick Navigation
                </h3>
              </div>
              <nav className="flex flex-col gap-1">
                {policySections.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={clsx([
                        "flex items-center py-2.5 px-3 text-left text-sm rounded-md transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary font-medium shadow-sm"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-darkmode-400",
                      ])}
                    >
                      <span className="truncate">{item.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-9 order-1 xl:order-2 flex flex-col gap-y-6">
          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Astenir Platform Privacy Policy
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                VERSION 2.0
              </span>
            </div>

            <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-6 flex items-center gap-2">
              <TbClock size={14} /> Last updated: January 2025
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-darkmode-400 pt-5">
              This Data Protection Policy is part of the Software License and Service Agreement ("Main Contract") entered into between ASTENIR DIGITAL SERVICES LTD ("CONTRACTOR" or "Astenir") and the CLIENT ("CONTRACTING PARTY").
            </p>
          </div>

          {policySections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm scroll-mt-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {section.title}
                </h2>
              </div>

              <div className="text-sm leading-7 text-slate-600 dark:text-slate-400 pl-1">
                {section.content}
              </div>
            </div>
          ))}

          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TbMail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Data Protection Officer (DPO)</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Astenir DPO Team</p>
              </div>
              <div className="ml-auto pl-[52px]">
                <a href="mailto:dpo@astenir.com" className="text-primary hover:underline text-sm font-medium">dpo@astenir.com</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;