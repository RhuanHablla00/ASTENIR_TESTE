import Lucide from "@/components/Base/Lucide";
import Button from "@/components/Base/Button";
import { FormInput, FormLabel } from "@/components/Base/Form";
import { useState } from "react";
import clsx from "clsx";

function Main() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Lógica de Finalização aqui
      alert("Wizard Finished!");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-12 sm:col-span-10 sm:col-start-2">
        
        {/* --- STEPPER HEADER --- */}
        <div className="flex flex-col lg:items-center lg:flex-row gap-y-2">
          {/* Step 1 */}
          <div
            className={clsx([
              "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group",
              "after:hidden before:hidden after:lg:block before:lg:block",
              "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
              "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
              "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
              "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
              currentStep >= 1 ? "active" : "" // Condição de Ativo
            ])}
          >
            <div className="flex items-center">
              <div className="bg-white border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15] dark:[.group.mode--light_.group.active_&]:!bg-darkmode-800/30 dark:[.group.mode--light_.group.active_&]:!border-white/10 dark:group-[.mode--light]:!border-white/10 dark:bg-transparent">
                <div className="flex items-center justify-center w-10 h-10">
                  1
                </div>
              </div>
              <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                Personal Information
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div
            className={clsx([
              "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group",
              "after:hidden before:hidden after:lg:block before:lg:block",
              "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
              "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
              "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
              "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
              currentStep >= 2 ? "active" : "" // Condição de Ativo
            ])}
          >
            <div className="flex items-center">
              <div className="bg-white border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15] dark:[.group.mode--light_.group.active_&]:!bg-darkmode-800/30 dark:[.group.mode--light_.group.active_&]:!border-white/10 dark:group-[.mode--light]:!border-white/10 dark:bg-transparent">
                <div className="flex items-center justify-center w-10 h-10">
                  2
                </div>
              </div>
              <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                Account Setup
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div
            className={clsx([
              "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group",
              "after:hidden before:hidden after:lg:block before:lg:block",
              "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
              "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
              "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
              "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
              currentStep >= 3 ? "active" : "" // Condição de Ativo
            ])}
          >
            <div className="flex items-center">
              <div className="bg-white border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15] dark:[.group.mode--light_.group.active_&]:!bg-darkmode-800/30 dark:[.group.mode--light_.group.active_&]:!border-white/10 dark:group-[.mode--light]:!border-white/10 dark:bg-transparent">
                <div className="flex items-center justify-center w-10 h-10">
                  3
                </div>
              </div>
              <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                Additional Details
              </div>
            </div>
          </div>
        </div>

        {/* --- FORM BODY --- */}
        <div className="mt-7">
          <div className="flex flex-col box box--stacked">
            <div className="p-7">
              {/* STEP 1 CONTENT */}
              {currentStep === 1 && (
                <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormLabel htmlFor="step1-input">Your Full Name</FormLabel>
                    <FormInput
                      id="step1-input"
                      type="text"
                      placeholder="Enter personal information..."
                    />
                    <div className="mt-2 text-slate-500 text-xs">
                        This is step 1 of the configuration.
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 CONTENT */}
              {currentStep === 2 && (
                <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormLabel htmlFor="step2-input">Account Username</FormLabel>
                    <FormInput
                      id="step2-input"
                      type="text"
                      placeholder="Enter account setup info..."
                    />
                     <div className="mt-2 text-slate-500 text-xs">
                        Setting up your account credentials.
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 CONTENT */}
              {currentStep === 3 && (
                <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormLabel htmlFor="step3-input">Extra Notes</FormLabel>
                    <FormInput
                      id="step3-input"
                      type="text"
                      placeholder="Enter additional details..."
                    />
                     <div className="mt-2 text-slate-500 text-xs">
                        Final details before finishing.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* --- FOOTER BUTTONS --- */}
            <div className="flex py-5 border-t justify-between px-7 border-slate-200/80">
                {/* Previous Button - Escondido no passo 1 */}
                <div>
                    {currentStep > 1 && (
                        <Button
                            variant="outline-secondary"
                            className="px-10"
                            onClick={handlePrev}
                        >
                            Previous
                        </Button>
                    )}
                </div>
              
              {/* Next / Finish Button */}
              <Button
                variant="primary" // Mudei para primary para destacar
                className="px-10"
                onClick={handleNext}
              >
                {currentStep === totalSteps ? (
                   <>
                    <Lucide icon="CheckCircle" className="w-4 h-4 mr-2" />
                    Finish
                   </>
                ) : (
                   <>
                    Next
                    <Lucide icon="ArrowRight" className="w-4 h-4 ml-2" />
                   </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;