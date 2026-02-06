import { TbFileDescription, TbMail, TbClock, TbTrash, TbAlertTriangle, TbHelpCircle, TbCheck } from "react-icons/tb";

function DeleteDataPolicy() {
  return (
    <div className="w-full py-12 background relative min-h-screen before:h-[370px] before:w-screen before:bg-gradient-to-t before:from-theme-1/80 before:to-theme-2 [&.background--hidden]:before:opacity-0 before:transition-[opacity,height] before:ease-in-out before:duration-300 before:top-0 before:fixed after:content-[''] after:h-[370px] after:w-screen [&.background--hidden]:after:opacity-0 after:transition-[opacity,height] after:ease-in-out after:duration-300 after:top-0 after:fixed after:bg-texture-white after:bg-contain after:bg-fixed after:bg-[center_-13rem] after:bg-no-repeat">
      <div className="max-w-7xl mx-auto mb-10 relative z-10 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-y-10 gap-x-10 items-start px-6 relative z-10">
        <div className="col-span-12 xl:col-span-4 order-2 xl:order-1 relative">
          <div className="sticky top-24">
            <div className="p-4 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm fixed max-w-sm">
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-4">
                Data Deletion Request
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Instructions for requesting the deletion of your personal data from Astenir
              </p>

              <div className="flex flex-col gap-3">
                <div className="p-3 bg-slate-50 dark:bg-darkmode-700 rounded-lg border border-slate-100 dark:border-darkmode-400 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <TbMail size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Contact DPO</span>
                    <a href="mailto:dpo@astenir.com" className="text-sm text-primary hover:underline font-medium break-all">dpo@astenir.com</a>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-darkmode-700 rounded-lg border border-slate-100 dark:border-darkmode-400 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <TbClock size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Processing Time</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">15-30 business days</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL (Direita) */}
        <div className="col-span-12 xl:col-span-8 order-1 xl:order-2 flex flex-col gap-y-6">

          {/* Header Card */}
          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Data Deletion Request
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Instructions for requesting the deletion of your personal data from Astenir
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-4 border-t border-slate-100 dark:border-darkmode-400">
              In accordance with applicable data protection laws (including LGPD and GDPR), you have the right to request the deletion of your personal data that Astenir has collected through your use of our services or through Facebook/Meta integration.
            </p>
          </div>

          {/* 1. How to Request */}
          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <TbFileDescription size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                How to Request Data Deletion
              </h3>
            </div>

            <div className="space-y-6 relative pl-2">

              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">1</div>
                  <div className="h-full w-0.5 bg-slate-100 dark:bg-darkmode-400 my-2"></div>
                </div>
                <div className="pb-4">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Send an Email Request</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Send an email to our Data Protection Officer at <a href="mailto:dpo@astenir.com" className="text-primary hover:underline">dpo@astenir.com</a>
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">2</div>
                  <div className="h-full w-0.5 bg-slate-100 dark:bg-darkmode-400 my-2"></div>
                </div>
                <div className="pb-4">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-2">Include Required Information</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">To process your request, please include the following information:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400 marker:text-slate-400">
                    <li>Your full name</li>
                    <li>Email address associated with your account</li>
                    <li>Phone number (if applicable)</li>
                    <li>Facebook/Meta User ID (if known)</li>
                    <li>Description of the data you want deleted</li>
                    <li>Reason for the deletion request (optional)</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">3</div>
                  <div className="h-full w-0.5 bg-slate-100 dark:bg-darkmode-400 my-2"></div>
                </div>
                <div className="pb-4">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Identity Verification</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    For security purposes, we may request additional information to verify your identity before processing the deletion request.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">4</div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">Confirmation</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Once your request is processed, you will receive a confirmation email with details about the data that was deleted.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* 2. Processing Time */}
          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <TbClock size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Processing Time
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              We will process your data deletion request within <strong className="text-slate-800 dark:text-slate-200">15 business days</strong> of receiving all required information.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Complex requests may take up to <strong className="text-slate-800 dark:text-slate-200">30 days</strong>. You will be notified of any delays and the reasons for them.
            </p>
          </div>

          {/* 3. What Data Will Be Deleted */}
          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <TbTrash size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                What Data Will Be Deleted
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Upon your request, we will delete the following types of personal data:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Profile information",
                "Message history",
                "Facebook/Meta linked data",
                "Preferences and settings",
                "Contact details (email, phone)",
                "Interaction logs",
                "Usage analytics",
                "Any other personal identifiers"
              ].map((item) => (
                <div key={item} className="flex items-center p-3 bg-slate-50 dark:bg-darkmode-700 rounded-md border border-slate-100 dark:border-darkmode-400">
                  <TbCheck className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Exceptions (Amarelo/Amber Theme) */}
          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0 border border-amber-100 dark:border-amber-900/30">
                <TbAlertTriangle size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Data Retention Exceptions
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Please note that some data may be retained even after a deletion request in the following cases:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-400 marker:text-amber-500">
              <li>Data required by law or regulatory obligations</li>
              <li>Data necessary for legal claims or disputes</li>
              <li>Anonymized or aggregated data that cannot identify you</li>
              <li>Transaction records required for accounting purposes</li>
              <li>Data processed by third parties (you must contact them directly)</li>
            </ul>
          </div>

          {/* 5. Need Help? */}
          <div className="box box--stacked p-8 rounded-lg border border-slate-200/60 dark:border-darkmode-400 bg-white dark:bg-darkmode-600 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <TbHelpCircle size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Need Help?
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              If you have any questions about the data deletion process or need assistance, please contact us:
            </p>
            <div className="mt-3">
              <a href="mailto:dpo@astenir.com" className="text-primary hover:underline font-medium">dpo@astenir.com</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DeleteDataPolicy;